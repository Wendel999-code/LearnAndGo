"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = React.useState(theme === "dark");

  React.useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  function handleToggle(value: boolean) {
    setIsDark(value);
    setTheme(value ? "dark" : "light");
  }

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        className={`${isDark
            ? "bg-gray-700 data-[state=checked]:bg-gray-600"
            : "bg-gray-300 data-[state=checked]:bg-gray-500"
          }`}
      />
    </div>
  );
}
