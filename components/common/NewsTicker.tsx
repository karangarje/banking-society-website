"use client";

import React, { useState, useEffect } from "react";
import { SoundOutlined, CloseOutlined } from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

interface NewsItem {
  id: string;
  titleEn: string;
  titleMr: string;
}

export default function NewsTicker() {
  const { locale, t } = useLanguage();
  const isMr = locale === "mr";
  const [isVisible, setIsVisible] = useState(true);
  const [dynamicNews, setDynamicNews] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/public/news");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const list = json.map((item: NewsItem) => isMr ? item.titleMr : item.titleEn);
            setDynamicNews(list);
          }
        }
      } catch (err) {
        console.error("Error loading news in ticker:", err);
      }
    };
    fetchNews();
  }, [isMr]);

  const defaultTickerItems = [
    t("ticker.item1"),
    t("ticker.item2"),
    t("ticker.item3"),
    t("ticker.item4"),
    t("ticker.item5"),
    t("ticker.item6"),
  ];

  const tickerItems = dynamicNews.length > 0 ? dynamicNews : defaultTickerItems;

  if (!isVisible) return null;

  return (
    <div className="bg-[#1C1C24] border-b border-[#AD002E]/20 py-2 text-sm md:text-base font-normal overflow-hidden relative z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center flex-1 overflow-hidden">
          {/* Fixed Title Label */}
          <div className="flex items-center gap-1 bg-[#AD002E] text-white px-3 py-1 rounded-lg font-bold text-sm uppercase tracking-wider shadow-md z-10 mr-4 shrink-0">
            <SoundOutlined className="animate-pulse" />
            <span>{t("ticker.label")}</span>
          </div>

          {/* Rolling Content */}
          <div className="ticker-wrap flex-1 overflow-hidden relative">
            <div className="ticker-content flex gap-16 whitespace-nowrap text-[#AD002E]/70">
              {/* Repeat list twice for seamless loop */}
              {tickerItems.map((item, index) => (
                <span key={`ticker-1-${index}`} className="hover:text-[#AD002E] transition-colors cursor-pointer text-[rgba(255,255,255,0.8)]">
                  {item}
                </span>
              ))}
              {tickerItems.map((item, index) => (
                <span key={`ticker-2-${index}`} className="hover:text-[#AD002E] transition-colors cursor-pointer text-[rgba(255,255,255,0.8)]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 flex items-center justify-center w-6 h-6 rounded-full text-[#AD002E]/70 hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors shrink-0"
          title="Close Updates"
        >
          <CloseOutlined className="text-xs" />
        </button>
      </div>
    </div>
  );
}
