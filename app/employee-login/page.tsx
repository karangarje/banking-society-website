"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function EmployeeLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const getErrorMessage = (error: string): string => {
    if (error === "CredentialsSignin" || error === "undefined" || !error) {
      return "Invalid username or password. Please try again.";
    }
    return error;
  };

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const res = await signIn("employee-login", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (res?.error) {
        message.error(getErrorMessage(res.error));
      } else if (res?.ok) {
        message.success("Login successful! Redirecting...");
        router.push("/employee-dashboard");
      }
    } catch (err) {
      message.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <Card title="Employee Login" style={{ width: 400 }}>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            label="Username or Email"
            rules={[{ required: true, message: "Please input your username or email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter username or email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
