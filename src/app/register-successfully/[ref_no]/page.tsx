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

  const { reference_id, coursePrice, courseTitle, ammountPaid, student } =
    result.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme px-3">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-10 text-center max-w-lg w-full border border-gray-200 dark:border-gray-800"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-24 h-24 text-green-500 drop-shadow-md" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
          Registration Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-base leading-relaxed">
          Thank you for enrolling with{" "}
          <span className="font-semibold text-yellow-500">LearnAndGo</span>.{" "}
          Please allow <span className="font-semibold">1–2 business days</span>{" "}
          for processing and confirmation from our team.
        </p>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 dark:bg-zinc-800 rounded-2xl p-6 mb-6 text-left space-y-4 shadow-inner border border-gray-200 dark:border-gray-700"
        >
          <InfoRow
            label="Enrollee's Name"
            value={`${student.first_name} ${student.last_name}`}
          />
          <InfoRow label="Course Enrolled" value={courseTitle} />
          <InfoRow label="Course Price" value={`₱${coursePrice}`} />
          <InfoRow
            label="Amount Paid"
            value={`₱${ammountPaid}`}
            valueClass="text-green-600 dark:text-green-400 font-semibold"
          />
          <InfoRow
            label="Reference No."
            value={reference_id}
            valueClass="font-mono"
          />
        </motion.div>

        {/* Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 italic">
          Note: Please take a screenshot of this page and keep this reference
          number for future transactions.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <Link href="/">
            <Button className="w-full rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg transition">
              Back to Home
            </Button>
          </Link>
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
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span
        className={`text-sm font-medium text-gray-900 dark:text-gray-100 ${
          valueClass || ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
