"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, App, Popconfirm, Image, Tag, Space, Upload, Card, Row, Col, InputNumber, Spin } from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

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
  createdAt: string;
}

export default function HomeBannersPage() {
  const { data: session, status: sessionStatus } = useSession();
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
    if (sessionStatus === "authenticated") {
      fetchData();
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center p-12 min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  const userRole = (session?.user as any)?.role;
  const allowedRoles = ["MANAGER", "EMPLOYEE"];

  if (!session || !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md border border-[#AD002E]/20 max-w-xl mx-auto my-12 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#AD002E]">403 - Forbidden</h1>
        <p className="text-gray-600">You do not have permission to access the Home Banner Manager.</p>
      </div>
    );
  }

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
      } else {
        finalImageUrl = "";
      }

      if (!finalImageUrl) {
        message.error("Please upload an image from your PC");
        return;
      }

      const payload = { 
        ...values, 
        imageUrl: finalImageUrl,
        isActive: true,
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
        form.resetFields();
        setFileList([]);
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
    form.setFieldsValue({ sortingOrder: 0 });
    setFileList([]);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: HomeBannerRow) => {
    form.setFieldsValue({
      linkUrl: record.linkUrl,
      sortingOrder: record.sortingOrder
    });
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
    ? new Date(Math.max(...data.map(d => new Date(d.createdAt).getTime()))).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
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
          width={160}
          height={80}
          style={{ objectFit: "cover", borderRadius: 6 }}
          fallback="/placeholder.png"
        />
      ),
    },
    {
      title: "Link URL",
      dataIndex: "linkUrl",
      key: "linkUrl",
      render: (val) => val ? <span className="text-[#AD002E]/70">{val}</span> : <span className="text-gray-400 font-light italic">None</span>,
    },
    {
      title: "Sort Order",
      dataIndex: "sortingOrder",
      key: "sortingOrder",
      render: (val) => <span className="font-bold text-[#AD002E]/70">{val}</span>,
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
            title="Delete this banner?"
            description="Are you sure you want to delete this home banner?"
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
          <h1 className="text-2xl font-bold text-[#AD002E]/70">Home Banner Manager</h1>
          <p className="text-sm text-[#AD002E]/70">Add, upload, and sort images for the public website homepage slider.</p>
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
            Add Home Banner
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Total Banners</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{totalBanners}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Active Banners</div>
            <div className="text-3xl font-bold text-[#AD002E] mt-2">{activeBanners}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Linked Banners</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{linkBanners}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Last Updated</div>
            <div className="text-xl font-bold text-[#AD002E]/70 mt-3">{lastUpdatedText}</div>
          </Card>
        </Col>
      </Row>

      {/* Banner Table */}
      <Card className="shadow-md border border-[#AD002E]/20">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            locale={{
              emptyText: (
                <div className="py-8 text-center">
                  <p className="text-[#AD002E]/70 mb-4">No home banners uploaded yet.</p>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={openAddModal}
                    style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
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
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
        width="95vw"
        style={{ maxWidth: 500 }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="linkUrl" label="Link URL (Optional)">
            <Input placeholder="e.g. /services/loans" />
          </Form.Item>
          
          <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true, message: "Sort order is required" }]}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="e.g. 1" />
          </Form.Item>
 
          <Form.Item label="Upload Banner Image" required>
            <Upload
              listType="picture"
              fileList={fileList}
              maxCount={1}
              onRemove={() => setFileList([])}
              beforeUpload={(file) => {
                const ext = file.name.split('.').pop()?.toLowerCase();
                const isValidType = ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type) ||
                                    ["jpg", "jpeg", "png", "webp"].includes(ext || "");
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
        </Form>
      </Modal>
    </div>
  );
}
