"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as AntIcons from "@ant-design/icons";
import {
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  PhoneOutlined,
  LockOutlined,
  CompassOutlined,
  PlusOutlined,
  MinusOutlined,
  SunOutlined,
  MoonOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Modal, message } from "antd";
import { navigationData } from "@/data/menu";
import MegaMenu from "./MegaMenu";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (title: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const toggleMobileSubmenu = (title: string) => {
    setExpandedMobileMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    message.error("Please contact your nearest branch for portal access credentials.");
  };

  // Maps navigation titles to translation keys in JSON files
  const getNavTranslationKey = (title: string): string => {
    switch (title.toLowerCase()) {
      case "home": return "nav.home";
      case "about us": return "nav.about";
      case "services": return "nav.services";
      case "branches": return "nav.branches";
      case "photos": return "nav.photo_gallery";
      case "videos": return "nav.video_gallery";
      case "download": return "nav.download";
      case "social activities": return "nav.social_activities";
      case "contact": return "nav.contact";
      default: return "";
    }
  };

  return (
    <>
      {/* ─── Top Bar (Logo & Contact Info) ──────────────── */}
      <div className="bg-[#AD002E] text-white py-4 hidden lg:block border-b border-[#5a0b0b]">
        <div className="max-w-[1536px] mx-auto px-4 lg:px-8 xl:px-10 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/Name%20Red.jpeg" 
              alt={t("nav.logo_title")} 
              className="h-14 sm:h-16 md:h-20 w-auto object-contain rounded-md shadow-md"
            />
          </Link>

          {/* Contact Info Section */}
          <div className="text-right flex flex-col items-end justify-center gap-2">
             <div className="flex items-center gap-6 text-sm font-semibold tracking-wider text-white/90">
                <a href="tel:+912025534567" className="flex items-center gap-2 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <PhoneOutlined className="text-lg" />
                  </div>
                  <span>+91 20 2553 4567</span>
                </a>
                <a href="mailto:info@babasahebkavad.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <MailOutlined className="text-lg" />
                  </div>
                  <span>info@babasahebkavad.com</span>
                </a>
             </div>
             <div className="text-lg sm:text-xl font-bold text-white tracking-wide pr-2 mt-2">
               सहकारातून समृद्धी
             </div>
          </div>
        </div>
      </div>

      {/* ─── Sticky Header ─────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
            ? "bg-base-bg/95 backdrop-blur-md shadow-xl border-b border-base-border"
            : "bg-base-bg border-b border-base-border/50"
          }`}
      >
        <div className="max-w-[1536px] mx-auto px-4 lg:px-8 xl:px-10 h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 sm:gap-2.5 group shrink-0 mr-auto lg:mr-0 ${!scrolled ? 'lg:hidden' : 'transition-opacity duration-300'}`}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-md bg-gradient-to-br from-[#AD002E] to-[#AD002E] flex items-center justify-center font-black text-white text-base sm:text-lg shadow-md shadow-[#AD002E]/30 transition-transform duration-300 group-hover:scale-110">
              BK
            </div>
            <div className="leading-none shrink-0 max-w-[130px] xs:max-w-[180px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-none">
              <p className="text-xs xs:text-sm sm:text-base font-extrabold text-text-main tracking-wide group-hover:text-[#AD002E] transition-colors truncate">
                {t("nav.logo_title")}
              </p>
              <p className="text-[10px] sm:text-xs text-text-muted font-semibold uppercase tracking-widest mt-0.5 truncate hidden sm:block">
                {t("nav.logo_subtitle")}
              </p>
            </div>
          </Link>

          {/* ─── Desktop Nav ──────────────────────── */}
          <nav className="hidden xl:flex items-center gap-0 lg:gap-0.5">
            {navigationData.map((link, idx) => {
              const hasMegaMenu = !!link.megaMenu;
              const isOpen = activeMenu === link.title;
              const isActive = pathname === link.href;
              const transKey = getNavTranslationKey(link.title);
              const label = transKey ? t(transKey) : link.title;

              return (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => hasMegaMenu && handleMouseEnter(link.title)}
                  onMouseLeave={hasMegaMenu ? handleMouseLeave : undefined}
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`inline-flex items-center h-20 px-1 xl:px-1.5 2xl:px-4 text-sm 2xl:text-base font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${isActive
                          ? "text-[#AD002E] border-[#AD002E]"
                          : "text-text-muted border-transparent hover:text-text-main hover:border-[#AD002E]"
                        }`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <button
                      className={`inline-flex items-center gap-1.5 h-20 px-1 xl:px-1.5 2xl:px-4 text-sm 2xl:text-base font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${isOpen
                          ? "text-[#AD002E] border-[#AD002E]"
                          : "text-text-muted border-transparent hover:text-text-main hover:border-[#AD002E]"
                        }`}
                    >
                      <span>{label}</span>
                      <DownOutlined
                        className={`text-[10px] 2xl:text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}

                  {/* Mega Menu Dropdown */}
                  {hasMegaMenu && isOpen && link.megaMenu && (
                    <MegaMenu
                      sections={link.megaMenu}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Portal login */}
            <Link
              href="/employee-login"
              className="hidden sm:flex items-center gap-1.5 bg-[#AD002E] hover:bg-[#850024] text-white px-3.5 py-1.5 rounded text-sm font-bold tracking-wider uppercase border border-[#850024] hover:border-[#AD002E] transition-all duration-200 shadow-md shadow-[#AD002E]/20"
            >
              <LockOutlined className="text-sm" />
              <span>{t("nav.portal")}</span>
            </Link>

            {/* Language selector dropdown */}
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
              className={`text-sm font-black uppercase tracking-wider rounded border px-2 py-1 focus:outline-none transition-all duration-200 cursor-pointer ${isDark
                  ? "bg-[#FDFDFD] border-[rgba(255,255,255,0.08)] text-gray-600 focus:border-[#AD002E]"
                  : "bg-white border-gray-300 text-gray-700 focus:border-[#AD002E]"
                }`}
              title="Select Language / भाषा निवडा"
            >
              <option value="en">EN</option>
              <option value="mr">मराठी</option>
            </select>

            {/* Dark/Light mode toggle switch */}
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${isDark
                  ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.08)] text-text-muted hover:text-[#AD002E]"
                  : "bg-white border-gray-300 text-gray-600 hover:text-[#AD002E] hover:border-[#AD002E] shadow-sm"
                }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <SunOutlined className="text-lg" /> : <MoonOutlined className="text-lg" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden flex items-center justify-center w-8 h-8 rounded border transition-colors ${isDark
                  ? "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-white hover:text-[#AD002E]"
                  : "bg-white border-gray-300 text-gray-700 hover:text-[#AD002E]"
                }`}
            >
              {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>

        {/* ─── Mobile Drawer ──────────────────────── */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-20 z-30 bg-base-bg overflow-y-auto xl:hidden">
            <div className="px-4 py-4 space-y-1">
              {navigationData.map((link, idx) => {
                const hasMegaMenu = !!link.megaMenu;
                const isExpanded = !!expandedMobileMenus[link.title];
                const transKey = getNavTranslationKey(link.title);
                const label = transKey ? t(transKey) : link.title;

                // Check if this mega-menu uses the new categorized layout
                const isCategorized =
                  hasMegaMenu &&
                  link.megaMenu?.[0]?.layout === "categorized";

                return (
                  <div key={idx} className="border-b border-base-border/50 last:border-0">
                    {link.href ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3.5 px-2 text-base font-bold transition-colors ${pathname === link.href ? "text-[#AD002E]" : "text-text-main hover:text-[#AD002E]"
                          }`}
                      >
                        {label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu(link.title)}
                          className="w-full flex items-center justify-between py-3.5 px-2 text-base font-bold text-text-main hover:text-[#AD002E] transition-colors"
                        >
                          <span>{label}</span>
                          {isExpanded ? (
                            <MinusOutlined className="text-sm text-[#AD002E]" />
                          ) : (
                            <PlusOutlined className="text-sm text-text-muted" />
                          )}
                        </button>

                        {/* ─── Categorized Mobile Sub-Menu (Services) ─── */}
                        {isExpanded && isCategorized && link.megaMenu && (
                          <div className="pb-3 pl-2 pr-2 space-y-1">
                            {link.megaMenu[0].items.map((cat, cIdx) => {
                              const catKey = `${link.title}.${cat.title}`;
                              const catExpanded = !!expandedMobileMenus[catKey];
                              const catSlug = cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
                              const catTitleKey = `mega_menu.items_data.${catSlug}.title`;
                              const catTitleVal = t(catTitleKey);
                              const catLabel = catTitleVal === catTitleKey ? cat.title : catTitleVal;

                              return (
                                <div key={cIdx}>
                                  {/* Category button */}
                                  <button
                                    onClick={() => toggleMobileSubmenu(catKey)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                      catExpanded
                                        ? isDark
                                          ? "bg-[#AD002E]/15 border-[#AD002E]/40"
                                          : "bg-[#AD002E]/5 border-[#AD002E]/30"
                                        : isDark
                                          ? "bg-[#0D1B2A] border-[rgba(255,255,255,0.06)] hover:border-[#AD002E]/40"
                                          : "bg-white border-gray-200 hover:border-[#AD002E]/40 shadow-sm"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      {cat.icon && (
                                        <span className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                          catExpanded ? "bg-[#AD002E]" : isDark ? "bg-[#AD002E]/20" : "bg-[#AD002E]/10"
                                        }`}>
                                          {(() => {
                                            const icons = AntIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
                                            const Icon = icons[cat.icon!];
                                            return Icon ? <Icon className={`text-xs ${catExpanded ? "text-white" : "text-[#AD002E]"}`} /> : null;
                                          })()}
                                        </span>
                                      )}
                                      <span className={`text-sm font-bold ${catExpanded ? "text-[#AD002E]" : "text-text-main"}`}>
                                        {catLabel}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                        {cat.subItems?.length ?? 0}
                                      </span>
                                      {catExpanded ? (
                                        <MinusOutlined className="text-xs text-[#AD002E]" />
                                      ) : (
                                        <PlusOutlined className="text-xs text-text-muted" />
                                      )}
                                    </div>
                                  </button>

                                  {/* Sub-items under category */}
                                  {catExpanded && cat.subItems && (
                                    <div className="pl-4 pr-1 pt-1.5 pb-1 space-y-1.5">
                                      {cat.subItems.map((sub, sIdx) => {
                                        const subSlug = sub.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
                                        const subTitleKey = `mega_menu.items_data.${subSlug}.title`;
                                        const subTitleVal = t(subTitleKey);
                                        const subLabel = subTitleVal === subTitleKey ? sub.title : subTitleVal;

                                        return (
                                          <Link
                                            key={sIdx}
                                            href={sub.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                                              isDark
                                                ? "bg-[#0D1B2A]/60 border-[rgba(255,255,255,0.04)] hover:border-[#AD002E]/50"
                                                : "bg-gray-50 border-gray-100 hover:border-[#AD002E]/40"
                                            }`}
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#AD002E] shrink-0" />
                                            <span className="text-sm font-semibold text-text-main">
                                              {subLabel}
                                            </span>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* ─── Standard Flat Mobile Sub-Menu ─── */}
                        {isExpanded && !isCategorized && link.megaMenu && (
                          <div className="pb-3 pl-2 pr-2 space-y-2">
                            {link.megaMenu.map((section) =>
                              section.items.map((item, iIdx) => (
                                <Link
                                  key={iIdx}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isDark
                                      ? "bg-[#0D1B2A] border-[rgba(255,255,255,0.06)] hover:border-[#AD002E]/60"
                                      : "bg-white border-gray-200 hover:border-[#AD002E]/60 shadow-sm"
                                    }`}
                                >
                                  <div>
                                    <p className="text-sm font-bold text-text-main">
                                      {(() => {
                                        const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
                                        const transKey = `mega_menu.items_data.${itemSlug}.title`;
                                        const translated = t(transKey);
                                        return translated === transKey ? item.title : translated;
                                      })()}
                                    </p>
                                    {item.description && (
                                      <p className="text-sm text-text-muted mt-0.5 line-clamp-1">
                                        {(() => {
                                          const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
                                          const transKey = `mega_menu.items_data.${itemSlug}.description`;
                                          const translated = t(transKey);
                                          return translated === transKey ? item.description : translated;
                                        })()}
                                      </p>
                                    )}
                                  </div>
                                  {item.badge && (
                                    <span className="text-xs bg-[#AD002E] text-white px-1.5 py-0.5 rounded font-black">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile footer info */}
            <div className="p-4 mt-4 bg-base-card border-t border-base-border space-y-3">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <PhoneOutlined className="text-[#AD002E]" />
                <span className="font-bold text-text-main">+91 20 2553 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <CompassOutlined className="text-[#AD002E]" />
                <span className="text-text-main font-semibold">Plot 42, Ghole Road, Shivaji Nagar, Pune</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Login Modal ──────────────────────────────── */}
      <Modal
        title={
          <div className={`flex items-center gap-2 font-black tracking-wide text-lg ${"text-text-main"}`}>
            <LockOutlined className="text-[#AD002E]" />
            <span>{t("nav.member_portal_login")}</span>
          </div>
        }
        open={loginModalVisible}
        onCancel={() => setLoginModalVisible(false)}
        footer={null}
        centered
        styles={{ mask: { backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.75)" } }}
        style={{
          backgroundColor: isDark ? "#FDFDFD" : "#FFFFFF",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
        }}
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
          <div>
            <label className={`text-sm font-black uppercase tracking-widest ${isDark ? "text-text-muted" : "text-gray-600"}`}>{t("nav.member_id")}</label>
            <input
              type="text"
              required
              placeholder="e.g. BK-100254"
              className={`mt-1 w-full border rounded-lg px-3.5 py-2 text-base focus:outline-none focus:border-[#AD002E] transition-colors ${isDark
                  ? "bg-[#FFFFFF] border-[rgba(255,255,255,0.1)] text-white"
                  : "bg-[#F7F5EF] border-[rgba(0,0,0,0.1)] text-[#333333]"
                }`}
            />
          </div>
          <div>
            <label className={`text-sm font-black uppercase tracking-widest ${isDark ? "text-text-muted" : "text-gray-600"}`}>{t("nav.password")}</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className={`mt-1 w-full border rounded-lg px-3.5 py-2 text-base focus:outline-none focus:border-[#AD002E] transition-colors ${isDark
                  ? "bg-[#FFFFFF] border-[rgba(255,255,255,0.1)] text-white"
                  : "bg-[#F7F5EF] border-[rgba(0,0,0,0.1)] text-[#333333]"
                }`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#AD002E] hover:bg-[#850024] border border-[#850024] hover:border-[#AD002E] text-white py-2.5 rounded-lg font-black uppercase text-sm tracking-wider transition-all duration-200"
          >
            {t("nav.access_portal")}
          </button>
        </form>
        <p className={`mt-5 text-sm text-center leading-relaxed border-t pt-4 ${isDark
            ? "text-gray-500 border-[rgba(255,255,255,0.06)]"
            : "text-gray-600 border-[rgba(0,0,0,0.06)]"
          }`}>
          {t("nav.portal_contact_msg")}
        </p>
      </Modal>
    </>
  );
}
