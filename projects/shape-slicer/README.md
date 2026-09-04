# Shape Slicer — engine notes

Exhibit 03 of the REDS Hall of Discovery. Five units that teach area by cutting shapes apart and
rebuilding them. This file documents the shared engine so new units can be built quickly.

## Units

| # | File | Identity | Labs |
|---|---|---|---|
| 01 | `units/slice-and-slide.html` | kitchen cutting board, gingham | Shear Machine (parallelogram → rectangle), Height Hunt, Area Kitchen |
| 02 | `units/triangle-twins.html` | hall of mirrors, icy indigo | Twin Maker (triangle + 180° twin), Half-Height Fold, Which Base? |
| 03 | `units/flip-and-fit.html` | desert dusk, kites | Trapezoid Double, Midline Flip, Kite Cutter (needs Flip for a true kite) |
| 04 | `units/slicing-table.html` | blueprint workshop | Free Table sandbox, Challenge Board (7 dissection puzzles with cut records) |
| 05 | `units/area-detective.html` | film-noir case files | Case Board (6 composite shapes), Add-or-Subtract desk, Detective Exam |

## `shared/slicer-core.js` → `window.SlicerCore`

Coordinates are **world units** (grid squares) with **y up**, like a math graph. The board maps them
to the canvas.

### Polygon math
- `P(x, y)` point constructor.
- `area(pts)`, `signedArea(pts)`, `centroid(pts)`, `bbox(pts)`, `ccw(pts)`.
- `simplify(pts, tol)` merges near-duplicate vertices and drops collinear ones.
- `pointInPoly(pt, pts)`, `distPointSeg(pt, a, b)`.
- `splitByLine(pts, p, d)` → array of polygons. Splits a simple (possibly concave) polygon by the
  infinite line through `p` with direction `d`. Handles cuts through vertices and along edges
  (returns `[pts]` unchanged if the line misses or merely grazes). Crossings are projected back onto the
  exact line and snapped to original vertices, so grid-aligned cuts stay exact.
- `transformPts(pts, {x, y, rot, flip})` / `inverseTransform(pt, tf)`.
- `coversTarget(target, worldPieces, {step, tolerance})` → `{ok, bad, total}`. Samples points on an
  offset grid; ok when every sample inside the target is covered by exactly one piece and no sample
  outside is covered. Tolerance 2% absorbs edge noise.
- `classify(pts)` → `'triangle' | 'rectangle' | 'square' | 'other'`.

### `new Board(canvas, opts)`
A grid on a canvas holding pieces students drag, rotate, flip, and slice.

```js
const board = new SlicerCore.Board(canvas, {
  world: {minX, minY, maxX, maxY},   // world units shown (centered, aspect preserved)
  target: [P,...] | null,            // dashed outline; turns green when tiled exactly
  rotateStep: Math.PI/2,             // rotation quantum (buttons + snap)
  snap: true, snapDist: 0.35,        // vertex-to-vertex / grid snapping on drop
  cutSnap: true,                     // cut endpoints snap to corners and grid points
  showAreas: false, unitLabel: '',   // auto area labels on pieces
  colors: [...], gridColor, gridMajor, targetColor, pieceStroke, labelFont, background,
  handles: () => [{x, y, color, onDrag(wpt, board), onUp(board)}],  // custom draggable dots
  draw(ctx, board, 'under' | 'over'), // overlay hook (dimension lines, guides)
  onChange(board), onSolved(board), onCut(board, newPieces), onSelect(piece, board),
});
board.addPiece(worldPts, {color, label, locked});  // label may be a string or fn(piece) → string
board.setMode('cut' | 'move');
board.rotateSelected(dir, step?); board.flipSelected();
board.cut(a, b);                     // programmatic cut along the line through a and b
board.snapshot() / board.restore(snap);   // undo support
board.reshape(piece, worldPts);      // change a piece's shape in place
board.worldPts(piece); board.totalArea(); board.pieces; board.cuts; board.solved;
board.dim(a, b, text, color, offset) // draw a dimension line (call inside draw 'over')
SlicerCore.Board.all                 // registry of every board on the page (handy in the console)
```

Pieces are `{pts (local, centroid at origin), x, y, rot, flip, color, label, locked, id}`.
Locked pieces can't be moved or cut. Function labels survive cuts; string labels are cleared.

### Feedback
- `toast(msg, kind = 'info' | 'good' | 'bad' | 'hint', ms)` — styled by `shared/slicer.css`.
- `confetti({colors, count, x, y})` — respects reduced motion.
- `sfx.snip() / snap() / win() / nope() / click()`, `sfx.setEnabled(bool)`, `bindSoundToggle(btn)`.
- `fitCanvas(canvas)` → `{ctx, w, h, DPR}` and `reduceMotion()`.

## `shared/slicer.css`
Toast, `.board-wrap` / `canvas.board`, `.board-tools` + `.tool-btn`, `.readouts` / `.readout`,
`.answer-row`, `.feedback`, `.challenge-list` / `.challenge-chip`, `.stamp`. Each unit sets
`--sc-accent`, `--sc-accent-2`, `--sc-ink`, `--sc-panel`, `--sc-line` in its `:root` so these
components pick up the unit's palette.

## Recipes

**Prove-a-formula lab** (Units 01–03): a locked piece + a `handles` dot to reshape it, a "make a twin"
button that adds a movable copy, a `target` outline for the rebuilt shape, and `onSolved` that
fills in the readouts and fires confetti.

**Cut-and-rearrange lab** (Units 02–05): start in `cut` mode with an optional guide line drawn in the
`draw('under')` hook; a mode toggle (Cut / Move); rotate/flip buttons that require a selection;
an undo stack of `snapshot()`s pushed on every `pointerdown` in cut mode and before every rotate/flip.

**Rules-based labelling** (Unit 05): `label: pc => describe(board.worldPts(pc)).text` where
`describe` uses `classify()` to allow only rectangles, squares, and triangles.

## Gotchas
- A true kite's right-hand triangles are mirror images of the left-hand ones, so the Kite Cutter
  needs the Flip button; a rhombus does not. That's intentional and the page says so.
- The super-slanted parallelogram (Challenge 7) cannot be fixed with one vertical cut; the record is 3.
- Browsers cache `slicer-core.js`; hard-reload after editing it.
