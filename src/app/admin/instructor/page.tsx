"use client";

import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderCircle, Plus, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addInstructor } from "@/actions/instructor";
import { useGetInstructors } from "@/hooks/use-instructor";
import { InstructorCard } from "@/components/InstructorCard";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  bio: "",
  image_URL: null as File | null,
};

export default function Instructor() {
  const { data: instructors, isLoading } = useGetInstructors();

  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files;
      const url = URL.createObjectURL(file[0]);
      setImagePreview(url);
      setFormData((prev) => ({ ...prev, image_URL: file[0] }));
    }
  };

  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const res = await addInstructor(formData);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["instructors"] });
        toast.success(res.message);
        setOpen(false);
        setFormData(initialState);
      } else {
        console.error(res.message);
        toast.error(res.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error in handleAddInstructor:", error);
      toast.error("Failed to add instructor.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="p-2  space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center  pb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Instructors
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r cursor-pointer from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold shadow-md transition-all duration-200 transform "
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Instructor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg md:max-w-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-x-auto h-[90vh]">
            <DialogHeader className="text-center items-center">
              <DialogTitle className="text-2xl font-bold text-yellow-500">
                Add New Instructor
              </DialogTitle>
              <DialogDescription className="text-neutral-600 dark:text-gray-400">
                Fill out the details below to add a new instructor to the
                system.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddInstructor} className="space-y-5 py-4">
              {/* Name fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    placeholder="John"
                    required
                    className="focus-visible:ring-2 focus-visible:ring-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    placeholder="Doe"
                    required
                    className="focus-visible:ring-2 focus-visible:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="john.doe@example.com"
                  required
                  className="focus-visible:ring-2 focus-visible:ring-yellow-400"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="focus-visible:ring-2 focus-visible:ring-yellow-400"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="focus-visible:ring-2 focus-visible:ring-yellow-400"
                />
              </div>
              {/* File Uploads */}
              <div>
                <Label className="mb-1 text-sm text-gray-600 dark:text-gray-500">
                  Upload Valid ID *
                </Label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <Button
                    type="button"
                    size={"icon"}
                    variant="outline"
                    className="border-yellow-500/50 cursor-pointer text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black"
                    onClick={() => imageRef.current?.click()}
                  >
                    <Upload className="w-5 h-5" />
                  </Button>
                  {imagePreview && (
                    <motion.img
                      src={imagePreview}
                      alt="Valid ID"
                      className="w-56 h-36 rounded-sm border object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    />
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Background</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleFormChange}
                  className="min-h-[100px] focus-visible:ring-2 focus-visible:ring-yellow-400"
                />
              </div>

              {/* Footer */}
              <DialogFooter className="pt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => setOpen(false)}
                  className="border-gray-300 dark:border-zinc-700 hover:text-red-500 cursor-pointer transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isAdding}
                  className="bg-gradient-to-r cursor-pointer from-yellow-400 to-amber-500 hover:from-yellow-500  hover:to-yellow-700 text-black font-semibold shadow-md w-36"
                >
                  {isAdding ? (
                    <LoaderCircle className="animate-spin h-4 w-4 mx-auto" />
                  ) : (
                    "Save Instructor"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Instructor List Placeholder */}
      <div className="rounded-xl p-1 text-center text-gray-500 dark:text-gray-400">
        <InstructorCard instructors={instructors ?? []} isLoading={isLoading} />
      </div>
    </div>
  );
}
