/* ============================================================
   PORTFOLIO — script.js
   Features: Loader, Cursor, Particles, Typed Text, AOS,
             Skills animation, Tabs, Theme Toggle, Form Validation
   ============================================================ */

'use strict';

/* ── Loader ───────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    initAnimations();
  }, 1200);
});

document.body.classList.add('loading');

/* ── AOS Init ─────────────────────────────────────────────── */
function initAnimations() {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

/* ── Custom Cursor ────────────────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

(function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .skill-tab, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ── Scroll Progress ──────────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop  = document.documentElement.scrollTop;
  const scrollMax  = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / scrollMax) * 100) + '%';
});

/* ── Navbar ───────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveLink();
});

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* ── Mobile Hamburger ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
  });
});

/* ── Dark/Light Theme Toggle ──────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const html        = document.documentElement;
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

/* ── Typing Effect ────────────────────────────────────────── */
const typedEl = document.getElementById('typed-text');
const roles   = ['Full Stack Developer', 'Problem Solver', 'Web Developer', 'UI/UX Designer'];
let   roleIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 90);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 55);
  }
}

setTimeout(typeEffect, 1400);

/* ── Particles Canvas ─────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x    = Math.random() * w;
    this.y    = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.3;
    this.vx   = (Math.random() - 0.5) * 0.3;
    this.vy   = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.4 + 0.1;
    const colors = ['#63b3ed', '#b794f4', '#76e4f7'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  function initParticleList() {
    const count = Math.min(Math.floor((w * h) / 8000), 150);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#63b3ed';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  initParticleList();
  animate();
  window.addEventListener('resize', () => { resize(); initParticleList(); });
})();

/* ── Skill Bars (on scroll) ───────────────────────────────── */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(fill => {
    const rect = fill.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      fill.style.width = fill.dataset.width + '%';
    }
  });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // initial check

/* ── Skills Tab Switch ────────────────────────────────────── */
const tabs = document.querySelectorAll('.skill-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    // Re-animate bars on tab switch
    setTimeout(animateSkillBars, 50);
  });
});

/* ── Form Validation ──────────────────────────────────────── */
const form = document.getElementById('contact-form');

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  field.classList.add('error');
  if (error) error.textContent = msg;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  field.classList.remove('error');
  if (error) error.textContent = '';
}

['name', 'email', 'subject', 'message'].forEach(id => {
  const field = document.getElementById(id);
  if (field) field.addEventListener('input', () => clearError(id));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name)              { showError('name', 'Please enter your name.'); valid = false; }
  if (!email)             { showError('email', 'Please enter your email.'); valid = false; }
  else if (!emailRx.test(email)) { showError('email', 'Please enter a valid email.'); valid = false; }
  if (!subject)           { showError('subject', 'Please enter a subject.'); valid = false; }
  if (!message)           { showError('message', 'Please enter a message.'); valid = false; }

  if (!valid) return;

  const btnText    = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const success    = document.getElementById('form-success');
  const submitBtn  = document.getElementById('submit-btn');

  btnText.style.display    = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled       = true;

  // Simulate send (replace with actual fetch/email service)
  setTimeout(() => {
    btnText.style.display    = 'inline-flex';
    btnLoading.style.display = 'none';
    submitBtn.disabled       = false;
    success.style.display    = 'flex';
    form.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1500);
});

/* ── Smooth Scroll for anchor links ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── SVG Gradient injection for soft skill rings ─────────── */
(function injectSVGDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  svg.innerHTML = `
    <defs>
      <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#63b3ed"/>
        <stop offset="50%"  stop-color="#b794f4"/>
        <stop offset="100%" stop-color="#76e4f7"/>
      </linearGradient>
    </defs>
  `;
  document.body.prepend(svg);
})();

/* ── Update scroll on page load ──────────────────────────── */
window.addEventListener('load', () => {
  updateActiveLink();
  animateSkillBars();
});