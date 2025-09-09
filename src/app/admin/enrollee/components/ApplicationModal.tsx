"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StudentWithInvoices } from "@/global/type";
import { Button } from "@/components/ui/button";

const dummyStudent: StudentWithInvoices = {
  id: "1",
  first_name: "Jane",
  last_name: "Doe",
  age: 21,
  email: "jane.doe@example.com",
  phone: "09123456789",
  address: "123 Main St, Manila",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date(),
  valid_id_URL:
    "https://slxucmscqlgexlmyjlpp.supabase.co/storage/v1/object/public/learn_and_go/valid_ids/1757315578416-475809100_473079445859536_8171535170383815841_n.jpg",
  selfie_URL:
    "https://slxucmscqlgexlmyjlpp.supabase.co/storage/v1/object/public/learn_and_go/valid_ids/1757315578416-475809100_473079445859536_8171535170383815841_n.jpg",
  invoices: [
    {
      id: "inv1",
      courseTitle: "Web Development 101",
      coursePrice: 5000,
      createdAt: new Date(),
      updatedAt: new Date(),
      reference_id: "REF12345",
      ammountPaid: 5000,
      status: "paid",
      dueDate: null,
      paidAt: new Date(),
      studentId: "1",
      payment_channel: "gcash",
    },
    {
      id: "inv2",
      courseTitle: "React Advanced",
      coursePrice: 8000,
      createdAt: new Date(),
      updatedAt: new Date(),
      reference_id: "REF67890",
      ammountPaid: 0,
      status: "pending",
      dueDate: new Date(),
      paidAt: null,
      studentId: "1",
      payment_channel: null,
    },
  ],
};

type ApplicationModalProps = {
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ApplicationModal({
  isPreview,
  setIsPreview,
}: ApplicationModalProps) {
  return (
    <Dialog open={isPreview} onOpenChange={setIsPreview}>
      <DialogContent className="max-w-6xl w-full h-[670px] p-4 overflow-a rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold pt-6 ">
            {dummyStudent.first_name} {dummyStudent.last_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 overflow-hidden">
          {/* Student Info */}
          <section>
            <div className="grid grid-cols-2  gap-6 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Email</p>
                <p>{dummyStudent.email}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Phone</p>
                <p>{dummyStudent.phone}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Address</p>
                <p>{dummyStudent.address}</p>
              </div>

              <div>
                <p className="font-medium text-muted-foreground">Age</p>
                <p>{dummyStudent.age}</p>
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
              <div>
                <p className="font-medium text-muted-foreground mb-2">
                  Valid ID
                </p>
                <img
                  src={dummyStudent.valid_id_URL}
                  alt="Valid ID"
                  className="rounded-xl border w-full h-[220px] object-cover shadow"
                />
              </div>
              <div>
                <p className="font-medium text-muted-foreground mb-2">Selfie</p>
                <img
                  src={dummyStudent.selfie_URL}
                  alt="Selfie"
                  className="rounded-xl border w-full h-[220px] object-cover shadow"
                />
              </div>
            </div>
          </section>

          <Button variant={"outline"} className="w-full p-2 cursor-pointer">
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
