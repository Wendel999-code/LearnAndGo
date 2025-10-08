"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Star, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface Course {
  id: string;
  level: string;
  title: string;
  desc: string;
  rating: number;
  features: string[];
  price: number;
}

interface CourseCardProps {
  course: Course;
  isSelected?: boolean;
  onSelect?: () => void;
  onEnroll?: boolean;
  index?: number;
}

function CoursesCard({
  course,
  isSelected,
  onSelect,
  onEnroll,
  index = 0,
}: CourseCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "TDC":
        return "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white border-emerald-400";
      case "PDC":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-400";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white border-blue-400";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group w-full max-w-sm"
    >
      <Card
        className={`relative border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
        bg-white/80 dark:bg-black/40 backdrop-blur-sm overflow-hidden
        ${isSelected ? "ring-2 ring-yellow-400 shadow-xl" : ""}
        group-hover:border-yellow-400/50`}
        onClick={onSelect}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:via-yellow-400/10 group-hover:to-yellow-400/5 transition-all duration-500" />

        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge
              className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${getLevelColor(
                course.level
              )}`}
            >
              {course.level}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {course.rating}
              </span>
            </div>
          </div>

          <CardTitle className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
            {course.title}
          </CardTitle>

          <CardDescription className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {course.desc}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 mb-6">
            {course.features.slice(0, 3).map((feat, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
              >
                <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-black" />
                </div>
                <span>{feat}</span>
              </motion.div>
            ))}
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50/50 dark:bg-black/20 rounded-xl">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Clock className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Duration
              </div>
              <div className="text-sm font-semibold text-black dark:text-white">
                4-6 weeks
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Users className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Max Students
              </div>
              <div className="text-sm font-semibold text-black dark:text-white">
                8 per class
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                Starting from
              </span>
              <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                ₱{course.price.toLocaleString()}
              </p>
            </div>
            {!onEnroll && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
                  text-black font-bold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl 
                  transition-all duration-300 hover:scale-105 border-0 group/btn"
              >
                <span className="flex items-center gap-2">
                  Enroll Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </Button>
            )}
          </div>
        </CardContent>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 rounded-full blur-xl" />
      </Card>
    </motion.div>
  );
}

export default CoursesCard;
