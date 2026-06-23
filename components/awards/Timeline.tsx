"use client";

import React from "react";
import AchievementCard, { AchievementItem } from "./AchievementCard";

export default function Timeline() {
  const achievements: AchievementItem[] = [
    {
      id: 1,
      title: "International Co-operative Conference Recognition",
      description: "अहमदनगर येथे आयोजित आंतरराष्ट्रीय सहकार परिषदेमध्ये संस्थेच्या प्रतिनिधींना सन्मानित करण्यात आले.",
      highlights: ["परिषद सहभाग", "सन्मान प्राप्त", "सहकार क्षेत्र योगदान"],
      image: "/images/history/awards/award-01.png",
      imageAlt: "International Co-operative Conference 2025 Recognition",
    },
    {
      id: 2,
      title: "Leadership Recognition Ceremony",
      description: "संस्थेच्या मार्गदर्शकांच्या निवडीबद्दल आयोजित सत्कार समारंभ.",
      highlights: ["नेतृत्व गौरव", "संस्था विकास", "सामाजिक योगदान"],
      image: "/images/history/awards/award-02.png",
      imageAlt: "Director Appointment Recognition Ceremony",
    },
    {
      id: 3,
      title: "Federation Selection Honour",
      description: "संस्थेच्या पदाधिकाऱ्यांच्या निवडीबद्दल विशेष गौरव सोहळा.",
      highlights: ["संस्थात्मक नेतृत्व", "सहकार क्षेत्र विकास", "सामाजिक बांधिलकी"],
      image: "/images/history/awards/award-03.png",
      imageAlt: "Federation Selection Honour Ceremony",
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-white/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Title */}
        <div className="text-center space-y-3" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#AD002E] dark:text-[#D4AF37] transition-colors">
            Our Historic Milestones
          </h2>
          <p className="text-sm sm:text-base text-[#AD002E]/70 dark:text-[#AD002E]/70 max-w-xl mx-auto">
            A chronological timeline of key leadership recognitions and co-operative achievements.
          </p>
          <div className="w-16 h-1 bg-[#AD002E] dark:bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Timeline Stack */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {achievements.map((item, idx) => (
            <AchievementCard 
              key={item.id}
              item={item}
              isReverse={idx % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
