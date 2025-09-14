"use server";

import prisma from "@/lib/prisma-instance";

export async function getSchedules() {
  try {
    const response = await prisma.schedule.findMany({
      select: {
        id: true,
        startDayTime: true,
        sessionNo: true,
        student: {
          select: {
            first_name: true,
            last_name: true,
            invoices: {
              select: {
                courseTitle: true,
              },
            },
          },
        },
      },
    });

    if (!response) {
      return { success: false, message: "Schedule not found", data: null };
    }

    const flattened = response.map((item) => ({
      id: item.id,
      first_name: item.student.first_name,
      last_name: item.student.last_name,
      courseTitle: "PDC",
      startDayTime: item.startDayTime,
      sessionNo: item.sessionNo,
    }));

    return { success: true, message: "Fetch successfully", data: flattened };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

export async function getMySchedule(email: string) {
  try {
    const res = await prisma.student.findFirst({
      where: { email, status: "ENROLLED" },
      select: {
        first_name: true,
        last_name: true,
        schedule: {
          select: {
            startDayTime: true,
            sessionNo: true,
          },
        },
        invoices: {
          select: {
            courseTitle: true,
          },
        },
      },
    });

    if (!res) {
      return { success: false, message: "No schedule found", data: null };
    }

    return { success: true, message: "Found schedule", data:res };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}
