"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Switch, Select, DatePicker, message, Popconfirm, Space, Card, Row, Col, Tabs, Upload, Image, InputNumber, Tag } from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, EditOutlined, UploadOutlined, InfoCircleOutlined, TrophyOutlined, TeamOutlined, HeartOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

// Types
interface AboutCoreSetting {
  id?: string;
  key: string;
  valueEn: string;
  valueMr: string;
}

interface BoardMemberRow {
  id: string;
  name: string;
  designationEn: string;
  designationMr: string;
  imageUrl: string;
  isActive: boolean;
  sortingOrder: number;
}

interface AwardRow {
  id: string;
  titleEn: string;
  titleMr: string;
  year: string;
  descriptionEn: string;
  descriptionMr: string;
  imageUrl: string;
  isActive: boolean;
  sortingOrder: number;
}

interface SocialActivityRow {
  id: string;
  titleEn: string;
  titleMr: string;
  date: string;
  descriptionEn: string;
  descriptionMr: string;
  imageUrl: string;
  isActive: boolean;
  sortingOrder: number;
}

export default function AboutContentPage() {
  const [activeTab, setActiveTab] = useState("core");

  // Core CMS state
  const [coreLoading, setCoreLoading] = useState(false);
  const [coreSettings, setCoreSettings] = useState<Record<string, AboutCoreSetting>>({
    "about.chairman.message": { key: "about.chairman.message", valueEn: "", valueMr: "" },
    "about.history": { key: "about.history", valueEn: "", valueMr: "" },
    "about.vision": { key: "about.vision", valueEn: "", valueMr: "" },
    "about.mission": { key: "about.mission", valueEn: "", valueMr: "" },
  });

  // Board state
  const [boardData, setBoardData] = useState<BoardMemberRow[]>([]);
  const [boardLoading, setBoardLoading] = useState(false);
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [boardForm] = Form.useForm();
  const [boardEditingId, setBoardEditingId] = useState<string | null>(null);

  // Awards state
  const [awardsData, setAwardsData] = useState<AwardRow[]>([]);
  const [awardsLoading, setAwardsLoading] = useState(false);
  const [awardsModalOpen, setAwardsModalOpen] = useState(false);
  const [awardsForm] = Form.useForm();
  const [awardsEditingId, setAwardsEditingId] = useState<string | null>(null);

  // Social activities state
  const [socialData, setSocialData] = useState<SocialActivityRow[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [socialForm] = Form.useForm();
  const [socialEditingId, setSocialEditingId] = useState<string | null>(null);

  // Upload state
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fetch core CMS settings
  const fetchCoreSettings = async () => {
    setCoreLoading(true);
    try {
      const res = await fetch("/api/admin/about-content");
      if (res.ok) {
        const json: any[] = await res.json();
        const settingsMap = { ...coreSettings };
        json.forEach((item) => {
          if (settingsMap[item.key]) {
            settingsMap[item.key] = { id: item.id, key: item.key, valueEn: item.valueEn, valueMr: item.valueMr };
          }
        });
        setCoreSettings(settingsMap);
      }
    } catch (err) {
      message.error("Failed to load core about settings");
    } finally {
      setCoreLoading(false);
    }
  };

  // Save core CMS setting
  const saveCoreSetting = async (key: string) => {
    setCoreLoading(true);
    try {
      const item = coreSettings[key];
      const res = await fetch("/api/admin/about-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        message.success("Content saved successfully");
        fetchCoreSettings();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save core setting");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    } finally {
      setCoreLoading(false);
    }
  };

  // Fetch Board members
  const fetchBoardData = async () => {
    setBoardLoading(true);
    try {
      const res = await fetch("/api/admin/board-members");
      if (res.ok) {
        const json = await res.json();
        setBoardData(json);
      }
    } catch (err) {
      message.error("Failed to load board members");
    } finally {
      setBoardLoading(false);
    }
  };

  // Save Board member
  const handleBoardSave = async () => {
    try {
      const values = await boardForm.validateFields();
      let imageUrl = boardEditingId ? (boardData.find(b => b.id === boardEditingId)?.imageUrl || "") : "";

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.url) {
          imageUrl = file.url;
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
          imageUrl = uploadData.url;
        }
      }

      if (!imageUrl) {
        message.error("Please upload a photo");
        return;
      }

      const payload = { ...values, imageUrl };
      const url = boardEditingId ? `/api/admin/board-members/${boardEditingId}` : "/api/admin/board-members";
      const method = boardEditingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success("Board member saved successfully");
        setBoardModalOpen(false);
        fetchBoardData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save board member");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleBoardDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/board-members/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Board member deleted successfully");
        fetchBoardData();
      }
    } catch (err) {
      message.error("Failed to delete board member");
    }
  };

  // Fetch Awards
  const fetchAwardsData = async () => {
    setAwardsLoading(true);
    try {
      const res = await fetch("/api/admin/awards");
      if (res.ok) {
        const json = await res.json();
        setAwardsData(json);
      }
    } catch (err) {
      message.error("Failed to load awards");
    } finally {
      setAwardsLoading(false);
    }
  };

  // Save Award
  const handleAwardSave = async () => {
    try {
      const values = await awardsForm.validateFields();
      let imageUrl = awardsEditingId ? (awardsData.find(a => a.id === awardsEditingId)?.imageUrl || "") : "";

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.url) {
          imageUrl = file.url;
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
          imageUrl = uploadData.url;
        }
      }

      if (!imageUrl) {
        message.error("Please upload an award image");
        return;
      }

      const payload = { ...values, imageUrl };
      const url = awardsEditingId ? `/api/admin/awards/${awardsEditingId}` : "/api/admin/awards";
      const method = awardsEditingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success("Award saved successfully");
        setAwardsModalOpen(false);
        fetchAwardsData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save award");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleAwardDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/awards/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Award deleted successfully");
        fetchAwardsData();
      }
    } catch (err) {
      message.error("Failed to delete award");
    }
  };

  // Fetch Social Activities
  const fetchSocialData = async () => {
    setSocialLoading(true);
    try {
      const res = await fetch("/api/admin/social-activities");
      if (res.ok) {
        const json = await res.json();
        setSocialData(json);
      }
    } catch (err) {
      message.error("Failed to load social activities");
    } finally {
      setSocialLoading(false);
    }
  };

  // Save Social Activity
  const handleSocialSave = async () => {
    try {
      const values = await socialForm.validateFields();
      let imageUrl = socialEditingId ? (socialData.find(s => s.id === socialEditingId)?.imageUrl || "") : "";

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.url) {
          imageUrl = file.url;
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
          imageUrl = uploadData.url;
        }
      }

      if (!imageUrl) {
        message.error("Please upload an activity image");
        return;
      }

      const payload = {
        ...values,
        imageUrl,
        date: values.date.toISOString(),
      };
      const url = socialEditingId ? `/api/admin/social-activities/${socialEditingId}` : "/api/admin/social-activities";
      const method = socialEditingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success("Social activity saved successfully");
        setSocialModalOpen(false);
        fetchSocialData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save social activity");
      }
    } catch (err: any) {
      message.error(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleSocialDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/social-activities/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Social activity deleted successfully");
        fetchSocialData();
      }
    } catch (err) {
      message.error("Failed to delete social activity");
    }
  };

  // Open modals helper
  const openBoardAdd = () => {
    boardForm.resetFields();
    boardForm.setFieldsValue({ isActive: true, sortingOrder: 0 });
    setFileList([]);
    setBoardEditingId(null);
    setBoardModalOpen(true);
  };

  const openBoardEdit = (record: BoardMemberRow) => {
    boardForm.setFieldsValue(record);
    setFileList([{ uid: "-1", name: "board-member.jpg", status: "done", url: record.imageUrl }]);
    setBoardEditingId(record.id);
    setBoardModalOpen(true);
  };

  const openAwardAdd = () => {
    awardsForm.resetFields();
    awardsForm.setFieldsValue({ isActive: true, sortingOrder: 0 });
    setFileList([]);
    setAwardsEditingId(null);
    setAwardsModalOpen(true);
  };

  const openAwardEdit = (record: AwardRow) => {
    awardsForm.setFieldsValue(record);
    setFileList([{ uid: "-1", name: "award.jpg", status: "done", url: record.imageUrl }]);
    setAwardsEditingId(record.id);
    setAwardsModalOpen(true);
  };

  const openSocialAdd = () => {
    socialForm.resetFields();
    socialForm.setFieldsValue({ isActive: true, sortingOrder: 0, date: dayjs() });
    setFileList([]);
    setSocialEditingId(null);
    setSocialModalOpen(true);
  };

  const openSocialEdit = (record: SocialActivityRow) => {
    socialForm.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setFileList([{ uid: "-1", name: "social.jpg", status: "done", url: record.imageUrl }]);
    setSocialEditingId(record.id);
    setSocialModalOpen(true);
  };

  // Initial loads
  useEffect(() => {
    fetchCoreSettings();
    fetchBoardData();
    fetchAwardsData();
    fetchSocialData();
  }, []);

  // Board columns
  const boardColumns: ColumnsType<BoardMemberRow> = [
    {
      title: "Photo",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => <Image src={url} alt="member" width={60} height={60} style={{ objectFit: "cover", borderRadius: "50%" }} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-semibold text-[#AD002E]/70">{text}</span>,
    },
    {
      title: "Designation (EN)",
      dataIndex: "designationEn",
      key: "designationEn",
    },
    {
      title: "Designation (MR)",
      dataIndex: "designationMr",
      key: "designationMr",
    },
    {
      title: "Sort Order",
      dataIndex: "sortingOrder",
      key: "sortingOrder",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => <Tag color={active ? "green" : "red"}>{active ? "Active" : "Inactive"}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined className="text-[#AD002E]" />} onClick={() => openBoardEdit(record)} />
          <Popconfirm title="Delete board director?" onConfirm={() => handleBoardDelete(record.id)} okText="Yes" cancelText="No">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Award columns
  const awardColumns: ColumnsType<AwardRow> = [
    {
      title: "Award Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => <Image src={url} alt="award" width={90} height={60} style={{ objectFit: "cover", borderRadius: 4 }} />,
    },
    {
      title: "Award Title",
      key: "details",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-bold text-[#AD002E]/70">{record.titleEn} ({record.year})</span>
          <span className="text-xs text-[#AD002E]/70">{record.titleMr}</span>
          <span className="text-xs text-[#AD002E]/70 line-clamp-1 mt-1">{record.descriptionEn}</span>
        </div>
      ),
    },
    {
      title: "Sort Order",
      dataIndex: "sortingOrder",
      key: "sortingOrder",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => <Tag color={active ? "green" : "red"}>{active ? "Active" : "Inactive"}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined className="text-[#AD002E]" />} onClick={() => openAwardEdit(record)} />
          <Popconfirm title="Delete this award?" onConfirm={() => handleAwardDelete(record.id)} okText="Yes" cancelText="No">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Social columns
  const socialColumns: ColumnsType<SocialActivityRow> = [
    {
      title: "Photo",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => <Image src={url} alt="activity" width={90} height={60} style={{ objectFit: "cover", borderRadius: 4 }} />,
    },
    {
      title: "Activity Title",
      key: "details",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-bold text-[#AD002E]/70">{record.titleEn}</span>
          <span className="text-xs text-[#AD002E]/70">{record.titleMr}</span>
          <span className="text-xs text-[#AD002E]/70 line-clamp-1 mt-1">{record.descriptionEn}</span>
        </div>
      ),
    },
    {
      title: "Activity Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => <Tag color={active ? "green" : "red"}>{active ? "Active" : "Inactive"}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined className="text-[#AD002E]" />} onClick={() => openSocialEdit(record)} />
          <Popconfirm title="Delete activity?" onConfirm={() => handleSocialDelete(record.id)} okText="Yes" cancelText="No">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: "core",
      label: (
        <span>
          <InfoCircleOutlined /> Core About Content
        </span>
      ),
      children: (
        <div className="space-y-6 mt-4">
          <Row gutter={[16, 16]}>
            {Object.keys(coreSettings).map((key) => {
              const item = coreSettings[key];
              const title = key.split(".").pop()?.toUpperCase() || key;
              return (
                <Col span={24} key={key}>
                  <Card title={`${title} CONTENT`} loading={coreLoading} className="shadow-md border-[#AD002E]/20">
                    <Row gutter={16}>
                      <Col xs={24} lg={12}>
                        <div className="mb-2 font-semibold text-[#AD002E]/70">English Text</div>
                        <Input.TextArea
                          rows={4}
                          value={item.valueEn}
                          onChange={(e) => {
                            setCoreSettings({
                              ...coreSettings,
                              [key]: { ...item, valueEn: e.target.value },
                            });
                          }}
                          placeholder={`Enter English translation for ${key}...`}
                        />
                      </Col>
                      <Col xs={24} lg={12}>
                        <div className="mb-2 font-semibold text-[#AD002E]/70">Marathi Text</div>
                        <Input.TextArea
                          rows={4}
                          value={item.valueMr}
                          onChange={(e) => {
                            setCoreSettings({
                              ...coreSettings,
                              [key]: { ...item, valueMr: e.target.value },
                            });
                          }}
                          placeholder={`Enter Marathi translation for ${key}...`}
                        />
                      </Col>
                    </Row>
                    <div className="mt-4 flex justify-end">
                      <Button
                        type="primary"
                        onClick={() => saveCoreSetting(key)}
                        style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
                      >
                        Save {title}
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      ),
    },
    {
      key: "board",
      label: (
        <span>
          <TeamOutlined /> Board Directors
        </span>
      ),
      children: (
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#AD002E]/70">Board Members</h3>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openBoardAdd}
              style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
            >
              Add Board Member
            </Button>
          </div>
          <Table columns={boardColumns} dataSource={boardData} rowKey="id" loading={boardLoading} />
        </div>
      ),
    },
    {
      key: "awards",
      label: (
        <span>
          <TrophyOutlined /> Awards
        </span>
      ),
      children: (
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#AD002E]/70">Bank Awards & Recognition</h3>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openAwardAdd}
              style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
            >
              Add Award
            </Button>
          </div>
          <Table columns={awardColumns} dataSource={awardsData} rowKey="id" loading={awardsLoading} />
        </div>
      ),
    },
    {
      key: "social",
      label: (
        <span>
          <HeartOutlined /> Social Activities
        </span>
      ),
      children: (
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#AD002E]/70">Social Activities & CSR</h3>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openSocialAdd}
              style={{ backgroundColor: "#AD002E", borderColor: "#AD002E" }}
            >
              Add Social Activity
            </Button>
          </div>
          <Table columns={socialColumns} dataSource={socialData} rowKey="id" loading={socialLoading} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20">
        <div>
          <h1 className="text-2xl font-bold text-[#AD002E]/70">About Us Content Manager</h1>
          <p className="text-sm text-[#AD002E]/70">Manage history, mission/vision statements, board of directors, public awards, and social CSR activities.</p>
        </div>
        <Button
          icon={<ReloadOutlined />}
          onClick={async () => {
            await fetchCoreSettings();
            await fetchBoardData();
            await fetchAwardsData();
            await fetchSocialData();
            message.success("Data reloaded successfully");
          }}
          className="border-[#AD002E]/20 hover:border-[#AD002E] hover:text-[#AD002E]"
        />
      </div>

      {/* Main Tabbed Panel */}
      <Card className="shadow-md border border-[#AD002E]/20">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>

      {/* Board Member Modal */}
      <Modal
        title={boardEditingId ? "Edit Board Member" : "Add Board Member"}
        open={boardModalOpen}
        onOk={handleBoardSave}
        onCancel={() => setBoardModalOpen(false)}
        confirmLoading={uploading}
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
      >
        <Form form={boardForm} layout="vertical" className="mt-4">
          <Form.Item name="name" label="Member Full Name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="e.g. Adv. Babasaheb Kavad" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="designationEn" label="Designation (English)" rules={[{ required: true, message: "English designation is required" }]}>
                <Input placeholder="e.g. Chairman / Board Director" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="designationMr" label="Designation (Marathi)" rules={[{ required: true, message: "Marathi designation is required" }]}>
                <Input placeholder="e.g. अध्यक्ष / संचालक" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isActive" label="Active" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Upload Board Member Image" required>
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
                setFileList([{ uid: file.uid, name: file.name, status: "done", originFileObj: file } as any]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select Photo from PC</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Award Modal */}
      <Modal
        title={awardsEditingId ? "Edit Award" : "Add Award"}
        open={awardsModalOpen}
        onOk={handleAwardSave}
        onCancel={() => setAwardsModalOpen(false)}
        confirmLoading={uploading}
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
      >
        <Form form={awardsForm} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="titleEn" label="Award Title (English)" rules={[{ required: true }]}>
                <Input placeholder="e.g. Best Co-operative Bank Award" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                <Input placeholder="e.g. 2024" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="titleMr" label="Award Title (Marathi)" rules={[{ required: true }]}>
            <Input placeholder="e.g. उत्कृष्ट सहकारी बँक पुरस्कार" />
          </Form.Item>
          <Form.Item name="descriptionEn" label="Description (English)" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="Award description..." />
          </Form.Item>
          <Form.Item name="descriptionMr" label="Description (Marathi)" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="पुरस्काराचे वर्णन..." />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isActive" label="Active" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Upload Award Certificate / Image" required>
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
                setFileList([{ uid: file.uid, name: file.name, status: "done", originFileObj: file } as any]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select Image from PC</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Social Activity Modal */}
      <Modal
        title={socialEditingId ? "Edit Social Activity" : "Add Social Activity"}
        open={socialModalOpen}
        onOk={handleSocialSave}
        onCancel={() => setSocialModalOpen(false)}
        confirmLoading={uploading}
        okButtonProps={{ style: { backgroundColor: "#AD002E", borderColor: "#AD002E" } }}
      >
        <Form form={socialForm} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="titleEn" label="Activity Title (English)" rules={[{ required: true }]}>
                <Input placeholder="e.g. Free Health Checkup Camp 2024" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="date" label="Activity Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="titleMr" label="Activity Title (Marathi)" rules={[{ required: true }]}>
            <Input placeholder="e.g. मोफत आरोग्य तपासणी शिबिर २०२४" />
          </Form.Item>
          <Form.Item name="descriptionEn" label="Description (English)" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="Describe the activity..." />
          </Form.Item>
          <Form.Item name="descriptionMr" label="Description (Marathi)" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="सामाजिक उपक्रमाचे वर्णन..." />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isActive" label="Active" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Upload Activity Photo" required>
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
                setFileList([{ uid: file.uid, name: file.name, status: "done", originFileObj: file } as any]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select Photo from PC</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
