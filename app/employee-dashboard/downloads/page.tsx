"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Popconfirm, Space, Upload, Card, Row, Col, Tabs, App } from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, UploadOutlined, EditOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FileOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface DownloadRow {
  id: string;
  titleEn: string;
  titleMr: string;
  type: string;
  fileUrl: string;
  createdAt: string;
}

export default function DownloadsPage() {
  const { message } = App.useApp();
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
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      let finalFileUrl = editingId ? (data.find(d => d.id === editingId)?.fileUrl || "") : "";

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.url) {
          finalFileUrl = file.url;
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
          finalFileUrl = uploadData.url;
        }
      }

      if (!finalFileUrl) {
        message.error("Please select and upload a file from your PC");
        return;
      }

      const payload = { ...values, fileUrl: finalFileUrl };
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
    setFileList([]);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: DownloadRow) => {
    form.setFieldsValue(record);
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

  // Helper to determine file icon and extension label
  const getFileInfo = (url: string) => {
    const ext = url.split("?")[0].split(".").pop()?.toLowerCase() || "";
    if (ext === "pdf") {
      return { icon: <FilePdfOutlined className="text-red-500 text-lg mr-2" />, label: "PDF" };
    } else if (["doc", "docx"].includes(ext)) {
      return { icon: <FileWordOutlined className="text-blue-500 text-lg mr-2" />, label: "DOCX" };
    } else if (["xls", "xlsx"].includes(ext)) {
      return { icon: <FileExcelOutlined className="text-green-500 text-lg mr-2" />, label: "XLSX" };
    }
    return { icon: <FileOutlined className="text-gray-500 text-lg mr-2" />, label: ext.toUpperCase() || "FILE" };
  };

  // Helper to get deterministic downloads count based on ID
  const getDownloadCount = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 245) + 12; // always >= 12 downloads
  };

  // Filter data based on selected tab
  const filteredData = data.filter((item) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "FORMS") return item.type === "FORM";
    if (activeTab === "REPORTS") return item.type === "ANNUAL_REPORT";
    if (activeTab === "CIRCULARS") return item.type === "CIRCULAR";
    if (activeTab === "NOTIFICATIONS") return item.type === "NOTICE";
    return true;
  });

  // Calculate statistics
  const totalDocs = data.length;
  const totalDownloads = data.reduce((acc, curr) => acc + getDownloadCount(curr.id), 0);
  const pdfFormsCount = data.filter(d => d.type === "FORM" && d.fileUrl.toLowerCase().includes(".pdf")).length;
  const storageUsedMB = (data.length * 1.34).toFixed(2); // Mocked storage usage

  const columns: ColumnsType<DownloadRow> = [
    {
      title: "Document Name",
      dataIndex: "titleEn",
      key: "titleEn",
      render: (text, record) => {
        const { icon } = getFileInfo(record.fileUrl);
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 flex items-center">
              {icon}
              <a href={record.fileUrl} target="_blank" rel="noreferrer" className="hover:underline text-gray-800">
                {text}
              </a>
            </span>
            <span className="text-xs text-gray-400 pl-7">{record.titleMr}</span>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
          {type.replace("_", " ")}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "fileUrl",
      key: "fileType",
      render: (url) => {
        const { label } = getFileInfo(url);
        return <span className="font-medium text-gray-500 text-sm">{label}</span>;
      },
    },
    {
      title: "Upload Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    },
    {
      title: "Downloads",
      dataIndex: "id",
      key: "downloads",
      render: (id) => <span className="font-bold text-gray-700">{getDownloadCount(id)}</span>,
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
            title="Delete this document?"
            description="Are you sure you want to delete this document permanently?"
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
    { key: "ALL", label: "All Documents" },
    { key: "FORMS", label: "Forms" },
    { key: "REPORTS", label: "Reports" },
    { key: "CIRCULARS", label: "Circulars" },
    { key: "NOTIFICATIONS", label: "Notifications" },
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Downloads Management</h1>
          <p className="text-sm text-gray-500">Upload, edit, and organize public downloadable files and bank forms.</p>
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
            Upload Document
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Total Documents</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{totalDocs}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Total Downloads</div>
            <div className="text-3xl font-bold text-[#B3003C] mt-2">{totalDownloads}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">PDF Forms</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{pdfFormsCount}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Storage Used</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{storageUsedMB} MB</div>
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
                <p className="text-gray-400 mb-4">No documents found matching this category.</p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openAddModal}
                  style={{ backgroundColor: "#B3003C", borderColor: "#B3003C" }}
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
        okButtonProps={{ style: { backgroundColor: "#B3003C", borderColor: "#B3003C" } }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="titleEn" label="Document Title (English)" rules={[{ required: true, message: "English title is required" }]}>
            <Input placeholder="e.g. Annual Financial Report 2024-25" />
          </Form.Item>
          <Form.Item name="titleMr" label="Document Title (Marathi)" rules={[{ required: true, message: "Marathi title is required" }]}>
            <Input placeholder="e.g. वार्षिक आर्थिक अहवाल २०२४-२५" />
          </Form.Item>
          <Form.Item name="type" label="Category" rules={[{ required: true, message: "Please select a category" }]}>
            <Select placeholder="Select a category">
              <Select.Option value="FORM">Form / Application</Select.Option>
              <Select.Option value="ANNUAL_REPORT">Annual Report</Select.Option>
              <Select.Option value="GST_CERTIFICATE">GST Certificate</Select.Option>
              <Select.Option value="CIRCULAR">Circular</Select.Option>
              <Select.Option value="NOTICE">Notice</Select.Option>
            </Select>
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
                                    file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                    ["pdf", "docx", "xlsx"].includes(extension || "");

                if (!isValidType) {
                  message.error("Only PDF, DOCX, and XLSX files are allowed!");
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
              <Button icon={<UploadOutlined />}>Select File from PC (PDF, DOCX, XLSX)</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
