"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import { getEnrollee } from "@/actions/student/student";

function Hero() {


  const handleFetch = async () => {
    const res = await getEnrollee("4401e7bb-0ef7-4cdc-8531-be12e3bdc75a")

    console.log(res);

  }


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
          className="text-sm md:text-lg text-black/80 font-serif dark:text-gray-400"
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

          <Button onClick={handleFetch}
            size="default"
            className="relative overflow-hidden 
               bg-black text-yellow-400 
               dark:bg-yellow-400 dark:text-black
               font-semibold rounded-xl shadow-lg 
               hover:shadow-xl transform transition-all duration-300 hover:scale-105 group"
          >
            {/* Hover overlay only for light mode */}
            <span className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden" />

            {/* Hover overlay only for dark mode */}
            <span className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block" />

            <span className="relative z-10 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Enroll Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>



        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
