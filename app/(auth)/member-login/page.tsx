"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { message } from "antd";
import Link from "next/link";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function MemberLogin() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t, locale } = useLanguage();
  const isMr = locale === "mr";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("member-login", {
        redirect: false,
        memberId,
        password,
      });

      if (res?.error) {
        message.error(res.error);
      } else {
        message.success(isMr ? "लॉगिन यशस्वी झाले!" : "Login successful!");
        router.push("/member-dashboard");
      }
    } catch (error) {
      message.error(isMr ? "लॉगिन करताना त्रुटी आली" : "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-bg p-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl shadow-xl border border-base-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-text-main mb-2">
            {t("nav.member_portal_login") || "Member Portal"}
          </h1>
          <p className="text-sm text-text-muted">
            {isMr ? "तुमच्या खात्यात प्रवेश करण्यासाठी लॉगिन करा" : "Secure access to your banking dashboard"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-text-muted mb-1.5">
              {t("nav.member_id") || "Member ID"}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdcardOutlined className="text-text-muted" />
              </span>
              <input
                type="text"
                required
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-base-card border border-base-border rounded-xl focus:border-[#AD002E] focus:ring-1 focus:ring-[#AD002E] outline-none transition-colors"
                placeholder="e.g. BK-100254"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-text-muted mb-1.5">
              {t("nav.password") || "Password"}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockOutlined className="text-text-muted" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-base-card border border-base-border rounded-xl focus:border-[#AD002E] focus:ring-1 focus:ring-[#AD002E] outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#AD002E] hover:bg-[#850024] disabled:opacity-70 text-white font-black py-3.5 rounded-xl uppercase tracking-wider transition-colors shadow-md"
          >
            {loading ? (isMr ? "प्रमाणित करत आहे..." : "Authenticating...") : (t("nav.access_portal") || "Access Portal")}
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center text-text-muted border-t border-base-border pt-6">
          {t("nav.portal_contact_msg") || "Don't have access? Contact your nearest branch for credentials."}
        </p>
      </div>
    </div>
  );
}
