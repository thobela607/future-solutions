/* Future Solutions — Main JS */

// Navbar: add .scrolled class on scroll
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Auto-dismiss flash alerts after 5 seconds
document.querySelectorAll('.alert').forEach(el => {
  setTimeout(() => {
    const bsAlert = bootstrap.Alert.getOrCreateInstance(el);
    bsAlert.close();
  }, 5000);
});

// Animate elements into view on scroll
const observerConfig = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerConfig);

document.querySelectorAll(
  '.service-card, .product-card, .feature-pill, .value-card, .av-card, .mv-card, .stat-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Stagger animation for card grids
document.querySelectorAll('.row').forEach(row => {
  const cards = row.querySelectorAll('.service-card, .product-card, .value-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });
});
