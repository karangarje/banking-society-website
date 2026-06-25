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
  seniorCitizenRate: number | null;
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
    form.setFieldsValue({
      ...record,
      interestRate: record.rate !== undefined ? Number(record.rate) : undefined,
    });
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
      render: (text) => <span className="font-semibold text-[#AD002E]/70">{text}</span>,
    },
    {
      title: "Scheme Name MR",
      dataIndex: "schemeNameMr",
      key: "schemeNameMr",
      render: (text) => <span className="text-[#AD002E]/70">{text}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${type === "DEPOSIT" ? "bg-[#AD002E]/5 text-[#AD002E]" : "bg-[#AD002E]/5 text-[#AD002E]"}`}>
          {type}
        </span>
      ),
    },
    {
      title: "Interest Rate",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => <span className="font-bold text-[#AD002E]">{Number(rate).toFixed(2)}% p.a.</span>,
    },
    {
      title: "Senior Citizen Rate",
      dataIndex: "seniorCitizenRate",
      key: "seniorCitizenRate",
      render: (val, record) => {
        const rateVal = val !== undefined && val !== null ? Number(val) : Number(record.rate);
        return <span className="font-bold text-[#AD002E]">{rateVal.toFixed(2)}% p.a.</span>;
      },
    },
    {
      title: "Tenure",
      key: "tenure",
      render: (_, record) => (
        <div className="flex flex-col text-sm text-[#AD002E]/70">
          <span>{record.durationEn}</span>
          <span className="text-xs text-[#AD002E]/70">{record.durationMr}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${active ? "bg-[#AD002E]/5 text-[#AD002E]" : "bg-[#AD002E]/5 text-[#AD002E]"}`}>
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
            icon={<EditOutlined className="text-[#AD002E] hover:text-[#AD002E]" />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Delete this interest rate scheme?"
            description="Are you sure you want to delete this interest rate permanently?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
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
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20">
        <div>
          <h1 className="text-2xl font-bold text-[#AD002E]/70">Interest Rate Management</h1>
          <p className="text-sm text-[#AD002E]/70">Configure and publish deposit and loan interest rate schemes.</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchData} className="border-[#AD002E]/20 hover:border-[#AD002E] hover:text-[#AD002E]" />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddModal}
            style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
            className="hover:opacity-90"
          >
            Add Interest Rate
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Deposit Rates</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{depositRatesCount} Schemes</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Loan Rates</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{loanRatesCount} Schemes</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Active Schemes</div>
            <div className="text-3xl font-bold text-[#AD002E] mt-2">{totalActive}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Last Updated</div>
            <div className="text-xl font-bold text-[#AD002E]/70 mt-3">{lastUpdatedText}</div>
          </Card>
        </Col>
      </Row>

      {/* Main Table with Tabs */}
      <Card className="shadow-md border border-[#AD002E]/20">
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
                <p className="text-[#AD002E]/70 mb-4">No interest rate schemes found in this category.</p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openAddModal}
                  style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
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
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
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
              <Form.Item name="interestRate" label="Interest Rate (% p.a.)" rules={[{ required: true, message: "Interest rate is required" }]}>
                <InputNumber min={0} max={100} step={0.01} style={{ width: "100%" }} placeholder="e.g. 7.50" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="seniorCitizenRate" label="Senior Citizen Rate (% p.a.)">
                <InputNumber min={0} max={100} step={0.01} style={{ width: "100%" }} placeholder="e.g. 8.50" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 1" />
              </Form.Item>
            </Col>
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
