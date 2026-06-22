"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Tag, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

const { Option } = Select;

interface CMSSettingRow {
  id: string;
  key: string;
  valueEn: string;
  valueMr: string;
  group: string;
  createdAt: string;
}

export default function CMSPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = useState<CMSSettingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CMSSettingRow | null>(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cms");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load CMS settings");
      }
    } catch (err) {
      message.error("An error occurred while loading CMS settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchData();
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return <div style={{ padding: "2rem" }}><h1>Loading...</h1></div>;
  }

  if (!session) {
    return <div style={{ padding: "2rem" }}><h1>403 - Access Denied</h1></div>;
  }

  const openAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record: CMSSettingRow) => {
    setEditingItem(record);
    form.setFieldsValue({
      key: record.key,
      valueEn: record.valueEn,
      valueMr: record.valueMr,
      group: record.group,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const res = await fetch("/api/admin/cms", {
        method: "POST", // Upsert route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        message.success("CMS Setting saved successfully");
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to save CMS setting");
      }
    } catch (err) {
      // validation error
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/cms/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("CMS Setting deleted successfully");
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete CMS setting");
      }
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const columns: ColumnsType<CMSSettingRow> = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      render: (v) => <code style={{ color: "#AD002E", fontWeight: "bold" }}>{v}</code>,
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      render: (v) => <Tag color="blue">{v.toUpperCase()}</Tag>,
    },
    {
      title: "English Value",
      dataIndex: "valueEn",
      key: "valueEn",
      ellipsis: true,
      render: (v) => <span style={{ whiteSpace: "pre-wrap" }}>{v}</span>,
    },
    {
      title: "Marathi Value",
      dataIndex: "valueMr",
      key: "valueMr",
      ellipsis: true,
      render: (v) => <span style={{ whiteSpace: "pre-wrap" }}>{v}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Delete this setting?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Website Content (CMS) Settings</h1>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchData} />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
            Add Content Key
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 15 }}
      />

      <Modal
        title={editingItem ? "Edit Content Key" : "Add Content Key"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        width={700}
        okText="Save"
      >
        <Form form={form} layout="vertical" style={{ marginTop: "1rem" }}>
          <Form.Item name="key" label="Key (Unique code used in code lookup, e.g. 'home.hero.title')" rules={[{ required: true }]}>
            <Input disabled={editingItem !== null} placeholder="e.g. contact.phone" />
          </Form.Item>
          <Form.Item name="group" label="Group" rules={[{ required: true }]}>
            <Select placeholder="Select content category">
              <Option value="general">General</Option>
              <Option value="home">Home Page</Option>
              <Option value="about">About Page</Option>
              <Option value="services">Services / Loans</Option>
              <Option value="contact">Contact Details</Option>
            </Select>
          </Form.Item>
          <Form.Item name="valueEn" label="English Content" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="English translation..." />
          </Form.Item>
          <Form.Item name="valueMr" label="Marathi Content" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Marathi translation..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
