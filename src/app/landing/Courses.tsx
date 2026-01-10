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
          className="text-center mb-16 space-y-6"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full shadow
              bg-yellow-100 text-yellow-800
              dark:bg-yellow-400/20 dark:text-yellow-300
              font-medium tracking-wide"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">Professional Training Programs</span>
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white"
          >
            Our <span className="text-yellow-500">Courses</span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-sm md:text-lg text-neutral-700 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose from our comprehensive range of LTO-accredited driving
            courses, expertly designed for all skill levels and taught by
            certified professionals.
          </motion.p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl backdrop-blur-3xl  mx-auto"
        >
          {coursesData?.map((course, idx) => (
            <CoursesCard
              key={course.id}
              course={course}
              index={idx}
              isLoading={isLoading}
              isRegister={false}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Courses;
