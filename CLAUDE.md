# CLAUDE.md — REDS Hall of Discovery

Guide for anyone (human or Claude) picking this project up on a fresh machine.
It records the architecture, the design language, and the conventions each exhibit follows,
so a new session can add an exhibit or a unit that feels like it belongs.

## 1. What this is

A static-HTML "museum" of interactive science and math labs for Mrs. Guyer's 5th/6th grade classes
(Redeemer Episcopal Day School, "REDS"). It must open from `file://` on a school laptop with no
internet, so:

- No build step, no bundler, no framework, no npm.
- No network requests on unit pages. (Shape Explorer loads Google Fonts; it degrades gracefully.)
- Everything a page needs is inline, except the Shape Slicer engine (see §4), which is a plain
  `<script src>` sibling file and still works from `file://`.
- Nothing is persisted. No localStorage, no accounts, no progress tracking. Every page is a fresh sandbox.

## 2. Layout

```
index.html                         the hub: one WING per discipline (Science, Math, Social Studies, Language Arts), cards inside
docs/                              planning documents that travel with the repo (PRDs, decisions)
projects/
  investigating-waves/             Science wing
    index.html                     exhibit landing page (hero + unit cards)
    units/*.html                   one page per unit
  shape-explorer/                  Math wing
    index.html                     single-page exhibit with a sticky tab bar (no units folder)
  shape-slicer/                    Math wing
    index.html                     exhibit landing page
    units/*.html                   five units
    shared/slicer-core.js          geometry + draggable/sliceable board engine (window.SlicerCore)
    shared/slicer.css              toast, tool buttons, readouts, answer rows
    README.md                      engine API + unit anatomy
  virginia-explorer/               Social Studies wing (Chapter 1 open; see docs/PRD-virginia-explorer.md)
    index.html                     landing: hero map, chapter cards by era, teacher panel
    explore.html                   index of every node: Places / People / Events tabs + Standards table
    chapters/*.html                one page per chapter (lay-of-the-land.html = Chapter 1)
    content/*.js                   content nodes, one file per topic (geography.js …); VA.add([...])
    shared/va-map.js               GENERATED map data (window.VA_MAP) — never hand-edit
    shared/va-core.js              engine: content registry, mountMap, cards, index, quiz, feedback (window.VA)
    shared/va.css                  map styling, atlas layout, cards, quiz, toast
    assets/img/ + assets/CREDITS.md  public-domain images with a credit row each
    map-preview.html               plain review page for the generated map
    tools/build-map.py             regenerates va-map.js from public-domain GIS data
    tools/SOURCES.md               where the data comes from and how to re-run the build
.claude/launch.json                `python -m http.server 8765` for the Claude Code browser preview
expansionResources/                local-only planning material (gitignored; private transcript + source docs)
```

Three exhibit shapes exist:
- **Multi-unit lab** (waves, slicer): landing page + `units/`, one page per lesson. Use when the topic has 3+ distinct lessons.
- **Single-page tabbed lab** (shape-explorer): one page, sticky tab bar. Use for a compact topic.
- **Reference atlas** (virginia-explorer): a map is the spine; content is *data* (`content/*.js` assigning globals,
  because `fetch()` of JSON fails on `file://`), rendered into detail cards reachable from the map *or* from
  index pages (people / places / events / timeline). Images live in `assets/img/` with `assets/CREDITS.md`
  (public domain only, ≤ 200 KB, ≤ 1200 px). Every content node carries the standard IDs it serves.

## 3. Links, names, and hub registration

- Hub → exhibit: `projects/<slug>/index.html`
- Exhibit index → unit: `units/<unit-slug>.html`
- Unit → exhibit index: `<a class="back" href="../index.html">All units</a>`
- Exhibit index → hub: `<a class="back" href="../../index.html">Hall of Discovery</a>`
- Unit → next unit: the "next up" card links to the next unit *and* back to `../index.html`.
  (Waves units only link back; Shape Slicer added the forward link. Prefer the forward link.)
- Page titles: `Unit Name · Exhibit Name · REDS Hall of Discovery`.

To register a new exhibit on the hub (`index.html`):
1. Add a `.card.<slug>{ background: linear-gradient(145deg, …) }` rule near the other card themes.
2. Put the card inside the right **wing** (`#wing-science`, `#wing-math`, `#wing-social`, `#wing-language`),
   as an `<a class="card <slug>" href="projects/<slug>/index.html">` (or a `<div class="card … soon">`
   placeholder with an `onclick` alert while it is unbuilt). Keep the `.badge` ("Wing · Open" / "Wing · Coming soon"),
   `.bg-mark` emoji, `.kicker`, `h4`, `p`, `.units-line`, and `.foot` structure.
3. Update the wing header's count line ("2 exhibits open"). The grid inside each wing is a plain 3-column grid.
4. A new discipline = a new `.wing` block plus a link in the `.wing-nav` strip.

**Branding rule (decided 2026-09-06):** the whole Hall is branded for Redeemer Episcopal Day School.
No page names a teacher or a grade in its branding. Grade ranges belong in wing tags, exhibit cards, and
teacher panels. Footers read "Made with ♥ for the students of Redeemer Episcopal Day School".

## 4. Design language

**Shared DNA (keep):**
- Dark, saturated, playful. Text color `--cream: #FFF8E7`. Rounded everything. Emoji as icons.
- Font stacks (copy verbatim, no webfonts on unit pages):
  `--font-display: ui-rounded, 'Arial Rounded MT Bold', 'Baloo 2', 'Fredoka', system-ui, sans-serif`
  `--font-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
  `--font-mono: ui-monospace, 'Cascadia Mono', Menlo, Consolas, monospace`
- Sticky, blurred `header.topbar` with back link · 64-viewBox rounded-square logo SVG recolored per unit ·
  eyebrow "REDS Hall of Discovery" · wordmark `Exhibit <span class="unit">· Unit 0N · Topic</span>` ·
  a `.class-pill` on the right.
- Full-bleed `section.hero` with a `<canvas id="hero-canvas">` animation behind the title and a `.scroll-cue`.
- Body rhythm: `section.concept` (kicker → `h2.title` with an `<em>` accent word → `p.blurb`) →
  `section.lab` blocks → `section.facts` ("Six wild ___ facts", 3-column grid) → `section.nextup` → `footer`.
- Each lab lives in a `.panel` with a `.panel-top` (blinking dot + name on the left, usage hint on the right)
  and a `.panel-body`, usually a `.lab-grid` of stage + `.controls`.
- Tone: second person, imperative, warm, one emoji per paragraph, sentences under ~20 words,
  vocabulary in `<strong>`, misconceptions called out explicitly ("the height is NOT the slanted side").
- Sound is a tiny Web Audio synth, capped around 0.12–0.16 gain, with a fixed 🔊/🔇 toggle.
- `@media (prefers-reduced-motion: reduce)` stops CSS animations; Shape Slicer also gates its
  requestAnimationFrame loops with `SlicerCore.reduceMotion()`.

**Per-unit identity (change every time):** each unit is a full re-skin. Its own `:root` tokens,
its own body gradient washes, its own logo gradient, its own hero canvas motif, and ideally one
page-wide motif (Codes & Signals: CRT scanlines + mono type; Slice & Slide: gingham overlay;
Triangle Twins: vertical mirror glint; Flip & Fit: dusk sky + dunes; Slicing Table: blueprint grid
paper + mono kickers; Area Detective: venetian-blind stripes + manila "case file" panels).
The goal the owner set: **a unique experience for each module, not a template with the colors swapped.**

Existing palettes, for reference (primary hex):
waves `#00B4D8` · shapes `#FF6B5B/#2DD4BF/#A78BFA` · slicer `#FF6B35/#C6FF4D/#FFD23F` ·
slicer units: 01 `#FF4D3D` tomato/`#FFE08A` butter · 02 `#5AB8FF` sky/`#7CF5D9` mint ·
03 `#FFB347` sun/`#FF5E8A` rose · 04 `#FFD400` safety/`#6EE7FF` cyan · 05 `#F5B700` amber/`#E9D8A6` manila.

## 5. Code conventions

- One inline `<script>` per page. Banner comments `/* ===== LAB 1 — NAME ===== */`. One IIFE per lab
  (or per hero) so state doesn't leak between labs.
- Canvas for anything animated or draggable; DPR capped at 2. Shape Explorer is the exception and uses
  live SVG with `viewBox="-100 -100 200 200"`.
- Pointer Events (`pointerdown/move/up` + `setPointerCapture`) so mouse and touch behave the same.
  Set `touch-action: none` on interactive canvases.
- Helper duplication across units is accepted in waves/shape-explorer. Shape Slicer instead shares
  `shared/slicer-core.js`; if you add a math exhibit that needs polygon cutting, reuse it rather than
  copying it.
- Quiz/answer patterns: always show the explanation whether right or wrong; celebrate with
  `confetti()` + a chime; shake the input on a wrong answer; keep a round/score/streak readout.

## 6. Adding a unit to Shape Slicer (checklist)

1. Copy the closest existing unit page in `projects/shape-slicer/units/` and give it a new palette,
   hero canvas, logo gradient, and page motif. Update `<title>`, the wordmark `.unit` text, the
   next-up card, and the footer line.
2. Labs use `SlicerCore.Board` (see `projects/shape-slicer/README.md`). Typical trio per unit:
   one guided "prove the formula" board, one cut-and-rearrange board, one quick-check quiz.
3. Add a unit card to `projects/shape-slicer/index.html` (the grid centers a 4th card via
   `:nth-child(4)`; revisit that rule if the unit count changes) and update the "5 units" copy on the hub card.
4. Point the previous unit's next-up card at the new page.

## 7. Testing locally

- The Claude Code browser preview: `preview_start` with the `static-site` launch config, then open
  `http://localhost:8765/projects/...`. The preview pane is often hidden, which throttles
  `requestAnimationFrame`; test labs through `SlicerCore.Board.all[n]` from the JS console rather than
  by waiting on animations. Browsers cache `slicer-core.js`; hard-reload after editing it.
- Geometry engine unit tests: a small Node harness (`splitByLine`, `coversTarget`, `classify`, fuzzing)
  lived in the session scratchpad when the engine was written. If you change `splitByLine`, re-create a
  quick fuzz (random convex polygons × random lines, assert piece areas sum to the original).

## 8. Owner context

- Built by Kevin Guyer for Sandra Guyer's school (Redeemer Episcopal Day School). Several teachers across
  grades 4–6 use it, which is why branding is school-level, not teacher-level.
- Standards: Shape Slicer targets 6.G.A.1 and 5.G.B.3–4. Virginia Explorer targets the 2023 Virginia
  Studies SOL (VS.1–VS.13); the PRD and Sandra's decisions are in `docs/PRD-virginia-explorer.md`.
- Virginia Explorer's map is generated, not drawn: `python projects/virginia-explorer/tools/build-map.py <gis-folder>`
  with the datasets listed in `tools/SOURCES.md` (all public domain; downloads work from a normal network).
- The owner works across multiple machines with no shared Claude memory; keep this file current when
  architecture or conventions change.
