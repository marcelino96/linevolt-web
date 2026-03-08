"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Instagram, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";
import { fadeUp, stagger, scaleIn, AnimatedSection, SectionLabel } from "./shared";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("Contact");
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

    const text = t("waFormText", { name, phone, venue, location, message });
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
            <SectionLabel>{t("label")}</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6">
              {t("heading")} <span className="text-gradient">{t("headingHighlight")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mb-10 leading-relaxed">
              {t("subheading")}
            </motion.p>
            <motion.div variants={stagger} className="space-y-5">
              {[
                { icon: Phone, label: "WhatsApp", value: "+62 817-771-343" },
                { icon: Mail, label: "Email", value: "hello@linevolt.id" },
                { icon: Instagram, label: "Instagram", value: "@linevolt.id" },
                { icon: MapPin, label: t("serviceAreaLabel"), value: t("serviceAreaValue") },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-xl bg-[#0d0d0d] border border-white/6 card-hover">
                    <div className="w-10 h-10 rounded-lg bg-orange-400/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-orange-400" />
                    </div>
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
              <h3 className="text-xl font-bold text-white mb-2">{t("formTitle")}</h3>
              <p className="text-gray-500 text-sm mb-6">{t("formSubtitle")}</p>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-orange-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{t("successTitle")}</h4>
                  <p className="text-gray-400 text-sm mb-1">{t("successMsg1")}</p>
                  <p className="text-gray-500 text-xs mb-6">{t("successMsg2")}</p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-400 transition-colors">
                    {t("chatWa")}
                  </a>
                </div>
              ) : (
                <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="form-name" value="contact" />
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">{t("nameLabel")}</label>
                    <input type="text" name="name" placeholder="John Doe" required className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">{t("phoneLabel")}</label>
                    <input type="tel" name="phone" placeholder="+62 812-3456-7890" required className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">{t("venueLabel")}</label>
                    <input type="text" name="venue" placeholder={t("venuePlaceholder")} className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">{t("locationLabel")}</label>
                    <input type="text" name="location" placeholder={t("locationPlaceholder")} className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">{t("descLabel")}</label>
                    <textarea name="message" rows={3} placeholder={t("descPlaceholder")} className="w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? t("submitting") : t("submit")}
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
