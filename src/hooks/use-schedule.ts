import {
  getMySchedule,
  getSchedules,
  getStudentWithoutSchedule,
} from "@/actions/student/schedule";
import { MySchedule, Schedules, StudentWithoutSchedule } from "@/constant/type";
import { useQuery } from "@tanstack/react-query";

export const useGetShedules = () =>
  useQuery<Schedules[]>({
    queryKey: ["get-schedules"],
    queryFn: async () => {
      const res = await getSchedules();
      if (!res.success) throw new Error(res.message);
      return res.data!;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useGetMyShedule = (email: string) =>
  useQuery<MySchedule>({
    queryKey: ["my-schedule", email],
    queryFn: async () => {
      const res = await getMySchedule(email);
      if (!res.success) throw new Error(res.message);
      return res.data!;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useGetStudentWithoutSchedule = () =>
  useQuery<StudentWithoutSchedule[]>({
    queryKey: ["students-without-schedule"],
    queryFn: async () => {
      const res = await getStudentWithoutSchedule();
      if (!res.success) throw new Error(res.message);
      return res.data!;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
