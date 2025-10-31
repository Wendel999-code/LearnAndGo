"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import clsx from "clsx";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

interface CourseCardProps {
  course: any;
  index: number;
  isRegister?: boolean;
  isLoading?: boolean;
  selectedCourse?: string | null;
  setSelectedCourse?: (courseId: string) => void;
  isInAdmin?: boolean;
}

function CoursesCard({
  course,
  index,
  isRegister,
  isLoading,
  selectedCourse,
  setSelectedCourse,
  isInAdmin,
}: CourseCardProps) {
  const getLevelColor = (level: string) => {
    const map: Record<string, string> = {
      TDC: "from-emerald-400 to-emerald-600  text-white",
      PDC: "from-sky-400 to-sky-600 text-white",
    };
    return map[level] ?? "from-yellow-400 to-yellow-600";
  };

  if (isLoading)
    return (
      <div className="rounded-2xl w-full border border-zinc-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-950 p-7 space-y-6">
        <Skeleton className="h-5 w-20 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-6 w-40 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-4 w-full rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-5 w-16 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-8 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    );

  const isSelected = selectedCourse === course.id;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className={clsx(setSelectedCourse && "group cursor-pointer")}
      >
        <div
          onClick={(e) => {
            if (
              setSelectedCourse &&
              !(e.target as HTMLElement).closest("button")
            ) {
              setSelectedCourse(course.id);
            }
          }}
          className={clsx(
            "relative h-full rounded-2xl border bg-gradient-to-br shadow-lg overflow-hidden transition-all duration-300",
            "border-gray-200 dark:border-zinc-800",
            "hover:shadow-yellow-500/20",
            isSelected &&
              "border-yellow-500 ring-2 ring-yellow-400/40 shadow-yellow-500/30"
          )}
        >
          <div className="relative p-7 space-y-6 h-full">
            <div className="flex items-start justify-between">
              <div
                className={clsx(
                  "px-3 py-1.5 rounded-lg bg-gradient-to-r text-black font-bold text-xs shadow-md uppercase tracking-wide",
                  getLevelColor(course.courseCode)
                )}
              >
                {course.courseCode}
              </div>
            </div>

            {isInAdmin && (
              <div className="absolute right-2 top-2">
                <button
                  type="button"
                  className="p-2 rounded-full bg-transparent cursor-pointer hover:bg-yellow-500/20 text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 ease-out"
                >
                  <Ellipsis className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="space-y-3 min-h-[130px]">
              <h3 className="text-xl font-bold text-yellow-500 dark:text-yellow-400 group-hover:text-yellow-300 transition-colors">
                {course.courseTitle}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed ">
                {course.description}
              </p>
            </div>

            {/* Features  */}
            <div className="space-y-3 h-[150px]">
              {course.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 group/feat">
                  <div className="w-5 h-5 rounded-lg  flex items-center justify-center shadow-sm">
                    <svg
                      className="w-3 h-3 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-700 dark:text-gray-400 group-hover/feat:text-neutral-900 dark:group-hover/feat:text-white transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 border-t border-gray-300 dark:border-zinc-800 pt-4">
              <div className="space-y-0.5">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Price
                </span>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  ₱{course.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className={clsx(
              "absolute -right-10 -bottom-10 w-36 h-36 bg-yellow-500/20 rounded-full blur-3xl opacity-0 transition-opacity duration-700",
              "group-hover:opacity-100",
              isSelected && "opacity-100"
            )}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        <div className="relative bg-green-500 w-full">
          {!isRegister && (
            <div className="absolute  right-6 -top-16">
              {" "}
              <Link href="/register">
                <Button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-colors">
                  Enroll Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default CoursesCard;
