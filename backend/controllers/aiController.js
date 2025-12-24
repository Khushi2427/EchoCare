import axios from "axios";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are a compassionate mental health support chatbot. You give emotional support, grounding techniques, and encourage professional help when needed. Never give medical diagnosis.Suggest the user to  Join our Community Space for peer support, resources, company if they are telling i need someone.If any user is using heavy stress words and suicidal ideation, immediately suggest them to reach out to a mental health professional or helpline.",
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
          "HTTP-Referer": process.env.FRONTEND_URL,
          "X-Title": "Mental Wellness App",
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "AI chatbot failed" });
  }
};
