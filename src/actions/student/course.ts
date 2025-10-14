"use server";

import prisma from "@/lib/prisma-instance";

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
