"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { courses } from "@/lib/courses";
import CoursesCard from "@/components/courses-card";
import { GraduationCap, ArrowRight, Phone } from "lucide-react";

function Courses() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="courses"
      className="py-20 lg:py-28 px-4 lg:px-8 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-yellow-400/10 border border-yellow-400/20"
          >
            <GraduationCap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
              Professional Training Programs
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Courses
          </motion.h2>

          <motion.p
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose from our comprehensive range of LTO-accredited driving
            courses, expertly designed for all skill levels and taught by
            certified professionals.
          </motion.p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {courses.map((course, idx) => (
            <CoursesCard key={course.id} course={course} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Courses;
