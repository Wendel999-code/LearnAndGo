"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 ">
      {/* Spinning ring */}
      <motion.div
        className="relative h-20 w-20 rounded-full border-4 border-yellow-300"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        {/* Car icon stays centered */}
        <Car className="absolute inset-0 m-auto h-10 w-10 text-yellow-500" />
      </motion.div>

      {/* Text with pulse effect */}
      <motion.p
        className="text-lg font-semibold text-gray-700"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Getting you on the road...
      </motion.p>
    </div>
  );
}
