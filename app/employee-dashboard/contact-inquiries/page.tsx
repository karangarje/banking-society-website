"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, App, Popconfirm, Space, Card, Input, Select, Tag, Spin, Row, Col } from "antd";
import { ReloadOutlined, DeleteOutlined, SearchOutlined, MessageOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

interface InquiryRow {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ContactInquiriesPage() {
  const { message } = App.useApp();
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact-inquiries");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load inquiries");
      }
    } catch (err) {
      message.error("Failed to load inquiries");
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
        <p className="text-gray-600">You do not have permission to access the Contact Inquiries Management console.</p>
      </div>
    );
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/contact-inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        message.success(`Status updated to ${newStatus}`);
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to update status");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contact-inquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        message.success("Inquiry deleted successfully");
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    }
  };

  const filteredData = data.filter((item) => {
    const searchTarget = `${item.fullName} ${item.email} ${item.mobileNumber || ""}`.toLowerCase();
    return searchTarget.includes(searchText.toLowerCase());
  });

  // Calculate statistics
  const totalInquiries = data.length;
  const newInquiries = data.filter((item) => item.status === "NEW").length;
  const readInquiries = data.filter((item) => item.status === "READ").length;
  const resolvedInquiries = data.filter((item) => item.status === "RESOLVED").length;

  const getStatusTag = (status: string) => {
    switch (status) {
      case "NEW":
        return <Tag color="orange" className="font-semibold">NEW</Tag>;
      case "READ":
        return <Tag color="blue" className="font-semibold">READ</Tag>;
      case "RESOLVED":
        return <Tag color="green" className="font-semibold">RESOLVED</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns: ColumnsType<InquiryRow> = [
    {
      title: "Contact Details",
      key: "contactDetails",
      render: (_, record) => (
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-[#AD002E]/70">{record.fullName}</span>
          <span className="text-xs text-gray-500">{record.email}</span>
          {record.mobileNumber && <span className="text-xs text-gray-400">{record.mobileNumber}</span>}
        </div>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => <span className="font-semibold text-gray-600 capitalize">{text}</span>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <p className="max-w-xs break-words text-gray-600 text-xs whitespace-pre-wrap leading-relaxed">
          {text}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(record.id, val)}
          style={{ width: 120 }}
          bordered={false}
          dropdownStyle={{ borderRadius: "8px" }}
        >
          <Select.Option value="NEW">{getStatusTag("NEW")}</Select.Option>
          <Select.Option value="READ">{getStatusTag("READ")}</Select.Option>
          <Select.Option value="RESOLVED">{getStatusTag("RESOLVED")}</Select.Option>
        </Select>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className="text-xs text-gray-500">
          {new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete inquiry record?"
          description="Are you sure you want to permanently delete this inquiry?"
          onConfirm={() => handleDelete(record.id)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            className="hover:bg-red-50 rounded-lg"
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20">
        <div>
          <h1 className="text-2xl font-bold text-[#AD002E]/70">Contact Inquiries</h1>
          <p className="text-sm text-[#AD002E]/70">View, search, and manage contact and feedback submissions from public users.</p>
        </div>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            className="border-[#AD002E]/20 hover:border-[#AD002E] hover:text-[#AD002E]"
          >
            Refresh
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20">
            <div className="text-sm text-[#AD002E]/70 font-semibold uppercase tracking-wider">Total Inquiries</div>
            <div className="text-3xl font-bold text-[#AD002E]/70 mt-2">{totalInquiries}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 bg-orange-50/20">
            <div className="text-sm text-orange-600 font-semibold uppercase tracking-wider">New (Unread)</div>
            <div className="text-3xl font-bold text-orange-600 mt-2">{newInquiries}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 bg-blue-50/20">
            <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Read / Pending</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{readInquiries}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md border-[#AD002E]/20 bg-green-50/20">
            <div className="text-sm text-green-600 font-semibold uppercase tracking-wider">Resolved</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{resolvedInquiries}</div>
          </Card>
        </Col>
      </Row>

      {/* Main Table Card */}
      <Card className="shadow-md border border-[#AD002E]/20">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Input
            placeholder="Search by Name, Email or Mobile Number..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md border-gray-200 hover:border-[#AD002E] focus:border-[#AD002E]"
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
              <div className="py-8 text-center text-gray-500">
                <MessageOutlined className="text-3xl text-gray-300 mb-2" />
                <p>No contact inquiries found.</p>
              </div>
            ),
          }}
        />
      </Card>
    </div>
  );
}
