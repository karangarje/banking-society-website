"use client";

import React, { useState } from "react";
import {
  PhoneOutlined,
  MailOutlined,
  CompassOutlined,
  ClockCircleOutlined,
  SendOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { message } from "antd";
import { useLanguage } from "@/components/theme/LanguageContext";
import ContactFormMarathi from "@/components/ContactFormMarathi";

export default function Contact() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      message.success(t("contact.success_message"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "inquiry",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="w-full bg-[#FFF8F3]">
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#FFF0E0] to-[#FFF8F3] border-b border-[#F36F21]/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F36F21]/5 rounded-full blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-6 relative text-center space-y-4">
          <span className="text-white text-xs font-black uppercase tracking-widest bg-[#F36F21] border border-[#F36F21] px-3 py-1 rounded">
            {t("contact.banner_badge")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#8B0000] tracking-tight">
            {t("contact.title")}
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("contact.description")}
          </p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact info & Map */}
        <div data-aos="fade-right" className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#8B0000]">{t("contact.central_heading")}</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t("contact.central_description")}
            </p>
          </div>
          {/* Details list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white border border-[#F36F21]/30 shadow-sm">
              <CompassOutlined className="text-lg text-[#F36F21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#8B0000] text-xs uppercase tracking-wide">{t("contact.head_office_label")}</h5>
                <p className="text-[11px] text-gray-600 mt-1 leading-normal">{t("contact.head_office_address")}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white border border-[#F36F21]/30 shadow-sm">
              <ClockCircleOutlined className="text-lg text-[#F36F21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#8B0000] text-xs uppercase tracking-wide">{t("contact.working_hours_label")}</h5>
                <p className="text-[11px] text-gray-600 mt-1 leading-normal">{t("contact.working_hours")}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white border border-[#F36F21]/30 shadow-sm">
              <PhoneOutlined className="text-lg text-[#F36F21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#8B0000] text-xs uppercase tracking-wide">{t("contact.call_desk_label")}</h5>
                <a href="tel:+912025534567" className="text-[11px] text-gray-600 hover:text-[#8B0000] mt-1 block">+91 20 2553 4567</a>
                <a href="tel:+912025534568" className="text-[11px] text-gray-600 hover:text-[#8B0000] block">+91 20 2553 4568</a>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-xl bg-white border border-[#F36F21]/30 shadow-sm">
              <MailOutlined className="text-lg text-[#F36F21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#8B0000] text-xs uppercase tracking-wide">{t("contact.email_label")}</h5>
                <a href="mailto:info@kavadpat.co.in" className="text-[11px] text-gray-600 hover:text-[#8B0000] mt-1 block">info@kavadpat.co.in</a>
                <a href="mailto:support@kavadpat.co.in" className="text-[11px] text-gray-600 hover:text-[#8B0000] block">support@kavadpat.co.in</a>
              </div>
            </div>
          </div>
          {/* Map Placeholder */}
          <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border-2 border-[#F36F21]/30 bg-white flex flex-col items-center justify-center p-6 text-center shadow-lg">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(243,111,33,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,111,33,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#F36F21]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="z-10 space-y-4 max-w-sm">
              <CompassOutlined className="text-4xl text-[#F36F21]" />
              <h4 className="text-sm font-bold text-[#8B0000] uppercase tracking-wider">{t("contact.map_heading")}</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed">{t("contact.map_description")}</p>
              <a href="https://maps.google.com/?q=Ghole+Road+Shivajinagar+Pune" target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#8B0000] hover:bg-[#F36F21] border border-[#8B0000] hover:border-[#F36F21] text-white px-5 py-2 rounded text-xs font-black uppercase tracking-wider transition-all">
                {t("contact.map_button")}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div data-aos="fade-left" className="bg-white border-2 border-[#F36F21]/30 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg">
          {locale === "mr" ? (
            <ContactFormMarathi />
          ) : (
            <>
              <h3 className="text-xl font-bold text-[#8B0000] mb-2">{t("contact.form_heading")}</h3>
              <p className="text-xs text-gray-500 mb-6">{t("contact.form_description")}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider">{t("contact.label_name")}</label>
                  <input type="text" required name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.placeholder_name")} className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#F36F21] transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider">{t("contact.label_email")}</label>
                    <input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder={t("contact.placeholder_email")} className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#F36F21] transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider">{t("contact.label_phone")}</label>
                    <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} placeholder={t("contact.placeholder_phone")} className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#F36F21] transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider">{t("contact.label_subject")}</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#F36F21] transition-colors">
                    <option value="inquiry">{t("contact.subject_general")}</option>
                    <option value="gold-loan">{t("contact.subject_gold_loan")}</option>
                    <option value="fixed-deposit">{t("contact.subject_fixed_deposit")}</option>
                    <option value="membership">{t("contact.subject_membership")}</option>
                    <option value="mobile-banking">{t("contact.subject_mobile_banking")}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider">{t("contact.label_message")}</label>
                  <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder={t("contact.placeholder_message")} className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#F36F21] transition-colors resize-none" />
                </div>
                <div className="flex gap-2 items-start text-[11px] text-gray-500 leading-normal">
                  <InfoCircleOutlined className="text-[#F36F21] mt-0.5 shrink-0" />
                  <p>{t("contact.privacy_note")}</p>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#8B0000] hover:bg-[#F36F21] border border-[#8B0000] hover:border-[#F36F21] text-white py-3 rounded-lg font-black uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                  {loading ? (<span>{t("contact.submitting")}</span>) : (<><SendOutlined /><span>{t("contact.submit")}</span></>) }
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
