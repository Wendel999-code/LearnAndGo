"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";

function PaymentAction({ enrollee_id }: { enrollee_id: string }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer rounded-full hover:bg-muted transition"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
          {/* Enhanced: Cleaner, theme-aware label style */}
          <DropdownMenuLabel className="px-2 py-1.5  text-center text-sm font-semibold text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="gap-2 text-yellow-600 dark:text-yellow-500 cursor-pointer 
             focus:text-yellow-600 dark:focus:text-yellow-500 
             focus:bg-gray-100 dark:focus:bg-gray-700"
          >
            <Edit className="h-4 w-4" /> Update
          </DropdownMenuItem>

          {/* Enhanced: Using the component's 'destructive' prop for clean, reusable styling */}
          <DropdownMenuItem
            variant="destructive"
            className="gap-2 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* TODO edit modal  */}
      {/* <UpdateModal
        isPreview={isPreview}
        setIsPreview={setIsPreview}
        enrolleeId={enrollee_id}
      /> */}
    </>
  );
}

export default PaymentAction;
