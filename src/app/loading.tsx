"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gradient-to-br from-yellow-50 to-slate-100 dark:from-zinc-900 dark:to-black">
      {/* Car and Road */}
      <div className="relative flex h-24 w-72 items-center justify-center overflow-hidden">
        {/* Moving Road Lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-14 rounded-full bg-neutral-300 dark:bg-zinc-700"
            style={{ top: "50%", y: "-50%" }}
            initial={{ x: 300 }}
            animate={{ x: -300 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Car with bounce and subtle light glow */}
        <motion.div
          className="z-10 relative"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute -inset-4 bg-yellow-400/30 rounded-full blur-2xl animate-pulse" />
          <Car className="h-20 w-20 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
        </motion.div>
      </div>

      {/* Text */}
      <motion.p
        className="text-lg font-medium tracking-wide text-neutral-700 dark:text-neutral-300"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Getting you on the road...
      </motion.p>

      {/* Subtle progress bar */}
      <motion.div className="h-1 w-56 rounded-full bg-neutral-200 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}
