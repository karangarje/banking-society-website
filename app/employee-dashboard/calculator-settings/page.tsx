"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, message, Spin, Space } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

const { Option } = Select;

export default function CalculatorSettingsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/calculator-settings");
      if (res.ok) {
        const data = await res.json();
        form.setFieldsValue({
          titleEn: data.titleEn,
          titleMr: data.titleMr,
          subtitleEn: data.subtitleEn,
          subtitleMr: data.subtitleMr,
          defaultAmount: parseFloat(data.defaultAmount),
          defaultInterestRate: parseFloat(data.defaultInterestRate),
          defaultTenure: data.defaultTenure,
          emiType: data.emiType,
        });
      } else {
        message.error("Failed to load calculator settings");
      }
    } catch (err) {
      message.error("An error occurred while fetching calculator settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchSettings();
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return <div style={{ padding: "2rem" }}><h1>Loading...</h1></div>;
  }

  if (!session) {
    return <div style={{ padding: "2rem" }}><h1>403 - Access Denied</h1></div>;
  }

  const onFinish = async (values: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/calculator-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        message.success("Calculator settings updated successfully");
        fetchSettings();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to update settings");
      }
    } catch (err) {
      message.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff", minHeight: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Loan Calculator Settings</h1>
        <Button icon={<ReloadOutlined />} onClick={fetchSettings} disabled={loading} />
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Card bordered={true} style={{ maxWidth: 800 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ emiType: "MONTHLY" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Form.Item name="titleEn" label="Calculator Title (English)" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="titleMr" label="Calculator Title (Marathi)" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Form.Item name="subtitleEn" label="Calculator Subtitle (English)" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="subtitleMr" label="Calculator Subtitle (Marathi)" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <Form.Item name="defaultAmount" label="Default Principal Amount (₹)" rules={[{ required: true }]}>
                <Input type="number" step="1000" />
              </Form.Item>
              <Form.Item name="defaultInterestRate" label="Default Interest Rate (%)" rules={[{ required: true }]}>
                <Input type="number" step="0.1" />
              </Form.Item>
              <Form.Item name="defaultTenure" label="Default Tenure (Months)" rules={[{ required: true }]}>
                <Input type="number" step="1" />
              </Form.Item>
            </div>

            <Form.Item name="emiType" label="EMI Installment Schedule" rules={[{ required: true }]}>
              <Select>
                <Option value="MONTHLY">Monthly (Standard)</Option>
                <Option value="WEEKLY">Weekly</Option>
                <Option value="DAILY">Daily</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
                Save Configuration
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
}
