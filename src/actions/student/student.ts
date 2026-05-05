"use server";

import prisma from "@/lib/prisma-instance";
import supabase from "@/lib/supabase-storage";
import axios from "axios";
import { StudentFormData, StudentSchema } from "../zod/student";
import { generateReferenceId } from "@/lib/utils/generate_id";
import { baseURL } from "@/lib/utils/env";
import { StudentsParams } from "@/constant/type";
import { Prisma } from "@/generated/prisma/client";

//helper 1: Upload file to Supabase
export async function uploadFile(folder: string, file: File) {
  const path = `${folder}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("learn_and_go")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw new Error(`Failed to upload ${folder}: ${error.message}`);
  return path;
}

// Helper 2: Get public URL
export async function getPublicUrl(path: string) {
  const { data } = supabase.storage.from("learn_and_go").getPublicUrl(path);
  if (!data) throw new Error(`Failed to get public URL for ${path}`);
  return data.publicUrl;
}

// Helper 3: Create student + invoice in Prisma
async function createStudentAndInvoice(
  parsed: any,
  validIdURL: string,
  selfieURL: string,
  course: any,
  reference_id: string,
) {
  try {
    return await prisma.student.create({
      data: {
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        age: parsed.age,
        email: parsed.email,
        phone: parsed.phone,
        valid_id_URL: validIdURL,
        selfie_URL: selfieURL,
        address: parsed.address,
        course: { connect: { id: course.id } },
        invoices: {
          create: {
            reference_id,
            item: course.courseTitle,
            price: course.price,
          },
        },
      },
      include: { invoices: true },
    });
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          // Unique constraint failed
          throw new Error(`Duplicate field: ${err.meta?.target}`);
        case "P2025":
          // Record not found
          throw new Error("Record not found when connecting course.");
        default:
          throw new Error(`Prisma error (${err.code}): ${err.message}`);
      }
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      throw new Error(`Validation error: ${err.message}`);
    } else {
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
}

// Helper 4: Create Xendit invoice
async function createXenditInvoice(
  reference_id: string,
  parsed: any,
  course: any,
  student: any,
) {
  try {
    const payload = {
      external_id: reference_id,
      amount: course.price,
      description: course.courseTitle,
      invoice_duration: 43200,
      customer: {
        given_names: parsed.firstName,
        surname: parsed.lastName,
        email: parsed.email,
        mobile_number: parsed.phone,
      },
      success_redirect_url: `${baseURL}/${reference_id}`,
      currency: "PHP",
      items: [
        {
          name: course.courseTitle,
          quantity: 1,
          price: course.price,
          category: "Driving Course",
          url: "https://learn-and-go.wndl.dev/#courses",
        },
      ],
      metadata: { student, address: parsed.address },
      should_send_email: true,
    };

    const response = await axios.post(
      "https://api.xendit.co/v2/invoices",
      payload,
      {
        auth: {
          username: process.env.XENDIT_SECRET_KEY!,
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
          "X-Version": "2023-05-01",
          "X-IDEMPOTENCY-KEY": reference_id,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to create invoice with Xendit: ${error.message}`);
  }
}

// Main function
export async function registerStudentAndPayment(formData: StudentFormData) {
  try {
    const parsed = StudentSchema.parse(formData);

    if (!parsed.valid_id || !parsed.selfie)
      throw new Error("Valid ID and selfie are required");

    const reference_id = generateReferenceId();

    // Upload files
    const [validIdPath, selfiePath] = await Promise.all([
      uploadFile("valid_ids", parsed.valid_id),
      uploadFile("selfies", parsed.selfie),
    ]);

    // Get URLs
    const [validIdURL, selfieURL] = await Promise.all([
      getPublicUrl(validIdPath),
      getPublicUrl(selfiePath),
    ]);

    // Get course
    const course = await prisma.course.findUnique({
      where: { id: parsed.course_id },
      select: {
        id: true,
        courseTitle: true,
        courseCode: true,
        description: true,
        price: true,
      },
    });
    if (!course) throw new Error("Course not found");

    // Create student and invoice
    const student = await createStudentAndInvoice(
      parsed,
      validIdURL,
      selfieURL,
      course,
      reference_id,
    );

    // Create Xendit invoice
    const invoice = await createXenditInvoice(
      reference_id,
      parsed,
      course,
      student,
    );

    return { success: true, data: invoice };
  } catch (error: any) {
    console.error("Error in registerStudentAndPayment:", error);

    // Detect large file/body limit error
    if (error.message?.includes("Body exceeded")) {
      return {
        success: false,
        message:
          "Upload failed: The total file size exceeds the 3 MB limit. Please upload smaller images.",
      };
    }

    // Generic fallback
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}

export async function getEnrollees() {
  try {
    const enrollees = await prisma.student.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        invoices: true,
        course: {
          select: {
            courseTitle: true,
            courseCode: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (enrollees.length === 0) {
      return { success: true, message: "No enrollees found", data: [] };
    }

    return { success: true, message: "Fetched successfully", data: enrollees };
  } catch (error: any) {
    console.error("Error in getEnrollees:", error);
    return { success: false, message: error.message, data: [] };
  }
}

export async function registerSuccessfully(reference_id: string) {
  if (!reference_id) throw new Error("Reference ID is required");
  try {
    const response = await prisma.invoice.findUnique({
      where: {
        reference_id,
      },
      select: {
        reference_id: true,
        price: true,
        item: true,
        amountPaid: true,
        payment_channel: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
            course: {
              select: {
                courseTitle: true,
                price: true,
                courseCode: true,
              },
            },
          },
        },
      },
    });

    if (!response) {
      return { success: false, message: "Invoice not found", data: null };
    }

    return {
      success: true,
      message: "Successfully registered",
      data: response,
    };
  } catch (error: any) {
    console.error("Error in registerSuccessfully:", error);
    return { success: false, message: error.message, data: null };
  }
}

export async function getEnrollee(enrollee_id: string) {
  if (!enrollee_id) throw new Error("Enrollee ID is required");
  try {
    const enrollee = await prisma.student.findUnique({
      where: {
        id: enrollee_id,
      },
      include: {
        invoices: {
          select: {
            price: true,
            amountPaid: true,
            reference_id: true,
          },
        },
        course: {
          select: {
            courseTitle: true,
          },
        },
      },
    });

    if (!enrollee) {
      return { success: false, message: "Enrollee not found", data: null };
    }

    return {
      success: true,
      message: "Fetch successfully",
      data: enrollee,
    };
  } catch (error) {
    console.error("Error in getEnrollee:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Server error",
      data: null,
    };
  }
}

export async function verifyEnrollee(enrolle_id: string) {
  if (!enrolle_id) throw new Error("Enrollee ID is required");
  try {
    const res = await prisma.student.update({
      where: {
        id: enrolle_id,
      },
      data: {
        status: "ENROLLED",
      },
      select: { id: true },
    });

    if (!res)
      return { success: false, message: "Unable to verify enrollment." };

    return { success: true, message: "Enrollment verified." };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
}

export async function graduateStudent(student_id: string) {
  if (!student_id) throw new Error("student_id is required");
  try {
    const res = await prisma.student.update({
      where: {
        id: student_id,
      },
      data: {
        status: "GRADUATED",
      },
      select: { id: true },
    });

    if (!res)
      return {
        success: false,
        message: "Unable to mark graduate this student.",
      };

    return { success: true, message: "Student graduated." };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
}

export async function getEnrolledStudents(
  params: StudentsParams,
  page = 1,
  limit = 25,
) {
  const { searchName, course = "all", status } = params;

  const skip = (page - 1) * limit;

  const where: any = {
    ...(status ? { status } : { status: { not: "PENDING" } }),

    ...(searchName && {
      OR: [
        { firstName: { contains: searchName, mode: "insensitive" } },
        { lastName: { contains: searchName, mode: "insensitive" } },
      ],
    }),

    ...(course &&
      course !== "all" && {
        course: { courseCode: course },
      }),
  };

  try {
    const [data, totalCount] = await Promise.all([
      prisma.student.findMany({
        skip,
        take: limit,
        where,
        include: {
          course: {
            select: {
              courseCode: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.student.count({ where }),
    ]);

    return {
      data,
      pagination: {
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        limit,
      },
    };
  } catch (error: any) {
    console.error("getEnrolledStudents error:", error);
    throw new Error("Failed to fetch students");
  }
}

//TODO add pagination
export async function getGraduatedStudents(params: StudentsParams = {}) {
  const { searchName, course = "all", certificateStatus } = params;

  try {
    const students = await prisma.student.findMany({
      where: {
        status: "GRADUATED",

        ...(certificateStatus && {
          certificateStatus,
        }),

        ...(searchName && {
          OR: [
            {
              firstName: {
                contains: searchName,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: searchName,
                mode: "insensitive",
              },
            },
          ],
        }),

        ...(course &&
          course !== "all" && {
            course: {
              courseCode: course,
            },
          }),
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        updatedAt: true,
        certificateStatus: true,
        course: {
          select: {
            courseTitle: true,
          },
        },
      },

      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      success: true,
      message:
        students.length === 0 ? "No student found." : "Fetched students.",
      data: students,
    };
  } catch (error: any) {
    console.error(error.message);
    return { success: false, message: error.message, data: [] };
  }
}
