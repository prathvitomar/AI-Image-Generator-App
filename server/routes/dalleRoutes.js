import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// Ensure API key is available
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is missing. Please set it in your .env file.');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to check server status
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

// Route to generate an image using DALL-E
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate the prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required and must be a valid string.' });
    }

    // Call OpenAI's DALL-E API
    const aiResponse = await openai.images.generate({
      model: 'dall-e-3', // Using DALL-E 3
      prompt: prompt.trim(),
      n: 1, // Generate one image
      size: '1024x1024', // Image size
      response_format: 'b64_json', // Optionally 'url' for direct links
    });

    // Extract image data (Base64 string)
    const imageBase64 = aiResponse.data[0].b64_json;

    // Respond with the generated image
    res.status(200).json({ photo: `data:image/png;base64,${imageBase64}` });
  } catch (error) {
    console.error('Error generating image:', error.message || error);
    res.status(500).send({ error: error?.message || 'An error occurred while generating the image.' });
  }
});

export default router;
