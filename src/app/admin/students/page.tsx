"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { GenericTable } from "@/components/GenericTable";
import { useGetStudents } from "@/hooks/use-student";

//save as  table col header
type Student = {
  id: string;
  name: string;
  course: string;
  status: string;
};

function Students() {
  const { data: students, isLoading, error } = useGetStudents();

  const tableData: Student[] = students
    ? students.map((student) => ({
        id: student.id!,
        name: `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim(),
        course: student.course?.courseTitle ?? "N/A",
        status: student.status ?? "N/A",
      }))
    : [];

  const studentColumns: ColumnDef<Student>[] = [
    {
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "course", header: "Course" },
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
                ? "bg-sky-500 w-16 text-white p-2"
                : "bg-yellow-600 w-16 text-white capitalized"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    //  {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => <EnrolleeAction enrollee_id={row.original.id} />,
    // },
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
