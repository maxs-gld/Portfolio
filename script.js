// ══════ PRELOADER ══════
const preloaderEl = document.getElementById('preloader');
const counterEl = document.getElementById('preloaderCount');
let count = 0;
const countInterval = setInterval(() => {
  count += Math.floor(Math.random() * 12) + 3;
  if (count >= 100) { count = 100; clearInterval(countInterval); }
  counterEl.textContent = count + '%';
}, 50);

window.addEventListener('load', () => {
  setTimeout(() => { preloaderEl.classList.add('done'); }, 2400);
});

// ══════ CUSTOM CURSOR ══════
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let cx = 0, cy = 0, dx = 0, dy = 0;

document.addEventListener('mousemove', e => {
  cx = e.clientX; cy = e.clientY;
  cursorDot.style.left = cx + 'px';
  cursorDot.style.top = cy + 'px';
});

(function animCursor() {
  dx += (cx - dx) * 0.12;
  dy += (cy - dy) * 0.12;
  cursor.style.left = dx + 'px';
  cursor.style.top = dy + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .magnetic, .skill-card, .project, .cert-item, .stat, .veille-tool, .ai-tool, .contact-link, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ══════ PARTICLES ══════
const cvs = document.getElementById('particles');
const ctx = cvs.getContext('2d');
let pts = [], mPos = { x: null, y: null };

function resize() { cvs.width = innerWidth; cvs.height = innerHeight; }
resize(); addEventListener('resize', resize);
document.addEventListener('mousemove', e => { mPos.x = e.clientX; mPos.y = e.clientY; });

class Pt {
  constructor() { this.init(); }
  init() {
    this.x = Math.random() * cvs.width;
    this.y = Math.random() * cvs.height;
    this.sz = Math.random() * 1.2 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.o = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (mPos.x) {
      const ddx = mPos.x - this.x, ddy = mPos.y - this.y;
      const d = Math.sqrt(ddx*ddx + ddy*ddy);
      if (d < 130) { const f = (130 - d) / 130; this.x -= (ddx/d)*f*1.5; this.y -= (ddy/d)*f*1.5; }
    }
    if (this.x < 0 || this.x > cvs.width) this.vx *= -1;
    if (this.y < 0 || this.y > cvs.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI*2);
    ctx.fillStyle = `rgba(var(--accent-rgb), ${this.o})`.replace('var(--accent-rgb)', '200,255,0');
    ctx.fill();
  }
}

for (let i = 0; i < 70; i++) pts.push(new Pt());

let drawPtsRAF;
(function drawPts() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (let i = 0; i < pts.length; i++) {
    pts[i].update(); pts[i].draw();
    for (let j = i+1; j < pts.length; j++) {
      const ddx = pts[i].x - pts[j].x, ddy = pts[i].y - pts[j].y;
      const d = Math.sqrt(ddx*ddx + ddy*ddy);
      if (d < 110) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(200,255,0,${0.05*(1-d/110)})`;
        ctx.lineWidth = 0.4; ctx.stroke();
      }
    }
  }
  drawPtsRAF = requestAnimationFrame(drawPts);
})();

// ══════ SCROLL REVEAL ══════
const revEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revEls.forEach(el => revObs.observe(el));

// ══════ MAGNETIC ══════
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    el.style.transform = `translate(${x*0.15}px, ${y*0.15}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

// ══════ CARD GLOW ══════
document.querySelectorAll('.stat, .project, .skill-card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
    c.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
  });
});

// ══════ TEXT SCRAMBLE ══════
document.querySelectorAll('.project-name, .skill-card-name, .tl-title').forEach(el => {
  const orig = el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let iv;
  el.addEventListener('mouseenter', () => {
    let iter = 0; clearInterval(iv);
    iv = setInterval(() => {
      el.textContent = orig.split('').map((c,i) => i < iter ? orig[i] : chars[Math.floor(Math.random()*chars.length)]).join('');
      if (iter >= orig.length) clearInterval(iv);
      iter += 0.5;
    }, 25);
  });
  el.addEventListener('mouseleave', () => { clearInterval(iv); el.textContent = orig; });
});

// ══════ TILT ON PROJECT CARDS ══════
document.querySelectorAll('.project').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(1200px) rotateX(${-y*4}deg) rotateY(${x*4}deg) translateY(-3px)`;
  });
  c.addEventListener('mouseleave', () => { c.style.transform = ''; });
});

// ══════ PARALLAX ORBS ══════
addEventListener('scroll', () => {
  const s = scrollY;
  document.querySelectorAll('.hero-orb').forEach((o,i) => {
    o.style.transform = `translateY(${s*(i+1)*0.12}px)`;
  });
});

// ══════ INSANE NAV WARP TRANSITION ══════
const navTrans = document.getElementById('navTransition');
const warpFlash = document.getElementById('warpFlash');
const warpRing = document.getElementById('warpRing');
const speedLinesEl = document.getElementById('speedLines');
const warpParticlesEl = document.getElementById('warpParticles');
const warpVignette = document.getElementById('warpVignette');
let isWarping = false;

function createSpeedLines() {
  speedLinesEl.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const line = document.createElement('div');
    line.classList.add('speed-line');
    const angle = (i / 30) * 360;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.animationDelay = `${Math.random() * 0.15}s`;
    line.style.width = `${Math.random() * 1.5 + 1}px`;
    line.style.background = `linear-gradient(to bottom, transparent, ${
      Math.random() > 0.6 ? 'var(--accent2)' : Math.random() > 0.3 ? 'var(--accent)' : 'var(--accent3)'
    }, transparent)`;
    speedLinesEl.appendChild(line);
  }
}

function createWarpParticles() {
  warpParticlesEl.innerHTML = '';
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('warp-particle');
    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 400;
    p.style.setProperty('--px', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--py', `${Math.sin(angle) * dist}px`);
    p.style.animationDelay = `${Math.random() * 0.2}s`;
    p.style.width = `${Math.random() * 4 + 1}px`;
    p.style.height = p.style.width;
    const colors = ['var(--accent)', 'var(--accent2)', 'var(--accent3)', 'var(--fg)'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    warpParticlesEl.appendChild(p);
  }
}

function createGlitchBars() {
  const existing = navTrans.querySelectorAll('.glitch-bar');
  existing.forEach(b => b.remove());
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement('div');
    bar.classList.add('glitch-bar');
    bar.style.top = `${Math.random() * 100}%`;
    bar.style.height = `${Math.random() * 3 + 1}px`;
    bar.style.animationDelay = `${Math.random() * 0.3}s`;
    const colors = ['var(--accent)', 'var(--accent2)', 'var(--accent3)'];
    bar.style.background = colors[Math.floor(Math.random() * colors.length)];
    navTrans.appendChild(bar);
  }
}

function triggerWarp(targetEl) {
  if (isWarping) return;
  isWarping = true;

  // Setup
  createSpeedLines();
  createWarpParticles();
  createGlitchBars();

  navTrans.classList.add('active');

  // Body distort
  document.body.classList.add('body-warp');

  // Trigger all animations
  warpFlash.classList.add('animate');
  warpRing.classList.add('animate');
  speedLinesEl.classList.add('animate');
  speedLinesEl.querySelectorAll('.speed-line').forEach(l => l.classList.add('animate'));
  warpParticlesEl.querySelectorAll('.warp-particle').forEach(p => p.classList.add('animate'));
  warpVignette.classList.add('animate');
  navTrans.querySelectorAll('.glitch-bar').forEach(b => b.classList.add('animate'));

  // Scroll at the peak of the vignette (when screen is black)
  setTimeout(() => {
    // Instant scroll (no smooth, we handle the animation ourselves)
    const targetY = targetEl.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: targetY, behavior: 'instant' });

    // Reveal the target section with a cinematic entrance
    targetEl.classList.add('section-warp-reveal');

    // Make sure reveals inside target fire
    targetEl.querySelectorAll('.reveal').forEach(r => r.classList.add('visible'));
  }, 320);

  // Cleanup
  setTimeout(() => {
    navTrans.classList.remove('active');
    document.body.classList.remove('body-warp');

    [warpFlash, warpRing, speedLinesEl, warpVignette].forEach(el => el.classList.remove('animate'));
    speedLinesEl.querySelectorAll('.speed-line').forEach(l => l.classList.remove('animate'));
    warpParticlesEl.querySelectorAll('.warp-particle').forEach(p => p.classList.remove('animate'));
    navTrans.querySelectorAll('.glitch-bar').forEach(b => b.remove());

    targetEl.classList.remove('section-warp-reveal');

    isWarping = false;
  }, 1000);
}

// Attach to all nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) triggerWarp(target);
  });
});

// ══════ LANGUAGE TOGGLE FR/EN ══════
let currentLang = 'fr';
const langBtn = document.getElementById('langToggle');

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  document.documentElement.setAttribute('data-lang', currentLang);

  document.querySelectorAll('[data-fr][data-en]').forEach(el => {
    const val = el.getAttribute(`data-${currentLang}`);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });

  langBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  document.documentElement.lang = currentLang;
});

// ══════ INSANE THEME TOGGLE ══════
const themeToggleBtn = document.getElementById('themeToggle');
const themeOverlay = document.getElementById('themeOverlay');
const themeRaysEl = document.getElementById('themeRays');
let currentTheme = 'dark';
let isThemeAnimating = false;

function createThemeRays(x, y, isLight) {
  themeRaysEl.innerHTML = '';
  themeRaysEl.style.left = x + 'px';
  themeRaysEl.style.top = y + 'px';
  const count = 16;
  for (let i = 0; i < count; i++) {
    const ray = document.createElement('div');
    ray.classList.add('theme-ray');
    const angle = (i / count) * 360;
    ray.style.transformOrigin = 'bottom center';
    ray.style.left = '0px';
    ray.style.top = '0px';
    ray.style.transform = `rotate(${angle}deg)`;
    ray.style.animationDelay = `${Math.random() * 0.1}s`;
    ray.style.background = isLight
      ? `linear-gradient(to top, transparent, ${['#5d00e6','#0075ff','#e6003a'][i%3]}, transparent)`
      : `linear-gradient(to top, transparent, ${['#c8ff00','#00f0ff','#ff3366'][i%3]}, transparent)`;
    themeRaysEl.appendChild(ray);
    requestAnimationFrame(() => ray.classList.add('animate'));
  }
}

function updateParticleColors() {
  // Particles will naturally use the new colors on next draw
  // We update their opacity for light mode
  const isLight = currentTheme === 'light';
  pts.forEach(p => {
    p.o = isLight ? Math.random() * 0.3 + 0.05 : Math.random() * 0.4 + 0.1;
  });
}

themeToggleBtn.addEventListener('click', (e) => {
  if (isThemeAnimating) return;
  isThemeAnimating = true;

  const rect = themeToggleBtn.getBoundingClientRect();
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const goingLight = currentTheme === 'dark';

  // Position the overlay at button
  themeOverlay.style.left = btnX + 'px';
  themeOverlay.style.top = btnY + 'px';
  themeOverlay.style.background = goingLight ? '#f5f3ee' : '#060608';

  // Remove old classes
  themeOverlay.classList.remove('expanding', 'collapsing');

  // Create rays from button
  createThemeRays(btnX, btnY, goingLight);

  // Flash the button
  themeToggleBtn.style.transform = 'scale(1.3)';
  themeToggleBtn.style.boxShadow = goingLight
    ? '0 0 40px rgba(93,0,230,0.5)'
    : '0 0 40px rgba(200,255,0,0.5)';

  setTimeout(() => {
    themeToggleBtn.style.transform = '';
    themeToggleBtn.style.boxShadow = '';
  }, 300);

  // Start expanding circle
  requestAnimationFrame(() => {
    themeOverlay.classList.add('expanding');
  });

  // At peak, switch the theme
  setTimeout(() => {
    currentTheme = goingLight ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateParticleColors();
  }, 300);

  // Collapse and cleanup
  setTimeout(() => {
    themeOverlay.classList.remove('expanding');
    themeOverlay.classList.add('collapsing');
  }, 550);

  setTimeout(() => {
    themeOverlay.classList.remove('collapsing');
    themeOverlay.style.width = '0';
    themeOverlay.style.height = '0';
    themeRaysEl.innerHTML = '';
    isThemeAnimating = false;
  }, 1050);
});

// Override particle draw colors based on theme
const origDraw = Pt.prototype.draw;
Pt.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
  const isLight = currentTheme === 'light';
  ctx.fillStyle = isLight
    ? `rgba(93,0,230,${this.o})`
    : `rgba(200,255,0,${this.o})`;
  ctx.fill();
};

// Override particle line colors
const origDrawPts = drawPts;
// We need to patch the line drawing — let's replace the animation loop
// Stop old loop and create new one
cancelAnimationFrame(drawPtsRAF);

let drawPtsRAF2;
(function drawPtsLoop() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  const isLight = currentTheme === 'light';
  const lineColor = isLight ? '93,0,230' : '200,255,0';
  for (let i = 0; i < pts.length; i++) {
    pts[i].update(); pts[i].draw();
    for (let j = i+1; j < pts.length; j++) {
      const ddx = pts[i].x - pts[j].x, ddy = pts[i].y - pts[j].y;
      const d = Math.sqrt(ddx*ddx + ddy*ddy);
      if (d < 110) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(${lineColor},${0.05*(1-d/110)})`;
        ctx.lineWidth = 0.4; ctx.stroke();
      }
    }
  }
  drawPtsRAF2 = requestAnimationFrame(drawPtsLoop);
})();