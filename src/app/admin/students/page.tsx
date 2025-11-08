"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { GenericTable } from "@/components/GenericTable";
import { useGetStudents } from "@/hooks/use-student";
import StudentAction from "./StudentAction";
import { useEffect, useState } from "react";

type Student = {
  id: string;
  name: string;
  course: string;
  status: string;
  firstSession?: string;
  secondSession?: string;
  thirdSession?: string;
};

export const SESSIONS = [
  "firstSession",
  "secondSession",
  "thirdSession",
] as const;

function Students() {
  const { data: students, isLoading, error } = useGetStudents();

  const [attendance, setAttendance] = useState(() => {
    // Check if window is defined (for SSR/Next.js)
    if (typeof window === "undefined") {
      return {};
    }
    const stored = localStorage.getItem("attendance");
    return stored ? JSON.parse(stored) : {};
  });

  console.log("attendance", attendance);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  // This is the main state update function
  const handleAttendanceChange = (
    studentId: string,
    sessionKey: string,
    value: string
  ) => {
    setAttendance((prev: any) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [sessionKey]: value },
    }));
  };

  const tableData: Student[] = students
    ? students.map((student) => ({
        id: student.id!,
        name: `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim(),
        course: student.course?.courseCode ?? "N/A",
        status: student.status ?? "N/A",
      }))
    : [];

  const studentColumns: ColumnDef<Student>[] = [
    {
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => {
        const course = row.getValue("course") as Student["course"];
        return (
          <Badge
            className={(() => {
              switch (course) {
                case "TDC":
                  return "bg-yellow-700 w-10 p-1 text-white capitalize";
                case "PDC":
                  return "bg-sky-600 w-10 text-white capitalize";
                default:
                  return "bg-gray-500 w-10 text-white capitalize";
              }
            })()}
          >
            {course === "TDC"
              ? "TDC"
              : course === "PDC"
              ? "PDC"
              : course.toLowerCase().replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Student["status"];
        return (
          <Badge
            className={
              status === "ENROLLED"
                ? "bg-green-700 w-18 text-white p-1 capitalized"
                : status === "Graduated"
                ? "bg-sky-600 w-16 text-white p-2"
                : "bg-gray-600 w-16 text-white capitalized"
            }
          >
            {status}
          </Badge>
        );
      },
    },

    //TODO MAKE A DB FOR SESSIONS ATTENDANCE
    {
      accessorKey: "firstSession",
      header: "1st Session",
      cell: ({ row }) => {
        const attend = row.original.id ? attendance[row.original.id] : null;
        const value = attend?.firstSession || "N/A";

        return (
          <span
            className={
              value === "Present"
                ? "text-green-600 font-semibold px-3 py-1"
                : value === "Absent"
                ? "text-red-600 font-semibold px-3 py-1"
                : "text-gray-500 font-semibold px-3 py-1"
            }
          >
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "secondSession",
      header: "2nd Session",
      cell: ({ row }) => {
        const attend = row.original.id ? attendance[row.original.id] : null;
        const value = attend?.secondSession || "N/A";

        return (
          <span
            className={
              value === "Present"
                ? "text-green-600 font-semibold px-3 py-1"
                : value === "Absent"
                ? "text-red-600 font-semibold px-3 py-1"
                : "text-gray-500 font-semibold px-3 py-1"
            }
          >
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "thirdSession",
      header: "3rd Session",
      cell: ({ row }) => {
        const attend = row.original.id ? attendance[row.original.id] : null;
        const value = attend?.thirdSession || "N/A";

        return (
          <span
            className={
              value === "Present"
                ? "text-green-600 font-semibold px-3 py-1"
                : value === "Absent"
                ? "text-red-600 font-semibold px-3 py-1"
                : "text-gray-500 font-semibold px-3 py-1"
            }
          >
            {value}
          </span>
        );
      },
    },

    {
      header: "Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const studentId = row.original.id;
        const studentAttendance = attendance[studentId] || {};

        // Create a handler specific to this student
        const handleStudentAttendanceChange = (
          sessionKey: string,
          value: string
        ) => {
          handleAttendanceChange(studentId, sessionKey, value);
        };

        return (
          <StudentAction
            enrollee_id={studentId}
            currentAttendance={studentAttendance}
            onAttendanceChange={handleStudentAttendanceChange}
          />
        );
      },
    },
  ];
  if (error) return <div>Error: {(error as Error).message}</div>;
  return (
    <GenericTable
      title="Students"
      loading={isLoading}
      data={tableData}
      columns={studentColumns}
    />
  );
}

export default Students;
