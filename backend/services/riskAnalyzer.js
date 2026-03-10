import axios from "axios";

export const analyzeConversationRisk = async (conversation) => {
  try {
    const prompt = `
You are a mental health safety analyzer.

Analyze the following conversation between a student and AI chatbot.

Conversation:
${conversation}

Return ONLY JSON in this format:

{
 "riskLevel": "low | medium | high | critical",
 "reason": "short explanation"
}
`;

const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "meta-llama/llama-4-maverick",
      max_tokens: 150,        // ⭐ IMPORTANT FIX
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: "You detect mental health risk from conversations."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

    const output = response.data.choices[0].message.content;

    // Clean markdown
    let cleaned = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error(
      "Risk Analysis Error:",
      error?.response?.data || error.message
    );

    return {
      riskLevel: "medium", // safer default
      reason: "analysis_failed"
    };
  }
};