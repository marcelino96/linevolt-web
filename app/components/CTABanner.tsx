"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { fadeUp, scaleIn, AnimatedSection } from "./shared";

export function CTABanner() {
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
