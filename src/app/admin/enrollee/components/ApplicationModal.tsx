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
import { Loader2 } from "lucide-react";
import { useGetEnrollee } from "@/hooks/use-student";
import { Dispatch, SetStateAction, memo } from "react";



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
  const { data: enrollee, isLoading, error } = useGetEnrollee(enrolleeId, isPreview);

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  return (
    <div className="">
      <Dialog open={isPreview} onOpenChange={setIsPreview}>
        <DialogContent className="!max-w-4xl  max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm text-gray-400"> Enrollee</DialogTitle>
            <DialogDescription>
              {enrollee?.first_name} {enrollee?.last_name}
            </DialogDescription>
          </DialogHeader>

          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-8">
              Failed to fetch enrollee.
            </div>
          )}

          {!isLoading && enrollee && (
            <div className="space-y-8">
              {/* Student Info */}
              <section>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Email</p>
                    <p>{enrollee.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Phone</p>
                    <p>{enrollee.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Address</p>
                    <p>{enrollee.address || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Age</p>
                    <p>{enrollee.age ?? "N/A"}</p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Images */}
              <section>
                <h3 className="font-semibold text-lg mb-3">
                  Verification Documents
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div onClick={() => setPreviewUrl(enrollee.valid_id_URL)} className="cursor-zoom-in">
                    <p className="font-medium text-muted-foreground mb-2">Valid ID</p>
                    <img
                      src={enrollee.valid_id_URL}
                      alt={`${enrollee.first_name}'s Valid ID`}
                      className="rounded-xl border w-full h-[220px] object-cover shadow"
                    />
                  </div>
                  <div onClick={() => setPreviewUrl(enrollee.selfie_URL)} className="cursor-zoom-in">
                    <p className="font-medium text-muted-foreground mb-2">Selfie</p>
                    <img
                      src={enrollee.selfie_URL}
                      alt={`${enrollee.first_name}'s Selfie`}
                      className="rounded-xl border w-full h-[220px] object-cover shadow"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Invoices */}
              <section>
                <h3 className="font-semibold text-lg mb-3">Invoices</h3>
                <div className="border rounded-xl overflow-hidden shadow">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left">Course</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Paid</th>
                        <th className="px-4 py-2 text-left">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollee.invoices?.length ? (
                        enrollee.invoices.map((inv) => (
                          <tr key={inv.reference_id} className="border-t hover:bg-muted/30">
                            <td className="px-4 py-2">{inv.courseTitle}</td>
                            <td className="px-4 py-2">
                              ₱{inv.coursePrice.toLocaleString()}
                            </td>
                            <td className="px-4 py-2">
                              ₱{inv.ammountPaid.toLocaleString()}
                            </td>
                            <td className="px-4 py-2">{inv.reference_id}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-4 text-muted-foreground">
                            No invoices available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <Button
                variant="outline"
                className="w-full p-2 cursor-pointer"
                onClick={() => console.log("Verify action")}
              >
                Verify
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent shadow-none">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="rounded-xl w-full h-[700px] object-cover shadow"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ApplicationModal = memo(ApplicationModalComponent);
export default ApplicationModal;
