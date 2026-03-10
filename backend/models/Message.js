// models/Message.js

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: String,
  role: String, // student or bot
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Message", messageSchema);