import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors" 

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

// Hugging Face Summarizer Model
const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";


async function querryHuggingFace(text) {
    const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({inputs: `Summarize the following text into 3-5 bullet points:\n\n${text}`}),
    });
    return await response.json();
};

// Convert plain summary into bullet-point format
function formatAsBullets(summary) {
  return summary
    .split(/(?<=[.!?])\s+/) // split by sentences
    .filter((s) => s.trim().length > 0) // remove empty
    .map((s) => "- " + s.trim()) // add bullet
    .join("\n");
}

// Route: POST /summarise
app.post("/summarise", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const result = await querryHuggingFace(text);

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    const rawSummary = result[0]?.summary_text || "No summary generated.";
    const bulletSummary = formatAsBullets(rawSummary);

    res.json({ summary: bulletSummary });
  } catch (error) {
    console.error("Error summarising:", error);
    res.status(500).json({ error: "Failed to summarise text" });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
