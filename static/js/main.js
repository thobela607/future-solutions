/* Future Solutions — Main JS 2.0 */

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

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

const revealSelectors = [
  '.service-card', '.product-card', '.feature-pill', '.value-card',
  '.av-card', '.mv-card', '.stat-item', '.stat-card', '.notebook-card',
  '.branded-item', '.bento-card', '.glow-card', '.promo-card',
  '.tech-item', '.sign-item', '.digital-card', '.event-card',
  '.process-step', '.branded-item', '.notebook-card'
].join(', ');

document.querySelectorAll(revealSelectors).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px) scale(0.98)';
  el.style.transition = `opacity 0.55s ease ${(i % 5) * 70}ms, transform 0.55s ease ${(i % 5) * 70}ms`;
  revealObserver.observe(el);
});

// Animated stat counters
function animateCounter(el) {
  const raw = el.textContent;
  const numMatch = raw.match(/[\d,]+/);
  if (!numMatch) return;
  const target = parseInt(numMatch[0].replace(/,/g, ''));
  const suffix = raw.replace(/[\d,]+/, '').trim();
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(eased * target).toLocaleString() + (suffix ? ' ' + suffix : '');
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

// Mouse parallax on hero visual
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  document.addEventListener('mousemove', (e) => {
    const dx = (e.clientX / window.innerWidth - 0.5) * 14;
    const dy = (e.clientY / window.innerHeight - 0.5) * 10;
    heroVisual.style.transform = `translate(${dx}px, ${dy}px)`;
  }, { passive: true });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active category pill highlight on scroll
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.cat-pill').forEach(pill => {
          const match = pill.getAttribute('href') === '#' + entry.target.id;
          pill.classList.toggle('cat-pill--accent', match);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));
}
