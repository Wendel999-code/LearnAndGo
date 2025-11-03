"use server";

import prisma from "@/lib/prisma-instance";

export async function getStudentWithInvoice() {
  try {
    const res = await prisma.student.findMany({
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

    if (res.length === 0) {
      return {
        success: true,
        message: "No getStudentWithInvoice found",
        data: [],
      };
    }

    return { success: true, message: "Fetched successfully", data: res };
  } catch (error: any) {
    console.error("Error in getStudentWithInvoice:", error);
    return { success: false, message: error.message, data: [] };
  }
}
