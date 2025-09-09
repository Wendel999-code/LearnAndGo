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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="about" className="py-20 px-6">
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
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Card className="border border-gray-200 dark:border-gray-700 hover:border-yellow-400 transition-all duration-300 shadow-md hover:shadow-xl rounded-2xl bg-white dark:bg-gray-800">
                  <CardHeader className="text-center p-8">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-sm"
                    >
                      <feature.icon className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
