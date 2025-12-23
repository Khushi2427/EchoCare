import express from "express";
import Community from "../models/Community.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

// Create community
router.post("/", verifyUser, async (req, res) => {
  const community = await Community.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.user._id,
    members: [req.user._id],
  });
  res.json(community);
});

// Get all communities
router.get("/", verifyUser, async (req, res) => {
  const communities = await Community.find().populate("owner", "name");
  res.json(communities);
});

// Join community
router.post("/:id/join", verifyUser, async (req, res) => {
  await Community.findByIdAndUpdate(req.params.id, {
    $addToSet: { members: req.user._id },
  });
  res.json({ message: "Joined community" });
});

// Leave community
router.post("/:id/leave", verifyUser, async (req, res) => {
  await Community.findByIdAndUpdate(req.params.id, {
    $pull: { members: req.user._id },
  });
  res.json({ message: "Left community" });
});

// Get user's communities
router.get("/my", verifyUser, async (req, res) => {
  const communities = await Community.find({
    members: req.user._id,
  });
  res.json(communities);
});

export default router;
