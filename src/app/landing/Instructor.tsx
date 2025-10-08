"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Award,
  Calendar,
  MessageCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function InstructorPage() {
  const instructors = [
    {
      id: 1,
      name: "John Doe",
      specialty: "Basic Driving Course",
      bio: "10+ years of experience helping students drive safely and confidently.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      experience: "12 years",
      certifications: ["LTO Certified", "Defensive Driving", "First Aid"],
    },
    {
      id: 2,
      name: "Sarah Smith",
      specialty: "Practical Driving Course",
      bio: "Expert in advanced road training and highway safety. Passionate about teaching drivers.",
      image:
        "https://www.yourtango.com/sites/default/files/image_blog/2024-09/traits-truly-good-woman.png",
      experience: "8 years",
      certifications: [
        "LTO Certified",
        "Highway Safety",
        "Vehicle Maintenance",
      ],
    },
    {
      id: 3,
      name: "Carlos Rivera",
      specialty: "Refresher Driving Course",
      bio: "Passionate about teaching drivers with patience and clarity.",
      image:
        "https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg",
      experience: "15 years",
      certifications: [
        "LTO Certified",
        "Advanced Driving",
        "Traffic Law Expert",
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
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
      id="instructors"
      className="py-20 lg:py-28 px-4 lg:px-8 relative overflow-hidden bg-zinc-50 dark:bg-black"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-yellow-400/10 border border-yellow-400/20"
          >
            <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
              Our Team
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Meet Our Expert Instructors
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Learn from certified professionals dedicated to making you a
            confident and safe driver.
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {instructors.map((instructor) => (
            <motion.div
              key={instructor.id}
              variants={cardVariants}
              className="group"
            >
              <div className="relative h-full bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10 overflow-hidden">
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-500/0 to-yellow-600/0 group-hover:from-yellow-400/5 group-hover:via-yellow-500/5 group-hover:to-yellow-600/5 transition-all duration-300 pointer-events-none" />

                {/* Instructor Image */}
                <div className="relative p-8 pb-4">
                  <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/20 group-hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-yellow-400 text-zinc-900 px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Expert
                    </div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="relative z-10 p-8 pt-0">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      {instructor.name}
                    </h3>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 font-medium px-3 py-1 hover:from-yellow-500 hover:to-yellow-600">
                      {instructor.specialty}
                    </Badge>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center mb-6 leading-relaxed">
                    {instructor.bio}
                  </p>

                  {/* Experience Badge */}
                  <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {instructor.experience}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      of experience
                    </span>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                      Certifications
                    </div>
                    <div className="space-y-2">
                      {instructor.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {cert}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <Button
                    className="w-full mt-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors duration-300"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Instructor
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Ready to start your driving journey?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-zinc-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book Your First Lesson
            <Calendar className="w-4 h-4 ml-2" />
          </Button>
        </motion.div> */}
      </div>
    </section>
  );
}
