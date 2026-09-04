/* ═══════════════════════════════════════════════════════════════════════
   SlicerCore — shared geometry + interaction engine for the
   "Shape Slicer" exhibit (REDS Hall of Discovery).

   Loaded with a plain <script src="../shared/slicer-core.js"> so it works
   from file:// with no server or build step. Exposes window.SlicerCore.

   Contents
     1. Polygon math      — area, centroid, point-in-polygon, splitByLine
     2. Canvas helpers    — DPR-aware sizing
     3. Board             — a draggable / rotatable / sliceable piece board
     4. Feedback          — toast, confetti, tiny synth sounds

   Coordinates: "world units" = grid squares, y goes UP (math style).
   ═══════════════════════════════════════════════════════════════════════ */
window.SlicerCore = (() => {
  'use strict';

  /* ───────────────────────── 1. POLYGON MATH ───────────────────────── */
  const P = (x, y) => ({ x, y });

  function signedArea(pts) {
    let a = 0;
    for (let i = 0, n = pts.length; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n];
      a += p.x * q.y - q.x * p.y;
    }
    return a / 2;
  }
  const area = pts => Math.abs(signedArea(pts));

  function centroid(pts) {
    const n = pts.length;
    let cx = 0, cy = 0, a = 0;
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n];
      const f = p.x * q.y - q.x * p.y;
      cx += (p.x + q.x) * f; cy += (p.y + q.y) * f; a += f;
    }
    if (Math.abs(a) < 1e-12) {
      return P(pts.reduce((s, p) => s + p.x, 0) / n, pts.reduce((s, p) => s + p.y, 0) / n);
    }
    return P(cx / (3 * a), cy / (3 * a));
  }

  function bbox(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
    }
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  }

  /** Force counter-clockwise winding. */
  function ccw(pts) { return signedArea(pts) < 0 ? pts.slice().reverse() : pts.slice(); }

  /** Merge near-duplicate vertices and drop collinear ones. */
  function simplify(pts, tol = 1e-5) {
    let out = [];
    for (const p of pts) {
      const q = out[out.length - 1];
      if (!q || Math.hypot(p.x - q.x, p.y - q.y) > tol) out.push(P(p.x, p.y));
    }
    while (out.length > 1 && Math.hypot(out[0].x - out[out.length - 1].x, out[0].y - out[out.length - 1].y) <= tol) out.pop();
    // remove collinear vertices
    let changed = true;
    while (changed && out.length > 3) {
      changed = false;
      for (let i = 0; i < out.length; i++) {
        const a = out[(i + out.length - 1) % out.length], b = out[i], c = out[(i + 1) % out.length];
        const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
        const l1 = Math.hypot(b.x - a.x, b.y - a.y), l2 = Math.hypot(c.x - b.x, c.y - b.y);
        if (Math.abs(cross) <= tol * Math.max(l1, l2, 1e-9)) { out.splice(i, 1); changed = true; break; }
      }
    }
    return out;
  }

  function pointInPoly(pt, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const a = pts[i], b = pts[j];
      if ((a.y > pt.y) !== (b.y > pt.y)) {
        const x = (b.x - a.x) * (pt.y - a.y) / (b.y - a.y) + a.x;
        if (pt.x < x) inside = !inside;
      }
    }
    return inside;
  }

  function distPointSeg(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const L2 = dx * dx + dy * dy;
    let t = L2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
  }

  /**
   * Split a simple polygon by the infinite line through `p` with direction `d`.
   * Returns an array of polygons (length 1 if the line misses the shape).
   * Works for concave shapes too: one cut may create 3+ pieces.
   *
   * Method: insert every crossing into the vertex ring, sort the crossings
   * along the line (consecutive pairs are interior chords), then walk the
   * ring and "jump" across a chord each time a crossing is reached.
   */
  function splitByLine(polyIn, p, d) {
    const pts = ccw(polyIn);
    const n = pts.length;
    const len = Math.hypot(d.x, d.y) || 1;
    const dir = P(d.x / len, d.y / len);
    const bb = bbox(pts);
    const scale = Math.max(bb.w, bb.h, 1e-9);
    const eps = scale * 1e-7;

    // Nudge the line sideways until no vertex sits exactly on it.
    let origin = P(p.x, p.y);
    const side = v => dir.x * (v.y - origin.y) - dir.y * (v.x - origin.x);
    for (let tries = 0; tries < 8; tries++) {
      if (pts.every(v => Math.abs(side(v)) > eps)) break;
      origin = P(origin.x - dir.y * eps * 3, origin.y + dir.x * eps * 3);
    }

    const ring = [];
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      ring.push({ pt: a, isX: false });
      const sa = side(a), sb = side(b);
      if ((sa > 0) !== (sb > 0)) {
        const t = sa / (sa - sb);
        let q = P(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
        // The nudge only decides topology; project the crossing back onto the true line.
        const so = dir.x * (q.y - p.y) - dir.y * (q.x - p.x);
        q = P(q.x + dir.y * so, q.y - dir.x * so);
        ring.push({ pt: q, isX: true });
      }
    }
    const xs = ring.map((nd, i) => ({ nd, i })).filter(o => o.nd.isX);
    if (xs.length < 2) return [pts];
    xs.sort((u, v) => {
      const du = (u.nd.pt.x - origin.x) * dir.x + (u.nd.pt.y - origin.y) * dir.y;
      const dv = (v.nd.pt.x - origin.x) * dir.x + (v.nd.pt.y - origin.y) * dir.y;
      return du - dv;
    });
    for (let k = 0; k < xs.length; k++) xs[k].nd.partner = xs[k ^ 1].i;

    const m = ring.length;
    const used = new Array(m).fill(false);
    const faces = [];
    for (let start = 0; start < m; start++) {
      if (used[start]) continue;
      const face = [];
      let cur = start, guard = 0;
      do {
        face.push(ring[cur].pt);
        used[cur] = true;
        let nxt = (cur + 1) % m;
        if (ring[nxt].isX) { face.push(ring[nxt].pt); nxt = ring[nxt].partner; }
        cur = nxt;
      } while (cur !== start && !used[cur] && ++guard < 4 * m);
      // Snap crossings that landed a hair away from an original corner back onto it,
      // so a cut "through a corner" leaves exact vertices behind.
      const snapTol = scale * 1e-5;
      const snapped = face.map(v => {
        for (const o of pts) if (Math.hypot(v.x - o.x, v.y - o.y) <= snapTol) return o;
        return v;
      });
      const clean = simplify(snapped, snapTol);
      if (clean.length >= 3 && area(clean) > scale * scale * 1e-6) faces.push(clean);
    }
    // A cut that merely grazes a corner leaves one real face plus a dropped sliver: treat as a miss.
    return faces.length >= 2 ? faces : [pts];
  }

  /** Rotate (+ optional mirror) then translate local points into world space. */
  function transformPts(pts, tf) {
    const c = Math.cos(tf.rot || 0), s = Math.sin(tf.rot || 0);
    const fx = tf.flip ? -1 : 1;
    return pts.map(p => P(tf.x + (p.x * fx) * c - p.y * s, tf.y + (p.x * fx) * s + p.y * c));
  }
  function inverseTransform(pt, tf) {
    const c = Math.cos(tf.rot || 0), s = Math.sin(tf.rot || 0);
    const dx = pt.x - tf.x, dy = pt.y - tf.y;
    const lx = dx * c + dy * s, ly = -dx * s + dy * c;
    return P(tf.flip ? -lx : lx, ly);
  }

  /** True when the pieces exactly tile the target (sampled, with tolerance). */
  function coversTarget(target, worldPieces, opts = {}) {
    const step = opts.step || 0.25;
    const bb = bbox(target);
    let total = 0, bad = 0;
    const ox = 0.1137, oy = 0.0913; // offsets keep samples off grid lines and diagonals
    for (let y = bb.minY - 1 + oy; y <= bb.maxY + 1; y += step) {
      for (let x = bb.minX - 1 + ox; x <= bb.maxX + 1; x += step) {
        const pt = P(x, y);
        const inT = pointInPoly(pt, target);
        let count = 0;
        for (const wp of worldPieces) if (pointInPoly(pt, wp)) count++;
        total++;
        if ((inT && count !== 1) || (!inT && count !== 0)) bad++;
      }
    }
    return { ok: bad / total <= (opts.tolerance ?? 0.02), bad, total };
  }

  /** Classify a clean polygon: 'triangle' | 'rectangle' | 'square' | 'other'. */
  function classify(pts) {
    const q = simplify(pts);
    if (q.length === 3) return 'triangle';
    if (q.length === 4) {
      const right = [];
      for (let i = 0; i < 4; i++) {
        const a = q[(i + 3) % 4], b = q[i], c = q[(i + 1) % 4];
        const v1 = P(a.x - b.x, a.y - b.y), v2 = P(c.x - b.x, c.y - b.y);
        const dot = v1.x * v2.x + v1.y * v2.y;
        right.push(Math.abs(dot) < 1e-6 * Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y) + 1e-9);
      }
      if (right.every(Boolean)) {
        const s1 = Math.hypot(q[1].x - q[0].x, q[1].y - q[0].y), s2 = Math.hypot(q[2].x - q[1].x, q[2].y - q[1].y);
        return Math.abs(s1 - s2) < 1e-6 ? 'square' : 'rectangle';
      }
    }
    return 'other';
  }

  /* ───────────────────────── 2. CANVAS HELPERS ─────────────────────── */
  function fitCanvas(canvas) {
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    if (canvas.width !== w * DPR || canvas.height !== h * DPR) { canvas.width = w * DPR; canvas.height = h * DPR; }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    return { ctx, w, h, DPR };
  }

  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────────── 3. BOARD ─────────────────────────────── */
  /**
   * Board — a world-unit grid on a canvas holding "pieces" that students can
   * drag, rotate, flip and slice.
   *
   *   const board = new SlicerCore.Board(canvas, {
   *     world: {minX:-1, minY:-1, maxX:11, maxY:8},  // world units shown
   *     target: [{x,y},...] | null,                   // dashed outline to fill
   *     onChange(board), onSolved(board), onCut(board, newPieces), onSelect(piece, board),
   *     draw(ctx, board, 'under'|'over')              // custom overlay hook
   *   });
   *   board.addPiece([{x,y},...], {color, label, locked});
   *   board.setMode('move' | 'cut');
   */
  class Board {
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.opts = Object.assign({
        world: { minX: -1, minY: -1, maxX: 11, maxY: 8 },
        grid: true, snap: true, snapDist: 0.35, rotateStep: Math.PI / 12,
        colors: ['#FF6B5B', '#2DD4BF', '#FBBF24', '#A78BFA', '#60A5FA', '#F472B6', '#4ADE80', '#FB923C'],
        gridColor: 'rgba(255,255,255,0.07)', gridMajor: 'rgba(255,255,255,0.14)',
        targetColor: 'rgba(255,255,255,0.55)', targetFill: 'rgba(255,255,255,0.04)',
        solvedColor: '#4ADE80', pieceStroke: 'rgba(255,255,255,0.8)',
        showAreas: false, showVertices: true, unitLabel: '',
        cutSnap: true, background: null, labelFont: '700 15px ui-rounded, "Fredoka", "Nunito", system-ui, sans-serif',
        onChange: null, onSolved: null, onCut: null, onSelect: null, draw: null,
      }, opts);
      this.pieces = [];
      this.target = this.opts.target || null;
      this.mode = 'move';
      this.selected = null;
      this.drag = null;
      this.cutLine = null;
      this.solved = false;
      this.hover = null;
      this.cuts = 0;
      this._colorIdx = 0;
      this._bind();
      this.resize();
      Board.all.push(this); // registry: handy for debugging from the console (SlicerCore.Board.all)
    }

    /* ---- coordinates ---- */
    resize() {
      const { ctx, w, h } = fitCanvas(this.canvas);
      this.ctx = ctx; this.w = w; this.h = h;
      const W = this.opts.world;
      this.scale = Math.min(w / (W.maxX - W.minX), h / (W.maxY - W.minY));
      this.offX = (w - (W.maxX - W.minX) * this.scale) / 2 - W.minX * this.scale;
      this.offY = (h - (W.maxY - W.minY) * this.scale) / 2 + W.maxY * this.scale;
      this.draw();
    }
    toScreen(p) { return P(this.offX + p.x * this.scale, this.offY - p.y * this.scale); }
    toWorld(sx, sy) { return P((sx - this.offX) / this.scale, (this.offY - sy) / this.scale); }
    worldPts(piece) { return transformPts(piece.pts, piece); }

    /* ---- pieces ---- */
    addPiece(worldPts, extra = {}) {
      const c = centroid(worldPts);
      const piece = Object.assign({
        pts: worldPts.map(p => P(p.x - c.x, p.y - c.y)),
        x: c.x, y: c.y, rot: 0, flip: false,
        color: this.opts.colors[this._colorIdx++ % this.opts.colors.length],
        label: '', locked: false, id: Math.random().toString(36).slice(2),
      }, extra);
      this.pieces.push(piece);
      this.draw();
      return piece;
    }
    removePiece(piece) { this.pieces = this.pieces.filter(p => p !== piece); if (this.selected === piece) this.selected = null; this._changed(); }
    /** Deep-copy the piece list (for undo). */
    snapshot() { return { cuts: this.cuts, pieces: this.pieces.map(pc => Object.assign({}, pc, { pts: pc.pts.map(p => P(p.x, p.y)) })) }; }
    restore(snap) { this.pieces = snap.pieces.map(pc => Object.assign({}, pc, { pts: pc.pts.map(p => P(p.x, p.y)) })); this.cuts = snap.cuts; this.selected = null; this._changed(); }
    /** Replace a piece's shape in place (world points), keeping its identity. */
    reshape(piece, worldPts) {
      const c = centroid(worldPts);
      piece.pts = worldPts.map(p => P(p.x - c.x, p.y - c.y));
      piece.x = c.x; piece.y = c.y; piece.rot = 0; piece.flip = false;
      this._changed();
    }
    clear() { this.pieces = []; this.selected = null; this.solved = false; this.cuts = 0; this._colorIdx = 0; this.draw(); }
    setTarget(pts) { this.target = pts; this.solved = false; this.draw(); }
    setMode(mode) {
      this.mode = mode; this.cutLine = null;
      this.canvas.style.cursor = mode === 'cut' ? 'crosshair' : 'grab';
      this.draw();
    }
    select(piece) { this.selected = piece; if (this.opts.onSelect) this.opts.onSelect(piece, this); this.draw(); }

    rotateSelected(dir = 1, step) {
      if (!this.selected || this.selected.locked) return;
      this.selected.rot += (step ?? this.opts.rotateStep) * dir;
      this._afterMove(this.selected);
    }
    flipSelected() {
      if (!this.selected || this.selected.locked) return;
      this.selected.flip = !this.selected.flip;
      this._afterMove(this.selected);
    }
    pieceAt(wpt) {
      for (let i = this.pieces.length - 1; i >= 0; i--) {
        const pc = this.pieces[i];
        if (pointInPoly(wpt, this.worldPts(pc))) return pc;
      }
      return null;
    }
    totalArea() { return this.pieces.reduce((s, pc) => s + area(pc.pts), 0); }

    /* ---- snapping ---- */
    _anchors(except) {
      const A = [];
      if (this.target) for (const p of this.target) A.push(p);
      for (const pc of this.pieces) if (pc !== except) for (const p of this.worldPts(pc)) A.push(p);
      return A;
    }
    snapPiece(piece) {
      if (!this.opts.snap || piece.locked) return;
      const st = this.opts.rotateStep;
      piece.rot = Math.round(piece.rot / st) * st;
      const wp = this.worldPts(piece);
      const anchors = this._anchors(piece);
      let best = null, bestD = this.opts.snapDist;
      for (const v of wp) {
        for (const a of anchors) {
          const d = Math.hypot(v.x - a.x, v.y - a.y);
          if (d < bestD) { bestD = d; best = P(a.x - v.x, a.y - v.y); }
        }
        const gx = Math.round(v.x), gy = Math.round(v.y);
        const dg = Math.hypot(v.x - gx, v.y - gy);
        if (dg < bestD * 0.75) { bestD = dg / 0.75; best = P(gx - v.x, gy - v.y); }
      }
      if (best) { piece.x += best.x; piece.y += best.y; }
    }

    /* ---- cutting ---- */
    cut(a, b) {
      const d = P(b.x - a.x, b.y - a.y);
      if (Math.hypot(d.x, d.y) < 1e-6) return [];
      const created = [], next = [];
      for (const pc of this.pieces) {
        if (pc.locked) { next.push(pc); continue; }
        const parts = splitByLine(this.worldPts(pc), a, d);
        if (parts.length <= 1) { next.push(pc); continue; }
        parts.forEach((part, i) => {
          const c = centroid(part);
          const np = Object.assign({}, pc, {
            pts: part.map(p => P(p.x - c.x, p.y - c.y)), x: c.x, y: c.y, rot: 0, flip: false,
            id: Math.random().toString(36).slice(2),
            color: i === 0 ? pc.color : this.opts.colors[this._colorIdx++ % this.opts.colors.length],
            label: typeof pc.label === 'function' ? pc.label : '', // computed labels survive a cut; text labels don't
          });
          next.push(np); created.push(np);
        });
      }
      if (!created.length) return [];
      this.pieces = next;
      this.selected = null;
      this.cuts++;
      if (this.opts.onCut) this.opts.onCut(this, created);
      this._changed();
      return created;
    }
    snapCutPoint(wpt) {
      if (!this.opts.cutSnap) return wpt;
      let best = wpt, bestD = 0.3;
      for (const a of this._anchors(null)) {
        const d = Math.hypot(a.x - wpt.x, a.y - wpt.y);
        if (d < bestD) { bestD = d; best = a; }
      }
      const g = P(Math.round(wpt.x), Math.round(wpt.y));
      if (Math.hypot(g.x - wpt.x, g.y - wpt.y) < bestD * 0.8) best = g;
      return best;
    }

    /* ---- solved check ---- */
    checkSolved() {
      if (!this.target) return false;
      const res = coversTarget(this.target, this.pieces.map(pc => this.worldPts(pc)));
      const was = this.solved;
      this.solved = res.ok;
      if (this.solved && !was && this.opts.onSolved) this.opts.onSolved(this);
      return this.solved;
    }
    _afterMove(piece) { this.snapPiece(piece); this._changed(); }
    _changed() { this.checkSolved(); if (this.opts.onChange) this.opts.onChange(this); this.draw(); }

    /* ---- events ---- */
    _bind() {
      const c = this.canvas;
      c.style.touchAction = 'none';
      c.addEventListener('pointerdown', e => this._down(e));
      c.addEventListener('pointermove', e => this._move(e));
      c.addEventListener('pointerup', e => this._up(e));
      c.addEventListener('pointercancel', e => this._up(e));
      c.addEventListener('pointerleave', () => { if (!this.drag) { this.hover = null; this.draw(); } });
      if (window.ResizeObserver) new ResizeObserver(() => this.resize()).observe(c);
      else window.addEventListener('resize', () => this.resize());
    }
    _evtWorld(e) {
      const r = this.canvas.getBoundingClientRect();
      return this.toWorld(e.clientX - r.left, e.clientY - r.top);
    }
    /* Custom draggable handles: opts.handles = () => [{x, y, color, onDrag(wpt), onUp()}] */
    _handleAt(w) {
      if (!this.opts.handles) return null;
      const s = this.toScreen(w);
      for (const h of this.opts.handles()) {
        const hs = this.toScreen(h);
        if (Math.hypot(hs.x - s.x, hs.y - s.y) <= 16) return h;
      }
      return null;
    }
    _drawHandles() {
      if (!this.opts.handles) return;
      const ctx = this.ctx;
      for (const h of this.opts.handles()) {
        const s = this.toScreen(h);
        ctx.save();
        ctx.shadowColor = h.color || '#fff'; ctx.shadowBlur = 12;
        ctx.fillStyle = h.color || '#fff';
        ctx.beginPath(); ctx.arc(s.x, s.y, this.handleDrag && this.handleDrag === h ? 11 : 9, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        ctx.lineWidth = 2.5; ctx.strokeStyle = '#fff';
        ctx.beginPath(); ctx.arc(s.x, s.y, 9, 0, Math.PI * 2); ctx.stroke();
      }
    }
    _down(e) {
      e.preventDefault();
      const w = this._evtWorld(e);
      try { this.canvas.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
      const hnd = this._handleAt(w);
      if (hnd) { this.handleDrag = hnd; this.canvas.style.cursor = 'grabbing'; this.draw(); return; }
      if (this.mode === 'cut') {
        const a = this.snapCutPoint(w);
        this.cutLine = { a, b: a };
        this.draw();
        return;
      }
      const pc = this.pieceAt(w);
      if (pc && !pc.locked) {
        this.pieces.splice(this.pieces.indexOf(pc), 1); this.pieces.push(pc);
        this.drag = { piece: pc, dx: pc.x - w.x, dy: pc.y - w.y };
        this.canvas.style.cursor = 'grabbing';
        this.select(pc);
      } else {
        this.select(null);
      }
    }
    _move(e) {
      const w = this._evtWorld(e);
      if (this.handleDrag) { this.handleDrag.onDrag(w, this); this.draw(); return; }
      if (this.mode === 'cut') {
        if (this.cutLine) { this.cutLine.b = this.snapCutPoint(w); this.draw(); }
        return;
      }
      if (this.drag) {
        const pc = this.drag.piece;
        pc.x = w.x + this.drag.dx; pc.y = w.y + this.drag.dy;
        if (this.opts.onChange) this.opts.onChange(this);
        this.draw();
      } else {
        const h = this.pieceAt(w);
        if (h !== this.hover) { this.hover = h; this.canvas.style.cursor = h && !h.locked ? 'grab' : 'default'; this.draw(); }
      }
    }
    _up() {
      if (this.handleDrag) {
        const h = this.handleDrag; this.handleDrag = null;
        this.canvas.style.cursor = 'grab';
        if (h.onUp) h.onUp(this);
        this._changed();
        return;
      }
      if (this.mode === 'cut') {
        if (this.cutLine) {
          const { a, b } = this.cutLine;
          this.cutLine = null;
          if (Math.hypot(b.x - a.x, b.y - a.y) > 0.2) this.cut(a, b); else this.draw();
        }
        return;
      }
      if (this.drag) {
        const pc = this.drag.piece; this.drag = null;
        this.canvas.style.cursor = 'grab';
        this._afterMove(pc);
      }
    }

    /* ---- drawing ---- */
    draw() {
      const ctx = this.ctx; if (!ctx) return;
      const { w, h, opts } = this;
      ctx.clearRect(0, 0, w, h);
      if (opts.background) { ctx.fillStyle = opts.background; ctx.fillRect(0, 0, w, h); }
      if (opts.grid) this._drawGrid();
      if (this.target) this._drawTarget();
      if (opts.draw) opts.draw(ctx, this, 'under');
      for (const pc of this.pieces) this._drawPiece(pc);
      if (this.cutLine) this._drawCutLine();
      if (opts.draw) opts.draw(ctx, this, 'over');
      this._drawHandles();
    }
    _drawGrid() {
      const ctx = this.ctx, W = this.opts.world;
      ctx.lineWidth = 1;
      for (let x = Math.ceil(W.minX); x <= W.maxX; x++) {
        const s = this.toScreen(P(x, 0));
        ctx.strokeStyle = x % 5 === 0 ? this.opts.gridMajor : this.opts.gridColor;
        ctx.beginPath(); ctx.moveTo(s.x, 0); ctx.lineTo(s.x, this.h); ctx.stroke();
      }
      for (let y = Math.ceil(W.minY); y <= W.maxY; y++) {
        const s = this.toScreen(P(0, y));
        ctx.strokeStyle = y % 5 === 0 ? this.opts.gridMajor : this.opts.gridColor;
        ctx.beginPath(); ctx.moveTo(0, s.y); ctx.lineTo(this.w, s.y); ctx.stroke();
      }
    }
    path(pts) {
      const ctx = this.ctx;
      ctx.beginPath();
      pts.forEach((p, i) => { const s = this.toScreen(p); i ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y); });
      ctx.closePath();
    }
    _drawTarget() {
      const ctx = this.ctx;
      this.path(this.target);
      ctx.fillStyle = this.solved ? 'rgba(74,222,128,0.10)' : this.opts.targetFill;
      ctx.fill();
      ctx.setLineDash(this.solved ? [] : [8, 6]);
      ctx.lineWidth = this.solved ? 3 : 2;
      ctx.strokeStyle = this.solved ? this.opts.solvedColor : this.opts.targetColor;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    _drawPiece(pc) {
      const ctx = this.ctx;
      const wp = this.worldPts(pc);
      const sel = pc === this.selected, hov = pc === this.hover;
      this.path(wp);
      ctx.save();
      if (sel || hov) { ctx.shadowColor = pc.color; ctx.shadowBlur = sel ? 26 : 14; }
      ctx.fillStyle = pc.color;
      ctx.globalAlpha = pc.locked ? 0.5 : (sel ? 0.95 : 0.85);
      ctx.fill();
      ctx.restore();
      ctx.lineWidth = sel ? 3 : 2;
      ctx.strokeStyle = sel ? '#fff' : this.opts.pieceStroke;
      ctx.lineJoin = 'round';
      this.path(wp); ctx.stroke();
      if (this.opts.showVertices) {
        for (const v of wp) {
          const s = this.toScreen(v);
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s.x, s.y, sel ? 4 : 2.5, 0, Math.PI * 2); ctx.fill();
        }
      }
      const txt = typeof pc.label === 'function' ? pc.label(pc) : (pc.label || (this.opts.showAreas ? fmt(area(pc.pts)) + (this.opts.unitLabel ? ' ' + this.opts.unitLabel : '') : ''));
      if (txt) {
        const c = this.toScreen(P(pc.x, pc.y));
        ctx.font = this.opts.labelFont;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const tw = ctx.measureText(txt).width + 14;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        roundRect(ctx, c.x - tw / 2, c.y - 12, tw, 24, 8); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillText(txt, c.x, c.y + 1);
      }
    }
    _drawCutLine() {
      const ctx = this.ctx, { a, b } = this.cutLine;
      const sa = this.toScreen(a), sb = this.toScreen(b);
      const dx = sb.x - sa.x, dy = sb.y - sa.y, L = Math.hypot(dx, dy) || 1;
      const ex = dx / L * 4000, ey = dy / L * 4000;
      ctx.save();
      ctx.setLineDash([10, 8]); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath(); ctx.moveTo(sa.x - ex, sa.y - ey); ctx.lineTo(sa.x + ex, sa.y + ey); ctx.stroke();
      ctx.setLineDash([]); ctx.lineWidth = 3; ctx.strokeStyle = '#fff';
      ctx.beginPath(); ctx.moveTo(sa.x, sa.y); ctx.lineTo(sb.x, sb.y); ctx.stroke();
      for (const s of [sa, sb]) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s.x, s.y, 5, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    /* Draw a dimension label between two world points (used by units). */
    dim(a, b, text, color = '#fff', offset = 0.45) {
      const ctx = this.ctx;
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1;
      const nx = -dy / L * offset, ny = dx / L * offset;
      const sa = this.toScreen(P(a.x + nx, a.y + ny)), sb = this.toScreen(P(b.x + nx, b.y + ny));
      ctx.save();
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(sa.x, sa.y); ctx.lineTo(sb.x, sb.y); ctx.stroke();
      const tickN = 6;
      for (const s of [sa, sb]) {
        ctx.beginPath(); ctx.moveTo(s.x - nx * 0 - (dy / L) * tickN, s.y - (dx / L) * tickN); ctx.lineTo(s.x + (dy / L) * tickN, s.y + (dx / L) * tickN); ctx.stroke();
      }
      const lm = this.toScreen(P(mx + nx * 1.9, my + ny * 1.9));
      ctx.font = this.opts.labelFont; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const tw = ctx.measureText(text).width + 12;
      ctx.fillStyle = 'rgba(0,0,0,0.55)'; roundRect(ctx, lm.x - tw / 2, lm.y - 11, tw, 22, 7); ctx.fill();
      ctx.fillStyle = color; ctx.fillText(text, lm.x, lm.y + 1);
      ctx.restore();
    }
  }

  Board.all = [];

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function fmt(n) { const r = Math.round(n * 100) / 100; return String(r); }

  /* ───────────────────────── 4. FEEDBACK ──────────────────────────── */
  let toastEl = null, toastTimer = null;
  function toast(msg, kind = 'info', ms = 2600) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'sc-toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.dataset.kind = kind;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }

  function confetti(opts = {}) {
    if (reduceMotion()) return;
    const c = document.createElement('canvas');
    Object.assign(c.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 });
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    const colors = opts.colors || ['#FF6B5B', '#2DD4BF', '#FBBF24', '#A78BFA', '#60A5FA', '#F472B6', '#4ADE80'];
    const N = opts.count || 140;
    const ox = opts.x ?? innerWidth / 2, oy = opts.y ?? innerHeight * 0.4;
    const parts = Array.from({ length: N }, () => {
      const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9;
      return { x: ox, y: oy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 6, r: 4 + Math.random() * 6,
        col: colors[(Math.random() * colors.length) | 0], rot: Math.random() * 6, vr: (Math.random() - .5) * .3, life: 1 };
    });
    let t0 = performance.now();
    (function frame(t) {
      const dt = Math.min(32, t - t0) / 16; t0 = t;
      ctx.clearRect(0, 0, c.width, c.height);
      let alive = 0;
      for (const p of parts) {
        p.vy += 0.35 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt; p.life -= 0.008 * dt;
        if (p.life <= 0) continue; alive++;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.col; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore();
      }
      if (alive) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }

  /* Tiny synth — no audio files. Silent until the first user gesture. */
  let actx = null;
  let soundOn = true;
  function tone(freq = 440, dur = 0.12, type = 'sine', vol = 0.14) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(vol, actx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(); o.stop(actx.currentTime + dur + 0.02);
    } catch (e) { /* audio is optional */ }
  }
  const sfx = {
    snip() { tone(1200, 0.06, 'square', 0.07); setTimeout(() => tone(900, 0.06, 'square', 0.07), 50); },
    snap() { tone(520, 0.08, 'triangle', 0.12); },
    win() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.18, 'triangle', 0.14), i * 110)); },
    nope() { tone(220, 0.16, 'sawtooth', 0.07); },
    click() { tone(700, 0.05, 'sine', 0.09); },
    setEnabled(v) { soundOn = !!v; },
    get enabled() { return soundOn; },
  };

  /* Wire a sound-toggle button (🔊/🔇) if the page has one. */
  function bindSoundToggle(btn) {
    if (!btn) return;
    btn.addEventListener('click', () => {
      sfx.setEnabled(!sfx.enabled);
      btn.textContent = sfx.enabled ? '🔊' : '🔇';
      btn.setAttribute('aria-label', sfx.enabled ? 'Turn sound off' : 'Turn sound on');
      if (sfx.enabled) sfx.click();
    });
  }

  return {
    P, signedArea, area, centroid, bbox, ccw, simplify, pointInPoly, distPointSeg, splitByLine,
    transformPts, inverseTransform, coversTarget, classify, fitCanvas, reduceMotion, Board, roundRect, fmt,
    toast, confetti, tone, sfx, bindSoundToggle,
  };
})();
