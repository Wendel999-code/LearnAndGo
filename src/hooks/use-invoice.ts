import { getStudentWithInvoice } from "@/actions/student/invoice";
import { Enrollee } from "@/constant/type";
import { useQuery } from "@tanstack/react-query";

export const useGetInvoices = () =>
  useQuery<Enrollee[]>({
    queryKey: ["get-invoices"],
    queryFn: async () => {
      const res = await getStudentWithInvoice();
      if (!res.success)
        throw new Error(res.message || "Failed to fetch invoices");
      return res.data ?? [];
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
