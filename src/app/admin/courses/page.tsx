"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import CoursesCard from "@/components/courses-card";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourses } from "@/hooks/use-course";
import CourseFormModal from "@/components/CourseFormModal";

export default function Courses() {
  const { data: coursesData, isLoading } = useGetCourses();
  const [isAddCourse, setIsAddCourse] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
  };

  return (
    <div className="flex flex-col items-center  gap-8 p-3 min-h-screen bg-white dark:bg-black">
      <div className="flex items-center justify-between  w-full">
        <h1 className="text-4xl font-bold  ">Driving Courses</h1>
        <Button
          onClick={() => setIsAddCourse(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold cursor-pointer shadow-md transition-transform transform "
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="w-full ">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[300px] rounded-xl bg-gray-300 dark:bg-zinc-700 animate-pulse"
              />
            ))}
          {coursesData?.map((course, i) => (
            <motion.div
              key={course.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <CoursesCard
                course={course}
                index={i}
                isRegister={true}
                isLoading={isLoading}
                isInAdmin={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* course form modal */}
      {isAddCourse && (
        <CourseFormModal
          isAddCourse={isAddCourse}
          setIsAddCourse={setIsAddCourse}
        />
      )}
    </div>
  );
}
