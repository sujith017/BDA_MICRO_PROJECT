// const express = require('express');
// const Groq = require('groq-sdk');
import express from "express";
import Groq from "groq-sdk";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.API });

const app = express();


app.use(cors()); 
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json()); 


app.post("/chat", async (req, res) => {
  const userInput = req.body?.content;
  if (!userInput) {
    return res.status(400).json({ error: "Missing content in the request body" });
  }

  // Prepare the input message by adding a sentiment prompt
  const prompt = "    Find the Sentiment to the given sentence and give only the sentiment like POSITIVE NEGATIVE NEUTRAL  strictly not other words in response";
  const inp = userInput + prompt;

  try {
    // Get the chat completion from Groq API
    const chatCompletion = await getGroqChatCompletion(inp);
    // Send the response back to the client
    res.json({ message: chatCompletion.choices[0]?.message?.content || "No response" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing request" });
  }
});

async function getGroqChatCompletion(userInput) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userInput, 
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
