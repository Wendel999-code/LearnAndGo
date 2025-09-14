"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  Info,
  LoaderCircle,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { courses } from "@/lib/courses";
import type { Variants } from "framer-motion";
import CoursesCard from "@/components/courses-card";
import toast from "react-hot-toast";
import { registerStudentAndPayment } from "@/actions/student/student";
import Header from "../landing/Header";
import { useGetShedules } from "@/hooks/use-schedule";

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

interface SelectedSchedule {
  date: Date;
  time: string;
  session: "FIRST" | "SECOND" | "THIRD";
}

function CheckoutForm() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [validIdPreview, setValidIdPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [selectedSchedules, setSelectedSchedules] = useState<
    SelectedSchedule[]
  >([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentSession, setCurrentSession] = useState<
    "FIRST" | "SECOND" | "THIRD"
  >("FIRST");

  const validIdRef = useRef<HTMLInputElement | null>(null);
  const selfieRef = useRef<HTMLInputElement | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const { data: schedules, isLoading: schedulesLoading } = useGetShedules();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age: 0,
    address: "",
    valid_id: null as File | null,
    selfie: null as File | null,
    courseTitle: "",
    coursePrice: 0,
    preferredSchedules: [] as SelectedSchedule[],
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
      setPreview(url);
      setFormData((prev) => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let h = 8; h <= 11; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
    }
    for (let h = 13; h <= 20; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };

  const allTimes = generateTimeSlots();

  const formatTime = (time: string) => {
    const [hourStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    if (hour > 12) hour -= 12;
    return `${hour}:00 ${suffix}`;
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
    setSelectedDate(null);
  };

  // Check if a date has any available time slots
  const hasAvailableSlots = (date: Date) => {
    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return false;

    return allTimes.some((time) => isSlotAvailable(date, time));
  };

  // Check if a specific time slot is available
  const isSlotAvailable = (date: Date, time: string) => {
    if (!schedules) return true;

    // Check if slot is already booked by other users
    const isBookedByOthers = schedules.some((schedule) => {
      const scheduleDate = new Date(schedule.startDayTime);
      const sameDay = scheduleDate.toDateString() === date.toDateString();
      const scheduleTime = `${scheduleDate
        .getHours()
        .toString()
        .padStart(2, "0")}:00`;
      return sameDay && scheduleTime === time;
    });

    if (isBookedByOthers) return false;

    // Check if the current user has already selected this time slot for any session
    const isSelectedByUser = selectedSchedules.some((schedule) => {
      const sameDay = schedule.date.toDateString() === date.toDateString();
      return sameDay && schedule.time === time;
    });

    return !isSelectedByUser;
  };

  // Check if a slot is already selected by the user
  const isSlotSelected = (
    date: Date,
    time: string,
    session: "FIRST" | "SECOND" | "THIRD"
  ) => {
    return selectedSchedules.some(
      (schedule) =>
        schedule.date.toDateString() === date.toDateString() &&
        schedule.time === time &&
        schedule.session === session
    );
  };

  const handleTimeSlotSelect = (time: string) => {
    if (!selectedDate) return;

    // Check if slot is already booked by other users
    const isBookedByOthers = schedules?.some((schedule) => {
      const scheduleDate = new Date(schedule.startDayTime);
      const sameDay =
        scheduleDate.toDateString() === selectedDate.toDateString();
      const scheduleTime = `${scheduleDate
        .getHours()
        .toString()
        .padStart(2, "0")}:00`;
      return sameDay && scheduleTime === time;
    });

    if (isBookedByOthers) {
      toast.error("This time slot is already booked by another user.");
      return;
    }

    // Check if user has already selected this time slot for another session
    const isSelectedByUserForOtherSession = selectedSchedules.some(
      (schedule) => {
        const sameDay =
          schedule.date.toDateString() === selectedDate.toDateString();
        const sameTime = schedule.time === time;
        const differentSession = schedule.session !== currentSession;
        return sameDay && sameTime && differentSession;
      }
    );

    if (isSelectedByUserForOtherSession) {
      toast.error(
        "You have already selected this time slot for another session. Please choose a different time."
      );
      return;
    }

    if (isSlotSelected(selectedDate, time, currentSession)) {
      // Remove the selection
      const updatedSchedules = selectedSchedules.filter(
        (schedule) =>
          !(
            schedule.date.toDateString() === selectedDate.toDateString() &&
            schedule.time === time &&
            schedule.session === currentSession
          )
      );
      setSelectedSchedules(updatedSchedules);
      setFormData((prev) => ({
        ...prev,
        preferredSchedules: updatedSchedules,
      }));
    } else {
      // Check if this session is already scheduled for another time
      const existingSessionSchedule = selectedSchedules.find(
        (schedule) => schedule.session === currentSession
      );

      if (existingSessionSchedule) {
        toast.error(
          `You have already selected a time for ${currentSession} session. Please remove it first.`
        );
        return;
      }

      // Add new selection
      const newSchedule: SelectedSchedule = {
        date: selectedDate,
        time,
        session: currentSession,
      };

      const updatedSchedules = [...selectedSchedules, newSchedule];
      setSelectedSchedules(updatedSchedules);
      setFormData((prev) => ({
        ...prev,
        preferredSchedules: updatedSchedules,
      }));
      toast.success(
        `${currentSession} session scheduled for ${selectedDate.toLocaleDateString()} at ${formatTime(
          time
        )}`
      );
    }
  };

  const removeSchedule = (scheduleToRemove: SelectedSchedule) => {
    const updatedSchedules = selectedSchedules.filter(
      (schedule) =>
        !(
          schedule.date.toDateString() ===
            scheduleToRemove.date.toDateString() &&
          schedule.time === scheduleToRemove.time &&
          schedule.session === scheduleToRemove.session
        )
    );
    setSelectedSchedules(updatedSchedules);
    setFormData((prev) => ({ ...prev, preferredSchedules: updatedSchedules }));
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
    if (selectedSchedules.length === 0) {
      toast.error("Please select at least one session schedule");
      return;
    }

    setSubmitting(true);

    try {
      const res = await registerStudentAndPayment(formData);
      toast.success("Redirecting to payment...");
      window.location.href = res.invoice_url;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
                    htmlFor="first_name"
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                  >
                    First Name
                  </Label>
                  <Input
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="first_name"
                    required
                  />
                </div>
                <div>
                  <Label
                    className="mb-1 text-sm text-gray-600 dark:text-gray-500"
                    htmlFor="last_name"
                  >
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="border !bg-transparent border-gray-400 dark:border-gray-800"
                    id="last_name"
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
                    max="100"
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
                      className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black"
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
                      className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-black"
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
                  <div className="mt-4 grid sm:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <CoursesCard
                        key={course.id}
                        course={course}
                        isSelected={selectedCourse === course.id}
                        onEnroll={true}
                        onSelect={() => {
                          setSelectedCourse(course.id);
                          setFormData((prev) => ({
                            ...prev,
                            courseTitle: course.title,
                            coursePrice: course.price,
                          }));
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Schedule Selection */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <Label className="text-lg font-semibold">
                      Schedule Your Sessions *
                    </Label>
                  </div>

                  {schedulesLoading ? (
                    <div className="flex justify-center py-8">
                      <LoaderCircle className="animate-spin w-8 h-8 text-yellow-500" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Session Selector */}
                      <div className="flex gap-2 flex-wrap">
                        {["FIRST", "SECOND", "THIRD"].map((session) => (
                          <Button
                            key={session}
                            type="button"
                            variant={
                              currentSession === session ? "default" : "outline"
                            }
                            className={`${
                              currentSession === session
                                ? "bg-yellow-500 text-black"
                                : "border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                            }`}
                            onClick={() =>
                              setCurrentSession(
                                session as "FIRST" | "SECOND" | "THIRD"
                              )
                            }
                          >
                            {session} Session
                            {selectedSchedules.find(
                              (s) => s.session === session
                            ) && <span className="ml-2 text-green-600">✓</span>}
                          </Button>
                        ))}
                      </div>

                      {/* Calendar */}
                      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigateMonth(-1)}
                            className="p-2"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </Button>
                          <h3 className="text-lg font-semibold">
                            {monthNames[currentMonth.getMonth()]}{" "}
                            {currentMonth.getFullYear()}
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigateMonth(1)}
                            className="p-2"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {dayNames.map((day) => (
                            <div
                              key={day}
                              className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {getDaysInMonth(currentMonth).map((date, index) => {
                            if (!date) {
                              return (
                                <div key={index} className="p-2 h-12"></div>
                              );
                            }

                            const isToday =
                              date.toDateString() === new Date().toDateString();
                            const isSelected =
                              selectedDate?.toDateString() ===
                              date.toDateString();
                            const hasSlots = hasAvailableSlots(date);
                            const hasScheduledSessions = selectedSchedules.some(
                              (s) =>
                                s.date.toDateString() === date.toDateString()
                            );

                            return (
                              <button
                                key={index}
                                type="button"
                                disabled={!hasSlots}
                                onClick={() =>
                                  setSelectedDate(hasSlots ? date : null)
                                }
                                className={`p-2 h-12 text-sm rounded-lg transition-colors relative ${
                                  isSelected
                                    ? "bg-yellow-500 text-black font-semibold"
                                    : hasSlots
                                    ? "hover:bg-yellow-100 dark:hover:bg-yellow-500/20 text-gray-700 dark:text-gray-300"
                                    : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                } ${isToday ? "ring-2 ring-yellow-400" : ""}`}
                              >
                                {date.getDate()}
                                {hasScheduledSessions && (
                                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      {selectedDate && (
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                          <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Available Times for{" "}
                            {selectedDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Scheduling:{" "}
                            <span className="font-semibold text-yellow-600">
                              {currentSession} Session
                            </span>
                          </p>

                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {allTimes.map((time) => {
                              const isAvailable = isSlotAvailable(
                                selectedDate,
                                time
                              );
                              const isSelected = isSlotSelected(
                                selectedDate,
                                time,
                                currentSession
                              );

                              return (
                                <button
                                  key={time}
                                  type="button"
                                  disabled={!isAvailable && !isSelected}
                                  onClick={() => handleTimeSlotSelect(time)}
                                  className={`py-2 px-3 text-sm rounded-lg transition-colors ${
                                    isSelected
                                      ? `bg-yellow-500 text-black font-semibold`
                                      : isAvailable
                                      ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-700"
                                      : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                  }`}
                                >
                                  {formatTime(time)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Selected Sessions Summary */}
                      {selectedSchedules.length > 0 && (
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                          <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Your Selected Sessions
                          </h4>
                          <div className="space-y-2">
                            {selectedSchedules
                              .sort((a, b) => {
                                const sessionOrder = {
                                  FIRST: 1,
                                  SECOND: 2,
                                  THIRD: 3,
                                };
                                return (
                                  sessionOrder[a.session] -
                                  sessionOrder[b.session]
                                );
                              })
                              .map((schedule, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-500/10 p-3 rounded-lg"
                                >
                                  <div>
                                    <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                                      {schedule.session} Session
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {schedule.date.toLocaleDateString(
                                        "en-US",
                                        {
                                          weekday: "long",
                                          month: "long",
                                          day: "numeric",
                                        }
                                      )}{" "}
                                      at {formatTime(schedule.time)}
                                    </p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSchedule(schedule)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Course Summary */}
                {selectedCourse && (
                  <div className="md:col-span-2 text-center py-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Selected Course:
                    </p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {courses.find((c) => c.id === selectedCourse)?.title} - ₱
                      {courses.find((c) => c.id === selectedCourse)?.price}
                    </p>
                  </div>
                )}

                {/* Note */}
                <div className="md:col-span-2">
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-400/50 p-4">
                    <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-200 leading-relaxed">
                      <span className="font-semibold">Note:</span> Partial
                      payment of at least{" "}
                      <span className="font-bold">₱500</span> is required for
                      all courses. Schedule all three sessions (First, Second,
                      Third) for your complete training. Each session must be
                      scheduled at different times, even on the same day. You
                      will be redirected to the secure payment gateway after
                      registration.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <Button
                    disabled={
                      !selectedCourse ||
                      !formData.selfie ||
                      !formData.valid_id ||
                      selectedSchedules.length === 0 ||
                      submitting ||
                      !formData.first_name ||
                      !formData.last_name ||
                      !formData.email ||
                      !formData.phone ||
                      !formData.age ||
                      !formData.address
                    }
                    onClick={handleSubmit}
                    className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-400 text-black font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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

export default CheckoutForm;
