"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { GenericTable } from "@/components/GenericTable";
import { useGetEnrollees } from "@/hooks/use-student";
import Loading from "@/app/loading";
import EnrolleeAction from "./components/EnrolleeAction";
import TableSkeleton from "@/components/TableSkeleton";

type Enrollee = {
  id: string;
  name: string;
  course: string;
  price: number;
  amountPaid: number;
  reference_no: string;
  status: string;
};

export default function EnrolleesPage() {
  const { data: enrollees, isLoading, error } = useGetEnrollees();

  // Map API data to Enrollee type
  const tableData: Enrollee[] = enrollees
    ? enrollees.flatMap((enrollee) =>
        enrollee.invoices.map((invoice) => ({
          id: invoice.id,
          name: `${enrollee.first_name} ${enrollee.last_name}`,
          course: invoice.courseTitle,
          price: invoice.coursePrice,
          amountPaid: invoice.ammountPaid,
          reference_no: invoice.reference_id,
          status: enrollee.status,
        }))
      )
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
              status === "Paid"
                ? "bg-green-700 w-16 text-white"
                : status === "Pending"
                ? "bg-yellow-500 w-16 text-black"
                : "bg-red-500 w-16 text-white"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
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
