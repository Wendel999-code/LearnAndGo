"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      bio: " Expert in advanced road training and highway safety.",
      image:
        "https://www.yourtango.com/sites/default/files/image_blog/2024-09/traits-truly-good-woman.png",
    },
    {
      id: 3,
      name: "Carlos Rivera",
      specialty: "Refresher Driving Course",
      bio: "Passionate about teaching  drivers with patience and clarity.",
      image:
        "https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Emily Johnson",
      feedback:
        "The instructors are patient and professional. I passed my test on the first try!",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "Michael Lee",
      feedback:
        "Amazing experience. The lessons were clear and easy to follow. Highly recommend!",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      feedback:
        "I used to be nervous about driving, but now I feel confident thanks to my instructor.",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
  ];

  const [current, setCurrent] = React.useState(0);
  const nextTestimonial = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="min-h-screen bg-theme py-12 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Meet Our Instructors
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our certified and passionate driving instructors are here to guide you
          every step of the way. Learn with confidence and hit the road safely.
        </p>
      </motion.div>

      {/* Alternating Instructor Showcase */}
      <div className="flex flex-col gap-24 max-w-6xl mx-auto mb-24 px-4">
        {instructors.map((instructor, idx) => (
          <motion.div
            key={instructor.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 relative group">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-[350px] object-cover rounded-2xl shadow-xl group-hover:scale-[1.03] transition-transform duration-500"
              />
              {/* Accent overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>

            {/* Info */}
            <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                {instructor.name}
              </h2>
              <p className="text-lg text-yellow-600 dark:text-yellow-400 font-semibold">
                {instructor.specialty}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {instructor.bio}
              </p>
              {/* <Button className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg transition rounded-full px-6 py-2">
                Book Lesson
              </Button> */}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          What Our Students Say
        </h2>

        <Card className="relative overflow-hidden shadow-md rounded-2xl p-8 bg-theme">
          <motion.div
            key={testimonials[current].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center  gap-4">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                width={300} // request higher resolution
                height={200}
                className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500"
              />

              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonials[current].feedback}"
              </p>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-2">
                – {testimonials[current].name}
              </span>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
