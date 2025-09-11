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

  const { data: enrollee, isLoading, error } = useGetEnrollee(
    enrolleeId,
    isPreview
  );

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const { mutate: verifyEnrollee, isPending: isVerifying } = useVerifyEnrollee();

  const handleVerify = () => {

    verifyEnrollee(enrolleeId, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  const InfoCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string | number;
  }) => (
    <div className="rounded-lg p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-blue-500" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {value || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );

  const DocumentCard = ({
    src,
    alt,
    title,
    onClick,
  }: {
    src: string;
    alt: string;
    title: string;
    onClick: () => void;
  }) => (
    <div className="relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-blue-400 transition-colors duration-200 cursor-pointer">
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={onClick}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 text-white text-sm font-medium"
        >
          Preview
        </button>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {title}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Dialog open={isPreview} onOpenChange={setIsPreview}>
        <DialogContent className="!max-w-6xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 border-0 shadow-2xl flex flex-col">
          {/* Hidden title for accessibility */}
          <DialogTitle className="sr-only">Student Enrollment</DialogTitle>

          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-6 -mx-6 -mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-sm" />
            <div className="relative">
              <DialogHeader className="text-center">
                <DialogDescription className="text-white text-center text-3xl font-bold">
                  {enrollee?.first_name} {enrollee?.last_name}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Loading student information...
                </p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <X className="h-6 w-6 text-red-500" />
                </div>
                <div className="text-center">
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    Failed to fetch enrollee
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Please try again later
                  </p>
                </div>
              </div>
            )}

            {!isLoading && enrollee && (
              <div className="space-y-6 pb-6">
                {/* Personal Information */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-4 w-4 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InfoCard
                      icon={Mail}
                      label="Email Address"
                      value={enrollee.email}
                    />
                    <InfoCard
                      icon={Phone}
                      label="Phone Number"
                      value={enrollee.phone}
                    />
                    <InfoCard
                      icon={MapPin}
                      label="Address"
                      value={enrollee.address}
                    />
                    <InfoCard
                      icon={Calendar}
                      label="Age"
                      value={enrollee.age}
                    />
                  </div>
                </section>

                <Separator />

                {/* Verification Documents */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      Verification Documents
                    </h3>
                  
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocumentCard
                      src={enrollee.valid_id_URL}
                      alt={`${enrollee.first_name}'s Valid ID`}
                      title="Valid ID"
                      onClick={() => setPreviewUrl(enrollee.valid_id_URL)}
                    />
                    <DocumentCard
                      src={enrollee.selfie_URL}
                      alt={`${enrollee.first_name}'s Selfie`}
                      title="Selfie Verification"
                      onClick={() => setPreviewUrl(enrollee.selfie_URL)}
                    />
                  </div>
                </section>

                <Separator />

                {/* Payment History */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-amber-500" />
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                        Payment History
                      </h3>
                    </div>
                    {enrollee.invoices?.length > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                      >
                        {enrollee.invoices.length}{" "}
                        {enrollee.invoices.length === 1
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
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Course
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Paid
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Reference
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {enrollee.invoices.map((inv) => (
                              <tr key={inv.reference_id}>
                                <td className="px-4 py-3">
                                  <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                                    {inv.courseTitle}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="text-slate-600 dark:text-slate-300 font-semibold">
                                    ₱{inv.coursePrice.toLocaleString()}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                    ₱{inv.ammountPaid.toLocaleString()}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-mono text-xs">
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

                {/* Action Button */}
                <div className="pt-2">
                  <Button disabled={isVerifying}
                    onClickCapture={handleVerify}
                    className="w-full cursor-pointer h-10 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold rounded-lg shadow-md"
                    onClick={() => console.log("Verify action")}
                  >
                    {isVerifying ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />
                    }
                    Verify Student Enrollment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogTitle className="sr-only">
          {
            previewUrl
              ? "Document Preview"
              : "No document preview available"
          }
        </DialogTitle>

        <DialogContent className="max-w-5xl p-0 bg-black/90 border-0 shadow-2xl">
          <div className="relative">
            {previewUrl && (
              <>
                <img
                  src={previewUrl}
                  alt="Document Preview"
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />

              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ApplicationModal = memo(ApplicationModalComponent);
export default ApplicationModal;
