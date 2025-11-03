"use client";

import { deleteSession } from "@/actions/student/schedule";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

function ScheduleAction({ id, session }: { id: string; session: string }) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const queryClient = useQueryClient();

  const handleDeleteSession = async (e: any) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const res = await deleteSession(id, session);
      if (!res.success) throw new Error(res.message);

      queryClient.invalidateQueries({ queryKey: ["get-schedules"] });
      queryClient.invalidateQueries({
        queryKey: ["students-without-schedule"],
      });
      toast.success(res.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-4 cursor-pointer rounded-full hover:bg-muted transition"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
          <DropdownMenuLabel className="px-2 py-1.5  text-center text-sm font-semibold text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="gap-2 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {open && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="backdrop-blur-3xl sm:max-w-[425px] bg-gray-800">
            <AlertDialogHeader>
              {/* 1. Add a clear visual warning icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500 dark:bg-red-900/30">
                <AlertTriangle className="h-6 w-6 text-white dark:text-red-600" />
              </div>
              <AlertDialogTitle className="pt-2 text-center text-white ">
                {`Delete ${session}?`}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-gray-400 dark:text-red-600">
                This action cannot be undone. This will permanently delete the
                session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="  mt-6">
              <AlertDialogCancel asChild>
                <Button className="hover:bg-none text-black dark:text-white hover:dark:text-white">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button
                disabled={isDeleting}
                onClick={handleDeleteSession}
                className="hover:bg-red-500  bg-red-700 text-white transition-colors ease-in-out duration-150"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className=" h-4  animate-spin" /> Deleting
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default ScheduleAction;
