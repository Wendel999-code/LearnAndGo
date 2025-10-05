"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Left Content */}
      <div className="relative z-10  max-w-xl px-6 md:px-12 space-y-6">
        <Badge
          className="mb-4 px-4 py-1 rounded-full shadow
             bg-yellow-100 text-yellow-800
             dark:bg-yellow-400/20 dark:text-yellow-300
             font-medium tracking-wide"
        >
          Professional Driving Education
        </Badge>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-[#2E709E] dark:text-white"
        >
          Learn to Drive with{" "}
          <span className="text-yellow-500">Confidence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-base md:text-lg text-neutral-700 dark:text-gray-400"
        >
          Master the road with our comprehensive driving courses. From beginner
          lessons to advanced techniques, we guide you every step of the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileTap={{ scale: 0.95 }}
          className="flex gap-4"
        >
          <Link href="/register">
            <button
              className="group relative flex items-center gap-2 
             rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black
             shadow-lg transition-transform duration-300
             hover:scale-105 hover:shadow-xl"
            >
              <GraduationCap className="h-4 w-4" />
              Enroll Now
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Image with faded yellow bg */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        {/* Gradient Glow - Light & Dark */}
        <div
          className="absolute bottom-12 right-0 w-[350px] h-[140px] 
                  bg-gradient-to-t from-yellow-400/80 via-yellow-300/60 to-transparent 
                  dark:from-yellow-500/50 dark:via-yellow-400/30 dark:to-transparent
                  rounded-3xl blur-3xl opacity-80"
        />

        <Image
          src="/red.png"
          alt="Hero Car"
          width={600}
          height={300}
          className="relative object-contain mx-auto drop-shadow-2xl"
          priority
        />
      </motion.div>
    </section>
  );
}

export default Hero;
