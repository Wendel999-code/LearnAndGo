"use client";

import { GenericTable } from "@/components/GenericTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import EnrolleeAction from "../enrollee/components/EnrolleeAction";
import { useGetEnrollees } from "@/hooks/use-student";
import { formatToMDYWithTime } from "@/lib/utils/date";

// table col header
type Payment = {
  id: string;
  name: string;
  status: string;
  course: string;
  amount: number;
  amountPaid: number;
  payment_channel: string | null;
  paidAt: string | null;
  reference_no: string;
};

export default function PaymentsPage() {
  const { data: enrollees, isLoading, error } = useGetEnrollees();

  const tableData: Payment[] = enrollees
    ? enrollees?.map((enrollee) => ({
        id: enrollee.invoices?.id as string,
        name: `${enrollee.firstName} ${enrollee.lastName}`,
        course: enrollee.course?.courseCode ?? "N/A",
        amount: enrollee.invoices?.price ?? 0,
        amountPaid: enrollee.invoices?.amountPaid ?? 0,
        payment_channel: enrollee.invoices?.payment_channel ?? "N/A",
        paidAt: enrollee.invoices?.createdAt
          ? formatToMDYWithTime(enrollee.invoices?.createdAt)
          : null,
        reference_no: enrollee.invoices?.reference_id ?? "N/A",
        status: enrollee.invoices?.status as string,
      }))
    : [];

  const paymentColumns: ColumnDef<Payment>[] = [
    {
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    { accessorKey: "name", header: " Name" },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => {
        const course = row.getValue("course") as Payment["course"];
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
      accessorKey: "amount",
      header: "Price",
      cell: ({ row }) => {
        const value = row.getValue<number>("amount");
        return <span>₱{value.toLocaleString()}</span>;
      },
    },
    {
      accessorKey: "amountPaid",
      header: "Amount Paid",
      cell: ({ row }) => {
        const value = row.getValue<number>("amountPaid");
        return <span>₱{value.toLocaleString()}</span>;
      },
    },
    { accessorKey: "payment_channel", header: "Payment Mode" },
    { accessorKey: "reference_no", header: "Reference No." },
    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Payment["status"];
        return (
          <Badge className="bg-emerald-600 ">{status.toLowerCase()}</Badge>
        );
      },
    },

    { accessorKey: "paidAt", header: "Paid At" },

    // TODO replace enrollee action to payment action
    {
      header: "Actions",
      id: "actions",
      enableHiding: false,
      // cell: ({ row }) => <EnrolleeAction enrollee_id={row.original.id} />,
    },
  ];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <GenericTable
      title="Enrollee Invoices"
      loading={isLoading}
      data={tableData}
      columns={paymentColumns}
      searchKey="reference_no"
    />
  );
}
