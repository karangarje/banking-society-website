"use client";

import React from "react";
import Image from "next/image";
import { 
  HeartOutlined, 
  GlobalOutlined, 
  BookOutlined, 
  CompassOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";
import { useTheme } from "@/components/theme/ThemeContext";

interface SocialActivity {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  date: string;
  location: string;
  description: string;
  impact: string;
  image: string;
}

export default function SocialActivities() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const activities: SocialActivity[] = [
    {
      id: 1,
      title: t("social.activity1_title"),
      category: t("social.environmental"),
      icon: <GlobalOutlined className="text-2xl text-[#52c41a]" />,
      date: t("social.activity1_date"),
      location: t("social.activity1_location"),
      description: t("social.activity1_description"),
      impact: t("social.activity1_impact"),
      image: "/images/gallery_plantation.png",
    },
    {
      id: 2,
      title: t("social.activity2_title"),
      category: t("social.healthcare"),
      icon: <HeartOutlined className="text-2xl text-red-500" />,
      date: t("social.activity2_date"),
      location: t("social.activity2_location"),
      description: t("social.activity2_description"),
      impact: t("social.activity2_impact"),
      image: "/images/gallery_donation.png",
    },
    {
      id: 3,
      title: t("social.activity3_title"),
      category: t("social.education"),
      icon: <BookOutlined className="text-2xl text-[#AD002E]" />,
      date: t("social.activity3_date"),
      location: t("social.activity3_location"),
      description: t("social.activity3_description"),
      impact: t("social.activity3_impact"),
      image: "/images/gallery_agm.png",
    },
    {
      id: 4,
      title: t("social.activity4_title"),
      category: t("social.rural_relief"),
      icon: <CompassOutlined className="text-2xl text-[#1890ff]" />,
      date: t("social.activity4_date"),
      location: t("social.activity4_location"),
      description: t("social.activity4_description"),
      impact: t("social.activity4_impact"),
      image: "/images/hero_slide_1.png",
    },
  ];

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-base-border/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD002E]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="inline-block mb-2 ">
            {t("social.banner_badge")}
          </span>
          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight transition-colors duration-300 ${
            "text-text-main"
          }`}>
            {t("social.title")}
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDark ? "text-text-muted" : "text-gray-600"
          }`}>
            {t("social.description")}
          </p>
        </div>
      </section>

      {/* Activities Timeline Block */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {activities.map((act, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={act.id}
              data-aos={isEven ? "fade-right" : "fade-left"}
              className={`flex flex-col lg:flex-row items-center gap-10 p-6 sm:p-8 rounded-2xl glass-panel relative ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              
              {/* Left Side: Photo Frame */}
              <div className={`relative w-full lg:w-1/2 h-[260px] sm:h-[320px] rounded-xl overflow-hidden border shrink-0 transition-colors duration-300 ${
                isDark ? "border-[rgba(255,255,255,0.08)] bg-neutral-900" : "border-gray-200 bg-gray-100"
              }`}>
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover hover:scale-102 transition-transform duration-500"
                  sizes="(max-w-1024px) 100vw, 50vw"
                />
                
                {/* Visual Accent Layer */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isDark ? "bg-gradient-to-t from-[#FFFFFF]/85 via-transparent to-transparent" : "bg-gradient-to-t from-black/40 via-transparent to-transparent"
                }`} />
                
                {/* Category Floater */}
                <span className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded text-sm border flex items-center gap-1.5 font-bold transition-colors duration-300 ${
                  isDark 
                    ? "bg-[#FFFFFF]/90 text-white border-[rgba(255,255,255,0.08)]" 
                    : "bg-white/90 text-gray-900 border-gray-200"
                }`}>
                  {act.icon}
                  <span>{act.category}</span>
                </span>
              </div>

              {/* Right Side: Narrative Details */}
              <div className="space-y-4 flex-grow break-words whitespace-normal w-full lg:w-1/2">
                
                {/* Meta details */}
                <div className={`flex flex-wrap items-center gap-4 text-sm font-bold border-b pb-3 transition-colors duration-300 ${
                  isDark ? "text-text-muted border-[rgba(255,255,255,0.06)]" : "text-gray-500 border-gray-100"
                }`}>
                  <span className="flex items-center gap-1">
                    <CalendarOutlined className="text-[#AD002E]" />
                    {act.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CompassOutlined className="text-[#AD002E]" />
                    {act.location}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-2xl sm:text-3xl font-black hover:text-[#AD002E] transition-colors leading-tight break-words whitespace-normal ${
                  "text-text-main"
                }`}>
                  {act.title}
                </h3>

                {/* Body Description */}
                <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 break-words whitespace-normal ${
                  isDark ? "text-gray-600" : "text-gray-700"
                }`}>
                  {act.description}
                </p>

                {/* Impact Stat */}
                <div className="p-4 rounded-lg bg-[rgba(173,0,46,0.06)] border-l-4 border-[#AD002E] text-sm space-y-1">
                  <p className={`uppercase font-black tracking-widest text-xs transition-colors duration-300 ${
                    isDark ? "text-text-muted" : "text-gray-500"
                  }`}>{t("social.impact_label")}</p>
                  <p className={`font-extrabold leading-normal transition-colors duration-300 ${
                    "text-text-main"
                  }`}>{act.impact}</p>
                </div>

              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
}
