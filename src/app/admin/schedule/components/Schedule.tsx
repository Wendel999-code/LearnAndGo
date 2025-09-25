"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetShedules } from "@/hooks/use-schedule";
import Loading from "@/app/loading";
import { format } from "date-fns";

import { formatTime } from "@/lib/utils";
import AddSchedule from "./AddSchedule";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function SchedulePage() {
  const { data: schedules, isLoading, error } = useGetShedules();
  console.log("schedules here:", schedules);

  const [currentWeek, setCurrentWeek] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedDayTime, setSelectedDayTime] = useState({
    day: "",
    time: "",
  });

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

  // working hours
  const generateTimeSlots = () => {
    return [
      "07:00-09:00",
      "09:30-11:30",
      "13:00-15:00",
      "15:00-17:00",
      "17:00-19:00",
    ];
  };

  const allTimes = generateTimeSlots();

  const navigateWeek = (dir: number) => setCurrentWeek((prev) => prev + dir);

  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const dayIndex = today.getDay() || 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayIndex + 1 + offset * 7);

    return daysOfWeek.map((_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(currentWeek);

  const handleCellClick = (date: Date, time: string) => {
    const formatDate = format(date, "MMM d, yyyy");

    setSelectedDayTime({
      day: formatDate,
      time,
    });
    setOpenAddDialog(true);
  };

  return (
    <div className="p-3 bg-theme min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-3">
          <div className="flex  items-center gap-3 ">
            <Calendar className="w-7 h-7 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Weekly Schedule
            </h1>
          </div>
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
                return (
                  <tr
                    key={time}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td
                      className={`px-2  ${
                        formatTime(time).includes("PM")
                          ? "text-red-600"
                          : "text-sky-500"
                      } `}
                    >
                      {formatTime(time)}
                    </td>

                    {daysOfWeek.map((day, i) => {
                      const date = weekDates[i];

                      const sessions =
                        schedules?.filter((s) => {
                          // Combine all three possible sessions into an array
                          const sessionsArray = [
                            s.first_session,
                            s.second_session,
                            s.third_session,
                          ];

                          return sessionsArray.some((sessionTime) => {
                            if (!sessionTime) return false;

                            // Split into date part and time part
                            const parts = sessionTime.split(" ");
                            const datePart = parts.slice(0, 3).join(" "); // "Sep 25, 2025"
                            const timePart = parts.slice(3).join(" "); // "5 PM – 7 PM"

                            const sessionDate = new Date(datePart);

                            // Match the date column
                            const sameDay =
                              sessionDate.toDateString() ===
                              date.toDateString();

                            // Match the time slot string directly
                            const sameTime = formatTime(time) === timePart;

                            return sameDay && sameTime;
                          });
                        }) ?? [];

                      return (
                        <td
                          key={day}
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleCellClick(date, time)}
                        >
                          {sessions.length === 0 ? (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-gray-300">
                              Available
                            </span>
                          ) : (
                            <div className="space-y-2">
                              {sessions.map((session) => {
                                let sessionLabel = "";
                                let labelStyle = "";

                                // Parse each session string into date + time
                                const parseSession = (sessionTime: string) => {
                                  const parts = sessionTime.split(" ");
                                  const datePart = parts.slice(0, 3).join(" "); // e.g. "Sep 25, 2025"
                                  const timePart = parts.slice(3).join(" "); // e.g. "5 PM – 7 PM"
                                  return { datePart, timePart };
                                };

                                if (session.first_session) {
                                  const { timePart } = parseSession(
                                    session.first_session
                                  );
                                  if (timePart === formatTime(time)) {
                                    sessionLabel = "First Session";
                                    labelStyle = "text-blue-500 font-semibold";
                                  }
                                }

                                if (session.second_session) {
                                  const { timePart } = parseSession(
                                    session.second_session
                                  );
                                  if (timePart === formatTime(time)) {
                                    sessionLabel = "Second Session";
                                    labelStyle =
                                      "text-yellow-600 font-semibold";
                                  }
                                }

                                if (session.third_session) {
                                  const { timePart } = parseSession(
                                    session.third_session
                                  );
                                  if (timePart === formatTime(time)) {
                                    sessionLabel = "Third Session";
                                    labelStyle = "text-red-500 font-semibold";
                                  }
                                }

                                return (
                                  <div
                                    key={`${session.student.first_name}-${sessionLabel}`}
                                    className="p-2 text-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                                  >
                                    <div className="items-center text-yellow-500 text-[12px]">
                                      {session.student.course_key}
                                    </div>
                                    <div className="text-sm">
                                      {session.student.first_name}{" "}
                                      {session.student.last_name}
                                    </div>
                                    <div
                                      className={`text-[10px] mt-1 ${labelStyle}`}
                                    >
                                      {sessionLabel}
                                    </div>
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

      {/* render only when openAddDialog is true */}
      {openAddDialog && (
        <AddSchedule
          open={openAddDialog}
          setOpen={setOpenAddDialog}
          day={selectedDayTime.day}
          time={selectedDayTime.time}
        />
      )}
    </div>
  );
}

export default SchedulePage;
