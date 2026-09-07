# Map data sources — Virginia Explorer

`shared/va-map.js` is **generated** by `tools/build-map.py` from the public-domain datasets below.
Never edit the generated file by hand; change the script and re-run it.

```bash
pip install pyshp
python projects/virginia-explorer/tools/build-map.py <folder-with-unzipped-datasets>
```

The folder layout the script expects, with download links (all U.S. federal public-domain data):

| Subfolder | File | Source | Download |
|---|---|---|---|
| `state/` | `cb_2023_us_state_500k.shp` | U.S. Census Bureau, Cartographic Boundary Files 2023, states, 1:500,000 | https://www2.census.gov/geo/tiger/GENZ2023/shp/cb_2023_us_state_500k.zip |
| `county/` | `cb_2023_us_county_500k.shp` | U.S. Census Bureau, Cartographic Boundary Files 2023, counties, 1:500,000 | https://www2.census.gov/geo/tiger/GENZ2023/shp/cb_2023_us_county_500k.zip |
| `physio/` | `physio.shp` | USGS, *Physiographic divisions of the conterminous United States* (Fenneman & Johnson, 1946), digital edition | https://water.usgs.gov/GIS/dsdl/physio_shp.zip |
| `streams/` | `streaml010g.shp` | USGS National Atlas / The National Map, *Streams of the United States*, 1:1,000,000 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Small-scale/data/Hydrography/streaml010g.shp_nt00885.tar.gz |
| `waterbodies/` | `wtrbdyp010g.shp` | USGS National Atlas / The National Map, *Waterbodies of the United States*, 1:1,000,000 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Small-scale/data/Hydrography/wtrbdyp010g.shp_nt00886.tar.gz |

## What comes from where

- **Five regions** = the USGS physiographic *provinces* Coastal Plain, Piedmont, Blue Ridge, Valley and Ridge,
  Appalachian Plateaus, which are exactly the five regions the Virginia Studies standards use. They are
  drawn at full extent and clipped to the Virginia outline in the browser with an SVG `clipPath`.
- **State outline, bordering states, Chesterfield County** = Census cartographic boundaries.
- **Rivers** = USGS 1:1M streams, selected by name (see `RIVERS` in the script). Each carries a `rank`:
  `key` (named in VS.1c: James, Potomac, Rappahannock, York), `major`, `minor`, `context` (outside Virginia).
- **York River**: the USGS 1:1M data has no stream line for this tidal estuary (the water itself is the inlet
  in the Census coastline), so the script adds a centerline by coordinate from West Point to the Bay,
  flagged `synthetic: true`.
- **Lakes and the Great Dismal Swamp** = USGS 1:1M waterbodies (Lake Drummond, Great Dismal Swamp, Lake Anna,
  Smith Mountain Lake, Kerr, Gaston, Claytor, Moomaw).
- **Chesapeake Bay and the Atlantic** are not polygons; they are the water left between the land polygons.
  Labels for them are placed by coordinate.

## Projection

Equirectangular with reference latitude 37.9°N, scaled to a 1000-unit-wide viewBox covering
longitude −84.6° to −74.5° and latitude 35.85° to 40.05°. `VA_MAP.project(lon, lat)` returns the SVG point
for any coordinate, which is how content nodes (places, people's homes) are pinned. Simplification is
Douglas–Peucker at 0.0015° for Virginia features and up to 0.006° for neighboring states.

## Accuracy notes for teachers

Boundaries are as accurate as the federal datasets at the stated scales (roughly 1:500,000 to
1:1,000,000), which is far finer than a classroom map needs. The only hand-placed geometry is the York
River centerline and the label positions.
