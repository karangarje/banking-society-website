"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Card, Row, Col, Upload, Image } from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, EditOutlined, UploadOutlined, EnvironmentOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface BranchRow {
  id: string;
  nameEn: string;
  nameMr: string;
  addressEn: string;
  addressMr: string;
  cityEn: string;
  cityMr: string;
  contact: string;
  managerNameEn: string;
  managerNameMr: string;
  googleMapUrl: string | null;
  imageUrl: string | null;
  updatedAt: string;
}

export default function BranchesPage() {
  const [data, setData] = useState<BranchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/branches");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load branches");
      }
    } catch (err) {
      message.error("Failed to load branches");
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
      let finalImageUrl = editingId ? (data.find(b => b.id === editingId)?.imageUrl || null) : null;

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

      const payload = { ...values, imageUrl: finalImageUrl };
      const url = editingId ? `/api/admin/branches/${editingId}` : "/api/admin/branches";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success(`Branch ${editingId ? "updated" : "added"} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save branch");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/branches/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Branch deleted successfully");
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete");
      }
    } catch (err) {
      message.error("Failed to delete branch");
    }
  };

  const openAddModal = () => {
    form.resetFields();
    setFileList([]);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: BranchRow) => {
    form.setFieldsValue(record);
    if (record.imageUrl) {
      setFileList([
        {
          uid: "-1",
          name: "branch-image.jpg",
          status: "done",
          url: record.imageUrl,
        },
      ]);
    } else {
      setFileList([]);
    }
    setEditingId(record.id);
    setIsModalOpen(true);
  };

  // Filter branches
  const filteredData = data.filter((item) =>
    (item.nameEn?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (item.nameMr || "").includes(searchQuery) ||
    (item.addressEn?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (item.addressMr || "").includes(searchQuery) ||
    (item.managerNameEn?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (item.managerNameMr || "").includes(searchQuery)
  );

  // Stats
  const totalBranches = data.length;
  const mapLinkedCount = data.filter((b) => b.googleMapUrl).length;
  const imageCount = data.filter((b) => b.imageUrl).length;
  const lastUpdatedText = data.length > 0
    ? new Date(Math.max(...data.map(d => new Date(d.updatedAt).getTime()))).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "No Data";

  const columns: ColumnsType<BranchRow> = [
    {
      title: "Branch Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => (
        <Image
          src={url || "/placeholder-branch.png"}
          alt="branch"
          width={100}
          height={60}
          style={{ objectFit: "cover", borderRadius: 6 }}
          fallback="/placeholder.png"
        />
      ),
    },
    {
      title: "Branch Details",
      key: "details",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-semibold text-[#AD002E]/70 text-base">{record.nameEn} ({record.nameMr})</span>
          <span className="text-sm text-[#AD002E]/70">{record.addressEn} / {record.addressMr}</span>
          <span className="text-xs text-[#AD002E]/70 font-normal">City: {record.cityEn} / {record.cityMr}</span>
        </div>
      ),
    },
    {
      title: "Manager",
      key: "managerName",
      render: (_, record) => (
        <span className="font-normal text-[#AD002E]/70 flex flex-col">
          <span>{record.managerNameEn}</span>
          <span className="text-xs text-[#AD002E]/70">{record.managerNameMr}</span>
        </span>
      ),
    },
    {
      title: "Contact Info",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <span className="text-[#AD002E]/70 font-semibold">{text}</span>,
    },
    {
      title: "Google Map",
      dataIndex: "googleMapUrl",
      key: "googleMapUrl",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noreferrer" className="text-[#AD002E] hover:text-[#AD002E] flex items-center font-normal gap-1 text-xs">
            <EnvironmentOutlined /> View Map
          </a>
        ) : (
          <span className="text-[#AD002E]/70 text-xs">Not Configured</span>
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
            title="Delete this branch?"
            description="Are you sure you want to delete this branch? Members won't find it on the public site."
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
          <h1 className="text-2xl font-bold text-[#AD002E]/70">Branch Management</h1>
          <p className="text-sm text-[#AD002E]/70">Configure corporate branch addresses, manager designations, contact info, and map locations.</p>
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
            Add Branch
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Total Branches</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{totalBranches}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Map Locations</div>
            <div className="text-3xl font-bold text-[#AD002E] mt-2">{mapLinkedCount}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">With Photos</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{imageCount}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Last Updated</div>
            <div className="text-xl font-bold text-[#AD002E]/70 mt-3">{lastUpdatedText}</div>
          </Card>
        </Col>
      </Row>

      {/* Filter and Table Card */}
      <Card className="shadow-md border border-[#AD002E]/20">
        <div className="mb-4">
          <Input.Search
            placeholder="Search branches by name, manager or address..."
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
                <p className="text-[#AD002E]/70 mb-4">No branches match your search or exist in database.</p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openAddModal}
                  style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
                >
                  Create Branch
                </Button>
              </div>
            ),
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingId ? "Edit Branch Info" : "Add Branch"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={uploading}
        okText={editingId ? "Save Changes" : "Create Branch"}
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="nameEn" label="Branch Name (English)" rules={[{ required: true, message: "English branch name is required" }]}>
                <Input placeholder="e.g. Head Office" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nameMr" label="Branch Name (Marathi)" rules={[{ required: true, message: "Marathi branch name is required" }]}>
                <Input placeholder="e.g. मुख्यालय" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="managerNameEn" label="Manager Name (English)" rules={[{ required: true, message: "English manager name is required" }]}>
                <Input placeholder="e.g. Branch Manager" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="managerNameMr" label="Manager Name (Marathi)" rules={[{ required: true, message: "Marathi manager name is required" }]}>
                <Input placeholder="e.g. शाखा व्यवस्थापक" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="cityEn" label="City (English)" rules={[{ required: true, message: "English city is required" }]}>
                <Input placeholder="e.g. Ahmednagar" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="cityMr" label="City (Marathi)" rules={[{ required: true, message: "Marathi city is required" }]}>
                <Input placeholder="e.g. अहमदनगर" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="contact" label="Contact Number" rules={[{ required: true, message: "Contact number is required" }]}>
            <Input placeholder="e.g. (02488) 230449, 230442" />
          </Form.Item>

          <Form.Item name="addressEn" label="Address (English)" rules={[{ required: true, message: "English address is required" }]}>
            <Input.TextArea rows={2} placeholder="e.g. S.T. Stand, Nighoj–Parner Road, Nighoj, Parner" />
          </Form.Item>

          <Form.Item name="addressMr" label="Address (Marathi)" rules={[{ required: true, message: "Marathi address is required" }]}>
            <Input.TextArea rows={2} placeholder="e.g. एस. टी. स्टँड, निघोज–पारनेर रोड, निघोज, ता. पारनेर" />
          </Form.Item>

          <Form.Item name="googleMapUrl" label="Google Maps Share / Embed URL (Optional)">
            <Input placeholder="https://maps.google.com/..." />
          </Form.Item>

          <Form.Item label="Upload Branch Image" required={false}>
            <Upload
              listType="picture"
              fileList={fileList}
              maxCount={1}
              onRemove={() => setFileList([])}
              beforeUpload={(file) => {
                const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
                if (!isValidType) {
                  message.error("Only JPG, PNG, and WEBP images allowed!");
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
