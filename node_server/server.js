// const express = require('express');
// const Groq = require('groq-sdk');
import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
const groq = new Groq({ apiKey: "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" });


const app = express();
app.use(express.json()); 


app.post("/chat", async (req, res) => {
  const userInput = req.body?.content;
  if (!userInput) {
    return res.status(400).json({ error: "Missing content in the request body" });
  }

  // Prepare the input message by adding a sentiment prompt
  const prompt = "    Find the Sentiment to the given sentence and give only the sentiment like POSITIVE NEGATIVE NEUTRAL";
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

// Function to get the chat completion
async function getGroqChatCompletion(userInput) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userInput, // Pass the user input message here
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
