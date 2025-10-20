"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import Image from "next/image";

const textVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const carVariants: Variants = {
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
  floating: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

function Hero() {
  return (
    <section className="relative min-h-screen mt-22 overflow-hidden">
      <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Left Content */}
        <div className="space-y-6 relative z-10">
          <motion.div
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={0}
          >
            <Badge
              className="mb-2 px-4 py-1 rounded-full shadow
                bg-yellow-100 text-yellow-800
                dark:bg-yellow-400/20 dark:text-yellow-300
                font-medium tracking-wide"
            >
              Professional Driving Education
            </Badge>
          </motion.div>

          <motion.h1
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={0.2}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white"
          >
            Learn to Drive with{" "}
            <span className="text-yellow-500">Confidence</span>
          </motion.h1>

          <motion.p
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={0.4}
            className="text-sm md:text-lg text-neutral-700 dark:text-gray-400 max-w-lg"
          >
            Master the road with our comprehensive driving courses. From
            beginner lessons to advanced techniques, we guide you every step of
            the way.
          </motion.p>

          <motion.div
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={0.6}
            whileTap={{ scale: 0.95 }}
            className="flex gap-4"
          >
            <Link href="/register">
              <Button
                className="relative cursor-pointer group bg-gradient-to-r from-yellow-400 to-yellow-600 
                  hover:from-yellow-500 hover:to-yellow-700 
                  text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl 
                  transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Enroll Now
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          variants={carVariants}
          initial="hidden"
          whileInView="visible"
          animate="floating"
          viewport={{ once: false, amount: 0.4 }}
          className="relative hidden md:flex justify-center"
        >
          <Image
            src="/red.png"
            alt="Hero Car"
            width={500}
            height={300}
            className="relative object-contain mx-auto drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
