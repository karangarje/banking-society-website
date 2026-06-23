import React from "react";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

export default function QuickContact() {
  return (
    <section className="mt-12 bg-white rounded-lg shadow-md border border-[#AD002E] p-6" data-aos="fade-up">
      <h3 className="text-lg font-semibold mb-2">Need Immediate Help?</h3>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#AD002E] text-white py-2 rounded-lg hover:bg-[#AD002E] transition">
          <PhoneOutlined /> Call Us
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-[#AD002E] text-[#AD002E] py-2 rounded-lg hover:bg-[#AD002E] hover:text-white transition">
          <MailOutlined /> Email Us
        </button>
      </div>
    </section>
  );
}
