"use server";

import prisma from "@/lib/prisma-instance";

export async function getStudentWithInvoice({
  page = 1,
  limit = 25,
}: {
  page?: number;
  limit?: number;
}) {
  try {
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      prisma.student.findMany({
        skip,
        take: limit,
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
        orderBy: { createdAt: "desc" },
      }),
      prisma.student.count(),
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
    console.error("getStudentWithInvoice error:", error);
    throw new Error("Failed to fetch invoices");
  }
}
