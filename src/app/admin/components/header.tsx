"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@stackframe/stack";
import { CarIcon } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <header
      className="sticky top-0 z-50 h-20 border-b border-gray-200 dark:border-gray-800 
      bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
      dark:from-zinc-900 dark:via-zinc-950 dark:to-black shadow-xs"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-black dark:bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <CarIcon className="w-6 h-6 text-yellow-400 dark:text-black" />
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold text-black dark:text-yellow-400 tracking-tight">
              Learn<span className="text-white dark:text-yellow-500">&</span>Go
            </h1>
            <p className="text-xs text-black/70 dark:text-gray-400">
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
    </header>
  );
}

export default Header;
