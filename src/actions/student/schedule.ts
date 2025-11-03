"use server";

import prisma from "@/lib/prisma-instance";

export async function getSchedules() {
  try {
    const res = await prisma.schedule.findMany({
      select: {
        id: true,
        first_session: true,
        second_session: true,
        third_session: true,
        first_instructor: {
          select: {
            firstName: true,
            lastName: true,
            image_URL: true,
          },
        },
        second_instructor: {
          select: {
            firstName: true,
            lastName: true,
            image_URL: true,
          },
        },
        third_instructor: {
          select: {
            firstName: true,
            lastName: true,
            image_URL: true,
          },
        },
        student: {
          select: {
            id: true,
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

    return {
      success: true,
      message: "Fetched schedules successfully",
      data: res,
    };
  } catch (error) {
    console.error(error);
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
        selfie_URL: true,
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
  student_id: string,
  session: string,
  dayTime: string,
  instructor_id: string
) => {
  try {
    const updateData: Record<string, any> = {};

    // match session to correct fields
    if (session === "first") {
      updateData.first_session = dayTime;
      updateData.first_instructor_id = instructor_id;
    } else if (session === "second") {
      updateData.second_session = dayTime;
      updateData.second_instructor_id = instructor_id;
    } else if (session === "third") {
      updateData.third_session = dayTime;
      updateData.third_instructor_id = instructor_id;
    }

    await prisma.schedule.upsert({
      where: { student_id },
      update: updateData,
      create: {
        student_id,
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

export const deleteSession = async (id: string, session: string) => {
  try {
    const deleteData: Record<string, any> = {};

    if (session === "First Session") {
      deleteData.first_session = null;
      deleteData.first_instructor_id = null;
    } else if (session === "Second Session") {
      deleteData.second_session = null;
      deleteData.second_instructor_id = null;
    } else if (session === "Third Session") {
      deleteData.third_session = null;
      deleteData.third_instructor_id = null;
    }

    await prisma.schedule.update({
      where: { id },
      data: deleteData,
    });

    return { success: true, message: "Successfully deleted session" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Server error",
      data: null,
    };
  }
};
