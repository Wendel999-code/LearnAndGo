import { z } from "zod";

export const CourseSchema = z.object({
  courseTitle: z
    .string({ message: "Course title is required" })
    .min(1, "Course title cannot be empty"),
  courseCode: z.string({ message: "Course code is required" }),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description cannot be empty"),
  features: z.array(z.string()).default([]),
  price: z
    .number({ message: "Price must be a number" })
    .int()
    .nonnegative()
    .default(0),
  students: z.array(z.any()).optional(),
});

export type CourseFormData = z.infer<typeof CourseSchema>;
