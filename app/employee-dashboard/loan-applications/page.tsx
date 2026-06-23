"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Table, Button, Tag, Modal, Form, Input, Select, App, Descriptions, Space,
  Card, Row, Col, Statistic, Empty, Dropdown
} from "antd";
import {
  EyeOutlined, FileTextOutlined, DownloadOutlined, PlusOutlined,
  ClockCircleOutlined, CheckCircleOutlined, SyncOutlined,
  LineChartOutlined, FilterOutlined, SearchOutlined, CheckOutlined, CloseOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

const { Option } = Select;

interface MemberInfo {
  name: string;
  email: string | null;
  phone: string | null;
  memberId: string;
}

interface LoanApplicationRow {
  id: string;
  type: string;
  amount: string | number;
  tenureMonths: number;
  interestRate: string | number;
  status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  documents: string;
  remarks: string | null;
  memberId: string;
  createdAt: string;
  member: MemberInfo;
}

export default function LoanApplicationsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = useState<LoanApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [searchText, setSearchText] = useState("");
  
  // Modal
  const [selectedApp, setSelectedApp] = useState<LoanApplicationRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/loan-applications");
      if (res.ok) {
        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
      } else {
        message.error("Failed to load loan applications");
      }
    } catch (err) {
      message.error("An error occurred while loading loan applications");
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <div style={{ textAlign: "center" }}>
          <div className="animate-spin" style={{ width: 40, height: 40, border: "4px solid #e5e7eb", borderTopColor: "#AD002E", borderRadius: "50%", margin: "0 auto 16px" }} />
          <p style={{ color: "#666" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🚫</div>
        <h1 style={{ color: "#AD002E", fontSize: 28, fontWeight: 800 }}>403 — Access Denied</h1>
        <p style={{ color: "#666", marginTop: 8 }}>You do not have permission to view this page.</p>
      </div>
    );
  }

  const openDetails = (record: LoanApplicationRow) => {
    setSelectedApp(record);
    form.setFieldsValue({
      status: record.status,
      remarks: record.remarks || "",
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async (statusOverride?: string) => {
    if (!selectedApp) return;
    try {
      const values = await form.validateFields();
      const finalStatus = statusOverride || values.status;
      
      const res = await fetch(`/api/admin/loan-applications/${selectedApp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, status: finalStatus }),
      });

      if (res.ok) {
        message.success(`Loan application ${finalStatus.toLowerCase()} successfully`);
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to update loan application");
      }
    } catch (err) {
      // form validation error
    }
  };

  const createTestApplication = async () => {
    message.info("This feature will create a dummy application in a real environment.");
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Tag color="magenta" style={{ borderColor: "#ffadd2", color: "#c41d7f" }}>PENDING</Tag>;
      case "UNDER_REVIEW":
        return <Tag color="orange" style={{ borderColor: "#ffd591", color: "#d46b08" }}>UNDER REVIEW</Tag>;
      case "APPROVED":
        return <Tag color="green" style={{ borderColor: "#b7eb8f", color: "#389e0d" }}>APPROVED</Tag>;
      case "REJECTED":
        return <Tag color="red" style={{ borderColor: "#ffa39e", color: "#cf1322" }}>REJECTED</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // ─── Filtered Data ──────────────────────────────────
  const filteredData = data.filter((app) => {
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    const matchesType = typeFilter === "ALL" || app.type === typeFilter;
    const matchesSearch = searchText === "" || 
      app.member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      app.member.memberId.toLowerCase().includes(searchText.toLowerCase()) ||
      app.id.toLowerCase().includes(searchText.toLowerCase());
      
    return matchesStatus && matchesType && matchesSearch;
  });

  // ─── Stats ──────────────────────────────────────────
  const stats = {
    pending: data.filter(d => d.status === "PENDING").length,
    volume: data.reduce((acc, curr) => acc + parseFloat(curr.amount as string || "0"), 0),
    approvedToday: data.filter(d => d.status === "APPROVED" && new Date(d.createdAt).toDateString() === new Date().toDateString()).length,
    avgApproval: "24h 12m" // Mock metric for dashboard
  };

  const columns: ColumnsType<LoanApplicationRow> = [
    {
      title: "App ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <span style={{ color: "#888", fontSize: 12 }}>{id.substring(0, 8).toUpperCase()}</span>,
    },
    {
      title: "Member",
      key: "member",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600, color: "#1E1B6B" }}>{record.member.name}</div>
          <div style={{ fontSize: 12, color: "#999" }}>ID: {record.member.memberId}</div>
        </div>
      ),
    },
    {
      title: "Loan Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <span style={{ textTransform: "capitalize", fontWeight: 500 }}>{text.replace("_", " ")}</span>,
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (v) => <span style={{ fontWeight: 600 }}>{parseFloat(v).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>,
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => new Date(v).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button size="small" type="primary" style={{ backgroundColor: "#1E1B6B" }} icon={<EyeOutlined />} onClick={() => openDetails(record)}>
            Review
          </Button>
          <Button size="small" icon={<FileTextOutlined />} onClick={() => openDetails(record)}>
            Details
          </Button>
        </Space>
      ),
    },
  ];

  // Parse documents
  let docUrls: string[] = [];
  if (selectedApp?.documents) {
    try {
      docUrls = JSON.parse(selectedApp.documents);
    } catch {
      if (typeof selectedApp.documents === "string" && selectedApp.documents.startsWith("http")) {
        docUrls = [selectedApp.documents];
      }
    }
  }

  return (
    <div>
      {/* ─── Header ─── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Loan Requests</h1>
          <p style={{ color: "#888", margin: "4px 0 0" }}>Review and manage member loan applications and risk assessment.</p>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />}>Export CSV</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: "#AD002E" }}>New Application</Button>
        </Space>
      </div>

      {/* ─── Stats Cards ─── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderTop: "4px solid #ffadd2" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>PENDING REVIEW</span>}
              value={stats.pending}
              prefix={<ClockCircleOutlined style={{ color: "#eb2f96" }} />}
              styles={{ content: { color: "#eb2f96", fontWeight: 800 } }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderTop: "4px solid #bae0ff" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>TOTAL REQUEST VOLUME</span>}
              value={stats.volume}
              prefix={<span style={{ fontSize: 20 }}>₹</span>}
              formatter={(val) => Number(val).toLocaleString("en-IN")}
              styles={{ content: { color: "#1E1B6B", fontWeight: 800 } }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderTop: "4px solid #b7eb8f" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>APPROVED TODAY</span>}
              value={stats.approvedToday}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              styles={{ content: { color: "#52c41a", fontWeight: 800 } }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderTop: "4px solid #d9d9d9" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>AVG APPROVAL TIME</span>}
              value={stats.avgApproval}
              prefix={<SyncOutlined style={{ color: "#666" }} />}
              styles={{ content: { color: "#333", fontWeight: 800 } }}
            />
          </Card>
        </Col>
      </Row>

      {/* ─── Filters & Table ─── */}
      <Card
        variant="borderless"
        style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #F0D6DC" }}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
          <Space wrap>
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 140 }}>
              <Option value="ALL">All Statuses</Option>
              <Option value="PENDING">Pending</Option>
              <Option value="UNDER_REVIEW">Under Review</Option>
              <Option value="APPROVED">Approved</Option>
              <Option value="REJECTED">Rejected</Option>
            </Select>
            <Select value={typeFilter} onChange={setTypeFilter} style={{ width: 140 }}>
              <Option value="ALL">All Loan Types</Option>
              <Option value="PERSONAL_LOAN">Personal Loan</Option>
              <Option value="HOME_LOAN">Home Loan</Option>
              <Option value="VEHICLE_LOAN">Vehicle Loan</Option>
              <Option value="GOLD_LOAN">Gold Loan</Option>
            </Select>
            <Input
              placeholder="Search member, ID..."
              prefix={<SearchOutlined style={{ color: "#999" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 220 }}
              allowClear
            />
          </Space>
          <Space>
            <Button icon={<FilterOutlined />}>Sort by Newest</Button>
          </Space>
        </div>

        {filteredData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        ) : (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <Empty
              description={<span style={{ color: "#888" }}>No loan applications found</span>}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Button type="primary" onClick={createTestApplication} style={{ marginTop: 16, backgroundColor: "#1E1B6B" }}>
              Create Test Application
            </Button>
          </div>
        )}
      </Card>

      {/* ─── Review Modal ─── */}
      <Modal
        title={
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1E1B6B" }}>
            <FileTextOutlined style={{ marginRight: 8 }} />
            Application Review
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={850}
        footer={null} // custom footer below
      >
        {selectedApp && (
          <div style={{ marginTop: 24 }}>
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Descriptions bordered size="small" column={2} labelStyle={{ backgroundColor: "#fafafa", fontWeight: 600, width: "35%" }}>
                  <Descriptions.Item label="Member Name" span={2}>{selectedApp.member.name}</Descriptions.Item>
                  <Descriptions.Item label="Member ID" span={2}>{selectedApp.member.memberId}</Descriptions.Item>
                  <Descriptions.Item label="Loan Type" style={{ textTransform: "capitalize" }}>{selectedApp.type.replace("_", " ")}</Descriptions.Item>
                  <Descriptions.Item label="Amount">
                    <span style={{ fontWeight: 700, color: "#AD002E" }}>₹{parseFloat(selectedApp.amount as string).toLocaleString("en-IN")}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Tenure">{selectedApp.tenureMonths} Months</Descriptions.Item>
                  <Descriptions.Item label="Interest Rate">{selectedApp.interestRate}%</Descriptions.Item>
                </Descriptions>

                <div style={{ marginTop: 24 }}>
                  <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Supporting Documents</h4>
                  {docUrls.length > 0 ? (
                    <Space size="middle" wrap>
                      {docUrls.map((url, i) => (
                        <Card variant="borderless" key={i} size="small" style={{ backgroundColor: "#f5f5f5", border: "1px solid #e8e8e8", cursor: "pointer" }}>
                          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#1E1B6B", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                            <FileTextOutlined /> Document {i + 1}
                          </a>
                        </Card>
                      ))}
                    </Space>
                  ) : (
                    <div style={{ padding: "16px", backgroundColor: "#fffbe6", border: "1px solid #ffe58f", borderRadius: 4, color: "#faad14" }}>
                      No supporting documents uploaded with this application.
                    </div>
                  )}
                </div>
              </Col>
              
              <Col span={8}>
                <div style={{ backgroundColor: "#f9f9f9", padding: "16px", borderRadius: "8px", border: "1px solid #eee", height: "100%" }}>
                  <h4 style={{ fontWeight: 600, marginBottom: 16 }}>Decision Panel</h4>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Current Status</div>
                    {getStatusTag(selectedApp.status)}
                  </div>
                  
                  <Form form={form} layout="vertical">
                    <Form.Item name="remarks" label="Reviewer Remarks" rules={[{ required: true, message: "Please provide remarks" }]}>
                      <Input.TextArea rows={6} placeholder="Add comments regarding approval or rejection... This will be visible in audit logs." />
                    </Form.Item>
                    
                    <Form.Item name="status" hidden>
                      <Input />
                    </Form.Item>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24 }}>
                      <Button 
                        type="primary" 
                        icon={<CheckOutlined />} 
                        style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", width: "100%" }}
                        onClick={() => handleUpdate("APPROVED")}
                      >
                        Approve Application
                      </Button>
                      <Button 
                        type="primary" 
                        danger
                        icon={<CloseOutlined />} 
                        style={{ width: "100%" }}
                        onClick={() => handleUpdate("REJECTED")}
                      >
                        Reject Application
                      </Button>
                      <Button 
                        icon={<ClockCircleOutlined />} 
                        style={{ width: "100%" }}
                        onClick={() => handleUpdate("UNDER_REVIEW")}
                      >
                        Mark as Under Review
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
}
