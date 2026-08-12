import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

// Increase payload limit for high-resolution photo & video uploads (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// MongoDB Schema for Dynamic Website Data
const SiteDataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  updated_at: { type: Date, default: Date.now }
});

const SiteData = mongoose.model('SiteData', SiteDataSchema);

// In-Memory Real-Time SSE Clients List
let sseClients = [];

// SSE Real-Time Stream Endpoint (Live sync for all phones & browsers)
app.get('/api/realtime', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

// Broadcast changes to all connected phones & browsers instantly
function broadcastDataChange(key, value) {
  const payload = JSON.stringify({ key, value, timestamp: Date.now() });
  sseClients.forEach(c => c.res.write(`data: ${payload}\n\n`));
}

// MongoDB Connection Handler
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Database successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));
} else {
  console.log('⚠️ MONGODB_URI is not set yet in .env file. Running in fallback mode.');
}

// GET API: Fetch data by key
app.get('/api/site-data/:key', async (req, res) => {
  try {
    const { key } = req.params;
    if (mongoose.connection.readyState === 1) {
      const data = await SiteData.findOne({ key });
      if (data) {
        return res.json({ success: true, value: data.value });
      }
    }
    return res.status(404).json({ success: false, message: 'Data not found' });
  } catch (err) {
    console.error('Error fetching site data:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST API: Save/Update data by key (Photos, Videos, Text)
app.post('/api/site-data/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ success: false, message: 'Value is required' });
    }

    if (mongoose.connection.readyState === 1) {
      await SiteData.findOneAndUpdate(
        { key },
        { value, updated_at: new Date() },
        { upsert: true, new: true }
      );
    }

    // Broadcast to all active devices instantly
    broadcastDataChange(key, value);

    res.json({ success: true, message: `Data for "${key}" saved successfully!` });
  } catch (err) {
    console.error('Error saving site data:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
