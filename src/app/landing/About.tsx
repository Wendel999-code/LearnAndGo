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
    <section id="about" className="py-20 px-6 ">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold  mb-4">
            Why Choose LearnAndGo?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Master the road with confidence. LearnAndGo combines modern teaching
            methods, certified instructors, and official accreditation to help
            you become a skilled, safe, and confident driver.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Card className="border border-gray-300 dark:border-gray-700 hover:border-yellow-400 transition-all duration-300 shadow-md hover:shadow-xl rounded-lg bg-white dark:bg-gray-800">
                <CardHeader className="text-center p-6">
                  <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="w-7 h-7 text-yellow-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
