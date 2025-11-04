"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GenerateProps = {
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
};

type CertificateData = {
  studentName: string;
  licenseNumber: string;
  dob: string;
  issueDate: string;
};

export default function Generate({
  isGenerating,
  setIsGenerating,
}: GenerateProps) {
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as CertificateData;

    setCertificateData(data);
    console.log("Generating certificate:", data);
  };

  return (
    <Dialog open={isGenerating} onOpenChange={setIsGenerating}>
      {!certificateData ? (
        <form onSubmit={handleSubmit}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate Driving Certificate</DialogTitle>
              <DialogDescription>
                Confirm the student’s details before generating the certificate.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {[
                ["studentName", "Student Name", "Jane Doe"],
                ["licenseNumber", "License Number", "C-98765-43210"],
                ["dob", "Date of Birth", "1998-03-15"],
                [
                  "issueDate",
                  "Issuing Date",
                  new Date().toISOString().split("T")[0],
                ],
              ].map(([id, label, def]) => (
                <div key={id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={id} className="text-right">
                    {label}
                  </Label>
                  <Input
                    id={id}
                    name={id}
                    defaultValue={def}
                    className="col-span-3"
                    type={id.includes("date") ? "date" : "text"}
                  />
                </div>
              ))}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Generate</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      ) : (
        <DialogContent className="sm:max-w-[700px] bg-white border p-10 rounded-xl shadow-md">
          <div className="text-center border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold tracking-wide text-gray-800">
              Official Certificate of Driving Competence
            </h1>
            <p className="text-gray-500 mt-2">
              Issued by: National Driving Authority
            </p>
          </div>

          <div className="text-lg leading-relaxed text-gray-700 space-y-4">
            <p>
              This is to certify that{" "}
              <strong>{certificateData.studentName}</strong> has successfully
              completed the required training and assessments to qualify as a
              competent and responsible driver.
            </p>

            <div className="mt-6 border-t border-b py-4 space-y-2">
              <p>
                <strong>License Number:</strong> {certificateData.licenseNumber}
              </p>
              <p>
                <strong>Date of Birth:</strong> {certificateData.dob}
              </p>
              <p>
                <strong>Date of Issue:</strong> {certificateData.issueDate}
              </p>
            </div>

            <p className="mt-6">
              This certificate is issued in recognition of the individual’s
              adherence to driving laws, safety standards, and professional
              ethics.
            </p>
          </div>

          <div className="mt-10 flex justify-between items-center">
            <div>
              <p className="font-semibold">__________________________</p>
              <p className="text-sm text-gray-500">Authorized Officer</p>
            </div>
            <div>
              <p className="font-semibold">__________________________</p>
              <p className="text-sm text-gray-500">
                Registrar, Driving Authority
              </p>
            </div>
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button onClick={() => window.print()}>Print / Save as PDF</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
