"use client";

import { useUser } from "@stackframe/stack";
import About from "./landing/About";
import Courses from "./landing/Courses";
import Footer from "./landing/Footer";
import Header from "./landing/Header";
import Hero from "./landing/Hero";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useUser();

  if (user?.clientReadOnlyMetadata?.role === "admin") redirect("/admin");
  if (user?.clientReadOnlyMetadata?.role === "student") redirect("/student");

  return (
    <div className="min-h-screen flex flex-col bg-theme">
      <Hero />
      <About />

      <Courses />

      <Footer />
    </div>
  );
}
