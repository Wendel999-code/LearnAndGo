"use server";

import prisma from "@/lib/prisma-instance";
import { CourseFormData, CourseSchema } from "../zod/course";
import { z } from "zod";

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany();

    if (courses.length === 0) {
      return {
        success: true,
        message: "No courses found",
        data: [],
      };
    }

    return {
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    };
  } catch (error) {
    console.error("Error in getCourses:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Server error",
      data: [],
    };
  }
}

export async function addCourse(formData: CourseFormData) {
  try {
    const parsed = CourseSchema.parse(formData);

    await prisma.course.create({
      data: {
        courseTitle: parsed.courseTitle,
        courseCode: parsed.courseCode,
        description: parsed.description,
        features: parsed.features,
        price: parsed.price,
      },
    });

    return {
      success: true,
      message: "Course saved successfully",
    };
  } catch (error) {
    console.error("Error in addCourse:", error);

    if (error instanceof z.ZodError) {
      const message = error.issues.map((e) => e.message).join(", ");
      return { success: false, message };
    }

    return { success: false, message: "Server error" };
  }
}
