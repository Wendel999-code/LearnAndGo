"use client";

import { GenericTable } from "@/components/GenericTable";
import { useGetEnrollees } from "@/hooks/use-student";
import { formatToMDYWithTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

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
    ? enrollees.flatMap((enrollee) =>
        enrollee.invoices.length > 0
          ? enrollee.invoices.map((invoice) => ({
              id: invoice.id,
              name: `${enrollee.first_name} ${enrollee.last_name}`,
              course: enrollee.course ?? "N/A",
              amount: invoice.price ?? 0,
              amountPaid: invoice.ammountPaid ?? 0,
              payment_channel: invoice.payment_channel,
              paidAt: invoice.paidAt
                ? formatToMDYWithTime(invoice.paidAt)
                : null,
              reference_no: invoice.reference_id ?? "N/A",
              status: invoice.status as string,
            }))
          : []
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
    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Payment["status"];
        return (
          <Badge
            className={
              status === "PAID"
                ? "bg-green-700 w-16 text-white lowercase"
                : status === "Pending"
                ? "bg-yellow-500 w-16 text-black"
                : "bg-red-600 w-16 text-white lowercase"
            }
          >
            {status}
          </Badge>
        );
      },
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
