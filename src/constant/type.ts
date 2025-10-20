import { InvoiceStatus, StudentStatus } from "@prisma/client";

export type EnrolleeInvoice = {
  id: string;
  student_id: string;
  price: number;
  reference_id: string;
  amountPaid: number;
  payment_channel: string | null;
  item: string;
  status: InvoiceStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type Course = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  courseTitle: string;
  courseCode: string;
  description: string;
  price: number;
};

export type EnrolleeCourse = {
  courseTitle?: string;
  courseCode?: string;
  price?: number;
};

export type Enrollee = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  valid_id_URL: string;
  selfie_URL: string;
  status: StudentStatus;
  course_id: string | null;
  course?: EnrolleeCourse | null;
  invoices?: EnrolleeInvoice | null;
  schedule?: Schedule | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Schedule = {
  first_session: string | null;
  second_session: string | null;
  third_session: string | null;
  student?: {
    firstName: string;
    lastName: string;
    selfie_URL: string;
    course?: EnrolleeCourse | null;
  };
};

export interface MySchedule {
  firstName: string;
  lastName: string;
  course?: EnrolleeCourse | null;
  schedule?: Schedule | null;
}
