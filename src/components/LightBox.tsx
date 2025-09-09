"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

type LightboxProps = {
  images: { src: string; alt: string; label: string }[];
};

export default function Lightbox({ images }: LightboxProps) {
  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const showPrev = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const showNext = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <div key={i}>
            <p className="font-medium text-muted-foreground mb-2">
              {img.label}
            </p>
            <img
              src={img.src}
              alt={img.alt}
              onClick={() => {
                setCurrentIndex(i);
                setOpen(true);
              }}
              className="rounded-xl border w-full h-[220px] object-cover shadow cursor-pointer hover:opacity-90 transition"
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle>GEnge</DialogTitle>
        <DialogContent className="max-w-5xl p-2 bg-black relative flex items-center justify-center">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <button onClick={showPrev} className="absolute left-4 text-white">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-h-[80vh] max-w-full object-contain rounded-lg"
          />
          <button onClick={showNext} className="absolute right-4 text-white">
            <ChevronRight className="w-8 h-8" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
