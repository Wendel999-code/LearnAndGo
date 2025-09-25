import { z } from "zod";

export const StudentSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  age: z.coerce.number().int().positive(),
  email: z.email(),
  phone: z.string().min(7),
  address: z.string().min(1),
  course: z.string().min(1),
  course_key: z.string().min(1),
  price: z.number().min(1),
  valid_id: z.instanceof(File).nullable(),
  selfie: z.instanceof(File).nullable(),
});

export type StudentFormData = z.infer<typeof StudentSchema>;
