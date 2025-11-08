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
  enrollee_id: string;
  currentAttendance: Record<string, string>;
  onAttendanceChange: (sessionKey: string, value: string) => void;
}

function StudentAction({
  enrollee_id,
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
        <DialogContent className="sm:max-w-md dark:bg-gray-800">
          <DialogHeader className="pt-4">
            {/* --- Polished: Added Icon --- */}
            <div className="flex justify-center pb-2">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            {/* --- --- */}
            <DialogTitle className="text-center text-xl">
              Confirm Course Completion
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-center">
              This will mark the student as complete with the practical driving
              course and ready for certificate generation. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4 sm:justify-center">
            {/* Polished: Changed to "ghost" for a cleaner, secondary action */}
            <Button
              type="button"
              variant="ghost" // Changed from outline
              onClick={() => setIsCompleteOpen(false)}
            >
              Cancel
            </Button>
            {/* Polished: Added green "success" button for the primary action */}
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white" // Success color
              onClick={() => {
                // Add your logic to mark as complete here
                console.log("Marking student as complete...");
                setIsCompleteOpen(false); // Close dialog on confirm
              }}
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
