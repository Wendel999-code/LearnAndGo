"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Award, MapPin } from "lucide-react";

function Gallery() {
  const testimonials = [
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
      likes: 124,
      location: "Cebu City",
      date: "2 weeks ago",
      liked: false,
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
      likes: 89,
      location: "Mandaue City",
      date: "1 month ago",
      liked: false,
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
      likes: 156,
      location: "Lapu-Lapu City",
      date: "3 weeks ago",
      liked: false,
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
      likes: 203,
      location: "Talisay City",
      date: "1 week ago",
      liked: false,
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
      likes: 178,
      location: "Cebu City",
      date: "2 months ago",
      liked: false,
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
      likes: 142,
      location: "Danao City",
      date: "3 days ago",
      liked: false,
    },
  ];

  const [posts, setPosts] = useState(testimonials);

  // Duplicate testimonials for infinite effect
  const duplicatedPosts = [...posts, ...posts, ...posts];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 relative overflow-hidden bg-zinc-50 dark:bg-black"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-yellow-400/10 border border-yellow-400/20"
          >
            <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
              Student Success Stories
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Our Students' Journey
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Real stories and photos from students who achieved their driving
            dreams with Learn&Go.
          </p>
        </motion.div>

        {/* Infinite Scrolling Feed */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -1 * (340 + 24) * posts.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPosts.map((post, index) => (
                <div
                  key={`${post.id}-${index}`}
                  className="flex-shrink-0 w-[340px] bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400/30 flex-shrink-0">
                        <img
                          src={post.profileImage}
                          alt={post.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
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
                        <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                          <span>{post.date}</span>
                          <span>•</span>
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="truncate">{post.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Text */}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-3 leading-relaxed line-clamp-3">
                      {post.text}
                    </p>
                  </div>

                  {/* Post Image */}
                  <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={post.journeyImage}
                      alt={`${post.name}'s driving journey`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
