"use server";

import prisma from "@/lib/prisma-instance";
import supabase from "@/lib/supabase-storage";
import axios from "axios";
import { StudentFormData, StudentSchema } from "../zod/student";
import { generateReferenceId } from "@/lib/utils";

export async function registerStudentAndPayment(formData: StudentFormData) {
  try {
    // ✅ Validate inputs
    const parsed = StudentSchema.parse(formData);

    if (!parsed.valid_id || !parsed.selfie) {
      throw new Error("Valid ID and selfie are required");
    }

    const timestamp = Date.now();
    const validIdPath = `valid_ids/${timestamp}-${parsed.valid_id.name}`;
    const selfiePath = `selfies/${timestamp}-${parsed.selfie.name}`;

    // ✅ Upload both files in parallel
    const [validIdResult, selfieResult] = await Promise.all([
      supabase.storage
        .from("learn_and_go")
        .upload(validIdPath, parsed.valid_id, {
          cacheControl: "3600",
          upsert: false,
        }),
      supabase.storage.from("learn_and_go").upload(selfiePath, parsed.selfie, {
        cacheControl: "3600",
        upsert: false,
      }),
    ]);

    if (validIdResult.error) throw validIdResult.error;
    if (selfieResult.error) throw selfieResult.error;

    // ✅ Fetch public URLs in parallel
    const [validIdData, selfieData] = await Promise.all([
      supabase.storage.from("learn_and_go").getPublicUrl(validIdPath).data,
      supabase.storage.from("learn_and_go").getPublicUrl(selfiePath).data,
    ]);

    const reference_id = generateReferenceId();

    const student = await prisma.student.create({
      data: {
        first_name: parsed.first_name,
        last_name: parsed.last_name,
        course: parsed.course,
        course_key: parsed.course_key,
        age: parsed.age,
        email: parsed.email,
        phone: parsed.phone,
        valid_id_URL: validIdData.publicUrl,
        selfie_URL: selfieData.publicUrl,
        address: parsed.address,
        invoices: {
          create: {
            reference_id,
            item: parsed.course,
            price: parsed.price,
          },
        },
      },
      include: {
        invoices: true,
      },
    });

    // ✅ Create invoice in Xendit
    const payload = {
      external_id: reference_id,
      amount: 500,
      description: parsed.course,
      invoice_duration: 43200,
      customer: {
        given_names: parsed.first_name + " " + parsed.last_name,
        surname: parsed.last_name,
        email: parsed.email,
        mobile_number: parsed.phone,
        address: parsed.address,
      },
      success_redirect_url: `https://learn-and-go.wndl.dev/register-successfully/${reference_id}`,
      currency: "PHP",
      items: [
        {
          name: parsed.course,
          quantity: 1,
          price: parsed.price,
          category: "Driving Course",
          url: "https://learn-and-go.wndl.dev/#courses",
        },
      ],
      metadata: { student },
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
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error in registerStudentAndPayment:", error);
    return { success: false, message: error.message };
  }
}

//TODO FIXME PRISMA STATUS ENUM
export async function getEnrollees() {
  try {
    const enrollees = await prisma.student.findMany({
      where: {
        NOT: {
          OR: [{ status: "ENROLLED" }, { status: "GRADUATED" }],
        },
      },
      include: {
        invoices: true,
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
        ammountPaid: true,
        student: {
          select: {
            first_name: true,
            last_name: true,
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
        invoices: true,
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

//TODO filter enrolled and graduated student
export async function getStudents() {
  try {
    const student = await prisma.student.findMany({
      where: {
        OR: [{ status: "ENROLLED" }, { status: "GRADUATED" }],
      },
    });

    if (student.length === 0)
      return {
        success: true,
        message: "No student found.",
        data: [],
      };

    return { success: true, message: "Fetched students.", data: student };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error.message, data: [] };
  }
}
