"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Award, MapPin } from "lucide-react";

const Gallery = () => {
  const testimonials = useMemo(
    () => [
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
    ],
    []
  );

  const duplicated = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 relative overflow-hidden bg-zinc-50 dark:bg-black"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_120%)]" />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14 px-4 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-yellow-400/10 border border-yellow-400/30">
          <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
            Student Success Stories
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-3">
          Our Students’ Journey
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Real stories and photos from students who achieved their driving
          dreams with Learn&Go.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll will-change-transform">
            {duplicated.map((post, index) => (
              <motion.div
                key={`${post.id}-${index}`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400/40 flex-shrink-0">
                      <img
                        src={post.profileImage}
                        alt={post.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                          {post.name}
                        </h4>
                        <div className="flex items-center gap-0.5">
                          {[...Array(post.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                        {post.course}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                        <span>{post.date}</span>
                        <span>•</span>
                        <MapPin className="w-2.5 h-2.5" />
                        <span className="truncate">{post.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-3 leading-relaxed line-clamp-3">
                    {post.text}
                  </p>
                </div>
                <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={post.journeyImage}
                    alt={`${post.name}'s driving journey`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 80s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 120s;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
