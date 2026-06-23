"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Switch, Select, DatePicker, message, Popconfirm, Space, Card, Row, Col, Tag } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, EditOutlined, PushpinOutlined, CalendarOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface NewsRow {
  id: string;
  titleEn: string;
  titleMr: string;
  contentEn: string;
  contentMr: string;
  isPinned: boolean;
  scheduledPublish: string | null;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
}

export default function NewsPage() {
  const [data, setData] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load news");
      }
    } catch (err) {
      message.error("Failed to load news");
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
        isPinned: values.isPinned ?? false,
        status: values.status ?? "PUBLISHED",
        scheduledPublish: values.scheduledPublish ? values.scheduledPublish.toISOString() : null,
      };

      const url = editingId ? `/api/admin/news/${editingId}` : "/api/admin/news";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success(`News article ${editingId ? "updated" : "published"} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save news");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("News deleted successfully");
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete");
      }
    } catch (err) {
      message.error("Failed to delete news");
    }
  };

  const openAddModal = () => {
    form.resetFields();
    form.setFieldsValue({ isPinned: false, status: "PUBLISHED" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: NewsRow) => {
    form.setFieldsValue({
      ...record,
      scheduledPublish: record.scheduledPublish ? dayjs(record.scheduledPublish) : null,
    });
    setEditingId(record.id);
    setIsModalOpen(true);
  };

  // Filter list
  const filteredData = data.filter((item) =>
    item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contentEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics
  const totalNews = data.length;
  const pinnedCount = data.filter((n) => n.isPinned).length;
  const publishedCount = data.filter((n) => n.status === "PUBLISHED").length;
  const scheduledCount = data.filter((n) => n.scheduledPublish && new Date(n.scheduledPublish) > new Date()).length;

  const columns: ColumnsType<NewsRow> = [
    {
      title: "Title & Contents",
      key: "details",
      render: (_, record) => (
        <div className="flex flex-col max-w-xl">
          <div className="flex items-center gap-2">
            {record.isPinned && <PushpinOutlined className="text-[#AD002E] font-bold" />}
            <span className="font-bold text-[#AD002E]/70 text-base">{record.titleEn}</span>
          </div>
          <span className="text-xs text-[#AD002E]/70 mt-1">{record.titleMr}</span>
          <p className="text-xs text-[#AD002E]/70 line-clamp-2 mt-1">{record.contentEn}</p>
        </div>
      ),
    },
    {
      title: "Publish Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const isScheduledFuture = record.scheduledPublish && new Date(record.scheduledPublish) > new Date();
        if (isScheduledFuture) {
          return (
            <Tag color="blue" icon={<CalendarOutlined />} className="px-2 py-0.5 rounded-full border-0 font-semibold">
              Scheduled
            </Tag>
          );
        }
        return (
          <Tag color={status === "PUBLISHED" ? "green" : "warning"} className="px-2 py-0.5 rounded-full border-0 font-semibold">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Date Info",
      key: "dateInfo",
      render: (_, record) => (
        <div className="flex flex-col text-xs text-[#AD002E]/70">
          <span>Created: {new Date(record.createdAt).toLocaleDateString()}</span>
          {record.scheduledPublish && (
            <span className="text-[#AD002E] font-normal">Publish: {new Date(record.scheduledPublish).toLocaleDateString()}</span>
          )}
        </div>
      ),
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
            title="Delete this news item?"
            description="Are you sure you want to delete this news notice permanently?"
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

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20">
        <div>
          <h1 className="text-2xl font-bold text-[#AD002E]/70">News & Notices Management</h1>
          <p className="text-sm text-[#AD002E]/70">Publish flash announcements, press releases, circular summaries, and pin important notices.</p>
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
            Create Notice / News
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Total Notices</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{totalNews}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Pinned Notices</div>
            <div className="text-3xl font-bold text-[#AD002E] mt-2">{pinnedCount}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Published</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{publishedCount}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Scheduled</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{scheduledCount}</div>
          </Card>
        </Col>
      </Row>

      {/* Filter and Table */}
      <Card className="shadow-md border border-[#AD002E]/20">
        <div className="mb-4">
          <Input.Search
            placeholder="Search news and notices by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: 400 }}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          locale={{
            emptyText: (
              <div className="py-8 text-center">
                <p className="text-[#AD002E]/70 mb-4">No news notices found matching your criteria.</p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openAddModal}
                  style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
                >
                  Create News / Notice
                </Button>
              </div>
            ),
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingId ? "Edit News Notice" : "Create News Notice"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText={editingId ? "Save Changes" : "Publish / Schedule"}
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
        width={750}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="titleEn" label="Notice Title (English)" rules={[{ required: true, message: "English title is required" }]}>
                <Input placeholder="e.g. Bank Holiday announcement on Diwali festival" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="titleMr" label="Notice Title (Marathi)" rules={[{ required: true, message: "Marathi title is required" }]}>
                <Input placeholder="e.g. दिवाळी सणानिमित्त बँक सुट्टीची घोषणा" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="contentEn" label="Notice Content (English)" rules={[{ required: true, message: "English content is required" }]}>
                <Input.TextArea rows={5} placeholder="English notice text details..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="contentMr" label="Notice Content (Marathi)" rules={[{ required: true, message: "Marathi content is required" }]}>
                <Input.TextArea rows={5} placeholder="मराठी नोटीस तपशील..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="status" label="Publishing Status" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="PUBLISHED">Published</Select.Option>
                  <Select.Option value="DRAFT">Draft</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="scheduledPublish" label="Schedule Publish Date (Optional)">
                <DatePicker style={{ width: "100%" }} placeholder="Select date & time" showTime />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isPinned" label="Pin Notice on Homepage" valuePropName="checked">
                <Switch checkedChildren="Pinned" unCheckedChildren="Normal" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
