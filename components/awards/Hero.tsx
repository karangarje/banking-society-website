"use client";

import React from "react";
import { TrophyOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface HeroProps {
  onScrollToAchievements: () => void;
}

export default function Hero({ onScrollToAchievements }: HeroProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-[#B3003C] to-[#1E1B6B] overflow-hidden text-white flex flex-col justify-center items-center text-center px-4 sm:px-6">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Decorative Gold Circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#B3003C]/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
        {/* Animated Trophy Container */}
        <div 
          data-aos="zoom-in"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl relative group hover:scale-110 hover:border-[#D4AF37]/50 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <TrophyOutlined className="text-4xl sm:text-5xl text-[#D4AF37] animate-pulse" />
        </div>

        {/* Title */}
        <h1 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="text-4xl sm:text-6xl font-black tracking-tight"
        >
          Awards & Achievements
        </h1>

        {/* Subtitle */}
        <p 
          data-aos="fade-up" 
          data-aos-delay="200"
          className="text-base sm:text-xl font-medium text-white/80 max-w-2xl leading-relaxed"
        >
          Recognizing excellence, leadership, trust, and contribution to the co-operative sector.
        </p>

        {/* Scroll Button */}
        <div data-aos="fade-up" data-aos-delay="300" className="pt-6">
          <button
            onClick={onScrollToAchievements}
            className="group flex items-center gap-3 px-6 py-3 rounded-full text-sm font-extrabold bg-[#D4AF37] hover:bg-[#c59e2b] text-[#1E1B6B] hover:text-[#1E1B6B] shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95"
          >
            <span>View Achievements</span>
            <ArrowDownOutlined className="text-xs group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
