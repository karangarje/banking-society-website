"use client";

import React, { useEffect } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AOS from "aos";
import { useTheme } from "@/components/theme/ThemeContext";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();

  useEffect(() => {
    // Initialize AOS animations on mount
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#7B1010", // Maroon
            colorLink: "#F36B21",    // Orange link color
            colorSuccess: "#52c41a",
            colorWarning: "#faad14",
            colorError: "#ff4d4f",
            colorBgBase: isDark ? "#0B0B0F" : "#F7F5EF",
            colorBgContainer: isDark ? "#12121A" : "#FFFFFF",
            colorTextBase: isDark ? "#FFFFFF" : "#333333",
            colorTextSecondary: isDark ? "#B8B8B8" : "#666666",
            borderRadius: 8,
            colorBorder: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)",
          },
          components: {
            Menu: {
              colorItemBg: "transparent",
              colorItemBgSelected: "#7B1010",
              colorItemTextSelected: "#FFFFFF",
              colorItemText: isDark ? "#B8B8B8" : "#666666",
              colorSubItemBg: isDark ? "#12121A" : "#FFFFFF",
            },
            Button: {
              colorPrimary: "#7B1010",
              colorLink: "#F36B21",
              colorPrimaryHover: "#9c1a1a",
            },
            Tabs: {
              itemSelectedColor: "#F36B21",
              itemColor: isDark ? "#B8B8B8" : "#666666",
              itemHoverColor: isDark ? "#FFFFFF" : "#333333",
              inkBarColor: "#F36B21",
            },
          },
        }}
      >
        <div className="min-h-screen flex flex-col text-text-main selection:bg-[#F36B21] selection:text-white">
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
}

