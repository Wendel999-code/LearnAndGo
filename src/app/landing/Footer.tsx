"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  CarIcon,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

function Footer() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 py-20 px-4 lg:px-8 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-12"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <CarIcon className="w-7 h-7 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-gradient">Learn&Go</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Professional driving school offering expert instructors, flexible
              courses, and official LTO accreditation. Your journey to driving
              confidence starts here.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center 
                    hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 
                    hover:text-black dark:hover:text-black transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-black dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/#courses", label: "Courses" },
                { href: "/#instructors", label: "Instructors" },
                { href: "/register", label: "Register" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 
                      transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-black dark:text-white mb-6">
              Our Services
            </h3>
            <ul className="space-y-4">
              {["Theoretical Driving Course", "Practical Driving Course"].map(
                (service, index) => (
                  <li
                    key={index}
                    className="text-gray-600 dark:text-gray-300 flex items-center"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mr-3 flex-shrink-0" />
                    {service}
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-black dark:text-white mb-6">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-black" />
                </div>
                <span>info@learnandgo.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-black" />
                </div>
                <span>+63 917 123 4567</span>
              </div>
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <span>
                  123 Main Street,
                  <br />
                  Northern Samar, Philippines
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 dark:from-yellow-400/5 dark:to-yellow-600/5 
            rounded-2xl border border-yellow-400/20 dark:border-yellow-400/10 backdrop-blur-sm"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
              Stay Updated with Learn&Go
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get the latest news, course updates, and driving tips delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 text-black dark:text-white 
                  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
                text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Learn&Go. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Cookie Policy
              </Link>

              <ModeToggle />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
