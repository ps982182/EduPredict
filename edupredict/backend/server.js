const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Fetch for Node.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ PORT (BEST PRACTICE)
const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.send("EduPredict API running 🚀");
});

// ================= CHAT API =================
app.post("/api/chat", async (req, res) => {
  try {
    // ✅ Check API key
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "GROQ API key missing" });
    }

    const { messages, systemPrompt } = req.body;

    const formattedMessages = (messages || []).map((msg) => ({
      role: msg.role || "user",
      content:
        typeof msg.content === "string"
          ? msg.content
          : JSON.stringify(msg.content),
    }));

    // ✅ Timeout protection
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: systemPrompt || "You are a helpful assistant",
            },
            ...formattedMessages,
          ],
        }),
        signal: controller.signal,
      },
    );

    // ✅ Handle API errors properly
    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return res.status(500).json({ error: "LLM API failed" });
    }

    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content || "No response";

    res.json({ reply });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "API error" });
  }
});

// ================= ML PREDICTION API =================
app.post("/api/predict", (req, res) => {
  const { attendance, assignmentCompletion, midSemGrade } = req.body;

  let score = 0;

  if (attendance < 60) score += 2;
  else if (attendance < 75) score += 1;

  if (assignmentCompletion < 60) score += 2;
  else if (assignmentCompletion < 75) score += 1;

  if (midSemGrade < 50) score += 2;
  else if (midSemGrade < 70) score += 1;

  let risk = "Low";
  if (score >= 4) risk = "High";
  else if (score >= 2) risk = "Medium";

  res.json({ risk });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
