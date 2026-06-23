"use client";

import React from "react";
import { useLanguage } from "@/components/theme/LanguageContext";

const branches = [
  {
    en: "Pune Main Branch",
    mr: "पुणे मुख्य शाखा",
    city: "PUNE",
    cityMr: "पुणे",
    badge: true,
  },
  {
    en: "Mumbai Fort Branch",
    mr: "मुंबई फोर्ट शाखा",
    city: "MUMBAI",
    cityMr: "मुंबई",
  },
  {
    en: "Nashik Road Branch",
    mr: "नाशिक रोड शाखा",
    city: "NASHIK",
    cityMr: "नाशिक",
  },
  {
    en: "Nagpur City Branch",
    mr: "नागपूर शहर शाखा",
    city: "NAGPUR",
    cityMr: "नागपूर",
  },
  {
    en: "Aurangabad Central Branch",
    mr: "छत्रपती संभाजीनगर मध्य शाखा",
    city: "AURANGABAD",
    cityMr: "छत्रपती संभाजीनगर",
  },
  {
    en: "Kolhapur Market Branch",
    mr: "कोल्हापूर मार्केट शाखा",
    city: "KOLHAPUR",
    cityMr: "कोल्हापूर",
  },
  {
    en: "Satara Road Branch",
    mr: "सातारा रोड शाखा",
    city: "SATARA",
    cityMr: "सातारा",
  },
  {
    en: "Sangli Center Branch",
    mr: "सांगली केंद्र शाखा",
    city: "SANGLI",
    cityMr: "सांगली",
  },
  {
    en: "Solapur City Branch",
    mr: "सोलापूर शहर शाखा",
    city: "SOLAPUR",
    cityMr: "सोलापूर",
  },
  {
    en: "Ahmednagar Branch",
    mr: "अहमदनगर शाखा",
    city: "AHMEDNAGAR",
    cityMr: "अहमदनगर",
  },
  {
    en: "Ratnagiri Coast Branch",
    mr: "रत्नागिरी किनारपट्टी शाखा",
    city: "RATNAGIRI",
    cityMr: "रत्नागिरी",
  },
  {
    en: "Thane West Branch",
    mr: "ठाणे पश्चिम शाखा",
    city: "THANE",
    cityMr: "ठाणे",
  },
];

export default function BranchesSection() {
  const { locale } = useLanguage(); // "en" | "mr"
  const isMr = locale === "mr";

  return (
    <section className="w-full py-16 bg-[#FFFFFF] text-text-main">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          {isMr ? "आमचे नेटवर्क" : "Our Network"}
        </h2>

        <p className="text-text-muted text-center mt-2 mb-10">
          {isMr
            ? "महाराष्ट्रातील आमच्या सर्व शाखा येथे दिलेल्या आहेत"
            : "All our branches across Maharashtra are listed below"}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {branches.map((b, i) => (
            <div
              key={i}
              className="bg-[#F9F9F9] border border-[#AD002E]/20 rounded-lg p-5 hover:border-[#AD002E] transition"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-lg">
                📍
              </div>

              {/* Title */}
              <h3 className="font-semibold text-base">
                {isMr ? b.mr : b.en}
              </h3>

              {/* City */}
              <p className="text-sm text-text-muted mt-1">
                {isMr ? b.cityMr : b.city}
              </p>

              {/* Badge – shown only for head office */}
              {b.badge && (
                <span className="inline-block mt-3 text-sm bg-[#AD002E] px-2 py-1 rounded-lg text-white">
                  {isMr ? "मुख्य कार्यालय" : "Head Office"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
