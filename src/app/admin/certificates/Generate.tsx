"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

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
  const [isCapturing, setIsCapturing] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;
    setIsCapturing(true);

    try {
      const { toPng } = await import("html-to-image");
      const node = certRef.current;

      // Optional cleanup before capture
      node.classList.add("capture-clean");

      const dataUrl = await toPng(node, {
        backgroundColor: "#ffffff",
        pixelRatio: 2, // higher resolution, prevents aliasing seams
        cacheBust: true,
        style: {
          boxShadow: "none",
          border: "none",
          outline: "none",
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });

      node.classList.remove("capture-clean");

      const link = document.createElement("a");
      link.download = `${certificateData?.recipientName}_PDC_Certificate.png`;
      link.href = dataUrl;
      link.click();

      setIsGenerating(false);
      toast.success("Sent email to recipient.");
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!certificateData) return null;

  const {
    recipientName,
    courseName,
    courseHours,
    issuerLocation,
    issueDate,
    controlNumber,
    administratorName,
  } = certificateData;

  return (
    <Dialog open={isGenerating} onOpenChange={setIsGenerating}>
      <DialogTitle hidden>Certificate</DialogTitle>
      <DialogContent className="max-w-3xl! bg-[#282a2c] h-[90vh]">
        <div
          ref={certRef}
          className="relative bg-white mt-2 border-4 border-yellow-400 p-0 rounded-none shadow-xl overflow-hidden"
          style={{
            backgroundImage: `url('/bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Background overlay to control opacity */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
          />
          {/* Background with corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 clip-triangle-tl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400 clip-triangle-br"></div>

          {/* Content container */}
          <div className="relative z-10   text-center font-serif">
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-xl font-semibold uppercase tracking-wide text-yellow-500">
                Learn and Go <br />{" "}
                <span className="text-sm font-light uppercase tracking-wide text-yellow-500">
                  Professional Driving School
                </span>
              </h3>

              <h1 className="text-3xl mt-2 font-extrabold uppercase tracking-wide text-gray-800">
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
            <div className=" text-center flex justify-evenly mt-6 items-center  ">
              <div className="size-12">
                <img
                  src="/lto.jpg"
                  width={100}
                  height={100}
                  alt="LTO"
                  className={"rounded-full  object-contain opacity-100"}
                />
              </div>
              <div>
                {" "}
                <p className="font-semibold text-gray-800">
                  {administratorName}
                </p>
                <p className="text-[10px] text-gray-500">
                  School Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer buttons */}
        <DialogFooter className="p-4 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="h-10">
              Close
            </Button>
          </DialogClose>

          <Button
            onClick={handleDownload}
            disabled={isCapturing}
            className="
      h-10 
      bg-yellow-600 
      text-white 
      hover:bg-yellow-500 
      disabled:opacity-70 
      flex items-center gap-2
      px-4
    "
          >
            {isCapturing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Preparing…
              </>
            ) : (
              "Print Certificate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
