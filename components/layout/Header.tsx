"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      case "photo gallery": return "nav.photo_gallery";
      case "video gallery": return "nav.video_gallery";
      case "download": return "nav.download";
      case "social activities": return "nav.social_activities";
      case "contact us": return "nav.contact";
      default: return "";
    }
  };

  return (
    <>
      {/* ─── Sticky Header ─────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
            ? "bg-base-bg/95 backdrop-blur-md shadow-xl border-b border-base-border"
            : "bg-base-bg border-b border-base-border/50"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#7B1010] to-[#F36B21] flex items-center justify-center font-black text-white text-base shadow-md shadow-[#7B1010]/30 transition-transform duration-300 group-hover:scale-110">
              BK
            </div>
            <div className="leading-none">
              <p className="text-[13px] font-extrabold text-text-main tracking-wide group-hover:text-[#F36B21] transition-colors">
                BABASAHEB KAVAD
              </p>
              <p className="text-[9px] text-text-muted font-semibold uppercase tracking-widest mt-0.5">
                Nighoj Nagari Sahakari Patsanstha
              </p>
            </div>
          </Link>

          {/* ─── Desktop Nav ──────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">
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
                      className={`inline-flex items-center h-14 px-4 text-[13px] font-semibold border-b-2 transition-all duration-200 ${isActive
                          ? "text-[#F36B21] border-[#F36B21]"
                          : "text-text-muted border-transparent hover:text-text-main hover:border-[#7B1010]"
                        }`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <button
                      className={`inline-flex items-center gap-1.5 h-14 px-4 text-[13px] font-semibold border-b-2 transition-all duration-200 ${isOpen
                          ? "text-[#F36B21] border-[#F36B21]"
                          : "text-text-muted border-transparent hover:text-text-main hover:border-[#7B1010]"
                        }`}
                    >
                      <span>{label}</span>
                      <DownOutlined
                        className={`text-[9px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
          <div className="flex items-center gap-2">
            {/* Portal login */}
            <button
              onClick={() => setLoginModalVisible(true)}
              className="hidden sm:flex items-center gap-1.5 bg-[#7B1010] hover:bg-[#9c1a1a] text-white px-3.5 py-1.5 rounded text-[12px] font-bold tracking-wider uppercase border border-[#9c1a1a] hover:border-[#F36B21] transition-all duration-200 shadow-md shadow-[#7B1010]/20"
            >
              <LockOutlined className="text-[11px]" />
              <span>{t("nav.portal")}</span>
            </button>

            {/* Language selector dropdown */}
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
              className={`text-[11px] font-black uppercase tracking-wider rounded border px-2 py-1 focus:outline-none transition-all duration-200 cursor-pointer ${isDark
                  ? "bg-[#12121A] border-[rgba(255,255,255,0.08)] text-gray-300 focus:border-[#F36B21]"
                  : "bg-white border-gray-300 text-gray-700 focus:border-[#7B1010]"
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
                  ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.08)] text-gray-400 hover:text-[#F36B21]"
                  : "bg-white border-gray-300 text-gray-600 hover:text-[#7B1010] hover:border-[#7B1010] shadow-sm"
                }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <SunOutlined className="text-sm" /> : <MoonOutlined className="text-sm" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden flex items-center justify-center w-8 h-8 rounded border transition-colors ${isDark
                  ? "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-white hover:text-[#F36B21]"
                  : "bg-white border-gray-300 text-gray-700 hover:text-[#7B1010]"
                }`}
            >
              {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>

        {/* ─── Mobile Drawer ──────────────────────── */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-14 z-30 bg-base-bg overflow-y-auto lg:hidden">
            <div className="px-4 py-4 space-y-1">
              {navigationData.map((link, idx) => {
                const hasMegaMenu = !!link.megaMenu;
                const isExpanded = !!expandedMobileMenus[link.title];
                const transKey = getNavTranslationKey(link.title);
                const label = transKey ? t(transKey) : link.title;

                return (
                  <div key={idx} className="border-b border-base-border/50 last:border-0">
                    {link.href ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3.5 px-2 text-sm font-bold transition-colors ${pathname === link.href ? "text-[#F36B21]" : "text-text-main hover:text-[#F36B21]"
                          }`}
                      >
                        {label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu(link.title)}
                          className="w-full flex items-center justify-between py-3.5 px-2 text-sm font-bold text-text-main hover:text-[#F36B21] transition-colors"
                        >
                          <span>{label}</span>
                          {isExpanded ? (
                            <MinusOutlined className="text-xs text-[#F36B21]" />
                          ) : (
                            <PlusOutlined className="text-xs text-text-muted" />
                          )}
                        </button>

                        {isExpanded && link.megaMenu && (
                          <div className="pb-3 pl-2 pr-2 space-y-2">
                            {link.megaMenu.map((section) =>
                              section.items.map((item, iIdx) => (
                                <Link
                                  key={iIdx}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isDark
                                      ? "bg-[#0D1B2A] border-[rgba(255,255,255,0.06)] hover:border-[#7B1010]/60"
                                      : "bg-white border-gray-200 hover:border-[#7B1010]/60 shadow-sm"
                                    }`}
                                >
                                  <div>
                                    <p className="text-xs font-bold text-text-main">{item.title}</p>
                                    {item.description && (
                                      <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                  {item.badge && (
                                    <span className="text-[9px] bg-[#7B1010] text-white px-1.5 py-0.5 rounded font-black">
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
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <PhoneOutlined className="text-[#F36B21]" />
                <span className="font-bold text-text-main">+91 20 2553 4567</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <CompassOutlined className="text-[#F36B21]" />
                <span className="text-text-main font-semibold">Plot 42, Ghole Road, Shivaji Nagar, Pune</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Login Modal ──────────────────────────────── */}
      <Modal
        title={
          <div className={`flex items-center gap-2 font-black tracking-wide text-base ${isDark ? "text-white" : "text-[#333333]"}`}>
            <LockOutlined className="text-[#F36B21]" />
            <span>MEMBER PORTAL LOGIN</span>
          </div>
        }
        open={loginModalVisible}
        onCancel={() => setLoginModalVisible(false)}
        footer={null}
        centered
        styles={{ mask: { backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.75)" } }}
        style={{
          backgroundColor: isDark ? "#12121A" : "#FFFFFF",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
        }}
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
          <div>
            <label className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-600"}`}>Member ID</label>
            <input
              type="text"
              required
              placeholder="e.g. BK-100254"
              className={`mt-1 w-full border rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#F36B21] transition-colors ${isDark
                  ? "bg-[#0B0B0F] border-[rgba(255,255,255,0.1)] text-white"
                  : "bg-[#F7F5EF] border-[rgba(0,0,0,0.1)] text-[#333333]"
                }`}
            />
          </div>
          <div>
            <label className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-600"}`}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className={`mt-1 w-full border rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#F36B21] transition-colors ${isDark
                  ? "bg-[#0B0B0F] border-[rgba(255,255,255,0.1)] text-white"
                  : "bg-[#F7F5EF] border-[rgba(0,0,0,0.1)] text-[#333333]"
                }`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#7B1010] hover:bg-[#9c1a1a] border border-[#9c1a1a] hover:border-[#F36B21] text-white py-2.5 rounded-lg font-black uppercase text-xs tracking-wider transition-all duration-200"
          >
            Access Portal
          </button>
        </form>
        <p className={`mt-5 text-[11px] text-center leading-relaxed border-t pt-4 ${isDark
            ? "text-gray-500 border-[rgba(255,255,255,0.06)]"
            : "text-gray-600 border-[rgba(0,0,0,0.06)]"
          }`}>
          Contact your branch to register for online portal access.
        </p>
      </Modal>
    </>
  );
}
