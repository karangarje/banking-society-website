"use client";

import React, { useState } from "react";
import { message } from "antd";

export default function ContactFormMarathi() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "सामान्य चौकशी",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          fullName: form.name,
          email: form.email,
          mobileNumber: form.mobile,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (res.ok) {
        message.success("तुमची चौकशी यशस्वीरित्या पाठवली गेली आहे!");
        setForm({
          name: "",
          email: "",
          mobile: "",
          subject: "सामान्य चौकशी",
          message: "",
        });
      } else {
        const errData = await res.json();
        message.error(errData.message || "चौकशी पाठवण्यात त्रुटी आली.");
      }
    } catch (err) {
      message.error("काहीतरी त्रुटी आली. कृपया नंतर पुन्हा प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-[#FFFFFF] text-text-main rounded-lg p-6 border border-[#AD002E]/20 shadow-md">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-1">ऑनलाईन चौकशी पाठवा</h2>
      <p className="text-base text-text-muted mb-6">
        खालील फॉर्म भरा आणि आमची टीम तुमच्याशी संपर्क साधेल.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* नाव */}
        <div>
          <label className="text-sm text-text-muted font-bold">पूर्ण नाव</label>
          <input
            type="text"
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="उदा. रमेश पाटील"
            className="w-full mt-1 p-3 rounded-lg bg-white border border-[#AD002E]/20 focus:border-[#AD002E] outline-none text-text-main shadow-md"
          />
        </div>

        {/* ईमेल + मोबाईल */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-text-muted font-bold">ईमेल पत्ता</label>
            <input
              type="email"
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
              className="w-full mt-1 p-3 rounded-lg bg-white border border-[#AD002E]/20 focus:border-[#AD002E] outline-none text-text-main shadow-md"
            />
          </div>

          <div>
            <label className="text-sm text-text-muted font-bold">मोबाईल क्रमांक</label>
            <input
              type="tel"
              required
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full mt-1 p-3 rounded-lg bg-white border border-[#AD002E]/20 focus:border-[#AD002E] outline-none text-text-main shadow-md"
            />
          </div>

        </div>

        {/* विषय */}
        <div>
          <label className="text-sm text-text-muted font-bold">विषय निवडा</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-white border border-[#AD002E]/20 focus:border-[#AD002E] outline-none text-text-main shadow-md"
          >
            <option value="सामान्य चौकशी">सामान्य चौकशी</option>
            <option value="कर्ज संबंधित चौकशी">कर्ज संबंधित चौकशी</option>
            <option value="खाते उघडणे">खाते उघडणे</option>
            <option value="शाखा माहिती">शाखा माहिती</option>
          </select>
        </div>

        {/* संदेश */}
        <div>
          <label className="text-sm text-text-muted font-bold">तुमचा संदेश</label>
          <textarea
            name="message"
            required
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="तुमच्या चौकशीचे तपशील लिहा..."
            className="w-full mt-1 p-3 rounded-lg bg-white border border-[#AD002E]/20 focus:border-[#AD002E] outline-none text-text-main shadow-md"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#AD002E] hover:bg-[#AD002E]/90 text-white transition p-3 rounded-lg font-bold uppercase tracking-wider shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "पाठवत आहे..." : "चौकशी पाठवा"}
        </button>
      </form>
    </div>
  );
}
