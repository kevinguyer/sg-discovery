# PRD — Virginia Explorer & the Hall of Discovery expansion

| | |
|---|---|
| **Status** | v2 — Sandra's decisions incorporated (see §9) |
| **Date** | 2026-09-06 |
| **Author** | Kevin Guyer, with Claude Code |
| **Sources** | Planning transcript (Kevin & Sandra); *2023 History & Social Science SOL — Grade 4: Virginia Studies* (VDOE, final 09.11.24); *USI with Virginia Touchstones* course outline |
| **Repo** | https://github.com/kevinguyer/sg-discovery |

---

## 1. Summary

The REDS Hall of Discovery currently has three open exhibits, all science or math, all "labs" where a
student does something with a simulation. Sandra wants to add a **Social Studies wing**, starting with a
**Virginia Studies** exhibit for grades 4–5 named **Virginia Explorer** (Sandra's pick; "The Story of Virginia" was the working title).

This requires two kinds of work:

1. **Platform changes** so the hub and the shared conventions support multiple disciplines ("columns of
   knowledge"), school-level branding, and a new kind of exhibit that is a *map-driven reference* rather
   than a lab.
2. **A new exhibit** that covers every Virginia Studies standard (VS.1–VS.13), is organized around an
   interactive map of Virginia, lets students reach the same content from the map *or* from lists of people,
   places, and events, includes photographs, adds enrichment beyond the standards, and offers quizzing
   only for the geography content.

Everything must keep working from `file://` with no internet, because that is how the school laptops use it.

---

## 2. Goals and non-goals

### Goals
- G1. Cover 100% of VS.1–VS.13 (and exercise the VS skills standard) in an experience aimed at capable
  4th–5th graders, leaning 5th.
- G2. Make the map of Virginia the spine of the exhibit: regions, rivers, bordering states, and the
  Eastern Shore first; then history layered onto the same map.
- G3. Provide two access vectors to identical content: **the map** (click a region or pin) and **the index**
  (browse people / places / events / eras, then jump to the pin). Choosing one always lights up the other.
- G4. Include images (photos, portraits, artifacts) for the places and people students should recognize.
- G5. Enrich beyond the standards where it makes the story more concrete (see §6.5).
- G6. Offer self-check quizzes for geography only: regions, rivers, bordering states, and the locations of
  the Indigenous language groups.
- G7. Brand the **whole Hall** for the school (REDS), not for a teacher or a grade, so multiple 4th and 5th
  grade teachers can use it. (Decided: site-wide.)
- G8. Restructure the hub so science, math, social studies (and future disciplines such as language
  arts) are equally easy to find.

### Non-goals (this phase)
- No graded assessment or reporting; assessment happens outside the tool.
- No accounts, logins, progress saving, or teacher dashboards.
- No county-by-county or town-by-town geography (Chesterfield County is the one deliberate callout).
- No US History I (USI) content beyond what overlaps with VS. USI is a later exhibit; see §8.
- No language-arts / grammar content yet (Sandra mentioned it as a possible later wing).

---

## 3. Users

| User | Needs |
|---|---|
| 4th–5th grade students (competent readers, mixed) | Explore freely, find things fast, see pictures, not get lost. Reading level ~4th–5th grade. |
| 4th and 5th grade teachers (several) | Project it in class, point students to a chapter, trust that every VS standard is covered, find content by standard number. |
| Kevin / future Claude sessions | Add or edit content without re-authoring pages; keep the family design conventions. |

---

## 4. Platform changes (base-level work)

These changes affect the whole site and should land before or alongside the new exhibit.

### 4.1 Hub navigation by discipline
The hub (`index.html`) is a flat grid of seven exhibit cards. Change it to **wings**:

- Wing headers: **Science**, **Math**, **Social Studies**, with room for **Language Arts** later.
- Each wing is a labelled section of cards (open exhibits first, then "coming soon" placeholders).
- Cards carry a small discipline badge and, where useful, a grade range ("Grades 4–5").
- Add a compact "jump to wing" strip under the hero so the front navigation stays one screen deep.
- Keep the cosmic backdrop and card style; the change is grouping and labelling, not a redesign.

### 4.2 School-level branding
Today the hub says "Mrs. Guyer's 5th Grade Class" and footers say "Made with ♥ for Mrs. Guyer's
classes." Sandra decided the **whole Hall** is branded for **Redeemer Episcopal Day School**, not a teacher or a grade:

- Hub pill and footers → "Redeemer Episcopal Day School" / "REDS Hall of Discovery."
- Exhibit and unit footers → "Built for REDS students" (or similar).
- Grade guidance moves into each exhibit's card and teacher panel ("Grades 4–5") instead of the brand.

*Decided 2026-09-06:* site-wide rebrand, now.

### 4.3 A third exhibit shape: the reference atlas
The site has two exhibit shapes (multi-unit labs, single-page tabbed labs). Virginia Explorer is a
**map-driven reference**: browse, look up, cross-link, read, see pictures, with light quizzing. This
needs conventions the labs never needed:

- **Content as data, not markup.** People, places, events, regions, and rivers live in a content module
  (`content/*.js` files that assign globals; `fetch()` of JSON fails on `file://` in Chrome, so plain
  script files are the rule). Pages render from that data. This is what makes the map-vs-index dual
  access possible without duplicating content.
- **Assets folder with attribution.** `assets/img/` per exhibit plus an `assets/CREDITS.md` listing source
  and license for every image. Images are **public domain** (decided): Library of Congress, National Park Service, National Archives,
  Wikimedia Commons public-domain files, Library of Virginia where PD. Target ≤ 200 KB per
  image, ≤ 1200 px wide, so the whole exhibit stays portable on a USB drive.
- **Standards tagging.** Every content node carries the standard IDs it serves (`VS.1b`, `VS.7e`, …).
  This powers a teacher-facing "Standards index" page and lets the same nodes be re-tagged for USI later.
- **Cross-linking model.** Every node has a stable id and optional links: place ↔ region, person ↔ places,
  event ↔ era ↔ places. The map, the index, and the timeline are three views of one graph.
- **Accessibility floor rises.** Images need alt text; map regions and pins must be keyboard reachable;
  text contrast must pass on photos.

Document this shape in `CLAUDE.md` §2 and §4 when it lands.

### 4.4 Shared "teacher panel" component
Shape Slicer added a "For teachers" strip on its landing page. Standardize it: standards covered,
grade range, suggested sequence, and a link to the standards index. Add it to every exhibit landing page.

### 4.5 Housekeeping
- Update `CLAUDE.md` with the wing model, the atlas shape, the content-module and assets conventions, and
  the branding rule.
- Add a `docs/` folder (this PRD is the first file) for planning documents that should travel with the repo.
- `expansionResources/` (the planning transcript and source documents) stays local and is listed in
  `.gitignore`; it is not part of the site or the public repo.

---

## 5. Virginia Explorer — experience design

### 5.1 Identity
- **Name:** **Virginia Explorer** (decided).
- **Branding:** REDS Hall of Discovery · Redeemer Episcopal Day School. No teacher, no grade.
- **Aesthetic:** era-appropriate, never anachronistic. The geography chapter uses a clean modern map. History
  chapters borrow the visual language of their period: Indigenous Virginia (natural materials, river and
  forest palette), colonial Jamestown (hand-drawn map and manuscript tones), Revolution (broadsides, quills,
  the Virginia Declaration of Rights), Civil War (tintype, telegraph, campaign maps), Reconstruction and
  industry (rails, brick, newsprint), 1900–present (photographs, newsreel, modern Virginia). Each chapter is
  a distinct experience, as with every other exhibit in the Hall.
- **Hub card:** Social Studies wing, "Exhibit 04 · Open," suggested gradient in Virginia colors (deep blue,
  cardinal red, dogwood white, Blue Ridge green).

### 5.2 The map is the spine
One SVG map of Virginia (simplified outline, five regions as separate polygons, major rivers, Chesapeake
Bay, the Eastern Shore, bordering states as labelled neighbors, a Chesterfield County marker) is shared by
every chapter. Chapters add **layers** to the same map:

| Layer | Used by |
|---|---|
| Regions (Coastal Plain/Tidewater, Piedmont, Blue Ridge Mountains, Valley and Ridge, Appalachian Plateau) | Geography, Indigenous nations, industry |
| Water (James, York, Rappahannock, Potomac, Chesapeake Bay, Atlantic, Lake Drummond/Dismal Swamp, the Fall Line) | Geography, Jamestown, Civil War, industry |
| Bordering states (MD, WV, KY, TN, NC) and the Eastern Shore | Geography quiz |
| Indigenous language groups (Algonquian, Siouan, Iroquoian) and sites (Werowocomoco, Cactus Hill) | First Peoples |
| Pins: places and events by era (Jamestown, Williamsburg, Richmond, Yorktown, Fort Monroe/Old Point Comfort, Harpers Ferry, Manassas, Fredericksburg, Appomattox, Farmville/Moton, …) | Every history chapter |
| Capitals over time (Jamestown → Williamsburg → Richmond) | Colony, Revolution |
| West Virginia split (1863) | Civil War |
| People home markers (birthplaces and estates: Mount Vernon, Monticello, Montpelier, Red Hill, Gunston Hall, Berkeley, Sherwood Forest, Staunton …) | People index, Mother of Presidents |

Interactions: hover a region to highlight and name it; click to open its panel; pins cluster by era with an
era slider; the same pin opens the same detail card whether reached from the map or from a list.

### 5.3 Two ways in (the dual-vector requirement)
- **Map first:** click a region or pin → detail card → related people/events → "show on map" already lit.
- **Index first:** browse **People**, **Places**, **Events**, **Timeline** (or search by name) → detail card →
  the map pans/highlights the matching region or pin.
- Detail cards are the single source of truth: title, one-line "why it matters," 2–4 short paragraphs at a
  4th–5th grade level, an image with caption and credit, standards tags (shown in the teacher view only),
  and links to related nodes.

### 5.4 Chapters (units)
Chapters follow the chronological order of the standards. Each is a page with the shared map plus
chapter-specific layers, cards, and one or two small interactive moments. Estimated counts are for
planning, not commitments.

| # | Chapter (working name) | Standards | Map layer(s) | Interactive moments | Quiz |
|---|---|---|---|---|---|
| 1 | **The Lay of the Land** | VS.1a–c | Regions, water, neighbors, Eastern Shore, Chesterfield County | Drag-and-drop region labels; "follow the river" animations to the Bay; region cards with topography + products/industries; Fall Line reveal | **Yes** — regions, rivers, bordering states |
| 2 | **First Peoples** | VS.2a–e | Language-group areas; Werowocomoco, Cactus Hill; present-day tribes | Artifact dig (reveal an artifact, learn what archaeologists infer); c.1600 seasonal life by region; then-and-now for recognized tribes | **Yes** — locate the three language groups |
| 3 | **Jamestown** | VS.3a–g | Jamestown, the James River, Powhatan's Werowocomoco | 1606 charter and "why here?" site-choice explorer; hardship timeline 1607–1619; tobacco and land; 1619 General Assembly and the arrival of Africans and women | No |
| 4 | **Life in the Colony** | VS.4a–f | Williamsburg, plantations, ports | Who lived here (Indigenous, English, Scots-Irish, German, African) map; indentured vs enslaved comparison; the laws that created race-based enslavement (age-appropriate, factual); why the capital moved to Williamsburg; goods-and-services exchange | No |
| 5 | **Virginia Declares** | VS.5a–d, VS.6a–c | Yorktown, Richmond, Williamsburg; homes of Washington, Jefferson, Mason, Madison, Henry | Declaration principles explorer; Virginians at war (incl. James Armistead Lafayette, women, Indigenous people, free and enslaved Blacks); Virginia documents → U.S. documents "inspiration lines"; why the capital moved to Richmond; Yorktown | No |
| 6 | **A Growing Nation** | VS.6a, VS.6d–e | Westward routes (Cumberland Gap, Wilderness Road), Southampton County | Father of Our Country / Father of the Constitution / "Give me liberty" cards; geography + technology of moving west; Nat Turner's Rebellion causes and effects | No |
| 7 | **A House Divided** | VS.7a–g | Harpers Ferry, Manassas, Fredericksburg, Chancellorsville, Petersburg, Richmond, Appomattox; West Virginia split | John Brown's raid; slavery as cause + secondary factors; Underground Railroad and Harriet Tubman; secession and West Virginia; battle map; leaders (Jackson, Lee, Carney, Scott, Beaty); Van Lew and Bowser | No |
| 8 | **Rebuilding and Rails** | VS.8a–f, VS.9a–b | Railroads, growing cities (Richmond, Norfolk, Roanoke), Freedmen's schools | 13th/14th/15th Amendments explainer; Reconstruction effects; Langston to Congress 1890; *Plessy v. Ferguson* and Jim Crow (clear, factual); rail and industry growth; rural → urban | No |
| 9 | **Virginia in the World** | VS.10a–b, VS.11a–b | Military installations, Farmville (Moton), Richmond (Maggie Walker), Hampton | WWI/WWII preparation and contributions; Medal of Honor recipients; disenfranchisement, Massive Resistance, *Brown v. Board* (Barbara Johns, Davis v. Prince Edward); Civil Rights Virginians cards (Walker, Moton, Johns, Tucker, Hill, Morgan, Ashe, Holton, Wilder) | No |
| 10 | **Mother of Presidents** | VS.12 | Birthplaces and homes of all eight | Enrichment centerpiece (see §6.5): all eight presidents, where they were born, their homes, their region | No |
| 11 | **Virginia Today** | VS.13a–b | Products and industries by region; ports, tech corridor, agriculture, tourism, federal government | Region → industry match; innovations by Virginians; global connections | No |

Cross-cutting pages: **People**, **Places**, **Events**, **Timeline**, **Standards index** (teacher view).

*Chapter count, decided:* keep all eleven. Chapters 1–7 (pre–Civil War) carry the most weight for this
course; Chapters 8–11 stay as available reference because they feed the following US History II course.
More information than the VS/USI course needs is fine.

### 5.5 Quizzing (geography only)
Confirmed: quizzes for regions, rivers, bordering states, and Indigenous language-group locations. (States and
their capitals are a separate, later tool.) Format
follows the family's existing quiz pattern: click-the-map or drag-the-label, immediate feedback, always show
the explanation, streaks and confetti, no saving. Optional "practice mode" (labels visible) and "test yourself"
(labels hidden). No quizzes elsewhere in the exhibit.

### 5.6 Images
Every place and person card should have at least one image. Priorities: the Virginia State Capitol,
Jamestown (fort reconstruction, the church tower), Williamsburg (Capitol, Governor's Palace), Mount Vernon,
Monticello, Montpelier, Yorktown, Fort Monroe, Werowocomoco (site), Harpers Ferry, Appomattox (McLean House),
Moton School, portraits of every named person in the standards. Each image carries alt text, a caption, and
a credit. Sourcing and licensing are tracked in `assets/CREDITS.md`.

---

## 6. Content requirements

### 6.1 Coverage rule
Every sub-standard VS.1a through VS.13b maps to at least one content node, and the Standards index shows
where. The VS skills standard (analyzing sources, using maps, timelines, cause and effect, compare and
contrast) is exercised through the interactive moments rather than taught as a topic.

### 6.2 Reading level and tone
4th–5th grade, leaning 5th. Second person where it helps ("Find the river that runs past Richmond"). Short
paragraphs. Vocabulary in bold with a one-line definition on hover/tap. Hard history (enslavement, Nat
Turner's Rebellion, Massive Resistance) follows the school's guidance: **factual and apolitical, realistic,
not overly graphic**. Plain language, no euphemism, no gratuitous detail; every such card is reviewed with
Sandra before it ships.

### 6.3 Named people (must all appear)
Powhatan, Captain John Smith, George Washington, Thomas Jefferson, George Mason, James Madison, Patrick
Henry, James Armistead Lafayette, Nat Turner, John Brown, Harriet Tubman, Thomas "Stonewall" Jackson,
Robert E. Lee, William Harvey Carney, Winfield Scott, Powhatan Beaty, Elizabeth Van Lew, Mary Bowser, John
Mercer Langston, Maggie Walker, Robert Russa Moton, Barbara Johns, Samuel Wilbert Tucker, Oliver W. Hill Sr.,
Irene Morgan, Arthur R. Ashe, A. Linwood Holton Jr., L. Douglas Wilder, plus the eight Virginia-born
presidents (Washington, Jefferson, Madison, Monroe, W. H. Harrison, Tyler, Taylor, Wilson).

### 6.4 Named places (must all appear)
The five regions; the James, York, Rappahannock, and Potomac rivers; Chesapeake Bay; the Eastern Shore;
Lake Drummond and the Dismal Swamp; the bordering states; Werowocomoco; Jamestown; Williamsburg; Richmond;
Yorktown; Harpers Ferry; West Virginia; major Civil War battle sites in Virginia; Chesterfield County (school
home).

### 6.5 Present-day tribes (VS.2e), decided
Feature the tribes that are most active today and, especially, those with a presence in Central Virginia:
the **Monacan Indian Nation** (Amherst County), the **Chickahominy** and **Chickahominy Eastern Division**
(Charles City / New Kent), the **Pamunkey**, **Mattaponi**, and **Upper Mattaponi** (King William County,
home of the two oldest reservations in the country). Also name the other federally recognized nations
(Rappahannock, Nansemond) and note the remaining state-recognized tribes (Patawomeck, Cheroenhaka Nottoway,
Nottoway of Virginia) so the "leading to the present day" story is complete. Map them on the language-group
layer and on a "Virginia's tribes today" layer.

### 6.6 The Great Dismal Swamp, decided
A featured place that appears in several chapters:
- **Geography (Ch. 1):** Coastal Plain, straddling the Virginia–North Carolina line; Lake Drummond at its
  centre; one of the largest wetlands on the East Coast; now a National Wildlife Refuge.
- **First Peoples (Ch. 2):** Indigenous use of the swamp for hunting, fishing, and shelter for thousands of years.
- **Colony and antebellum Virginia (Ch. 4, 6, 7):** maroon communities of people who escaped enslavement and
  lived free inside the swamp for generations; its role on the Underground Railroad; George Washington's
  Dismal Swamp Company and the canal that made it a working landscape.
Told to the school's guidance (§6.2): factual, realistic, not graphic.

### 6.7 Enrichment beyond the standards (Sandra's asks + suggestions)
- **Mother of Presidents, made explicit:** all eight presidents with birthplace, home, region, and a
  one-line "why he matters," pinned on the map.
- **The travelling capital:** Jamestown → Williamsburg → Richmond, with why each move happened, and Thomas
  Jefferson's design of the Capitol in Richmond (modelled on a Roman temple in France), with a photo.
- **Chesterfield County** called out on the map as "you are here."
- Suggested additions (Sandra confirmed the list; the swamp is now §6.6): the Fall Line and why cities grew there; the first Africans at
  Old Point Comfort (Fort Monroe) in 1619; Cactus Hill as one of the oldest human sites in the Americas;
  the Pamunkey and Mattaponi reservations as the oldest in the country; state symbols (dogwood, cardinal)
  as a light-touch decoration layer; Roanoke as the railroad city; NASA Langley and the Hampton "human
  computers."

---

## 7. Technical design (summary)

- **Location:** `projects/virginia-explorer/` with `index.html` (map + chapter picker), `chapters/*.html`,
  `people.html`, `places.html`, `events.html`, `timeline.html`, `standards.html`, `content/*.js`,
  `shared/va-map.js` (the SVG map + layer API), `shared/va-core.js` (cards, index, cross-links, quiz helpers),
  `shared/va.css`, `assets/img/`, `assets/CREDITS.md`.
- **Map:** hand-simplified SVG paths for the state outline, five regions, rivers, and neighbors, authored
  once; regions are `<path data-region="piedmont">`, pins are positioned by map coordinates stored on each
  content node. No external tile services (offline requirement).
- **Content model (illustrative):**
  ```js
  VA.people.push({ id:'barbara-johns', name:'Barbara Johns', born:1935, region:'piedmont',
    places:['moton-school'], era:'civil-rights', standards:['VS.11b'],
    image:{src:'assets/img/barbara-johns.jpg', alt:'…', credit:'…'},
    blurb:'…', body:['…','…'] });
  ```
- **Rendering:** each chapter page loads the content modules and calls `VA.map.mount(svg, {layers})` and
  `VA.cards.render(container, nodes)`. Index pages filter the same arrays.
- **Reuse:** the feedback layer (toast, confetti, synth) and reduced-motion handling are lifted from
  Shape Slicer's core. Quiz UI reuses the shape-explorer/shape-slicer quiz pattern.
- **Performance/offline:** target total exhibit size under ~25 MB with images; no webfonts; no network.

---

## 8. Relationship to the USI course (future)

The *USI with Virginia Touchstones* outline describes the eventual hybrid course: USI as the spine, VS as a
lens. Virginia Explorer should be built so it slots into that sequence later:

| USI touchstone unit | Virginia Explorer chapters that serve it |
|---|---|
| 1 Geography of North America | 1 The Lay of the Land |
| 2 Indigenous North America | 2 First Peoples |
| 3 Exploration and Founding of Virginia | 3 Jamestown, 4 Life in the Colony |
| 4 The American Revolution | 5 Virginia Declares |
| 5 Founding a Nation | 5 Virginia Declares (Madison), 6 A Growing Nation |
| 6 Westward Expansion | 6 A Growing Nation |
| 7 The Civil War | 7 A House Divided |

USI-only content (West African kingdoms, the Constitutional Convention, national westward expansion, the
national Civil War narrative) would become a sibling exhibit in the Social Studies wing, reusing the same
content model with `USI.x` tags. Nothing in this phase should block that; tagging nodes with standard IDs
now is what makes it cheap later.

---

## 9. Decisions from Sandra (2026-09-06)

| # | Question | Decision |
|---|---|---|
| 1 | Branding scope | Rebrand the **whole Hall** to school level now. |
| 2 | Name | **Virginia Explorer**. |
| 3 | Chapter count | Keep all eleven. Pre–Civil War chapters matter most for this course; post–Civil War content stays as reference and supports the following US History II course. |
| 4 | Quiz scope | Confirm all: regions, rivers, bordering states, language-group areas. States and capitals will be a separate later tool. |
| 5 | Images | Public domain. |
| 6 | Sensitive content | School guidance: factual and apolitical, realistic, not overly graphic. |
| 7 | Present-day tribes | The most active tribes, and definitely those with a presence in Central Virginia (§6.5). |
| 8 | Enrichment | Add the **Great Dismal Swamp**: its geography, and how Indigenous and enslaved people used it (§6.6). |

## 10. Phased delivery

| Phase | Scope | Exit criteria |
|---|---|---|
| **0. Platform** | Hub wings + school branding + `CLAUDE.md` update + content/assets conventions | Hub shows three wings; all pages carry REDS branding; conventions documented |
| **1. Map + Geography** | SVG map, region/water/neighbor layers, Chapter 1 with quiz (incl. the Dismal Swamp), People/Places index shell | A student can name regions, rivers, and neighbors from the map and pass the geography quiz |
| **2. Early history** | Chapters 2–5, first ~30 content nodes with images, timeline | VS.2–VS.6c fully covered in the standards index |
| **3. 19th century** | Chapters 6–8 | VS.6d–VS.9 covered |
| **4. Modern + enrichment** | Chapters 9–11, Mother of Presidents, capital story, Chesterfield callout, teacher panel | VS.10–VS.13 covered; every standard resolves to a node |
| **5. Polish** | Accessibility pass (alt text, keyboard map), image credits complete, size budget met, classroom test | Teachers sign off |

Each phase ends with a commit and a `CLAUDE.md` touch-up so a fresh session can continue.

---

## 11. Acceptance criteria

- A1. Every VS.1–VS.13 sub-standard appears in the Standards index with at least one linked node.
- A2. From the hub, a student reaches the Virginia Explorer map in two clicks.
- A3. Clicking any region, pin, or index entry opens the same detail card, and the map highlights the matching location.
- A4. The geography quiz covers regions, rivers, bordering states, and language-group areas, with feedback.
- A5. Every place/person card has an image with alt text and a credit, or is explicitly marked "no image yet."
- A6. The entire site opens from `file://` with no network and no console errors.
- A7. No page names a teacher or a grade in its branding.
- A8. `CLAUDE.md` documents the wing model, the atlas exhibit shape, and the content/assets conventions.

---

## 12. Risks

| Risk | Mitigation |
|---|---|
| Image licensing and sourcing takes longer than building | Start the credits file in Phase 1; prefer LOC / NPS / Wikimedia public-domain; allow "no image yet" placeholders |
| Content volume (~150+ nodes) crowds out interaction quality | Data-driven cards keep authoring cheap; put interaction budget into Chapters 1, 2, 5, 7 |
| Hard history handled clumsily | Draft those cards first and review with Sandra before building around them |
| Map accuracy for regions and rivers | Base the SVG on public-domain USGS/VDOE region maps; keep it schematic and clearly labelled |
| Scope creep toward USI | Tag content now, build USI later; keep the USI mapping table as the boundary |
