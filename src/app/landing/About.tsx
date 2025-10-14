"use client";

import { Users, Award, Calendar, Shield } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
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

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-yellow-100 dark:from-black dark:via-zinc-900 dark:to-yellow-950"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto px-8 py-20 lg:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full shadow
              bg-yellow-100 text-yellow-800
              dark:bg-yellow-400/20 dark:text-yellow-300
              font-medium tracking-wide"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm">About Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white"
          >
            Why Choose <span className="text-yellow-500">Us?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-lg text-neutral-700 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Experience excellence in driving education with our comprehensive
            approach to safe and confident driving.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative p-8 rounded-2xl 
                bg-white/80 dark:bg-zinc-900/80 
                backdrop-blur-sm
                shadow-lg hover:shadow-2xl 
                border border-gray-200 dark:border-zinc-800 
                overflow-hidden
                transition-all duration-300"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <motion.div
                className="relative mb-6"
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="relative space-y-3">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-700 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Decorative Glow */}
              <motion.div
                className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
