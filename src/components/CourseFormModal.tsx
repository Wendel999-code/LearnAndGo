"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import CoursePreviewCard from "@/components/CoursePreviewCard";
import { addCourse } from "@/actions/student/course";

interface CourseFormModalProps {
  isAddCourse: boolean;
  setIsAddCourse: (v: boolean) => void;
}

export default function CourseFormModal({
  isAddCourse,
  setIsAddCourse,
}: CourseFormModalProps) {
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
      setIsAddCourse(false);
    }
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <Dialog open={isAddCourse} onOpenChange={setIsAddCourse}>
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
                  onClick={() => setIsAddCourse && setIsAddCourse(false)}
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
  );
}
