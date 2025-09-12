import { getSchedules } from "@/actions/student/schedule";
import { Schedule } from "@/global/type";
import { useQuery } from "@tanstack/react-query";

export const useGetShedules = () =>
    useQuery<Schedule[]>({
        queryKey: ["get-schedulues"],
        queryFn: async () => {
            const res = await getSchedules();
            if (!res.success) throw new Error(res.message);
            return res.data!
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: true,
    });