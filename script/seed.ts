"use server";

import prisma from "@/lib/prisma-instance";

export async function SeedStudents() {
  await prisma.student.createMany({
    data: [
      {
        first_name: "John",
        last_name: "Doe",
        age: 20,
        email: "john@example.com",
        phone: "09123456789",
        address: "123 Main St",
        valid_id_URL: "https://example.com/id-john",
        selfie_URL: "https://example.com/selfie-john",
        course: "PDC",
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        age: 22,
        email: "jane@example.com",
        phone: "09987654321",
        address: "456 Side St",
        valid_id_URL: "https://example.com/id-jane",
        selfie_URL: "https://example.com/selfie-jane",
        course: "TDC",
      },
    ],
    skipDuplicates: true,
  });

  const john = await prisma.student.findUnique({
    where: { email: "john@example.com" },
  });
  const jane = await prisma.student.findUnique({
    where: { email: "jane@example.com" },
  });

  if (john && jane) {
    await prisma.schedule.createMany({
      data: [
        {
          student_id: john.id,
          first_session: "2025-09-25 07:00-09:00",
          second_session: "2025-09-26 09:30-11:30",
          third_session: "2025-09-27 13:00-15:00",
        },
        {
          student_id: jane.id,
          first_session: "2025-09-25 15:00-17:00",
          second_session: "2025-09-26 17:00-19:00",
        },
      ],
    });

    await prisma.invoice.createMany({
      data: [
        {
          reference_id: "INV-001",
          studentId: john.id,
          ammountPaid: 500,
          payment_channel: "Cash",
          item: "Course Fee",
          price: 1000,
          status: "PAID",
          paidAt: new Date(),
        },
        {
          reference_id: "INV-002",
          studentId: jane.id,
          ammountPaid: 0,
          payment_channel: "Bank",
          item: "Course Fee",
          price: 1200,
          status: "PENDING",
        },
      ],
    });
  }

  return { success: true, message: "Seed complete" };
}
