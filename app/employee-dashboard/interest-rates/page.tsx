"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Switch, message, Popconfirm, Space, Card, Row, Col, Tabs, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface InterestRateRow {
  id: string;
  type: "DEPOSIT" | "LOAN";
  schemeNameEn: string;
  schemeNameMr: string;
  durationEn: string;
  durationMr: string;
  rate: number;
  isActive: boolean;
  sortingOrder: number;
  updatedAt: string;
}

export default function InterestRatesPage() {
  const [data, setData] = useState<InterestRateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("DEPOSIT");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/interest-rates");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load interest rates");
      }
    } catch (err) {
      message.error("Failed to load interest rates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        isActive: values.isActive ?? true,
        sortingOrder: values.sortingOrder || 0,
      };

      const url = editingId ? `/api/admin/interest-rates/${editingId}` : "/api/admin/interest-rates";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success(`Interest rate ${editingId ? "updated" : "added"} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/interest-rates/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Interest rate deleted successfully");
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete");
      }
    } catch (err) {
      message.error("Failed to delete interest rate");
    }
  };

  const openAddModal = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true, sortingOrder: 0, type: activeTab });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: InterestRateRow) => {
    form.setFieldsValue(record);
    setEditingId(record.id);
    setIsModalOpen(true);
  };

  // Filter data based on selected tab
  const filteredData = data.filter((item) => item.type === activeTab);

  // Statistics
  const depositRatesCount = data.filter((item) => item.type === "DEPOSIT" && item.isActive).length;
  const loanRatesCount = data.filter((item) => item.type === "LOAN" && item.isActive).length;
  const totalActive = data.filter((item) => item.isActive).length;
  
  const lastUpdatedText = data.length > 0 
    ? new Date(Math.max(...data.map(d => new Date(d.updatedAt).getTime()))).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "No Data";

  const columns: ColumnsType<InterestRateRow> = [
    {
      title: "Scheme Name EN",
      dataIndex: "schemeNameEn",
      key: "schemeNameEn",
      render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: "Scheme Name MR",
      dataIndex: "schemeNameMr",
      key: "schemeNameMr",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${type === "DEPOSIT" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
          {type}
        </span>
      ),
    },
    {
      title: "Interest Rate",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => <span className="font-bold text-[#B3003C]">{Number(rate).toFixed(2)}% p.a.</span>,
    },
    {
      title: "Tenure",
      key: "tenure",
      render: (_, record) => (
        <div className="flex flex-col text-sm text-gray-600">
          <span>{record.durationEn}</span>
          <span className="text-xs text-gray-400">{record.durationMr}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Sort Order",
      dataIndex: "sortingOrder",
      key: "sortingOrder",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined className="text-blue-600 hover:text-blue-800" />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Delete this interest rate scheme?"
            description="Are you sure you want to delete this interest rate permanently?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { backgroundColor: "#B3003C", borderColor: "#B3003C" } }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = [
    { key: "DEPOSIT", label: "Deposits Interest Rates" },
    { key: "LOAN", label: "Loans Interest Rates" },
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Interest Rate Management</h1>
          <p className="text-sm text-gray-500">Configure and publish deposit and loan interest rate schemes.</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchData} className="border-gray-300 hover:border-[#B3003C] hover:text-[#B3003C]" />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddModal}
            style={{ backgroundColor: "#B3003C", borderColor: "#B3003C" }}
            className="hover:opacity-90"
          >
            Add Interest Rate
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Deposit Rates</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{depositRatesCount} Schemes</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Loan Rates</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{loanRatesCount} Schemes</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Active Schemes</div>
            <div className="text-3xl font-bold text-[#B3003C] mt-2">{totalActive}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Last Updated</div>
            <div className="text-xl font-bold text-gray-700 mt-3">{lastUpdatedText}</div>
          </Card>
        </Col>
      </Row>

      {/* Main Table with Tabs */}
      <Card className="shadow-sm border border-gray-100">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="mb-4"
        />

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          locale={{
            emptyText: (
              <div className="py-8 text-center">
                <p className="text-gray-400 mb-4">No interest rate schemes found in this category.</p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openAddModal}
                  style={{ backgroundColor: "#B3003C", borderColor: "#B3003C" }}
                >
                  Create Interest Rate
                </Button>
              </div>
            ),
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingId ? "Edit Interest Rate Scheme" : "Add Interest Rate Scheme"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText={editingId ? "Save Changes" : "Create Scheme"}
        okButtonProps={{ style: { backgroundColor: "#B3003C", borderColor: "#B3003C" } }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="type" label="Scheme Type" rules={[{ required: true, message: "Select a scheme type" }]}>
            <Select placeholder="Select Type">
              <Select.Option value="DEPOSIT">Deposit Rate</Select.Option>
              <Select.Option value="LOAN">Loan Rate</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="schemeNameEn" label="Scheme Name (English)" rules={[{ required: true, message: "English name is required" }]}>
            <Input placeholder="e.g. Fixed Deposit (General)" />
          </Form.Item>
          <Form.Item name="schemeNameMr" label="Scheme Name (Marathi)" rules={[{ required: true, message: "Marathi name is required" }]}>
            <Input placeholder="e.g. मुदत ठेव (साधारण)" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="durationEn" label="Tenure / Duration (English)" rules={[{ required: true, message: "English duration is required" }]}>
                <Input placeholder="e.g. 1 Year to 2 Years" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="durationMr" label="Tenure / Duration (Marathi)" rules={[{ required: true, message: "Marathi duration is required" }]}>
                <Input placeholder="e.g. १ वर्ष ते २ वर्षे" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="rate" label="Interest Rate (% p.a.)" rules={[{ required: true, message: "Interest rate is required" }]}>
                <InputNumber min={0} max={100} step={0.01} style={{ width: "100%" }} placeholder="e.g. 7.50" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 1" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="isActive" label="Active Status" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
