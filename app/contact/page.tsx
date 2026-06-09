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

export default function Contact() {
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
      message.success("Thank you for contacting us! Our support desk will reach out within 24 business hours.");
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
    <div className="w-full bg-[#0B0B0F]">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#12121A] to-[#0B0B0F] border-b border-[rgba(255,255,255,0.04)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            Inquiries Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Reach out to our customer care desk, send us an email, or submit an online query below.
          </p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Contact info & Map */}
        <div data-aos="fade-right" className="space-y-8">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white">Central Operations Desk</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              If you have queries regarding account openings, gold loan valuations, or digital activation codes, feel free to contact our head office directly or drop by any of our branches.
            </p>
          </div>

          {/* Details list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="flex gap-3 items-start p-4 rounded-xl bg-[#12121A] border border-[rgba(255,255,255,0.04)]">
              <CompassOutlined className="text-lg text-[#F36B21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white text-xs uppercase tracking-wide">Main Head Office</h5>
                <p className="text-[11px] text-gray-400 mt-1 leading-normal">
                  Plot 42, Ghole Road, near Shivaji Nagar, Pune - 411005
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 rounded-xl bg-[#12121A] border border-[rgba(255,255,255,0.04)]">
              <ClockCircleOutlined className="text-lg text-[#F36B21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white text-xs uppercase tracking-wide">Working Hours</h5>
                <p className="text-[11px] text-gray-400 mt-1 leading-normal">
                  Monday - Saturday<br />
                  10:00 AM - 05:00 PM<br />
                  (2nd & 4th Sat Holidays)
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 rounded-xl bg-[#12121A] border border-[rgba(255,255,255,0.04)]">
              <PhoneOutlined className="text-lg text-[#F36B21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white text-xs uppercase tracking-wide">Direct Call Desk</h5>
                <a href="tel:+912025534567" className="text-[11px] text-gray-400 hover:text-white mt-1 block">
                  +91 20 2553 4567
                </a>
                <a href="tel:+912025534568" className="text-[11px] text-gray-400 hover:text-white block">
                  +91 20 2553 4568
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 rounded-xl bg-[#12121A] border border-[rgba(255,255,255,0.04)]">
              <MailOutlined className="text-lg text-[#F36B21] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white text-xs uppercase tracking-wide">Email Enquiries</h5>
                <a href="mailto:info@kavadpat.co.in" className="text-[11px] text-gray-400 hover:text-white mt-1 block">
                  info@kavadpat.co.in
                </a>
                <a href="mailto:support@kavadpat.co.in" className="text-[11px] text-gray-400 hover:text-white block">
                  support@kavadpat.co.in
                </a>
              </div>
            </div>

          </div>

          {/* Styled Map Placeholder Panel */}
          <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#12121A] flex flex-col items-center justify-center p-6 text-center shadow-xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#7B1010]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            
            <div className="z-10 space-y-4 max-w-sm">
              <CompassOutlined className="text-4xl text-[#F36B21]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Interactive Location Coordinates</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Click the route button to open the location mapping coordinates for our Pune Ghole Road headquarters on Google Maps.
              </p>
              <a
                href="https://maps.google.com/?q=Ghole+Road+Shivajinagar+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-[#7B1010] hover:bg-[#9c1a1a] border border-[#9c1a1a] hover:border-[#F36B21] text-white px-5 py-2 rounded text-xs font-black uppercase tracking-wider transition-all"
              >
                Open Google Maps Routing
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div data-aos="fade-left" className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
          
          <h3 className="text-xl font-bold text-white mb-2">Submit Online Inquiry</h3>
          <p className="text-xs text-gray-400 mb-6">
            Complete the form below, and our compliance officer or support staff will call/email you directly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-wider">Your Full Name</label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Patil"
                className="w-full bg-[#0B0B0F] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F36B21] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full bg-[#0B0B0F] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F36B21] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-wider">Mobile Number</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-[#0B0B0F] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F36B21] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-wider">Inquiry Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#0B0B0F] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F36B21] transition-colors"
              >
                <option value="inquiry">General Scheme Inquiry</option>
                <option value="gold-loan">Gold Loan Request</option>
                <option value="fixed-deposit">Fixed Deposit Opening</option>
                <option value="membership">Membership Registration</option>
                <option value="mobile-banking">Mobile Banking Assistance</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-wider">Describe Your Query</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Details of your request..."
                className="w-full bg-[#0B0B0F] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F36B21] transition-colors resize-none"
              />
            </div>

            {/* Privacy note */}
            <div className="flex gap-2 items-start text-[11px] text-gray-500 leading-normal">
              <InfoCircleOutlined className="text-[#F36B21] mt-0.5 shrink-0" />
              <p>Your details are secured under state data compliance directives. We never share phone contact data with marketing companies.</p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7B1010] to-[#9c1a1a] hover:from-[#9c1a1a] hover:to-[#7B1010] border border-[#9c1a1a] hover:border-[#F36B21] text-white py-3 rounded-lg font-black uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg glow-maroon"
            >
              {loading ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <SendOutlined />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}
