import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware: allow Next.js frontend to talk to this backend
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true, // allows cookies across origins
}));

app.use(express.json());
app.use(cookieParser());

// Simple Healthcheck route to test the server
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HIVYA API is running smoothly' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 HIVYA Backend running on http://localhost:${PORT}`);
});
