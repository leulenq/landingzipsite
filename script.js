const heroCards = document.querySelectorAll('.hero-card');
const feedGrid = document.getElementById('feedGrid');
const reflowButton = document.getElementById('reflow');
const river = document.getElementById('river');
const scramble = document.getElementById('scramble');
const alignBtn = document.getElementById('align');
const panelStack = document.getElementById('panelStack');
const toggleMode = document.getElementById('toggleMode');
const lattice = document.getElementById('lattice');
const matrixGrid = document.getElementById('matrixGrid');
const matrixScatter = document.getElementById('matrixScatter');
const matrixResolve = document.getElementById('matrixResolve');
const matrixLog = document.getElementById('matrixLog');
const accessTicker = document.getElementById('accessTicker');
const consoleRows = document.getElementById('consoleRows');
const cycleAccess = document.getElementById('cycleAccess');

// Parallax hero stack
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  heroCards.forEach((card) => {
    const depth = parseFloat(card.dataset.depth || 0.2);
    card.style.transform = `translateY(calc(var(--index) * 22px + ${y * depth}px)) translateX(${x * depth}px) scale(calc(1 - var(--index) * 0.04)) rotate3d(1, 1, 0, ${depth * 10}deg)`;
  });
});

// Feed grid reflow
const reflowGrid = () => {
  const cards = Array.from(feedGrid.children);
  cards.sort(() => Math.random() - 0.5).forEach((card, idx) => {
    card.style.transition = 'transform 0.7s cubic-bezier(0.32, 0.01, 0, 1)';
    card.style.transform = `translate3d(${(idx % 3) * 6}px, ${(idx % 2) * 3}px, ${idx % 2 === 0 ? 8 : -6}px)`;
    feedGrid.appendChild(card);
  });
};

reflowButton?.addEventListener('click', reflowGrid);

// Portfolio river scatter/align
const scatterRiver = () => {
  river.classList.add('scatter');
  river.querySelectorAll('.river-card').forEach((card, i) => {
    card.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${(Math.random() - 0.5) * 30}px) rotate(${(Math.random() - 0.5) * 6}deg)`;
    card.style.transition = 'transform 0.7s ease';
    card.style.zIndex = 10 + i;
  });
};

const resolveRiver = () => {
  river.classList.remove('scatter');
  river.querySelectorAll('.river-card').forEach((card) => {
    card.style.transform = 'translate(0,0) rotate(0)';
    card.style.transition = 'transform 0.7s ease';
  });
};

scramble?.addEventListener('click', scatterRiver);
alignBtn?.addEventListener('click', resolveRiver);

// Panel toggle (agency vs talent)
let agencyMode = true;
toggleMode?.addEventListener('click', () => {
  agencyMode = !agencyMode;
  panelStack.classList.toggle('talent-mode', !agencyMode);
  panelStack.querySelectorAll('.panel').forEach((panel, i) => {
    const direction = agencyMode ? 1 : -1;
    panel.style.transform = `translateZ(${(i + 1) * 22 * direction}px) rotateY(${agencyMode ? 0 : 6}deg)`;
  });
});

// Lattice animation on hover
lattice?.querySelectorAll('.node').forEach((node) => {
  node.addEventListener('mouseenter', () => {
    node.style.background = '#0b0b0c';
    node.style.borderColor = 'rgba(199, 160, 68, 0.5)';
    node.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18), 0 0 0 10px rgba(199,160,68,0.08)';
  });
  node.addEventListener('mouseleave', () => {
    node.style.background = '#111';
    node.style.borderColor = 'rgba(255, 255, 255, 0.06)';
    node.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)';
  });
});

// Reveal animations on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.spectrum-card, .river-card, .panel, .mini-card, .matrix-card, .access-card').forEach((el) => observer.observe(el));

document.querySelectorAll('.river-card').forEach((card, i) => {
  card.style.transition = `transform 0.7s ease ${i * 0.06}s`;
});

// Matrix disruption / enforcement
const scatterMatrix = () => {
  matrixGrid?.querySelectorAll('.matrix-card').forEach((card, idx) => {
    const x = (Math.random() - 0.5) * 70;
    const y = (Math.random() - 0.5) * 50;
    const r = (Math.random() - 0.5) * 10;
    card.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
    card.style.zIndex = 20 + idx;
  });
  const logLine = document.createElement('div');
  logLine.className = 'log-line';
  logLine.textContent = 'Matrix disrupted · re-scoring';
  matrixLog?.prepend(logLine);
};

const resolveMatrix = () => {
  matrixGrid?.querySelectorAll('.matrix-card').forEach((card, idx) => {
    card.style.transform = `translate(0,0) rotate(0deg) scale(${1 - idx * 0.01})`;
    card.style.zIndex = 10 - idx;
  });
  const logLine = document.createElement('div');
  logLine.className = 'log-line';
  logLine.textContent = 'Standard enforced · ranking sealed';
  matrixLog?.prepend(logLine);
};

matrixScatter?.addEventListener('click', scatterMatrix);
matrixResolve?.addEventListener('click', resolveMatrix);

// Access ticker cycling
if (accessTicker) {
  let tickIndex = 0;
  const rotateTicks = () => {
    const ticks = accessTicker.querySelectorAll('.tick');
    const top = ticks[tickIndex % ticks.length];
    top.style.marginTop = '-18px';
    top.style.opacity = '0.3';
    setTimeout(() => {
      accessTicker.appendChild(top);
      top.style.marginTop = '0';
      top.style.opacity = '1';
    }, 300);
    tickIndex += 1;
  };
  setInterval(rotateTicks, 2200);
}

// Console permutation
cycleAccess?.addEventListener('click', () => {
  const messages = [
    'Re-weighting prestige agencies',
    'Locking sovereign enclave',
    'Synchronizing comp ratios',
    'Resolving casting collisions',
    'Expanding premium window'
  ];
  consoleRows.innerHTML = '';
  for (let i = 0; i < 3; i += 1) {
    const row = document.createElement('div');
    row.className = 'console-row';
    row.textContent = messages[(Math.floor(Math.random() * messages.length))];
    consoleRows.appendChild(row);
  }
});

// Ambient casting ticker
const feedRows = document.querySelectorAll('.feed-row span:nth-child(2)');
const updates = [
  'Glass Atelier · priority runway',
  'Noir Cinema · editorial shortlist',
  'Solaris Tech · private capsule',
  'Maison Vesper · finale casting',
  'Muse Labs · kinetic film',
];
let tick = 0;
setInterval(() => {
  feedRows.forEach((row, i) => {
    row.textContent = updates[(tick + i) % updates.length];
  });
  tick += 1;
}, 2200);

// Initial scatter to show motion
setTimeout(scatterRiver, 400);
setTimeout(resolveRiver, 2000);
setTimeout(reflowGrid, 600);
setTimeout(scatterMatrix, 900);
setTimeout(resolveMatrix, 2200);
