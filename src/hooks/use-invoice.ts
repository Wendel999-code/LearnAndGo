// hooks/use-invoice.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getStudentWithInvoice } from "@/actions/student/invoice";
import { InvoiceResponse } from "@/constant/type";

export const useGetInvoices = (page = 1, limit = 25) =>
  useQuery<InvoiceResponse>({
    queryKey: ["get-invoices", page, limit],
    queryFn: () => getStudentWithInvoice({ page, limit }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
