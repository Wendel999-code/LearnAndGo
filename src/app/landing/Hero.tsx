"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative min-h-screen pt-22 flex justify-center bg-theme overflow-hidden ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-zinc-950 dark:to-zinc-950" />

      <div className="relative z-10 max-w-2xl text-center space-y-6">
        <Badge className="mb-4 bg-black text-yellow-400 px-4 py-1 rounded-full shadow">
          Professional Driving Education
        </Badge>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-black dark:text-yellow-300 drop-shadow-lg"
        >
          Learn to Drive with{" "}
          <span className="text-white dark:text-yellow-400 drop-shadow-md">
            Confidence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm md:text-lg text-black/80 dark:text-gray-200"
        >
          Master the road with our comprehensive driving courses. From beginner
          lessons to advanced techniques, we guide you every step of the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="bg-black text-yellow-400 cursor-pointer hover:bg-gray-800 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400 rounded-xl shadow-md"
            >
              Enroll Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
