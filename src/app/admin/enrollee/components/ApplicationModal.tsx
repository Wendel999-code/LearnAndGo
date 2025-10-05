"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Receipt,
  CheckCircle,
  X,
  LoaderCircle,
} from "lucide-react";
import { useGetEnrollee, useVerifyEnrollee } from "@/hooks/use-student";
import { Dispatch, SetStateAction, memo } from "react";
import toast from "react-hot-toast";
import { ClickableImage } from "@/components/ClickableImage";
import { useImageViewer } from "@/hooks/use-image";
import { Skeleton } from "@/components/ui/skeleton";

type ApplicationModalProps = {
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  enrolleeId: string;
};

function ApplicationModalComponent({
  isPreview,
  setIsPreview,
  enrolleeId,
}: ApplicationModalProps) {
  const {
    data: enrollee,
    isLoading,
    error,
  } = useGetEnrollee(enrolleeId, isPreview);

  const { mutate: verifyEnrollee, isPending: isVerifying } =
    useVerifyEnrollee();

  const { viewerState, openViewer, closeViewer } = useImageViewer();

  const handleVerify = () => {
    verifyEnrollee(enrolleeId, {
      onSuccess: (res) => toast.success(res.message),
      onError: (err: any) => toast.error(err.message),
    });
  };

  const images = [enrollee?.valid_id_URL, enrollee?.selfie_URL].filter(
    (url): url is string => typeof url === "string"
  );

  return (
    <>
      <Dialog open={isPreview} onOpenChange={setIsPreview}>
        <DialogContent className="!max-w-3xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 border-0 shadow-2xl flex flex-col">
          <DialogTitle className="sr-only">Student Enrollment</DialogTitle>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {isLoading && (
              <div className="grid grid-cols-2 gap-4 py-12 space-y-6">
                <Skeleton className="h-12  animate-pulse " />
                <Skeleton className="h-12  animate-pulse " />
                <Skeleton className="h-12  animate-pulse " />
                <Skeleton className="h-12  animate-pulse " />
                <Skeleton className="h-12  animate-pulse " />
                <Skeleton className="h-12  animate-pulse " />
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-12 space-y-5">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full shadow-md">
                  <X className="h-7 w-7 text-red-500 dark:text-red-400" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
                    Oops! Something went wrong
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We couldn’t fetch the enrollee details right now. Please
                    check your connection and try again.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => window.location.reload()}
                  className="mt-3"
                >
                  Retry
                </Button>
              </div>
            )}

            {!isLoading && enrollee && (
              <div className="space-y-6 pb-6">
                <section className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-4 w-4 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      Personal Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InfoCard label="Firstname" value={enrollee.first_name} />
                    <InfoCard label="Lastname" value={enrollee.last_name} />
                    <InfoCard label="Email" value={enrollee.email} />
                    <InfoCard label="Phone" value={enrollee.phone} />
                    <InfoCard label="Address" value={enrollee.address} />
                    <InfoCard label="Age" value={enrollee.age} />
                  </div>
                </section>

                <Separator />

                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      Verification Documents
                    </h3>
                  </div>
                  <div className="grid size-120  grid-cols-1 md:grid-cols-2 gap-4">
                    <ClickableImage
                      src={enrollee.valid_id_URL}
                      alt="Valid ID"
                      width={300}
                      height={300}
                      className="rounded-md object-cover w-full"
                      onClick={() => openViewer(images, 0)}
                    />
                    <ClickableImage
                      src={enrollee.selfie_URL}
                      alt="Selfie"
                      width={300}
                      height={300}
                      className="rounded-md object-cover w-full"
                      onClick={() => openViewer(images, 1)}
                    />
                  </div>
                </section>

                <Separator />

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-amber-500" />
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                        Payment Invoice
                      </h3>
                    </div>
                    {(enrollee.invoices ?? []).length > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                      >
                        {(enrollee.invoices ?? []).length}{" "}
                        {(enrollee.invoices ?? []).length === 1
                          ? "Invoice"
                          : "Invoices"}
                      </Badge>
                    )}
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
                    {enrollee.invoices?.length ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-700">
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Course
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Paid
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Reference
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {enrollee.invoices.map((inv) => (
                              <tr key={inv.reference_id}>
                                <td className="px-4 py-3">{inv.item}</td>
                                <td className="px-4 py-3">
                                  ₱{inv.price.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                  ₱{inv.ammountPaid.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded font-mono text-xs">
                                    {inv.reference_id}
                                  </code>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 space-y-3">
                        <Receipt className="h-6 w-6 text-slate-400" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          No payment records found
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <div className="pt-2">
                  <Button
                    disabled={isVerifying}
                    onClickCapture={handleVerify}
                    className="w-full h-10 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold rounded-lg shadow-md"
                  >
                    {isVerifying ? (
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Verify Student Enrollment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {viewerState.isOpen && (
        <Dialog open={viewerState.isOpen} onOpenChange={closeViewer}>
          <DialogTitle></DialogTitle>
          <DialogContent className="max-w-5xl p-0 bg-black/90 border-0 shadow-2xl">
            <img
              src={viewerState.images[viewerState.initialIndex]}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-lg p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400  tracking-wider">
          {label}
        </p>
        <p className="text-sm mt-1 font-semibold text-slate-900 dark:text-slate-100 truncate">
          {value || "N/A"}
        </p>
      </div>
    </div>
  </div>
);

const ApplicationModal = memo(ApplicationModalComponent);
export default ApplicationModal;
