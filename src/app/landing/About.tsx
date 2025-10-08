"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Award, Calendar, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";
import Image from "next/image";

function About() {
  const features = [
    {
      icon: Award,
      title: "LTO Accredited",
      desc: "Fully accredited courses by the Land Transportation Office for official driving certification.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      desc: "Certified professionals providing personalized guidance throughout your learning journey.",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      desc: "Convenient booking system that adapts to your lifestyle and availability.",
    },
    {
      icon: Shield,
      title: "Safety First",
      desc: "Modern vehicles and comprehensive training with proven safety-focused methods.",
    },
  ];

  const images = ["/lto.jpg", "/instructor.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      className="py-20 lg:py-28 px-4 lg:px-8 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
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
              About Us
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Experience excellence in driving education with our comprehensive
            approach to safe and confident driving.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full h-[400px] lg:h-[500px]"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-2xl" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[index]}
                    alt="Driving School"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-yellow-400"
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Section: Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={cardVariants}>
                <Card className="group relative h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10">
                  <CardHeader className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-zinc-900" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {feature.desc}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400/0 via-yellow-500/0 to-yellow-600/0 group-hover:from-yellow-400/5 group-hover:via-yellow-500/5 group-hover:to-yellow-600/5 transition-all duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
