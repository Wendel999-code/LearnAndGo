"use client";

import React, { Dispatch, SetStateAction, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LoaderCircle,
  User,
  Shield,
  Receipt,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useGetEnrollee, useVerifyEnrollee } from "@/hooks/use-student";
import toast from "react-hot-toast";
import { ClickableImage } from "@/components/ClickableImage";
import { useImageViewer } from "@/hooks/use-image";
import { Skeleton } from "@/components/ui/skeleton";

type ApplicationModalProps = {
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  enrolleeId: string;
};

// Main Component
function ApplicationModalComponent({
  isPreview,
  setIsPreview,
  enrolleeId,
}: ApplicationModalProps) {
  const {
    data: enrollee,
    isLoading,
    error,
    refetch, // Use refetch for a better error-handling UX
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
        <DialogContent className="!max-w-4xl max-h-[90vh] flex flex-col p-0 bg-white dark:bg-slate-900 border-0 shadow-2xl">
          {/* 1. Modern Header */}
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Enrollment Application
            </DialogTitle>
            <DialogDescription>
              Review and verify the student's information, documents, and
              payment.
            </DialogDescription>
          </DialogHeader>

          <Separator />

          {/* 2. Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading && <ApplicationSkeleton />}

            {error && <ErrorState onRetry={refetch} />}

            {!isLoading && enrollee && (
              /* 3. New Two-Column Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
                {/* Left (Sticky) Column */}
                <section className="lg:col-span-5 lg:sticky lg:top-0 space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      Personal Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoCard label="Firstname" value={enrollee.firstName} />
                    <InfoCard label="Lastname" value={enrollee.lastName} />
                    <InfoCard label="Email" value={enrollee.email} />
                    <InfoCard label="Phone" value={enrollee.phone} />
                    <InfoCard label="Address" value={enrollee.address} />
                    <InfoCard label="Age" value={enrollee.age} />
                  </div>
                </section>

                {/* Right (Scrollable) Column */}
                <section className="lg:col-span-7 space-y-6">
                  {/* Documents Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                        Verification Documents
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ClickableImage
                        src={enrollee.valid_id_URL}
                        alt="Valid ID"
                        width={300}
                        height={300}
                        className="rounded-lg object-cover w-full aspect-video border border-slate-200 dark:border-slate-700"
                        onClick={() => openViewer(images, 0)}
                      />
                      <ClickableImage
                        src={enrollee.selfie_URL}
                        alt="Selfie"
                        width={300}
                        height={300}
                        className="rounded-lg object-cover w-full aspect-video border border-slate-200 dark:border-slate-700"
                        onClick={() => openViewer(images, 1)}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Invoice Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-amber-500" />
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          Payment Invoice
                        </h3>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                      >
                        Invoice
                      </Badge>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
                      {enrollee.invoices ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-slate-50 dark:bg-slate-800">
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
                              <tr>
                                <td className="px-4 py-3">
                                  {enrollee.course?.courseTitle ?? "N/A"}
                                </td>
                                <td className="px-4 py-3">
                                  ₱{enrollee.invoices.price.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                  ₱
                                  {enrollee.invoices.amountPaid.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded font-mono text-xs">
                                    {enrollee.invoices.reference_id}
                                  </code>
                                </td>
                              </tr>
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
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <Button
                      disabled={isVerifying}
                      onClick={handleVerify} // Use onClick, onClickCapture is rare
                      size="lg"
                      className="w-full cursor-pointer h-11 text-base font-semibold rounded-lg shadow-md bg-yellow-600 text-white hover:bg-yellow-700 "
                    >
                      {isVerifying ? (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Verify Student
                    </Button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog (Unchanged) */}
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

// 4. Refined InfoCard Component
const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-lg p-1 border">
    <p className="text-xs   capitalize font-medium tracking-wider text-gray-400">
      {label}
    </p>
    <p className="text-base mt-1 font-semibold text-slate-900 dark:text-slate-100 truncate">
      {value || "N/A"}
    </p>
  </div>
);

// 5. New Layout-Aware Skeleton
const ApplicationSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8">
    {/* Left Column Skeleton */}
    <div className="lg:col-span-5 space-y-4">
      <Skeleton className="h-6 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
    {/* Right Column Skeleton */}
    <div className="lg:col-span-7 space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="w-full aspect-video" />
          <Skeleton className="w-full aspect-video" />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-11 w-full" />
    </div>
  </div>
);

// 6. New Error State Component with `refetch`
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 space-y-5">
    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full shadow-md">
      <XCircle className="h-7 w-7 text-red-500 dark:text-red-400" />
    </div>
    <div className="text-center space-y-1">
      <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
        Oops! Something went wrong
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        We couldn’t fetch the enrollee details. Please try again.
      </p>
    </div>
    <Button variant="destructive" onClick={onRetry} className="mt-3">
      Retry
    </Button>
  </div>
);

const ApplicationModal = memo(ApplicationModalComponent);
export default ApplicationModal;
