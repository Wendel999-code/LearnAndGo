"use client";

import { graduateStudent } from "@/actions/student/student";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import {
  MoreHorizontal,
  Trash2,
  Edit,
  CheckSquare,
  CheckCheck,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const SESSIONS = ["firstSession", "secondSession", "thirdSession"] as const;

interface StudentActionProps {
  student_id: string;
  // Updated to accept numbers (like age), strings, etc.
  student: Record<string, any>;
  currentAttendance: Record<string, string>;
  onAttendanceChange: (sessionKey: string, value: string) => void;
}

function StudentAction({
  student_id,
  student,
  currentAttendance,
  onAttendanceChange,
}: StudentActionProps) {
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isGraduatingLoading, setIsGraduatingLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleGraduate = async () => {
    setIsGraduatingLoading(true);
    try {
      const res = await graduateStudent(student_id);

      if (!res.success) {
        toast.error(res.message || "Failed to mark student as complete.");
        return; // Exit early on failure
      }

      queryClient.invalidateQueries({ queryKey: ["get-students"] });
      toast.success(res.message);
      setIsCompleteOpen(false);
    } catch (error) {
      console.error("Error marking student as complete:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsGraduatingLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted/50 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
          <DropdownMenuLabel className="text-center text-xs text-muted-foreground uppercase tracking-wider">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsAttendanceOpen(true)}
            className="gap-2"
          >
            <CheckSquare className="h-4 w-4 text-green-600" />
            Mark Attendance
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsCompleteOpen(true)}
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4 text-blue-600" />
            Mark as Complete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 text-yellow-600">
            <Edit className="h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Attendance Dialog */}
      <Dialog open={isAttendanceOpen} onOpenChange={setIsAttendanceOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Mark Attendance</DialogTitle>
            <DialogDescription className="text-center">
              Update session records for{" "}
              <span className="font-semibold">{student.name}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {SESSIONS.map((sessionKey) => (
              <div
                key={sessionKey}
                className="grid grid-cols-3 items-center gap-4"
              >
                <Label className="capitalize text-right pr-2">
                  {sessionKey.replace("Session", " Session")}
                </Label>
                <Select
                  value={currentAttendance[sessionKey] || ""}
                  onValueChange={(val) => onAttendanceChange(sessionKey, val)}
                >
                  <SelectTrigger className="col-span-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">✅ Present</SelectItem>
                    <SelectItem value="Absent">❌ Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Completion Dialog */}
      <Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-xl">
          <div className="pt-8 pb-4 px-6 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-14 w-14 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              Confirm Completion
            </DialogTitle>
            <p className="text-muted-foreground leading-relaxed">
              Mark{" "}
              <span className="font-bold text-foreground">{student.name}</span>{" "}
              as complete for
              <span className="font-bold text-foreground ml-1">
                {student.course.courseCode}
              </span>
              ?
            </p>
          </div>
          <DialogFooter className="bg-muted/30 p-4 sm:justify-center gap-2">
            <Button variant="ghost" onClick={() => setIsCompleteOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isGraduatingLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
              onClick={handleGraduate}
            >
              {isGraduatingLoading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentAction;
