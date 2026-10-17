/* home.js : homepage only (workspace, hero, about) */
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
const P = [
  { n: 'Degree Map', read: 8, href: 'degree-map.html', img: 'assets/images/degree-map-hero.png', ok: 1, line: 'A degree planner where drag and drop enforces prerequisites.', para: 'Redesigned the experience so the interface explains its own rules instead of requiring a tutorial.', chips: ['Drag and drop', 'Prerequisites'] },
  { n: 'Ask Fernbook', read: 9, href: 'ask-fernbook.html', img: 'assets/images/fern-hero.png', ok: 2, m: 1, line: 'A voice and text AI assistant for small business finance.', para: 'A concept that carries patterns from shipped AI work into money, where every action needs trust.', chips: ['Voice AI', 'Fintech', 'Mobile'] },
  { n: 'Decision Intelligence Hub', read: 5, href: 'decision-hub.html', img: 'assets/images/decision-hub-hero.png', ok: 0, line: 'An executive dashboard with approvals and scenario comparison.', para: 'Consolidated workflows that were spread across spreadsheets, email, and meetings into one workspace for executive teams.', chips: ['Dashboard', 'SaaS', 'Approvals'] },
  { n: 'Patient Monitoring System', read: 5, href: 'patient-monitoring.html', img: 'assets/images/patient-monitoring-hero.png', ok: 1, line: 'Clinic billing and check-in with live wait status.', para: 'Replaced an error-prone spreadsheet process. Used daily for two years, with ~30% better patient retention.', chips: ['Billing', 'Check-in', 'Wait status'] }
];
const $ = s => document.querySelector(s);
const STATS = [
  [{ pre: '', n: 2000, suf: '+', c: 1, l: 'students and advisors each semester', t: 'Measured' }, { pre: '~', n: 80, suf: '%', l: 'fewer bug reports after the redesign', t: 'Measured' }],
  [{ n: 4, l: 'trust patterns: read-back, confirm, show sources, undo', t: 'Scope' }, { n: 9, l: 'mobile screens and a voice demo, from request to payment', t: 'Scope' }],
  [{ n: 4, l: 'disconnected tools in the old decision process', t: 'Problem' }, { n: 4, l: 'product goals, from monitoring to approval', t: 'Scope' }],
  [{ n: 60, suf: '%', l: 'faster billing and payment processing', t: 'Measured' }, { n: 30, suf: '%', l: 'increase in patient retention', t: 'Observed' }]];
function showStats(i) {
  $('#stats').innerHTML = STATS[i].map(s => '<div class="stat' + (s.w ? ' w' : '') + '"><b>' + (s.txt || ((s.pre || '') + '<i style="font-style:normal" data-n="' + s.n + '" data-c="' + (s.c || '') + '">' + (s.c ? s.n.toLocaleString('en-US') : s.n) + '</i>' + (s.suf || ''))) + '</b><span>' + s.l + '</span><em class="mono">' + s.t + '</em></div>').join('');
  if (reduce) return;
  document.querySelectorAll('#stats [data-n]').forEach(el => { const to = +el.dataset.n, t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / 800), v = Math.round(to * (1 - Math.pow(1 - k, 3))); el.textContent = el.dataset.c ? v.toLocaleString('en-US') : v; if (k < 1) requestAnimationFrame(f) })(t0) });
}
const ico = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><rect x="1.5" y="2.5" width="13" height="11" rx="1.75"/><path d="M1.5 5.5h13"/><path d="M3.6 4h.01M5.2 4h.01M6.8 4h.01" stroke-width="1.6"/></svg>';
const icoM = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><rect x="4" y="1.5" width="8" height="13" rx="1.75"/><path d="M7 12.2h2"/></svg>';
let cur = 0, z = 1, px = 0, py = 0;
const list = $('#layerList');
P.forEach((p, i) => { const b = document.createElement('button'); b.className = 'layer'; b.setAttribute('role', 'option'); b.innerHTML = (p.m ? icoM : ico) + p.n; b.onclick = () => sel(i); list.appendChild(b) });
function view() { const f = $('#frame').style; f.setProperty('--z', z); f.setProperty('--px', px + 'px'); f.setProperty('--py', py + 'px'); }
function sel(i) {
  cur = (i + P.length) % P.length; const p = P[cur]; z = 1; px = py = 0; view();
  document.querySelectorAll('.layer').forEach((l, k) => l.setAttribute('aria-selected', k === cur));
  $('#tagName').textContent = p.n; $('#tagType').textContent = p.m ? 'Mobile app' : 'Web app';
  $('#count').textContent = (cur + 1) + ' / ' + P.length; $('#readt').textContent = p.read + ' min read';
  $('#shot').innerHTML = '<img src="' + p.img + '" alt="' + p.n + ' interface" draggable="false">';
  $('#st').className = 'st' + (p.ok === 2 ? ' cn' : p.ok ? '' : ' no'); $('#st span').textContent = p.ok === 2 ? 'Concept' : p.ok ? 'Shipped' : 'Not shipped';
  showStats(cur);
  $('#ttl').textContent = p.n; $('#para').textContent = p.line;
  $('#chips').innerHTML = p.chips.map((c, k) => '<span class="chip">' + c + '</span>').join('');
  $('#open').href = p.href;
}
sel(0);

/* browse: previous / next, plus arrow keys on the preview */
const cv = $('#canvas');
$('#prev').onclick = () => sel(cur - 1); $('#next').onclick = () => sel(cur + 1);
cv.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); sel(cur + 1) } if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); sel(cur - 1) } });
list.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); sel(cur + 1); document.querySelectorAll('.layer')[cur].focus() } if (e.key === 'ArrowUp') { e.preventDefault(); sel(cur - 1); document.querySelectorAll('.layer')[cur].focus() } });

/* active tab: nothing selected until a section is in view */
const tabs = [...document.querySelectorAll('[data-spy]')], spyEls = ['work', 'about'].map(id => document.getElementById(id));
let tabTick = false;
function setTab() {
  tabTick = false; const y = innerHeight * .4; let on = null;
  spyEls.forEach(el => { const r = el.getBoundingClientRect(); if (r.top <= y && r.bottom > y) on = el.id });
  tabs.forEach(t => { const a = t.dataset.spy === on; t.classList.toggle('on', a); if (a) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current') })
}
addEventListener('scroll', () => { if (!tabTick) { tabTick = true; requestAnimationFrame(setTab) } }, { passive: true });
addEventListener('resize', setTab); setTab();

/* hero: sketch lens. Moving over the hero shows the pencil sketch and notes behind the design. */
(function () {
  const hero = $('#top'), xr = $('#xray'); if (!hero || !xr) return;
  const calm = reduce, coarse = matchMedia('(pointer:coarse)').matches;

  // 1. a copy of the hero text, so the words stay solid inside the lens
  const src = hero.querySelector('.hin'), copy = src.cloneNode(true);
  copy.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
  const paper = document.createElement('div'); paper.className = 'sk';
  xr.appendChild(paper); xr.appendChild(copy);

  // 2. the sketch underneath, drawn around the real elements so it always lines up
  function sketch() {
    const hr = hero.getBoundingClientRect(), W = hr.width, H = hr.height;
    const R = el => { const r = el.getBoundingClientRect(); return { x: r.left - hr.left, y: r.top - hr.top, w: r.width, h: r.height } };
    const chip = R(src.querySelector('.hi')), h1 = R(src.querySelector('h1')), em = R(src.querySelector('h1 em')), sub = R(src.querySelector('.sub'));
    const scEl = hero.querySelector('.sc'), sc = scEl && scEl.offsetParent ? R(scEl) : null;
    let seed = 7; const J = a => { seed = (seed * 16807) % 2147483647; return (seed / 2147483647 - .5) * a };
    const box = (r, p) => { const x0 = r.x - p, y0 = r.y - p, x1 = r.x + r.w + p, y1 = r.y + r.h + p;
      return '<path d="M' + (x0 + J(4)) + ',' + (y0 + J(3)) + ' L' + (x1 + J(6)) + ',' + (y0 + J(4)) + ' L' + (x1 + J(3)) + ',' + (y1 + J(5)) + ' L' + (x0 + J(5)) + ',' + (y1 + J(3)) + ' Z"/>' };
    const arrow = (x1, y1, cx, cy, x2, y2) => '<path d="M' + x1 + ',' + y1 + ' Q' + cx + ',' + cy + ' ' + x2 + ',' + y2 + '"/><path d="M' + x2 + ',' + y2 + ' l-10,-5 M' + x2 + ',' + y2 + ' l-3,-11"/>';
    const note = (x, y, t, rot) => '<text x="' + x + '" y="' + y + '" transform="rotate(' + rot + ' ' + x + ' ' + y + ')">' + t + '</text>';
    let grid = ''; for (let gx = 0; gx < W; gx += 24) grid += '<line x1="' + gx + '" y1="0" x2="' + gx + '" y2="' + H + '"/>';
    for (let gy = 0; gy < H; gy += 24) grid += '<line x1="0" y1="' + gy + '" x2="' + W + '" y2="' + gy + '"/>';
    let lines = ''; const lh = h1.h / 3;
    for (let i = 0; i < 3; i++) { const y = h1.y + lh * (i + .82); lines += '<path d="M' + (h1.x - 30) + ',' + (y + J(2)) + ' Q' + (h1.x + h1.w / 2) + ',' + (y + J(4)) + ' ' + (h1.x + h1.w + 30) + ',' + (y + J(2)) + '"/>' }
    const wide = W > 1000;
    let pen = '', words = '', hand = '';
    if (wide) {
      pen = box(chip, 8) + box(h1, 16) + box(sub, 12) + lines +
        '<path d="M' + (W / 2) + ',30 L' + (W / 2) + ',' + (chip.y - 20) + '" stroke-dasharray="4 6"/>' +
        arrow(em.x + em.w + 64, em.y - 46, em.x + em.w + 30, em.y - 40, em.x + em.w + 10, em.y + 2) +
        arrow(chip.x - 160, chip.y - 28, chip.x - 70, chip.y - 34, chip.x - 12, chip.y + 4) +
        arrow(sub.x + sub.w + 70, sub.y + sub.h + 56, sub.x + sub.w + 40, sub.y + sub.h + 40, sub.x + sub.w + 18, sub.y + sub.h * .6) +
        arrow(h1.x + h1.w + 120, h1.y + h1.h * .62, h1.x + h1.w + 60, h1.y + h1.h * .55, h1.x + h1.w + 22, h1.y + h1.h * .48) +
        '<path d="M' + (90 + J(3)) + ',' + (300 + J(3)) + ' L300,296 L304,450 L86,454 Z"/><path d="M90,300 L304,450 M300,298 L86,452"/>';
      words = note(em.x + em.w + 72, em.y - 44, 'only one word gets color', -4) + note(chip.x - 330, chip.y - 36, 'say hi first', -4) +
        note(sub.x + sub.w + 60, sub.y + sub.h + 80, 'say it like a person', -2) + note(70, 110, 'v3 · hero', -2) +
        note(h1.x + h1.w + 130, h1.y + h1.h * .66, 'one idea,', -3) + note(h1.x + h1.w + 138, h1.y + h1.h * .66 + 30, 'one focus', -3) +
        note(78, 488, 'hero image? no.', -2) + note(84, 516, 'let the words work', -2);
      if (sc) {
        pen += box(sc, 8) + '<path d="M' + (W / 2) + ',' + (sub.y + sub.h + 20) + ' L' + (W / 2) + ',' + (sc.y - 14) + '" stroke-dasharray="4 6"/>' +
          arrow(sc.x - 170, sc.y - 40, sc.x - 90, sc.y - 40, sc.x - 12, sc.y + 6);
        words += note(sc.x - 340, sc.y - 46, 'always give a next step', -3);
      }
    } else {
      // phones and tablets: notes sit above and below the text, anchored to the screen edges so nothing runs off
      const fs = W < 700 ? 21 : 24, cw = fs * .42, m = 16, tw = t => t.length * cw;
      const noteE = (x, y, t, rot) => '<text x="' + x + '" y="' + y + '" text-anchor="end" transform="rotate(' + rot + ' ' + x + ' ' + y + ')">' + t + '</text>';
      hand = ' style="font-size:' + fs + 'px"';
      pen = box(chip, 6) + box(h1, 10) + box(sub, 8) + lines;
      words = note(m, 40, 'v3 · hero', -2);
      // say hi first: beside the chip if it fits, otherwise above it
      const hiT = 'say hi first';
      if (chip.x - 26 - tw(hiT) > m) {
        words += noteE(chip.x - 26, chip.y + chip.h * .72, hiT, -3);
        pen += arrow(chip.x - 22, chip.y + chip.h * .45, chip.x - 16, chip.y + chip.h * .2, chip.x - 8, chip.y + chip.h * .5);
      } else {
        words += note(m, chip.y - 40, hiT, -3);
        pen += arrow(m + tw(hiT) * .6, chip.y - 32, chip.x - 30, chip.y - 30, chip.x - 8, chip.y + 6);
      }
      // only one word gets color: above the chip, right edge, arrow down to the coloured word
      const ny = chip.y - (chip.x - 26 - tw(hiT) > m ? 30 : 74);
      const nx = Math.min(W - m, Math.max(em.x + em.w + 40, chip.x + chip.w + 40) + tw('only one word gets color') * .55);
      words += noteE(nx, ny, 'only one word gets color', -3);
      const ax = Math.min(nx - 30, Math.max(em.x + em.w + 26, chip.x + chip.w + 24));
      pen += arrow(ax, ny + 10, ax + 4, (ny + em.y) / 2 + 10, Math.min(em.x + em.w - 4, W - m - 10), em.y - 2);
      // say it like a person: under the subline, right edge
      const py = sub.y + sub.h + 46, px = Math.min(W - m, sub.x + sub.w + 60);
      words += noteE(px, py, 'say it like a person', -2);
      pen += arrow(px - tw('say it like a person') * .5, py - 22, px - tw('say it like a person') * .55, sub.y + sub.h + 18, Math.min(sub.x + sub.w - 20, px - 30), sub.y + sub.h + 8);
      if (sc) {
        const sy = sc.y - 26;
        pen += box(sc, 6);
        if (sy > py + 30) {
          words += note(m, sy, 'always give a next step', -3);
          pen += arrow(m + tw('always give a next step') * .7, sy + 8, sc.x - 30, sy + 14, sc.x - 8, sc.y + sc.h * .4);
        }
      }
    }
    const ring = '<path class="em" d="M' + (em.x - 10) + ',' + (em.y + em.h * .5) + ' C' + (em.x - 14) + ',' + (em.y - 12) + ' ' + (em.x + em.w + 18) + ',' + (em.y - 14) + ' ' + (em.x + em.w + 10) + ',' + (em.y + em.h * .55) +
      ' C' + (em.x + em.w + 6) + ',' + (em.y + em.h + 14) + ' ' + (em.x - 6) + ',' + (em.y + em.h + 12) + ' ' + (em.x - 10) + ',' + (em.y + em.h * .45) + '"/>' +
      '<path class="em" d="M' + (em.x - 4) + ',' + (em.y + em.h - 6) + ' Q' + (em.x + em.w / 2) + ',' + (em.y + em.h + 6) + ' ' + (em.x + em.w + 4) + ',' + (em.y + em.h - 8) + '"/>';
    paper.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '"><g class="grid">' + grid + '</g><g class="pen">' + pen + ring + '</g><g class="hand"' + hand + '>' + words + '</g></svg>';
  }
  sketch(); addEventListener('resize', sketch);
  if (document.fonts) document.fonts.ready.then(sketch);

  // a quiet hint, gone after the first use
  const hint = document.createElement('div'); hint.className = 'lens-hint';
  hint.textContent = coarse ? 'Tap to see the sketch behind it' : 'Move your cursor to see the sketch behind it';
  hero.appendChild(hint);

  // 3. the lens: eased position and size, parallax kept from before
  // touch gets a wider lens so a whole note fits in one tap
  const R = () => coarse ? Math.min(130, innerWidth * .3) : Math.max(84, Math.min(125, innerWidth * .085));
  const L = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 }, m = { px: 0, py: 0, cx: 0, cy: 0 };
  let raf = 0, vis = true, hideT = 0;
  function frame() {
    const k = calm ? 1 : .18, kr = calm ? 1 : .14, kp = calm ? 1 : .08;
    L.x += (L.tx - L.x) * k; L.y += (L.ty - L.y) * k; L.r += (L.tr - L.r) * kr;
    m.cx += (m.px - m.cx) * kp; m.cy += (m.py - m.cy) * kp;
    if (L.r < .5 && L.tr === 0) L.r = 0;
    hero.style.setProperty('--lx', L.x.toFixed(1) + 'px'); hero.style.setProperty('--ly', L.y.toFixed(1) + 'px');
    hero.style.setProperty('--lr', L.r.toFixed(1) + 'px');
    hero.style.setProperty('--px', calm ? 0 : m.cx.toFixed(3)); hero.style.setProperty('--py', calm ? 0 : m.cy.toFixed(3));
    const busy = Math.abs(L.tx - L.x) + Math.abs(L.ty - L.y) + Math.abs(L.tr - L.r) + Math.abs(m.px - m.cx) + Math.abs(m.py - m.cy) > .3;
    raf = vis && busy ? requestAnimationFrame(frame) : 0;
  }
  const kick = () => { if (!raf && vis) raf = requestAnimationFrame(frame) };
  function aim(x, y, snap) {
    const r = hero.getBoundingClientRect(), lx = x - r.left, ly = y - r.top;
    L.tx = lx; L.ty = ly; if (snap) { L.x = lx; L.y = ly }
    m.px = (lx / r.width - .5) * 2; m.py = (ly / r.height - .5) * 2;
  }
  function open() { L.tr = R(); hero.classList.add('xr-on', 'xr-used') }
  function close() { L.tr = 0; m.px = m.py = 0; hero.classList.remove('xr-on'); kick() }

  if (!coarse) {
    hero.addEventListener('pointerenter', e => { aim(e.clientX, e.clientY, L.r < 1); open(); kick() });
    hero.addEventListener('pointermove', e => { if (e.target.closest('.sc')) { close(); return } aim(e.clientX, e.clientY, L.r < 1); open(); kick() });
    hero.addEventListener('pointerleave', close);
  } else {
    // touch: tap to peek, it closes by itself so scrolling stays normal
    hero.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      aim(e.clientX, e.clientY, true); open(); kick();
      clearTimeout(hideT); hideT = setTimeout(close, 2600);
    });
  }
  new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) kick() }, { threshold: .05 }).observe(hero);
})();

/* about: photo tilt */
(function () {
  const pf = $('#pf'), ph = pf.querySelector('.photo');
  if (!reduce && !matchMedia('(pointer:coarse)').matches) { pf.addEventListener('pointermove', e => { const r = pf.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; ph.style.transform = 'rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 6) + 'deg)' }); pf.addEventListener('pointerleave', () => ph.style.transform = '') }
})();
