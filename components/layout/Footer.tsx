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
    <footer className="bg-white border-t border-[#AD002E]/20 pt-16 pb-8 relative z-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: About Society */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#AD002E] flex items-center justify-center font-bold text-white text-lg">
              BK
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main tracking-wider leading-none transition-colors duration-300">
                {t("footer.title")}
              </h3>
              <span className="text-xs text-text-muted uppercase tracking-wider transition-colors duration-300">
                {t("footer.subtitle")}
              </span>
            </div>
          </div>
          <p className="text-sm text-text-muted leading-relaxed transition-colors duration-300">
            {t("footer.desc")}
          </p>
          <div className="inline-block bg-[#AD002E]/20 border border-[#AD002E]/30 rounded-lg px-3 py-1.5 text-sm text-text-main transition-all duration-300">
            ⭐ {t("footer.audit_status")}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-text-main tracking-widest uppercase border-l-2 border-[#AD002E] pl-2 transition-colors duration-300">
            {t("footer.quick_links")}
          </h4>
          <ul className="space-y-2.5 text-sm text-text-muted transition-colors duration-300">
            {[
              { labelKey: "nav.home", path: "/" },
              { labelKey: "nav.about", path: "/about" },
              { labelKey: "nav.services", path: "/services" },
              { labelKey: "nav.branches", path: "/branches" },
              { labelKey: "nav.photo_gallery", path: "/photo-gallery" },
              { labelKey: "nav.download", path: "/download" },
              { labelKey: "nav.social_activities", path: "/social-activities" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link href={link.path} className="hover:text-[#AD002E] flex items-center gap-1.5 group transition-colors">
                  <ArrowRightOutlined className="text-xs text-[#AD002E]/70 group-hover:translate-x-1 transition-transform" />
                  <span>{t(link.labelKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Co-op Schemes */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-text-main tracking-widest uppercase border-l-2 border-[#AD002E] pl-2 transition-colors duration-300">
            {t("footer.our_schemes")}
          </h4>
          <ul className="space-y-2.5 text-sm text-text-muted transition-colors duration-300">
            {[
              { labelKey: "footer.instant_gold_loans", defaultLabel: "Instant Gold Loans", path: "/services?tab=loans" },
              { labelKey: "footer.high_interest_fds", defaultLabel: "High Interest Fixed FDs", path: "/services?tab=deposits" },
              { labelKey: "footer.property_loans", defaultLabel: "Property & Home Loans", path: "/services?tab=loans" },
              { labelKey: "footer.mobile_banking", defaultLabel: "Mobile & Core Banking", path: "/services?tab=digital" },
              { labelKey: "footer.safe_lockers", defaultLabel: "Safe Locker Vaults", path: "/services?tab=vault" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link href={link.path} className="hover:text-[#AD002E] flex items-center gap-1.5 group transition-colors">
                  <ArrowRightOutlined className="text-xs text-[#AD002E]/70 group-hover:translate-x-1 transition-transform" />
                  <span>{t(link.labelKey) !== link.labelKey ? t(link.labelKey) : link.defaultLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Head Office Contact */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-text-main tracking-widest uppercase border-l-2 border-[#AD002E] pl-2 transition-colors duration-300">
            {t("footer.head_office")}
          </h4>
          <div className="space-y-3.5 text-sm text-text-muted transition-colors duration-300">
            <div className="flex items-start gap-2.5">
              <CompassOutlined className="text-[#AD002E] text-base mt-0.5 shrink-0" />
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <PhoneOutlined className="text-[#AD002E] text-base shrink-0" />
              <span>(02488) 230449, 230442</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MailOutlined className="text-[#AD002E] text-base shrink-0" />
              <span>info@kavadpat.co.in</span>
            </div>
            <div className="text-sm text-text-muted border-t border-[#AD002E]/20 pt-2 mt-1 transition-colors duration-300">
              💼 <span className="text-text-main font-semibold transition-colors duration-300">{t("footer.working_hours")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Regulatory bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-[#AD002E]/20 space-y-6 transition-colors duration-300">
        
        {/* Social Icons & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted text-center md:text-left transition-colors duration-300">
            © {currentYear} {t("footer.title")} {t("footer.subtitle")}. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-4 text-text-muted text-lg transition-colors duration-300">
            <Link href="#" className="hover:text-[#AD002E] transition-colors"><FacebookOutlined /></Link>
            <Link href="#" className="hover:text-[#AD002E] transition-colors"><TwitterOutlined /></Link>
            <Link href="#" className="hover:text-[#AD002E] transition-colors"><InstagramOutlined /></Link>
            <Link href="#" className="hover:text-[#AD002E] transition-colors"><YoutubeOutlined /></Link>
            <Link href="#" className="hover:text-[#AD002E] transition-colors"><LinkedinOutlined /></Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <p className="text-sm text-text-muted leading-relaxed text-center md:text-left bg-white/50 border border-[#AD002E]/20 p-3 rounded-lg transition-all duration-300">
          ⚠️ {t("footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
}
