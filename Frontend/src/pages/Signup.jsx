import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/notify";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await API.post("/auth/register", values);
      notifySuccess("Signup Successful", "You can now login.");
      navigate("/login");
    } catch (err) {
      notifyError("Signup Failed", err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Signup" style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Please enter a username" }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter a password" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Signup
        </Button>
      </Form>
      <div style={{ marginTop: 10 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </Card>
  );
}
