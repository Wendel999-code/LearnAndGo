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
import ScheduleAction from "./ScheduleAction";

interface AddScheduleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  day: string;
  time: string;
  schedules?: Record<string, any>;
}

const sessions = [
  {
    value: "first",
    label: "1st Session",
    color: "bg-blue-600",
    key: "first_session",
  },
  {
    value: "second",
    label: "2nd Session",
    color: "bg-amber-600",
    key: "second_session",
  },
  {
    value: "third",
    label: "3rd Session",
    color: "bg-red-600",
    key: "third_session",
  },
];

export default function AddSchedule({
  open,
  setOpen,
  day,
  time,
  schedules,
}: AddScheduleProps) {
  const { data: students, isLoading } = useGetStudentWithoutSchedule();
  const { data: instructors } = useGetInstructors();

  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);
  const [selectedInstructor, setSelectedInstructor] = React.useState<any>(null);
  const [selectedSession, setSelectedSession] = React.useState<string>("");

  const formattedTime = formatTime(time);

  const resetForm = () => {
    setSelectedStudent(null);
    setSelectedInstructor(null);
    setSelectedSession("");
    setIsAdding(false);
  };

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
      resetForm();
    }
  };

  const availableSessions = React.useMemo(() => {
    if (!selectedStudent || !schedules) return sessions;

    const schedule = schedules.find(
      (sch: any) => sch.student?.id === selectedStudent?.id
    );

    if (!schedule) return sessions;

    return sessions.filter((s) => !schedule[s.key]);
  }, [selectedStudent, schedules]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          resetForm();
        }
      }}
    >
      <DialogContent className="max-w-lg md:max-w-3xl rounded-2xl border border-gray-200 dark:border-zinc-800 backdrop-blur-sm">
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

        {/* --- SCROLLABLE WRAPPER for main content --- */}
        <div className="overflow-y-auto max-h-[60vh] pr-4 space-y-4">
          {/* Form Section */}
          <div className="space-y-2">
            {isLoading ? (
              <>
                <Skeleton className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-10 w-full" />
                <Skeleton className="bg-gray-200 dark:bg-zinc-800 animate-pulse h-10 w-full" />
              </>
            ) : students && students.length > 0 ? (
              <div className="grid grid-cols-3 mt-12 gap-4">
                {/* Step 1: Student Select */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">
                    Step 1: Select Student
                  </label>
                  <Select
                    value={selectedStudent?.id ?? ""}
                    onValueChange={(id) => {
                      const student = students.find((s) => s.id === id);
                      if (student) {
                        setSelectedStudent(student);
                        setSelectedSession("");
                        setSelectedInstructor(null);
                      }
                    }}
                  >
                    <SelectTrigger className="h-11 w-full">
                      {selectedStudent ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={selectedStudent.selfie_URL!} />
                            <AvatarFallback className="text-xs font-semibold">
                              {`${selectedStudent.firstName?.[0] ?? ""}${
                                selectedStudent.lastName?.[0] ?? ""
                              }`}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium capitalize">
                            {selectedStudent.firstName}{" "}
                            {selectedStudent.lastName}
                          </span>
                        </div>
                      ) : (
                        <SelectValue placeholder="Select Student" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem
                          key={student.id}
                          value={student.id ?? ""}
                          className="cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={student.selfie_URL!} />
                            <AvatarFallback className="text-xs font-semibold">
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
                {selectedStudent && (
                  <div className="transition-opacity duration-500 opacity-100">
                    <label className="text-xs text-gray-400 mb-2 block">
                      Step 2: Select Session
                    </label>
                    <Select
                      onValueChange={(val) => setSelectedSession(val)}
                      value={selectedSession}
                    >
                      <SelectTrigger className="h-11 w-full">
                        {selectedSession ? (
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                sessions.find(
                                  (s) => s.value === selectedSession
                                )?.color
                              }`}
                            />
                            <span className="text-sm">
                              {
                                sessions.find(
                                  (s) => s.value === selectedSession
                                )?.label
                              }
                            </span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select Session" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {availableSessions.length > 0 ? (
                          availableSessions.map((session) => (
                            <SelectItem
                              key={session.value}
                              value={session.value}
                              className="p-2 cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`h-2 w-2 rounded-full ${session.color}`}
                                />
                                <span className="text-sm">{session.label}</span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500 text-center">
                            No available sessions for this student.
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Step 3: Select instructor */}
                {selectedSession && (
                  <div className="transition-opacity duration-500 opacity-100">
                    <label className="text-xs text-gray-400 mb-2 block">
                      Step 3: Select instructor
                    </label>
                    <Select
                      onValueChange={(val) => setSelectedInstructor(val)}
                      value={selectedInstructor}
                    >
                      <SelectTrigger className="h-11 w-full">
                        {selectedInstructor && instructors ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={
                                  instructors.find(
                                    (i) => i.id === selectedInstructor
                                  )?.image_URL!
                                }
                              />
                              <AvatarFallback className="text-xs font-semibold">
                                {`${
                                  instructors.find(
                                    (i) => i.id === selectedInstructor
                                  )?.firstName?.[0] ?? ""
                                }${
                                  instructors.find(
                                    (i) => i.id === selectedInstructor
                                  )?.lastName?.[0] ?? ""
                                }`}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {
                                instructors.find(
                                  (i) => i.id === selectedInstructor
                                )?.firstName
                              }{" "}
                              {
                                instructors.find(
                                  (i) => i.id === selectedInstructor
                                )?.lastName
                              }
                            </span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select instructor" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {instructors?.map((instructor) => (
                          <SelectItem
                            key={instructor.id}
                            value={instructor.id ?? ""}
                            className="p-2 cursor-pointer focus:bg-gray-700 focus:text-white rounded-lg transition-colors ease-in-out duration-300"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={instructor.image_URL!} />
                                <AvatarFallback className="text-xs font-semibold">
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
                )}
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
                {/* --- SCROLLABLE WRAPPER for table --- */}
                <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
                  <table className="w-full min-w-max text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-xs font-semibold sticky top-0">
                      <tr>
                        {/* --- NUMBERING Column Header --- */}
                        <th className="px-4 py-3 w-12 text-center">#</th>
                        <th className="px-4 py-3">Student</th>
                        <th className="px-4 py-3">Course</th>
                        <th className="px-4 py-3">Session</th>
                        <th className="px-4 py-3">Instructor</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                      {/* --- REFACTORED MAP for numbering --- */}
                      {schedules
                        .filter(
                          (s: any) =>
                            s.first_session === `${day} ${formattedTime}` ||
                            s.second_session === `${day} ${formattedTime}` ||
                            s.third_session === `${day} ${formattedTime}`
                        )
                        .flatMap((schedule: any) => {
                          const { student } = schedule;
                          const sessions = [
                            {
                              key: "First Session",
                              value: schedule.first_session,
                              instructor: schedule.first_instructor,
                            },
                            {
                              key: "Second Session",
                              value: schedule.second_session,
                              instructor: schedule.second_instructor,
                            },
                            {
                              key: "Third Session",
                              value: schedule.third_session,
                              instructor: schedule.third_instructor,
                            },
                          ]
                            .filter(
                              (s) => s.value === `${day} ${formattedTime}`
                            )
                            .map((session) => ({
                              key: `${schedule.id}-${session.key}`,
                              schedule,
                              student,
                              session,
                            }));

                          return sessions;
                        })
                        .map((row: any, index: number) => {
                          const { student, schedule, session } = row;
                          return (
                            <tr
                              key={row.key}
                              className="hover:bg-amber-50/40 dark:hover:bg-zinc-800/50 transition-colors"
                            >
                              {/* --- NUMBERING Column Data --- */}
                              <td className="px-4 py-3 text-center font-medium text-gray-500">
                                {index + 1}
                              </td>

                              <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                                <div className="flex items-center gap-2 text-neutral-700 dark:text-gray-400">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={student.selfie_URL} />
                                    <AvatarFallback className="text-xs font-semibold">
                                      {`${student.firstName?.[0] ?? ""}${
                                        student.lastName?.[0] ?? ""
                                      }`}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="capitalize">
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
                                {session.instructor ? (
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={session.instructor.image_URL!}
                                      />
                                      <AvatarFallback className="text-xs font-semibold">
                                        {`${
                                          session.instructor.firstName?.[0] ??
                                          ""
                                        }${
                                          session.instructor.lastName?.[0] ?? ""
                                        }`}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">
                                      {session.instructor.firstName}{" "}
                                      {session.instructor.lastName}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-400">
                                    N/A
                                  </span>
                                )}
                              </td>

                              <td className="px-4 py-3 text-right">
                                <ScheduleAction
                                  id={schedule.id}
                                  session={session.key}
                                />
                              </td>
                            </tr>
                          );
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
        </div>

        {/* --- FOOTER with top border --- */}
        <DialogFooter className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800">
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
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
