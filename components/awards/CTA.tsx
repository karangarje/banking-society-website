"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightOutlined, HistoryOutlined, PhoneOutlined } from "@ant-design/icons";

export default function CTA() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* QUOTE SECTION */}
      <section className="w-full py-16 bg-[#121046] border-b border-[#AD002E]/20 relative text-center text-white px-4">
        {/* Quote Accent Icon */}
        <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
          <div className="w-10 h-10 rounded-full bg-[#AD002E] text-white flex items-center justify-center text-2xl font-serif">
            "
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4" data-aos="zoom-in">
          <h3 className="text-3xl sm:text-5xl font-bold text-[#D4AF37] tracking-wider leading-relaxed">
            "सहकारातून समृद्धी"
          </h3>
          <p className="text-sm sm:text-base font-bold text-white/60 tracking-widest uppercase">
            Babasaheb Kavad Co-operative Patsanstha
          </p>
        </div>
      </section>

      {/* CTA ACTIONS SECTION */}
      <section className="w-full py-20 bg-white/30 dark:bg-white/10 text-center px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto space-y-8" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#AD002E] dark:text-[#D4AF37] leading-tight">
            Become Part of Our Journey
          </h2>
          <p className="text-sm sm:text-base text-[#AD002E]/70 dark:text-[#AD002E]/70 max-w-xl mx-auto leading-relaxed">
            Join a trusted co-operative institution committed to growth, transparency and member prosperity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Contact Button */}
            <Link
              href="/contact"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-[#AD002E] hover:bg-[#990033] text-white shadow-md hover:shadow-md transition-all duration-300 transform active:scale-95"
            >
              <PhoneOutlined />
              <span>Contact Us</span>
              <ArrowRightOutlined className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* View History Button */}
            <Link
              href="/about/history"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-transparent hover:bg-white dark:hover:bg-white/5 text-[#AD002E]/70 dark:text-[#AD002E]/70 border border-[#AD002E]/20 dark:border-[#AD002E]/20 hover:border-[#AD002E]/20 transition-all duration-300 transform active:scale-95"
            >
              <HistoryOutlined />
              <span>View History</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
