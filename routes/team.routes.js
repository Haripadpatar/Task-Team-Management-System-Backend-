const express = require("express");
const router = express.Router();

const Team = require("../models/Team");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create team → admin, manager
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  async (req, res) => {
    try {
      const team = await Team.create({
        name: req.body.name,
        createdBy: req.user.id
      });
      res.status(201).json(team);
    } catch (err) {
      res.status(500).json({ message: "Failed to create team" });
    }
  }
);

// Get all teams → any logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

module.exports = router;

