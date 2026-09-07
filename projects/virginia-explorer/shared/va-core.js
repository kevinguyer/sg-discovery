/* ═══════════════════════════════════════════════════════════════════════
   Virginia Explorer — shared engine (window.VA)

   Loaded with plain <script src> tags (works from file://). Order matters:
     1. shared/va-map.js      → window.VA_MAP   (generated geometry)
     2. shared/va-core.js     → window.VA       (this file)
     3. content/*.js          → VA.add([...])   (content nodes)
     4. the page's own script

   Contents
     1. Content registry     VA.add, VA.get, VA.find, VA.byStandard
     2. Map                  VA.mountMap(svg, opts) → map instance
     3. Cards & index        VA.renderCard, VA.renderIndex
     4. Quiz                 VA.quiz(map, spec)
     5. Feedback             VA.toast, VA.confetti, VA.sfx
   ═══════════════════════════════════════════════════════════════════════ */
window.VA = (() => {
  'use strict';
  const M = window.VA_MAP;
  const NS = 'http://www.w3.org/2000/svg';

  /* ───────────────────────── 1. CONTENT REGISTRY ───────────────────── */
  const nodes = [];
  const byId = new Map();
  function add(list) {
    for (const n of list) {
      if (!n.id) throw new Error('content node needs an id: ' + JSON.stringify(n).slice(0, 80));
      n.standards = n.standards || []; n.related = n.related || []; n.type = n.type || 'place';
      nodes.push(n); byId.set(n.id, n);
    }
  }
  const get = id => byId.get(id) || null;
  const find = pred => nodes.filter(pred);
  const byStandard = code => nodes.filter(n => n.standards.some(s => s === code || s.startsWith(code + '.') || (code.length <= 4 && s.startsWith(code))));

  /* ───────────────────────── 2. MAP ────────────────────────────────── */
  const REGION_ORDER = ['coastal', 'piedmont', 'blueridge', 'valley', 'plateau'];
  const NEIGHBORS = ['MD', 'WV', 'KY', 'TN', 'NC', 'DC'];
  const svgEl = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

  /**
   * VA.mountMap(svg, {
   *   layers: { regions:true, rivers:true, minorRivers:false, water:true, neighbors:true, county:true, labels:true, pins:true, fallLine:false },
   *   interactive: ['region','river','state','water','pin'],   // which things respond to hover/click
   *   onSelect(ref, node, ev)                                    // ref = {kind, id}
   *   onHover(ref|null)
   *   pins: [nodes with lat/lon]                                 // pins drawn from content nodes
   *   labels: { regions:true, water:true, states:true }
   * })
   * Returns { svg, setLayer(name, on), highlight(ref), clearHighlight(), pin(node), pulse(ref), flyAlong(riverId, cb), refs }
   */
  function mountMap(svg, opts = {}) {
    const o = Object.assign({
      layers: {}, interactive: ['region', 'river', 'state', 'water', 'pin'], pins: [], labels: { regions: true, water: true, states: true },
      onSelect: null, onHover: null, regionFacts: null,
    }, opts);
    const layers = Object.assign({ regions: true, rivers: true, minorRivers: false, water: true, neighbors: true, county: true, labels: true, pins: true, fallLine: false }, o.layers);
    svg.setAttribute('viewBox', M.viewBox.join(' '));
    svg.classList.add('va-map');
    svg.innerHTML = '';
    const uid = 'clip-va-' + Math.random().toString(36).slice(2, 7);
    const defs = svgEl('defs', {}, svg);
    svgEl('path', { d: M.states.VA.d }, svgEl('clipPath', { id: uid }, defs));
    const L = {};
    for (const name of ['neighbors', 'regions', 'water', 'rivers', 'county', 'fallLine', 'outline', 'labels', 'pins', 'fx']) L[name] = svgEl('g', { class: 'va-layer va-layer-' + name }, svg);
    const refs = { region: {}, river: {}, state: {}, water: {}, pin: {} };
    const inter = kind => o.interactive.includes(kind);
    const wire = (el, ref) => {
      if (!inter(ref.kind)) { el.classList.add('va-inert'); return; }
      el.classList.add('va-hit'); el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
      const node = ref.nodeId ? get(ref.nodeId) : null;
      el.setAttribute('aria-label', ref.name);
      el.addEventListener('mouseenter', () => { el.classList.add('va-hover'); if (o.onHover) o.onHover(ref); });
      el.addEventListener('mouseleave', () => { el.classList.remove('va-hover'); if (o.onHover) o.onHover(null); });
      const sel = ev => { ev.preventDefault(); if (o.onSelect) o.onSelect(ref, ref.nodeId ? get(ref.nodeId) : null, ev); };
      el.addEventListener('click', sel);
      el.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') sel(ev); });
    };
    // neighbors
    for (const [code, s] of Object.entries(M.states)) {
      if (code === 'VA') continue;
      const el = svgEl('path', { d: s.d, class: 'va-state' + (NEIGHBORS.includes(code) ? ' va-neighbor' : ' va-far'), 'data-state': code }, L.neighbors);
      refs.state[code] = el;
      if (NEIGHBORS.includes(code)) wire(el, { kind: 'state', id: code, name: s.name, nodeId: 'state-' + code.toLowerCase() });
    }
    // regions (clipped)
    const rg = svgEl('g', { 'clip-path': 'url(#' + uid + ')' }, L.regions);
    for (const id of REGION_ORDER) {
      const r = M.regions[id]; if (!r) continue;
      const el = svgEl('path', { d: r.d, class: 'va-region', 'data-region': id }, rg);
      refs.region[id] = el; wire(el, { kind: 'region', id, name: r.name, nodeId: 'region-' + id });
    }
    // water bodies
    for (const w of M.lakes) {
      const el = svgEl('path', { d: w.d, class: 'va-water', 'data-water': w.id, 'data-feature': w.feature }, L.water);
      refs.water[w.id] = el; wire(el, { kind: 'water', id: w.id, name: w.name, nodeId: 'water-' + w.id });
    }
    // rivers
    for (const r of M.rivers) {
      const el = svgEl('path', { d: r.d, class: 'va-river va-river-' + r.rank, 'data-river': r.id }, L.rivers);
      refs.river[r.id] = el;
      if (r.rank === 'key' || r.rank === 'major') wire(el, { kind: 'river', id: r.id, name: r.name, nodeId: 'river-' + r.id });
      else el.classList.add('va-river-minor');
    }
    // county
    for (const [id, c] of Object.entries(M.counties)) svgEl('path', { d: c.d, class: 'va-county', 'data-county': id }, L.county);
    // Fall Line (approximate): the Coastal Plain / Piedmont boundary, drawn through the fall-line cities
    const FALL = [[-77.09, 38.90], [-77.05, 38.80], [-77.29, 38.60], [-77.36, 38.45], [-77.46, 38.30], [-77.45, 38.10], [-77.42, 37.90], [-77.44, 37.70], [-77.44, 37.54], [-77.40, 37.35], [-77.40, 37.23], [-77.45, 37.05], [-77.52, 36.85], [-77.54, 36.68], [-77.55, 36.55]];
    svgEl('path', { d: 'M' + FALL.map(([lo, la]) => { const p = M.project(lo, la); return p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' L'), class: 'va-fall-line' }, L.fallLine);
    // outline on top
    svgEl('path', { d: M.states.VA.d, class: 'va-outline' }, L.outline);
    // labels
    const label = (x, y, t, cls) => { const e = svgEl('text', { x, y, class: 'va-label ' + (cls || '') }, L.labels); e.textContent = t; return e; };
    const P = (lon, lat) => M.project(lon, lat);
    if (o.labels.regions) {
      const pos = { coastal: [-76.55, 37.78], piedmont: [-78.55, 37.45], blueridge: [-79.45, 37.98], valley: [-80.65, 37.25], plateau: [-82.35, 37.05] };
      for (const [id, ll] of Object.entries(pos)) { const q = P(...ll); label(q.x, q.y, M.regions[id].name, 'va-label-region'); }
    }
    if (o.labels.states) for (const [code, s] of Object.entries(M.states)) { if (NEIGHBORS.includes(code) && code !== 'DC' && s.label) label(s.label[0], s.label[1], s.name.toUpperCase(), 'va-label-state'); }
    if (o.labels.water) for (const [t, lon, lat] of [['Chesapeake Bay', -76.05, 37.55], ['Atlantic Ocean', -75.35, 36.95], ['James River', -78.0, 37.62], ['Potomac River', -77.25, 38.42], ['Rappahannock River', -77.2, 37.98], ['York River', -76.62, 37.32], ['Eastern Shore', -75.75, 37.68], ['Lake Drummond', -76.46, 36.66], ['Great Dismal Swamp', -76.45, 36.50]]) { const q = P(lon, lat); label(q.x, q.y, t, 'va-label-water'); }
    // pins from content nodes
    function pin(node, extraClass) {
      if (node.lat == null || node.lon == null) return null;
      const q = P(node.lon, node.lat);
      const g = svgEl('g', { class: 'va-pin ' + (extraClass || ''), 'data-pin': node.id, transform: `translate(${q.x.toFixed(1)},${q.y.toFixed(1)})` }, L.pins);
      svgEl('circle', { r: 5, class: 'va-pin-dot' }, g);
      const t = svgEl('text', { x: 7, y: -6, class: 'va-pin-label' }, g); t.textContent = node.name;
      refs.pin[node.id] = g; wire(g, { kind: 'pin', id: node.id, name: node.name, nodeId: node.id });
      return g;
    }
    for (const n of o.pins) pin(n);

    function setLayer(name, on) {
      if (name === 'minorRivers') { L.rivers.querySelectorAll('.va-river-minor').forEach(p => p.classList.toggle('va-hidden', !on)); }
      else if (L[name]) L[name].classList.toggle('va-hidden', !on);
      layers[name] = on;
    }
    for (const [k, v] of Object.entries(layers)) setLayer(k, v);

    let lit = [];
    function clearHighlight() { for (const el of lit) el.classList.remove('va-lit'); lit = []; svg.classList.remove('va-dim'); }
    function elFor(ref) { return ref && refs[ref.kind] ? refs[ref.kind][ref.id] : null; }
    function highlight(ref, { dim = true, scroll = false } = {}) {
      clearHighlight();
      const el = elFor(ref); if (!el) return;
      el.classList.add('va-lit'); lit.push(el);
      if (dim) svg.classList.add('va-dim');
      if (scroll) svg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    function pulse(ref) {
      const el = elFor(ref); if (!el) return;
      el.classList.remove('va-pulse'); void el.getBoundingClientRect(); el.classList.add('va-pulse');
      setTimeout(() => el.classList.remove('va-pulse'), 1400);
    }
    /* Animate a dot along a river from its start to its end. cb(progress) each frame. */
    function flyAlong(riverId, { duration = 4500, reverse = false, onDone } = {}) {
      const path = refs.river[riverId]; if (!path) return;
      const total = path.getTotalLength();
      const dot = svgEl('circle', { r: 7, class: 'va-fly-dot' }, L.fx);
      const trail = svgEl('path', { d: path.getAttribute('d'), class: 'va-fly-trail' }, L.fx);
      trail.style.strokeDasharray = total; trail.style.strokeDashoffset = reverse ? -total : total;
      const t0 = performance.now();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      (function step(t) {
        const k = reduce ? 1 : Math.min(1, (t - t0) / duration);
        const len = (reverse ? 1 - k : k) * total;
        const p = path.getPointAtLength(len);
        dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y);
        trail.style.strokeDashoffset = reverse ? -(total * k) : total * (1 - k);
        if (k < 1) requestAnimationFrame(step); else { setTimeout(() => { dot.remove(); trail.remove(); }, 900); if (onDone) onDone(); }
      })(t0);
    }
    return { svg, layers, refs, setLayer, highlight, clearHighlight, pin, pulse, flyAlong, elFor };
  }

  /* ───────────────────────── 3. CARDS & INDEX ──────────────────────── */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const TYPE_LABEL = { region: 'Region', water: 'Water', state: 'Neighbor', place: 'Place', person: 'Person', event: 'Event', tribe: 'Nation', era: 'Era' };
  function renderCard(container, node, { teacher = false, onRelated = null, onShow = null } = {}) {
    if (!node) { container.innerHTML = ''; return; }
    const img = node.image
      ? `<figure class="va-card-img"><img src="${esc(node.image.src)}" alt="${esc(node.image.alt || node.name)}" loading="lazy"><figcaption>${esc(node.image.caption || '')} <span class="va-credit">${esc(node.image.credit || '')}</span></figcaption></figure>`
      : `<div class="va-card-noimg" aria-hidden="true"><span>${esc(node.emoji || '🗺️')}</span><small>photo coming</small></div>`;
    const facts = node.facts && node.facts.length ? `<ul class="va-facts">${node.facts.map(f => `<li>${f}</li>`).join('')}</ul>` : '';
    const body = (node.body || []).map(p => `<p>${p}</p>`).join('');
    const rel = node.related.map(id => get(id)).filter(Boolean);
    const related = rel.length ? `<div class="va-related"><span class="va-related-label">Related</span>${rel.map(r => `<button class="va-chip" data-related="${esc(r.id)}">${esc(r.emoji || '')} ${esc(r.name)}</button>`).join('')}</div>` : '';
    const std = teacher && node.standards.length ? `<div class="va-standards">${node.standards.map(s => `<span class="va-std">${esc(s)}</span>`).join('')}</div>` : '';
    container.innerHTML = `
      <article class="va-card" data-node="${esc(node.id)}">
        <div class="va-card-top"><span class="va-kind">${esc(TYPE_LABEL[node.type] || node.type)}</span>${node.tagline ? `<span class="va-tagline">${esc(node.tagline)}</span>` : ''}</div>
        <h3 class="va-card-title">${esc(node.emoji || '')} ${esc(node.name)}</h3>
        ${node.blurb ? `<p class="va-blurb">${node.blurb}</p>` : ''}
        ${img}
        <div class="va-card-body">${body}${facts}</div>
        ${related}${std}
        ${onShow ? '<button class="va-btn va-show" type="button">📍 Show on the map</button>' : ''}
      </article>`;
    container.querySelectorAll('[data-related]').forEach(b => b.addEventListener('click', () => onRelated && onRelated(get(b.dataset.related))));
    const showBtn = container.querySelector('.va-show'); if (showBtn) showBtn.addEventListener('click', () => onShow(node));
  }
  function renderIndex(container, list, { onPick, groupBy = null } = {}) {
    const groups = new Map();
    for (const n of list) { const k = groupBy ? (groupBy(n) || '') : ''; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(n); }
    container.innerHTML = [...groups.entries()].map(([k, items]) => `
      ${k ? `<h4 class="va-index-group">${esc(k)}</h4>` : ''}
      <ul class="va-index">${items.map(n => `<li><button class="va-index-item" data-id="${esc(n.id)}"><span class="va-index-emoji">${esc(n.emoji || '•')}</span><span><b>${esc(n.name)}</b>${n.tagline ? `<small>${esc(n.tagline)}</small>` : ''}</span></button></li>`).join('')}</ul>`).join('');
    container.querySelectorAll('[data-id]').forEach(b => b.addEventListener('click', () => onPick && onPick(get(b.dataset.id))));
  }
  /* ref for a node: where it lives on the map */
  function refFor(node) {
    if (!node) return null;
    if (node.mapRef) return node.mapRef;
    if (node.type === 'region') return { kind: 'region', id: node.id.replace(/^region-/, '') };
    if (node.type === 'water') return { kind: 'water', id: node.id.replace(/^water-/, '') };
    if (node.type === 'state') return { kind: 'state', id: node.id.replace(/^state-/, '').toUpperCase() };
    if (node.lat != null) return { kind: 'pin', id: node.id };
    return null;
  }

  /* ───────────────────────── 4. QUIZ ───────────────────────────────── */
  /**
   * VA.quiz(map, { prompts:[{ask, ref:{kind,id}, why}], el:{ask, feedback, score, progress}, onDone(score, total) })
   * Click-the-map quiz: shows a prompt, listens for map selections, scores, explains.
   */
  function quiz(map, spec) {
    const prompts = spec.shuffle === false ? spec.prompts.slice() : shuffle(spec.prompts.slice());
    let i = 0, score = 0, streak = 0, locked = false, done = false;
    const E = spec.el;
    const state = { get done() { return done; } };
    function show() {
      if (i >= prompts.length) { done = true; E.ask.textContent = 'Round complete!'; if (spec.onDone) spec.onDone(score, prompts.length); return; }
      E.ask.innerHTML = prompts[i].ask; E.progress.textContent = `${i + 1} / ${prompts.length}`; E.feedback.className = 'va-feedback'; E.feedback.textContent = ''; locked = false;
      map.clearHighlight();
    }
    function handle(ref) {
      if (done || locked || !ref) return;
      const p = prompts[i]; locked = true;
      const right = ref.kind === p.ref.kind && ref.id === p.ref.id;
      if (right) { score++; streak++; E.feedback.className = 'va-feedback good'; E.feedback.innerHTML = `✅ <b>Yes!</b> ${p.why || ''}`; sfx.win(); map.pulse(ref); if (streak === 3) toast('🔥 Three in a row!', 'good'); }
      else { streak = 0; E.feedback.className = 'va-feedback bad'; E.feedback.innerHTML = `❌ That's <b>${esc(ref.name)}</b>. ${p.why || ''}`; sfx.nope(); map.highlight(p.ref, { dim: false }); map.pulse(p.ref); }
      E.score.textContent = score;
      i++; setTimeout(show, right ? 1100 : 2200);
    }
    show();
    return Object.assign(state, { handle, restart() { i = 0; score = 0; streak = 0; done = false; E.score.textContent = 0; shuffle(prompts); show(); } });
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ───────────────────────── 5. FEEDBACK ───────────────────────────── */
  let toastEl = null, toastTimer = null;
  function toast(msg, kind = 'info', ms = 2600) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'va-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.dataset.kind = kind; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function confetti(opts = {}) {
    if (reduceMotion()) return;
    const c = document.createElement('canvas');
    Object.assign(c.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 });
    document.body.appendChild(c);
    const ctx = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    const colors = opts.colors || ['#1F3A5F', '#B3261E', '#C79A3B', '#3E6B48', '#7FB3D5', '#F4E9D8'];
    const ox = opts.x ?? innerWidth / 2, oy = opts.y ?? innerHeight * 0.4;
    const parts = Array.from({ length: opts.count || 140 }, () => { const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9; return { x: ox, y: oy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 6, r: 4 + Math.random() * 6, col: colors[(Math.random() * colors.length) | 0], rot: Math.random() * 6, vr: (Math.random() - .5) * .3, life: 1 }; });
    let t0 = performance.now();
    (function frame(t) {
      const dt = Math.min(32, t - t0) / 16; t0 = t; ctx.clearRect(0, 0, c.width, c.height); let alive = 0;
      for (const p of parts) { p.vy += .35 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt; p.life -= .008 * dt; if (p.life <= 0) continue; alive++; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.col; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * .6); ctx.restore(); }
      if (alive) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }
  let actx = null, soundOn = true;
  function tone(freq = 440, dur = .12, type = 'sine', vol = .14) {
    if (!soundOn) return;
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume();
      const o = actx.createOscillator(), g = actx.createGain(); o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(.0001, actx.currentTime); g.gain.exponentialRampToValueAtTime(vol, actx.currentTime + .01); g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + dur);
      o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + dur + .02); } catch (e) { /* optional */ }
  }
  const sfx = {
    win() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, .18, 'triangle', .14), i * 110)); },
    nope() { tone(220, .16, 'sawtooth', .07); }, click() { tone(700, .05, 'sine', .09); }, snap() { tone(520, .08, 'triangle', .12); },
    setEnabled(v) { soundOn = !!v; }, get enabled() { return soundOn; },
  };
  function bindSoundToggle(btn) { if (!btn) return; btn.addEventListener('click', () => { sfx.setEnabled(!sfx.enabled); btn.textContent = sfx.enabled ? '🔊' : '🔇'; btn.setAttribute('aria-label', sfx.enabled ? 'Turn sound off' : 'Turn sound on'); if (sfx.enabled) sfx.click(); }); }

  return { nodes, add, get, find, byStandard, mountMap, renderCard, renderIndex, refFor, quiz, shuffle, toast, confetti, sfx, bindSoundToggle, reduceMotion, esc, REGION_ORDER, NEIGHBORS };
})();
