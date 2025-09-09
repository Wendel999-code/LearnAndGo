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
              className="relative overflow-hidden group px-8 py-3 rounded-2xl font-semibold 
             bg-black text-yellow-400 shadow-lg cursor-pointer 
             hover:shadow-xl transition-all duration-300
             dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400"
            >
              {/* Glow / highlight effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></span>

              {/* Text */}
              <span className="relative z-10 flex items-center gap-2">
                Enroll Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12l-3.75 3.75M3 12h18"
                  />
                </svg>
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
