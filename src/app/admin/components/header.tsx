"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@stackframe/stack";
import { CarIcon } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-zinc-950 dark:to-zinc-950 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-black dark:bg-yellow-500 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <CarIcon className="w-6 h-6 text-yellow-400 dark:text-black" />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-extrabold text-black dark:text-yellow-400">
                LearnAndGo
              </h1>
              <p className="text-sm text-black/70 dark:text-gray-400">
                Professional Driving School
              </p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
