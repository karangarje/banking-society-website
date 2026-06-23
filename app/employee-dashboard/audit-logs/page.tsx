"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Input, Tag, Space, message } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

interface AuditLogRow {
  id: string;
  userId: string | null;
  userRole: string | null;
  action: string;
  details: string;
  ip: string | null;
  browser: string | null;
  device: string | null;
  timestamp: string;
}

export default function AuditLogsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = useState<AuditLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/audit-logs");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error("Failed to load audit logs");
      }
    } catch (err) {
      message.error("An error occurred while loading audit logs");
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

  const userRole = (session?.user as any)?.role;
  if (!session || (userRole !== "MANAGER" && userRole !== "SUPER_ADMIN")) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ color: "#AD002E" }}>403 - Access Denied</h1>
        <p>You do not have permission to view audit logs.</p>
      </div>
    );
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) => {
    return (
      item.action.toLowerCase().includes(searchText) ||
      (item.details && item.details.toLowerCase().includes(searchText)) ||
      (item.userRole && item.userRole.toLowerCase().includes(searchText)) ||
      (item.userId && item.userId.toLowerCase().includes(searchText))
    );
  });

  const columns: ColumnsType<AuditLogRow> = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      width: 180,
      render: (v) => new Date(v).toLocaleString(),
    },
    {
      title: "User Role",
      dataIndex: "userRole",
      key: "userRole",
      width: 120,
      render: (role) => {
        if (!role) return <Tag>UNKNOWN</Tag>;
        let color = "blue";
        if (role === "SUPER_ADMIN") color = "purple";
        if (role === "MANAGER") color = "gold";
        if (role === "MEMBER") color = "green";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (act) => <span style={{ fontWeight: 600, color: "#1E1B6B" }}>{act}</span>,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (txt) => <span style={{ fontFamily: "monospace", fontSize: "12px" }}>{txt}</span>,
    },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>System Audit Logs</h1>
        <Space>
          <Input
            placeholder="Search action or description..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{ width: 250 }}
            allowClear
          />
          <Button icon={<ReloadOutlined />} onClick={fetchData} />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
}
