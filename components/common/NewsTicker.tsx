"use client";

import React from "react";
import { SoundOutlined } from "@ant-design/icons";

import { useLanguage } from "@/components/theme/LanguageContext";

export default function NewsTicker() {
  const { t } = useLanguage();
  const tickerItems = [
    t("ticker.item1"),
    t("ticker.item2"),
    t("ticker.item3"),
    t("ticker.item4"),
    t("ticker.item5"),
    t("ticker.item6"),
  ];

  return (
    <div className="bg-[#1C1C24] border-b border-[rgba(255,255,255,0.06)] py-2 text-xs md:text-sm font-medium overflow-hidden relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Fixed Title Label */}
        <div className="flex items-center gap-1 bg-[#7B1010] text-white px-3 py-1 rounded-sm font-bold text-xs uppercase tracking-wider shadow-sm z-10 mr-4 shrink-0">
          <SoundOutlined className="animate-pulse" />
          <span>{t("ticker.label")}</span>
        </div>

        {/* Rolling Content */}
        <div className="ticker-wrap flex-1 overflow-hidden relative">
          <div className="ticker-content flex gap-16 whitespace-nowrap text-gray-200">
            {/* Repeat list twice for seamless loop */}
            {tickerItems.map((item, index) => (
              <span key={`ticker-1-${index}`} className="hover:text-[#F36B21] transition-colors cursor-pointer">
                {item}
              </span>
            ))}
            {tickerItems.map((item, index) => (
              <span key={`ticker-2-${index}`} className="hover:text-[#F36B21] transition-colors cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
