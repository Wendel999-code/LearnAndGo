"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import Image from "next/image";

const carVariants: Variants = {
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
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
    <section className="relative min-h-96  md:min-h-screen overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-yellow-100 dark:from-black dark:via-zinc-900 dark:to-yellow-950">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto mt-12  px-8 grid lg:grid-cols-2 gap-12 items-center  ">
        {/* Left Content */}
        <div className="space-y-6">
          <Badge
            className="mb-2 px-4 py-1 rounded-full shadow
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
            className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white"
          >
            Learn to Drive with{" "}
            <span className="text-yellow-500">Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-lg text-neutral-700 dark:text-gray-400 max-w-lg"
          >
            Master the road with our comprehensive driving courses. From
            beginner lessons to advanced techniques, we guide you every step of
            the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileTap={{ scale: 0.95 }}
            className="flex gap-4"
          >
            <Link href="/register">
              <Button
                className="relative cursor-pointer group bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
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
          animate={["visible", "floating"]}
          className="relative hidden md:flex justify-center"
        >
          {/* Gradient Glow */}
          <div
            className="absolute bottom-12 right-0 w-[350px] h-[140px] 
      bg-gradient-to-t from-yellow-400/80 via-yellow-300/60 to-transparent 
      dark:from-yellow-500/50 dark:via-yellow-400/30 dark:to-transparent
      rounded-3xl blur-3xl opacity-80"
          />
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
