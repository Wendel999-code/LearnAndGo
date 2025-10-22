"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { GenericTable } from "@/components/GenericTable";
import { useGetEnrollees } from "@/hooks/use-student";
import EnrolleeAction from "./components/EnrolleeAction";
import { formatToMDYWithTime } from "@/lib/utils/date";

//serve as table header
type Enrollee = {
  id: string;
  name: string;
  course: string;
  price: number;
  amountPaid: number;
  reference_no: string;
  status: string;
  createdAt: string | null;
};

function EnrolleesPage() {
  const { data: enrollees, isLoading, error } = useGetEnrollees();

  const tableData: Enrollee[] = enrollees
    ? enrollees?.map((enrollee) => ({
        id: enrollee.id,
        name: `${enrollee.firstName} ${enrollee.lastName}`,
        course: enrollee.course?.courseTitle ?? "N/A",
        price: enrollee.course?.price ?? 0,
        amountPaid: enrollee.invoices?.amountPaid ?? 0,
        reference_no: enrollee.invoices?.reference_id ?? "N/A",
        status: enrollee.status as string,
        createdAt: enrollee.createdAt
          ? formatToMDYWithTime(enrollee.createdAt)
          : null,
      }))
    : [];

  const enrolleeColumns: ColumnDef<Enrollee>[] = [
    {
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "course", header: "Course" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const value = row.getValue<number>("price");
        return <span>₱{value.toLocaleString()}</span>;
      },
    },
    {
      accessorKey: "amountPaid",
      header: "Amount Paid",
      cell: ({ row }) => {
        const value = row.getValue<number>("amountPaid"); // fixed type
        return <span>₱{value.toLocaleString()}</span>;
      },
    },
    { accessorKey: "reference_no", header: "Reference No." },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Enrollee["status"];
        return (
          <Badge
            className={
              status === "PENDING"
                ? "bg-yellow-800 w-16 text-white lowercase"
                : status === "Pending"
                ? "bg-yellow-500 w-16 text-black"
                : "bg-yellow-600 w-16 text-white lowercase"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    { accessorKey: "createdAt", header: "Enroll on" },
    {
      header: "Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <EnrolleeAction enrollee_id={row.original.id} />,
    },
  ];

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <GenericTable
      title="Enrollees"
      loading={isLoading}
      data={tableData}
      columns={enrolleeColumns}
    />
  );
}

export default EnrolleesPage;
