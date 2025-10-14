import { getCourses } from "@/actions/student/course";
import { Course } from "@/constant/type";
import { useQuery } from "@tanstack/react-query";

export const useGetCourses = () =>
  useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await getCourses();
      if (!res.success)
        throw new Error(res.message || "Failed to fetch courses");
      return res.data ?? [];
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
  });
