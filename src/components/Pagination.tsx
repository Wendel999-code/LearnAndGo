"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "@/constant/type";

export function GenPagination({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6 border-border/40">
      {/* Left Side: Rows per Page (Compact Style) */}
      <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
        <span className="hidden sm:inline-block ">Rows per page</span>
        <Select
          value={String(limit)}
          onValueChange={(v) => onLimitChange(Number(v))}
        >
          <SelectTrigger
            className="h-7 w-[56px] px-2 text-xs bg-transparent border-none shadow-none
               hover:bg-muted/50 focus:ring-0"
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="end" className="min-w-[56px] p-1">
            <SelectItem className="text-xs h-7 px-2" value="10">
              10
            </SelectItem>
            <SelectItem className="text-xs h-7 px-2" value="25">
              25
            </SelectItem>
            <SelectItem className="text-xs h-7 px-2" value="50">
              50
            </SelectItem>
            <SelectItem className="text-xs h-7 px-2" value="100">
              100
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right Side: Navigation & Info */}
      <div className="flex items-center gap-6">
        <span className="text-xs font-medium text-muted-foreground hidden md:inline-block">
          Page {page} of {totalPages}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="h-8 w-8 rounded-md hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Number Indicator for Mobile */}
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-[11px] font-bold text-primary-foreground shadow-sm md:hidden">
            {page}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="h-8 w-8 rounded-md hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
