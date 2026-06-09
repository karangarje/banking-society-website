"use client";

import React from "react";
import Link from "next/link";
import * as AntIcons from "@ant-design/icons";
import { MegaMenuSection, MenuItem } from "@/data/menu";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

// Dynamically resolve Ant Design icon components by name
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComp = (AntIcons as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!IconComp) return <AntIcons.AppstoreOutlined className={className} />;
  return <IconComp className={className} />;
};

interface MegaMenuProps {
  sections: MegaMenuSection[];
  onClose: () => void;
}

// Single card item — used in both list and grid layouts
const MenuCard = ({ item, isGrid, isDark }: { item: MenuItem; isGrid?: boolean; isDark: boolean }) => (
  <Link
    href={item.href}
    className={`group flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 ${
      isDark
        ? "bg-[#0D1B2A] hover:bg-[#112236] border-[rgba(255,255,255,0.06)] hover:border-[#7B1010]/60"
        : "bg-white hover:bg-gray-50 border-gray-200 hover:border-[#7B1010]/60 shadow-sm hover:shadow"
    } ${isGrid ? "" : "w-full"}`}
  >
    {/* Icon Circle */}
    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
      isDark
        ? "bg-[#7B1010]/20 border border-[#7B1010]/30 group-hover:bg-[#7B1010]/40 group-hover:border-[#7B1010]"
        : "bg-[#7B1010]/10 border border-[#7B1010]/20 group-hover:bg-[#7B1010]/20 group-hover:border-[#7B1010]"
    }`}>
      {item.icon && (
        <DynamicIcon
          name={item.icon}
          className={`text-sm transition-colors ${
            isDark ? "text-[#F36B21] group-hover:text-white" : "text-[#7B1010] group-hover:text-[#F36B21]"
          }`}
        />
      )}
    </div>

    {/* Text block */}
    <div className="flex-1 min-w-0 space-y-1">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[13px] font-bold transition-colors leading-tight ${
          isDark ? "text-white group-hover:text-[#F36B21]" : "text-gray-800 group-hover:text-[#7B1010]"
        }`}>
          {item.title}
        </span>
        {item.badge && (
          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-[#7B1010] text-white rounded border border-[#9c1a1a]">
            {item.badge}
          </span>
        )}
      </div>
      {item.description && (
        <p className={`text-[11px] leading-snug transition-colors ${
          isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-800"
        }`}>
          {item.description}
        </p>
      )}
      <span className={`text-[11px] font-bold group-hover:underline ${
        isDark ? "text-[#F36B21]" : "text-[#7B1010]"
      }`}>
        View
      </span>
    </div>
  </Link>
);

export default function MegaMenu({ sections, onClose }: MegaMenuProps) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (!sections || sections.length === 0) return null;

  const section = sections[0]; // Each nav item has one section block
  const isGrid = section.layout === "grid";
  const itemCount = section.items.length;

  const getNavTranslationKey = (title: string): string => {
    switch (title.toLowerCase()) {
      case "about us": return "nav.about";
      case "services": return "nav.services";
      case "photo gallery": return "nav.photo_gallery";
      case "download": return "nav.download";
      default: return "";
    }
  };

  const transKey = getNavTranslationKey(section.title);
  const sectionTitle = transKey ? t(transKey) : section.title;

  return (
    // Dropdown panel — anchored below the nav item
    <div
      className="absolute left-0 top-full mt-1 z-50 min-w-[280px] w-max max-w-[580px]"
      onMouseLeave={onClose}
    >
      {/* Panel */}
      <div className={`rounded-lg overflow-hidden border shadow-2xl transition-colors duration-200 ${
        isDark
          ? "bg-[#0A0A12] border-[rgba(255,255,255,0.08)] shadow-black/60"
          : "bg-[#F7F5EF] border-gray-300 shadow-gray-300/40"
      }`}>
        
        {/* Panel Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-200 ${
          isDark
            ? "border-[rgba(255,255,255,0.06)] bg-[#0F0F1A]"
            : "border-gray-200 bg-white"
        }`}>
          <span className={`text-[11px] font-black tracking-[0.15em] uppercase ${
            isDark ? "text-white" : "text-gray-700"
          }`}>
            {sectionTitle}
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Cards Container */}
        <div className="p-3">
          {isGrid ? (
            // 2-column grid (Services)
            <div className="grid grid-cols-2 gap-2">
              {section.items.map((item, idx) => (
                <div key={idx} onClick={onClose}>
                  <MenuCard item={item} isGrid isDark={isDark} />
                </div>
              ))}
            </div>
          ) : (
            // Single-column vertical list
            <div className="flex flex-col gap-2">
              {section.items.map((item, idx) => (
                <div key={idx} onClick={onClose}>
                  <MenuCard item={item} isDark={isDark} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
