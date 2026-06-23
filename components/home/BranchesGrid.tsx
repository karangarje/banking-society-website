"use client";

import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  CompassOutlined
} from "@ant-design/icons";
import { branchesData, Branch } from "@/data/branches";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function BranchesGrid() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { isDark } = useTheme();
  const { t, locale } = useLanguage();
  const isMr = locale === "mr";

  const [drawerWidth, setDrawerWidth] = useState<number | string>(420);
  React.useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth < 480 ? "100%" : 420);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedBranch(null);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-white border-t border-[#AD002E]/20 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block mb-3 px-3 py-1 bg-[rgba(173,0,46,0.08)] text-[#AD002E] text-xs font-bold uppercase tracking-widest rounded-lg shadow-md border border-[rgba(173,0,46,0.1)]">
            {t("branches_sect.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-main tracking-tight transition-colors duration-300">
            {t("branches_sect.title")}
          </h2>
          <div className="w-16 h-1 bg-[#AD002E] mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-text-muted leading-relaxed transition-colors duration-300">
            {t("branches_sect.desc")}
          </p>
        </div>

        {/* Buttons / Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {branchesData.map((branch, index) => (
            <button
              key={branch.id}
              onClick={() => handleBranchClick(branch)}
              data-aos="zoom-in"
              data-aos-delay={(index % 4) * 100}
              className="group flex flex-col items-center justify-center p-6 rounded-lg bg-white border border-[rgba(0,0,0,0.04)] hover:border-[rgba(173,0,46,0.2)] transition-all duration-400 shadow-md hover:shadow-[0_12px_30px_-8px_rgba(173,0,46,0.12)] hover:-translate-y-1 cursor-pointer text-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[rgba(173,0,46,0.05)] group-hover:bg-[#AD002E] border border-[rgba(173,0,46,0.1)] group-hover:border-[#AD002E] flex items-center justify-center mb-4 transition-all duration-400">
                <EnvironmentOutlined className="text-xl text-[#AD002E] group-hover:text-white transition-colors duration-400" />
              </div>

              {/* Branch Title */}
              <span className="text-sm sm:text-base font-bold text-text-main group-hover:text-[#AD002E] transition-colors leading-tight">
                {isMr ? branch.nameMr : branch.nameEn}
              </span>

              {/* City Tag */}
              <span className="text-xs sm:text-sm text-text-muted font-normal tracking-wider uppercase mt-1 transition-colors">
                {isMr ? branch.cityMr : branch.cityEn}
              </span>

              {branch.isHeadOffice && (
                <span className="text-xs bg-[#AD002E] text-white px-2 py-0.5 rounded-full font-bold uppercase mt-2 tracking-widest border border-[#AD002E]">
                  {t("branches_sect.head_office")}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Branch Info Drawer */}
        <Drawer
          title={
            <div className={`flex items-center gap-2 font-bold tracking-wide ${"text-text-main"}`}>
              <EnvironmentOutlined className="text-[#AD002E]" />
              <span>{isMr ? selectedBranch?.nameMr : selectedBranch?.nameEn}</span>
            </div>
          }
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          width={drawerWidth}
          styles={{
            header: {
              backgroundColor: isDark ? "#FDFDFD" : "#FFFFFF",
              borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            },
            body: {
              backgroundColor: isDark ? "#FDFDFD" : "#FFFFFF",
              color: isDark ? "#FFFFFF" : "#333333",
            },
          }}
        >
          {selectedBranch && (
            <div className="space-y-6 text-base">
              
              {/* Head Office Flag */}
              {selectedBranch.isHeadOffice && (
                <div className={`p-3 border rounded-lg text-sm transition-colors ${
                  isDark ? "bg-[#AD002E]/20 border-[#AD002E] text-white" : "bg-[#AD002E]/10 border-[#AD002E]/30 text-[#AD002E]"
                }`}>
                  🏢 <span className="font-bold">{t("branches_sect.head_office")}:</span> {t("branches_sect.headquarters_desc")}
                </div>
              )}

              {/* Details List */}
              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex gap-3 items-start">
                  <EnvironmentOutlined className="text-[#AD002E] text-xl mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-[#AD002E]/70" : "text-[#AD002E]/70"}`}>{t("branches_sect.branch_address")}</h5>
                    <p className={`mt-1 leading-relaxed transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{isMr ? selectedBranch.addressMr : selectedBranch.addressEn}</p>
                  </div>
                </div>

                {/* Manager */}
                <div className="flex gap-3 items-start">
                  <UserOutlined className="text-[#AD002E] text-xl mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-[#AD002E]/70" : "text-[#AD002E]/70"}`}>{t("branches_sect.branch_manager")}</h5>
                    <p className={`mt-1 transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{isMr ? selectedBranch.managerMr : selectedBranch.managerEn}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 items-start">
                  <PhoneOutlined className="text-[#AD002E] text-xl mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-[#AD002E]/70" : "text-[#AD002E]/70"}`}>{t("branches_sect.contact_number")}</h5>
                    <a href={`tel:${selectedBranch.phone}`} className={`transition-colors mt-1 block ${isDark ? "text-[#AD002E]/70 hover:text-[#AD002E]" : "text-[#AD002E]/70 hover:text-[#AD002E]"}`}>
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-start">
                  <MailOutlined className="text-[#AD002E] text-xl mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-[#AD002E]/70" : "text-[#AD002E]/70"}`}>{t("branches_sect.email_address")}</h5>
                    <a href={`mailto:${selectedBranch.email}`} className={`transition-colors mt-1 block ${isDark ? "text-[#AD002E]/70 hover:text-[#AD002E]" : "text-[#AD002E]/70 hover:text-[#AD002E]"}`}>
                      {selectedBranch.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3 items-start">
                  <ClockCircleOutlined className="text-[#AD002E] text-xl mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-[#AD002E]/70" : "text-[#AD002E]/70"}`}>{t("branches_sect.operational_hours")}</h5>
                    <p className={`mt-1 leading-relaxed transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{isMr ? selectedBranch.hoursMr : selectedBranch.hoursEn}</p>
                  </div>
                </div>

              </div>

              {/* Navigation Action */}
              <div className={`pt-6 border-t ${isDark ? "border-[#AD002E]/20" : "border-[#AD002E]/20"}`}>
                <Button
                  type="primary"
                  icon={<CompassOutlined />}
                  href={selectedBranch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#AD002E] hover:bg-[#AD002E] border border-[#AD002E] hover:border-[#AD002E] text-sm font-bold uppercase tracking-wider py-5 flex items-center justify-center shadow-md hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("branches_sect.navigate_maps")}
                </Button>
              </div>

            </div>
          )}
        </Drawer>

      </div>
    </section>
  );
}
