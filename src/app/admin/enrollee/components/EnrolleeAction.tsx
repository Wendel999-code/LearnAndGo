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
import { MoreHorizontal, Eye, XCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import ApplicationModal from "./ApplicationModal";

function EnrolleeAction({ enrollee_id }: { enrollee_id: string }) {

  const [isPreview, setIsPreview] = useState(false);

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

        <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg">
          <DropdownMenuLabel className="text-center font-semibold">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsPreview(!isPreview)}
            className="gap-2 cursor-pointer"
          >
            <Eye className="h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-yellow-600 cursor-pointer">
            <XCircle className="h-4 w-4" /> Reject
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-red-600 cursor-pointer">
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ApplicationModal isPreview={isPreview} setIsPreview={setIsPreview} enrolleeId={enrollee_id} />

    </>
  );
};

export default EnrolleeAction;
