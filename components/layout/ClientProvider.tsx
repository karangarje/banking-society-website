"use client";

import React, { useEffect } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AOS from "aos";
import { useTheme } from "@/components/theme/ThemeContext";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            token: {
              colorPrimary: "#AD002E", // Maroon
              colorLink: "#AD002E",    // Orange link color
              colorSuccess: "#52c41a",
              colorWarning: "#faad14",
              colorError: "#ff4d4f",
              colorBgBase: isDark ? "#FFFFFF" : "#F7F5EF",
              colorBgContainer: isDark ? "#FDFDFD" : "#FFFFFF",
              colorTextBase: isDark ? "#FFFFFF" : "#333333",
              colorTextSecondary: isDark ? "#B8B8B8" : "#666666",
              borderRadius: 8,
              colorBorder: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)",
            },
            components: {
              Menu: {
                colorItemBg: "transparent",
                colorItemBgSelected: "#AD002E",
                colorItemTextSelected: "#FFFFFF",
                colorItemText: isDark ? "#B8B8B8" : "#666666",
                colorSubItemBg: isDark ? "#FDFDFD" : "#FFFFFF",
              },
              Button: {
                colorPrimary: "#AD002E",
                colorLink: "#AD002E",
                colorPrimaryHover: "#850024",
              },
              Tabs: {
                itemSelectedColor: "#AD002E",
                itemColor: isDark ? "#B8B8B8" : "#666666",
                itemHoverColor: isDark ? "#FFFFFF" : "#333333",
                inkBarColor: "#AD002E",
              },
            },
          }}
        >
          <div className="min-h-screen flex flex-col text-text-main selection:bg-[#AD002E] selection:text-white">
            {children}
          </div>
        </ConfigProvider>
      </AntdRegistry>
    </SessionProvider>
  );
}

