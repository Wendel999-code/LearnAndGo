"use client";

import CoursesCard from "@/components/courses-card";
import { useGetCourses } from "@/hooks/use-course";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

//TODO add features to real courses data

function Courses() {
  const { data: coursesData, isLoading } = useGetCourses();

  return (
    <section id="courses" className="relative min-h-screen overflow-hidden ">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="container mx-auto px-8 py-20 lg:py-28 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full shadow
              bg-yellow-100 text-yellow-800
              dark:bg-yellow-400/20 dark:text-yellow-300
              font-medium tracking-wide"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">Professional Training Programs</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white"
          >
            Our <span className="text-yellow-500">Courses</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-lg text-neutral-700 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose from our comprehensive range of LTO-accredited driving
            courses, expertly designed for all skill levels and taught by
            certified professionals.
          </motion.p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2  gap-8 max-w-3xl place-items-center mx-auto ">
          {coursesData?.map((course, idx) => (
            <CoursesCard
              key={course.id}
              course={course}
              index={idx}
              isLoading={isLoading}
              isRegister={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
