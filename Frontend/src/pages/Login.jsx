import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/notify";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", values);
      localStorage.setItem("token", res.data.token);
      notifySuccess("Login Successful");
      navigate("/todos");
    } catch (err) {
      notifyError("Login Failed", err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Please enter username" }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter password" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form>
      <div style={{ marginTop: 10 }}>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </div>
    </Card>
  );
}
