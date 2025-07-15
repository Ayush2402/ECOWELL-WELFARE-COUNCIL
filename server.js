const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecowell', { useNewUrlParser: true, useUnifiedTopology: true });

// Volunteer Schema
const Volunteer = mongoose.model('Volunteer', {
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// Newsletter Schema
const Newsletter = mongoose.model('Newsletter', {
  email: String,
  date: { type: Date, default: Date.now }
});

// Volunteer endpoint
app.post('/api/volunteer', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
  await Volunteer.create({ name, email, message });
  res.json({ success: true });
});

// Newsletter endpoint
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  await Newsletter.create({ email });
  res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000')); 