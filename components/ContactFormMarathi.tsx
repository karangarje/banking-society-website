"use client";

import React, { useState } from "react";

export default function ContactFormMarathi() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "सामान्य चौकशी",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("फॉर्म डेटा:", form);
    alert("तुमची चौकशी यशस्वीरित्या पाठवली गेली आहे!");
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
            <option>सामान्य चौकशी</option>
            <option>कर्ज संबंधित चौकशी</option>
            <option>खाते उघडणे</option>
            <option>शाखा माहिती</option>
          </select>
        </div>

        {/* संदेश */}
        <div>
          <label className="text-sm text-text-muted font-bold">तुमचा संदेश</label>
          <textarea
            name="message"
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
          className="w-full bg-[#AD002E] hover:bg-[#AD002E] text-white transition p-3 rounded-lg font-bold uppercase tracking-wider shadow-md"
        >
          चौकशी पाठवा
        </button>
      </form>
    </div>
  );
}
