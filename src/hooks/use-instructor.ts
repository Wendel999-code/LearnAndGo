import { getInstructors } from "@/actions/instructor";
import { Instructor } from "@/constant/type";
import { useQuery } from "@tanstack/react-query";

export const useGetInstructors = () =>
  useQuery<Instructor[]>({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await getInstructors();
      if (!res.success)
        throw new Error(res.message || "Failed to fetch instructors");
      return res.data ?? [];
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
