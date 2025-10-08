"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { CarIcon, Menu, BookOpen, Info, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut, SignIn, SignOutButton, UserButton } from "@clerk/nextjs";

function StudentHeader() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#courses", label: "Courses", icon: BookOpen },
    { href: "/#about", label: "About", icon: Info },
    { href: "#footer", label: "Contact", icon: Phone },
  ];

  return (
    <header className="w-full sticky top-0 z-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-sm border-b border-yellow-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-1 ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            className="w-9 h-9 md:w-10 md:h-10 bg-black dark:bg-yellow-500 rounded-xl flex items-center justify-center shadow-md"
          >
            <CarIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 dark:text-black" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl font-extrabold text-black tracking-tight"
          >
            Learn&Go
          </motion.h1>
        </Link>

        <div className="flex gap-3 ">
          {/* {user ? (
            <UserButton />
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-black text-black hover:bg-black hover:text-yellow-400 dark:border-yellow-700 dark:text-gray-900 dark:hover:bg-yellow-400 dark:hover:text-black rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Button>
          )} */}

          <ModeToggle />

          <SignOutButton />
        </div>
      </div>
    </header>
  );
}

export default StudentHeader;
