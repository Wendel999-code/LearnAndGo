"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { registerSuccessfully } from "@/actions/student/student";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function RegisterSuccess({
  params,
}: {
  params: Promise<{ ref_no: string }>;
}) {
  const { ref_no } = use(params);

  const [result, setResult] = useState<{ success: boolean; data: any }>({
    success: false,
    data: null,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await registerSuccessfully(ref_no);

      if (!response.success || !response.data) {
        router.push("/");
        return;
      }

      setResult(response);
    };
    fetchData();
  }, [ref_no, router]);

  if (!result.data) {
    return <Loading />;
  }

  const { reference_id, student, amountPaid, payment_channel } = result.data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 flex items-center justify-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 text-center max-w-2xl w-full border border-gray-200 dark:border-gray-800"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="flex justify-center mb-5"
        >
          <div className="relative">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl animate-pulse -z-10"></div>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Registration Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-base leading-relaxed max-w-md mx-auto">
          Thank you for enrolling with{" "}
          <span className="font-semibold text-yellow-500">LearnAndGo</span>.{" "}
          Your registration is being processed and will be confirmed within{" "}
          <span className="font-semibold">1-2 business days</span>.
        </p>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 sm:p-6 mb-6 text-left space-y-2 shadow-inner border border-gray-200 dark:border-gray-700"
        >
          <InfoRow
            label="Enrollee's Name"
            value={`${student.firstName} ${student.lastName}`}
          />
          <InfoRow label="Course Enrolled" value={student.course.courseTitle} />
          <InfoRow label="Course Price" value={`₱${student.course.price}`} />
          <InfoRow
            label="Amount Paid"
            value={`₱${amountPaid}`}
            valueClass="text-green-600 dark:text-green-400 font-bold"
          />

          <InfoRow
            label="Reference No."
            value={reference_id}
            valueClass="font-mono text-yellow-600 dark:text-yellow-400"
          />
          <InfoRow
            label="Payment Channel"
            value={payment_channel || "N/A"}
            valueClass="font-mono text-sky-600 dark:text-sky-600"
          />
        </motion.div>

        {/* Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 italic px-4">
          Please save a screenshot of this page. You will need the reference
          number for future inquiries.
        </p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a href="/">
            <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-700">
              Back to Home
            </button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Reusable row component */
function InfoRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-100 dark:border-zinc-700 last:border-b-0">
      <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-0">
        {label}
      </span>
      <span
        className={`text-sm font-medium text-gray-800 dark:text-gray-100 text-left sm:text-right break-all ${
          valueClass || ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
