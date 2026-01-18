require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// ROUTES (👇 THIS IS THE ANSWER TO "WHERE")
app.use("/auth", require("./routes/auth.routes"));
app.use("/teams", require("./routes/team.routes"));
app.use("/tasks", require("./routes/task.routes"));

// Test route
app.get("/", (req, res) => {
  res.send("Task & Team Management API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
