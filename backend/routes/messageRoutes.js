import express from "express";
import CommunityChat from "../models/CommunityChat.js";

const router = express.Router();

// fetch old messages
router.get("/:communityId", async (req, res) => {
  try {
    const messages = await CommunityChat.find({
      communityId: req.params.communityId,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

export default router;
