"use client";

import React from "react";
import { useLanguage } from "@/components/theme/LanguageContext";

const branches = [
  {
    en: "Pune Main Branch",
    mr: "पुणे मुख्य शाखा",
    city: "PUNE",
    badge: "मुख्य कार्यालय",
  },
  {
    en: "Mumbai Fort Branch",
    mr: "मुंबई फोर्ट शाखा",
    city: "MUMBAI",
  },
  {
    en: "Nashik Road Branch",
    mr: "नाशिक रोड शाखा",
    city: "NASHIK",
  },
  {
    en: "Nagpur City Branch",
    mr: "नागपूर शहर शाखा",
    city: "NAGPUR",
  },
  {
    en: "Aurangabad Central Branch",
    mr: "छत्रपती संभाजीनगर मध्य शाखा",
    city: "AURANGABAD",
  },
  {
    en: "Kolhapur Market Branch",
    mr: "कोल्हापूर मार्केट शाखा",
    city: "KOLHAPUR",
  },
  {
    en: "Satara Road Branch",
    mr: "सातारा रोड शाखा",
    city: "SATARA",
  },
  {
    en: "Sangli Center Branch",
    mr: "सांगली केंद्र शाखा",
    city: "SANGLI",
  },
  {
    en: "Solapur City Branch",
    mr: "सोलापूर शहर शाखा",
    city: "SOLAPUR",
  },
  {
    en: "Ahmednagar Branch",
    mr: "अहमदनगर शाखा",
    city: "AHMEDNAGAR",
  },
  {
    en: "Ratnagiri Coast Branch",
    mr: "रत्नागिरी किनारपट्टी शाखा",
    city: "RATNAGIRI",
  },
  {
    en: "Thane West Branch",
    mr: "ठाणे पश्चिम शाखा",
    city: "THANE",
  },
];

export default function BranchesSection() {
  const { locale } = useLanguage(); // "en" | "mr"
  const isMr = locale === "mr";

  return (
    <section className="w-full py-16 bg-[#0b0b10] text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          {isMr ? "आमच्या शाखा" : "Our Branches"}
        </h2>

        <p className="text-gray-400 text-center mt-2 mb-10">
          {isMr
            ? "महाराष्ट्रातील आमच्या सर्व शाखा येथे दिल्या आहेत"
            : "All our branches across Maharashtra are listed below"}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {branches.map((b, i) => (
            <div
              key={i}
              className="bg-[#14141c] border border-white/10 rounded-xl p-5 hover:border-orange-500 transition"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-base">
                📍
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm">
                {isMr ? b.mr : b.en}
              </h3>

              {/* City */}
              <p className="text-xs text-gray-400 mt-1">{b.city}</p>

              {/* Badge – shown only for head office */}
              {b.badge && (
                <span className="inline-block mt-3 text-[10px] bg-red-700 px-2 py-1 rounded">
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
