/* Future Solutions — Main JS */

// Navbar scroll effect
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Auto-dismiss flash alerts
document.querySelectorAll('.alert').forEach(el => {
  setTimeout(() => bootstrap.Alert.getOrCreateInstance(el).close(), 5000);
});

// Scroll-reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.service-card, .product-card, .feature-pill, .value-card, .av-card, .mv-card, .stat-item, .stat-card, .notebook-card, .branded-item'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px) scale(0.98)';
  el.style.transition = `opacity 0.55s ease ${i % 4 * 80}ms, transform 0.55s ease ${i % 4 * 80}ms`;
  revealObserver.observe(el);
});

// Animated stat counters
function animateCounter(el) {
  const text = el.textContent;
  const match = text.match(/[\d,]+/);
  if (!match) return;
  const target = parseInt(match[0].replace(/,/g, ''));
  const suffix = text.replace(/[\d,]+/, '').trim();
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// Smooth active nav highlight on scroll (single page sections)
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.cat-pill').forEach(pill => {
          pill.classList.toggle(
            'cat-pill--active',
            pill.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObserver.observe(s));
}

// Subtle mouse parallax on hero visual
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroVisual.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
  }, { passive: true });
}
