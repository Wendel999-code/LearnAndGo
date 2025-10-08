"use client";

import { useEffect, useState, useRef } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { CarIcon, Menu, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function Header() {
  return (
    <header className="sticky top-0  h-35 border-b border-gray-800 shadow-xs relative overflow-hidden">
      <motion.div
        initial={{
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        }}
        animate={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 36% 38%)",
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-br from-yellow-400 to-yellow-600 -z-10"
      />

      <div className="container mx-auto px-4 lg:px-8 md:pt-13">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo + Title */}
          <Link href={"/"} className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.1 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CarIcon className="w-7 h-7 text-black dark:text-black" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl lg:text-3xl font-extrabold text-gradient group-hover:scale-105 transition-transform duration-300"
            >
              Learn&Go
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-between px-38 gap-8">
            {["Courses", "About", "Instructors", "Contact"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/#${item.toLowerCase()}`}
                  className="relative group text-black dark:text-white font-semibold text-sm lg:text-base
                    hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300
                    after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 
                    after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-600 
                    after:transition-all after:duration-300 group-hover:after:w-full"
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <Link href="/signin">
                <Button
                  className="relative group bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
                    text-black font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl 
                    transition-all duration-300 hover:scale-105 border-0"
                >
                  <span className="flex items-center gap-2">
                    Sign In
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </Button>
              </Link>
              {/* <ModeToggle /> */}
            </motion.div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-3">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl  hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5 text-black dark:text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] sm:w-[350px] bg-white/95 dark:bg-black/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-800/50"
              >
                <SheetHeader>
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>
                </SheetHeader>

                <div className="flex items-center justify-center mb-8 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                      <CarIcon className="w-6 h-6 text-black" />
                    </div>
                    <h2 className="text-xl font-bold text-gradient">Menu</h2>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {["Courses", "About", "Instructors", "Contact"].map(
                    (item, i) => (
                      <SheetClose asChild key={i}>
                        <Link
                          href={`/#${item.toLowerCase()}`}
                          className="text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 font-semibold text-lg transition-colors py-2"
                        >
                          {item}
                        </Link>
                      </SheetClose>
                    )
                  )}
                  <SheetClose asChild>
                    <Link href="/register" className="mt-4">
                      <Button
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
                          text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-xl 
                          transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Enroll Now
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0%, 100% 100%, 36% 38%);
        }
      `}</style> */}
    </header>
  );
}

export default Header;
