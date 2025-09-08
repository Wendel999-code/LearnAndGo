import { getEnrollees } from "@/actions/student/student";
import { StudentWithInvoices } from "@/global/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useGetEnrollees = () =>
    useQuery<StudentWithInvoices[]>({
        queryKey: ["get-enrollees"],
        queryFn: async () => {
            const res = await getEnrollees();
            if (!res.success) throw new Error(res.message);
            return res.data!
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: true,
    });
