"use server";

import prisma from "@/lib/prisma-instance";

export async function getSchedules() {
  try {
    const res = await prisma.schedule.findMany({
      select: {
        first_session: true,
        second_session: true,
        third_session: true,
        student: {
          select: {
            firstName: true,
            lastName: true,
            selfie_URL: true,
            course: {
              select: {
                courseCode: true,
              },
            },
          },
        },
      },
    });

    if (res.length === 0) {
      return { success: true, message: "No schedule found", data: [] };
    }

    return { success: true, message: "Fetch Schedule successfully", data: res };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: [],
    };
  }
}

export async function getMySchedule(email: string) {
  if (!email) {
    return { success: false, message: "Email is required", data: null };
  }

  try {
    const res = await prisma.student.findFirst({
      where: { email },
      select: {
        firstName: true,
        lastName: true,
        course: {
          select: {
            courseTitle: true,
          },
        },
        schedule: {
          select: {
            first_session: true,
            second_session: true,
            third_session: true,
          },
        },
      },
    });

    if (!res) {
      return { success: false, message: "No schedule found", data: null };
    }

    return { success: true, message: "Found my schedule", data: res };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

export const getStudentWithoutSchedule = async () => {
  try {
    const res = await prisma.student.findMany({
      where: {
        status: "ENROLLED",
        OR: [
          { schedule: null }, // completely no schedule
          { schedule: { first_session: null } },
          { schedule: { second_session: null } },
          { schedule: { third_session: null } },
        ],
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        course: {
          select: {
            courseCode: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (res.length === 0) {
      return {
        success: true,
        message: "No student without schedule",
        data: [],
      };
    }

    return {
      success: true,
      message: "Found student without schedule",
      data: res,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: [],
    };
  }
};

export const addSchedule = async (
  id: string,
  session: string,
  dayTime: string
) => {
  try {
    const updateData: Record<string, any> = {};

    //match newly added session
    if (session === "first") {
      updateData.first_session = dayTime;
    } else if (session === "second") {
      updateData.second_session = dayTime;
    } else if (session === "third") {
      updateData.third_session = dayTime;
    }

    await prisma.schedule.upsert({
      where: { student_id: id },
      update: updateData,
      create: {
        student_id: id,
        ...updateData,
      },
    });

    return { success: true, message: "Successfully added schedule" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
};
