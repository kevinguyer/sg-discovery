/* Virginia Explorer — content: Virginia's Indigenous People (VS.2)
   Chapter 2. Standards VS.2a–e. Reading level grades 4–5.
   Tone follows the school's guidance: factual, respectful, present tense for living nations.
   Tribal-center coordinates are approximate (county seat or tribal center), marked in each node.
*/
VA.add([
  /* ───────────── LANGUAGE GROUPS (VS.2b, VS.2c) ───────────── */
  { id: 'lang-algonquian', type: 'tribe', name: 'Algonquian speakers', emoji: '🌊', tagline: 'Tidewater people of rivers and the Bay', mapRef: { kind: 'overlay', id: 'algonquian' },
    blurb: 'The <strong>Algonquian</strong> language group lived mainly in the <strong>Coastal Plain (Tidewater)</strong>, along the rivers and the Chesapeake Bay. The <strong>Powhatan</strong> people, whom the English met at Jamestown, spoke an Algonquian language.',
    body: [
      'Around 1600, about thirty Algonquian-speaking tribes in the Tidewater were joined together under one paramount chief, <strong>Powhatan</strong> (his own name was Wahunsenacawh). Historians call this the Powhatan Chiefdom. His capital was <strong>Werowocomoco</strong> on the York River.',
      'Algonquian-speaking people fished the rivers, gathered oysters from the Bay, farmed corn, beans, and squash, and traveled by dugout canoe. Many of Virginia\'s recognized tribes today, like the Pamunkey, Mattaponi, Chickahominy, Rappahannock, and Nansemond, descend from them.'
    ],
    facts: ['<b>Where:</b> Coastal Plain (Tidewater), including the Eastern Shore', '<b>Nations:</b> Powhatan, Pamunkey, Mattaponi, Chickahominy, Rappahannock, Nansemond, and many more', '<b>Famous people:</b> Chief Powhatan, Pocahontas, Opechancanough'],
    standards: ['VS.2b', 'VS.2c', 'VS.2d'], related: ['place-werowocomoco', 'person-powhatan', 'region-coastal', 'tribe-pamunkey', 'tribe-chickahominy'] },

  { id: 'lang-siouan', type: 'tribe', name: 'Siouan speakers', emoji: '🌾', tagline: 'Piedmont people of the hills', mapRef: { kind: 'overlay', id: 'siouan' },
    blurb: 'The <strong>Siouan</strong> language group lived mainly in the <strong>Piedmont</strong>, the rolling hills west of the Fall Line. The <strong>Monacan</strong> and <strong>Manahoac</strong> people spoke Siouan languages.',
    body: [
      'Siouan-speaking people built villages along the upper James and Rappahannock rivers, farmed the river bottoms, and hunted in the hills. They and the Powhatan people were often rivals, and the Fall Line was something like a border between them.',
      'The <strong>Monacan Indian Nation</strong>, based today at Bear Mountain in Amherst County, is the largest of Virginia\'s Siouan-descended tribes and one of the seven federally recognized tribes in Virginia.'
    ],
    facts: ['<b>Where:</b> Piedmont, into the Blue Ridge', '<b>Nations:</b> Monacan, Manahoac, Saponi, Tutelo', '<b>Today:</b> the Monacan Indian Nation, Amherst County'],
    standards: ['VS.2b', 'VS.2c'], related: ['tribe-monacan', 'region-piedmont', 'place-fall-line'] },

  { id: 'lang-iroquoian', type: 'tribe', name: 'Iroquoian speakers', emoji: '⛰️', tagline: 'Mountain people of the southwest, and the Nottoway country in the south', mapRef: { kind: 'overlay', id: 'iroquoian' },
    blurb: 'The <strong>Iroquoian</strong> language group lived in two parts of Virginia: the <strong>far southwest</strong> mountains, home of the <strong>Cherokee</strong>, and the <strong>south</strong> near what is now North Carolina, home of the <strong>Nottoway</strong> and <strong>Meherrin</strong>.',
    body: [
      'Iroquoian languages are related to the languages of the powerful Iroquois nations far to the north in New York. The Cherokee hunted and farmed the valleys of the Appalachian Plateau and the Valley and Ridge. The Nottoway and Meherrin lived along the rivers that still carry their names, on the edge of the Great Dismal Swamp country.',
      'Two Nottoway tribes are recognized by Virginia today: the <strong>Cheroenhaka (Nottoway)</strong> and the <strong>Nottoway Indian Tribe of Virginia</strong>, both in Southampton County.'
    ],
    facts: ['<b>Where:</b> the far southwest (Cherokee) and the south near North Carolina (Nottoway, Meherrin)', '<b>Nations:</b> Cherokee, Nottoway, Meherrin', '<b>Today:</b> two Nottoway tribes in Southampton County'],
    standards: ['VS.2b', 'VS.2c'], related: ['tribe-cheroenhaka', 'tribe-nottoway', 'region-plateau', 'water-dismal-swamp'] },

  /* ───────────── ARCHAEOLOGY (VS.2a) ───────────── */
  { id: 'place-werowocomoco', type: 'place', name: 'Werowocomoco', emoji: '🏛️', tagline: 'Capital of the Powhatan Chiefdom', lat: 37.4133, lon: -76.6467,
    blurb: '<strong>Werowocomoco</strong> was the capital of the Powhatan Chiefdom, on the north bank of the York River (which the Powhatan people called the Pamunkey). Chief Powhatan lived here when the English arrived in 1607.',
    body: [
      'The site was lost for almost 400 years. In 2003, archaeologists confirmed its location in Gloucester County and began careful digs, working alongside Virginia\'s tribes.',
      'They found pottery, stone tools, and copper and glass beads that came from trade with the English. They also found two long, curving <strong>ditches</strong> that marked off a special part of the town, and evidence of a very large building. Together these show that Werowocomoco was an important place for hundreds of years before Powhatan, and that decisions for the whole chiefdom were made here.',
      'Today the site is protected as part of the National Park Service, with the tribes helping to decide how it is studied and shared.'
    ],
    facts: ['River: the York (Pamunkey), Gloucester County', 'Home of Chief Powhatan in 1607', 'Rediscovered by archaeologists in 2003', 'Now cared for by the National Park Service with Virginia\'s tribes'],
    standards: ['VS.2a', 'VS.2d', 'VS.3d'], related: ['person-powhatan', 'lang-algonquian', 'river-york', 'place-cactus-hill'] },

  { id: 'place-cactus-hill', type: 'place', name: 'Cactus Hill', emoji: '🪨', tagline: 'One of the oldest human sites in the Americas', lat: 36.87, lon: -77.09,
    blurb: '<strong>Cactus Hill</strong>, on the Nottoway River in Sussex County, is a sandy hill where archaeologists have found stone tools that may be <strong>15,000 to 18,000 years old</strong>. That makes it one of the oldest places where people are known to have lived in all of the Americas.',
    body: [
      'Digging down through the sand, archaeologists found layer after layer of stone blades, scrapers, and charcoal from ancient fires. The deeper the layer, the older it is. The deepest tools are older than the famous "Clovis" tools once thought to be the first in America.',
      'Cactus Hill shows that people have lived in Virginia for at least 15,000 years, long before the last Ice Age ended.'
    ],
    facts: ['River: the Nottoway, Sussex County', 'Tools up to 15,000–18,000 years old', 'Coordinates on this map are approximate; the site is on private land'],
    standards: ['VS.2a'], related: ['place-werowocomoco', 'region-coastal'] },

  /* ───────────── PEOPLE (VS.2a, VS.2d, VS.2e) ───────────── */
  { id: 'person-powhatan', type: 'person', name: 'Chief Powhatan (Wahunsenacawh)', emoji: '👑', tagline: 'Paramount chief of about thirty tribes', born: 'c. 1547', died: '1618',
    blurb: '<strong>Powhatan</strong>, whose own name was <strong>Wahunsenacawh</strong>, was the paramount chief of the Powhatan Chiefdom when the English arrived. He ruled about thirty Algonquian-speaking tribes from his capital at Werowocomoco.',
    body: [
      'Powhatan inherited six tribes and, through war and diplomacy, built a chiefdom that stretched across most of the Tidewater. Each tribe kept its own chief (a <em>werowance</em>) who answered to him.',
      'He was the father of Pocahontas. His decisions about whether to trade with, tolerate, or fight the Jamestown colonists shaped the colony\'s first years. You will meet him again in Chapter 3.'
    ],
    facts: ['Capital: Werowocomoco, on the York River', 'Language group: Algonquian', 'Father of Pocahontas'],
    standards: ['VS.2d', 'VS.3d'], related: ['place-werowocomoco', 'lang-algonquian'] },

  { id: 'person-thomasina-jordan', type: 'person', name: 'Thomasina E. Jordan', emoji: '✊', tagline: 'Champion of recognition for Virginia\'s tribes', born: '1940', died: '1999',
    blurb: '<strong>Thomasina E. Jordan</strong> was a member of the Mashpee Wampanoag Tribe of Massachusetts who made Virginia her home and spent her life working so that Virginia\'s tribes would be officially <strong>recognized</strong> by the state and the United States.',
    body: [
      'She chaired the Virginia Council on Indians and was made an honorary member of the Chickahominy and Nansemond tribes. She argued that Virginia\'s tribes, some of the first to meet English colonists, deserved the same recognition as tribes in other states.',
      'She did not live to see it. But in 2018 Congress passed the <strong>Thomasina E. Jordan Indian Tribes of Virginia Federal Recognition Act</strong>, named in her honor, which recognized six Virginia tribes at once.'
    ],
    facts: ['Mashpee Wampanoag by birth; honorary Chickahominy and Nansemond', 'Chair of the Virginia Council on Indians', 'The 2018 federal recognition law carries her name'],
    standards: ['VS.2e'], related: ['event-recognition-2018', 'tribe-chickahominy', 'tribe-nansemond'] },

  /* ───────────── EVENTS ───────────── */
  { id: 'event-recognition-2018', type: 'event', name: 'Federal recognition of six Virginia tribes', emoji: '📜', tagline: 'January 29, 2018', year: 2018,
    blurb: 'In 2018 the United States government officially <strong>recognized</strong> six Virginia tribes: the Chickahominy, Chickahominy Eastern Division, Upper Mattaponi, Rappahannock, Nansemond, and Monacan. The Pamunkey had been recognized in 2015.',
    body: [
      'Recognition means the U.S. government accepts a tribe as a <strong>sovereign nation</strong>, a self-governing people with its own leaders and laws. It took Virginia\'s tribes many decades of work to win it, partly because old Virginia records had erased their identity on paper.',
      'Virginia itself recognizes eleven tribes. Recognition matters for pride, for protecting sacred places like Werowocomoco, and for access to programs for education and health.'
    ],
    facts: ['7 federally recognized tribes in Virginia (as of 2018)', '11 state-recognized tribes', 'Named for Thomasina E. Jordan'],
    standards: ['VS.2e'], related: ['person-thomasina-jordan', 'tribe-monacan', 'tribe-pamunkey'] },

  /* ───────────── NATIONS TODAY (VS.2e) — Central Virginia first, per Sandra ───────────── */
  { id: 'tribe-pamunkey', type: 'tribe', name: 'Pamunkey Indian Tribe', emoji: '🏞️', tagline: 'Oldest reservation in the country · King William County', lat: 37.58, lon: -77.03, recognized: 'federal 2015',
    blurb: 'The <strong>Pamunkey</strong> live on a reservation along the Pamunkey River in King William County that dates from treaties in the <strong>1600s</strong>, making it one of the two oldest reservations in the United States. Chief Powhatan himself was Pamunkey.',
    body: ['The Pamunkey are known for pottery made from river clay, a tradition that goes back thousands of years, and for a fish hatchery that helps shad return to the river. In 2015 they became the first Virginia tribe to win federal recognition.'],
    facts: ['Language group: Algonquian', 'Reservation from the 1600s (treaties of 1646 and 1677)', 'First Virginia tribe federally recognized, 2015', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-algonquian', 'person-powhatan', 'tribe-mattaponi'] },
  { id: 'tribe-mattaponi', type: 'tribe', name: 'Mattaponi Indian Tribe', emoji: '🐟', tagline: 'Reservation on the Mattaponi River · King William County', lat: 37.65, lon: -76.93, recognized: 'state',
    blurb: 'The <strong>Mattaponi</strong> reservation sits on the Mattaponi River, a few miles from the Pamunkey. It, too, dates from the 1600s. The tribe runs a fish hatchery and a museum and still delivers a yearly tribute of game to Virginia\'s governor, as the old treaties promised.',
    body: ['Every November, the Pamunkey and Mattaponi chiefs bring deer or turkey to the Governor\'s Mansion in Richmond instead of paying taxes, keeping a promise made in 1677.'],
    facts: ['Language group: Algonquian', 'Reservation from the 1600s', 'State recognized', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-algonquian', 'tribe-pamunkey', 'tribe-upper-mattaponi'] },
  { id: 'tribe-upper-mattaponi', type: 'tribe', name: 'Upper Mattaponi Indian Tribe', emoji: '🌲', tagline: 'King William County', lat: 37.80, lon: -77.15, recognized: 'federal 2018',
    blurb: 'The <strong>Upper Mattaponi</strong> live farther up the Mattaponi River in King William County. Their tribal center is the old Sharon Indian School, the only public school building for Native students still standing in Virginia.',
    body: ['Federally recognized in 2018.'], facts: ['Language group: Algonquian', 'Federally recognized 2018', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-algonquian', 'tribe-mattaponi'] },
  { id: 'tribe-chickahominy', type: 'tribe', name: 'Chickahominy Indian Tribe', emoji: '🌽', tagline: 'Charles City County, on the Chickahominy River', lat: 37.43, lon: -77.06, recognized: 'federal 2018',
    blurb: 'The <strong>Chickahominy</strong>, "coarse ground corn people," live in Charles City County near the river that carries their name, less than an hour from Chesterfield. Around 1600 they were an independent tribe that traded with, but did not belong to, Powhatan\'s chiefdom.',
    body: ['Their fall powwow, held every September, is one of the largest in Virginia and is open to everyone. Federally recognized in 2018.'],
    facts: ['Language group: Algonquian', 'Federally recognized 2018', 'Home of a large yearly powwow', 'Tribal center location is approximate'],
    standards: ['VS.2c', 'VS.2e'], related: ['lang-algonquian', 'tribe-chickahominy-eastern', 'person-thomasina-jordan'] },
  { id: 'tribe-chickahominy-eastern', type: 'tribe', name: 'Chickahominy Indians Eastern Division', emoji: '🌽', tagline: 'New Kent County', lat: 37.50, lon: -76.98, recognized: 'federal 2018',
    blurb: 'The <strong>Chickahominy Eastern Division</strong> is a related tribe centered in New Kent County. Federally recognized in 2018.',
    body: [], facts: ['Language group: Algonquian', 'Federally recognized 2018', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['tribe-chickahominy'] },
  { id: 'tribe-monacan', type: 'tribe', name: 'Monacan Indian Nation', emoji: '⛰️', tagline: 'Bear Mountain, Amherst County · Central Virginia', lat: 37.55, lon: -79.10, recognized: 'federal 2018',
    blurb: 'The <strong>Monacan Indian Nation</strong> is the largest tribe in Virginia and the only federally recognized one descended from Siouan speakers. Its home is <strong>Bear Mountain</strong> in Amherst County, in the Blue Ridge foothills west of Charlottesville.',
    body: ['Around 1600 the Monacan lived along the upper James River in the Piedmont. Today the nation runs a museum and a tribal center at Bear Mountain and hosts a yearly powwow. Federally recognized in 2018.'],
    facts: ['Language group: Siouan', 'Largest tribe in Virginia', 'Federally recognized 2018', 'Tribal center location is approximate'],
    standards: ['VS.2c', 'VS.2e'], related: ['lang-siouan', 'region-piedmont', 'event-recognition-2018'] },
  { id: 'tribe-rappahannock', type: 'tribe', name: 'Rappahannock Tribe', emoji: '🛶', tagline: 'Indian Neck, King and Queen County', lat: 37.83, lon: -76.86, recognized: 'federal 2018',
    blurb: 'The <strong>Rappahannock</strong> take their name from the river. Their tribal center is at Indian Neck in King and Queen County. In 2022 they regained ownership of Fones Cliffs, a sacred stretch of the Rappahannock River.',
    body: ['Federally recognized in 2018.'], facts: ['Language group: Algonquian', 'Federally recognized 2018', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-algonquian', 'river-rappahannock'] },
  { id: 'tribe-nansemond', type: 'tribe', name: 'Nansemond Indian Nation', emoji: '🦪', tagline: 'Suffolk, near the Great Dismal Swamp', lat: 36.75, lon: -76.60, recognized: 'federal 2018',
    blurb: 'The <strong>Nansemond</strong> lived along the Nansemond River near the Great Dismal Swamp. Their tribal center is in Suffolk, where they are rebuilding a village site called Mattanock Town.',
    body: ['Federally recognized in 2018.'], facts: ['Language group: Algonquian', 'Federally recognized 2018', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-algonquian', 'water-dismal-swamp', 'person-thomasina-jordan'] },
  { id: 'tribe-patawomeck', type: 'tribe', name: 'Patawomeck Indian Tribe', emoji: '🏛️', tagline: 'Stafford County, on the Potomac', lat: 38.35, lon: -77.30, recognized: 'state',
    blurb: 'The <strong>Patawomeck</strong> lived along the Potomac River, which is named for them. State recognized in 2010.',
    body: [], facts: ['Language group: Algonquian', 'State recognized 2010', 'The Potomac River carries their name', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-algonquian', 'river-potomac'] },
  { id: 'tribe-cheroenhaka', type: 'tribe', name: 'Cheroenhaka (Nottoway) Indian Tribe', emoji: '🌿', tagline: 'Southampton County', lat: 36.72, lon: -77.10, recognized: 'state',
    blurb: 'The <strong>Cheroenhaka (Nottoway)</strong> are Iroquoian-descended people of Southampton County, on the Nottoway River. State recognized in 2010.',
    body: [], facts: ['Language group: Iroquoian', 'State recognized 2010', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-iroquoian', 'tribe-nottoway'] },
  { id: 'tribe-nottoway', type: 'tribe', name: 'Nottoway Indian Tribe of Virginia', emoji: '🌿', tagline: 'Southampton County', lat: 36.75, lon: -77.22, recognized: 'state',
    blurb: 'The <strong>Nottoway Indian Tribe of Virginia</strong> is a second Iroquoian-descended tribe in Southampton County. State recognized in 2010.',
    body: [], facts: ['Language group: Iroquoian', 'State recognized 2010', 'Tribal center location is approximate'],
    standards: ['VS.2e'], related: ['lang-iroquoian', 'tribe-cheroenhaka'] },
]);
