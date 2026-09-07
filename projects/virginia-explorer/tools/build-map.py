"""
build-map.py — generate projects/virginia-explorer/shared/va-map.js from public-domain GIS data.

Run:  python build-map.py <folder-with-unzipped-datasets>

The folder must contain (see tools/SOURCES.md for download links):
  state/cb_2023_us_state_500k.shp            U.S. Census Bureau cartographic boundaries (states)
  county/cb_2023_us_county_500k.shp          U.S. Census Bureau cartographic boundaries (counties)
  physio/physio.shp                          USGS physiographic divisions of the conterminous U.S. (Fenneman & Johnson)
  streams/streaml010g.shp                    USGS 1:1,000,000 Streams of the United States (National Atlas)
  waterbodies/wtrbdyp010g.shp                USGS 1:1,000,000 Waterbodies of the United States (National Atlas)

Output is a plain script that assigns window.VA_MAP (works from file://, no fetch needed).
Only the standard library plus `pyshp` (pip install pyshp) are required.
"""
import sys, os, math, json, io
import shapefile

SRC = sys.argv[1] if len(sys.argv) > 1 else '.'
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..', 'shared', 'va-map.js'))

# ---------------------------------------------------------------- geometry
# Map window in lon/lat: Virginia with a margin so bordering states show.
LON0, LON1, LAT0, LAT1 = -84.6, -74.5, 35.85, 40.05
LAT_REF = 37.9                       # equirectangular reference latitude
COS = math.cos(math.radians(LAT_REF))
WIDTH = 1000.0                       # SVG viewBox width

def proj(lon, lat):
    """Equirectangular projection scaled so the map window is WIDTH px wide; y grows downward."""
    k = WIDTH / ((LON1 - LON0) * COS)
    return ((lon - LON0) * COS * k, (LAT1 - lat) * k)

VIEW_H = (LAT1 - LAT0) * (WIDTH / ((LON1 - LON0) * COS))

def clip_poly_rect(pts, x0, y0, x1, y1):
    """Sutherland–Hodgman clip of a polygon ring against an axis-aligned rectangle."""
    def clip(pts, inside, intersect):
        out = []
        if not pts: return out
        prev = pts[-1]
        for cur in pts:
            if inside(cur):
                if not inside(prev): out.append(intersect(prev, cur))
                out.append(cur)
            elif inside(prev):
                out.append(intersect(prev, cur))
            prev = cur
        return out
    def ix_x(a, b, x):  # intersection with vertical line x
        t = (x - a[0]) / (b[0] - a[0]); return (x, a[1] + (b[1] - a[1]) * t)
    def ix_y(a, b, y):
        t = (y - a[1]) / (b[1] - a[1]); return (a[0] + (b[0] - a[0]) * t, y)
    pts = clip(pts, lambda p: p[0] >= x0, lambda a, b: ix_x(a, b, x0))
    pts = clip(pts, lambda p: p[0] <= x1, lambda a, b: ix_x(a, b, x1))
    pts = clip(pts, lambda p: p[1] >= y0, lambda a, b: ix_y(a, b, y0))
    pts = clip(pts, lambda p: p[1] <= y1, lambda a, b: ix_y(a, b, y1))
    return pts

def clip_line_rect(pts, x0, y0, x1, y1):
    """Split a polyline into the runs that lie inside the rectangle (endpoints trimmed at the edge)."""
    inside = lambda p: x0 <= p[0] <= x1 and y0 <= p[1] <= y1
    runs, cur = [], []
    for i, p in enumerate(pts):
        if inside(p):
            if not cur and i > 0:
                cur.append(edge_point(pts[i - 1], p, x0, y0, x1, y1))
            cur.append(p)
        else:
            if cur:
                cur.append(edge_point(cur[-1], p, x0, y0, x1, y1)); runs.append(cur); cur = []
    if cur: runs.append(cur)
    return [r for r in runs if len(r) >= 2]

def edge_point(a, b, x0, y0, x1, y1):
    """Point where segment a→b crosses the rectangle edge (a or b is inside)."""
    best, bt = b, 1.0
    for t in [(x0 - a[0]) / (b[0] - a[0]) if b[0] != a[0] else None,
              (x1 - a[0]) / (b[0] - a[0]) if b[0] != a[0] else None,
              (y0 - a[1]) / (b[1] - a[1]) if b[1] != a[1] else None,
              (y1 - a[1]) / (b[1] - a[1]) if b[1] != a[1] else None]:
        if t is not None and 0 <= t <= 1:
            p = (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
            if x0 - 1e-9 <= p[0] <= x1 + 1e-9 and y0 - 1e-9 <= p[1] <= y1 + 1e-9 and t < bt:
                best, bt = p, t
    return best

def simplify(pts, eps):
    """Douglas–Peucker."""
    if len(pts) < 3: return pts
    def d2(p, a, b):
        dx, dy = b[0] - a[0], b[1] - a[1]
        if dx == dy == 0: return (p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2
        t = max(0, min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)))
        return (p[0] - a[0] - t * dx) ** 2 + (p[1] - a[1] - t * dy) ** 2
    stack, keep = [(0, len(pts) - 1)], [False] * len(pts)
    keep[0] = keep[-1] = True
    while stack:
        i, j = stack.pop()
        if j <= i + 1: continue
        k, dm = i, -1
        for m in range(i + 1, j):
            d = d2(pts[m], pts[i], pts[j])
            if d > dm: k, dm = m, d
        if dm > eps * eps:
            keep[k] = True; stack += [(i, k), (k, j)]
    return [p for p, k in zip(pts, keep) if k]

def rings(shape):
    """Yield the rings (lists of (lon,lat)) of a polygon/polyline shape."""
    parts = list(shape.parts) + [len(shape.points)]
    for a, b in zip(parts, parts[1:]):
        yield [tuple(p) for p in shape.points[a:b]]

def bbox_hits(shape):
    b = shape.bbox
    return b[2] >= LON0 and b[0] <= LON1 and b[3] >= LAT0 and b[1] <= LAT1

def to_path(rings_ll, eps, closed=True):
    d = []
    for r in rings_ll:
        r = simplify(r, eps)
        if len(r) < (3 if closed else 2): continue
        pts = [proj(*p) for p in r]
        d.append('M' + ' '.join('%.1f %.1f' % p for p in pts) + ('Z' if closed else ''))
    return ''.join(d)

def centroid_of(rings_ll):
    """Area-weighted centroid of the largest ring (in projected coordinates)."""
    best, ba = None, -1
    for r in rings_ll:
        pts = [proj(*p) for p in r]
        a = cx = cy = 0
        for i in range(len(pts)):
            x0, y0 = pts[i]; x1, y1 = pts[(i + 1) % len(pts)]
            f = x0 * y1 - x1 * y0; a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f
        if abs(a) > ba and abs(a) > 1e-9:
            ba = abs(a); best = (cx / (3 * a), cy / (3 * a))
    return [round(best[0], 1), round(best[1], 1)] if best else None

# ---------------------------------------------------------------- layers
def read(path): return shapefile.Reader(os.path.join(SRC, path))

def states():
    out = {}
    sf = read('state/cb_2023_us_state_500k.shp')
    keep = {'VA', 'MD', 'WV', 'KY', 'TN', 'NC', 'DC', 'DE', 'PA', 'OH', 'NJ'}
    for shp, rec in zip(sf.iterShapes(), sf.iterRecords()):
        d = rec.as_dict()
        if d['STUSPS'] not in keep or not bbox_hits(shp): continue
        rr = [clip_poly_rect(r, LON0, LAT0, LON1, LAT1) for r in rings(shp)]
        rr = [r for r in rr if len(r) >= 3]
        eps = 0.003 if d['STUSPS'] == 'VA' else 0.006
        out[d['STUSPS']] = {'name': d['NAME'], 'd': to_path(rr, eps), 'label': centroid_of(rr)}
    return out

REGIONS = {  # USGS province → VDOE region id / display name
    'COASTAL PLAIN':        ('coastal',  'Coastal Plain (Tidewater)'),
    'PIEDMONT':             ('piedmont', 'Piedmont'),
    'BLUE RIDGE':           ('blueridge','Blue Ridge Mountains'),
    'VALLEY AND RIDGE':     ('valley',   'Valley and Ridge'),
    'APPALACHIAN PLATEAUS': ('plateau',  'Appalachian Plateau'),
}
def regions():
    acc = {v[0]: {'name': v[1], 'usgs': k, 'rings': []} for k, v in REGIONS.items()}
    sf = read('physio/physio.shp')
    for shp, rec in zip(sf.iterShapes(), sf.iterRecords()):
        prov = rec.as_dict().get('PROVINCE')
        if prov not in REGIONS or not bbox_hits(shp): continue
        for r in rings(shp):
            c = clip_poly_rect(r, LON0, LAT0, LON1, LAT1)
            if len(c) >= 3: acc[REGIONS[prov][0]]['rings'].append(c)
    out = {}
    for rid, v in acc.items():
        out[rid] = {'name': v['name'], 'usgs': v['usgs'], 'd': to_path(v['rings'], 0.004)}
    return out

def counties():
    sf = read('county/cb_2023_us_county_500k.shp')
    out = {}
    want = {'51041': 'chesterfield'}
    for shp, rec in zip(sf.iterShapes(), sf.iterRecords()):
        d = rec.as_dict()
        if d['GEOID'] in want:
            rr = list(rings(shp))
            out[want[d['GEOID']]] = {'name': d['NAMELSAD'], 'd': to_path(rr, 0.002), 'label': centroid_of(rr)}
    return out

# Rivers come from the USGS 1:1,000,000 national streams dataset, which names every Virginia river.
# (Natural Earth's "James" is the Dakota river, so Natural Earth is not used for hydrography.)
STATES_NEAR = {'VA', 'MD', 'WV', 'NC', 'KY', 'TN', 'DC', 'DE', 'PA', 'OH'}
RIVERS = {  # USGS Name → (id, VDOE importance: 'key' = named in the standards, 'major' = labelled, 'minor' = context)
    'James River': ('james', 'key'), 'Potomac River': ('potomac', 'key'), 'Rappahannock River': ('rappahannock', 'key'), 'York River': ('york', 'key'),
    'Shenandoah River': ('shenandoah', 'major'), 'North Fork Shenandoah River': ('shenandoah-nf', 'minor'), 'South Fork Shenandoah River': ('shenandoah-sf', 'minor'),
    'Roanoke River': ('roanoke', 'major'), 'Dan River': ('dan', 'major'), 'New River': ('new', 'major'), 'Clinch River': ('clinch', 'major'), 'Holston River': ('holston', 'major'),
    'North Fork Holston River': ('holston-nf', 'minor'), 'South Fork Holston River': ('holston-sf', 'minor'), 'Middle Fork Holston River': ('holston-mf', 'minor'), 'Powell River': ('powell', 'minor'),
    'Appomattox River': ('appomattox', 'major'), 'Chickahominy River': ('chickahominy', 'minor'), 'Mattaponi River': ('mattaponi', 'major'), 'Pamunkey River': ('pamunkey', 'major'),
    'Rapidan River': ('rapidan', 'minor'), 'Rivanna River': ('rivanna', 'minor'), 'Maury River': ('maury', 'minor'), 'Nottoway River': ('nottoway', 'minor'), 'Meherrin River': ('meherrin', 'minor'),
    'Blackwater River': ('blackwater', 'minor'), 'Elizabeth River': ('elizabeth', 'minor'), 'Nansemond River': ('nansemond', 'minor'), 'Occoquan River': ('occoquan', 'minor'),
    'South Branch Potomac River': ('potomac-sb', 'minor'), 'North Branch Potomac River': ('potomac-nb', 'minor'),
    # neighbours, for context only
    'Big Sandy River': ('big-sandy', 'context'), 'Tug Fork': ('tug-fork', 'context'), 'Levisa Fork': ('levisa-fork', 'context'), 'Cheat River': ('cheat', 'context'),
    'Monongahela River': ('monongahela', 'context'), 'Greenbrier River': ('greenbrier', 'context'), 'Kanawha River': ('kanawha', 'context'), 'Gauley River': ('gauley', 'context'),
    'Cumberland River': ('cumberland', 'context'), 'Kentucky River': ('kentucky', 'context'), 'Licking River': ('licking', 'context'), 'Neuse River': ('neuse', 'context'),
    'Tar River': ('tar', 'context'), 'Yadkin River': ('yadkin', 'context'), 'Cape Fear River': ('cape-fear', 'context'), 'Susquehanna River': ('susquehanna', 'context'),
    'Patuxent River': ('patuxent', 'context'), 'Choptank River': ('choptank', 'context'), 'Nanticoke River': ('nanticoke', 'context'), 'Pocomoke River': ('pocomoke', 'context'),
    'Watauga River': ('watauga', 'context'), 'French Broad River': ('french-broad', 'context'), 'Nolichucky River': ('nolichucky', 'context'),
}
def near(state_field):
    return bool(set((state_field or '').split('-')) & STATES_NEAR)

def rivers():
    segs, order = {}, {}
    sf = shapefile.Reader(os.path.join(SRC, 'streams/streaml010g.shp'), encoding='latin-1')
    for shp, rec in zip(sf.iterShapes(), sf.iterRecords()):
        d = rec.as_dict(); name = d.get('Name') or ''
        if name not in RIVERS or not near(d.get('State')) or not bbox_hits(shp): continue
        # Virginia's Blackwater, not Maryland's
        if name == 'Blackwater River' and 'VA' not in (d.get('State') or ''): continue
        for r in rings(shp):
            for run in clip_line_rect(r, LON0, LAT0, LON1, LAT1):
                segs.setdefault(name, []).append(run)
        try: order[name] = max(order.get(name, 0), int(d.get('Strahler') or 0))
        except (TypeError, ValueError): pass
    # The York River is a tidal estuary with no stream line in the USGS 1:1M data (its water shows as the
    # inlet in the Census coastline). Add a centerline by coordinate from West Point to the Chesapeake Bay.
    if 'York River' not in segs:
        segs['York River'] = [[(-76.795, 37.531), (-76.735, 37.48), (-76.66, 37.415), (-76.58, 37.36), (-76.50, 37.29), (-76.44, 37.235), (-76.37, 37.215)]]
        order['York River'] = 4
    out = []
    for name, runs in segs.items():
        rid, rank = RIVERS[name]
        eps = 0.0015 if rank in ('key', 'major') else 0.004
        out.append({'id': rid, 'name': name, 'rank': rank, 'order': order.get(name, 0), 'd': to_path(runs, eps, closed=False),
                    **({'synthetic': True} if name == 'York River' else {})})
    rank_order = {'key': 0, 'major': 1, 'minor': 2, 'context': 3}
    out.sort(key=lambda r: (rank_order[r['rank']], r['name']))
    missing = [n for n in RIVERS if n not in segs and RIVERS[n][1] in ('key', 'major')]
    if missing: print('  WARNING rivers not found:', missing)
    return out

WATER = {'Lake Drummond': 'drummond', 'Great Dismal Swamp': 'dismal-swamp', 'Lake Anna': 'anna', 'Smith Mountain Lake': 'smith-mountain',
         'John H. Kerr Reservoir': 'kerr', 'Lake Gaston': 'gaston', 'Claytor Lake': 'claytor', 'Philpott Lake': 'philpott', 'Lake Moomaw': 'moomaw', 'Back Bay': 'back-bay'}
def lakes():
    acc = {}
    sf = shapefile.Reader(os.path.join(SRC, 'waterbodies/wtrbdyp010g.shp'), encoding='latin-1')
    for shp, rec in zip(sf.iterShapes(), sf.iterRecords()):
        d = rec.as_dict(); name = d.get('Name') or ''
        if name not in WATER or not bbox_hits(shp): continue
        rr = [clip_poly_rect(r, LON0, LAT0, LON1, LAT1) for r in rings(shp)]
        rr = [r for r in rr if len(r) >= 3]
        if rr: acc.setdefault(name, {'feature': d.get('Feature'), 'rings': []})['rings'].extend(rr)
    out = []
    for name, v in acc.items():
        rr = v['rings']
        out.append({'id': WATER[name], 'name': name, 'feature': v['feature'], 'd': to_path(rr, 0.0015), 'label': centroid_of(rr)})
    out.sort(key=lambda l: l['name'])
    return out

# ---------------------------------------------------------------- write
def main():
    data = {
        'viewBox': [0, 0, round(WIDTH), round(VIEW_H)],
        'window': {'lon0': LON0, 'lon1': LON1, 'lat0': LAT0, 'lat1': LAT1, 'latRef': LAT_REF, 'width': WIDTH},
        'states': states(), 'regions': regions(), 'counties': counties(), 'rivers': rivers(), 'lakes': lakes(),
        'sources': {
            'states, counties': 'U.S. Census Bureau, Cartographic Boundary Files 2023 (1:500,000). Public domain.',
            'regions': 'USGS, Physiographic divisions of the conterminous United States (Fenneman & Johnson, 1946), digital version. Public domain.',
            'rivers': 'USGS National Atlas / The National Map small-scale data, Streams of the United States 1:1,000,000 (streaml010g). Public domain.',
            'lakes, swamp': 'USGS National Atlas / The National Map small-scale data, Waterbodies of the United States 1:1,000,000 (wtrbdyp010g). Public domain.',
            'projection': 'Equirectangular, reference latitude 37.9°N; Douglas-Peucker simplified (0.0015°–0.006°).',
        },
    }
    js = ('/* GENERATED by tools/build-map.py — do not edit by hand. Re-run the script to regenerate.\n'
          '   Sources: see tools/SOURCES.md. Coordinates are SVG units in the viewBox below. */\n'
          'window.VA_MAP = ' + json.dumps(data, separators=(',', ':')) + ';\n'
          'window.VA_MAP.project = function(lon, lat){\n'
          '  var w = window.VA_MAP.window, cos = Math.cos(w.latRef * Math.PI / 180), k = w.width / ((w.lon1 - w.lon0) * cos);\n'
          '  return { x: (lon - w.lon0) * cos * k, y: (w.lat1 - lat) * k };\n'
          '};\n')
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    io.open(OUT, 'w', encoding='utf-8', newline='\n').write(js)
    print('wrote', OUT, '%.0f KB' % (len(js) / 1024))
    for k in ('states', 'regions', 'counties'): print(' ', k, sorted(data[k].keys()))
    print('  rivers', [r['name'] for r in data['rivers']])
    print('  lakes', [l['name'] for l in data['lakes']])

if __name__ == '__main__':
    main()
