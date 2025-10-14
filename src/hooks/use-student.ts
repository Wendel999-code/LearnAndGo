import {
  getEnrollee,
  getEnrollees,
  getStudents,
  verifyEnrollee,
} from "@/actions/student/student";
import { Enrollee } from "@/constant/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetEnrollees = () =>
  useQuery<Enrollee[]>({
    queryKey: ["get-enrollees"],
    queryFn: async () => {
      const res = await getEnrollees();
      if (!res.success) throw new Error(res.message);
      return res.data!;
    },
    staleTime: 60 * 60 * 1000, // 1h was staleTime
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useGetEnrollee = (enrollee_id: string, open: boolean) =>
  useQuery<Enrollee>({
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
    },
  });
};

export const useGetStudents = () =>
  useQuery<Partial<Enrollee>[]>({
    queryKey: ["get-students"],
    queryFn: async () => {
      const res = await getStudents();
      if (!res.success) throw new Error(res.message);
      return res.data!;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    refetchOnWindowFocus: true,
  });
