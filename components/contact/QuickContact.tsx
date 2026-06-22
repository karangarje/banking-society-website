import React from "react";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

export default function QuickContact() {
  return (
    <section className="mt-12 bg-white rounded-3xl shadow-xl border border-rose-100 p-6" data-aos="fade-up">
      <h3 className="text-lg font-semibold mb-2">Need Immediate Help?</h3>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#B3003C] text-white py-2 rounded-md hover:bg-[#92002f] transition">
          <PhoneOutlined /> Call Us
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-[#B3003C] text-[#B3003C] py-2 rounded-md hover:bg-[#B3003C] hover:text-white transition">
          <MailOutlined /> Email Us
        </button>
      </div>
    </section>
  );
}
