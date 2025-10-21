"use client";

import React, { useState } from "react";
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
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/admin", icon: Home },
  { label: "Enrollees", href: "/admin/enrollee", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Schedule", href: "/admin/schedule", icon: Calendar },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Courses", href: "/admin/courses", icon: BookOpenCheck },
  { label: "Instructor", href: "/admin/instructor", icon: Speech },
];

function SideBar() {
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
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
          ${
            isActive
              ? "bg-gradient-to-r font-sans from-yellow-400 via-yellow-500 to-yellow-600 text-black  shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700"
          }
        `}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? "text-black " : ""
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-200 ${
                  open ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.label}
              </span>
            </Link>
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
