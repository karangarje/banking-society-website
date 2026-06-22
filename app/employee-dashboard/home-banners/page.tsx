"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Switch, App, Popconfirm, Image, Tag, Space, Upload, Card, Row, Col, InputNumber } from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface HomeBannerRow {
  id: string;
  titleEn: string;
  titleMr: string;
  subtitleEn: string;
  subtitleMr: string;
  imageUrl: string;
  linkUrl: string | null;
  isActive: boolean;
  sortingOrder: number;
  updatedAt: string;
}

export default function HomeBannersPage() {
  const [data, setData] = useState<HomeBannerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/home-banners");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load banners");
      }
    } catch (err) {
      message.error("Failed to load banners");
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
      let finalImageUrl = editingId ? (data.find(b => b.id === editingId)?.imageUrl || "") : "";

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.url) {
          finalImageUrl = file.url;
        } else if (file.originFileObj) {
          setUploading(true);
          const formData = new FormData();
          formData.append("file", file.originFileObj);

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            const errJson = await uploadRes.json();
            throw new Error(errJson.message || "Upload failed");
          }
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        }
      }

      if (!finalImageUrl) {
        message.error("Please upload an image from your PC");
        return;
      }

      const payload = { 
        ...values, 
        imageUrl: finalImageUrl,
        isActive: values.isActive ?? true,
        sortingOrder: values.sortingOrder || 0,
      };

      const url = editingId ? `/api/admin/home-banners/${editingId}` : "/api/admin/home-banners";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success(`Banner ${editingId ? "updated" : "added"} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save banner");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/home-banners/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Banner deleted successfully");
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete");
      }
    } catch (err) {
      message.error("Failed to delete banner");
    }
  };

  const openAddModal = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true, sortingOrder: 0 });
    setFileList([]);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: HomeBannerRow) => {
    form.setFieldsValue(record);
    setFileList([
      {
        uid: "-1",
        name: "banner-image.jpg",
        status: "done",
        url: record.imageUrl,
      },
    ]);
    setEditingId(record.id);
    setIsModalOpen(true);
  };

  // Stats calculations
  const totalBanners = data.length;
  const activeBanners = data.filter((b) => b.isActive).length;
  const linkBanners = data.filter((b) => b.linkUrl).length;
  const lastUpdatedText = data.length > 0
    ? new Date(Math.max(...data.map(d => new Date(d.updatedAt).getTime()))).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "No Data";

  const columns: ColumnsType<HomeBannerRow> = [
    {
      title: "Preview",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => (
        <Image
          src={url}
          alt="banner"
          width={120}
          height={60}
          style={{ objectFit: "cover", borderRadius: 6 }}
          fallback="/placeholder.png"
        />
      ),
    },
    {
      title: "Banner Details (EN)",
      key: "detailsEn",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{record.titleEn}</span>
          <span className="text-xs text-gray-500">{record.subtitleEn}</span>
          {record.linkUrl && <span className="text-xs text-blue-500 font-medium mt-1">Link: {record.linkUrl}</span>}
        </div>
      ),
    },
    {
      title: "Banner Details (MR)",
      key: "detailsMr",
      render: (_, record) => (
        <div className="flex flex-col text-sm">
          <span className="text-gray-700">{record.titleMr}</span>
          <span className="text-xs text-gray-400">{record.subtitleMr}</span>
        </div>
      ),
    },
    {
      title: "Sort Order",
      dataIndex: "sortingOrder",
      key: "sortingOrder",
      render: (val) => <span className="font-bold text-gray-700">{val}</span>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => (
        <Tag color={active ? "green" : "red"} className="font-semibold px-2 py-0.5 rounded-full border-0">
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
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
            title="Delete this banner?"
            description="Are you sure you want to delete this home banner?"
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

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Home Banner Manager</h1>
          <p className="text-sm text-gray-500">Add, upload, and sort images for the public website homepage slider.</p>
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
            Add Home Banner
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Total Banners</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{totalBanners}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Active Banners</div>
            <div className="text-3xl font-bold text-[#B3003C] mt-2">{activeBanners}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Linked Banners</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{linkBanners}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Last Updated</div>
            <div className="text-xl font-bold text-gray-700 mt-3">{lastUpdatedText}</div>
          </Card>
        </Col>
      </Row>

      {/* Banner Table */}
      <Card className="shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            locale={{
              emptyText: (
                <div className="py-8 text-center">
                  <p className="text-gray-400 mb-4">No home banners uploaded yet.</p>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={openAddModal}
                    style={{ backgroundColor: "#B3003C", borderColor: "#B3003C" }}
                  >
                    Upload First Banner
                  </Button>
                </div>
              ),
            }}
          />
        </div>
      </Card>
 
      {/* Add/Edit Modal */}
      <Modal
        title={editingId ? "Edit Home Banner" : "Add Home Banner"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={uploading}
        okText={editingId ? "Save Changes" : "Upload Banner"}
        okButtonProps={{ style: { backgroundColor: "#B3003C", borderColor: "#B3003C" } }}
        width="95vw"
        style={{ maxWidth: 700 }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="titleEn" label="Title (English)" rules={[{ required: true, message: "English title is required" }]}>
                <Input placeholder="e.g. Welcome to Kavad Bank" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="titleMr" label="Title (Marathi)" rules={[{ required: true, message: "Marathi title is required" }]}>
                <Input placeholder="e.g. कवाड बँकेत आपले स्वागत आहे" />
              </Form.Item>
            </Col>
          </Row>
 
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="subtitleEn" label="Subtitle (English)" rules={[{ required: true, message: "English subtitle is required" }]}>
                <Input placeholder="e.g. Your Trusted Financial Partner" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="subtitleMr" label="Subtitle (Marathi)" rules={[{ required: true, message: "Marathi subtitle is required" }]}>
                <Input placeholder="e.g. आपला विश्वासू आर्थिक भागीदार" />
              </Form.Item>
            </Col>
          </Row>
 
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="linkUrl" label="Link URL (Optional)">
                <Input placeholder="e.g. /services/loans" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true, message: "Sort order is required" }]}>
                <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 1" />
              </Form.Item>
            </Col>
          </Row>
 
          <Form.Item label="Upload Banner Image" required>
            <Upload
              listType="picture"
              fileList={fileList}
              maxCount={1}
              onRemove={() => setFileList([])}
              beforeUpload={(file) => {
                const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
                if (!isValidType) {
                  message.error("Only JPG, PNG, and WEBP image files are allowed!");
                  return Upload.LIST_IGNORE;
                }
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                  message.error("Image file must be smaller than 5MB!");
                  return Upload.LIST_IGNORE;
                }
 
                setFileList([
                  {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    originFileObj: file,
                  } as any,
                ]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select Image from PC (JPG, PNG, WEBP)</Button>
            </Upload>
          </Form.Item>
 
          <Form.Item name="isActive" label="Active Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
