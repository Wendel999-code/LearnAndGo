"use server";

import About from "./landing/About";
import Courses from "./landing/Courses";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import { redirect } from "next/navigation";
import Header from "./landing/Header";
import { stackServerApp } from "@/stack";

export default async function Home() {
  const user = await stackServerApp.getUser();

  const role = user?.clientReadOnlyMetadata?.role;

  if (role === "admin") redirect("/admin");
  if (role === "student") redirect("/student");

  return (
    <div className="min-h-screen flex flex-col bg-theme">
      <Header />
      <Hero />
      <About />
      <Courses />
      <Footer />
    </div>
  );
}
