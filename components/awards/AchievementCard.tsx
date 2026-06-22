"use client";

import React from "react";
import Image from "next/image";
import { CheckCircleOutlined } from "@ant-design/icons";

export interface AchievementItem {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

interface AchievementCardProps {
  item: AchievementItem;
  isReverse?: boolean;
}

export default function AchievementCard({ item, isReverse = false }: AchievementCardProps) {
  return (
    <div 
      data-aos={isReverse ? "fade-left" : "fade-right"}
      className={`flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 bg-white rounded-[30px] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-white/5 ${
        isReverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* LEFT / IMAGE AREA */}
      <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full aspect-[2.64/1] lg:aspect-auto overflow-hidden bg-[#1E1B6B]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={item.id === 1}
        />
      </div>

      {/* RIGHT / BLUE TEXT PANEL */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#1E1B6B] to-[#121046] text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center space-y-6">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-[#D4AF37] leading-snug">
          {item.title}
        </h3>

        {/* Marathi Description */}
        <p className="text-sm sm:text-base leading-relaxed text-white/90 font-medium">
          {item.description}
        </p>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-[#B3003C]" />

        {/* Highlights */}
        <div className="space-y-3">
          {item.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold">
              <CheckCircleOutlined className="text-[#D4AF37] mt-1 flex-shrink-0" />
              <span className="text-white/85">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
