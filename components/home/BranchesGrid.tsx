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

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedBranch(null);
  };

  return (
    <section className="py-20 px-4 bg-base-bg border-t border-base-border relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            {t("branches_sect.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight transition-colors duration-300">
            {t("branches_sect.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#7B1010] to-[#F36B21] mx-auto rounded-full" />
          <p className="text-sm text-text-muted leading-relaxed transition-colors duration-300">
            {t("branches_sect.desc")}
          </p>
        </div>

        {/* Buttons / Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {branchesData.map((branch, index) => (
            <button
              key={branch.id}
              onClick={() => handleBranchClick(branch)}
              data-aos="zoom-in"
              data-aos-delay={(index % 4) * 100}
              className="group flex flex-col items-center justify-center p-5 rounded-lg bg-base-card border border-base-border hover:border-[#F36B21] hover:bg-[rgba(123,16,16,0.15)] transition-all duration-300 shadow-md cursor-pointer text-center"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.02)] group-hover:bg-[#7B1010] border border-base-border group-hover:border-[#F36B21] flex items-center justify-center mb-3 transition-all">
                <EnvironmentOutlined className="text-base text-[#F36B21] group-hover:text-white" />
              </div>

              {/* Branch Title */}
              <span className="text-sm font-bold text-text-main group-hover:text-[#F36B21] transition-colors leading-tight">
                {isMr ? branch.nameMr : branch.name}
              </span>

              {/* City Tag */}
              <span className="text-[10px] text-text-muted font-medium tracking-wider uppercase mt-1 transition-colors">
                {isMr ? branch.cityMr : branch.city}
              </span>

              {branch.isHeadOffice && (
                <span className="text-[9px] bg-[#7B1010] text-white px-2 py-0.5 rounded-full font-extrabold uppercase mt-2 tracking-widest border border-[#9c1a1a]">
                  {t("branches_sect.head_office")}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Branch Info Drawer */}
        <Drawer
          title={
            <div className={`flex items-center gap-2 font-black tracking-wide ${isDark ? "text-white" : "text-[#333333]"}`}>
              <EnvironmentOutlined className="text-[#F36B21]" />
              <span>{isMr ? selectedBranch?.nameMr : selectedBranch?.name}</span>
            </div>
          }
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          style={{ width: 420 }}
          styles={{
            header: {
              backgroundColor: isDark ? "#12121A" : "#FFFFFF",
              borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            },
            body: {
              backgroundColor: isDark ? "#12121A" : "#FFFFFF",
              color: isDark ? "#FFFFFF" : "#333333",
            },
          }}
        >
          {selectedBranch && (
            <div className="space-y-6 text-sm">
              
              {/* Head Office Flag */}
              {selectedBranch.isHeadOffice && (
                <div className={`p-3 border rounded-lg text-xs transition-colors ${
                  isDark ? "bg-[#7B1010]/20 border-[#7B1010] text-white" : "bg-[#7B1010]/10 border-[#7B1010]/30 text-[#7B1010]"
                }`}>
                  🏢 <span className="font-bold">{t("branches_sect.head_office")}:</span> {t("branches_sect.headquarters_desc")}
                </div>
              )}

              {/* Details List */}
              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex gap-3 items-start">
                  <EnvironmentOutlined className="text-[#F36B21] text-lg mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t("branches_sect.branch_address")}</h5>
                    <p className={`mt-1 leading-relaxed transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`}>{isMr ? selectedBranch.addressMr : selectedBranch.address}</p>
                  </div>
                </div>

                {/* Manager */}
                <div className="flex gap-3 items-start">
                  <UserOutlined className="text-[#F36B21] text-lg mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t("branches_sect.branch_manager")}</h5>
                    <p className={`mt-1 transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`}>{selectedBranch.manager}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 items-start">
                  <PhoneOutlined className="text-[#F36B21] text-lg mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t("branches_sect.contact_number")}</h5>
                    <a href={`tel:${selectedBranch.phone}`} className={`transition-colors mt-1 block ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-[#7B1010]"}`}>
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-start">
                  <MailOutlined className="text-[#F36B21] text-lg mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t("branches_sect.email_address")}</h5>
                    <a href={`mailto:${selectedBranch.email}`} className={`transition-colors mt-1 block ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-[#7B1010]"}`}>
                      {selectedBranch.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3 items-start">
                  <ClockCircleOutlined className="text-[#F36B21] text-lg mt-0.5" />
                  <div>
                    <h5 className={`font-bold transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t("branches_sect.operational_hours")}</h5>
                    <p className={`mt-1 leading-relaxed transition-colors ${isDark ? "text-gray-400" : "text-gray-600"}`}>{isMr ? selectedBranch.hoursMr : selectedBranch.hours}</p>
                  </div>
                </div>

              </div>

              {/* Navigation Action */}
              <div className={`pt-6 border-t ${isDark ? "border-[rgba(255,255,255,0.06)]" : "border-[rgba(0,0,0,0.06)]"}`}>
                <Button
                  type="primary"
                  icon={<CompassOutlined />}
                  href={selectedBranch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#7B1010] hover:bg-[#9c1a1a] border border-[#9c1a1a] hover:border-[#F36B21] text-xs font-black uppercase tracking-wider py-5 flex items-center justify-center shadow-lg"
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
