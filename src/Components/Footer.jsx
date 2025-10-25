import React from "react";
import { Github, Linkedin, Mail, Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Learn<span className="text-accent">Coding</span>
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              Empowering developers to build amazing things. Learn, practice,
              and master coding with our comprehensive courses.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-xs sm:btn-sm hover:bg-primary hover:text-primary-content transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-xs sm:btn-sm hover:bg-primary hover:text-primary-content transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-circle btn-xs sm:btn-sm hover:bg-primary hover:text-primary-content transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Resources
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href="#docs"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#tutorials"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Support
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href="#contact"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors duration-200 block py-1"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 bg-base-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="text-xs sm:text-sm text-base-content/70 text-center md:text-left order-2 md:order-1">
              © {new Date().getFullYear()} LearnCoding. All rights reserved.
            </div>

            <div className="flex flex-col space-y-2 sm:space-y-3 items-center order-1 md:order-2">
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-base-content/70">
                <span>Developed with</span>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-error fill-error animate-pulse" />
                <span>by</span>
                <span className="font-semibold text-primary whitespace-nowrap">
                  Tushar Chowdhury
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/tusharchowdhury20211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs btn-circle hover:bg-primary hover:text-primary-content transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://github.com/TusharChow20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs btn-circle hover:bg-primary hover:text-primary-content transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://github.com/TusharChow20/Learn-Coding-Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs hover:bg-primary hover:text-primary-content transition-all duration-200 gap-1"
                >
                  <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs hidden sm:inline">View Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
