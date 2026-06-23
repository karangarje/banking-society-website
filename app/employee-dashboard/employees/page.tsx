"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Button, Table, Modal, Form, Input, Select, Switch, Tag,
  Card, Space, Popconfirm, Statistic, Row, Col, message,
} from "antd";
import {
  PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined,
  TeamOutlined, CheckCircleOutlined, CloseCircleOutlined,
  LockOutlined, UserSwitchOutlined, SearchOutlined, KeyOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

const { Option } = Select;

interface EmployeeRow {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  isLocked: boolean;
  failedAttempts: number;
  createdAt: string;
  updatedAt: string;
}

export default function EmployeesPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResetPwdModalVisible, setIsResetPwdModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeRow | null>(null);
  const [resetTarget, setResetTarget] = useState<EmployeeRow | null>(null);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [form] = Form.useForm();
  const [resetForm] = Form.useForm();

  // ─── Fetch ───────────────────────────────────────────
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/employees");
      if (res.ok) {
        const data = await res.json();
        setEmployees(Array.isArray(data) ? data : []);
      } else {
        message.error("Failed to load employees");
      }
    } catch {
      message.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchEmployees();
    }
  }, [sessionStatus]);

  // ─── Access Control ──────────────────────────────────
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

  const userRole = (session?.user as any)?.role;
  if (!session || (userRole !== "MANAGER" && userRole !== "SUPER_ADMIN")) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🚫</div>
        <h1 style={{ color: "#AD002E", fontSize: 28, fontWeight: 800 }}>403 — Access Denied</h1>
        <p style={{ color: "#666", marginTop: 8 }}>You do not have permission to view this page.</p>
      </div>
    );
  }

  // ─── Statistics ──────────────────────────────────────
  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === "ACTIVE").length,
    inactive: employees.filter((e) => e.status === "INACTIVE").length,
    managers: employees.filter((e) => e.role === "MANAGER").length,
  };

  // ─── Filtered Data ──────────────────────────────────
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      searchText === "" ||
      emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.username.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = roleFilter === "ALL" || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ─── Modal Handlers ─────────────────────────────────
  const openAddModal = () => {
    setEditingEmployee(null);
    form.resetFields();
    form.setFieldsValue({ status: true, role: "EMPLOYEE" });
    setIsModalVisible(true);
  };

  const openEditModal = (record: EmployeeRow) => {
    setEditingEmployee(record);
    form.setFieldsValue({
      name: record.name,
      username: record.username,
      email: record.email,
      role: record.role,
      status: record.status === "ACTIVE",
    });
    setIsModalVisible(true);
  };

  const openResetPwdModal = (record: EmployeeRow) => {
    setResetTarget(record);
    resetForm.resetFields();
    setIsResetPwdModalVisible(true);
  };

  // ─── CRUD ───────────────────────────────────────────
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        status: values.status ? "ACTIVE" : "INACTIVE",
      };
      if (editingEmployee && !payload.password) {
        delete payload.password;
      }

      let res;
      if (editingEmployee) {
        res = await fetch(`/api/admin/employees/${editingEmployee.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        message.success(`Employee ${editingEmployee ? "updated" : "created"} successfully`);
        setIsModalVisible(false);
        fetchEmployees();
      } else {
        const err = await res.json();
        message.error(err.message || "Operation failed");
      }
    } catch {
      // form validation
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/employees/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Employee deleted");
        fetchEmployees();
      } else {
        const err = await res.json();
        message.error(err.message || "Delete failed");
      }
    } catch {
      message.error("Delete failed");
    }
  };

  const handleToggleStatus = async (record: EmployeeRow) => {
    const newStatus = record.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      const res = await fetch(`/api/admin/employees/${record.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: record.name,
          username: record.username,
          email: record.email,
          role: record.role,
          status: newStatus,
        }),
      });
      if (res.ok) {
        message.success(`Employee ${newStatus === "ACTIVE" ? "activated" : "deactivated"}`);
        fetchEmployees();
      } else {
        const err = await res.json();
        message.error(err.message || "Status update failed");
      }
    } catch {
      message.error("Status update failed");
    }
  };

  const handleResetPassword = async () => {
    if (!resetTarget) return;
    try {
      const values = await resetForm.validateFields();
      const res = await fetch(`/api/admin/employees/${resetTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resetTarget.name,
          username: resetTarget.username,
          email: resetTarget.email,
          role: resetTarget.role,
          status: resetTarget.status,
          password: values.newPassword,
        }),
      });
      if (res.ok) {
        message.success("Password reset successfully");
        setIsResetPwdModalVisible(false);
      } else {
        const err = await res.json();
        message.error(err.message || "Password reset failed");
      }
    } catch {
      // form validation
    }
  };

  // ─── Columns ────────────────────────────────────────
  const columns: ColumnsType<EmployeeRow> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: EmployeeRow) => (
        <div>
          <div style={{ fontWeight: 600, color: "#1E1B6B" }}>{name}</div>
          <div style={{ fontSize: 12, color: "#999" }}>@{record.username}</div>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const color = role === "SUPER_ADMIN" ? "purple" : role === "MANAGER" ? "gold" : "blue";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v: string) => new Date(v).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 240,
      render: (_: any, record: EmployeeRow) => (
        <Space size="small" wrap>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button size="small" icon={<KeyOutlined />} onClick={() => openResetPwdModal(record)}>
            Reset Pwd
          </Button>
          <Popconfirm
            title={`${record.status === "ACTIVE" ? "Deactivate" : "Activate"} this employee?`}
            onConfirm={() => handleToggleStatus(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              size="small"
              icon={<UserSwitchOutlined />}
              type={record.status === "ACTIVE" ? "default" : "primary"}
            >
              {record.status === "ACTIVE" ? "Deactivate" : "Activate"}
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Permanently delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ─── Render ─────────────────────────────────────────
  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>
          Employee Management
        </h1>
        <p style={{ color: "#888", margin: "4px 0 0" }}>Manage your team members and access controls</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>TOTAL EMPLOYEES</span>}
              value={stats.total}
              prefix={<TeamOutlined style={{ color: "#1E1B6B" }} />}
              valueStyle={{ color: "#1E1B6B", fontWeight: 800 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>ACTIVE</span>}
              value={stats.active}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a", fontWeight: 800 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>MANAGERS</span>}
              value={stats.managers}
              prefix={<LockOutlined style={{ color: "#AD002E" }} />}
              valueStyle={{ color: "#AD002E", fontWeight: 800 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card variant="borderless" style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <Statistic
              title={<span style={{ color: "#888", fontWeight: 600, fontSize: 12 }}>INACTIVE</span>}
              value={stats.inactive}
              prefix={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
              valueStyle={{ color: "#ff4d4f", fontWeight: 800 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Toolbar */}
      <Card
        variant="borderless"
        style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 24 }}
        styles={{ body: { padding: "16px 20px" } }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <Space wrap>
            <Input
              placeholder="Search by name, username, email..."
              prefix={<SearchOutlined style={{ color: "#999" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 280 }}
              allowClear
            />
            <Select
              value={roleFilter}
              onChange={setRoleFilter}
              style={{ width: 160 }}
            >
              <Option value="ALL">All Roles</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="EMPLOYEE">Employee</Option>
              <Option value="SUPER_ADMIN">Super Admin</Option>
            </Select>
          </Space>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchEmployees} />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openAddModal}
              style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
            >
              Add Employee
            </Button>
          </Space>
        </div>
      </Card>

      {/* Table */}
      <Card
        variant="borderless"
        style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `Total ${t} employees` }}
          style={{ borderRadius: 12, overflow: "hidden" }}
        />
      </Card>

      {/* Add/Edit Employee Modal */}
      <Modal
        title={
          <span style={{ fontWeight: 700, color: "#1E1B6B" }}>
            {editingEmployee ? "Edit Employee" : "Add New Employee"}
          </span>
        }
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
        width={520}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="e.g. John Doe" />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Username is required" }]}>
            <Input placeholder="e.g. johndoe" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: "email", required: true, message: "Valid email required" }]}>
            <Input placeholder="e.g. john@bank.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={editingEmployee ? [] : [{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder={editingEmployee ? "Leave blank to keep unchanged" : "Enter password"} />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: "Role is required" }]}>
            <Select placeholder="Select role">
              <Option value="MANAGER">Manager</Option>
              <Option value="EMPLOYEE">Employee</Option>
              <Option value="SUPER_ADMIN">Super Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Active Status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        title={
          <span style={{ fontWeight: 700, color: "#AD002E" }}>
            <KeyOutlined /> Reset Password — {resetTarget?.name}
          </span>
        }
        open={isResetPwdModalVisible}
        onOk={handleResetPassword}
        onCancel={() => setIsResetPwdModalVisible(false)}
        okText="Reset Password"
        okButtonProps={{ danger: true }}
        width={420}
      >
        <Form form={resetForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "New password is required" },
              { min: 4, message: "Password must be at least 4 characters" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm the password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
