"use client";
import React from "react";
import { motion } from "framer-motion";

export default function InstructorPage() {
  const instructors = [
    {
      id: 1,
      name: "John Doe",
      specialty: "Basic Driving Course",
      bio: "10+ years of experience helping students drive safely and confidently.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 2,
      name: "Sarah Smith",
      specialty: "Practical Driving Course",
      bio: "Expert in advanced road training and highway safety.",
      image:
        "https://www.yourtango.com/sites/default/files/image_blog/2024-09/traits-truly-good-woman.png",
    },
    {
      id: 3,
      name: "Carlos Rivera",
      specialty: "Refresher Driving Course",
      bio: "Passionate about teaching drivers with patience and clarity.",
      image:
        "https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-orange-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center mb-20 text-gray-900 dark:text-gray-100 tracking-tight"
      >
        Meet Our Instructors
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-14">
        {instructors.map((instructor, idx) => (
          <motion.div
            key={instructor.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group [perspective:1000px] w-72 h-96"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-hover:scale-[1.02]">
              {/* Front */}
              <div className="absolute inset-0 flex flex-col rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-zinc-800 [backface-visibility:hidden]">
                <div className="relative">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-68 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
                </div>
                <div className="flex flex-col items-center justify-center p-4">
                  <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {instructor.name}
                  </h2>
                  <p className="text-yellow-600 dark:text-yellow-400 font-medium">
                    {instructor.specialty}
                  </p>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 rounded-3xl shadow-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-400 text-white text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <p className="text-base leading-relaxed">{instructor.bio}</p>
                <button className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 transition font-semibold tracking-wide">
                  Book Lesson
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
