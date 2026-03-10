import mongoose from "mongoose";

const flaggedStudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // 👈 link to User collection
    required: true
  },

  riskLevel: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    required: true
  },

  reason: {
    type: String
  },

  conversationSnippet: {
    type: String
  },

  status: {
    type: String,
    enum: ["pending", "support_provided"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("FlaggedStudent", flaggedStudentSchema);