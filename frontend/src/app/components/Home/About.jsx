"use client";

import React, { useEffect, useState } from "react";
import { FaUsers, FaLaptopCode, FaClock, FaCode, FaRocket, FaStar, FaHeart } from "react-icons/fa";

const AboutSection = () => {
  const [animatedIcons, setAnimatedIcons] = useState([]);

  useEffect(() => {
    // Extended list of coding icons (25+ icons)
    const icons = [
      '<>', '{}', '[]', '()', '/*', '//', '~~', '!!', '``', '==',
      '&&', '||', '++', '--', '=>', '==', '!=', '>=', '<=', '??',
      '...', '${}', '##', '%%', '^^', '::', ';;', '\\', '||', '<!--'
    ];

    const newIcons = icons.map((icon, index) => ({
      id: index,
      icon,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 14 + Math.random() * 20,
      opacity: 0.03 + Math.random() * 0.04
    }));
    setAnimatedIcons(newIcons);
  }, []);

  const stats = [
    {
      icon: <FaUsers className="text-2xl" />,
      number: "6+",
      label: "Team Members Led",
      description: "Successfully led agile developer teams"
    },
    {
      icon: <FaLaptopCode className="text-2xl" />,
      number: "30+",
      label: "Live Projects",
      description: "Real-time apps across multiple industries"
    },
    {
      icon: <FaClock className="text-2xl" />,
      number: "100%",
      label: "On-Time Delivery",
      description: "Always meet project deadlines"
    },
    {
      icon: <FaStar className="text-2xl" />,
      number: "3+",
      label: "Years Experience",
      description: "Frontend development & leadership"
    }
  ];

  const achievements = [
    "Direct client management & goal setting",
    "Clean, modern code practices",
    "Pixel-perfect UI/UX implementation",
    "Performance optimization expertise",
    "Agile methodology practitioner",
    "Cross-functional team collaboration"
  ];

  return (
    <section className="relative py-4 px-4  bg-[var(--bg)] text-[var(--text-color)] transition-colors duration-500 border-b border-[var(--border)] overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {animatedIcons.map((item) => (
          <div
            key={item.id}
            className="absolute text-white font-mono font-bold animate-float-fast"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              fontSize: `${item.size}px`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              opacity: item.opacity,
              filter: "blur(0.5px)"
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={`particle1-${i}`}
            className="absolute w-1 h-1 bg-[var(--accent)] rounded-full opacity-10 animate-pulse-fast"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}

        {[...Array(15)].map((_, i) => (
          <div
            key={`particle2-${i}`}
            className="absolute w-2 h-2 bg-[var(--accent)] rounded-full opacity-5 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        {[...Array(10)].map((_, i) => (
          <div
            key={`particle3-${i}`}
            className="absolute w-3 h-3 bg-[var(--accent)] rounded-full opacity-3 animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] bg-opacity-10 border border-[var(--accent)] border-opacity-20 mb-4">
            <FaCode className="text-white text-sm" />
            <span className="text-sm font-medium text-white">
              Passionate Developer & Leader
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--text-color)] to-[var(--accent)] bg-clip-text text-transparent">
            About Me
          </h2>
          <p>Technical Team Leader and Full-Stack Developer with 3+ years of experience building scalable web applications using
React.js and Node.js. Proven track record of leading cross-functional teams to deliver high-impact projects with 95% client
satisfaction. Expert in performance optimization (achieved 80% reduction in load times), state management, and modern
JavaScript frameworks. Passionate about mentoring developers and implementing best practices that drive measurable
business outcomes.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)] shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[var(--accent)] bg-opacity-10 rounded-lg">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.number}
                </div>
              </div>
              <h3 className="font-semibold">{stat.label}</h3>
              <p className="text-sm opacity-70">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-float-fast {
          animation: float-fast linear infinite;
        }

        .animate-pulse-fast {
          animation: pulse 1s infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
