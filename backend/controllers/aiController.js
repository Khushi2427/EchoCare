import axios from "axios";
import Message from "../models/Message.js";
import FlaggedStudent from "../models/FlaggedStudent.js";
import { analyzeConversationRisk } from "../services/riskAnalyzer.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message, userId } = req.body;

    console.log("REQ BODY:", req.body);

    // 1️⃣ Save student message
    await Message.create({
      userId,
      role: "student",
      content: message,
    });

    // 2️⃣ Send message to AI chatbot
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-4-maverick",

        max_tokens: 300, // ⭐ FIX (prevents credit error)
        temperature: 0.7,

        messages: [
          {
            role: "system",
            content:
              "You are a compassionate multilingual mental health support chatbot. Provide emotional support, grounding techniques, and encourage professional help when needed. Never give medical diagnosis. Suggest the user join our Community Space for peer support. If the user shows heavy stress or suicidal ideation, strongly encourage contacting a mental health professional or helpline.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://echo-care-omega.vercel.app",
          "X-Title": "Mental Wellness App",
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;

    // 3️⃣ Save AI response
    await Message.create({
      userId,
      role: "bot",
      content: aiReply,
    });

    // 4️⃣ Fetch last 10 messages
    const history = await Message.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    const conversation = history
      .map((m) => `${m.role}: ${m.content}`)
      .reverse()
      .join("\n");

    // 5️⃣ Risk analysis
    const riskResult = await analyzeConversationRisk(conversation);

    // 6️⃣ Flag student if needed
    if (
      riskResult.riskLevel === "high" ||
      riskResult.riskLevel === "critical"
    ) {
      const exists = await FlaggedStudent.findOne({
        userId,
        status: "pending",
      });

      if (!exists) {
        await FlaggedStudent.create({
          userId,
          riskLevel: riskResult.riskLevel,
          reason: riskResult.reason,
          conversationSnippet: conversation,
        });
      }
    }

    // 7️⃣ Send response
    res.json({
      reply: aiReply,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "AI chatbot failed" });
  }
};