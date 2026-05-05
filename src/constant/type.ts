import { CertificateStatus, InvoiceStatus, StudentStatus } from "@/generated/prisma/enums";

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
  certificateStatus: CertificateStatus;
  course_id: string | null;
  course?: EnrolleeCourse | null;
  invoices?: EnrolleeInvoice | null;
  schedule?: Schedule | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Schedule = {
  id: string;
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

export type Instructor = {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  id: string;
  image_URL: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type StudentsParams = {
  searchName?: string;
  course?: string;
  certificateStatus?: CertificateStatus;
  status?: StudentStatus;
};

export interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export interface InvoiceResponse {
  data: Enrollee[];
  pagination: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}
