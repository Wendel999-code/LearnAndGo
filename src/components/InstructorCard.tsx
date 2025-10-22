"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LoaderCircle,
  Mail,
  Phone,
  MapPin,
  Users, // Icon for empty state
} from "lucide-react";
import { Instructor } from "@/constant/type";

export function InstructorCard({
  instructors,
  isLoading,
}: {
  instructors: Instructor[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InstructorSkeletonGrid />;
  }

  if (!instructors || instructors.length === 0) {
    return (
      <div className="border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400 mt-6">
        <Users className="w-12 h-12 mx-auto text-gray-400 dark:text-zinc-600 mb-4" />
        <h3 className="text-lg font-semibold">No Instructors Found</h3>
        <p className="text-sm">
          There are currently no instructors added to the system.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
      {instructors.map((instructor, index) => (
        <motion.div
          key={instructor.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.03, y: -5 }} // Added a slight 'lift' on hover
          viewport={{ once: true }}
          className="h-full" // Ensure motion div respects grid height
        >
          <Card className="border border-gray-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden  flex flex-col">
            <div className=" items-center justify-center flex overflow-hidden">
              <img
                src={"https://github.com/shadcn.png"}
                alt={instructor.firstName}
                className="object-cover w-60 h-40 rounded-2xl transition-transform duration-500"
              />
            </div>

            {/* 2. Left-Aligned Header */}
            <CardHeader className="p-6 space-y-2">
              <CardTitle className="text-xl font-bold text-neutral-900 dark:text-white">
                {instructor.firstName} {instructor.lastName}
              </CardTitle>
              <Badge
                variant="outline"
                className="w-fit bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 font-semibold"
              >
                Instructor
              </Badge>
            </CardHeader>

            {/* 3. Left-Aligned Content with Icons */}
            <CardContent className="p-6 pt-0 flex-1 flex flex-col">
              {instructor.bio && (
                <p className="text-sm text-neutral-700 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {instructor.bio}
                </p>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Contact Info with Icons */}
              <div className="border-t border-gray-200 dark:border-zinc-700 pt-4 mt-4">
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-gray-400">
                  {instructor.email && (
                    <li className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-500" />
                      <span className="truncate">{instructor.email}</span>
                    </li>
                  )}
                  {instructor.phone && (
                    <li className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span>{instructor.phone}</span>
                    </li>
                  )}
                  {instructor.address && (
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span className="truncate">{instructor.address}</span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function InstructorSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
      {[...Array(3)].map((_, i) => (
        <Card
          key={i}
          className="border border-gray-200 dark:border-zinc-800 shadow-lg rounded-2xl overflow-hidden"
        >
          <Skeleton className="w-full aspect-video" />
          <div className="p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-1/4" />
            <div className="pt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="border-t border-gray-200 dark:border-zinc-700 pt-4 mt-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
