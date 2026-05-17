/* ──────────────────────────────────────────
   THE STACK — app.js
────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ── GRID CANVAS ──────────────────────────
  const canvas = document.getElementById('gridCanvas');
  const ctx    = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
  }

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const size  = 64;
    const color = 'rgba(61,255,160,0.03)';

    ctx.strokeStyle = color;
    ctx.lineWidth   = 1;

    // Vertical
    for (let x = 0; x <= canvas.width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    // Horizontal
    for (let y = 0; y <= canvas.height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Dot intersections
    ctx.fillStyle = 'rgba(61,255,160,0.08)';
    for (let x = 0; x <= canvas.width; x += size) {
      for (let y = 0; y <= canvas.height; y += size) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ── NAV SCROLL STATE ─────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── ACTIVE NAV LINK ───────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'text-white',
            link.getAttribute('href') === `#${id}`
          );
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'rgba(255,255,255,0.85)'
            : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── SCROLL REVEAL ─────────────────────────
  const revealEls = document.querySelectorAll(
    '.layer-row, .tool-card, .principle-card, .path-card, .stat-box, .dist-row'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── TOOL FILTER TABS ─────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards  = document.querySelectorAll('.tool-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      toolCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          // Re-trigger fade
          card.style.animation = 'none';
          void card.offsetWidth; // reflow
          card.style.animation = 'fadeUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── LAYER ROW HOVER ACCENT ───────────────
  const layerRows = document.querySelectorAll('.layer-row');

  layerRows.forEach((row, i) => {
    const colors = [
      'var(--emerald)',
      '#4fa8ff',
      'var(--violet)',
      'var(--coral)',
      'var(--amber)',
    ];
    row.addEventListener('mouseenter', () => {
      row.style.setProperty('--row-accent', colors[i] || 'var(--emerald)');
      const bar = row.querySelector('::before');
    });
    // Apply accent color to the ::before pseudo via a data attribute + CSS variable
    row.style.setProperty('--row-accent', colors[i] || 'var(--emerald)');
  });

  // Set custom accent for each layer's left border via CSS custom properties
  layerRows.forEach((row, i) => {
    const colors = [
      '#3dffa0', '#4fa8ff', '#8b7fff', '#ff6b6b', '#ffb347'
    ];
    row.style.cssText += `--accent-color: ${colors[i]};`;

    // Inject accent into hover bar via dynamic style
    const style = document.createElement('style');
    style.textContent = `
      .layer-row[data-index="${i}"]::before {
        background: ${colors[i]};
      }
    `;
    document.head.appendChild(style);
  });

  // ── HERO TAG HOVER RIPPLE ─────────────────
  const stackTags = document.querySelectorAll('.stack-tag');

  stackTags.forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('active');
    });
  });

  // ── MOUSE PARALLAX ON HERO GLOWS ─────────
  const heroSection = document.querySelector('.hero-glow-a');
  const glowA = document.querySelector('.hero-glow-a');
  const glowB = document.querySelector('.hero-glow-b');

  if (glowA && glowB) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      glowA.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
      glowB.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
    }, { passive: true });
  }

  // ── SCANLINE TIMING ───────────────────────
  const scanline = document.getElementById('scanline');
  if (scanline) {
    // Randomize scanline delay slightly on each load
    const delay = (Math.random() * 3).toFixed(1) + 's';
    scanline.style.animationDelay = delay;
  }

  // ── CODE BLOCK COPY (Inngest example) ────
  const codeBlock = document.querySelector('.code-block');
  if (codeBlock) {
    codeBlock.style.cursor = 'pointer';
    codeBlock.title = 'Click to copy';

    // Visual copy indicator
    const copyHint = document.createElement('div');
    copyHint.textContent = 'COPY';
    copyHint.style.cssText = `
      position: absolute;
      top: 10px;
      right: 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.2em;
      color: rgba(61,255,160,0.4);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    `;
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyHint);

    codeBlock.addEventListener('mouseenter', () => {
      copyHint.style.opacity = '1';
    });
    codeBlock.addEventListener('mouseleave', () => {
      copyHint.style.opacity = '0';
    });

    codeBlock.addEventListener('click', async () => {
      const text = codeBlock.innerText.replace(/\nCOPY\s*$/, '').trim();
      try {
        await navigator.clipboard.writeText(text);
        copyHint.textContent = 'COPIED!';
        copyHint.style.color = 'rgba(61,255,160,0.9)';
        setTimeout(() => {
          copyHint.textContent = 'COPY';
          copyHint.style.color = 'rgba(61,255,160,0.4)';
        }, 1800);
      } catch {
        copyHint.textContent = 'ERR';
      }
    });
  }

  // ── ANIMATED COUNTER (stats) ──────────────
  const statVals = document.querySelectorAll('.stat-val');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const raw = el.textContent.trim();
        const num = parseInt(raw);

        if (!isNaN(num) && num > 0) {
          let current = 0;
          const duration = 800;
          const step     = duration / num;

          const tick = () => {
            current++;
            el.textContent = current;
            if (current < num) setTimeout(tick, step);
          };
          setTimeout(tick, 200);
        }

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statVals.forEach(el => counterObserver.observe(el));

  // ── SMOOTH ANCHOR SCROLL ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
