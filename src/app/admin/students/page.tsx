"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStudents } from "@/hooks/use-student";
import StudentAction from "./StudentAction";
import DebouncedSearchInput from "@/lib/utils/use-debounce";
import { StudentStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Students() {
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = React.useState<StudentStatus | "all">(
    "all",
  );
  const [courseFilter, setCourseFilter] = React.useState("all");

  const {
    data: students,
    isLoading,
    error,
  } = useGetStudents({
    searchName,
    course: courseFilter,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const [attendance, setAttendance] = useState(() => {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem("attendance");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const handleAttendanceChange = (
    studentId: string,
    sessionKey: string,
    value: string,
  ) => {
    setAttendance((prev: any) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [sessionKey]: value },
    }));
  };

  const handleStatusChange = (value: string) => {
    if (value === "all") {
      setStatusFilter("all");
    } else if (value in StudentStatus) {
      setStatusFilter(value as StudentStatus);
    }
  };

  if (error)
    return (
      <div className="p-4 text-red-500">Error: {(error as Error).message}</div>
    );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Student Management
          </CardTitle>
          <CardDescription>
            Filter, manage attendance, and track student enrollment status.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* 4. Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <DebouncedSearchInput
                defaultValue={searchName}
                searchUser={setSearchName}
              />
            </div>

            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-[160px]  h-10">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="TDC">TDC</SelectItem>
                <SelectItem value="PDC">PDC</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full md:w-[160px] h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ENROLLED">Enrolled</SelectItem>
                <SelectItem value="GRADUATED">Graduated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 5. Table Section */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 text-gray-400">#</TableHead>
                  <TableHead className="text-gray-400">Student Name</TableHead>
                  <TableHead className="text-gray-400">Course</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">
                    Sessions (1-2-3)
                  </TableHead>
                  <TableHead className="text-center text-gray-400">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : students && students.length > 0 ? (
                  students.map((student, i) => {
                    const studentAttend = attendance[student.id!] || {};
                    return (
                      <TableRow
                        key={student.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell className="font-medium capitalize">
                          {student.firstName} {student.lastName}
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors shadow-sm",
                              student.course?.courseCode === "TDC"
                                ? "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                                : "bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
                            )}
                          >
                            {student.course?.courseCode ?? "N/A"}
                          </Badge>
                        </TableCell>

                        <TableCell className="py-4">
                          <Badge
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-none capitalize",
                              student.status === "ENROLLED"
                                ? "bg-emerald-100/80 text-emerald-800 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
                            )}
                          >
                            <span
                              className={cn(
                                "mr-1.5 h-1.5 w-1.5 rounded-full",
                                student.status === "ENROLLED"
                                  ? "bg-emerald-500"
                                  : "bg-slate-400",
                              )}
                            />
                            {student.status?.toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3 text-xs font-semibold">
                            {[
                              "firstSession",
                              "secondSession",
                              "thirdSession",
                            ].map((s) => (
                              <span
                                key={s}
                                className={
                                  studentAttend[s] === "Present"
                                    ? "text-green-600"
                                    : studentAttend[s] === "Absent"
                                      ? "text-red-600"
                                      : "text-gray-400"
                                }
                              >
                                {studentAttend[s] === "Present"
                                  ? "P"
                                  : studentAttend[s] === "Absent"
                                    ? "A"
                                    : "-"}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <StudentAction
                            student_id={student.id!}
                            student={student}
                            currentAttendance={studentAttend}
                            onAttendanceChange={(key, val) =>
                              handleAttendanceChange(student.id!, key, val)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center h-24 text-muted-foreground"
                    >
                      No matching students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
