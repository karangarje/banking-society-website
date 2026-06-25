"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, Modal, Form, Input, Select, Switch, App, Popconfirm, Image, Tag, Space, Card, Upload, InputNumber, Spin } from "antd";
import type { UploadFile } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined, PlaySquareOutlined, FileImageOutlined, ReloadOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

const { Option } = Select;
const { TabPane } = Tabs;

interface GalleryMediaRow {
  id: string;
  titleEn: string;
  titleMr: string;
  descriptionEn: string;
  descriptionMr: string;
  category: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

interface GalleryVideoRow {
  id: string;
  titleEn: string;
  titleMr: string;
  youtubeUrl: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function GalleryMediaPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [images, setImages] = useState<GalleryMediaRow[]>([]);
  const [videos, setVideos] = useState<GalleryVideoRow[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isVidModalOpen, setIsVidModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formImage] = Form.useForm();
  const [formVideo] = Form.useForm();
  const { message } = App.useApp();

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const res = await fetch("/api/admin/gallery-media");
      if (res.ok) {
        const json = await res.json();
        setImages(json);
      }
    } catch (err) {
      message.error("Failed to load gallery images");
    } finally {
      setLoadingImages(false);
    }
  };

  const fetchVideos = async () => {
    setLoadingVideos(true);
    try {
      const res = await fetch("/api/admin/videos");
      if (res.ok) {
        const json = await res.json();
        setVideos(json);
      }
    } catch (err) {
      message.error("Failed to load gallery videos");
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchImages();
      fetchVideos();
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
        <p className="text-gray-600">You do not have permission to access the Gallery & Media Manager.</p>
      </div>
    );
  }

  const handleSaveImage = async () => {
    try {
      const values = await formImage.validateFields();
      let finalImageUrl = editingId ? (images.find(img => img.id === editingId)?.imageUrl || "") : "";

      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.url) {
          finalImageUrl = file.url;
        } else if (file.originFileObj) {
          setUploadingImage(true);
          const formData = new FormData();
          formData.append("file", file.originFileObj);
          
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            const err = await uploadRes.json();
            throw new Error(err.message || "Upload failed");
          }
          
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        }
      } else {
        finalImageUrl = "";
      }

      if (!finalImageUrl) {
        message.error("Please upload an image");
        return;
      }

      const payload = {
        titleEn: values.titleEn,
        titleMr: values.titleMr,
        descriptionEn: values.descriptionEn || "",
        descriptionMr: values.descriptionMr || "",
        category: values.category,
        sortOrder: values.sortOrder || 0,
        isActive: values.isActive ?? true,
        imageUrl: finalImageUrl,
      };

      const url = editingId ? `/api/admin/gallery-media/${editingId}` : "/api/admin/gallery-media";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success(`Image ${editingId ? "updated" : "added"} successfully`);
        setIsImgModalOpen(false);
        formImage.resetFields();
        setFileList([]);
        setEditingId(null);
        fetchImages();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save image");
      }
    } catch (err: any) {
      if (err.message) {
        message.error(err.message);
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddVideo = async () => {
    try {
      const values = await formVideo.validateFields();
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        message.success("Video added to gallery");
        setIsVidModalOpen(false);
        fetchVideos();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to add video");
      }
    } catch (err) {
      // validation error
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery-media/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Image deleted successfully");
        fetchImages();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete");
      }
    } catch (err) {
      message.error("Failed to delete image");
    }
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Video deleted");
        fetchVideos();
      } else {
        const err = await res.json();
        message.error(err.message || "Failed to delete");
      }
    } catch (err) {
      message.error("Failed to delete video");
    }
  };

  const openAddImageModal = () => {
    formImage.resetFields();
    formImage.setFieldsValue({ isActive: true, sortOrder: 0 });
    setFileList([]);
    setEditingId(null);
    setIsImgModalOpen(true);
  };

  const openEditImageModal = (record: GalleryMediaRow) => {
    formImage.setFieldsValue({
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
        name: "gallery-image.jpg",
        status: "done",
        url: record.imageUrl,
      },
    ]);
    setEditingId(record.id);
    setIsImgModalOpen(true);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const imageColumns: ColumnsType<GalleryMediaRow> = [
    {
      title: "Preview",
      dataIndex: "imageUrl",
      key: "preview",
      width: 100,
      render: (url: string) => <Image src={url} alt="preview" width={70} height={50} style={{ objectFit: "cover", borderRadius: 4 }} />,
    },
    {
      title: "Title (English)",
      dataIndex: "titleEn",
      key: "titleEn",
    },
    {
      title: "Title (Marathi)",
      dataIndex: "titleMr",
      key: "titleMr",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (v: string) => <Tag color="blue">{v.toUpperCase()}</Tag>,
    },
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
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
      width: 120,
      render: (_, record: GalleryMediaRow) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditImageModal(record)} />
          <Popconfirm title="Delete image?" onConfirm={() => handleDeleteImage(record.id)} okText="Yes" cancelText="No">
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const videoColumns: ColumnsType<GalleryVideoRow> = [
    {
      title: "Thumbnail",
      dataIndex: "youtubeUrl",
      key: "thumbnail",
      width: 120,
      render: (url: string) => {
        const id = getYoutubeId(url);
        return id ? (
          <Image
            src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
            alt="video-thumb"
            width={90}
            height={50}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          <Tag color="red">Invalid Link</Tag>
        );
      },
    },
    {
      title: "Title (English)",
      dataIndex: "titleEn",
      key: "titleEn",
    },
    {
      title: "Title (Marathi)",
      dataIndex: "titleMr",
      key: "titleMr",
    },
    {
      title: "Youtube URL",
      dataIndex: "youtubeUrl",
      key: "youtubeUrl",
      render: (url: string) => <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#AD002E" }}>{url}</a>,
    },
    {
      title: "Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (featured: boolean) => <Tag color={featured ? "gold" : "default"}>{featured ? "FEATURED" : "NO"}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record: GalleryVideoRow) => (
        <Popconfirm title="Delete video?" onConfirm={() => handleDeleteVideo(record.id)} okText="Yes" cancelText="No">
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Gallery & Media Manager</h1>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => { fetchImages(); fetchVideos(); }} />
        </Space>
      </div>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab={<span><FileImageOutlined /> Photos / Images</span>} key="1">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={openAddImageModal}>
              Add Image
            </Button>
          </div>
          <Table columns={imageColumns} dataSource={images} rowKey="id" loading={loadingImages} />
        </TabPane>

        <TabPane tab={<span><PlaySquareOutlined /> YouTube Videos</span>} key="2">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => { formVideo.resetFields(); formVideo.setFieldsValue({ isFeatured: false }); setIsVidModalOpen(true); }}>
              Add Video
            </Button>
          </div>
          <Table columns={videoColumns} dataSource={videos} rowKey="id" loading={loadingVideos} />
        </TabPane>
      </Tabs>

      {/* Image Modal */}
      <Modal 
        title={editingId ? "Edit Gallery Image" : "Add Gallery Image"} 
        open={isImgModalOpen} 
        onOk={handleSaveImage} 
        onCancel={() => setIsImgModalOpen(false)} 
        okText="Save" 
        confirmLoading={uploadingImage}
      >
        <Form form={formImage} layout="vertical">
          <Form.Item name="titleEn" label="Title (English)" rules={[{ required: true, message: "Title in English is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="titleMr" label="Title (Marathi)" rules={[{ required: true, message: "Title in Marathi is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="descriptionEn" label="Description (English)">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="descriptionMr" label="Description (Marathi)">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="category" label="Category / Album" rules={[{ required: true, message: "Please select a category" }]}>
            <Select placeholder="Select album category">
              <Option value="agm">AGMs & Summits</Option>
              <Option value="social">Social Work</Option>
              <Option value="inauguration">Branch Openings</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload Image" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              maxCount={1}
              onRemove={() => setFileList([])}
              beforeUpload={(file) => {
                const ext = file.name.split('.').pop()?.toLowerCase();
                const isValidType = ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type) ||
                                    ["jpg", "jpeg", "png", "webp"].includes(ext || "");
                if (!isValidType) {
                  message.error("You can only upload JPG, PNG, or WEBP files!");
                  return Upload.LIST_IGNORE;
                }
                const isValidSize = file.size / 1024 / 1024 <= 5;
                if (!isValidSize) {
                  message.error("Image must be smaller than 5MB!");
                  return Upload.LIST_IGNORE;
                }
                setFileList([{
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                } as any]);
                return false;
              }}
            >
              {fileList.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Select Image</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item name="sortOrder" label="Sort Order" rules={[{ required: true, message: "Sort order is required" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Video Modal */}
      <Modal title="Add YouTube Video" open={isVidModalOpen} onOk={handleAddVideo} onCancel={() => setIsVidModalOpen(false)} okText="Save">
        <Form form={formVideo} layout="vertical">
          <Form.Item name="titleEn" label="Video Title (English)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="titleMr" label="Video Title (Marathi)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="youtubeUrl" label="YouTube URL" rules={[{ required: true, type: "url" }]}>
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>
          <Form.Item name="isFeatured" label="Featured / Pin on Home" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
