"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import CoursesCard from "@/components/courses-card";
import { Check, Loader, Loader2, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourses } from "@/hooks/use-course";
import { addCourse } from "@/actions/student/course";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Courses() {
  const { data: coursesData, isLoading } = useGetCourses();
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseCode: "",
    description: "",
    features: [] as string[],
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumber = e.target.type === "number";
    setFormData((prev) => ({
      ...prev,
      [name]: isNumber ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSaveCourse = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsAdding(true);

    try {
      const res = await addCourse(formData);

      if (!res.success) {
        toast.error(res.message);
      }

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success(res.message);
    } catch (error) {
      console.error("handleSaveCourse error:", error);
    } finally {
      setFormData({
        courseTitle: "",
        courseCode: "",
        description: "",
        features: [],
        price: 0,
      });
      setIsAdding(false);
      setOpen(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
  };

  return (
    <div className="flex flex-col items-center  gap-8 p-3 min-h-screen bg-white dark:bg-black">
      <div className="flex items-center justify-between w-full max-w-6xl">
        <h1 className="text-4xl font-bold  ">Driving Courses</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold cursor-pointer shadow-md transition-transform transform hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="w-full max-w-6xl">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[300px] rounded-xl bg-gray-300 dark:bg-zinc-700 animate-pulse"
              />
            ))}
          {coursesData?.map((course, i) => (
            <motion.div
              key={course.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <CoursesCard
                course={course}
                index={i}
                isRegister={true}
                isLoading={isLoading}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Course Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-4xl p-0 h-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* Left Side: Preview */}
            <div className="p-8 bg-zinc-100 dark:bg-black rounded-l-lg">
              <CoursePreviewCard course={formData} />
            </div>

            {/* Right Side: Form */}
            <form onSubmit={handleSaveCourse}>
              <fieldset disabled={isAdding} className="p-8 space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-4">
                    Add New Course
                  </DialogTitle>
                </DialogHeader>

                <Input
                  name="courseTitle"
                  placeholder="Course Title"
                  value={formData.courseTitle}
                  onChange={handleChange}
                />
                <Input
                  name="courseCode"
                  placeholder="Course Code (e.g., TDC, PDC)"
                  value={formData.courseCode}
                  onChange={handleChange}
                />
                <Input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <Input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />

                {/* Features Section */}
                <div>
                  <label className="text-sm font-medium">Features</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      name="feature"
                      placeholder="Add a feature"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAddFeature}
                      type="button"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2">
                  <AnimatePresence>
                    {formData.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md"
                      >
                        <span className="text-sm">{feature}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="w-6 h-6 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isAdding ||
                      !formData.courseTitle ||
                      !formData.courseCode ||
                      !formData.description ||
                      Number(formData.price) <= 0
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 cursor-pointer"
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Course"
                    )}
                  </Button>
                </div>
              </fieldset>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// A stand-alone preview card component for the modal
const CoursePreviewCard = ({ course }: { course: any }) => {
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
                <Check className="w-5 h-5 text-yellow-500" />
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
        {/* <Button
          disabled={!courseTitle || !courseCode || !description || price <= 0}
          className="w-full cursor-pointer mt-12 bg-yellow-400 hover:bg-yellow-500 text-zinc-900  "
        >
          Save Course
        </Button> */}
      </div>
    </div>
  );
};
