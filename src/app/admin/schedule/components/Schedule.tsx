"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetShedules } from "@/hooks/use-schedule";
import Loading from "@/app/loading";
import { format } from "date-fns";
import AddSchedule from "./AddSchedule";
import { formatTime } from "@/lib/utils/date";
import { Badge } from "@/components/ui/badge";

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

  const [currentWeek, setCurrentWeek] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedDayTime, setSelectedDayTime] = useState({
    day: "",
    time: "",
  });

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

  return (
    <div className="p-3  min-h-screen">
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
              {allTimes.map((time) => (
                <tr
                  key={time}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  {/* Time column */}
                  <td
                    className={`px-2 ${
                      formatTime(time).includes("PM")
                        ? "text-red-600"
                        : "text-sky-500"
                    }`}
                  >
                    {formatTime(time)}
                  </td>

                  {/* Days columns */}
                  {daysOfWeek.map((day, i) => {
                    const date = weekDates[i];

                    const sessions =
                      schedules?.flatMap((s) => {
                        const sessionArray = [
                          { key: "1st Session", value: s.first_session },
                          { key: "2nd Session", value: s.second_session },
                          { key: "3rd Session", value: s.third_session },
                        ];

                        return sessionArray
                          .map(({ key, value }) => {
                            if (!value) return null;

                            const parts = value.split(" ");
                            const datePart = parts.slice(0, 3).join(" ");
                            const timePart = parts.slice(3).join(" ");
                            const sessionDate = new Date(datePart);

                            const sameDay =
                              sessionDate.toDateString() ===
                              date.toDateString();
                            const sameTime = formatTime(time) === timePart;

                            if (sameDay && sameTime) {
                              return {
                                student: s.student,
                                course_key: s.student?.course?.courseCode,
                                sessionType: key,
                              };
                            }
                            return null;
                          })
                          .filter(Boolean);
                      }) ?? [];

                    return (
                      <td
                        key={day}
                        className="px-6 py-4 cursor-pointer "
                        onClick={() => handleCellClick(date, time)}
                      >
                        {/* If no sessions → Available */}
                        {sessions.length === 0 ? (
                          <span className="px-4 py-1 rounded-full text-xs font-semibold bg-green-700 text-gray-300">
                            Available
                          </span>
                        ) : (
                          <div className="space-y-2 relative">
                            {/* Display only the first session */}
                            {sessions.slice(0, 1).map((session, idx) => {
                              const badgeColor =
                                session?.sessionType === "1st Session"
                                  ? "bg-blue-700 text-white"
                                  : session?.sessionType === "2nd Session"
                                  ? "bg-yellow-700 text-white"
                                  : "bg-red-700 text-white";

                              return (
                                <div
                                  key={`${session?.student?.firstName}-${idx}`}
                                  className="bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-md p-2 flex flex-col items-center gap-1 text-center shadow-sm"
                                >
                                  <div className="text-yellow-500 text-[11px] font-medium leading-tight">
                                    {session?.course_key}
                                  </div>
                                  <div className="text-[12px] font-semibold leading-tight capitalize">
                                    {session?.student?.firstName}{" "}
                                    {session?.student?.lastName}
                                  </div>
                                  <div>
                                    <span
                                      className={`${badgeColor} text-[9px] px-2 py-0.5 rounded-full`}
                                    >
                                      {session?.sessionType}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}

                            {/* If multiple sessions → show +X more indicator */}
                            {sessions.length > 1 && (
                              <Badge
                                variant={"outline"}
                                className="text-[10px] top-18 left-16 absolute transition-all duration-300 bg-yellow-500 text-black hover:scale-105 hover:shadow-lg"
                              >
                                +{sessions.length - 1} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
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
          schedules={schedules}
        />
      )}
    </div>
  );
}

export default SchedulePage;
