"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

// Certificate data structure
type CertificateData = {
  recipientName: string;
  courseName: string;
  courseHours: number;
  issuerName: string;
  issuerLocation: string;
  issueDate: string;
  controlNumber: string;
  administratorName: string;
};

type GenerateProps = {
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  certificateData: CertificateData | null;
};

export default function Generate({
  isGenerating,
  setIsGenerating,
  certificateData,
}: GenerateProps) {
  if (!certificateData) return null;

  const {
    recipientName,
    courseName,
    courseHours,
    issuerName,
    issuerLocation,
    issueDate,
    controlNumber,
    administratorName,
  } = certificateData;

  return (
    <Dialog open={isGenerating} onOpenChange={setIsGenerating}>
      <DialogTitle hidden>Certificate</DialogTitle>
      <DialogContent className="!max-w-3xl bg-[#282a2c]">
        <div
          className="relative bg-white mt-4 border-4 border-yellow-400 p-0 rounded-none shadow-xl overflow-hidden"
          style={{
            backgroundImage: `url('/bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Background overlay to control opacity */}
          <div className="absolute inset-0 bg-white opacity-90"></div>
          {/* Background with corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 clip-triangle-tl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400 clip-triangle-br"></div>

          {/* Content container */}
          <div className="relative z-10  px-16 py-12 text-center font-serif">
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-3xl font-extrabold uppercase tracking-wide text-gray-800">
                Certificate of Completion
              </h1>
            </div>

            {/* Recipient and details */}
            <p className="mt-6 text-lg text-gray-700">
              This certificate is given to
            </p>
            <h2 className="text-2xl font-bold uppercase mt-2 mb-4 text-gray-900">
              {recipientName}
            </h2>
            <p className="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
              for successfully completing the {courseHours} Hours of{" "}
              {courseName}.
            </p>

            {/* Info section */}
            <div className="mt-8 border-y border-gray-300 text-black py-4 space-y-2 text-base">
              <p>
                <strong>Given this:</strong> {issueDate}
              </p>
              <p>
                <strong>At:</strong> {issuerLocation}
              </p>
              <p>
                <strong>Certificate Control No:</strong> {controlNumber}
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 text-right pr-10">
              <p className="font-semibold text-gray-800">{administratorName}</p>
              <p className="text-sm text-gray-500">School Administrator</p>
            </div>
          </div>
        </div>
        {/* Footer buttons */}
        <DialogFooter className="p-4 flex justify-end space-x-3">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button
            onClick={() => window.print()}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
