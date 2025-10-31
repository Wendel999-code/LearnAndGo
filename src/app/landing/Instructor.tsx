"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useGetInstructors } from "@/hooks/use-instructor";
import { InstructorCard } from "@/components/InstructorCard";

export default function InstructorsSection() {
  const { data: instructors, isLoading } = useGetInstructors();

  return (
    <section
      id="instructors"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                staggerChildren: 0.15,
                ease: "easeOut",
              },
            },
          }}
          className="text-center mb-16 space-y-4"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full shadow-sm
               bg-yellow-100 text-yellow-800
               dark:bg-yellow-400/10 dark:text-yellow-300
               font-medium tracking-wide"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm">Our Instructors</span>
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            Meet Our{" "}
            <span className="text-yellow-500">Certified Instructors</span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-base md:text-lg text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Learn from certified professionals who focus on confidence,
            precision, and safety — every step of your driving journey.
          </motion.p>
        </motion.div>

        {/* Reusable card */}
        <InstructorCard instructors={instructors} isLoading={isLoading} />
      </div>
    </section>
  );
}
