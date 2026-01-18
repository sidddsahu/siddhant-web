"use client";

import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaCode,
  FaPalette,
  FaUsers,
  FaRocket,
  FaDownload,
} from "react-icons/fa";

const HeroBanner = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const lines = [
    "Crafting Digital Experiences",
    "Frontend Architect & Team Lead",
  ];

  useEffect(() => {
    const currentLineText = lines[currentLine];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing effect
        if (currentIndex < currentLineText.length) {
          setDisplayedText(
            currentLineText.substring(0, currentIndex + 1)
          );
          setCurrentIndex(currentIndex + 1);
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting effect
        if (currentIndex > 0) {
          setDisplayedText(
            currentLineText.substring(0, currentIndex - 1)
          );
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentLine((prev) => (prev + 1) % lines.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentLine, lines]);

  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "30+", label: "Projects Completed" },
    { number: "6+", label: "Team Members Led" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  const skills = {
    "Core Technologies": [
      "React.js",
      "TypeScript",
      "Next.js",
      "JavaScript ES6+",
    ],
    "Styling & UI": [
      "Tailwind CSS",
      "Styled Components",
      "Material-UI",
      "Framer Motion",
    ],
    "State Management": [
      "Redux Toolkit",
      "Context API",
      "Zustand",
      "React Query",
    ],
    "Tools & Practices": [
      "Git & GitHub",
      "Agile Methodology",
      "CI/CD",
      "Performance Optimization",
    ],
  };

  return (
    <section className="relative py-10 px-4 bg-[var(--bg)] text-[var(--text-color)] transition-all duration-500 border-b border-[var(--border)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--accent)] opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[var(--accent)] opacity-5 rounded-full blur-2xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--accent)] bg-opacity-10 border border-[var(--accent)] border-opacity-20 mb-6">
            <FaRocket className="text-[var(--accent)]" />
            <span className="text-sm font-medium text-white">
              Available for new opportunities
            </span>
          </div>

          {/* Animated Typing Text */}
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-[var(--text-color)] to-[var(--accent)] bg-clip-text text-transparent">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[var(--text-color)] opacity-80 leading-relaxed">
            Specializing in{" "}
            <span className="text-[var(--accent)] font-semibold">
              React Ecosystem
            </span>
            , building scalable applications with{" "}
            <span className="text-[var(--accent)] font-semibold">
              clean code
            </span>{" "}
            and{" "}
            <span className="text-[var(--accent)] font-semibold">
              exceptional UX
            </span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[var(--accent)] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm opacity-70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#contact"
              className="px-8 py-4 bg-[var(--accent)] text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Let's Build Together
              <FaCode className="text-sm" />
            </a>

            <a
              href="/resume.pdf"
              download
              className="px-8 py-4 border-2 border-[var(--accent)] text-[var(--accent)] rounded-lg font-semibold hover:bg-[var(--accent)] hover:bg-opacity-10 transition-all duration-300 flex items-center gap-2"
            >
              Download Resume
              <FaDownload className="text-sm" />
            </a>
          </div>
        </div>

        {/* Skills Showcase */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Technical Skills */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-8 shadow-xl border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[var(--accent)] bg-opacity-10 rounded-lg">
                <FaCode className="text-[var(--accent)] text-xl" />
              </div>
              <h3 className="text-2xl font-bold">
                Technical Excellence
              </h3>
            </div>

            <div className="grid gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold text-[var(--accent)] mb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--bg)] rounded-full text-sm border border-[var(--border)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Approach */}
          <div className="space-y-3">
            <div className="bg-[var(--card-bg)] rounded-2xl p-8 shadow-xl border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-0">
                <div className="p-2 bg-[var(--accent)] bg-opacity-10 rounded-lg">
                  <FaUsers className="text-[var(--accent)] text-xl" />
                </div>
                <h3 className="text-2xl font-bold">
                  Leadership Philosophy
                </h3>
              </div>

              <p className="opacity-80 leading-relaxed">
                I believe in{" "}
                <strong className="text-[var(--accent)]">
                  empowering teams
                </strong>{" "}
                through clear communication,
                <strong className="text-[var(--accent)]">
                  {" "}
                  mentorship
                </strong>
                , and{" "}
                <strong className="text-[var(--accent)]">
                  agile practices
                </strong>
                .
              </p>
            </div>

            <div className="bg-[var(--card-bg)] rounded-2xl p-8 shadow-xl border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[var(--accent)] bg-opacity-10 rounded-lg">
                  <FaPalette className="text-[var(--accent)] text-xl" />
                </div>
                <h3 className="text-2xl font-bold">
                  Design Approach
                </h3>
              </div>

              <p className="opacity-80 leading-relaxed">
                <strong className="text-[var(--accent)]">
                  User-centered design
                </strong>{" "}
                meets{" "}
                <strong className="text-[var(--accent)]">
                  technical precision
                </strong>
                .
              </p>
            </div>


            <div className="bg-[var(--card-bg)] rounded-2xl p-8 shadow-xl border border-[var(--border)]">
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 bg-[var(--accent)] bg-opacity-10 rounded-lg">
      <FaCode className="text-[var(--accent)] text-xl" />
    </div>
    <h3 className="text-2xl font-bold">
      Engineering Excellence
    </h3>
  </div>

  <p className="opacity-80 leading-relaxed">
    <strong className="text-[var(--accent)]">
      Clean component architecture
    </strong>{" "}
    powered by{" "}
    <strong className="text-[var(--accent)]">
      scalable frontend patterns
    </strong>
    .
  </p>
          </div>

          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h4 className="text-lg font-semibold opacity-70 mb-6">
            Let's connect and build something amazing
          </h4>

          <div className="flex justify-center gap-6">
            {[
              {
                href: "https://github.com/sidddsahu",
                icon: <FaGithub />,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/siddhant-sahu-94921a245/",
                icon: <FaLinkedin />,
                label: "LinkedIn",
              },
              {
                href: "https://instagram.com/yourusername",
                icon: <FaInstagram />,
                label: "Instagram",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-2xl opacity-70 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-300"
              >
                <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  {social.icon}
                </div>
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
