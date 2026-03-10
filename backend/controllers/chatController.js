import Message from "../models/Message.js";
import FlaggedStudent from "../models/FlaggedStudent.js";
import { analyzeConversationRisk } from "../services/riskAnalyzer.js";

export const chatWithBot = async (req, res) => {
  const { userId, message } = req.body;
  

  console.log("Incoming request:", req.body); // DEBUG

  // Save student message
  await Message.create({
    userId,
    role: "student",
    content: message
  });

  // Get last 10 messages
  const history = await Message.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10);

  const conversation = history
    .map((m) => `${m.role}: ${m.content}`)
    .reverse()
    .join("\n");

  // Analyze risk
  const riskResult = await analyzeConversationRisk(conversation);

  if (riskResult.riskLevel === "high" || riskResult.riskLevel === "critical") {

    const exists = await FlaggedStudent.findOne({
      userId,
      status: "pending"
    });

    if (!exists) {
      await FlaggedStudent.create({
        userId,
        riskLevel: riskResult.riskLevel,
        reason: riskResult.reason,
        conversationSnippet: conversation
      });
    }
  }

  res.json({ success: true });
};