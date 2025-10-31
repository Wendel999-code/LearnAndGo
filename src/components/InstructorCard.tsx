"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
  hover: {
    scale: 1.05,
    y: -10,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  bio?: string | null;
  image_URL?: string | null;
}

interface InstructorGridProps {
  instructors?: Instructor[];
  isLoading?: boolean;
}

export function InstructorCard({
  instructors,
  isLoading,
}: InstructorGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl" />
          ))}
      </div>
    );
  }

  if (!instructors?.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No instructors available at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
      {instructors.map((inst, idx) => (
        <motion.div
          key={inst.id}
          custom={idx}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.5 }}
          className="group relative p-8 rounded-2xl
                     bg-white/50 dark:bg-zinc-900/50
                     backdrop-blur-lg
                     shadow-lg
                     border border-gray-200/50 dark:border-zinc-800/50
                     overflow-hidden"
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

          {/* Avatar */}
          <div className="flex flex-col items-center text-center mb-4">
            <Avatar className="w-24 h-24 border-4 border-yellow-400/40 shadow-md mb-3">
              {inst.image_URL ? (
                <AvatarImage src={inst.image_URL} alt={inst.firstName} />
              ) : (
                <AvatarFallback className="text-lg font-semibold">
                  {inst.firstName?.[0]}
                </AvatarFallback>
              )}
            </Avatar>

            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              {inst.firstName} {inst.lastName}
            </h3>

            <p className="text-sm text-neutral-600 dark:text-gray-400">
              {inst.bio || "Certified instructor dedicated to your success."}
            </p>
          </div>

          {/* Rating + Verification */}
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-2 h-2 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <div className="flex justify-center items-center font-semibold gap-2 text-sm text-sky-500 mt-3">
            <CheckCircle className="w-4 h-4" />
            LTO Certified
          </div>

          {/* Decorative Glow */}
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
        </motion.div>
      ))}
    </div>
  );
}
