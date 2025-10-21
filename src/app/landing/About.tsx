"use client";

import React from "react";
import { Users, Award, Shield } from "lucide-react";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.05,
    y: -10,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const textCharVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

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
      icon: Shield,
      title: "Safety First",
      desc: "Modern vehicles and comprehensive training with proven safety-focused methods.",
    },
  ];

  const title = "Why Choose Us?";

  return (
    <section
      id="about"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="text-center mb-16 space-y-4"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full shadow-sm
                       bg-yellow-100 text-yellow-800
                       dark:bg-yellow-400/10 dark:text-yellow-300
                       font-medium tracking-wide"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm">About LearnAndGo</span>
          </motion.div>

          <motion.h2
            variants={textContainerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            {title.split("").map((char, index) => {
              const lower = char.toLowerCase();
              const isUs =
                (title[index - 1]?.toLowerCase() === " " &&
                  lower === "u" &&
                  title[index + 1]?.toLowerCase() === "s") ||
                (lower === "s" && title[index - 1]?.toLowerCase() === "u");

              return (
                <motion.span
                  key={index}
                  variants={textCharVariants}
                  className={`inline-block ${isUs ? "text-yellow-500" : ""}`}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
            }}
            className="text-base md:text-lg text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            We provide a comprehensive, safety-focused approach to driving
            education, ensuring every student becomes a confident and
            responsible driver.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: false, amount: 0.5 }}
              className="group relative p-8 rounded-2xl
                         bg-white/50 dark:bg-zinc-900/50
                         backdrop-blur-lg
                         shadow-lg
                         border border-gray-200/50 dark:border-zinc-800/50
                         overflow-hidden"
            >
              {/* Sweep Shine Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep" />
              </div>

              <style jsx>{`
                @keyframes sweep {
                  0% {
                    transform: translateX(-150%);
                  }
                  70% {
                    transform: translateX(150%);
                  }
                  100% {
                    transform: translateX(150%);
                  }
                }
                .animate-sweep {
                  animation: sweep 4s ease-in-out infinite;
                }
              `}</style>

              {/* Radial background glow on hover */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
              </div>

              {/* Content */}
              <div className="relative space-y-3">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
