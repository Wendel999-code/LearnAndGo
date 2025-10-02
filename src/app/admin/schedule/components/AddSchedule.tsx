"use client";
import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetStudentWithoutSchedule } from "@/hooks/use-schedule";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { addSchedule } from "@/actions/student/schedule";
import toast from "react-hot-toast";
import { Loader, Loader2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface AddScheduleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  day: string;
  time: string;
}

function AddSchedule({ open, setOpen, day, time }: AddScheduleProps) {
  const { data: students, isLoading } = useGetStudentWithoutSchedule();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = React.useState(false);

  const [selectedStudent, setSelectedStudent] = React.useState<
    Record<string, any>
  >({
    first_session: "",
    second_session: "",
    third_session: "",
  });

  const [selectedSession, setSelectedSession] = React.useState<string>("");
  const formattedTime = formatTime(time);

  const handleConfirm = async (
    id: string,
    session: string,
    dayTime: string
  ) => {
    if (!id || !session || !dayTime) {
      toast.error("Please select a student and schedule");
      return;
    }

    try {
      setIsAdding(true);

      const res = await addSchedule(id, session, dayTime);

      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["get-schedules"] });
        queryClient.invalidateQueries({
          queryKey: ["students-without-schedule"],
        });
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">Schedule </DialogTitle>
          <DialogDescription className="text-center mb-4 mt-6 text-2xl">
            Add schedule for <br />
            <strong className="text-yellow-600">
              {day} at {formattedTime}{" "}
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="w-56 h-10" />
              <Skeleton className="w-56 h-10" />
            </div>
          ) : students && students.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {/* Student select */}
              <Select
                value={selectedStudent.id ?? ""}
                onValueChange={(id) => {
                  const student = students?.find((s) => s.id === id);
                  if (student) {
                    setSelectedStudent({
                      id: student.id,
                      first_session: student.schedule?.first_session ?? "",
                      second_session: student.schedule?.second_session ?? "",
                      third_session: student.schedule?.third_session ?? "",
                    });
                  }
                }}
              >
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Select Student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.first_name} {student.last_name}{" "}
                      <span className="text-green-500">
                        ({student.course_key})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Only show session select if a student is selected */}
              {selectedStudent.id && (
                <Select
                  onValueChange={(value) => {
                    setSelectedSession(value);
                  }}
                >
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Select Session" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem
                      value="first"
                      className="flex items-center justify-between"
                    >
                      <Badge className="bg-blue-700 text-white text-xs">
                        1st Session
                      </Badge>
                      <span className="ml-2">
                        {selectedStudent.first_session}
                      </span>
                    </SelectItem>

                    <SelectItem
                      value="second"
                      className="flex items-center justify-between"
                    >
                      <Badge className="bg-yellow-600 text-white">
                        2nd Session
                      </Badge>
                      <span className="ml-2">
                        {selectedStudent.second_session}
                      </span>
                    </SelectItem>

                    <SelectItem
                      value="third"
                      className="flex items-center justify-between"
                    >
                      <Badge className="bg-red-700 text-white">
                        3rd Session
                      </Badge>
                      <span className="ml-2">
                        {selectedStudent.third_session}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">No available students</p>
          )}
        </div>
        <DialogFooter className="mt-6">
          <Button
            disabled={isAdding || !selectedStudent.id || !selectedSession}
            onClick={() =>
              handleConfirm(
                selectedStudent.id,
                selectedSession,
                `${day} ${formattedTime}`
              )
            }
            className="w-full md:w-auto text-black cursor-pointer disabled:bg-gray-400 bg-yellow-500 hover:bg-yellow-600 transition-colors"
          >
            {isAdding ? (
              <>
                {" "}
                <Loader2Icon className=" animate-spin " />{" "}
                <span>Confirming Schedule </span>
              </>
            ) : (
              " Confirm Schedule"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddSchedule;
