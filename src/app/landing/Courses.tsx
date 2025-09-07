"use client";

import CoursesCard from "@/components/courses-card";
import { courses } from "@/lib/courses";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

function Courses() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="courses" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Our Courses</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our range of driving courses designed for different
            skill levels and needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <CoursesCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
