"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Info, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import CoursesCard from "@/components/courses-card";
import toast from "react-hot-toast";
import { registerStudentAndPayment } from "@/actions/student/student";
import Header from "../landing/Header";
import { useGetCourses } from "@/hooks/use-course";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.5,
    },
  },
};

function RegisterForm() {
  const { data: coursesData, isLoading } = useGetCourses();

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [validIdPreview, setValidIdPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  console.log("Selected Course ID:", selectedCourse);

  const validIdRef = useRef<HTMLInputElement | null>(null);
  const selfieRef = useRef<HTMLInputElement | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: 0,
    address: "",
    valid_id: null as File | null,
    selfie: null as File | null,
    course_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "valid_id" | "selfie",
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      console.log("File selected:", url);
      setPreview(url);
      setFormData((prev) => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedCourse) {
      toast.error("Please select a course");
      return;
    }
    if (!formData.valid_id) {
      toast.error("Please upload a valid ID");
      return;
    }
    if (!formData.selfie) {
      toast.error("Please upload a selfie");
      return;
    }

    setSubmitting(true);

    try {
      const res = await registerStudentAndPayment(formData);

      if (res.success) {
        toast.success("Redirecting to payment...");
        window.location.href = res.data?.invoice_url;
      } else if (!res.success) {
        toast.error(res.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  //sync selected course id with form data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      course_id: selectedCourse || "",
    }));
  }, [selectedCourse]);

  const disabled =
    !formData.selfie ||
    !formData.valid_id ||
    submitting ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phone ||
    !formData.age ||
    !formData.address ||
    !selectedCourse ||
    submitting;

  return (
    <div className="flex flex-col">
      <Header />
      <section className="py-20 px-6 bg-theme">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-6xl"
        >
          <Card className="border dark:border-gray-800 rounded-2xl shadow-lg bg-theme">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                Student Application
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div>
                  <Label
                    htmlFor="firstName"
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                  >
                    First Name
                  </Label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="firstName"
                    required
                  />
                </div>
                <div>
                  <Label
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                    htmlFor="lastName"
                  >
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="lastName"
                    required
                  />
                </div>
                <div>
                  <Label
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                    htmlFor="email"
                  >
                    Email
                  </Label>
                  <Input
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="email"
                    type="email"
                  />
                </div>
                <div>
                  <Label
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                    htmlFor="phone"
                  >
                    Phone
                  </Label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="phone"
                    type="tel"
                  />
                </div>
                <div>
                  <Label
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                    htmlFor="age"
                  >
                    Age
                  </Label>
                  <Input
                    required
                    value={formData.age || ""}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="age"
                    type="number"
                    min="1"
                    max="70"
                  />
                </div>
                <div>
                  <Label
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                    htmlFor="address"
                  >
                    Address
                  </Label>
                  <Input
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="address"
                    type="text"
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
                      ref={validIdRef}
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e, "valid_id", setValidIdPreview)
                      }
                    />
                    <Button
                      type="button"
                      size={"icon"}
                      variant="outline"
                      className="border-yellow-500/50 cursor-pointer text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black"
                      onClick={() => validIdRef.current?.click()}
                    >
                      <Upload className="w-5 h-5" />
                    </Button>
                    {validIdPreview && (
                      <motion.img
                        src={validIdPreview}
                        alt="Valid ID"
                        className="w-56 h-36 rounded-sm border object-cover"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <Label className="mb-1 text-sm text-gray-600 dark:text-gray-500">
                    Upload Selfie *
                  </Label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      ref={selfieRef}
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e, "selfie", setSelfiePreview)
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size={"icon"}
                      className="border-yellow-500/50 cursor-pointer text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black"
                      onClick={() => selfieRef.current?.click()}
                    >
                      <Upload className="w-5 h-5" />
                    </Button>
                    {selfiePreview && (
                      <motion.img
                        src={selfiePreview}
                        alt="Selfie"
                        className="w-56 h-36 rounded-sm border object-cover"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      />
                    )}
                  </div>
                </div>

                {/* Course Selection */}
                <div className="md:col-span-2">
                  <Label className="text-lg font-semibold">
                    Select Course *
                  </Label>
                  <div className="grid md:grid-cols-2  gap-8 max-w-3xl place-items-center mx-auto">
                    {coursesData?.map((course, index) => (
                      <CoursesCard
                        key={course.id}
                        course={course}
                        index={index}
                        isRegister={true}
                        selectedCourse={selectedCourse}
                        setSelectedCourse={setSelectedCourse}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div>

                {/* Selected Course Summary */}
                {selectedCourse && (
                  <div className="md:col-span-2 text-center py-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Selected Course:
                    </p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {
                        coursesData?.find((c) => c.id === selectedCourse)
                          ?.courseTitle
                      }{" "}
                      - ₱
                      {coursesData
                        ?.find((c) => c.id === selectedCourse)
                        ?.price.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Note */}
                <div className="md:col-span-2">
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-400/50 p-4">
                    <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-200 leading-relaxed">
                      <span className="font-semibold">Note:</span>
                      <span className=" text-[10px] md:text-[12px] text-gray-400 ">
                        {" "}
                        Partial payment of at least ₱500 is required for all
                        courses. You will be redirected to the secure payment
                        gateway after registration.{" "}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <Button
                    disabled={disabled}
                    onClick={handleSubmit}
                    className={`w-full bg-yellow-500 cursor-pointer  hover:bg-yellow-400 text-black font-bold py-3 rounded-xl disabled: ${
                      disabled ? "opacity-50 cursor-not-allowed " : ""
                    }`}
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2" />
                        Proceeding to Payment...
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

export default RegisterForm;
