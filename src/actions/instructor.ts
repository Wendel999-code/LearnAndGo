"use server";

import prisma from "@/lib/prisma-instance";
import { z } from "zod";

import { InstructorFormData, InstructorSchema } from "./zod/instructor";
import { getPublicUrl, uploadFile } from "./student/student";

export async function addInstructor(formData: InstructorFormData) {
  try {
    const parsed = InstructorSchema.parse(formData);
    if (!parsed.image_URL) throw new Error("Image are required");

    const path = await uploadFile("instructors", parsed.image_URL);
    const image_URL = await getPublicUrl(path);

    await prisma.instructor.create({
      data: {
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        email: parsed.email,
        phone: parsed.phone,
        address: parsed.address,
        bio: parsed.bio,
        image_URL: image_URL,
      },
    });

    return {
      success: true,
      message: "Intructor saved successfully",
    };
  } catch (error: any) {
    console.error("Error in addInstructor:", error);

    if (error instanceof z.ZodError) {
      const message = error.issues.map((e) => e.message).join(", ");
      return { success: false, message };
    }

    return { success: false, message: error.message || "Server error" };
  }
}

export async function getInstructors() {
  try {
    const res = await prisma.instructor.findMany();

    if (res.length === 0) {
      return {
        success: true,
        message: "No instructor found",
        data: [],
      };
    }

    return {
      success: true,
      message: "Intructor fetch successfully",
      data: res,
    };
  } catch (error) {
    console.error("Error in getInstructors:", error);

    if (error instanceof z.ZodError) {
      const message = error.issues.map((e) => e.message).join(", ");
      return { success: false, message };
    }

    return { success: false, message: "Server error", data: [] };
  }
}
