import { z } from "zod";

export const InstructorSchema = z.object({
  firstName: z.string().min(1, { message: "First name cannot be empty" }),
  lastName: z.string().min(1, { message: "Last name cannot be empty" }),
  email: z.email({ message: "Invalid email format" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" }),
  address: z.string(),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters" }),
});

export type InstructorFormData = z.infer<typeof InstructorSchema>;
