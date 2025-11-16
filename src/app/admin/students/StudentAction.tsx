"use client";

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
import {
  MoreHorizontal,
  Trash2,
  Edit,
  CheckSquare,
  CheckCheck,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const SESSIONS = ["firstSession", "secondSession", "thirdSession"] as const;

interface StudentActionProps {
  student_id: string;
  student: Record<string, string>;
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800"
        >
          <DropdownMenuLabel className="px-2 py-1.5 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            Actions
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* --- Group 1: Status Actions --- */}
          <DropdownMenuItem
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => setIsAttendanceOpen(true)}
          >
            <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
            Mark Attendance
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => setIsCompleteOpen(true)}
          >
            <CheckCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Mark as Complete
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* --- Group 2: Management Actions --- */}
          <DropdownMenuItem className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-md transition-colors">
            <Edit className="h-4 w-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* //Dialog to mark attendance */}
      <Dialog open={isAttendanceOpen} onOpenChange={setIsAttendanceOpen}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-center">Mark Attendance</DialogTitle>
            <DialogDescription className="text-muted-foreground text-center">
              Update attendance records for the student.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {SESSIONS.map((sessionKey) => (
              <div
                key={sessionKey}
                className="grid grid-cols-3 items-center gap-4"
              >
                <Label
                  htmlFor={sessionKey}
                  className="capitalize text-right pr-2"
                >
                  {sessionKey.replace("Session", " Session")}
                </Label>
                <Select
                  value={currentAttendance[sessionKey] || ""}
                  onValueChange={(val) => onAttendanceChange(sessionKey, val)}
                >
                  <SelectTrigger
                    id={sessionKey}
                    className="w-full col-span-2 border-gray-300 dark:border-gray-700 text-sm focus:ring-2 focus:ring-sky-500"
                  >
                    <SelectValue placeholder="Mark" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Polished: Added emojis back for clear visual status */}
                    <SelectItem value="Present">✅ Present</SelectItem>
                    <SelectItem value="Absent">❌ Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* //Dialog to mark complete */}
      <Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 rounded-xl shadow-lg p-0">
          <DialogHeader className="pt-8 pb-4 px-6 space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <CheckCircle2 className="h-14 w-14 text-green-500" />
            </div>

            <DialogTitle className="text-center text-2xl font-semibold tracking-tight">
              Confirm Course Completion
            </DialogTitle>

            <DialogDescription className="text-center text-muted-foreground leading-relaxed px-2">
              This action will mark
              <span className="font-semibold text-foreground text-lg mx-1">
                {student.name}
              </span>
              as complete for
              <span className="font-semibold text-foreground text-lg mx-1">
                {student.course}
              </span>
              and prepare their certificate. Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pb-6 sm:justify-center gap-2 px-6">
            <Button
              type="button"
              variant="ghost"
              className="px-6"
              onClick={() => setIsCompleteOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="px-6 bg-green-600 hover:bg-green-700 text-white font-medium"
              onClick={() => {}}
            >
              Confirm & Mark Complete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentAction;
