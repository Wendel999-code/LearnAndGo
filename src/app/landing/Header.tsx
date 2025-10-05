"use client";

import { useEffect, useState, useRef } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { CarIcon, Menu } from "lucide-react";
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
  const headerRef = useRef<HTMLElement | null>(null);
  const [white, setWhite] = useState(false);

  useEffect(() => {
    const about = document.getElementById("about");
    const headerEl = headerRef.current;
    if (!about || !headerEl) return;

    const check = () => {
      const headerHeight = headerEl.offsetHeight;
      const aboutTop = about.getBoundingClientRect().top;
      setWhite(aboutTop <= headerHeight);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          check();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("load", check);
    const initTimer = window.setTimeout(check, 120);
    check();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
      window.removeEventListener("load", check);
      clearTimeout(initTimer);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        white
          ? "bg-white/80 backdrop-blur-md border-gray-200 dark:bg-zinc-950/80 dark:border-zinc-800"
          : "bg-gradient-to-r from-yellow-400 to-yellow-600 border-transparent dark:from-zinc-950 dark:to-zinc-950"
      }`}
    >
      <div className="container py-3">
        <div className="flex items-center justify-between px-2 md:px-36">
          {/* Logo + Title */}
          <Link href={"/"} className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.1 }}
              className="w-10 h-10 bg-black dark:bg-yellow-500 rounded-lg flex items-center justify-center shadow-md transition-transform"
            >
              <CarIcon className="w-6 h-6 text-yellow-400 dark:text-black" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-2xl font-extrabold text-black dark:text-yellow-400 group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors"
            >
              Learn&Go
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {["Courses", "About", "Contact"].map((item, i) => (
              <Link
                key={i}
                href={`/#${item.toLowerCase()}`}
                className="relative text-black dark:text-white font-medium 
        hover:text-neutral-800 dark:hover:text-yellow-400 transition-colors
        after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 
        after:bg-black dark:after:bg-yellow-500 after:transition-all hover:after:w-full"
              >
                {item}
              </Link>
            ))}

            <Link href="/signin">
              <Button
                variant="outline"
                size="sm"
                className="border-black text-black hover:bg-black hover:text-yellow-400 
        dark:border-yellow-400 dark:text-yellow-400 
        dark:hover:bg-yellow-400 dark:hover:text-black 
        rounded-xl shadow-sm transition-all"
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

                <div className="flex items-center justify-center mb-6">
                  <h2 className="text-lg font-bold text-black dark:text-yellow-400">
                    Menu
                  </h2>
                </div>

                <div className="flex flex-col pl-3 gap-4">
                  {["Courses", "About", "Contact"].map((item, i) => (
                    <SheetClose asChild key={i}>
                      <Link
                        href={`/#${item.toLowerCase()}`}
                        className="text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 font-medium transition-colors"
                      >
                        {item}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/signin">
                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-yellow-400 
                          dark:border-yellow-400 dark:text-yellow-400 
                          dark:hover:bg-yellow-400 dark:hover:text-black 
                          rounded-xl shadow-sm transition-all"
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
