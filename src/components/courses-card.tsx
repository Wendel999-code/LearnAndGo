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
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
}: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "TDC":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-300";
      case "PDC":
        return "bg-yellow-700 text-white border-amber-200 ";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="w-full max-w-sm">
      <Card
        className={`relative border rounded-2xl shadow-sm transition-all bg-white dark:bg-gray-900 
        ${isSelected ? "ring-2 ring-yellow-500 shadow-md" : "hover:shadow-md"}`}
        onClick={onSelect}
      >
        <CardHeader>
          <div className="flex items-center justify-between mb-3">
            <Badge
              className={`px-2 py-0.5 text-xs font-medium rounded-md ${getLevelColor(
                course.id
              )}`}
            >
              {course.level}
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {course.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            {course.desc}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {course.features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Price
              </span>
              <p className="text-xl font-bold text-yellow-500">
                ₱{course.price.toLocaleString()}
              </p>
            </div>
            {!onEnroll && (
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
              >
                Enroll Now <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CoursesCard;
