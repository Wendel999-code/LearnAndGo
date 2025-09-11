"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { courses } from "@/lib/courses";
import CoursesCard from "@/components/courses-card";

function Courses() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
      },
    },
  };

  return (
    <section id="courses" className="py-20 px-4 relative overflow-hidden">
      {/* Background decorations */}


      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent"
            variants={titleVariants}
          >
            Our <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Courses</span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
            variants={subtitleVariants}
          >
            Choose from our comprehensive range of driving courses, expertly designed for different
            skill levels and tailored to meet your specific learning needs.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((course, idx) => (
            <CoursesCard
              key={course.id}
              course={course}
              index={idx}
            />
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

export default Courses;
