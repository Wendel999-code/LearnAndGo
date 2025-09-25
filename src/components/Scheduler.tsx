"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const workingHours = [
  { label: "7:00 - 9:00 AM", value: "7-9" },
  { label: "9:30 - 11:30 AM", value: "9_30-11_30" },
  { label: "1:00 - 3:00 PM", value: "1-3" },
  { label: "3:00 - 5:00 PM", value: "3-5" },
  { label: "5:00 - 7:00 PM", value: "5-7" },
];

// Example booked slots: { "2025-09-26": ["7-9","3-5"] }
const initialBooked = {
  "2025-09-26": ["7-9", "3-5"],
};

export default function Scheduler() {
    
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [booked, setBooked] = useState(initialBooked);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const dateKey = selectedDay?.toISOString().split("T")[0] || "";

  const handleBooking = (slot: string) => {
    if (!selectedDay) return;
    const updated = { ...booked };
    if (!updated[dateKey]) updated[dateKey] = [];
    updated[dateKey].push(slot);
    setBooked(updated);
    setSelectedSlot(null);
    alert(`Booked ${slot} on ${dateKey}`);
  };

  const isSlotBooked = (slot: string) => booked[dateKey]?.includes(slot);

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        disabled={{ before: new Date() }}
      />

      {selectedDay && (
        <motion.div
          key={dateKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg"
        >
          {workingHours.map((slot) => {
            const bookedStatus = isSlotBooked(slot.value);
            return (
              <button
                key={slot.value}
                onClick={() => !bookedStatus && setSelectedSlot(slot.value)}
                disabled={bookedStatus}
                className={`p-4 rounded-2xl shadow text-center  text-gray-600 transition
                  ${
                    bookedStatus
                      ? "bg-gray-300 cursor-not-allowed "
                      : selectedSlot === slot.value
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-blue-100"
                  }`}
              >
                {slot.label}
              </button>
            );
          })}
        </motion.div>
      )}

      {selectedSlot && (
        <motion.button
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          onClick={() => handleBooking(selectedSlot)}
          className="px-6 py-3 rounded-2xl bg-green-500 text-white shadow"
        >
          Confirm Booking
        </motion.button>
      )}
    </div>
  );
}
