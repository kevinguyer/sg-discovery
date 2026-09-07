/* Virginia Explorer — content: Physical Geography (VS.1)
   Source of truth for Chapter 1. Standards: 2023 HSS SOL Virginia Studies VS.1a–c;
   products/industries preview VS.13a. Reading level: grades 4–5.
   Every node: id, type, name, emoji, tagline, blurb, body[], facts[], standards[], related[], and either
   lat/lon (pin) or a mapRef pointing at a region / river / water / state / layer on the map.
*/
VA.add([
  /* ───────────── THE FIVE REGIONS (VS.1b) ───────────── */
  { id: 'region-coastal', type: 'region', name: 'Coastal Plain (Tidewater)', emoji: '🌊', tagline: 'Flat land by the sea',
    blurb: 'The <strong>Coastal Plain</strong>, also called the <strong>Tidewater</strong>, is the flat, low land next to the Atlantic Ocean and the Chesapeake Bay. It is <strong>east of the Fall Line</strong>.',
    body: [
      'The land here is flat and close to sea level. Rivers are wide and slow, and the ocean tides push water up into them twice a day. That is why people call it the <strong>Tidewater</strong>.',
      'The <strong>Eastern Shore</strong>, the strip of land across the Chesapeake Bay, is part of Virginia and part of this region. So is the <strong>Great Dismal Swamp</strong> with <strong>Lake Drummond</strong> at its heart.',
      'Because it touches the ocean, this region has always been about ships. Jamestown, Yorktown, Norfolk, and Hampton Roads are all here, and today it is home to the largest naval base in the world.'
    ],
    facts: ['<b>Topography:</b> flat, low, wet', '<b>Water:</b> Atlantic Ocean, Chesapeake Bay, the four big rivers, Lake Drummond', '<b>Products &amp; industries:</b> seafood, peanuts, shipbuilding, the Navy and other military bases, tourism', '<b>Places:</b> Jamestown, Williamsburg, Yorktown, Norfolk, Virginia Beach, the Eastern Shore'],
    standards: ['VS.1b', 'VS.1c', 'VS.13a'], related: ['water-chesapeake', 'place-eastern-shore', 'water-dismal-swamp', 'place-fall-line', 'place-norfolk'] },

  { id: 'region-piedmont', type: 'region', name: 'Piedmont', emoji: '🌾', tagline: 'Rolling hills at the foot of the mountains',
    blurb: 'The <strong>Piedmont</strong> is the land of rolling hills between the Fall Line and the Blue Ridge Mountains. Its name is French for <em>"foot of the mountain."</em> It is the biggest of the five regions.',
    body: [
      'Cross the Fall Line heading west and the land starts to roll. Rivers here run faster and drop over rocks and rapids, which is exactly why cities like Richmond grew up where they did: boats coming upriver from the ocean had to stop.',
      'The Piedmont is Virginia\'s middle. Farms, forests, small towns, and big cities share it. <strong>Richmond</strong>, the state capital, sits right on the Fall Line where the Piedmont begins.',
      '<strong>Chesterfield County</strong>, home of Redeemer Episcopal Day School, is in the Piedmont, just south of the James River.'
    ],
    facts: ['<b>Topography:</b> rolling hills', '<b>Water:</b> the upper James, Rappahannock, and Appomattox rivers; Lake Anna', '<b>Products &amp; industries:</b> tobacco (historically), information technology, state and federal government, farming', '<b>Places:</b> Richmond, Charlottesville, Danville, Chesterfield County'],
    standards: ['VS.1b', 'VS.13a'], related: ['place-richmond', 'place-chesterfield', 'place-fall-line', 'region-coastal', 'region-blueridge'] },

  { id: 'region-blueridge', type: 'region', name: 'Blue Ridge Mountains', emoji: '⛰️', tagline: 'Old, rounded mountains that look blue from far away',
    blurb: 'The <strong>Blue Ridge Mountains</strong> are old, rounded mountains that run like a long spine down the middle of Virginia. They are part of the <strong>Appalachian Mountains</strong>.',
    body: [
      'These mountains are some of the oldest on Earth. Millions of years of rain and wind have worn their peaks smooth and round. From a distance the forests give off a haze that makes them look blue, which is how they got their name.',
      'Many of Virginia\'s rivers are born here. Rain that falls on the eastern side flows to the Chesapeake Bay; rain on the western side flows to the Shenandoah and, eventually, the Potomac.',
      'People come here to hike, camp, and pick apples. Skyline Drive and the Blue Ridge Parkway wind along the ridge tops, and Shenandoah National Park protects a big stretch of it.'
    ],
    facts: ['<b>Topography:</b> old, rounded mountains', '<b>Water:</b> the source of many rivers; Mount Rogers, Virginia\'s highest point, is nearby', '<b>Products &amp; industries:</b> apples, recreation and tourism, forestry', '<b>Places:</b> Shenandoah National Park, Skyline Drive, Roanoke (at its edge)'],
    standards: ['VS.1b', 'VS.13a'], related: ['region-valley', 'region-piedmont', 'place-roanoke'] },

  { id: 'region-valley', type: 'region', name: 'Valley and Ridge', emoji: '🏞️', tagline: 'The Great Valley and the long ridges beside it',
    blurb: 'The <strong>Valley and Ridge</strong> region lies west of the Blue Ridge. It is made of long, narrow valleys separated by long, narrow ridges, like the folds of a rumpled blanket.',
    body: [
      'The biggest valley is the <strong>Shenandoah Valley</strong>, part of the Great Valley of Virginia. Its rich soil made it a breadbasket: wheat, apples, cattle, and now huge poultry farms.',
      'Ridges made travel hard, so people followed the valleys. Long ago, the <strong>Wilderness Road</strong> ran through here toward the Cumberland Gap and the west.',
      'Limestone under the valley floor dissolves in water, which carved the famous caverns at Luray and Natural Bridge.'
    ],
    facts: ['<b>Topography:</b> long valleys between long ridges', '<b>Water:</b> the Shenandoah River (north fork and south fork), the New River', '<b>Products &amp; industries:</b> poultry, apples, dairy and beef cattle, farming', '<b>Places:</b> the Shenandoah Valley, Winchester, Harrisonburg, Lexington, Roanoke'],
    standards: ['VS.1b', 'VS.13a'], related: ['region-blueridge', 'region-plateau', 'place-roanoke'] },

  { id: 'region-plateau', type: 'region', name: 'Appalachian Plateau', emoji: '⛏️', tagline: 'Rugged high land in the far southwest',
    blurb: 'The <strong>Appalachian Plateau</strong> is Virginia\'s smallest region, tucked into the far southwestern corner. A <strong>plateau</strong> is an area of high, mostly flat land, but rivers have cut this one into steep hills and narrow hollows.',
    body: [
      'Only a small piece of the huge Appalachian Plateau is in Virginia. The rest stretches into West Virginia, Kentucky, and Tennessee.',
      'Underneath the plateau lies <strong>coal</strong>. For more than a hundred years, mining coal was the biggest job here, and trains carried it east to the ports.',
      'The <strong>Cumberland Gap</strong>, the natural doorway through the mountains that pioneers used to reach Kentucky, is at the plateau\'s western tip.'
    ],
    facts: ['<b>Topography:</b> high, rugged, cut by deep valleys', '<b>Water:</b> the Clinch, Powell, and Big Sandy rivers, which flow west toward the Mississippi', '<b>Products &amp; industries:</b> coal mining, forestry', '<b>Places:</b> the Cumberland Gap, Big Stone Gap, Breaks Interstate Park'],
    standards: ['VS.1b', 'VS.13a'], related: ['region-valley', 'place-cumberland-gap'] },

  /* ───────────── WATER (VS.1c) ───────────── */
  { id: 'water-chesapeake', type: 'water', name: 'Chesapeake Bay', emoji: '🦀', tagline: 'A safe harbor, a pantry, and a highway', lat: 37.65, lon: -76.15, mapRef: { kind: 'pin', id: 'water-chesapeake' },
    blurb: 'The <strong>Chesapeake Bay</strong> is the largest estuary in the United States, a place where rivers meet the salty sea. Virginia\'s four big rivers all empty into it.',
    body: [
      'For thousands of years the Bay has been a <strong>source of food</strong>: oysters, crabs, and fish. It has been a <strong>safe harbor</strong> for ships hiding from Atlantic storms, and a <strong>highway</strong> for boats moving people and goods.',
      'The Bay separates the Eastern Shore from the rest of Virginia. Today a 17-mile bridge-tunnel crosses its mouth.'
    ],
    facts: ['Largest estuary in the U.S.', 'Fed by the James, York, Rappahannock, and Potomac', 'Home to blue crabs, oysters, and the largest naval base in the world at its mouth'],
    standards: ['VS.1c'], related: ['river-james', 'river-york', 'river-rappahannock', 'river-potomac', 'place-eastern-shore', 'water-atlantic'] },

  { id: 'water-atlantic', type: 'water', name: 'Atlantic Ocean', emoji: '🌐', tagline: 'Virginia\'s doorway to the world', lat: 36.95, lon: -75.35, mapRef: { kind: 'pin', id: 'water-atlantic' },
    blurb: 'The <strong>Atlantic Ocean</strong> is Virginia\'s eastern border. Across it came the English colonists in 1607, and along it Virginia has traded with the world ever since.',
    body: ['The ocean gave Virginia a way to reach Europe, Africa, and the Caribbean by ship. It still does: the port at Hampton Roads is one of the busiest on the East Coast.'],
    facts: ['Borders the Coastal Plain (Tidewater) region', 'The colonists of 1607 crossed it in about four months'],
    standards: ['VS.1a', 'VS.1c'], related: ['water-chesapeake', 'region-coastal', 'place-norfolk'] },

  { id: 'river-james', type: 'water', name: 'James River', emoji: '🛶', tagline: 'Virginia\'s longest river', mapRef: { kind: 'river', id: 'james' },
    blurb: 'The <strong>James River</strong> runs all the way across Virginia, from the mountains to the Chesapeake Bay. <strong>Jamestown</strong> and <strong>Richmond</strong> are both on the James.',
    body: [
      'Born in the mountains near the West Virginia line, the James cuts through the Blue Ridge, rolls across the Piedmont, tumbles over the Fall Line at Richmond, and widens into a tidal river all the way to Hampton Roads.',
      'The English built their first permanent settlement on its bank in 1607 and named it after King James. Two hundred years later, the state capital sits on the same river.'
    ],
    facts: ['Flows into the Chesapeake Bay', 'Cities on the James: Richmond, Jamestown, Lynchburg, Newport News', 'Chesterfield County sits on its south bank'],
    standards: ['VS.1c'], related: ['place-richmond', 'place-chesterfield', 'place-fall-line', 'water-chesapeake'] },

  { id: 'river-york', type: 'water', name: 'York River', emoji: '⚓', tagline: 'Where the Revolution ended', mapRef: { kind: 'river', id: 'york' },
    blurb: 'The <strong>York River</strong> is a short, wide tidal river formed where the Pamunkey and Mattaponi rivers meet. <strong>Yorktown</strong> sits on its bank, and so did <strong>Werowocomoco</strong>, the capital of the Powhatan people.',
    body: [
      'Before the English arrived, the Powhatan people called this river the Pamunkey. Its north bank was home to Werowocomoco, where Chief Powhatan lived.',
      'In 1781 the last big battle of the American Revolution was fought at Yorktown on this river.'
    ],
    facts: ['Flows into the Chesapeake Bay', 'Cities and sites on the York: Yorktown, West Point, Werowocomoco', 'Formed by the Pamunkey and Mattaponi rivers'],
    standards: ['VS.1c', 'VS.2a'], related: ['water-chesapeake', 'river-james'] },

  { id: 'river-rappahannock', type: 'water', name: 'Rappahannock River', emoji: '🌉', tagline: 'The river through Fredericksburg', mapRef: { kind: 'river', id: 'rappahannock' },
    blurb: 'The <strong>Rappahannock River</strong> starts in the Blue Ridge and flows southeast to the Chesapeake Bay. <strong>Fredericksburg</strong> grew up where it crosses the Fall Line.',
    body: ['Its name comes from an Algonquian word meaning something like "river of quick, rising water." Fredericksburg, on its banks, was the scene of a major Civil War battle.'],
    facts: ['Flows into the Chesapeake Bay', 'City on the Rappahannock: Fredericksburg', 'The Rapidan River joins it near Fredericksburg'],
    standards: ['VS.1c'], related: ['place-fredericksburg', 'water-chesapeake'] },

  { id: 'river-potomac', type: 'water', name: 'Potomac River', emoji: '🏛️', tagline: 'The river that borders Maryland and Washington, D.C.', mapRef: { kind: 'river', id: 'potomac' },
    blurb: 'The <strong>Potomac River</strong> forms Virginia\'s northern border with Maryland and Washington, D.C. <strong>Alexandria</strong> and <strong>Mount Vernon</strong>, George Washington\'s home, are on its Virginia bank.',
    body: ['The Potomac begins in the mountains of West Virginia, gathers the Shenandoah at Harpers Ferry, and flows past the nation\'s capital to the Chesapeake Bay. The whole river, up to the Virginia shoreline, actually belongs to Maryland.'],
    facts: ['Flows into the Chesapeake Bay', 'Cities and sites on the Potomac: Alexandria, Mount Vernon, Washington, D.C.', 'Virginia\'s border with Maryland and D.C.'],
    standards: ['VS.1a', 'VS.1c'], related: ['place-alexandria', 'state-md', 'state-dc', 'water-chesapeake'] },

  { id: 'water-drummond', type: 'water', name: 'Lake Drummond', emoji: '🪞', tagline: 'A natural lake in the middle of a swamp', mapRef: { kind: 'water', id: 'drummond' },
    blurb: '<strong>Lake Drummond</strong> is one of only two natural lakes in Virginia. It sits in the heart of the <strong>Great Dismal Swamp</strong>, and its water is the color of tea.',
    body: ['Nobody is sure how the lake formed. Some scientists think a huge peat fire burned a hole in the swamp thousands of years ago; others think a meteor struck. Its dark, tea-colored water comes from the roots and leaves of the swamp trees.'],
    facts: ['One of Virginia\'s two natural lakes', 'About 3 miles across, but only about 6 feet deep', 'Surrounded by the Great Dismal Swamp'],
    standards: ['VS.1c'], related: ['water-dismal-swamp', 'region-coastal'] },

  { id: 'water-dismal-swamp', type: 'water', name: 'Great Dismal Swamp', emoji: '🌿', tagline: 'A wild wetland that was a refuge', mapRef: { kind: 'water', id: 'dismal-swamp' },
    blurb: 'The <strong>Great Dismal Swamp</strong> is a huge, wet forest that straddles the Virginia–North Carolina line. It is wild, hard to cross, and full of life. For centuries it was also a <strong>place of refuge</strong>.',
    body: [
      'For thousands of years, Indigenous people hunted and fished here. Later, people who had <strong>escaped slavery</strong> built hidden communities deep inside the swamp, where it was too wet and tangled for anyone to follow. Some families lived free there for generations.',
      'George Washington once owned part of the swamp and tried to drain it for farmland. The canal his company dug is still there. Today the swamp is a National Wildlife Refuge, home to black bears, bobcats, and more than 200 kinds of birds.'
    ],
    facts: ['Wetland in the Coastal Plain, shared with North Carolina', 'A refuge for Indigenous people and for people escaping slavery', 'Lake Drummond is at its center', 'Now a National Wildlife Refuge'],
    standards: ['VS.1c', 'VS.2d', 'VS.4c'], related: ['water-drummond', 'region-coastal'] },

  { id: 'place-fall-line', type: 'place', name: 'The Fall Line', emoji: '💦', tagline: 'Where the rivers tumble and the boats stop', mapRef: { kind: 'layer', id: 'fallLine' },
    blurb: 'The <strong>Fall Line</strong> is the natural border between the Coastal Plain and the Piedmont. It is the line where rivers drop off the hard rock of the Piedmont onto the soft plain in a series of <strong>waterfalls and rapids</strong>.',
    body: [
      'Sailing upriver from the ocean, a boat could go no farther than the Fall Line. So people unloaded there, and towns grew: <strong>Alexandria</strong> on the Potomac, <strong>Fredericksburg</strong> on the Rappahannock, <strong>Richmond</strong> on the James, and <strong>Petersburg</strong> on the Appomattox.',
      'That is why so many of Virginia\'s oldest cities line up along one north-to-south line.'
    ],
    facts: ['Border between Coastal Plain (Tidewater) and Piedmont', 'Cities on the Fall Line: Alexandria, Fredericksburg, Richmond, Petersburg', 'Rivers drop over rapids here, which stopped boats'],
    standards: ['VS.1b', 'VS.1c'], related: ['place-richmond', 'place-fredericksburg', 'place-alexandria', 'region-coastal', 'region-piedmont'] },

  /* ───────────── BORDERING STATES (VS.1a) ───────────── */
  { id: 'state-md', type: 'state', name: 'Maryland', emoji: '🧭', tagline: 'North, across the Potomac',
    blurb: '<strong>Maryland</strong> is Virginia\'s neighbor to the <strong>north</strong>. The Potomac River is the border, and Maryland shares the Chesapeake Bay and the Eastern Shore with Virginia.',
    body: ['Virginia and Maryland were both early English colonies, and they have argued about oysters, crabs, and the Potomac for 300 years.'], facts: ['Direction: north', 'Border: the Potomac River'], standards: ['VS.1a'], related: ['river-potomac', 'state-dc'] },
  { id: 'state-wv', type: 'state', name: 'West Virginia', emoji: '🧭', tagline: 'Northwest, over the mountains',
    blurb: '<strong>West Virginia</strong> lies to the <strong>northwest</strong>. It used to be part of Virginia. It broke away during the Civil War and became its own state in 1863.',
    body: ['The border runs along mountain ridges and the Big Sandy River. Many rivers that start in Virginia\'s mountains flow into West Virginia.'], facts: ['Direction: northwest / west', 'Was part of Virginia until 1863'], standards: ['VS.1a', 'VS.7d'], related: ['region-valley', 'region-plateau'] },
  { id: 'state-ky', type: 'state', name: 'Kentucky', emoji: '🧭', tagline: 'West, beyond the Cumberland Gap',
    blurb: '<strong>Kentucky</strong> touches Virginia\'s far <strong>western</strong> tip. Pioneers from Virginia walked through the Cumberland Gap to settle it, and it was part of Virginia until 1792.',
    body: ['Only a short stretch of the Appalachian Plateau touches Kentucky, but that stretch includes the famous Cumberland Gap.'], facts: ['Direction: west', 'Was part of Virginia until 1792'], standards: ['VS.1a', 'VS.6d'], related: ['place-cumberland-gap', 'region-plateau'] },
  { id: 'state-tn', type: 'state', name: 'Tennessee', emoji: '🧭', tagline: 'Southwest, along a straight line',
    blurb: '<strong>Tennessee</strong> is Virginia\'s neighbor to the <strong>southwest</strong>. The border is a straight line drawn by surveyors, and the town of Bristol sits right on it: one side of the main street is in Virginia, the other in Tennessee.',
    body: ['The Clinch, Holston, and Powell rivers all flow from Virginia into Tennessee.'], facts: ['Direction: southwest', 'Bristol straddles the border'], standards: ['VS.1a'], related: ['region-plateau', 'region-valley'] },
  { id: 'state-nc', type: 'state', name: 'North Carolina', emoji: '🧭', tagline: 'South, the longest border',
    blurb: '<strong>North Carolina</strong> is Virginia\'s neighbor to the <strong>south</strong>, along Virginia\'s longest border. The Great Dismal Swamp and Lake Gaston sit right on the line.',
    body: ['The border runs nearly straight for more than 300 miles, from the Atlantic Ocean to the mountains.'], facts: ['Direction: south', 'Shares the Great Dismal Swamp'], standards: ['VS.1a'], related: ['water-dismal-swamp'] },
  { id: 'state-dc', type: 'state', name: 'Washington, D.C.', emoji: '🏛️', tagline: 'The nation\'s capital, across the Potomac',
    blurb: '<strong>Washington, D.C.</strong> is not a state, but it borders Virginia to the <strong>northeast</strong>, across the Potomac River. Virginia gave up land to help create it in 1791, then took its part back in 1847.',
    body: ['Many Virginians in Arlington and Alexandria cross the river to work in the capital every day.'], facts: ['Direction: northeast', 'Border: the Potomac River'], standards: ['VS.1a'], related: ['river-potomac', 'state-md', 'place-alexandria'] },

  /* ───────────── PLACES FOR CHAPTER 1 ───────────── */
  { id: 'place-richmond', type: 'place', name: 'Richmond', emoji: '🏛️', tagline: 'State capital on the Fall Line', lat: 37.5407, lon: -77.4360,
    blurb: '<strong>Richmond</strong> is Virginia\'s capital. It grew where the James River tumbles over the Fall Line, at the border of the Piedmont and the Coastal Plain.',
    body: ['Richmond became the capital in 1780, after Jamestown and Williamsburg. Thomas Jefferson designed its State Capitol building, modeled on an ancient Roman temple.'],
    facts: ['Region: Piedmont (on the Fall Line)', 'River: the James', 'Capital since 1780'], standards: ['VS.1b', 'VS.1c', 'VS.5c'], related: ['region-piedmont', 'river-james', 'place-fall-line', 'place-chesterfield'] },
  { id: 'place-chesterfield', type: 'place', name: 'Chesterfield County', emoji: '📍', tagline: 'You are here', lat: 37.3771, lon: -77.5050,
    blurb: '<strong>Chesterfield County</strong> is home to Redeemer Episcopal Day School. It sits in the <strong>Piedmont</strong> region, just south of Richmond, between the James River and the Appomattox River.',
    body: ['The county was named in 1749 for an English earl. Its northern edge follows the James River, and its southern edge follows the Appomattox, so it is almost an island between two rivers.'],
    facts: ['Region: Piedmont', 'Rivers: the James (north) and the Appomattox (south)', 'Neighbor: Richmond'], standards: ['VS.1b'], related: ['region-piedmont', 'river-james', 'place-richmond'] },
  { id: 'place-alexandria', type: 'place', name: 'Alexandria', emoji: '⚓', tagline: 'Port city on the Potomac', lat: 38.8048, lon: -77.0469,
    blurb: '<strong>Alexandria</strong> is an old port city on the Potomac River, just across from Washington, D.C. Like Richmond and Fredericksburg, it sits on the Fall Line.',
    body: ['George Washington shopped and went to church here; his home, Mount Vernon, is a few miles downriver.'], facts: ['Region: Coastal Plain / Fall Line', 'River: the Potomac'], standards: ['VS.1c'], related: ['river-potomac', 'place-fall-line', 'state-dc'] },
  { id: 'place-fredericksburg', type: 'place', name: 'Fredericksburg', emoji: '🏘️', tagline: 'Fall Line town on the Rappahannock', lat: 38.3032, lon: -77.4605,
    blurb: '<strong>Fredericksburg</strong> grew where the Rappahannock River crosses the Fall Line, halfway between Richmond and Washington.',
    body: ['George Washington grew up on a farm across the river from town. In 1862 one of the Civil War\'s biggest battles was fought on its hills.'], facts: ['Region: Fall Line', 'River: the Rappahannock'], standards: ['VS.1c'], related: ['river-rappahannock', 'place-fall-line'] },
  { id: 'place-norfolk', type: 'place', name: 'Norfolk & Hampton Roads', emoji: '🚢', tagline: 'The biggest naval base in the world', lat: 36.8508, lon: -76.2859,
    blurb: '<strong>Hampton Roads</strong> is the great harbor where the James River meets the Chesapeake Bay. <strong>Norfolk</strong>, on its shore, is home to the largest naval base on Earth.',
    body: ['Deep, sheltered water that never freezes made this the perfect place for ships. Shipbuilding, the Navy, and the port are the region\'s biggest employers.'], facts: ['Region: Coastal Plain (Tidewater)', 'Water: the James River, Chesapeake Bay, Atlantic Ocean', 'Industries: the Navy, shipbuilding, shipping'], standards: ['VS.1c', 'VS.13a'], related: ['region-coastal', 'water-chesapeake', 'river-james'] },
  { id: 'place-eastern-shore', type: 'place', name: 'The Eastern Shore', emoji: '🐎', tagline: 'Part of Virginia, across the Bay', lat: 37.72, lon: -75.72,
    blurb: 'The <strong>Eastern Shore</strong> is the long peninsula across the Chesapeake Bay. It looks like it belongs to Maryland, but its southern part is <strong>Virginia</strong>.',
    body: ['A <strong>peninsula</strong> is land with water on three sides. The Eastern Shore has the Bay on one side and the Atlantic on the other. Farms, fishing boats, NASA\'s Wallops Island launch pad, and the wild ponies of Chincoteague are all here. The Chesapeake Bay Bridge-Tunnel connects it to the rest of Virginia.'],
    facts: ['Region: Coastal Plain (Tidewater)', 'A peninsula between the Bay and the Atlantic', 'Famous for Chincoteague ponies and seafood'], standards: ['VS.1b', 'VS.1c'], related: ['region-coastal', 'water-chesapeake', 'state-md'] },
  { id: 'place-roanoke', type: 'place', name: 'Roanoke', emoji: '🚂', tagline: 'Railroad city in the valley', lat: 37.2710, lon: -79.9414,
    blurb: '<strong>Roanoke</strong> is the biggest city in western Virginia. It sits in a valley where the Blue Ridge meets the Valley and Ridge region, and it grew up around the railroad.',
    body: ['Trains carrying coal from the plateau to the coast passed through here, and the town boomed.'], facts: ['Region: Valley and Ridge (edge of the Blue Ridge)', 'River: the Roanoke'], standards: ['VS.1b', 'VS.9a'], related: ['region-valley', 'region-blueridge'] },
  { id: 'place-cumberland-gap', type: 'place', name: 'Cumberland Gap', emoji: '🚪', tagline: 'The doorway to the West', lat: 36.6037, lon: -83.6753,
    blurb: 'The <strong>Cumberland Gap</strong> is a natural notch in the mountains at Virginia\'s far western tip, where Virginia, Kentucky, and Tennessee meet.',
    body: ['Daniel Boone blazed the Wilderness Road through it in 1775, and hundreds of thousands of settlers walked through on their way west.'], facts: ['Region: Appalachian Plateau', 'Three states meet here'], standards: ['VS.1a', 'VS.6d'], related: ['region-plateau', 'state-ky', 'state-tn'] },
]);
