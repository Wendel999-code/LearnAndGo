import {
  getEnrollee,
  getEnrollees,
  getEnrolledStudents,
  verifyEnrollee,
  getGraduatedStudents,
} from "@/actions/student/student";
import {
  Enrollee,
  EnrolleeInvoice,
  InvoiceResponse,
  StudentsParams,
} from "@/constant/type";
import { CertificateStatus } from "@prisma/client";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetEnrollees = () =>
  useQuery<Enrollee[]>({
    queryKey: ["get-enrollees"],
    queryFn: async () => {
      const res = await getEnrollees();
      if (!res.success) throw new Error(res.message);
      return res.data!;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

type EnrolleeWithInvoice = Omit<Enrollee, "invoices"> & {
  invoices?: Pick<
    EnrolleeInvoice,
    "reference_id" | "amountPaid" | "price"
  > | null;
};

export const useGetEnrollee = (enrollee_id: string, open: boolean) =>
  useQuery<EnrolleeWithInvoice>({
    queryKey: ["get-enrollee", enrollee_id],
    queryFn: async () => {
      const res = await getEnrollee(enrollee_id);
      if (!res.success) throw new Error(res.message);
      return res.data!;
    },
    enabled: open,
    staleTime: 60 * 60 * 1000, // 1h
    gcTime: 30 * 60 * 1000, // was gcTime
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useVerifyEnrollee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enrollee_id: string) => {
      const res = await verifyEnrollee(enrollee_id);
      if (!res.success) throw new Error(res.message);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-enrollees"] });
      queryClient.invalidateQueries({ queryKey: ["get-enrollee"] });
      queryClient.invalidateQueries({ queryKey: ["get-students"] });
      queryClient.invalidateQueries({
        queryKey: ["students-without-schedule"],
      });
    },
  });
};

export const useGetStudents = (params: StudentsParams, page = 1, limit = 25) =>
  useQuery<InvoiceResponse>({
    queryKey: ["get-students", params, page, limit],
    queryFn: () => getEnrolledStudents(params, page, limit),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

export const useGetGraduatedStudents = (params: StudentsParams) =>
  useQuery<Partial<Enrollee>[]>({
    queryKey: ["get-graduated-students", params],
    queryFn: async () => {
      const res = await getGraduatedStudents(params);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    retry: 1,
  });
