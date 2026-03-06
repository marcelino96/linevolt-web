"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Settings,
  Lightbulb,
  Wrench,
  Monitor,
  Star,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Menu,
  X,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Tv2,
  Award,
  ExternalLink,
  Zap,
} from "lucide-react";
import portfolioData from "../content/portfolio.json";

/* ─── CONFIG ────────────────────────────────────────────────────────────────
   To replace the background video, simply change the path below.
   Place your new video in /public/videos/ and update the filename.
── ────────────────────────────────────────────────────────────────────────── */
const BG_VIDEO_SRC = "/videos/bg-video.mp4";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: Zap,
    title: "Custom Addressable LED Strip",
    desc: "Instalasi LED strip addressable yang dirancang khusus sesuai konsep visual, kebutuhan ruang, dan tujuan penggunaan.",
  },
  {
    icon: Tv2,
    title: "Videotron Installation",
    desc: "Instalasi layar videotron (LED display) untuk stage, gedung, mall, dan outdoor — dari perencanaan, pemasangan, hingga commissioning.",
  },
  {
    icon: Settings,
    title: "Custom Programming",
    desc: "Pemrograman sistem pencahayaan untuk menciptakan efek visual, pengaturan scene, otomasi, dan sinkronisasi sistem.",
  },
  {
    icon: Lightbulb,
    title: "Custom LED Fixtures",
    desc: "Pengembangan fixture LED kustom dengan desain dan spesifikasi yang dapat disesuaikan dengan kebutuhan proyek.",
  },
  {
    icon: Star,
    title: "Stage Lighting Installation",
    desc: "Instalasi sistem pencahayaan panggung yang lengkap, dari perencanaan hingga pengujian sistem.",
  },
  {
    icon: Wrench,
    title: "Maintenance LED Strip",
    desc: "Layanan pemeliharaan dan perbaikan untuk menjaga performa dan kualitas visual instalasi LED strip.",
  },
  {
    icon: Monitor,
    title: "Maintenance Stage Lighting",
    desc: "Pemeliharaan dan servis sistem stage lighting agar selalu siap untuk penggunaan optimal.",
  },
];

// Portfolio data loaded from content/portfolio.json — edit that file to update portfolio
const PORTFOLIO = portfolioData;

const WHY_US = [
  {
    icon: Users,
    title: "Tim Profesional & Berpengalaman",
    desc: "Kami memiliki tim yang profesional dan berpengalaman di bidangnya masing-masing.",
  },
  {
    icon: Shield,
    title: "Produk Berkualitas Tinggi",
    desc: "Produk berkualitas tinggi dengan quality control yang ketat dan standar internasional.",
  },
  {
    icon: Clock,
    title: "Cepat, Responsif & Solutif",
    desc: "Layanan yang cepat, responsif terhadap setiap pertanyaan, dan selalu memberikan solusi terbaik.",
  },
  {
    icon: TrendingUp,
    title: "Adaptif Terhadap Tren",
    desc: "Kami selalu mengikuti tren terbaru dan kebutuhan pasar yang terus berkembang.",
  },
  {
    icon: CheckCircle2,
    title: "Budaya Kerja Transparan",
    desc: "Budaya kerja yang transparan dan terukur—Anda tahu setiap langkah progress proyek Anda.",
  },
];

const NAV_LINKS = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Portofolio", href: "#portfolio" },
  { label: "Mengapa Kami", href: "#why-us" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "#contact" },
];

/* ─── Animation Variants ────────────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" as const } },
};

/* ─── Sub-components ────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-4"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 glow-orange inline-block" />
      {children}
    </motion.span>
  );
}

function AnimatedSection({
  children,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ─── Navbar ────────────────────────────────────────────────────────────── */

function Navbar() {
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

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Background orbs */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="orb-orange absolute -top-40 -left-40 opacity-60" />
        <div className="orb-orange absolute -bottom-40 -right-40 opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249,115,22,0.07) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          Lighting Installation Company · Est. 2025
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
        >
          <span className="text-white">Illuminate</span>
          <br />
          <span className="text-gradient glow-orange-text relative inline-block">
            Your Space
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute inset-x-0 -bottom-2 h-1 bg-orange-400 origin-left rounded-full"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Spesialis{" "}
          <span className="text-orange-400 font-semibold">Addressable LED Strip</span> dan Custom
          Lighting. Dari desain, instalasi, programming, hingga maintenance — kami hadirkan
          pengalaman visual yang tidak terlupakan.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20konsultasi%20proyek%20lighting%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-orange-500 text-white font-bold text-base rounded-full hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300"
          >
            Konsultasi Gratis
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#portfolio"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white font-semibold text-base hover:border-orange-400/40 hover:text-orange-400 transition-all duration-300"
          >
            Lihat Portofolio
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 grid grid-cols-3 gap-px max-w-xl mx-auto rounded-2xl overflow-hidden border border-white/8"
        >
          {[
            { label: "Proyek Selesai", value: "20+" },
            { label: "Kota di Indonesia", value: "5+" },
            { label: "Kepuasan Klien", value: "100%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#0d0d0d] py-5 px-4 text-center first:rounded-l-2xl last:rounded-r-2xl"
            >
              <div className="text-2xl font-black text-gradient">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-orange-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="divider-gradient mb-20 mx-8" />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionLabel>Tentang Kami</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
            >
              Lebih Dari Sekedar{" "}
              <span className="text-gradient">Instalasi Lampu</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-6 text-base">
              <span className="text-orange-400 font-semibold">LINEVOLT</span> berspesialisasi dalam{" "}
              <em>Addressable LED Strips</em> dan Lighting, berfokus pada pengiriman produk dan
              layanan berkualitas tinggi yang memenuhi kebutuhan pasar modern.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-8 text-base">
              Kami percaya bahwa LED strip dan pencahayaan bukan hanya tentang estetika, tapi juga
              tentang karakteristik—bagaimana cahaya bekerja secara teknis, berinteraksi dengan
              ruang, mendukung fungsi, dan menciptakan pengalaman visual yang konsisten dan
              terkontrol.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#services"
              className="group inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all"
            >
              Lihat Layanan Kami
              <ArrowUpRight size={16} className="group-hover:animate-bounce" />
            </motion.a>
          </div>

          {/* Right - Visual cards */}
          <motion.div variants={scaleIn} className="grid grid-cols-2 gap-4">
            {[
              { title: "Visi", text: "Menjadi brand terkemuka yang inovatif, adaptif, dan terpercaya di industri LED dan Lighting, baik nasional maupun internasional.", icon: "🔭" },
              { title: "Misi", text: "Menghadirkan produk dan layanan berkualitas tinggi dengan standar tertinggi dan membangun kepercayaan melalui layanan profesional.", icon: "🎯" },
              { title: "Komitmen", text: "Membangun hubungan jangka panjang dengan pelanggan melalui kualitas, kepercayaan, dan konsistensi layanan.", icon: "🤝" },
              { title: "Pendekatan", text: "Solusi kustom untuk setiap proyek—dari perencanaan, instalasi, programming, hingga maintenance.", icon: "⚡" },
            ].map((card, i) => (
              <div
                key={i}
                className="card-hover bg-[#0d0d0d] border border-white/6 rounded-2xl p-5 cursor-default"
                style={{
                  boxShadow: i === 0 ? "0 0 30px rgba(249,115,22,0.08)" : "none",
                }}
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{card.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{card.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────────────────────── */

function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(249,115,22,0.05) 0%, transparent 70%)",
          }}
        />
      </div>
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Layanan Kami</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Solusi Lighting{" "}
            <span className="text-gradient">All-In-One</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-xl mx-auto">
            Dari perencanaan hingga maintenance, kami menangani setiap aspek
            proyek pencahayaan Anda.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                className="card-hover group relative bg-[#0d0d0d] border border-white/6 rounded-2xl p-7 overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: "inset 0 0 30px rgba(249,115,22,0.07)" }} />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center mb-5 group-hover:bg-orange-400/15 transition-colors">
                  <Icon size={22} className="text-orange-400" />
                </div>
                <h3 className="font-bold text-base text-white mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={16} className="text-orange-400" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

/* ─── PortfolioCard (with auto-slideshow) ───────────────────────────────── */

type PortfolioProject = {
  id?: string; name: string; location: string; year: string;
  tag: string; category?: string; image?: string; images?: string[]; gradient: string; color: string;
};

function PortfolioCard({ project, i }: { project: PortfolioProject; i: number }) {
  const images: string[] = project.images?.length
    ? project.images
    : project.image ? [project.image] : [];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setActiveIdx(p => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <motion.div
      variants={scaleIn}
      className={`group relative overflow-hidden rounded-3xl border border-white/8 cursor-pointer card-hover ${i === 0 ? "md:col-span-2" : ""}`}
      style={{ minHeight: i === 0 ? "400px" : "280px" }}
    >
      {images.length > 0 ? (
        <div className="absolute inset-0">
          {images.map((src, idx) => (
            <div key={idx} className="absolute inset-0 transition-opacity duration-1000 group-hover:scale-105 transition-transform duration-700" style={{ opacity: idx === activeIdx ? 1 : 0 }}>
              <Image src={src} alt={`${project.name} ${idx + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          ))}
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`} />
      )}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: `radial-gradient(circle, ${project.color}40 0%, transparent 70%)` }} />
      <div className="absolute inset-0 portfolio-overlay" />
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border"
            style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}15` }}>
            {project.tag}
          </span>
          {images.length > 1 && (
            <div className="flex gap-1.5 mt-1">
              {images.map((_, idx) => (
                <button key={idx} onClick={e => { e.stopPropagation(); setActiveIdx(idx); }}
                  className="w-2 h-2 rounded-full transition-all duration-300 border-0"
                  style={{ background: idx === activeIdx ? project.color : "rgba(255,255,255,0.35)", transform: idx === activeIdx ? "scale(1.3)" : "scale(1)" }} />
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{project.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-orange-400" />{project.location}</span>
                <span className="text-gray-600">·</span>
                <span>{project.year}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-orange-400/50">
              <ArrowUpRight size={16} className="text-orange-400" />
            </div>
          </div>
        </div>
      </div>
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
    </motion.div>
  );
}

/* ─── Portfolio ─────────────────────────────────────────────────────────── */

const PORTFOLIO_TABS = [
  { key: "all", label: "Semua" },
  { key: "installation", label: "Instalasi" },
  { key: "event", label: "Event" },
];

function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const allProjects = PORTFOLIO as PortfolioProject[];
  const filtered = activeTab === "all" ? allProjects : allProjects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="divider-gradient mb-20 mx-8" />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>Portofolio</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Proyek{" "}
            <span className="text-gradient">Premium</span> Kami
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-lg mx-auto">
            Setiap proyek adalah kanvas baru. Kami menghadirkan solusi pencahayaan yang
            bukan sekedar indah — tapi juga berbicara tentang karakter space tersebut.
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-10">
          {PORTFOLIO_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  : "border border-white/15 text-gray-400 hover:border-orange-400/40 hover:text-orange-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <PortfolioCard key={project.id || i} project={project} i={i} />
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

/* ─── Video Showcase ─────────────────────────────────────────────────────── */
/* 
   To replace the video: update BG_VIDEO_SRC constant at the top of this file.
   Place the new video file in /public/videos/ folder.
*/

function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-0 overflow-hidden" style={{ minHeight: "80vh" }}>
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          src={BG_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Light overlay — video tetap terlihat jelas */}
        <div className="absolute inset-0" style={{ background: "rgba(5,5,5,0.38)" }} />
        {/* Top & bottom fade into page bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.65) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.65) 100%)",
          }}
        />
      </div>

      {/* Content — text langsung di atas video, tanpa card */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/50 bg-black/30 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
          Lihat Instalasi Kami
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)" }}
        >
          Cahaya yang{" "}
          <span style={{ color: "#F5A623" }}>Berbicara</span>
          <br />
          Tanpa Kata
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/90 text-lg max-w-xl mx-auto mb-10"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Setiap instalasi adalah perpaduan antara teknik, seni, dan teknologi lighting terkini.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="#contact"
          className="group flex items-center gap-3 px-8 py-4 bg-orange-500/90 backdrop-blur-sm text-white font-bold text-base rounded-full hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300"
        >
          Mulai Proyek Anda
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}

/* ─── Why Us ─────────────────────────────────────────────────────────────── */

function WhyUs() {
  return (
    <section id="why-us" className="relative pt-32 pb-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)",
        }}
      />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Mengapa Kami</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Standar Kami,{" "}
            <span className="text-gradient">Jaminan Anda</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-lg mx-auto">
            5 alasan kuat mengapa lebih dari 20 proyek premium mempercayakan
            pencahayaan mereka kepada Linevolt.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                className={`card-hover relative group bg-[#0d0d0d] rounded-2xl p-8 border border-white/6 overflow-hidden ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
              >
                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-black text-white/3 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-orange-400/5 border border-orange-400/15 group-hover:bg-orange-400/12 group-hover:border-orange-400/30 transition-all duration-300">
                    <Icon size={26} className="text-orange-400" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

/* ─── CTA Banner ─────────────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="pb-24 px-6">
      <AnimatedSection>
        <motion.div
          variants={scaleIn}
          className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-orange-400/20 p-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(5,5,5,0.8) 50%, rgba(249,115,22,0.05) 100%)",
            boxShadow: "0 0 80px rgba(249,115,22,0.12), inset 0 0 80px rgba(249,115,22,0.04)",
          }}
        >
          {/* Decorative grid */}
          <div className="absolute inset-0 grid-pattern opacity-40" />

          <div className="relative z-10">
            <motion.span variants={fadeUp} className="inline-block text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Siap Untuk Mulai?
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-6">
              Wujudkan Ide Lighting <br />
              <span className="text-gradient">Impian Anda Bersama Kami</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto mb-10">
              Konsultasi gratis tanpa syarat. Tim kami siap membantu Anda
              merancang solusi pencahayaan yang sempurna untuk space Anda.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20konsultasi%20gratis%20untuk%20proyek%20lighting%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-orange-500 text-white font-bold text-base rounded-full hover:bg-orange-400 hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.947 7.947 0 01-3.796-.965l-4.204 1.1 1.126-4.11a7.929 7.929 0 01-1.062-3.961C4.093 6.855 7.626 3.12 12.029 3.12c2.127 0 4.124.83 5.626 2.338a7.902 7.902 0 012.323 5.612c0 4.374-3.534 7.81-7.949 7.81z" />
              </svg>
              Chat di WhatsApp Sekarang
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────────────── */

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [waUrl, setWaUrl] = useState("https://wa.me/62817771343");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const phone = (data.get("phone") as string) || "";
    const venue = (data.get("venue") as string) || "-";
    const location = (data.get("location") as string) || "-";
    const message = (data.get("message") as string) || "-";

    try {
      await fetch("/netlify-form.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as unknown as Record<string, string>).toString() });
    } catch {
      // ignore
    }

    const text = `Halo Linevolt! Saya baru isi form di website.\n\nNama: ${name}\nTelepon: ${phone}\nVenue/Proyek: ${venue}\nLokasi: ${location}\nKebutuhan: ${message}`;
    setWaUrl(`https://wa.me/62817771343?text=${encodeURIComponent(text)}`);
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="divider-gradient mb-20 max-w-7xl mx-auto" />
      <AnimatedSection className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>Kontak</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6">
              Mari <span className="text-gradient">Terhubung</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mb-10 leading-relaxed">
              Siap untuk memulai proyek lighting Anda? Hubungi kami melalui WhatsApp untuk konsultasi cepat dan responsif.
            </motion.p>
            <motion.div variants={stagger} className="space-y-5">
              {[
                { icon: Phone, label: "WhatsApp", value: "+62 817-771-343" },
                { icon: Mail, label: "Email", value: "hello@linevolt.id" },
                { icon: Instagram, label: "Instagram", value: "@linevolt.id" },
                { icon: MapPin, label: "Area Layanan", value: "Jakarta, Batam, Malang & Seluruh Indonesia" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-xl bg-[#0d0d0d] border border-white/6 card-hover">
                    <div className="w-10 h-10 rounded-lg bg-orange-400/10 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-orange-400" /></div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                      <div className="text-sm text-white font-medium">{item.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <motion.div variants={scaleIn}>
            <div className="bg-[#0d0d0d] border border-white/6 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-2">Minta Penawaran Spesial</h3>
              <p className="text-gray-500 text-sm mb-6">Ceritakan proyek Anda, kami siapkan solusinya dalam 24 jam.</p>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-orange-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Pesan Terkirim!</h4>
                  <p className="text-gray-400 text-sm mb-1">Tim kami akan menghubungi Anda dalam 24 jam.</p>
                  <p className="text-gray-500 text-xs mb-6">Atau lanjutkan langsung via WhatsApp di bawah ini.</p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-400 transition-colors">Chat WhatsApp Sekarang</a>
                </div>
              ) : (
                <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="form-name" value="contact" />
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Nama Anda</label>
                    <input type="text" name="name" placeholder="John Doe" required className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Nomor Telepon / WhatsApp</label>
                    <input type="tel" name="phone" placeholder="+62 812-3456-7890" required className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Nama Venue / Proyek</label>
                    <input type="text" name="venue" placeholder="Bar, Restoran, Hotel..." className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Lokasi</label>
                    <input type="text" name="location" placeholder="Jakarta, Batam, dll." className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Deskripsi Singkat</label>
                    <textarea name="message" rows={3} placeholder="Ceritakan kebutuhan lighting proyek Anda..." className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? "Mengirim..." : "Kirim Pesan"}
                    {!submitting && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}


/* ─── Blog Preview ───────────────────────────────────────────────────────── */

type BlogPost = { slug: string; title: string; excerpt: string; tags: string[]; readTime: string; };

function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("/api/admin/blog").then(r => r.json()).then(d => setPosts(Array.isArray(d) ? d.slice(0, 3) : [])).catch(() => { });
  }, []);

  if (posts.length === 0) return null;

  return (
    <section ref={ref} id="blog-preview" className="relative pt-20 pb-12 overflow-hidden">
      <div className="divider-gradient mb-20 mx-8" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" /> Blog & Edukasi
            </span>
            <h2 className="text-4xl md:text-5xl font-black">Tips & Insight <span className="text-gradient">Lighting</span></h2>
          </div>
          <a href="/blog" className="hidden md:flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all text-sm">Lihat Semua <ArrowUpRight size={16} /></a>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a key={post.slug} href={`/blog/${post.slug}`} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="group block">
              <article className="h-full rounded-2xl border border-white/8 bg-[#0d0d0d] p-6 hover:border-orange-400/30 transition-all duration-300 card-hover">
                <div className="flex gap-2 mb-4">
                  {post.tags.slice(0, 1).map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">{tag}</span>
                  ))}
                </div>
                <h3 className="font-black text-base text-white mb-3 leading-snug group-hover:text-orange-300 transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="text-xs text-orange-400 font-semibold">{post.readTime} baca →</div>
              </article>
            </motion.a>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <a href="/blog" className="inline-flex items-center gap-2 text-orange-400 font-semibold text-sm">Lihat Semua Artikel <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
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

/* ─── WhatsApp Float Button ──────────────────────────────────────────────── */

function WAButton() {
  return (
    <motion.a
      href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20bertanya%20tentang%20proyek%20lighting"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="wa-btn fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.4)]"
      aria-label="Chat via WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.947 7.947 0 01-3.796-.965l-4.204 1.1 1.126-4.11a7.929 7.929 0 01-1.062-3.961C4.093 6.855 7.626 3.12 12.029 3.12c2.127 0 4.124.83 5.626 2.338a7.902 7.902 0 012.323 5.612c0 4.374-3.534 7.81-7.949 7.81z" />
      </svg>
    </motion.a>
  );
}

/* ─── Language Switcher ──────────────────────────────────────────────────── */

function LangSwitcher() {
  return (
    <motion.a
      href="/en"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed top-20 right-6 z-40 flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d0d]/80 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-400 hover:text-orange-400 hover:border-orange-400/30 transition-all"
      title="Switch to English"
    >
      🌐 EN
    </motion.a>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */


function AdvatekSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const products = [
    { model: "PixLite® A4-S Mk3", slug: "a4s-mk3", desc: "Hingga 24 universe, desain ramping, proteksi fault elektrikal. Ideal untuk instalasi komersial profesional.", href: "https://www.advateklighting.com/products/a4-s-mk3" },
    { model: "PixLite® E16-S Mk3", slug: "e16s-mk3", desc: "Controller 16-output paling cost-efficient. Mendukung hingga 96 universe — sempurna untuk proyek skala besar.", href: "https://www.advateklighting.com/products/e16-s-mk3" },
    { model: "PixLite® T8-S Mk3", slug: "t8s-mk3", desc: "Transmisi data jarak jauh 300m. Solusi tinggi-dampak untuk instalasi terdistribusi dan outdoor.", href: "https://www.advateklighting.com/products/t8-s-mk3" },
  ];

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Subtle BG glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
      <div className="divider-gradient mb-20 mx-8" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/40 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <Award size={12} />
            Official Dealer · Australia
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Ditenagai <span className="text-gradient">Teknologi Terbaik</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Linevolt adalah <strong className="text-white">Authorized Dealer resmi Advatek Lighting</strong> di Indonesia.
            Setiap instalasi LED pixel kami menggunakan controller <strong className="text-orange-400">PixLite® Mk3</strong> — standar global untuk instalasi pencahayaan profesional yang tidak kompromi soal keandalan.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-orange-400/15 mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(5,5,5,0.95) 40%, rgba(5,5,5,0.98) 100%)",
          }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
          {/* Top orange glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-orange-400/30 bg-orange-400/10">
                  <Award size={26} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-orange-400 font-semibold tracking-widest uppercase mb-0.5">Authorized Dealer</div>
                  <div className="text-2xl font-black text-white">Advatek PixLite® Mk3</div>
                  <div className="text-gray-400 text-sm">Professional Pixel Control · Made in Australia</div>
                </div>
              </div>
              <a
                href="https://www.advateklighting.com/products/collections/professional-pixel-control"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-400/40 text-orange-400 text-sm font-semibold hover:bg-orange-400/10 transition-all duration-300 shrink-0"
              >
                Lihat Produk <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Product cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="rounded-2xl overflow-hidden border border-white/6 bg-white/3 hover:border-orange-400/25 hover:bg-orange-400/5 transition-all duration-300"
                >
                  <div className="relative w-full h-52 bg-[#0a0a0a] flex items-center justify-center border-b border-white/6">
                    <div className="relative w-full h-full">
                      <Image src={`/images/advatek/${p.slug}.webp`} alt={p.model} fill className="object-contain p-2" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-orange-400 font-bold text-sm mb-2">{p.model}</div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.desc}</p>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-orange-400/70 hover:text-orange-400 transition-colors">
                      Lihat Detail <ExternalLink size={10} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Badge row */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Fault Protection", "Long Range 300m", "96 Universes Max", "DMX Compatible", "Global Benchmark", "Australian Quality"].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-gray-400 text-xs">
                  <CheckCircle2 size={11} className="text-orange-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 text-sm"
        >
          Sebagai dealer resmi, kami menjamin keaslian produk, garansi penuh, dan dukungan teknis langsung.
        </motion.p>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <Navbar />
      <LangSwitcher />
      <Hero />
      <VideoShowcase />
      <About />
      <Services />
      <AdvatekSection />
      <Portfolio />
      <WhyUs />
      <BlogPreview />
      <CTABanner />
      <Contact />
      <Footer />
      <WAButton />
    </main>
  );
}
