import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { ContentRetrievalSystem } from './contentSystem.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
const contentSystem = new ContentRetrievalSystem();

// Serve static files from the Vite build output
app.use(express.static(join(__dirname, '../dist')));

// API endpoint for content retrieval
app.get('/api/search', async (req, res) => {
  try {
    const { topic } = req.query;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const results = await contentSystem.retrieveContent(topic);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to retrieve content' });
  }
});

// Serve the frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});