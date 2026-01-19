"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logos.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#hero" className="hover:text-[var(--accent)]">Home</Link>
          <Link href="#about" className="hover:text-[var(--accent)]">About</Link>
          <Link href="#project" className="hover:text-[var(--accent)]">Portfolio</Link>
          <Link href="#learning" className="hover:text-[var(--accent)]">Learning</Link>
          <Link href="#services" className="hover:text-[var(--accent)]">Services</Link>
          <Link href="#contact" className="hover:text-[var(--accent)]">Contact</Link>
          {/* <Link href="/admin" className="hover:text-[var(--accent)]">Admin</Link> */}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--accent)] text-white hover:scale-105 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg border border-[var(--border)]"
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] px-6 py-6 space-y-4">
          {[
            ["Home", "#hero"],
            ["About", "#about"],
            ["Portfolio", "#project"],
            ["Learning", "#learning"],
            ["Services", "#services"],
            ["Contact", "#contact"],
            // ["Admin", "/admin"],
          ].map(([label, link]) => (
            <Link
              key={label}
              href={link}
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-medium hover:text-[var(--accent)]"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
