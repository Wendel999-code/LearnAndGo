import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer
      id="footer"
      className=" text-gray-300 dark:text-gray-600 py-12 px-6"
    >
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">
            LearnAndGo
          </h2>
          <p className="text-gray-500">
            Professional driving school offering expert instructors, flexible
            courses, and official LTO accreditation.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-500 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2  text-gray-300 dark:text-gray-600">
            <li>
              <Link
                href="/about"
                className=" text-gray-500 hover:text-yellow-500 transition-colors transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className=" text-gray-500 hover:text-yellow-500 transition-colors transition-colors"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className=" text-gray-500 hover:text-yellow-500 transition-colors transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className=" text-gray-500 hover:text-yellow-500 transition-colors transition-colors"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-500 mb-4">
            Connect With Us
          </h3>
          <p className="flex items-center  text-gray-500 gap-2 mb-4">
            <Mail className="w-4 h-4" /> info@learnandgo.com
          </p>
          <div className="flex gap-4 ">
            <a href="#" className="hover:text-yellow-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-yellow-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} LearnAndGo. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
