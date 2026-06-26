"use client";

import React from "react";
import Link from "next/link";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function DashboardTopHeader() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#AD002E] text-white border-b border-[#AD002E] w-full z-30 h-[208px] sm:h-[144px] md:h-[112px] flex items-center shrink-0">
      <div className="max-w-[1536px] mx-auto px-4 lg:px-8 xl:px-10 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        {/* Logo Section */}
        <Link href="/" className="flex items-center group">
          <img 
            src="/Name%20Red.jpeg" 
            alt={t("nav.logo_title") || "BABASAHEB KAVAD"} 
            className="h-14 sm:h-16 md:h-20 w-auto object-contain rounded-lg shadow-md"
          />
        </Link>

        {/* Contact Info & Slogan Section */}
        <div className="flex flex-col items-center md:items-end justify-center gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-base font-semibold text-white opacity-100 !text-white !opacity-100">
            <a href="tel:+912488230449" className="flex items-center gap-2 text-white font-semibold opacity-100 !text-white !opacity-100 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <PhoneOutlined className="text-base text-white opacity-100 !text-white !opacity-100" />
              </div>
              <span className="text-white font-semibold opacity-100 !text-white !opacity-100 hover:underline">(02488) 230449, 230442</span>
            </a>
            <a href="mailto:info@babasahebkavad.com" className="flex items-center gap-2 text-white font-semibold opacity-100 !text-white !opacity-100 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <MailOutlined className="text-base text-white opacity-100 !text-white !opacity-100" />
              </div>
              <span className="text-white font-semibold opacity-100 !text-white !opacity-100 hover:underline">info@babasahebkavad.com</span>
            </a>
          </div>
          <div className="text-base font-bold text-white tracking-wide pr-2 mt-1 sm:mt-2 text-center md:text-right">
            सहकारातून समृद्धी
          </div>
        </div>
      </div>
    </div>
  );
}
