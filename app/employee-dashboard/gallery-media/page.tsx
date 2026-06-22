"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, Modal, Form, Input, Select, Switch, message, Popconfirm, Image, Tag, Space, Card, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined, PlaySquareOutlined, FileImageOutlined, ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

const { Option } = Select;
const { TabPane } = Tabs;

interface GalleryImageRow {
  id: string;
  titleEn: string;
  titleMr: string;
  category: string;
  imageUrl: string;
  sortingOrder: number;
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
  const [images, setImages] = useState<GalleryImageRow[]>([]);
  const [videos, setVideos] = useState<GalleryVideoRow[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isVidModalOpen, setIsVidModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formImage] = Form.useForm();
  const [formVideo] = Form.useForm();

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const res = await fetch("/api/admin/gallery");
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
    return <div style={{ padding: "2rem" }}><h1>Loading...</h1></div>;
  }

  if (!session) {
    return <div style={{ padding: "2rem" }}><h1>403 - Access Denied</h1></div>;
  }

  const handleAddImage = async () => {
    try {
      const values = await formImage.validateFields();
      
      if (fileList.length === 0) {
        message.error("Please upload an image");
        return;
      }

      setUploadingImage(true);
      
      let finalImageUrl = "";
      const file = fileList[0];

      if (file.status === "done" && file.response?.url) {
        finalImageUrl = file.response.url;
      } else if (file.originFileObj) {
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
      } else {
        throw new Error("Invalid file state");
      }

      const payload = {
        titleEn: values.titleEn,
        titleMr: values.titleMr,
        category: values.category,
        sortingOrder: values.sortingOrder,
        isActive: values.isActive,
        imageUrl: finalImageUrl,
      };

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success("Image added to gallery");
        setIsImgModalOpen(false);
        setFileList([]);
        fetchImages();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save to database");
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
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Image deleted");
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

  // Helper to extract YouTube video ID to show a thumbnail preview
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const imageColumns: ColumnsType<GalleryImageRow> = [
    {
      title: "Preview",
      dataIndex: "imageUrl",
      key: "preview",
      width: 100,
      render: (url: string) => <Image src={url} alt="preview" width={60} height={40} style={{ objectFit: "cover", borderRadius: 4 }} />,
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
      dataIndex: "sortingOrder",
      key: "sortingOrder",
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
      width: 100,
      render: (_, record: GalleryImageRow) => (
        <Popconfirm title="Delete image?" onConfirm={() => handleDeleteImage(record.id)} okText="Yes" cancelText="No">
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => { 
              formImage.resetFields(); 
              formImage.setFieldsValue({ isActive: true }); 
              setFileList([]);
              setIsImgModalOpen(true); 
            }}>
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
      <Modal title="Add Gallery Image" open={isImgModalOpen} onOk={handleAddImage} onCancel={() => setIsImgModalOpen(false)} okText="Save" confirmLoading={uploadingImage}>
        <Form form={formImage} layout="vertical">
          <Form.Item name="titleEn" label="Title (English)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="titleMr" label="Title (Marathi)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category / Album" rules={[{ required: true }]}>
            <Select placeholder="Select album category">
              <Option value="events">Events</Option>
              <Option value="branches">Branches</Option>
              <Option value="awards">Awards & Audits</Option>
              <Option value="inauguration">Inauguration / VIPs</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload Image" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              maxCount={1}
              onRemove={() => setFileList([])}
              beforeUpload={(file) => {
                const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
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
                  status: "done", // mock done so it doesn't auto upload, we upload on save
                  originFileObj: file,
                } as any]);
                return false; // Prevent automatic upload
              }}
            >
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Select Image from PC</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item name="sortingOrder" label="Sort Order" rules={[{ required: true }]}>
            <Input type="number" placeholder="0" />
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
