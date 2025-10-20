"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion, Variants } from "framer-motion";
import { Award, Star, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const instructors = [
  {
    id: 1,
    name: "John Doe",
    specialty: "Basic Driving Course",
    bio: "10+ years of experience helping students drive safely and confidently.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    experience: "12 years",
    certifications: ["LTO Certified"],
  },
  {
    id: 2,
    name: "Sarah Smith",
    specialty: "Practical Driving Course",
    bio: "Expert in advanced road training and highway safety. Passionate about teaching drivers.",
    image:
      "https://www.yourtango.com/sites/default/files/image_blog/2024-09/traits-truly-good-woman.png",
    experience: "8 years",
    certifications: ["LTO Certified"],
  },
  {
    id: 3,
    name: "Carlos Rivera",
    specialty: "Refresher Driving Course",
    bio: "Passionate about teaching drivers with patience and clarity.",
    image: "https://images.pexels.com/photos/1073097/pexels-photo-1073097.jpeg",
    experience: "15 years",
    certifications: ["LTO Certified"],
  },
];

// Animation presets
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function InstructorsSection() {
  return (
    <section
      id="instructors"
      className="relative min-h-screen overflow-hidden "
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="container mx-auto px-6 py-20 lg:py-28 relative z-10">
        {/* Header */}
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
            <Award className="w-4 h-4" />
            <span className="text-sm">Our Team</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white">
            Meet Our Expert{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400">
              Instructors
            </span>
          </h2>

          <p className="text-sm md:text-lg text-neutral-700 dark:text-gray-400 max-w-2xl mx-auto">
            Learn from certified professionals dedicated to making you a
            confident and safe driver.
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <Swiper
            spaceBetween={16}
            slidesPerView={1.1}
            centeredSlides
            grabCursor
          >
            {instructors.map((instructor, idx) => (
              <SwiperSlide key={instructor.id}>
                <InstructorCard instructor={instructor} index={idx} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {instructors.map((instructor, idx) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstructorCard({
  instructor,
  index,
}: {
  instructor: any;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group h-full"
    >
      <div className="relative h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden transition-all duration-300">
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image */}
        <div className="relative p-8 pb-6">
          <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-2 ring-yellow-400/30 dark:ring-yellow-500/30">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Expert Tag */}
          <div className="absolute top-6 right-6">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              Expert
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8 pt-0 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-yellow-500 transition-colors">
              {instructor.name}
            </h3>
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold px-4 py-1 text-xs shadow-md">
              {instructor.specialty}
            </Badge>
          </div>

          <p className="text-sm text-neutral-700 dark:text-gray-400 text-center leading-relaxed min-h-[60px]">
            {instructor.bio}
          </p>

          {/* <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-zinc-800/50 dark:to-zinc-800/30 rounded-xl border border-yellow-200/50 dark:border-zinc-700/50"
          >
            <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-bold text-neutral-900 dark:text-white">
              {instructor.experience}
            </span>
            <span className="text-sm text-neutral-700 dark:text-gray-400">
              experience
            </span>
          </motion.div> */}

          <div className="space-y-3">
            <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              Certifications
            </div>
            <div className="space-y-2">
              {instructor.certifications.map((cert: string, idx: number) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <CheckCircle className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-neutral-700 dark:text-gray-400 transition-colors group-hover:text-neutral-900 dark:group-hover:text-white">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
