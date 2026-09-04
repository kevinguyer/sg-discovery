# REDS Hall of Discovery

A click-through science and math museum for Mrs. Guyer's classes at Redeemer Episcopal Day School.
Every exhibit is a set of self-contained, interactive HTML pages. No build step, no server, no accounts.

## Open it

Double-click `index.html`, or serve the folder with any static server:

```bash
python -m http.server 8765
```

then visit <http://localhost:8765/>.

The whole site also works straight from a USB drive or a shared folder (`file://`).

## What's inside

| Exhibit | Folder | Status |
|---|---|---|
| Investigating Waves | `projects/investigating-waves/` | Open · 5 units |
| Shape Explorer | `projects/shape-explorer/` | Open · single-page, tabbed |
| Shape Slicer | `projects/shape-slicer/` | Open · 5 units, grades 5–6 |
| Cosmos, Earth, Life, Matter | — | Placeholders on the hub |

## Working on it with Claude Code

`CLAUDE.md` in this folder is the architecture guide: file layout, design conventions,
how each exhibit type is structured, and a checklist for adding a new exhibit or unit.
Read it first on a new machine. `projects/shape-slicer/README.md` documents the shared
geometry engine that exhibit uses.

## Publishing (optional)

The site is plain static files, so GitHub Pages works with no configuration:
Settings → Pages → "Deploy from a branch" → `main` / root.
