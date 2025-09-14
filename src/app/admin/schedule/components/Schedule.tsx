"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetShedules } from "@/hooks/use-schedule";
import { Schedule } from "@/global/type";
import Loading from "@/app/loading";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function SchedulePage() {

  const { data: schedules, isLoading, error } = useGetShedules();

  const [currentWeek, setCurrentWeek] = useState(0);

  if (isLoading) {
    return <Loading />;
  }
  if (error instanceof Error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Define fixed time slots with noon break
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let h = 8; h <= 11; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
    }
    slots.push("12:00_BREAK");
    for (let h = 13; h <= 20; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };

  const allTimes = generateTimeSlots();

  const formatTime = (time: string) => {
    if (time === "12:00_BREAK") return "12:00 PM";
    const [hourStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    if (hour > 12) hour -= 12;
    return `${hour}:00 ${suffix}`;
  };

  const navigateWeek = (dir: number) => setCurrentWeek((prev) => prev + dir);

  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const dayIndex = today.getDay() || 7; // Sunday = 0 => 7
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayIndex + 1 + offset * 7);

    return daysOfWeek.map((_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(currentWeek);

  const handleCellClick = (sessions: Schedule[] | null, day: string, time: string) => {
    if (sessions && sessions.length > 0) {
      alert(
        `Sessions at ${formatTime(time)} on ${day}:\n` +
        sessions.map((s) => `${s.courseTitle} (${s.first_name} ${s.last_name})`).join("\n")
      );
    } else {
      alert(`Available slot at ${formatTime(time)} on ${day}`);
    }
  };

  return (
    <div className="p-3 bg-theme min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-7 h-7 text-yellow-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Weekly Schedule
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <ChevronLeft />
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Week{" "}
            {currentWeek === 0
              ? "Current"
              : currentWeek > 0
                ? `+${currentWeek}`
                : currentWeek}
          </span>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border scrollbar-hidden scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-gray-600 border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
        <div className="max-h-[80vh] overflow-y-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wide">
                  Time
                </th>
                {daysOfWeek.map((day, index) => (
                  <th
                    key={day}
                    className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wide"
                  >
                    <div>{day}</div>
                    <div className="text-xs font-medium text-gray-700/80 dark:text-gray-700 mt-1">
                      {weekDates[index].toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {allTimes.map((time) => {
                if (time === "12:00_BREAK") {
                  return (
                    <tr key={time} className=" border-t font-semibold">
                      <td className="px-3 py-2 ">12:00 PM</td>
                      <td colSpan={daysOfWeek.length} className="px-3 py-4 ">
                        Noon Break
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={time}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-2 py-4 font-mono text-gray-700 dark:text-gray-200">
                      {formatTime(time)}
                    </td>

                    {daysOfWeek.map((day, i) => {
                      const date = weekDates[i];

                      const sessions =
                        schedules?.filter((s) => {
                          const start = new Date(s.startDayTime);
                          const sameDay = start.toDateString() === date.toDateString();

                          // format schedule startTime into "HH:00"
                          const slot = `${start.getHours().toString().padStart(2, "0")}:00`;
                          return sameDay && slot === time;
                        }) ?? [];

                      const isAvailable = sessions.length === 0;

                      return (
                        <td
                          key={day}
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleCellClick(sessions, day, time)}
                        >
                          {isAvailable ? (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              Available
                            </span>
                          ) : (
                            <div className="space-y-2">
                              {sessions.map((session) => {
                                const sessionColors =
                                  session.sessionNo === "FIRST"
                                    ? "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                                    : session.sessionNo === "SECOND"
                                      ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                                      : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100";

                                return (
                                  <div
                                    key={session.id}
                                    className="p-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                                  >
                                    <div className="font-medium">PDC</div>
                                    <div className="text-sm">
                                      {session.first_name} {session.last_name}
                                    </div>
                                    <span
                                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${sessionColors}`}
                                    >
                                      {session.sessionNo} Session
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                          )}
                        </td>
                      );
                    })}

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;



