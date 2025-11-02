"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStudentWithoutSchedule } from "@/hooks/use-schedule";
import { useQueryClient } from "@tanstack/react-query";
import { addSchedule } from "@/actions/student/schedule";
import { LoaderCircle } from "lucide-react";
import { formatTime } from "@/lib/utils/date";
import toast from "react-hot-toast";
import { useGetInstructors } from "@/hooks/use-instructor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AddScheduleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  day: string;
  time: string;
  schedules?: Record<string, any>;
}

export default function AddSchedule({
  open,
  setOpen,
  day,
  time,
  schedules,
}: AddScheduleProps) {
  const { data: students, isLoading } = useGetStudentWithoutSchedule();
  const { data: instructors, isLoading: isLoadingInstructors } =
    useGetInstructors();

  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);
  const [selectedInstructor, setSelectedInstructor] = React.useState<any>(null);
  const [selectedSession, setSelectedSession] = React.useState<string>("");

  const formattedTime = formatTime(time);

  console.log("instructor", selectedInstructor);
  console.log("student", selectedStudent);

  const handleConfirm = async (
    id: string,
    session: string,
    dayTime: string,
    instructor_id: string
  ) => {
    if (!id || !session || !dayTime || !instructor_id) {
      toast.error("Please select a student, session and instructor.");
      return;
    }
    try {
      setIsAdding(true);
      const res = await addSchedule(id, session, dayTime, instructor_id);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["get-schedules"] });
        queryClient.invalidateQueries({
          queryKey: ["students-without-schedule"],
        });
        toast.success(res.message);
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg md:max-w-2xl rounded-2xl border border-gray-200 dark:border-zinc-800  backdrop-blur-sm">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center text-neutral-900 dark:text-white">
            Schedule a Session
          </DialogTitle>
          <DialogDescription className="text-center text-base text-neutral-700 dark:text-gray-400">
            For{" "}
            <span className="text-amber-600 dark:text-amber-500 font-semibold">
              {day}
            </span>{" "}
            at{" "}
            <span className="text-amber-600 dark:text-amber-500 font-semibold">
              {formattedTime}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Step 1 & 2, 3: Select Section */}
        <div className="mt-6 space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-10  w-40" />
              <Skeleton className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-10 w-40" />
            </>
          ) : students && students.length > 0 ? (
            <div className="flex gap-4 mt-6 w-full ">
              {/* Step 1: Student Select */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block">
                  Step 1: Select Student
                </label>
                <Select
                  value={selectedStudent?.id ?? ""}
                  onValueChange={(id) => {
                    const student = students.find((s) => s.id === id);
                    if (student) setSelectedStudent(student);
                  }}
                >
                  <SelectTrigger className="h-9 w-[200px]">
                    <SelectValue placeholder="Select Student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem
                        key={student.id}
                        value={student.id ?? ""}
                        // I added focus:text-white for better contrast
                        className="cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                      >
                        <Avatar className="h-6 w-6">
                          {" "}
                          {/* Made avatar smaller */}
                          <AvatarImage src={student.selfie_URL!} />
                          <AvatarFallback className="text-xs font-semibold">
                            {" "}
                            {/* Made fallback text smaller */}
                            {`${student.firstName?.[0] ?? ""}${
                              student.lastName?.[0] ?? ""
                            }`}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium capitalize">
                          {student.firstName} {student.lastName}
                        </span>
                        <span className="text-xs text-amber-600 font-semibold dark:text-amber-500 ml-2">
                          ({student.course?.courseCode})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Step 2: Session Select */}
              <div
                className={`transition-opacity duration-300 ${
                  selectedStudent
                    ? "opacity-100"
                    : "opacity-50 pointer-events-none" // Added pointer-events-none
                }`}
              >
                <label className="text-xs text-gray-400 mb-2 block">
                  Step 2: Select Session
                </label>
                <Select
                  onValueChange={(val) => setSelectedSession(val)}
                  value={selectedSession}
                  disabled={!selectedStudent}
                >
                  <SelectTrigger className="h-9 w-[200px]">
                    <SelectValue placeholder="Select Session" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Note: I'm overriding padding with p-2 to remove the default indent */}
                    <SelectItem
                      value="first"
                      className="p-2 cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span className="text-sm">1st Session</span>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="second"
                      className="p-2 cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-600" />
                        <span className="text-sm">2nd Session</span>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="third"
                      className="p-2 cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-600" />
                        <span className="text-sm">3rd Session</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Step 3: Select instructor */}
              <div
                className={`transition-opacity duration-300 ${
                  selectedStudent
                    ? "opacity-100"
                    : "opacity-50 pointer-events-none" // Added pointer-events-none
                }`}
              >
                <label className="text-xs text-gray-400 mb-2 block">
                  Step 3: Select instructor
                </label>
                <Select
                  onValueChange={(val) => setSelectedInstructor(val)}
                  value={selectedInstructor}
                  disabled={!selectedStudent}
                >
                  <SelectTrigger className="h-9 w-[200px]">
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructors?.map((instructor) => (
                      <SelectItem
                        key={instructor.id}
                        value={instructor.id ?? ""}
                        // Override padding, add focus styles for consistency
                        className="p-2 cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                      >
                        {/* Added a flex wrapper to align avatar and name */}
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {" "}
                            {/* Made avatar smaller */}
                            <AvatarImage src={instructor.image_URL!} />
                            <AvatarFallback className="text-xs font-semibold">
                              {" "}
                              {/* Made fallback text smaller */}
                              {`${instructor.firstName?.[0] ?? ""}${
                                instructor.lastName?.[0] ?? ""
                              }`}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {instructor.firstName} {instructor.lastName}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <p className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-4">
              No available students
            </p>
          )}
        </div>

        {/* Existing Schedules Table */}
        <div className="mt-8">
          <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
            Already Scheduled for this Time
          </h3>

          {schedules?.some(
            (s: any) =>
              s.first_session === `${day} ${formattedTime}` ||
              s.second_session === `${day} ${formattedTime}` ||
              s.third_session === `${day} ${formattedTime}`
          ) ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-xs font-semibold">
                    <tr>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Course</th>
                      <th className="px-4 py-3">Session</th>
                      <th className="px-4 py-3">Instructor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                    {schedules
                      .filter(
                        (s: any) =>
                          s.first_session === `${day} ${formattedTime}` ||
                          s.second_session === `${day} ${formattedTime}` ||
                          s.third_session === `${day} ${formattedTime}`
                      )
                      .map((schedule: any, idx: number) => {
                        const { student, instructor } = schedule;
                        const sessions = [
                          {
                            key: "First Session",
                            value: schedule.first_session,
                          },
                          {
                            key: "Second Session",
                            value: schedule.second_session,
                          },
                          {
                            key: "Third Session",
                            value: schedule.third_session,
                          },
                        ].filter((s) => s.value === `${day} ${formattedTime}`);

                        return sessions.map((session, i) => (
                          <tr
                            key={`${idx}-${i}`}
                            className="hover:bg-amber-50/40 dark:hover:bg-zinc-800/50 transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                              <div className="flex items-center gap-2 text-neutral-700 dark:text-gray-400">
                                <Avatar className="h-6 w-6">
                                  {" "}
                                  {/* Made avatar smaller */}
                                  <AvatarImage src={student.selfie_URL} />
                                  <AvatarFallback className="text-xs font-semibold">
                                    {" "}
                                    {/* Made fallback text smaller */}
                                    {`${student.firstName?.[0] ?? ""}${
                                      student.lastName?.[0] ?? ""
                                    }`}
                                  </AvatarFallback>
                                </Avatar>
                                <span>
                                  {student.firstName} {student.lastName}
                                </span>
                              </div>
                            </td>

                            <td className="px-4 py-3 text-neutral-700 dark:text-gray-400">
                              {student.course?.courseCode ?? "N/A"}
                            </td>

                            <td className="px-4 py-3 text-neutral-700 dark:text-gray-400">
                              {session.key === "First Session" && (
                                <div className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                                  <span className="text-sm">1st Session</span>
                                </div>
                              )}
                              {session.key === "Second Session" && (
                                <div className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-amber-600" />
                                  <span className="text-sm">2nd Session</span>
                                </div>
                              )}
                              {session.key === "Third Session" && (
                                <div className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-red-600" />
                                  <span className="text-sm">3rd Session</span>
                                </div>
                              )}
                            </td>

                            <td className="px-4 py-3 text-neutral-700 dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  {" "}
                                  {/* Made avatar smaller */}
                                  <AvatarImage src={instructor.image_URL!} />
                                  <AvatarFallback className="text-xs font-semibold">
                                    {" "}
                                    {/* Made fallback text smaller */}
                                    {`${instructor.firstName?.[0] ?? ""}${
                                      instructor.lastName?.[0] ?? ""
                                    }`}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  {instructor.firstName} {instructor.lastName}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ));
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              No sessions found for this time slot.
            </p>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6">
          <Button
            size={"sm"}
            disabled={
              isAdding ||
              !selectedStudent?.id ||
              !selectedSession ||
              !selectedInstructor
            }
            onClick={() =>
              handleConfirm(
                selectedStudent.id,
                selectedSession,
                `${day} ${formattedTime}`,
                selectedInstructor
              )
            }
            className="h-10 px-6 font-semibold cursor-pointer text-black bg-amber-500 hover:bg-amber-600 transition-all duration-300 disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                Confirming...
              </>
            ) : (
              "Confirm "
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
