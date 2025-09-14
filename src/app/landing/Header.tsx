"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { CarIcon, Menu, X } from "lucide-react";
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
    <header className="sticky top-0 border-b border-gray-300 dark:border-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-zinc-950 dark:to-zinc-950 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <Link href={"/"} className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: -5, scale: 1.05 }}
              className="w-10 h-10 bg-black dark:bg-yellow-500 rounded-lg flex items-center justify-center shadow-md"
            >
              <CarIcon className="w-6 h-6 text-yellow-400 dark:text-black" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-2xl font-extrabold text-black dark:text-yellow-400"
            >
              Learn&Go
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#courses"
              className="text-black dark:text-white hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors font-medium"
            >
              Courses
            </Link>
            <Link
              href="/#about"
              className="text-black dark:text-white hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="#footer"
              className="text-black dark:text-white hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors font-medium"
            >
              Contact
            </Link>

            <Link href="/signin">
              <Button
                variant="outline"
                size="sm"
                className="border-black cursor-pointer text-black hover:bg-black hover:text-yellow-400 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black rounded-xl"
              >
                Sign In
              </Button>
            </Link>
            <ModeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg border border-black/20 dark:border-yellow-400/40"
                >
                  <Menu className="h-5 w-5 text-black dark:text-yellow-400" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[80vw] sm:w-[300px] rounded-md shadow-md bg-white dark:bg-zinc-950"
              >
                {/* Accessible but visually hidden title */}
                <SheetHeader>
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>
                </SheetHeader>

                <div className="flex items-center  justify-center mb-6">
                  <h2 className="text-lg font-bold text-center text-black dark:text-yellow-400">
                    Menu
                  </h2>
                </div>

                <div className="flex flex-col pl-3 gap-4">
                  <SheetClose asChild>
                    <Link
                      href="/#courses"
                      className="text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 font-medium"
                    >
                      Courses
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#about"
                      className="text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 font-medium"
                    >
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#footer"
                      className="text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 font-medium"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/signin">
                      <Button
                        variant="outline"
                        className=" border-black text-black hover:bg-black hover:text-yellow-400 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black rounded-xl"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
