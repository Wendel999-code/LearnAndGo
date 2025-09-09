"use client";

import { GenericTable } from "@/components/GenericTable";
import { useGetEnrollees } from "@/hooks/use-student";
import { formatToMDYWithTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

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

  // Map API data to Enrollee type
  const tableData: Payment[] = enrollees
    ? enrollees.flatMap((enrollee) =>
        enrollee.invoices.map((invoice) => ({
          id: invoice.id,
          name: `${enrollee.first_name} ${enrollee.last_name}`,
          course: invoice.courseTitle,
          amount: invoice.coursePrice,
          amountPaid: invoice.ammountPaid,
          reference_no: invoice.reference_id,
          status: enrollee.status,
          payment_channel: invoice.payment_channel,
          paidAt: formatToMDYWithTime(invoice.paidAt),
        }))
      )
    : [];

  const paymentColumns: ColumnDef<Payment>[] = [
    {
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    { accessorKey: "name", header: " Name" },
    { accessorKey: "course", header: "Course" },
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
    { accessorKey: "paidAt", header: "Paid At" },
    { accessorKey: "reference_no", header: "Reference No." },
  ];

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
