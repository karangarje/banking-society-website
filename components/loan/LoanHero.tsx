"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/theme/LanguageContext";
import { ArrowRightOutlined } from "@ant-design/icons";

interface LoanHeroProps {
  onCtaClick: () => void;
}

export default function LoanHero({ onCtaClick }: LoanHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-gradient-to-r from-[#B3003C] to-[#1E1B6B] overflow-hidden text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-[#D4AF37] text-xs font-black uppercase tracking-widest rounded border border-white/10 shadow-sm">
            {t("loanCalculator.badge") || "Financial Planners"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-4xl md:text-5xl font-extrabold"
        >
          {t("loanCalculator.title") || "Loan EMI Calculator"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t("loanCalculator.subtitle") ||
            "Calculate loan repayments and generate detailed schedules instantly."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c5a02e] text-[#1E1B6B] hover:text-[#1e1b6b] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <span>{t("loanCalculator.calculate_now") || "Calculate Now"}</span>
            <ArrowRightOutlined />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
