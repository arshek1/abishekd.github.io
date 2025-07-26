
(function() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const themeToggle = document.getElementById('themeToggle');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  // Mobile nav
  hamburger?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });

  // Theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
  themeToggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  // Contact form (Progressive enhancement - optional)
  form?.addEventListener('submit', async (e) => {
    if (!form.action.includes('formspree')) return; // Skip if no formspree
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        statusEl.textContent = 'Thanks! Your message has been sent.';
        form.reset();
      } else {
        statusEl.textContent = 'Something went wrong. Please try again.';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again.';
    }
  });
})();
