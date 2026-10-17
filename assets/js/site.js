/* site.js : shared by every page. Renders the header + footer, email copy, back to top. */
(function () {
  var body = document.body, page = body.dataset.page || 'home', proj = body.dataset.project || '';
  var MAIL = 'srushtiupadhyay@gmail.com';
  var I = {
    mail: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    li: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.05v5.9h-4v-5.23c0-1.25-.02-2.86-1.74-2.86-1.75 0-2.01 1.36-2.01 2.77v5.32h-4z"/></svg>',
    doc: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>'
  };
  var PROJ = [
    ['Degree Map', 'degree-map.html'],
    ['Ask Fernbook', 'ask-fernbook.html'],
    ['Decision Intelligence Hub', 'decision-hub.html'],
    ['Patient Monitoring System', 'patient-monitoring.html']
  ];
  var home = page === 'home', aboutHref = home ? '#about' : 'index.html#about';
  I.car = '<svg class="car" viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5"/></svg>';
  I.menu = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path class="l1" d="M4 7h16"/><path class="l2" d="M4 12h16"/><path class="l3" d="M4 17h16"/></svg>';
  var items = PROJ.map(function (x) {
    var cur = x[0] === proj;
    return '<a role="menuitem" href="' + x[1] + '"' + (cur ? ' class="cur" aria-current="page"' : '') + '>' + x[0] + '</a>';
  }).join('');
  // desktop and tablet: Work (with the project switcher) and About, the same on every page
  var nav = '<nav class="tabs" aria-label="Primary"><div class="wk">' +
    '<button class="tab wbtn' + (home ? '' : ' on') + '" type="button" aria-haspopup="true" aria-expanded="false" data-spy="work"' + (home ? '' : ' aria-current="true"') + '>' +
    'Work' + (home ? '' : '<span class="sl">/</span><b>' + proj + '</b>') + I.car + '</button>' +
    '<div class="wmenu" role="menu" hidden>' + items + '</div></div>' +
    '<a class="tab" href="' + aboutHref + '" data-spy="about">About</a></nav>';
  var soc = '<button class="sb" type="button" data-mail aria-label="Copy email address" title="Copy email address">' + I.mail + '</button>' +
    '<a class="sb" href="https://www.linkedin.com/in/srushti-upadhyay-86a2a3a2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">' + I.li + '</a>' +
    '<a class="sb" href="assets/docs/Srushti_Upadhyay_CV_Product_Designer.pdf" target="_blank" rel="noopener" aria-label="Resume" title="Resume">' + I.doc + '<span class="tx">Resume</span></a>';
  // phones: one menu button, the panel drops down from the header
  var mnav = '<div class="mnav" id="mnav" hidden><div class="min">' +
    '<button class="mrow mwk" type="button" aria-expanded="false" aria-controls="mwl">Work' + I.car + '</button>' +
    '<div class="mwl" id="mwl" hidden>' + items + '</div>' +
    '<a class="mrow" href="' + aboutHref + '" data-spy="about">About</a>' +
    '<div class="msoc">' + soc.replace('<span class="tx">Resume</span>', '<span>Resume</span>').replace(I.li + '</a>', I.li + '<span>LinkedIn</span></a>').replace(I.mail + '</button>', I.mail + '<span>Email</span></button>') + '</div>' +
    '</div></div>';
  var header = '<header class="bar"><a class="logo" href="' + (home ? '#top' : 'index.html') + '"><img src="assets/images/signature.png" alt="Srushti Upadhyay"></a>' + nav +
    '<div class="soc">' + soc + '</div>' +
    '<button class="mbtn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mnav">' + I.menu + '</button></header>';
  var footer = '<footer class="ft"><div class="chipc" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M2 1l11 5-5 2-2 5z"/></svg><span>Thanks for scrolling</span></div>' +
    '<h2>That\'s how I work.</h2><p>I design with the build in mind, because I’ve been the one who had to build it.</p>' +
    '<div class="fb"><span>&copy; 2026 Srushti Upadhyay</span><button id="up" type="button">Back to top &uarr;</button></div></footer>';
  var h = document.getElementById('site-header'), f = document.getElementById('site-footer');
  if (h) { h.innerHTML = header; body.insertAdjacentHTML('beforeend', mnav) } if (f) f.outerHTML = footer;

  var calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.querySelectorAll('[data-mail]').forEach(function (mb) { mb.addEventListener('click', function () {
    var pop = document.getElementById('copyPop');
    if (!pop) {
      pop = document.createElement('div'); pop.id = 'copyPop'; pop.className = 'copy-pop';
      pop.setAttribute('role', 'status'); pop.setAttribute('aria-live', 'polite');
      document.body.appendChild(pop);
    }
    var show = function (copied) {
      pop.innerHTML = '<span class="cp-ic" aria-hidden="true">' + (copied ? '&#10003;' : '@') + '</span>' +
        '<span><b>' + (copied ? 'Copied' : 'My email') + '</b><small>' + MAIL + '</small></span>';
      var r = mb.getBoundingClientRect(), w = pop.offsetWidth;
      var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), innerWidth - w - 12);
      pop.style.top = (r.bottom + 12) + 'px'; pop.style.left = left + 'px';
      pop.style.setProperty('--ax', (r.left + r.width / 2 - left) + 'px');
      pop.classList.add('on'); clearTimeout(pop._t);
      pop._t = setTimeout(function () { pop.classList.remove('on') }, 2500);
    };
    var fallback = function () {
      var ta = document.createElement('textarea'); ta.value = MAIL; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy') } catch (e) { } ta.remove(); show(ok);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(MAIL).then(function () { show(true) }, fallback); else fallback();
  }) });

  // Work switcher (desktop) and the phone menu
  var wb = document.querySelector('.wbtn'), wm = document.querySelector('.wmenu');
  function setW(open) { if (!wb) return; wb.setAttribute('aria-expanded', open); wm.hidden = !open; if (open) { var c = wm.querySelector('.cur') || wm.querySelector('a'); c && c.focus({ preventScroll: true }) } }
  if (wb) {
    wb.addEventListener('click', function (e) { e.stopPropagation(); setW(wm.hidden) });
    wm.addEventListener('keydown', function (e) {
      var a = [].slice.call(wm.querySelectorAll('a')), i = a.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); a[(i + 1) % a.length].focus() }
      if (e.key === 'ArrowUp') { e.preventDefault(); a[(i - 1 + a.length) % a.length].focus() }
    });
  }
  var mbtn = document.querySelector('.mbtn'), mp = document.getElementById('mnav'), mwk = document.querySelector('.mwk'), mwl = document.getElementById('mwl');
  function setM(open) { if (!mbtn) return; mbtn.setAttribute('aria-expanded', open); mbtn.setAttribute('aria-label', open ? 'Close menu' : 'Menu'); mp.hidden = !open; body.classList.toggle('mopen', open); if (!open) { mwl.hidden = true; mwk.setAttribute('aria-expanded', 'false') } }
  if (mbtn) {
    mbtn.addEventListener('click', function (e) { e.stopPropagation(); setM(mp.hidden) });
    mwk.addEventListener('click', function () { var o = mwl.hidden; mwl.hidden = !o; mwk.setAttribute('aria-expanded', o) });
    mp.addEventListener('click', function (e) { if (e.target === mp) setM(false); if (e.target.closest('a')) setM(false) });
  }
  document.addEventListener('click', function (e) { if (wm && !wm.hidden && !e.target.closest('.wk')) setW(false) });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (wm && !wm.hidden) { setW(false); wb.focus() } if (mp && !mp.hidden) { setM(false); mbtn.focus() } } });
  addEventListener('resize', function () { if (innerWidth > 700) setM(false) });
  var up = document.getElementById('up');
  if (up) up.addEventListener('click', function () { scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' }) });

})();
