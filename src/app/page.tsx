"use client";

import About from "./landing/About";
import Courses from "./landing/Courses";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Header from "./landing/Header";
import Instructor from "./landing/Instructor";
import Gallery from "./landing/Gallery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-theme">
      <Header />
      <Hero />
      <About />
      <Instructor />
      <Courses />
      <Gallery />
      <Footer />
    </div>
  );
}
