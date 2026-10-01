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
