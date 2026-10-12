(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Skills marquee */
  const SI = 'https://cdn.simpleicons.org/';
  const skillRows = [
    [
      { name: 'Python', si: 'python' },
      { name: 'SQL', fa: 'fa-solid fa-database', color: '#22d3ee' },
      { name: 'BigQuery', si: 'googlebigquery' },
      { name: 'PostgreSQL', si: 'postgresql' },
      { name: 'Google Cloud', si: 'googlecloud' },
      { name: 'dbt', si: 'dbt' },
      { name: 'Airflow', si: 'apacheairflow' },
      { name: 'Pandas', si: 'pandas/e8e6ff' },
      { name: 'Power BI', fa: 'fa-solid fa-chart-column', color: '#F2C811' },
      { name: 'Excel', fa: 'fa-solid fa-file-excel', color: '#21A366' },
      { name: 'Linux', si: 'linux' },
      { name: 'Git', si: 'git' },
      { name: 'GitHub', si: 'github/ffffff' }
    ],
    [
      { name: 'PyTorch', si: 'pytorch' },
      { name: 'TensorFlow', si: 'tensorflow' },
      { name: 'Hugging Face', si: 'huggingface' },
      { name: 'scikit-learn', si: 'scikitlearn' },
      { name: 'OpenCV', si: 'opencv' },
      { name: 'YOLOv8', fa: 'fa-solid fa-crosshairs', color: '#f472b6' },
      { name: 'NLP', fa: 'fa-solid fa-language', color: '#a78bfa' },
      { name: 'RAG', fa: 'fa-solid fa-book-open-reader', color: '#34d399' },
      { name: 'FastAPI', si: 'fastapi' },
      { name: 'Streamlit', si: 'streamlit' },
      { name: 'Gradio', fa: 'fa-solid fa-wand-magic-sparkles', color: '#fb923c' },
      { name: 'Jupyter', si: 'jupyter' },
      { name: 'NumPy', si: 'numpy/4dabcf' }
    ]
  ];

  function makeIcon(item) {
    if (item.si) {
      const img = document.createElement('img');
      img.src = SI + item.si;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 24;
      img.height = 24;
      img.onerror = () => {
        const i = document.createElement('i');
        i.className = 'fa-solid fa-code';
        i.style.color = '#22d3ee';
        img.replaceWith(i);
      };
      return img;
    }
    const i = document.createElement('i');
    i.className = item.fa;
    i.style.color = item.color;
    return i;
  }

  document.querySelectorAll('.marquee').forEach(marquee => {
    const track = marquee.querySelector('.track');
    const row = skillRows[Number(marquee.dataset.row)] || [];
    for (let copy = 0; copy < 2; copy++) {
      row.forEach(item => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        if (copy === 1) chip.setAttribute('aria-hidden', 'true');
        chip.appendChild(makeIcon(item));
        chip.appendChild(document.createTextNode(item.name));
        track.appendChild(chip);
      });
    }
  });

  /* Reveal on scroll */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* Counters */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* Nav, progress bar, timeline fill */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const timeline = document.getElementById('timeline');
  const tlFill = document.getElementById('tlFill');
  const tlItems = timeline ? timeline.querySelectorAll('.tl-item') : [];
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('scrolled', y > 30);

    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const focus = window.innerHeight * 0.6;
      const ratio = Math.min(Math.max((focus - rect.top) / rect.height, 0), 1);
      tlFill.style.height = `${ratio * 100}%`;
      tlItems.forEach(item => {
        const node = item.querySelector('.tl-node').getBoundingClientRect();
        item.classList.toggle('lit', node.top + node.height / 2 < focus);
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* Active nav link */
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

  /* Mobile menu */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  function setMenu(open) {
    menuBtn.classList.toggle('open', open);
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navAnchors.forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !nav.contains(e.target)) setMenu(false);
  });

  /* Rotating words */
  const rotator = document.getElementById('rotator');
  const words = ['decisions.', 'pipelines.', 'insights.', 'AI products.', 'dashboards.'];
  if (rotator) {
    if (reduceMotion) {
      rotator.textContent = words[0];
    } else {
      let w = 0, c = 0, deleting = false;
      function type() {
        const word = words[w];
        if (!deleting) {
          rotator.textContent = word.slice(0, ++c);
          if (c === word.length) { deleting = true; return setTimeout(type, 1600); }
          return setTimeout(type, 85);
        }
        rotator.textContent = word.slice(0, --c);
        if (c === 0) { deleting = false; w = (w + 1) % words.length; return setTimeout(type, 300); }
        setTimeout(type, 40);
      }
      setTimeout(type, 1200);
    }
  }

  /* Particle network in hero */
  const canvas = document.getElementById('net');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    let w = 0, h = 0, points = [], running = false;
    const pointer = { x: -9999, y: -9999 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(28, (w * h) / 15000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.6
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const link = Math.min(140, w / 6);

      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) { p.x += (dx / d) * 0.8; p.y += (dy / d) * 0.8; }
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.strokeStyle = `rgba(150, 140, 255, ${(1 - d / link) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < 200) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - pd / 200) * 0.55})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(220, 225, 255, 0.85)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }

      if (running) requestAnimationFrame(frame);
    }

    function setPointer(e) {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    }
    hero.addEventListener('pointermove', setPointer, { passive: true });
    hero.addEventListener('pointerdown', setPointer, { passive: true });
    hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });

    resize();
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth !== lastWidth) { lastWidth = window.innerWidth; resize(); }
    });

    if (reduceMotion) {
      frame();
    } else {
      new IntersectionObserver(([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !running) { running = true; requestAnimationFrame(frame); }
        running = visible;
      }).observe(hero);
    }
  }

  /* Cursor glow, card spotlight, tilt, magnetic buttons (desktop only) */
  if (finePointer && !reduceMotion) {
    const glow = document.getElementById('glow');
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
    document.addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add('on');
    }, { passive: true });
    document.addEventListener('pointerleave', () => glow.classList.remove('on'));
    (function follow() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      requestAnimationFrame(follow);
    })();

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        if (card.classList.contains('tilt')) {
          const rx = ((y / r.height) - 0.5) * -6;
          const ry = ((x / r.width) - 0.5) * 6;
          card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        }
      });
      card.addEventListener('pointerleave', () => {
        if (card.classList.contains('tilt')) card.style.transform = '';
      });
    });

    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* Copy email */
  const copyBtn = document.getElementById('copyEmail');
  const copyHint = document.getElementById('copyHint');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        copyHint.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        copyHint.classList.add('ok');
        setTimeout(() => {
          copyHint.innerHTML = '<i class="fa-regular fa-copy"></i>';
          copyHint.classList.remove('ok');
        }, 2000);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  /* Contact form */
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const formBtn = document.getElementById('formBtn');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const label = formBtn.querySelector('span');
      formBtn.disabled = true;
      label.textContent = 'Sending...';
      formMessage.classList.remove('err');
      formMessage.textContent = '';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error();
        form.reset();
        formMessage.textContent = 'Thank you! Your message has been sent.';
      } catch {
        formMessage.classList.add('err');
        formMessage.textContent = 'Something went wrong. Please email me directly.';
      } finally {
        formBtn.disabled = false;
        label.textContent = 'Send message';
      }
    });
  }

  /* Footer year */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
