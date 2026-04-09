# 🎮 GameGrid

Discover your next gaming obsession!

## 🔒 Security Update

The API key is now secured in a `.env` file and accessed through a Node.js backend proxy.

## 🚀 Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your API key:**
   - The `.env` file already contains your API key
   - Never commit this file to Git (it's in `.gitignore`)

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🛠️ Development Mode

For auto-restart on file changes:
```bash
npm run dev
```

## 📁 Project Structure

- `server.js` - Express backend that proxies API requests
- `.env` - Environment variables (API key stored here)
- `index.html` - Main page
- `game.html` - Game details page
- `script.js` - Frontend JavaScript
- `style.css` - Styles and animations

## 🔑 API Endpoints

The backend provides these proxy endpoints:
- `GET /api/games?search={query}` - Search for games
- `GET /api/games/:id` - Get game details

## 🎨 Features

- Rainbow animated title
- Floating background particles
- Rotating border glow effects
- Staggered card animations
- Playful hover interactions
- Secure API key management

---

**Note:** Your API key is now hidden from client-side code and stored securely in `.env`
