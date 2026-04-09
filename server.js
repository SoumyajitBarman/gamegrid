require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.RAWG_API_KEY;

app.use(cors());
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for game search
app.get('/api/games', async (req, res) => {
  const query = req.query.search;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Proxy endpoint for game details
app.get('/api/games/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    const fetch = (await import('node-fetch')).default;
    const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

app.listen(PORT, () => {
  console.log(`🎮 GameGrid server running at http://localhost:${PORT}`);
  console.log(`🔒 API key secured in .env file`);
});
