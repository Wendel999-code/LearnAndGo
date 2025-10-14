import { z } from "zod";

export const StudentSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  age: z.coerce
    .number()
    .int({ message: "Age must be a whole number" })
    .positive({ message: "Age must be positive" }),
  email: z.email({ message: "Invalid email format" }),
  phone: z.string().min(7, { message: "Phone number must be 11 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  course_id: z.string().min(1, { message: "Course selection is required" }),
  valid_id: z
    .instanceof(File, { message: "Valid ID file is required" })
    .nullable(),
  selfie: z.instanceof(File, { message: "Selfie file is required" }).nullable(),
});

export type StudentFormData = z.infer<typeof StudentSchema>;
