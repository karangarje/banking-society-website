"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Switch, App, Popconfirm, Space, Upload, Card, Row, Col, Tabs, Spin, InputNumber, Tag } from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, UploadOutlined, EditOutlined, FilePdfOutlined, FileWordOutlined, FileOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

interface DownloadRow {
  id: string;
  titleEn: string;
  titleMr: string;
  descriptionEn: string;
  descriptionMr: string;
  fileUrl: string;
  category: string;
  documentType: string;
  fileSize: string;
  fileFormat: string;
  sortOrder: number;
  isActive: boolean;
  downloadCount: number;
  createdAt: string;
}

export default function DownloadsPage() {
  const { message } = App.useApp();
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = useState<DownloadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/downloads");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load downloads");
      }
    } catch (err) {
      message.error("Failed to load downloads");
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
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  const userRole = (session?.user as any)?.role;
  const allowedRoles = ["SUPER_ADMIN", "MANAGER", "EMPLOYEE"];

  if (!session || !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md border border-[#AD002E]/20 max-w-xl mx-auto my-12 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#AD002E]">403 - Forbidden</h1>
        <p className="text-gray-600">You do not have permission to access the Downloads Management console.</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      let finalFileUrl = editingId ? (data.find(d => d.id === editingId)?.fileUrl || "") : "";
      let fileSize = editingId ? (data.find(d => d.id === editingId)?.fileSize || "0 KB") : "0 KB";
      let fileFormat = editingId ? (data.find(d => d.id === editingId)?.fileFormat || "PDF") : "PDF";

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.url) {
          finalFileUrl = file.url;
        } else if (file.originFileObj) {
          setUploading(true);
          const formData = new FormData();
          formData.append("file", file.originFileObj);

          // Compute format and size
          const ext = file.name.split('.').pop()?.toUpperCase() || "PDF";
          const bytes = file.originFileObj.size;
          fileFormat = ext;
          fileSize = bytes > 1024 * 1024 
            ? (bytes / (1024 * 1024)).toFixed(1) + " MB" 
            : (bytes / 1024).toFixed(0) + " KB";

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            const errJson = await uploadRes.json();
            throw new Error(errJson.message || "Upload failed");
          }
          const uploadData = await uploadRes.json();
          finalFileUrl = uploadData.url;
        }
      } else {
        finalFileUrl = "";
      }

      if (!finalFileUrl) {
        message.error("Please select and upload a file from your PC");
        return;
      }

      const payload = { 
        ...values, 
        fileUrl: finalFileUrl,
        fileSize,
        fileFormat,
        isActive: values.isActive ?? true,
        sortOrder: values.sortOrder || 0,
        documentType: values.category === "Forms" ? "FORM" : "ANNUAL_REPORT"
      };

      const url = editingId ? `/api/admin/downloads/${editingId}` : "/api/admin/downloads";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success(`Document ${editingId ? "updated" : "uploaded"} successfully`);
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setEditingId(null);
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/downloads/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Document deleted successfully");
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete");
      }
    } catch (err) {
      message.error("Failed to delete document");
    }
  };

  const openAddModal = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true, sortOrder: 0 });
    setFileList([]);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: DownloadRow) => {
    form.setFieldsValue({
      titleEn: record.titleEn,
      titleMr: record.titleMr,
      descriptionEn: record.descriptionEn,
      descriptionMr: record.descriptionMr,
      category: record.category,
      sortOrder: record.sortOrder,
      isActive: record.isActive,
    });
    setFileList([
      {
        uid: "-1",
        name: record.fileUrl.split("/").pop() || "Current File",
        status: "done",
        url: record.fileUrl,
      },
    ]);
    setEditingId(record.id);
    setIsModalOpen(true);
  };

  const getFileInfo = (url: string) => {
    const ext = url.split("?")[0].split(".").pop()?.toLowerCase() || "";
    if (ext === "pdf") {
      return { icon: <FilePdfOutlined className="text-[#AD002E] text-lg mr-2" />, label: "PDF" };
    } else if (["doc", "docx"].includes(ext)) {
      return { icon: <FileWordOutlined className="text-[#AD002E] text-lg mr-2" />, label: "DOCX" };
    }
    return { icon: <FileOutlined className="text-[#AD002E]/70 text-lg mr-2" />, label: ext.toUpperCase() || "FILE" };
  };

  const filteredData = data.filter((item) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "FORMS") return item.category === "Forms";
    if (activeTab === "REPORTS") return item.category === "Reports";
    if (activeTab === "CIRCULARS") return item.category === "Circulars";
    if (activeTab === "NOTIFICATIONS") return item.category === "Notifications";
    return true;
  });

  // Calculate statistics
  const totalDocs = data.length;
  const totalDownloads = data.reduce((acc, curr) => acc + curr.downloadCount, 0);
  const pdfFormsCount = data.filter(d => d.category === "Forms" && d.fileFormat === "PDF").length;
  const storageUsedMB = (data.length * 1.34).toFixed(2); 

  const columns: ColumnsType<DownloadRow> = [
    {
      title: "Document Name",
      dataIndex: "titleEn",
      key: "titleEn",
      render: (text, record) => {
        const { icon } = getFileInfo(record.fileUrl);
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-[#AD002E]/70 flex items-center">
              {icon}
              <a href={record.fileUrl} target="_blank" rel="noreferrer" className="hover:underline text-[#AD002E]/70">
                {text}
              </a>
            </span>
            <span className="text-xs text-[#AD002E]/70 pl-7">{record.titleMr}</span>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="px-2 py-1 bg-white text-[#AD002E]/70 rounded-lg text-xs font-semibold">
          {category}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "fileFormat",
      key: "fileType",
      render: (val) => <span className="font-normal text-[#AD002E]/70 text-sm">{val || "PDF"}</span>,
    },
    {
      title: "Size",
      dataIndex: "fileSize",
      key: "fileSize",
      render: (val) => <span className="font-normal text-[#AD002E]/70 text-sm">{val || "0 KB"}</span>,
    },
    {
      title: "Downloads",
      dataIndex: "downloadCount",
      key: "downloads",
      render: (val) => <span className="font-bold text-[#AD002E]/70">{val}</span>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active: boolean) => <Tag color={active ? "green" : "red"}>{active ? "ACTIVE" : "INACTIVE"}</Tag>,
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
            title="Delete this document?"
            description="Are you sure you want to delete this document permanently?"
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
    { key: "ALL", label: "All Documents" },
    { key: "FORMS", label: "Forms" },
    { key: "REPORTS", label: "Reports" },
    { key: "CIRCULARS", label: "Circulars" },
    { key: "NOTIFICATIONS", label: "Notifications" },
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20">
        <div>
          <h1 className="text-2xl font-bold text-[#AD002E]/70">Downloads Management</h1>
          <p className="text-sm text-[#AD002E]/70">Upload, edit, and organize public downloadable files and bank forms.</p>
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
            Upload Document
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Total Documents</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{totalDocs}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Total Downloads</div>
            <div className="text-3xl font-bold text-[#AD002E] mt-2">{totalDownloads}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">PDF Forms</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{pdfFormsCount}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 hover:shadow-md transition-shadow-md">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Storage Used</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{storageUsedMB} MB</div>
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
                <p className="text-[#AD002E]/70 mb-4">No documents found matching this category.</p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openAddModal}
                  style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
                >
                  Upload New Document
                </Button>
              </div>
            ),
          }}
        />
      </Card>

      {/* Upload/Edit Modal */}
      <Modal
        title={editingId ? "Edit Document Properties" : "Upload Document"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={uploading}
        okText={editingId ? "Save Changes" : "Upload File"}
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="titleEn" label="Document Title (English)" rules={[{ required: true, message: "English title is required" }]}>
            <Input placeholder="e.g. Annual Financial Report 2024-25" />
          </Form.Item>
          <Form.Item name="titleMr" label="Document Title (Marathi)" rules={[{ required: true, message: "Marathi title is required" }]}>
            <Input placeholder="e.g. वार्षिक आर्थिक अहवाल २०२४-२५" />
          </Form.Item>
          <Form.Item name="descriptionEn" label="Description (English)">
            <Input.TextArea rows={3} placeholder="Provide a brief description in English" />
          </Form.Item>
          <Form.Item name="descriptionMr" label="Description (Marathi)">
            <Input.TextArea rows={3} placeholder="Provide a brief description in Marathi" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select a category" }]}>
            <Select placeholder="Select a category">
              <Select.Option value="Forms">Forms</Select.Option>
              <Select.Option value="Reports">Reports</Select.Option>
              <Select.Option value="Circulars">Circulars</Select.Option>
              <Select.Option value="Notifications">Notifications</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="sortOrder" label="Sort Order" rules={[{ required: true, message: "Sort order is required" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="File Document" required>
            <Upload
              fileList={fileList}
              maxCount={1}
              onRemove={() => setFileList([])}
              beforeUpload={(file) => {
                const extension = file.name.split(".").pop()?.toLowerCase();
                const isValidType = file.type === "application/pdf" ||
                                    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                    file.type === "application/msword" ||
                                    ["pdf", "docx", "doc"].includes(extension || "");

                if (!isValidType) {
                  message.error("Only PDF, DOC, and DOCX files are allowed!");
                  return Upload.LIST_IGNORE;
                }
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                  message.error("File must be smaller than 10MB!");
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
              <Button icon={<UploadOutlined />}>Select File from PC (PDF, DOC, DOCX)</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
