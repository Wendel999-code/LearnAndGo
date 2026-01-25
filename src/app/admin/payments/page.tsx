"use client";

import { GenericTable } from "@/components/GenericTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatToMDYWithTime } from "@/lib/utils/date";
import { useGetInvoices } from "@/hooks/use-invoice";
import toast from "react-hot-toast";
import PaymentAction from "./components/PaymentAction";
import { cn, handleCopy } from "@/lib/utils";
import { Copy, CreditCard } from "lucide-react";

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
  const { data: enrollees, isLoading, error } = useGetInvoices();

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
            variant="outline"
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors shadow-sm",
              course === "TDC"
                ? "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                : "bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
            )}
          >
            {course ?? "N/A"}
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
    {
      accessorKey: "payment_channel",
      header: "Payment Mode",
      cell: ({ row }) => {
        const val = row.getValue(
          "payment_channel",
        ) as Payment["payment_channel"];

        return (
          <Badge
            className={cn(
              "rounded-full px-2.5 py-0.5 font-medium shadow-none border flex items-center w-fit gap-1",
              (() => {
                const channel = val?.toUpperCase();
                switch (channel) {
                  case "GCASH":
                    return "bg-[#007CFF] text-white border-none"; // Official GCash Blue
                  case "MAYA":
                  case "PAYMAYA":
                    return "bg-[#00945A] text-white border-none"; // Official Maya Green
                  case "GRABPAY":
                    return "bg-[#02B150] text-white border-none"; // Official Grab Green
                  default:
                    return "bg-slate-100 text-slate-700 border-slate-200";
                }
              })(),
            )}
          >
            <span className="text-[11px] font-bold tracking-tight">
              {val ?? "N/A"}
            </span>
          </Badge>
        );
      },
    },
    {
      accessorKey: "reference_no",
      header: "Reference No.",
      cell: ({ row }) => {
        const ref = row.getValue("reference_no") as string;

        return (
          <button
            onClick={() => handleCopy(ref ?? "")}
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-amber-700 transition-colors"
          >
            {ref ?? "N/A"}
            <Copy className="h-3 w-3" />
          </button>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Payment["status"];
        return (
          <Badge
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-none capitalize",
              status === "PAID"
                ? "bg-emerald-100/80 text-emerald-800 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
            )}
          >
            <span
              className={cn(
                "mr-1.5 h-1.5 w-1.5 rounded-full",
                status === "PAID" ? "bg-emerald-500" : "bg-slate-400",
              )}
            />
            {status?.toLowerCase()}
          </Badge>
        );
      },
    },

    { accessorKey: "paidAt", header: "Paid At" },

    {
      header: "Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <PaymentAction enrollee_id={row.original.id} />,
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
