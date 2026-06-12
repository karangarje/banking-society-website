"use client";

import React from "react";
import Link from "next/link";
import { 
  PhoneOutlined, 
  MailOutlined, 
  CompassOutlined, 
  ArrowRightOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#F36F21] text-white border-t border-base-border pt-16 pb-8 relative z-20 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: About Society */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#7B1010] to-[#F36B21] flex items-center justify-center font-bold text-white text-base">
              BK
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-main tracking-wider leading-none transition-colors duration-300">
                {t("footer.title")}
              </h3>
              <span className="text-[9px] text-text-muted uppercase tracking-wider transition-colors duration-300">
                {t("footer.subtitle")}
              </span>
            </div>
          </div>
          <p className="text-xs text-white leading-relaxed">
            {t("footer.desc")}
          </p>
          <div className="inline-block bg-[#7B1010]/20 border border-[#7B1010]/30 rounded-md px-3 py-1.5 text-xs text-white transition-all duration-300">
            ⭐ {t("footer.audit_status")}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#4A1D0A] tracking-widest uppercase border-l-2 border-[#F36B21] pl-2">
            {t("footer.quick_links")}
          </h4>
          <ul className="space-y-2.5 text-xs text-text-muted transition-colors duration-300">
            {[
              { labelKey: "nav.home", path: "/" },
              { labelKey: "nav.about", path: "/about" },
              { labelKey: "nav.services", path: "/services" },
              { labelKey: "nav.branches", path: "/branches" },
              { labelKey: "nav.photo_gallery", path: "/photo-gallery" },
              { labelKey: "nav.download", path: "/download" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link href={link.path} className="text-white hover:text-[#F36B21] flex items-center gap-1.5 group transition-colors">
                  <ArrowRightOutlined className="text-[9px] text-gray-500 group-hover:translate-x-1 transition-transform" />
                  <span>{t(link.labelKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Co-op Schemes */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#4A1D0A] tracking-widest uppercase border-l-2 border-[#7B1010] pl-2">
            {t("footer.our_schemes")}
          </h4>
          <ul className="space-y-2.5 text-xs text-text-muted transition-colors duration-300">
            {[
              { labelKey: "footer.instant_gold_loans", defaultLabel: "Instant Gold Loans", path: "/services?tab=loans" },
              { labelKey: "footer.high_interest_fds", defaultLabel: "High Interest Fixed FDs", path: "/services?tab=deposits" },
              { labelKey: "footer.property_loans", defaultLabel: "Property & Home Loans", path: "/services?tab=loans" },
              { labelKey: "footer.member_shares", defaultLabel: "Member Shares & Dividends", path: "/services?tab=shares" },
              { labelKey: "footer.mobile_banking", defaultLabel: "Mobile & Core Banking", path: "/services?tab=digital" },
              { labelKey: "footer.safe_lockers", defaultLabel: "Safe Locker Vaults", path: "/services?tab=vault" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link href={link.path} className="text-white hover:text-[#F36B21] flex items-center gap-1.5 group transition-colors">
                  <ArrowRightOutlined className="text-[9px] text-gray-500 group-hover:translate-x-1 transition-transform" />
                  <span>{t(link.labelKey) !== link.labelKey ? t(link.labelKey) : link.defaultLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Head Office Contact */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#4A1D0A] tracking-widest uppercase border-l-2 border-[#F36B21] pl-2">
            {t("footer.head_office")}
          </h4>
          <div className="space-y-3.5 text-xs text-text-muted transition-colors duration-300">
            <div className="flex items-start gap-2.5">
              <CompassOutlined className="text-[#F36B21] text-sm mt-0.5 shrink-0" />
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <PhoneOutlined className="text-[#F36B21] text-sm shrink-0" />
              <span>+91 20 2553 4567 / 4568</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MailOutlined className="text-[#F36B21] text-sm shrink-0" />
              <span>info@kavadpat.co.in</span>
            </div>
            <div className="text-[10px] text-text-muted border-t border-base-border pt-2 mt-1 transition-colors duration-300">
              💼 <span className="text-text-main font-semibold transition-colors duration-300">{t("footer.working_hours")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Regulatory bottom bar */}
      <div className="max-w-[1400px] mx-auto px-6 mt-16 pt-8 border-t border-base-border space-y-6 transition-colors duration-300">
        
        {/* Social Icons & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted text-center md:text-left transition-colors duration-300">
            © {currentYear} {t("footer.title")} {t("footer.subtitle")}. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-4 text-text-muted text-base transition-colors duration-300">
            <Link href="#" className="hover:text-[#F36B21] transition-colors"><FacebookOutlined /></Link>
            <Link href="#" className="hover:text-[#F36B21] transition-colors"><TwitterOutlined /></Link>
            <Link href="#" className="hover:text-[#F36B21] transition-colors"><InstagramOutlined /></Link>
            <Link href="#" className="hover:text-[#F36B21] transition-colors"><YoutubeOutlined /></Link>
            <Link href="#" className="hover:text-[#F36B21] transition-colors"><LinkedinOutlined /></Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <p className="text-[10px] text-text-muted leading-relaxed text-center md:text-left bg-base-bg/50 border border-base-border p-3 rounded transition-all duration-300">
          ⚠️ {t("footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
}
