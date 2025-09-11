"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, ArrowRight, Award } from "lucide-react";
import { motion, } from "framer-motion";
import { Variants } from "framer-motion";

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
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      rotateX: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-300';
      case 'intermediate':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="perspective-1000"
    >
      <Card
        className={`relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 
          dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
          shadow-xl border-0 cursor-pointer group
          ${isSelected
            ? "ring-4 ring-yellow-400 ring-opacity-60 shadow-2xl shadow-yellow-400/20"
            : "hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/10"
          }`}
        onClick={onSelect}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-red-400/5 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isSelected ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        <CardHeader className="pb-4 relative z-10">
          <motion.div
            className="flex items-center justify-between mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Badge
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${getLevelColor(course.level)}`}
            >
              <Award className="w-3 h-3 mr-1" />
              {course.level}
            </Badge>
            <motion.div
              className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                {course.rating}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2 group-hover:from-yellow-600 group-hover:to-orange-600 transition-all duration-300">
              {course.title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {course.desc}
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="relative z-10">
          <motion.div
            className="space-y-3 mb-6"
            initial="hidden"
            animate="visible"
          >
            {course.features.map((feat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={featureVariants}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm group/feature"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </motion.div>
                <span className="group-hover/feature:text-gray-900 dark:group-hover/feature:text-gray-100 transition-colors duration-200">
                  {feat}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</span>
              <motion.span
                className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                ₱{course.price.toLocaleString()}
              </motion.span>
            </div>

            {!onEnroll && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  <span className="mr-2">Enroll Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </CardContent>

        {/* Floating orbs for visual interest */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </Card>
    </motion.div>
  );
}


export default CoursesCard