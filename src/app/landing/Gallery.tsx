"use client";

import { TestimonialCard } from "@/components/TestimonialCard";
import { motion } from "framer-motion";
import { GalleryThumbnails } from "lucide-react";

const GalleryPosts = [
  {
    id: 1,
    name: "Maria Santos",
    course: "Basic Driving",
    profileImage:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    journeyImage:
      "https://images.pexels.com/photos/4488665/pexels-photo-4488665.jpeg",
    rating: 5,
    text: "Just passed my driving test on the first try! 🎉 Couldn't have done it without my amazing instructor.",
    location: "Cebu City",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    course: "Refresher Course",
    profileImage:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    journeyImage:
      "https://images.pexels.com/photos/4488667/pexels-photo-4488667.jpeg",
    rating: 5,
    text: "After 5 years of not driving, I was nervous. My instructor made me feel confident again! 🚗💪",
    location: "Mandaue City",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Anna Reyes",
    course: "Advanced Course",
    profileImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    journeyImage:
      "https://images.pexels.com/photos/7014340/pexels-photo-7014340.jpeg",
    rating: 5,
    text: "Highway driving completed! ✅ Professional instructors and well-maintained vehicles.",
    location: "Lapu-Lapu City",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    course: "Practical Course",
    profileImage:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    journeyImage:
      "https://images.pexels.com/photos/3819572/pexels-photo-3819572.jpeg",
    rating: 5,
    text: "Parking was my biggest fear, but not anymore! 🅿️ Now I can parallel park like a pro.",
    location: "Talisay City",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Sofia Martinez",
    course: "Basic Course",
    profileImage:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    journeyImage:
      "https://images.pexels.com/photos/7014706/pexels-photo-7014706.jpeg",
    rating: 5,
    text: "From zero to hero! 🌟 Started with no experience and now I'm driving to school every day.",
    location: "Cebu City",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Miguel Torres",
    course: "Weekend Course",
    profileImage:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
    journeyImage:
      "https://images.pexels.com/photos/5733150/pexels-photo-5733150.jpeg",
    rating: 5,
    text: "Perfect for busy professionals! Flexible schedule and got my license last week! 🎊",
    location: "Danao City",
    date: "3 days ago",
  },
];

// Duplicate the array for a seamless loop
const duplicatedPosts = [...GalleryPosts, ...GalleryPosts];

export default function Gallery() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 relative overflow-hidden "
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-center mb-16 space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-400/20 dark:text-yellow-300 font-medium tracking-wide">
          <GalleryThumbnails className="w-4 h-4" />
          <span className="text-sm">Gallery</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white">
          Hear from our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400">
            Students
          </span>
        </h2>
      </motion.div>

      <div
        className="w-full max-w-7xl mx-auto overflow-hidden
                   [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <motion.div
          className="flex w-max gap-6"
          animate={{
            translateX: "-50%",
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            animationPlayState: "paused",
          }}
        >
          {/* Render the duplicated list of testimonial cards */}
          {duplicatedPosts.map((post, idx) => (
            <TestimonialCard post={post} key={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
