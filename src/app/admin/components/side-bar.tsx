"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PanelRightClose,
  PanelLeftClose,
  Globe,
  Home,
  Users,
  Calendar,
  GraduationCap,
  Award,
  CreditCard,
  BookOpenCheck,
  Speech,
  ChartBarBig,
  UserCog,
} from "lucide-react";
import { useGetEnrollees } from "@/hooks/use-student";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStudentWithoutSchedule } from "@/hooks/use-schedule";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

{
}
const navItems = [
  { label: "Home", href: "/admin", icon: Home },
  { label: "Enrollees", href: "/admin/enrollee", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Schedule", href: "/admin/schedule", icon: Calendar },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Courses", href: "/admin/courses", icon: BookOpenCheck },
  { label: "Instructor", href: "/admin/instructor", icon: Speech },
  {
    label: "Organizational Chart",
    href: "/admin/org-chart",
    icon: ChartBarBig,
  },
  {
    label: "User Accounts",
    href: "/admin/user-account",
    icon: UserCog,
  },
];

function SideBar() {
  const { data: enrollee, isLoading } = useGetEnrollees();
  const { data: students, isLoading: isLoadingStudents } =
    useGetStudentWithoutSchedule();

 

  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`sticky top-20 h-[calc(100vh-5rem)] flex flex-col border-r shadow-sm transition-all duration-300 ease-in-out
       bg-theme
        ${open ? "w-58" : "w-20"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <span
          className={`flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100 transition-all
            ${open ? "opacity-100" : "opacity-0 w-0"}
          `}
        >
          <Globe className="w-5 h-5 shrink-0" />
          {open && "Overview"}
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg cursor-w-resize text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {open ? <PanelLeftClose /> : <PanelRightClose />}
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isEnrollee = item.label === "Enrollees";
          const isSchedule = item.label === "Schedule";

          const NavContent = (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center relative gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
          ${
            isActive
              ? "bg-linear-to-r font-sans from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:bg-linear-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700"
          }
        `}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? "text-black" : ""
                }`}
              />

              {/* Sidebar label */}
              <span
                className={`whitespace-nowrap transition-opacity duration-200 ${
                  open ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.label}
              </span>

              {/* Enrollees badge */}
              {isEnrollee && (
                <span className="absolute top-1.5 right-1 flex items-center justify-center">
                  {isLoading ? (
                    <Skeleton className="w-4 h-4 rounded-full animate-pulse bg-linear-to-r from-red-400 via-red-500 to-red-400" />
                  ) : (enrollee?.length ?? 0) > 0 ? (
                    <>
                      <span className="absolute inline-flex w-5.5 h-5.5 rounded-full bg-red-400 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-[10px] font-semibold text-white shadow-sm">
                        {enrollee?.length}
                      </span>
                    </>
                  ) : null}
                </span>
              )}

              {/* Schedule badge */}
              {isSchedule && (
                <span className="absolute top-1.5 right-1 flex items-center justify-center">
                  {isLoadingStudents ? (
                    <Skeleton className="w-4 h-4 rounded-full animate-pulse bg-linear-to-r from-red-400 via-red-500 to-red-400" />
                  ) : (students?.length ?? 0) > 0 ? (
                    <span className="relative inline-flex w-5 h-5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-600 text-[10px] font-semibold text-white shadow-sm cursor-pointer">
                            {students?.length}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="w-40 rounded-md shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3"
                        >
                          <div className="flex flex-col gap-1.5">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                              {students?.length} Student
                              {students?.length !== 1 ? "s" : ""} without a
                              session
                            </p>
                            <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                              {students?.map((student) => (
                                <div
                                  key={student.id}
                                  className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <img
                                    src={student.selfie_URL}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    className="w-6 h-6 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                                  />
                                  <div className="flex flex-col text-xs">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                      {student.firstName} {student.lastName}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                      {student.course?.courseCode ||
                                        "No course info"}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                  ) : null}
                </span>
              )}
            </Link>
          );

          // Wrap in Tooltip if sidebar is closed
          return open ? (
            NavContent
          ) : (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>{NavContent}</TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                className="bg-primary text-primary-foreground px-3 py-1.5 text-xs  rounded-lg shadow-lg animate-in fade-in-50 slide-in-from-left-2"
              >
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p
          className={`text-xs text-gray-500 dark:text-gray-400 transition-all ${
            open ? "block" : "hidden"
          }`}
        >
          © {new Date().getFullYear()} Driving School
        </p>
      </div>
    </aside>
  );
}

export default SideBar;
