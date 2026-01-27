"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn, handleCopy } from "@/lib/utils";
import { useGetInvoices } from "@/hooks/use-invoice";
import PaymentAction from "./components/PaymentAction";
import { Skeleton } from "@/components/ui/skeleton";
import { GenPagination } from "@/components/Pagination";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { data, isLoading } = useGetInvoices(page, limit);

  const enrollees = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className=""
    >
      <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Enrollee Invoices
          </CardTitle>
          <CardDescription>
            Manage student payments and track transaction reference numbers.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Search Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference number..."
                className="pl-9 h-10 bg-background/50"
              />
            </div>
          </div>

          {/* Table - Design Unaltered */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 text-gray-400">#</TableHead>
                  <TableHead className="text-gray-400">Enrollee</TableHead>
                  <TableHead className="text-gray-400">Course</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Amount Paid</TableHead>
                  <TableHead className="text-gray-400">Payment Mode</TableHead>
                  <TableHead className="text-gray-400">Reference No.</TableHead>
                  <TableHead className="text-center text-gray-400">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : enrollees && enrollees.length > 0 ? (
                  enrollees.map((enrollee: any, i: any) => {
                    const invoice = enrollee.invoices;
                    const channel = invoice?.payment_channel?.toUpperCase();

                    return (
                      <TableRow
                        key={invoice?.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-medium capitalize">
                          {enrollee.firstName} {enrollee.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors shadow-sm",
                              enrollee.course?.courseCode === "TDC"
                                ? "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                                : "bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
                            )}
                          >
                            {enrollee.course?.courseCode ?? "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            ₱{invoice?.price?.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            ₱{invoice?.amountPaid?.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "rounded-full px-2.5 py-0.5 font-medium shadow-none border flex items-center w-fit gap-1",
                              channel === "GCASH"
                                ? "bg-[#007bffe0] text-white border-none"
                                : channel === "MAYA" || channel === "PAYMAYA"
                                  ? "bg-[#068653] text-white border-none"
                                  : channel === "GRABPAY"
                                    ? "bg-[#02B150] text-white border-none"
                                    : "bg-slate-100 text-slate-700 border-slate-200",
                            )}
                          >
                            <span className="text-[11px] font-bold tracking-tight">
                              {invoice?.payment_channel ?? "N/A"}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() =>
                              handleCopy(invoice?.reference_id ?? "")
                            }
                            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-amber-700 transition-colors group"
                          >
                            {invoice?.reference_id ?? "N/A"}
                            <Copy className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                          </button>
                        </TableCell>
                        <TableCell className="text-center">
                          <PaymentAction enrollee_id={invoice?.id as string} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center h-24 text-muted-foreground"
                    >
                      No matching records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {pagination && (
            <GenPagination
              page={page}
              totalPages={pagination.totalPages}
              limit={pagination.limit}
              onPageChange={(p) => setPage(Math.max(1, p))}
              onLimitChange={(l) => {
                setPage(1);
                setLimit(l);
              }}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
