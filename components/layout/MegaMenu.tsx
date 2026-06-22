"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import * as AntIcons from "@ant-design/icons";
import { MegaMenuSection, MenuItem } from "@/data/menu";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

// ─── Dynamic Icon Resolver ────────────────────────────────────
const DynamicIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const icons = AntIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;
  const IconComp = icons[name];
  if (!IconComp) return <AntIcons.AppstoreOutlined className={className} />;
  return <IconComp className={className} />;
};

interface MegaMenuProps {
  sections: MegaMenuSection[];
  onClose: () => void;
}

// ─── Flat Menu Card (used by list / grid layouts) ─────────────
const MenuCard = ({
  item,
  isGrid,
  isDark,
}: {
  item: MenuItem;
  isGrid?: boolean;
  isDark: boolean;
}) => {
  const { t } = useLanguage();
  const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  const translatedTitle = t(`mega_menu.items_data.${itemSlug}.title`);
  const displayTitle =
    translatedTitle === `mega_menu.items_data.${itemSlug}.title`
      ? item.title
      : translatedTitle;

  const translatedDesc = t(`mega_menu.items_data.${itemSlug}.description`);
  const displayDesc =
    translatedDesc === `mega_menu.items_data.${itemSlug}.description`
      ? item.description
      : translatedDesc;

  return (
    <Link
      href={item.href}
      className={`group flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 ${
        isDark
          ? "bg-[#0D1B2A] hover:bg-[#112236] border-[rgba(255,255,255,0.06)] hover:border-[#AD002E]/60"
          : "bg-white hover:bg-gray-50 border-gray-200 hover:border-[#AD002E]/60 shadow-sm hover:shadow"
      } ${isGrid ? "" : "w-full"}`}
    >
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
          isDark
            ? "bg-[#AD002E]/20 border border-[#AD002E]/30 group-hover:bg-[#AD002E]/40 group-hover:border-[#AD002E]"
            : "bg-[#AD002E]/10 border border-[#AD002E]/20 group-hover:bg-[#AD002E]/20 group-hover:border-[#AD002E]"
        }`}
      >
        {item.icon && (
          <DynamicIcon
            name={item.icon}
            className={`text-base transition-colors ${
              isDark
                ? "text-[#AD002E] group-hover:text-white"
                : "text-[#AD002E] group-hover:text-[#AD002E]"
            }`}
          />
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-base font-bold transition-colors leading-tight ${
              isDark
                ? "text-white group-hover:text-[#AD002E]"
                : "text-gray-800 group-hover:text-[#AD002E]"
            }`}
          >
            {displayTitle}
          </span>
          {item.badge && (
            <span className="text-xs font-black uppercase tracking-wider px-1.5 py-0.5 bg-[#AD002E] text-white rounded border border-[#850024]">
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p
            className={`text-sm leading-snug transition-colors ${
              isDark
                ? "text-text-muted group-hover:text-gray-600"
                : "text-gray-600 group-hover:text-gray-800"
            }`}
          >
            {displayDesc}
          </p>
        )}
        <span className="text-sm font-bold group-hover:underline text-[#AD002E]">
          {t("mega_menu.view")}
        </span>
      </div>
    </Link>
  );
};

// ─── Categorized Dropdown (Services) ──────────────────────────
const CategorizedMenu = ({
  section,
  isDark,
  onClose,
}: {
  section: MegaMenuSection;
  isDark: boolean;
  onClose: () => void;
}) => {
  const { t } = useLanguage();
  const [activeCat, setActiveCat] = useState<number>(0);
  const subTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCatEnter = useCallback((idx: number) => {
    if (subTimer.current) clearTimeout(subTimer.current);
    setActiveCat(idx);
  }, []);

  const handleCatLeave = useCallback(() => {
    // small delay so moving to the submenu panel doesn't close it
    subTimer.current = setTimeout(() => {}, 80);
  }, []);

  const activeCategory = section.items[activeCat];
  const subItems = activeCategory?.subItems ?? [];

  // translation helper for category titles
  const catSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  const catTitle = (item: MenuItem) => {
    const key = `mega_menu.items_data.${catSlug(item.title)}.title`;
    const val = t(key);
    return val === key ? item.title : val;
  };
  const catDesc = (item: MenuItem) => {
    const key = `mega_menu.items_data.${catSlug(item.title)}.description`;
    const val = t(key);
    return val === key ? item.description : val;
  };

  return (
    <div className="flex">
      {/* ── Left: Category List ─────────────── */}
      <div
        className={`w-[260px] shrink-0 border-r ${
          isDark ? "border-[rgba(255,255,255,0.06)]" : "border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`px-4 py-3 border-b ${
            isDark
              ? "border-[rgba(255,255,255,0.06)] bg-[#0F0F1A]"
              : "border-gray-200 bg-white"
          }`}
        >
          <span className="text-sm font-black tracking-[0.15em] uppercase text-text-main">
            {t("nav.services") || section.title}
          </span>
        </div>

        <div className="py-1.5">
          {section.items.map((cat, idx) => {
            const isActive = idx === activeCat;
            return (
              <button
                key={idx}
                onMouseEnter={() => handleCatEnter(idx)}
                onMouseLeave={handleCatLeave}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group ${
                  isActive
                    ? isDark
                      ? "bg-[#AD002E]/15 border-l-[3px] border-l-[#AD002E]"
                      : "bg-[#AD002E]/8 border-l-[3px] border-l-[#AD002E]"
                    : "border-l-[3px] border-l-transparent hover:bg-[#AD002E]/5"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? "bg-[#AD002E] shadow-md shadow-[#AD002E]/30"
                      : isDark
                        ? "bg-[#AD002E]/15 group-hover:bg-[#AD002E]/25"
                        : "bg-[#AD002E]/10 group-hover:bg-[#AD002E]/15"
                  }`}
                >
                  {cat.icon && (
                    <DynamicIcon
                      name={cat.icon}
                      className={`text-sm transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-[#AD002E]"
                      }`}
                    />
                  )}
                </div>

                {/* Label + description */}
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm font-bold block transition-colors ${
                      isActive
                        ? "text-[#AD002E]"
                        : isDark
                          ? "text-white group-hover:text-[#AD002E]"
                          : "text-gray-800 group-hover:text-[#AD002E]"
                    }`}
                  >
                    {catTitle(cat)}
                  </span>
                  <span
                    className={`text-xs block mt-0.5 transition-colors truncate ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {cat.subItems?.length ?? 0}{" "}
                    {(cat.subItems?.length ?? 0) === 1
                      ? t("mega_menu.item") || "item"
                      : t("mega_menu.items") || "items"}
                  </span>
                </div>

                {/* Right arrow */}
                <AntIcons.RightOutlined
                  className={`text-[10px] transition-all duration-200 ${
                    isActive
                      ? "text-[#AD002E] translate-x-0.5"
                      : isDark
                        ? "text-gray-600 group-hover:text-[#AD002E]"
                        : "text-gray-400 group-hover:text-[#AD002E]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right: Sub-Items Panel ──────────── */}
      <div
        className="w-[300px] shrink-0"
        onMouseEnter={() => {
          if (subTimer.current) clearTimeout(subTimer.current);
        }}
      >
        {/* Sub-header */}
        <div
          className={`px-4 py-3 border-b ${
            isDark
              ? "border-[rgba(255,255,255,0.06)] bg-[#0F0F1A]"
              : "border-gray-200 bg-white"
          }`}
        >
          <span
            className={`text-xs font-bold tracking-[0.12em] uppercase ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {catTitle(activeCategory)}
          </span>
        </div>

        {/* Sub-items */}
        <div
          key={activeCat}
          className="p-2.5 space-y-1.5"
          style={{
            animation: "megaSubFadeIn 0.2s ease-out",
          }}
        >
          {subItems.map((sub, sIdx) => {
            const slug = catSlug(sub.title);
            const subTitleKey = `mega_menu.items_data.${slug}.title`;
            const subTitleVal = t(subTitleKey);
            const subTitle =
              subTitleVal === subTitleKey ? sub.title : subTitleVal;

            const subDescKey = `mega_menu.items_data.${slug}.description`;
            const subDescVal = t(subDescKey);
            const subDesc =
              subDescVal === subDescKey ? sub.description : subDescVal;

            return (
              <Link
                key={sIdx}
                href={sub.href}
                onClick={onClose}
                className={`group flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                  isDark
                    ? "bg-[#0D1B2A] hover:bg-[#112236] border-[rgba(255,255,255,0.06)] hover:border-[#AD002E]/60"
                    : "bg-white hover:bg-gray-50 border-gray-200 hover:border-[#AD002E]/60 shadow-sm hover:shadow"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isDark
                      ? "bg-[#AD002E]/20 border border-[#AD002E]/30 group-hover:bg-[#AD002E]/40"
                      : "bg-[#AD002E]/10 border border-[#AD002E]/20 group-hover:bg-[#AD002E]/20"
                  }`}
                >
                  {sub.icon && (
                    <DynamicIcon
                      name={sub.icon}
                      className={`text-sm transition-colors ${
                        isDark
                          ? "text-[#AD002E] group-hover:text-white"
                          : "text-[#AD002E]"
                      }`}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm font-bold block transition-colors ${
                      isDark
                        ? "text-white group-hover:text-[#AD002E]"
                        : "text-gray-800 group-hover:text-[#AD002E]"
                    }`}
                  >
                    {subTitle}
                  </span>
                  {subDesc && (
                    <p
                      className={`text-xs mt-0.5 leading-snug transition-colors ${
                        isDark
                          ? "text-gray-500 group-hover:text-gray-400"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {subDesc}
                    </p>
                  )}
                </div>

                <AntIcons.RightOutlined
                  className={`text-[10px] mt-1 transition-all duration-200 ${
                    isDark
                      ? "text-gray-600 group-hover:text-[#AD002E] group-hover:translate-x-0.5"
                      : "text-gray-400 group-hover:text-[#AD002E] group-hover:translate-x-0.5"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════
export default function MegaMenu({ sections, onClose }: MegaMenuProps) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (!sections || sections.length === 0) return null;
  const section = sections[0];
  if (!section) return null;

  const isCategorized = section.layout === "categorized";
  const isGrid = section.layout === "grid";
  const itemCount = section.items?.length || 0;

  const getNavTranslationKey = (title: string): string => {
    switch (title.toLowerCase()) {
      case "about us":
        return "nav.about";
      case "services":
        return "nav.services";
      case "photo gallery":
        return "nav.photo_gallery";
      case "download":
        return "nav.download";
      default:
        return "";
    }
  };

  const transKey = getNavTranslationKey(section.title);
  const sectionTitle = transKey ? t(transKey) : section.title;

  return (
    <div
      className={`absolute left-0 top-full mt-1 z-50 ${
        isCategorized ? "w-[560px]" : "min-w-[280px] w-max max-w-[580px]"
      }`}
      onMouseLeave={onClose}
      style={{ animation: "megaFadeIn 0.2s ease-out" }}
    >
      <div
        className={`rounded-xl overflow-hidden border shadow-2xl transition-colors duration-200 ${
          isDark
            ? "bg-[#0A0A12] border-[rgba(255,255,255,0.08)] shadow-black/60"
            : "bg-[#F7F5EF] border-gray-300 shadow-gray-300/40"
        }`}
      >
        {/* ── Categorized Layout (Services) ──── */}
        {isCategorized ? (
          <CategorizedMenu
            section={section}
            isDark={isDark}
            onClose={onClose}
          />
        ) : (
          <>
            {/* Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-200 ${
                isDark
                  ? "border-[rgba(255,255,255,0.06)] bg-[#0F0F1A]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-sm font-black tracking-[0.15em] uppercase text-text-main">
                {sectionTitle}
              </span>
              <span
                className={`text-sm font-bold tracking-widest uppercase ${
                  isDark ? "text-text-muted" : "text-gray-500"
                }`}
              >
                {itemCount}{" "}
                {itemCount === 1
                  ? t("mega_menu.item") || "item"
                  : t("mega_menu.items") || "items"}
              </span>
            </div>

            {/* Cards */}
            <div className="p-3">
              {isGrid ? (
                <div className="grid grid-cols-2 gap-2">
                  {section.items.map((item, idx) => (
                    <div key={idx} onClick={onClose}>
                      <MenuCard item={item} isGrid isDark={isDark} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {section.items.map((item, idx) => (
                    <div key={idx} onClick={onClose}>
                      <MenuCard item={item} isDark={isDark} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Inline keyframes for animations */}
      <style jsx>{`
        @keyframes megaFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes megaSubFadeIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}