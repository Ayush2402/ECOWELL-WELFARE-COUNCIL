// Admin Panel Logic
const apiBase = 'http://localhost:5000/api';

// --- Helper: Render Table Rows ---
function renderTableRows(tableId, data, rowFn) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  if (tbody) tbody.innerHTML = data.map(rowFn).join('');
}

// --- Newsletter Signups ---
fetch(apiBase + '/newsletter')
  .then(res => res.json())
  .then(newsletters => {
    renderTableRows('newsletter-table', newsletters, (n, i) => `
      <tr><td>${n.email}</td><td>${new Date(n.date).toLocaleString()}</td>
      <td class="admin-actions"><button onclick="deleteNewsletter(${i})">Delete</button></td></tr>
    `);
  });
window.deleteNewsletter = function(idx) {
  fetch(apiBase + '/newsletter/' + idx, { method: 'DELETE' })
    .then(() => location.reload());
};

// --- Volunteer Submissions ---
fetch(apiBase + '/volunteer')
  .then(res => res.json())
  .then(volunteers => {
    renderTableRows('volunteer-table', volunteers, (v, i) => `
      <tr><td>${v.name}</td><td>${v.email}</td><td>${v.message}</td><td>${new Date(v.date).toLocaleString()}</td>
      <td class="admin-actions"><button onclick="deleteVolunteer(${i})">Delete</button></td></tr>
    `);
  });
window.deleteVolunteer = function(idx) {
  fetch(apiBase + '/volunteer/' + idx, { method: 'DELETE' })
    .then(() => location.reload());
};

// --- Stats ---
function loadStats() {
  fetch(apiBase + '/stats')
    .then(res => res.json())
    .then(stats => {
      renderTableRows('stats-table', stats, (s, i) => `
        <tr><td>${s.icon}</td><td>${s.value}</td><td>${s.label}</td><td>${s.desc}</td>
        <td class="admin-actions">
          <button onclick="editStat(${i})">Edit</button>
          <button onclick="deleteStat(${i})">Delete</button>
        </td></tr>
      `);
    });
}
loadStats();
window.deleteStat = function(idx) {
  fetch(apiBase + '/stats/' + idx, { method: 'DELETE' })
    .then(() => loadStats());
};
window.editStat = function(idx) {
  // For brevity, prompt-based editing
  fetch(apiBase + '/stats')
    .then(res => res.json())
    .then(stats => {
      const s = stats[idx];
      const icon = prompt('Icon class:', s.icon);
      const value = prompt('Value:', s.value);
      const label = prompt('Label:', s.label);
      const desc = prompt('Description:', s.desc);
      if (icon && value && label && desc) {
        fetch(apiBase + '/stats/' + idx, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ icon, value, label, desc })
        }).then(() => loadStats());
      }
    });
};
document.getElementById('add-stat-form').onsubmit = function(e) {
  e.preventDefault();
  const [icon, value, label, desc] = Array.from(this.querySelectorAll('input')).map(i => i.value);
  fetch(apiBase + '/stats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ icon, value, label, desc })
  }).then(() => { this.reset(); loadStats(); });
};

// --- Blog ---
function loadBlog() {
  fetch(apiBase + '/blog')
    .then(res => res.json())
    .then(posts => {
      renderTableRows('blog-table', posts, (b, i) => `
        <tr><td>${b.icon}</td><td>${b.date}</td><td>${b.category}</td><td>${b.title}</td><td>${b.summary}</td>
        <td class="admin-actions">
          <button onclick="editBlog(${i})">Edit</button>
          <button onclick="deleteBlog(${i})">Delete</button>
        </td></tr>
      `);
    });
}
loadBlog();
window.deleteBlog = function(idx) {
  fetch(apiBase + '/blog/' + idx, { method: 'DELETE' })
    .then(() => loadBlog());
};
window.editBlog = function(idx) {
  fetch(apiBase + '/blog')
    .then(res => res.json())
    .then(posts => {
      const b = posts[idx];
      const icon = prompt('Icon class:', b.icon);
      const date = prompt('Date:', b.date);
      const category = prompt('Category:', b.category);
      const title = prompt('Title:', b.title);
      const summary = prompt('Summary:', b.summary);
      if (icon && date && category && title && summary) {
        fetch(apiBase + '/blog/' + idx, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ icon, date, category, title, summary })
        }).then(() => loadBlog());
      }
    });
};
document.getElementById('add-blog-form').onsubmit = function(e) {
  e.preventDefault();
  const [icon, date, category, title] = Array.from(this.querySelectorAll('input')).map(i => i.value);
  const summary = this.querySelector('textarea').value;
  fetch(apiBase + '/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ icon, date, category, title, summary })
  }).then(() => { this.reset(); loadBlog(); });
};

// --- Events ---
function loadEvents() {
  fetch(apiBase + '/events')
    .then(res => res.json())
    .then(events => {
      renderTableRows('events-table', events, (e, i) => `
        <tr><td>${e.title}</td><td>${e.date}</td><td>${e.desc}</td>
        <td class="admin-actions">
          <button onclick="editEvent(${i})">Edit</button>
          <button onclick="deleteEvent(${i})">Delete</button>
        </td></tr>
      `);
    });
}
loadEvents();
window.deleteEvent = function(idx) {
  fetch(apiBase + '/events/' + idx, { method: 'DELETE' })
    .then(() => loadEvents());
};
window.editEvent = function(idx) {
  fetch(apiBase + '/events')
    .then(res => res.json())
    .then(events => {
      const e = events[idx];
      const title = prompt('Title:', e.title);
      const date = prompt('Date:', e.date);
      const desc = prompt('Description:', e.desc);
      if (title && date && desc) {
        fetch(apiBase + '/events/' + idx, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, date, desc })
        }).then(() => loadEvents());
      }
    });
};
document.getElementById('add-event-form').onsubmit = function(e) {
  e.preventDefault();
  const [title, date, desc] = Array.from(this.querySelectorAll('input')).map(i => i.value);
  fetch(apiBase + '/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, date, desc })
  }).then(() => { this.reset(); loadEvents(); });
}; 