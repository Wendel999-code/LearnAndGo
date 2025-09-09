"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

function About() {
  const features = [
    {
      icon: Users,
      title: "Expert Instructors",
      desc: "Learn from highly experienced and certified driving instructors who guide you every step of the way.",
    },
    {
      icon: Award,
      title: "LTO Accredited",
      desc: "Our courses are fully accredited by the Land Transportation Office, ensuring official driving certification upon completion.",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      desc: "Book lessons at your convenience with our flexible scheduling system, tailored to your lifestyle.",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background overflow-hidden"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Why Choose LearnAndGo?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Master the road with confidence. LearnAndGo combines modern teaching
            methods, certified instructors, and official accreditation to help
            you become a skilled, safe, and confident driver.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-10"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10, rotateY: 5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Card className="border border-gray-200 dark:border-gray-700 hover:border-yellow-400 transition-all duration-300 shadow-md hover:shadow-2xl rounded-2xl bg-white dark:bg-gray-800 overflow-hidden">
                <CardHeader className="text-center p-8 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg"
                  >
                    <feature.icon className="w-8 h-8 text-yellow-400" />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>

              <motion.div
                className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
