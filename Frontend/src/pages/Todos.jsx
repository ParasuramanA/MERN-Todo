import React, { useState, useEffect } from "react";
import { List, Input, Button, Checkbox, Card } from "antd";
import API from "../api/api";
import { notifySuccess, notifyError } from "../utils/notify";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      console.log(res);
      
      setTodos(res.data);
    } catch {
      notifyError("Error", "Please login first");
      // navigate("/login");
    }
  };

  const addTodo = async () => {
    if (!text) return;
    try {
      await API.post("/todos", { text });
      setText("");
      fetchTodos();
    } catch {
      notifyError("Error", "Cannot add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      await API.put(`/todos/${id}`);
      fetchTodos();
    } catch {
      notifyError("Error", "Cannot toggle todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch {
      notifyError("Error", "Cannot delete todo");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Card
      title="Todo List"
      extra={<Button type="primary" danger onClick={logout}>Logout</Button>}
      style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}
    >
      <Input.Search
        value={text}
        onChange={(e) => setText(e.target.value)}
        enterButton="Add"
        onSearch={addTodo}
      />
      <List
        style={{ marginTop: 20 }}
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => toggleTodo(todo._id)}>Toggle</Button>,
              <Button danger type="link" onClick={() => deleteTodo(todo._id)}>Delete</Button>,
            ]}
          >
            <Checkbox checked={todo.completed}>{todo.text}</Checkbox>
          </List.Item>
        )}
      />
    </Card>
  );
}
