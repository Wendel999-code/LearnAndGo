import { z } from "zod";

const PreferredScheduleSchema = z.object({
  date: z.date(),
  time: z.string(),
  session: z.enum(["FIRST", "SECOND", "THIRD"]),
});

export const StudentSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  age: z.coerce.number().int().positive(),
  email: z.email(),
  phone: z.string().min(7),
  address: z.string().min(5),
  courseTitle: z.string().min(1),
  coursePrice: z.number().positive(),
  valid_id: z.instanceof(File).nullable(),
  selfie: z.instanceof(File).nullable(),
  preferredSchedules: z
    .array(PreferredScheduleSchema)
    .min(1, "At least one session must be scheduled"),
});

export type StudentFormData = z.infer<typeof StudentSchema>;
export type PreferredSchedule = z.infer<typeof PreferredScheduleSchema>;
