"use client";

import React, { useState } from "react";
import { UploadOutlined, InfoCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { message } from "antd";

export default function ApplyLoanPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    loanType: "Personal Loan",
    amount: "",
    tenure: "12",
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#AD002E]/70">Apply for a New Loan</h1>
        <p className="text-sm text-[#AD002E]/70 mt-1">Fill out the details to submit your application</p>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white -z-10 -translate-y-1/2 rounded-lg" />
        <div className={`absolute top-1/2 left-0 h-1 bg-[#AD002E] -z-10 -translate-y-1/2 rounded-lg transition-all duration-300 ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`} />
        
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#AD002E] text-white' : 'bg-white text-[#AD002E]/70'}`}>1</div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#AD002E] text-white' : 'bg-white text-[#AD002E]/70'}`}>2</div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-[#AD002E] text-white' : 'bg-white text-[#AD002E]/70'}`}>3</div>
      </div>

      {step === 1 && (
        <form onSubmit={handleNext} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-[#AD002E]/20 space-y-6">
          <h2 className="text-xl font-bold text-[#AD002E]/70 mb-6">Loan Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#AD002E]/70 mb-2">
                Loan Category
              </label>
              <select 
                required
                value={formData.loanType}
                onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-4 py-3 outline-none focus:border-[#AD002E] focus:ring-1 focus:ring-[#AD002E] transition-all"
              >
                <option>Personal Loan</option>
                <option>Vehicle Loan</option>
                <option>Gold Loan</option>
                <option>Business Loan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#AD002E]/70 mb-2">
                Requested Amount (₹)
              </label>
              <input 
                type="number" 
                required
                min="10000"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-4 py-3 outline-none focus:border-[#AD002E] focus:ring-1 focus:ring-[#AD002E] transition-all"
                placeholder="e.g. 500000"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#AD002E]/70 mb-2">
                Tenure (Months)
              </label>
              <select 
                required
                value={formData.tenure}
                onChange={(e) => setFormData({...formData, tenure: e.target.value})}
                className="w-full bg-white border border-[#AD002E]/20 rounded-lg px-4 py-3 outline-none focus:border-[#AD002E] focus:ring-1 focus:ring-[#AD002E] transition-all"
              >
                <option value="12">12 Months (1 Year)</option>
                <option value="24">24 Months (2 Years)</option>
                <option value="36">36 Months (3 Years)</option>
                <option value="60">60 Months (5 Years)</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-[#AD002E]/20 flex justify-end">
            <button type="submit" className="bg-[#AD002E] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#AD002E] transition-colors">
              Next Step
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-[#AD002E]/20 space-y-6">
          <h2 className="text-xl font-bold text-[#AD002E]/70 mb-6">Upload Documents</h2>
          
          <div className="bg-[#AD002E]/5 border border-[#AD002E] p-4 rounded-lg flex gap-3 text-[#AD002E] text-sm mb-6">
            <InfoCircleOutlined className="text-lg mt-0.5" />
            <div>
              <p className="font-bold mb-1">Important Instructions</p>
              <p>Please upload clear, legible copies of your documents. Allowed formats: PDF, JPG, PNG (Max 5MB each).</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-dashed border-[#AD002E]/20 rounded-lg p-6 text-center hover:bg-white transition-colors">
              <UploadOutlined className="text-3xl text-[#AD002E]/70 mb-3" />
              <p className="font-bold text-[#AD002E]/70">Aadhaar Card / Identity Proof</p>
              <p className="text-xs text-[#AD002E]/70 mt-1 mb-4">Front and back sides</p>
              <input type="file" className="text-sm" accept=".pdf,.jpg,.jpeg,.png" required />
            </div>

            <div className="border border-dashed border-[#AD002E]/20 rounded-lg p-6 text-center hover:bg-white transition-colors">
              <UploadOutlined className="text-3xl text-[#AD002E]/70 mb-3" />
              <p className="font-bold text-[#AD002E]/70">Income Proof / ITR</p>
              <p className="text-xs text-[#AD002E]/70 mt-1 mb-4">Latest 3 months salary slip or ITR</p>
              <input type="file" className="text-sm" accept=".pdf,.jpg,.jpeg,.png" required />
            </div>
          </div>

          <div className="pt-6 border-t border-[#AD002E]/20 flex justify-between">
            <button type="button" onClick={handleBack} className="text-[#AD002E]/70 px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-colors">
              Back
            </button>
            <button type="submit" disabled={loading} className="bg-[#AD002E] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#AD002E] transition-colors disabled:opacity-70 flex items-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-[#AD002E]/20 border-t-white rounded-full animate-spin" />}
              Submit Application
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="bg-white p-12 rounded-lg shadow-md border border-[#AD002E]/20 text-center space-y-4">
          <div className="w-20 h-20 bg-[#AD002E]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleOutlined className="text-4xl text-[#AD002E]" />
          </div>
          <h2 className="text-2xl font-bold text-[#AD002E]/70">Application Submitted!</h2>
          <p className="text-[#AD002E]/70 max-w-md mx-auto">
            Your loan application for <strong>{formData.loanType}</strong> has been successfully submitted. Your application ID is <strong>APP-{Math.floor(1000 + Math.random() * 9000)}</strong>.
          </p>
          <div className="pt-8">
            <button onClick={() => window.location.href='/member-dashboard'} className="bg-white text-[#AD002E] border border-[#AD002E] px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#AD002E] hover:text-white transition-colors">
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
