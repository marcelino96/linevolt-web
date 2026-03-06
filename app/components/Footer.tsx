"use client";

import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-32">
            <Image src="/logo-alt.png" alt="Linevolt" fill className="object-contain object-left" />
          </div>
          <span className="text-gray-600 text-sm">· Lighting Installation Company</span>
        </div>
        <div className="text-gray-600 text-xs text-center">
          © {year} Linevolt. All rights reserved. Crafted with ⚡ for premium spaces.
        </div>
        <div className="flex items-center gap-4">
          <a href="#about" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">Tentang</a>
          <a href="#services" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">Layanan</a>
          <a href="#portfolio" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">Portofolio</a>
          <a href="/blog" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">Blog</a>
          <a href="#contact" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">Kontak</a>
        </div>
      </div>
    </footer>
  );
}
