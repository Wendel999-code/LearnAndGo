import { SessionNo } from "@prisma/client";

export type Student = {
  id: string;
  first_name: string;
  last_name: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  courseTitle: string;
  coursePrice: number;
  ammountPaid: number;
  reference_id: string;
  valid_id: File | null;
  selfie: File | null;
};

export type Invoice = {
  id: string;
  courseTitle: string;
  coursePrice: number;
  createdAt: Date;
  updatedAt: Date;
  reference_id: string;
  ammountPaid: number;
  status: string;
  dueDate: Date | null;
  paidAt: Date | null;
  studentId: string;
  payment_channel: string | null;
};

export type StudentWithInvoices = {
  invoices: Invoice[];
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  valid_id_URL: string;
  selfie_URL: string;
};

export type Schedule = {
  id: string;
  first_name: string;
  last_name: string;
  courseTitle: string;
  startDayTime: Date;
  sessionNo: string;
};

export interface StudentSchedule {
  first_name: string;
  last_name: string;
  schedule: {
    startDayTime: Date; // The date and time of the session
    sessionNo: SessionNo; // Enum for the session number
  }[];
  invoices: {
    courseTitle: string; // Course title from the invoice
  }[];
}
