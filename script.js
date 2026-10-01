const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}));
document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('toggle', () => {
  if (item.open) document.querySelectorAll('.nav-item').forEach(other => { if (other !== item) other.open = false; });
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Public updates are stored in content/updates.json and managed from /admin.
const updatesSection = document.querySelector('#updates');
const updatesGrid = document.querySelector('#updates-grid');
if (updatesSection && updatesGrid) {
  fetch('content/updates.json')
    .then(response => response.ok ? response.json() : null)
    .then(data => {
      const updates = Array.isArray(data?.updates) ? data.updates.filter(item => item && item.published !== false) : [];
      if (!updates.length) return;
      updatesSection.hidden = false;
      updates.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      updates.forEach(item => {
        const card = document.createElement('article');
        card.className = 'update-card';
        if (item.image) {
          const image = document.createElement('img');
          image.src = item.image;
          image.alt = item.image_alt || item.title || 'BEDMAALE update';
          image.loading = 'lazy';
          card.append(image);
        }
        const copy = document.createElement('div');
        copy.className = 'update-copy';
        if (item.date) {
          const date = document.createElement('time');
          date.dateTime = item.date;
          const parsedDate = new Date(`${item.date}T00:00:00`);
          date.textContent = Number.isNaN(parsedDate.getTime()) ? item.date : new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(parsedDate);
          copy.append(date);
        }
        const title = document.createElement('h3');
        title.textContent = item.title || '';
        copy.append(title);
        if (item.summary) {
          const summary = document.createElement('p');
          summary.textContent = item.summary;
          copy.append(summary);
        }
        if (item.body) {
          item.body.split(/\n\s*\n/).filter(Boolean).forEach(paragraphText => {
            const paragraph = document.createElement('p');
            paragraph.textContent = paragraphText;
            copy.append(paragraph);
          });
        }
        card.append(copy);
        updatesGrid.append(card);
      });
    })
    .catch(() => {});
}
