"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Portofolio", href: "#portfolio" },
  { label: "Mengapa Kami", href: "#why-us" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-xl"
        : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center"
        >
          <div className="relative h-10 w-44">
            <Image
              src="/logo-alt.png"
              alt="Linevolt"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors animated-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.a
          href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20bertanya%20tentang%20proyek%20lighting"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-400 hover:shadow-[0_0_24px_rgba(249,115,22,0.5)] transition-all duration-300"
        >
          <Phone size={14} />
          Hubungi Kami
        </motion.a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0d0d0d]/98 backdrop-blur-xl px-6 pb-6 pt-4"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm text-gray-400 hover:text-orange-400 border-b border-white/5 last:border-0"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20bertanya%20tentang%20proyek%20lighting"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-4 flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-white font-bold rounded-full text-sm"
            >
              <Phone size={14} />
              Hubungi Kami
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
