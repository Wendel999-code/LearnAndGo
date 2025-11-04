"use client";;
import About from "./landing/About";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Header from "./landing/Header";
import Instructor from "./landing/Instructor";
import Courses from "./landing/Courses";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative  overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-yellow-100 dark:from-black dark:via-zinc-900 dark:to-yellow-950">
      <Header />

      <Hero />
      <About />
      <Instructor />
      <Courses />
      {/* <Gallery /> */}
      <Footer />
    </div>
  );
}
