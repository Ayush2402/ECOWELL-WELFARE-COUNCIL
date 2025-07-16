// Backend API for dynamic website
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());

// --- Data ---
const stats = [
  { icon: 'fas fa-wind', value: '8M', label: 'Annual Deaths from Air Pollution', desc: 'Air pollution is a leading environmental health risk worldwide.' },
  { icon: 'fas fa-tint', value: '3.3B', label: 'People Lack Safe Drinking Water', desc: 'Water pollution threatens health and access to clean water.' },
  { icon: 'fas fa-seedling', value: '3.2B', label: 'Soil Degraded Globally', desc: 'Soil pollution and degradation impact food security and ecosystems.' },
  { icon: 'fas fa-volume-up', value: '1.1B', label: 'People Exposed to Unsafe Noise', desc: 'Noise pollution affects urban populations and wildlife.' },
  { icon: 'fas fa-temperature-high', value: '4B', label: 'Global Warming (indirect)', desc: 'Approximate, based on heat, floods, droughts exposure.' },
  { icon: 'fas fa-radiation', value: 'Unknown', label: 'Radiation Pollution', desc: 'Radiation pollution is a growing concern in some regions.' }
];

const blog = [
  { icon: 'fas fa-globe', date: 'May 2024', category: 'Climate Change', title: 'Why 1.5°C Matters: The Race to Limit Global Warming', summary: 'Scientists warn that exceeding 1.5°C of warming could have catastrophic effects on our planet. Learn why this threshold is critical and what actions are needed to stay below it.' },
  { icon: 'fas fa-smog', date: 'April 2024', category: 'Pollution', title: 'The Hidden Dangers of Air Pollution in Urban Areas', summary: 'Air pollution is a silent killer, especially in cities. Discover the sources, health impacts, and what can be done to improve air quality for everyone.' },
  { icon: 'fas fa-tint', date: 'March 2024', category: 'Conservation', title: 'Protecting Water Resources: A Call to Action', summary: 'Water scarcity and pollution threaten billions worldwide. Explore solutions and how you can help protect this vital resource for future generations.' }
];

const events = [
  { title: 'Tree Plantation Drive', date: '2025-08-10', desc: 'Join us for a community tree plantation event.' },
  { title: 'Clean Water Workshop', date: '2025-09-15', desc: 'Learn about water conservation and purification.' }
];

// --- Endpoints ---
app.get('/api/stats', (req, res) => res.json(stats));
app.get('/api/blog', (req, res) => res.json(blog));
app.get('/api/events', (req, res) => res.json(events));

// --- Newsletter Endpoints ---
function readJsonLines(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map(line => JSON.parse(line));
}
function writeJsonLines(file, arr) {
  fs.writeFileSync(file, arr.map(obj => JSON.stringify(obj)).join('\n') + '\n');
}
app.get('/api/newsletter', (req, res) => {
  res.json(readJsonLines('newsletter.json'));
});
app.delete('/api/newsletter/:idx', (req, res) => {
  let arr = readJsonLines('newsletter.json');
  arr.splice(req.params.idx, 1);
  writeJsonLines('newsletter.json', arr);
  res.json({ success: true });
});

// --- Volunteer Endpoints ---
app.get('/api/volunteer', (req, res) => {
  res.json(readJsonLines('volunteers.json'));
});
app.delete('/api/volunteer/:idx', (req, res) => {
  let arr = readJsonLines('volunteers.json');
  arr.splice(req.params.idx, 1);
  writeJsonLines('volunteers.json', arr);
  res.json({ success: true });
});

// --- Stats Endpoints ---
app.post('/api/stats', (req, res) => {
  stats.push(req.body);
  res.json({ success: true });
});
app.put('/api/stats/:idx', (req, res) => {
  stats[req.params.idx] = req.body;
  res.json({ success: true });
});
app.delete('/api/stats/:idx', (req, res) => {
  stats.splice(req.params.idx, 1);
  res.json({ success: true });
});

// --- Blog Endpoints ---
app.post('/api/blog', (req, res) => {
  blog.push(req.body);
  res.json({ success: true });
});
app.put('/api/blog/:idx', (req, res) => {
  blog[req.params.idx] = req.body;
  res.json({ success: true });
});
app.delete('/api/blog/:idx', (req, res) => {
  blog.splice(req.params.idx, 1);
  res.json({ success: true });
});

// --- Events Endpoints ---
app.post('/api/events', (req, res) => {
  events.push(req.body);
  res.json({ success: true });
});
app.put('/api/events/:idx', (req, res) => {
  events[req.params.idx] = req.body;
  res.json({ success: true });
});
app.delete('/api/events/:idx', (req, res) => {
  events.splice(req.params.idx, 1);
  res.json({ success: true });
});

app.listen(5000, () => console.log('API running on port 5000')); 