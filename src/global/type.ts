import { InvoiceStatus, StudentStatus } from "@prisma/client";

export type Invoice = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: InvoiceStatus;
  reference_id: string;
  studentId: string;
  ammountPaid: number;
  payment_channel: string | null;
  item: string;
  price: number;
  dueDate: Date | null;
  paidAt: Date | null;
};

export type student = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  last_name: string;
  age: number;
  phone: string;
  address: string;
  valid_id_URL: string;
  selfie_URL: string;
  course: string;
  course_key: string;
  status: StudentStatus;
  invoices?: Invoice[];
};

export type Schedules = {
  first_session: string | null;
  second_session: string | null;
  third_session: string | null;
  student: {
    first_name: string;
    last_name: string;
    course: string;
    course_key: string;
    selfie_URL: string;
  };
};

export interface MySchedule {
  schedule: {
    first_session: string | null;
    second_session: string | null;
    third_session: string | null;
  } | null;
  first_name: string;
  last_name: string;
  course: string;
}

export interface StudentWithoutSchedule {
  id: string;
  first_name: string;
  last_name: string;
  course_key: string;
  schedule: {
    first_session: string | null;
    second_session: string | null;
    third_session: string | null;
  } | null;
}
