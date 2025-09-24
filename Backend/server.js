const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tododb").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

app.use("/auth", require("./routes/auth"));
app.use("/todos", require("./routes/todo"));

app.listen(5000, () => console.log("Server running on port 5000"));
