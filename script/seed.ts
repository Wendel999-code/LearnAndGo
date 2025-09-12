"use server"

import prisma from "@/lib/prisma-instance"
import { SessionNo } from "@prisma/client";

export async function SeedSchedules() {
  const studentsData = [
    {
      first_name: "Alice",
      last_name: "Johnson",
      age: 22,
      email: "alice@example.com",
      phone: "555-1111",
      address: "123 Maple St",
      valid_id_URL: "https://example.com/id-alice.jpg",
      selfie_URL: "https://example.com/selfie-alice.jpg",
      schedules: [
        { startTime: new Date("2025-09-15T08:00:00Z"), sessionNo: SessionNo.FIRST },
        { startTime: new Date("2025-09-17T09:00:00Z"), sessionNo: SessionNo.SECOND },
      ],
    },
    {
      first_name: "Bob",
      last_name: "Martinez",
      age: 25,
      email: "bob@example.com",
      phone: "555-2222",
      address: "456 Oak Ave",
      valid_id_URL: "https://example.com/id-bob.jpg",
      selfie_URL: "https://example.com/selfie-bob.jpg",
      schedules: [
        { startTime: new Date("2025-09-15T10:00:00Z"), sessionNo: SessionNo.THIRD },
        { startTime: new Date("2025-09-18T11:00:00Z"), sessionNo: SessionNo.FIRST },
      ],
    },
    {
      first_name: "Clara",
      last_name: "Nguyen",
      age: 28,
      email: "clara@example.com",
      phone: "555-3333",
      address: "789 Pine Rd",
      valid_id_URL: "https://example.com/id-clara.jpg",
      selfie_URL: "https://example.com/selfie-clara.jpg",
      schedules: [
        { startTime: new Date("2025-09-15T13:00:00Z"), sessionNo: SessionNo.FIRST },
        { startTime: new Date("2025-09-19T14:00:00Z"), sessionNo: SessionNo.SECOND },
      ],
    },
    {
      first_name: "David",
      last_name: "Lee",
      age: 21,
      email: "david@example.com",
      phone: "555-4444",
      address: "321 Cedar Ln",
      valid_id_URL: "https://example.com/id-david.jpg",
      selfie_URL: "https://example.com/selfie-david.jpg",
      schedules: [
        { startTime: new Date("2025-09-15T15:00:00Z"), sessionNo: SessionNo.FIRST },
        { startTime: new Date("2025-09-20T10:00:00Z"), sessionNo: SessionNo.SECOND },
      ],
    },
  ];

  for (const s of studentsData) {
    await prisma.student.create({
      data: {
        first_name: s.first_name,
        last_name: s.last_name,
        age: s.age,
        email: s.email,
        phone: s.phone,
        address: s.address,
        valid_id_URL: s.valid_id_URL,
        selfie_URL: s.selfie_URL,
        schedule:{
          createMany: {
            data: s.schedules.map((schedule) => ({
              startDayTime: schedule.startTime,
              sessionNo: schedule.sessionNo,
            })),
          },

        }
        
      },
    });
  }

  return { success: true, message: "Seed schedule success" };
}
