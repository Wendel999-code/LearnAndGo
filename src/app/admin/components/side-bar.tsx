"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PanelRightClose, PanelLeftClose } from "lucide-react";

function SideBar() {
  const [open, setOpen] = useState(true);
  return (
    <aside
      className={`bg-theme transition-all duration-300 border border-r overflow-hidden ease-in-out
    ${open ? "w-64" : "w-16"}
  `}
    >
      <div className="flex items-center justify-between p-4">
        <span className={`${open ? "block" : "hidden"} font-bold`}>
          Dashboard
        </span>
        <button
          onClick={() => setOpen(!open)}
          className={`
    text-gray-300 hover:text-white 
    transition-all duration-300 ease-in-out
    ${open ? "ml-0 rotate-0" : "ml-5 "}
  `}
        >
          {open ? <PanelLeftClose /> : <PanelRightClose />}
        </button>
      </div>
      <nav className="flex flex-col space-y-2 px-2">
        <Link href="/" className="hover:bg-gray-700 rounded px-2 py-1">
          Home
        </Link>
        <Link
          href="/admin/settings"
          className="hover:bg-gray-700 rounded px-2 py-1"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}

export default SideBar;
