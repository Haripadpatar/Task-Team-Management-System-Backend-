const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create task → manager only
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["manager"]),
  async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: "Task creation failed" });
    }
  }
);

// Get tasks → manager sees all, member sees own
router.get("/", authMiddleware, async (req, res) => {
  const tasks =
    req.user.role === "manager"
      ? await Task.find()
      : await Task.find({ assignedTo: req.user.id });

  res.json(tasks);
});

// Update task status → assigned user OR manager
router.patch("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (
    task.assignedTo.toString() !== req.user.id &&
    req.user.role !== "manager"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  task.status = req.body.status;
  await task.save();

  res.json(task);
});

// Delete task → manager only
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  }
);

module.exports = router;
