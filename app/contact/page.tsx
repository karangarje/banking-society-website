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
import { App } from "antd";
import { useLanguage } from "@/components/theme/LanguageContext";
import ContactFormMarathi from "@/components/ContactFormMarathi";
import BoardSection from "@/components/contact/BoardSection";
import QuickContact from "@/components/contact/QuickContact";

export default function Contact() {
  const { t, locale } = useLanguage();
  const { message } = App.useApp();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/public/contact-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          mobileNumber: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        message.success(t("contact.success_message"));
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "inquiry",
          message: "",
        });
      } else {
        const errData = await res.json();
        message.error(errData.message || "Failed to submit inquiry");
      }
    } catch (err) {
      message.error("An error occurred during submission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Header Banner */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#AD002E] to-[#1E1B6B] overflow-hidden">
        <div className="absolute inset-0 bg-white/15" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-4 z-10">
          <span className="inline-block mb-2 text-[#AD002E] text-sm uppercase tracking-widest font-semibold">
            {t("contact.banner_badge")}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight drop-shadow-md">
            {t("contact.title")}
          </h1>
          <p className="text-base text-[#AD002E] max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {t("contact.description")}
          </p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <section className="py-12 md:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact info & Map */}
        <div data-aos="fade-right" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#AD002E]/70">{t("contact.central_heading")}</h2>
            <p className="text-sm sm:text-base text-[#AD002E]/70 leading-relaxed">
              {t("contact.central_description")}
            </p>
          </div>
          {/* Details list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start p-4 rounded-lg bg-[#AD002E]/5/60 border border-[#AD002E]">
              <CompassOutlined className="text-xl text-[#AD002E] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#AD002E]/70 text-sm uppercase tracking-wide">{t("contact.head_office_label")}</h5>
                <p className="text-sm text-[#AD002E]/70 mt-1 leading-normal">{t("contact.head_office_address")}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-lg bg-[#AD002E]/5/60 border border-[#AD002E]">
              <ClockCircleOutlined className="text-xl text-[#AD002E] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#AD002E]/70 text-sm uppercase tracking-wide">{t("contact.working_hours_label")}</h5>
                <p className="text-sm text-[#AD002E]/70 mt-1 leading-normal">{t("contact.working_hours")}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-lg bg-[#AD002E]/5/60 border border-[#AD002E]">
              <PhoneOutlined className="text-xl text-[#AD002E] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#AD002E]/70 text-sm uppercase tracking-wide">{t("contact.call_desk_label")}</h5>
                <a href="tel:+912488230449" className="text-sm text-[#AD002E]/70 hover:text-[#AD002E] mt-1 block">(02488) 230449</a>
                <a href="tel:+912488230442" className="text-sm text-[#AD002E]/70 hover:text-[#AD002E] block">(02488) 230442</a>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-lg bg-[#AD002E]/5/60 border border-[#AD002E]">
              <MailOutlined className="text-xl text-[#AD002E] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-[#AD002E]/70 text-sm uppercase tracking-wide">{t("contact.email_label")}</h5>
                <a href="mailto:info@kavadpat.co.in" className="text-sm text-[#AD002E]/70 hover:text-[#AD002E] mt-1 block">info@kavadpat.co.in</a>
                <a href="mailto:support@kavadpat.co.in" className="text-sm text-[#AD002E]/70 hover:text-[#AD002E] block">support@kavadpat.co.in</a>
              </div>
            </div>
          </div>
          {/* Map Placeholder */}
          <div className="relative w-full h-[260px] rounded-lg overflow-hidden border border-[#AD002E] bg-gradient-to-br from-rose-50 to-white flex flex-col items-center justify-center p-6 text-center shadow-md">
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#AD002E]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="z-10 space-y-4 max-w-sm">
              <CompassOutlined className="text-5xl text-[#AD002E]" />
              <h4 className="text-base font-bold text-[#AD002E]/70 uppercase tracking-wider">{t("contact.map_heading")}</h4>
              <p className="text-sm text-[#AD002E]/70 leading-relaxed">{t("contact.map_description")}</p>
              <a href="https://maps.google.com/?q=Ghole+Road+Shivajinagar+Pune" target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#AD002E] hover:bg-[#AD002E] text-white px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all">
                {t("contact.map_button")}
              </a>
            </div>
          </div>
        </div>

        {/* Center Column: Contact Form */}
        <div data-aos="fade-up" className="bg-white rounded-lg shadow-md border border-[#AD002E] p-6 sm:p-8">
          {locale === "mr" ? (
            <ContactFormMarathi />
          ) : (
            <>
              <h3 className="text-2xl font-bold text-[#AD002E]/70 mb-2">{t("contact.form_heading")}</h3>
              <p className="text-sm text-[#AD002E]/70 mb-6">{t("contact.form_description")}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#AD002E]/70 uppercase tracking-wider">{t("contact.label_name")}</label>
                  <input type="text" required name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.placeholder_name")} className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-3.5 py-2.5 text-base text-[#AD002E]/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD002E]/20 focus:border-[#AD002E] transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#AD002E]/70 uppercase tracking-wider">{t("contact.label_email")}</label>
                    <input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder={t("contact.placeholder_email")} className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-3.5 py-2.5 text-base text-[#AD002E]/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD002E]/20 focus:border-[#AD002E] transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#AD002E]/70 uppercase tracking-wider">{t("contact.label_phone")}</label>
                    <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} placeholder={t("contact.placeholder_phone")} className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-3.5 py-2.5 text-base text-[#AD002E]/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD002E]/20 focus:border-[#AD002E] transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#AD002E]/70 uppercase tracking-wider">{t("contact.label_subject")}</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-3.5 py-2.5 text-base text-[#AD002E]/70 focus:outline-none focus:ring-2 focus:ring-[#AD002E]/20 focus:border-[#AD002E] transition-colors">
                    <option value="inquiry">{t("contact.subject_general")}</option>
                    <option value="gold-loan">{t("contact.subject_gold_loan")}</option>
                    <option value="fixed-deposit">{t("contact.subject_fixed_deposit")}</option>
                    <option value="membership">{t("contact.subject_membership")}</option>
                    <option value="mobile-banking">{t("contact.subject_mobile_banking")}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#AD002E]/70 uppercase tracking-wider">{t("contact.label_message")}</label>
                  <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder={t("contact.placeholder_message")} className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-3.5 py-2.5 text-base text-[#AD002E]/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD002E]/20 focus:border-[#AD002E] transition-colors resize-none" />
                </div>
                <div className="flex gap-2 items-start text-sm text-[#AD002E]/70 leading-normal">
                  <InfoCircleOutlined className="text-[#AD002E] mt-0.5 shrink-0" />
                  <p>{t("contact.privacy_note")}</p>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#AD002E] hover:bg-[#AD002E]/90 text-white py-3 rounded-lg font-bold uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
                  {loading ? (<span>{t("contact.submitting")}</span>) : (<><SendOutlined /><span>{t("contact.submit")}</span></>)}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Right Column: Board Section */}
        <BoardSection />
      </section>

      {/* Quick Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
        <QuickContact />
      </div>
    </div>
  );
}
