"use client";

import { Check } from "lucide-react";

function CoursePreviewCard({ course }: { course: Record<string, any> }) {
  const { courseTitle, courseCode, description, features, price } = course;
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col ">
      <div className="flex-grow">
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-500">
            {courseCode || "COURSE CODE"}
          </p>
          <h3 className="text-2xl font-bold text-yellow-500 ">
            {courseTitle || "Course Title"}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 h-12">
            {description || "Your course description will appear here."}
          </p>
        </div>
        <ul className="space-y-2.5 my-6">
          {features.length > 0 ? (
            features.map((feature: any, index: any) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-zinc-700 dark:text-zinc-300">
                  {feature}
                </span>
              </li>
            ))
          ) : (
            <li className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500">
              <Check className="w-5 h-5" />
              <span>Features will be listed here</span>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-auto">
        <p className="text-4xl font-extrabold text-yellow-500 ">
          ₱{price.toLocaleString() || "0"}
        </p>
      </div>
    </div>
  );
}

export default CoursePreviewCard;
