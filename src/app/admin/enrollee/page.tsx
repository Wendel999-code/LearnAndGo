"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { GenericTable } from "@/components/GenericTable";
import { useGetEnrollees } from "@/hooks/use-student";
import EnrolleeAction from "./components/EnrolleeAction";


//serve as table header
type Enrollee = {
  id: string;
  name: string;
  course: string;
  price: number;
  ammountPaid: number;
  reference_no: string;
  status: string;
};

function EnrolleesPage() {
  const { data: enrollees, isLoading, error } = useGetEnrollees();

  console.log(enrollees);

  // Map API data to Enrollee type 
  const tableData: Enrollee[] = enrollees
    ? enrollees.flatMap((enrollee) =>
      enrollee.invoices.length > 0
        ? enrollee.invoices.map((invoice) => ({
          id: enrollee.id,
          name: `${enrollee.first_name} ${enrollee.last_name}`,
          course: invoice.courseTitle ?? "N/A",
          price: invoice.coursePrice ?? 0,
          ammountPaid: invoice.ammountPaid ?? 0,
          reference_no: invoice.reference_id ?? "N/A",
          status: enrollee.status,
        }))
        : [
          {
            id: enrollee.id,
            name: `${enrollee.first_name} ${enrollee.last_name}`,
            course: "N/A",
            price: 0,
            ammountPaid: 0,
            reference_no: "N/A",
            status: enrollee.status,
          },
        ]
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
      accessorKey: "ammountPaid",
      header: "Amount Paid",
      cell: ({ row }) => {
        const value = row.getValue<number>("ammountPaid"); // fixed type
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
                  : "bg-yellow-600 w-16 text-white lowercase"
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


export default EnrolleesPage