/* ──────────────────────────────────────────
   THE STACK — app.js (LIGHT THEME)
────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     GRID CANVAS
  ───────────────────────────────────── */

  const canvas = document.getElementById('gridCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawGrid();
  }

  function drawGrid() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const size = 64;

    ctx.strokeStyle = 'rgba(15,23,42,0.04)';
    ctx.lineWidth = 1;

    /* vertical lines */
    for (let x = 0; x <= canvas.width; x += size) {

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    /* horizontal lines */
    for (let y = 0; y <= canvas.height; y += size) {

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    /* dots */
    ctx.fillStyle = 'rgba(0,182,122,0.08)';

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

  /* ─────────────────────────────────────
     NAVBAR SCROLL
  ───────────────────────────────────── */

  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {

    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

  }, { passive: true });

  /* ─────────────────────────────────────
     ACTIVE NAV LINKS
  ───────────────────────────────────── */

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const id = entry.target.id;

        navLinks.forEach(link => {

          const active =
            link.getAttribute('href') === `#${id}`;

          link.style.color =
            active
              ? '#0f172a'
              : '';

        });
      }
    });

  }, {
    threshold: 0.35
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* ─────────────────────────────────────
     REVEAL ANIMATIONS
  ───────────────────────────────────── */

  const revealEls = document.querySelectorAll(`
    .layer-row,
    .tool-card,
    .principle-card,
    .path-card,
    .stat-box,
    .dist-row
  `);

  revealEls.forEach(el => {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

        revealObserver.unobserve(entry.target);
      }
    });

  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => {
    revealObserver.observe(el);
  });

  /* ─────────────────────────────────────
     TOOL FILTERS
  ───────────────────────────────────── */

  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards = document.querySelectorAll('.tool-card');

  filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

      filterBtns.forEach(b => {
        b.classList.remove('active');
      });

      btn.classList.add('active');

      const filter = btn.dataset.filter;

      toolCards.forEach(card => {

        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {

          card.style.display = '';

          card.style.animation = 'none';

          void card.offsetWidth;

          card.style.animation = 'fadeUp 0.45s ease both';

        } else {

          card.style.display = 'none';
        }
      });

    });

  });

  /* ─────────────────────────────────────
     LAYER ACCENT COLORS
  ───────────────────────────────────── */

  const layerRows = document.querySelectorAll('.layer-row');

  const colors = [
    '#00b67a',
    '#4f8cff',
    '#7c6cff',
    '#ff6b6b',
    '#ff9f43'
  ];

  layerRows.forEach((row, index) => {

    row.style.setProperty(
      '--accent-color',
      colors[index] || '#00b67a'
    );

  });

  /* ─────────────────────────────────────
     HERO TAG TOGGLE
  ───────────────────────────────────── */

  const stackTags = document.querySelectorAll('.stack-tag');

  stackTags.forEach(tag => {

    tag.addEventListener('click', () => {
      tag.classList.toggle('active');
    });

  });

  /* ─────────────────────────────────────
     HERO PARALLAX
  ───────────────────────────────────── */

  const glowA = document.querySelector('.hero-glow-a');
  const glowB = document.querySelector('.hero-glow-b');

  if (glowA && glowB) {

    document.addEventListener('mousemove', (e) => {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 40;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 40;

      glowA.style.transform =
        `translate(${x * 0.4}px, ${y * 0.4}px)`;

      glowB.style.transform =
        `translate(${-x * 0.3}px, ${-y * 0.3}px)`;

    }, { passive: true });
  }

  /* ─────────────────────────────────────
     CODE BLOCK COPY
  ───────────────────────────────────── */

  const codeBlock = document.querySelector('.code-block');

  if (codeBlock) {

    codeBlock.style.cursor = 'pointer';

    const copyHint = document.createElement('div');

    copyHint.textContent = 'COPY';

    copyHint.style.cssText = `
      position: absolute;
      top: 14px;
      right: 18px;

      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.2em;

      color: rgba(0,182,122,0.5);

      opacity: 0;

      transition: opacity 0.2s;
      pointer-events: none;
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

      const text = codeBlock.innerText
        .replace(/\nCOPY\s*$/, '')
        .trim();

      try {

        await navigator.clipboard.writeText(text);

        copyHint.textContent = 'COPIED';

        copyHint.style.color =
          'rgba(0,182,122,1)';

        setTimeout(() => {

          copyHint.textContent = 'COPY';

          copyHint.style.color =
            'rgba(0,182,122,0.5)';

        }, 1600);

      } catch {

        copyHint.textContent = 'ERROR';
      }

    });
  }

  /* ─────────────────────────────────────
     COUNTERS
  ───────────────────────────────────── */

  const statVals = document.querySelectorAll('.stat-val');

  const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const el = entry.target;

      const raw = el.textContent.trim();

      const num = parseInt(raw);

      if (!isNaN(num) && num > 0) {

        let current = 0;

        const duration = 900;

        const step = duration / num;

        const tick = () => {

          current++;

          el.textContent = current;

          if (current < num) {
            setTimeout(tick, step);
          }
        };

        setTimeout(tick, 180);
      }

      counterObserver.unobserve(el);

    });

  }, {
    threshold: 0.5
  });

  statVals.forEach(el => {
    counterObserver.observe(el);
  });

  /* ─────────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────────── */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener('click', e => {

        const target =
          document.querySelector(
            link.getAttribute('href')
          );

        if (target) {

          e.preventDefault();

          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

      });

    });

});
