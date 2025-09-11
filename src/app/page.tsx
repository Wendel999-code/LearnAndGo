"use server";

import About from "./landing/About";
import Courses from "./landing/Courses";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import { redirect } from "next/navigation";
import Header from "./landing/Header";
import { stackServerApp } from "@/stack";
import Instructor from "./landing/Instructor";

export default async function Home() {
  const user = await stackServerApp.getUser();
  let role = user?.clientReadOnlyMetadata?.role;

  if (user && !user.clientReadOnlyMetadata?.role) {
    await user.update({ clientReadOnlyMetadata: { role: "student" } });
    role = "student";
  }

  if (role === "student") redirect("/student");
  if (role === "admin") redirect("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-theme">
      <Header />
      <Hero />
      <About />
      <Instructor />
      <Courses />
      <Footer />
    </div>
  );
}
