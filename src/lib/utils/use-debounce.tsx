"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface DebouncedSearchInputProps {
  defaultValue?: string;
  searchUser: (value: string) => void;
}

export default function DebouncedSearchInput({
  defaultValue = "",
  searchUser,
}: DebouncedSearchInputProps) {
  const [value, setValue] = useState(defaultValue);

  const debounced = useDebouncedCallback(
    async (inputValue: string) => {
      try {
        searchUser(inputValue.toUpperCase());
      } catch (error) {
        console.error("Error searching user:", error);
      }
    },
    2000,
    { maxWait: 3000 },
  );

  useEffect(() => {
    return () => {
      debounced.flush();
    };
  }, [debounced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounced(newValue);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search"
        className="pl-10 h-10 text-[11px] text-muted-foreground"
      />
    </div>
  );
}
