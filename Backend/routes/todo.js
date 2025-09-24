const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const router = express.Router();

const JWT_SECRET = "minet@123";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token, authorization denied" });

    // Split Bearer <token>
    const token = authHeader.split(" ")[1]; 
    if (!token) return res.status(401).json({ error: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.id; 
        next();
    } catch (err) {
        console.log(err); 
        res.status(401).json({ error: "Invalid token" });
    }
};

// Get all todos
router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
});

// Add todo
router.post("/", authMiddleware, async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, user: req.userId });
  res.json(todo);
});

// Toggle complete
router.put("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;