/* Virginia Explorer — content: Jamestown (VS.3)
   Chapter 3. Standards VS.3a–g. Reading level grades 4–5.
   Enslavement and colonization are told plainly and factually (school guidance, 2026-09-06).
   Events carry `year` (+ `month`) so VA.renderTimeline can place them; `short` is the timeline label.
*/
VA.add([
  /* ───────────── PLACES ───────────── */
  { id: 'place-jamestown', type: 'place', name: 'Jamestown', emoji: '⛵', tagline: 'First permanent English settlement in North America, 1607', lat: 37.2098, lon: -76.7794,
    blurb: 'On <strong>May 14, 1607</strong>, 104 English men and boys landed on a low island in the James River and built a three-sided fort. They named it <strong>Jamestown</strong> after King James I. It became the first English settlement in North America that lasted.',
    body: [
      'The colonists chose the island because the river was deep right up to the bank (ships could tie to the trees), it was far enough upriver to spot Spanish ships coming, it could be defended from three sides, and no Powhatan town was already on it.',
      'It was also low, swampy, and full of mosquitoes, and the river water turned salty and dirty in summer. Those choices helped the colony survive attack and helped make it sick.',
      'Jamestown was Virginia\'s capital until 1699. Today it is a historic site where archaeologists have uncovered the original fort.'
    ],
    facts: ['Region: Coastal Plain (Tidewater)', 'River: the James', 'Capital of Virginia 1607–1699', 'The original fort was found by archaeologists in 1994'],
    standards: ['VS.3b', 'VS.3e'], related: ['place-cape-henry', 'place-point-comfort', 'org-virginia-company', 'person-john-smith', 'event-landing-1607'] },
  { id: 'place-cape-henry', type: 'place', name: 'Cape Henry', emoji: '🌅', tagline: 'First landing, April 26, 1607', lat: 36.93, lon: -76.01,
    blurb: '<strong>Cape Henry</strong> is the sandy point where the Chesapeake Bay meets the Atlantic. The three ships of 1607 first touched Virginia here on <strong>April 26</strong>, after four months at sea. The colonists raised a cross, explored, were attacked by local warriors, and sailed on to find a safer spot.',
    body: ['The Virginia Company\'s instructions told them not to settle right on the coast, where Spanish ships could find them. So they went up the river they named the James.'],
    facts: ['Where the Bay meets the Atlantic', 'First landfall, April 26, 1607', 'Named for Prince Henry, the king\'s son'],
    standards: ['VS.3b'], related: ['place-jamestown', 'water-atlantic', 'water-chesapeake', 'event-landing-1607'] },
  { id: 'place-point-comfort', type: 'place', name: 'Point Comfort (Fort Monroe)', emoji: '🏰', tagline: 'Where the first Africans arrived, August 1619', lat: 37.0060, lon: -76.3084,
    blurb: '<strong>Point Comfort</strong> is the tip of land where the James River meets the Bay. The 1607 colonists named it because they found "good comfort" in its deep water. In <strong>August 1619</strong> the first Africans brought to Virginia were landed here from the ship <em>White Lion</em>.',
    body: ['Later a huge stone fort, Fort Monroe, was built on the point. During the Civil War it became a place where enslaved people escaped to freedom, which is why it is sometimes called "Freedom\'s Fortress."'],
    facts: ['Where the James meets the Chesapeake Bay', 'First Africans in Virginia landed here, 1619', 'Later Fort Monroe, now a national monument'],
    standards: ['VS.3f'], related: ['event-africans-1619', 'place-jamestown', 'river-james'] },

  /* ───────────── ORGANIZATION & DOCUMENT ───────────── */
  { id: 'org-virginia-company', type: 'org', name: 'The Virginia Company of London', emoji: '💰', tagline: 'Investors who paid for the colony',
    blurb: 'The <strong>Virginia Company of London</strong> was a business. Wealthy <strong>investors</strong> put money in, hoping the colony would send back gold, silver, timber, and other goods and make them rich. The Company hired the ships, chose the leaders, and wrote the rules.',
    body: [
      'England was competing with Spain, France, and other countries to build empires. A colony could supply <strong>natural resources</strong> England was running short of, open <strong>new markets</strong> for English goods, and maybe find <strong>gold and silver</strong> like the Spanish had.',
      'For years the colony lost money. Tobacco finally made it pay, but the Company itself went broke, and in 1624 the king took Virginia over as a <strong>royal colony</strong>.'
    ],
    facts: ['A company of investors, not the king, founded Jamestown', 'Goals: wealth, power, resources, markets, gold', 'Went broke; Virginia became a royal colony in 1624'],
    standards: ['VS.3a', 'VS.3c'], related: ['document-charter-1606', 'place-jamestown', 'idea-tobacco'] },
  { id: 'document-charter-1606', type: 'document', name: 'The Virginia Company Charter (April 10, 1606)', emoji: '📜', tagline: 'The king\'s permission slip',
    blurb: 'A <strong>charter</strong> is an official paper from a king giving a group permission to do something. On <strong>April 10, 1606</strong>, King James I gave the Virginia Company a charter to settle the land England called Virginia.',
    body: [
      'The charter did two big things. It let the Company build a colony and govern it. And it promised that colonists and their children would keep <strong>all the rights of English people</strong>, just as if they had stayed in England.',
      'That promise mattered for a long time. Nearly 170 years later, Virginians would say the king had broken it, and that would help start a revolution.'
    ],
    facts: ['Granted by King James I, April 10, 1606', 'Gave the Virginia Company the right to settle Virginia', 'Promised colonists the rights of English people'],
    standards: ['VS.3c'], related: ['org-virginia-company', 'event-charter-1606', 'event-assembly-1619'] },
  { id: 'idea-tobacco', type: 'idea', name: 'Tobacco: the cash crop', emoji: '🌿', tagline: 'The crop that saved the colony and changed everything',
    blurb: 'A <strong>cash crop</strong> is a crop grown to sell, not to eat. In 1612 <strong>John Rolfe</strong> planted a sweet kind of tobacco from the Caribbean. England loved it. Within a few years Virginians were planting tobacco in every field, even in the streets of Jamestown.',
    body: [
      'Tobacco made the colony <strong>profitable</strong> at last. It also needed enormous amounts of land and labor. That hunger for labor is why the colony came to rely on indentured servants and then, more and more, on <strong>enslaved Africans</strong>. Tobacco shaped Virginia for the next 250 years.'
    ],
    facts: ['First profitable crop, 1612–1614', 'Needed lots of land and lots of workers', 'Led the colony to rely on enslaved labor'],
    standards: ['VS.3e', 'VS.4a', 'VS.4c'], related: ['person-john-rolfe', 'org-virginia-company', 'event-africans-1619'] },

  /* ───────────── PEOPLE ───────────── */
  { id: 'person-john-smith', type: 'person', name: 'Captain John Smith', emoji: '🧭', tagline: '"He that will not work shall not eat"', born: '1580', died: '1631',
    blurb: '<strong>Captain John Smith</strong> was a soldier and explorer who became president of the Jamestown council in 1608. His rule was simple: <strong>he that will not work shall not eat</strong>. He made the colonists plant crops, dig wells, and build shelter, and he traded with the Powhatan for corn.',
    body: [
      'Smith explored and mapped the Chesapeake Bay; his map was used for a century. In December 1607 he was captured and brought before Chief Powhatan. Smith later wrote that Pocahontas saved his life; historians are not sure exactly what happened, and the Powhatan side of the story was never written down.',
      'In 1609 Smith was badly burned in a gunpowder accident and sailed home. The winter after he left was the worst the colony ever had.'
    ],
    facts: ['President of the colony, 1608–1609', 'Traded with the Powhatan for food', 'Mapped the Chesapeake Bay', 'Left Virginia in 1609 and never returned'],
    standards: ['VS.3d', 'VS.3e'], related: ['person-powhatan', 'person-pocahontas', 'event-smith-president-1608', 'event-starving-time'] },
  { id: 'person-pocahontas', type: 'person', name: 'Pocahontas (Matoaka)', emoji: '🕊️', tagline: 'Daughter of Powhatan, a bridge between two peoples', born: 'c. 1596', died: '1617',
    blurb: '<strong>Pocahontas</strong> was a nickname; her name was <strong>Matoaka</strong>. She was the daughter of Chief Powhatan and, as a girl, often visited Jamestown, bringing food and messages during the years when the Powhatan helped the colonists survive.',
    body: [
      'In 1613 the English captured her and held her at Jamestown. She learned English, was baptized with the name Rebecca, and in 1614 married the tobacco planter <strong>John Rolfe</strong>. Their marriage brought several years of peace between the Powhatan and the colony.',
      'In 1616 she traveled to England, where she was presented to the king. She died there in 1617, at about 21, and is buried in Gravesend, England. Her son, Thomas Rolfe, returned to Virginia.'
    ],
    facts: ['Daughter of Chief Powhatan', 'Married John Rolfe in 1614; the "Peace of Pocahontas"', 'Died in England in 1617', 'Many Virginians today trace their families to her'],
    standards: ['VS.3d'], related: ['person-powhatan', 'person-john-rolfe', 'person-john-smith', 'place-werowocomoco'] },
  { id: 'person-john-rolfe', type: 'person', name: 'John Rolfe', emoji: '🌿', tagline: 'The man who planted tobacco', born: '1585', died: '1622',
    blurb: '<strong>John Rolfe</strong> arrived in 1610 after surviving a shipwreck in Bermuda. In 1612 he planted a milder tobacco from the Caribbean that English buyers wanted. It became Virginia\'s first <strong>cash crop</strong>. In 1614 he married Pocahontas.',
    body: ['Rolfe also wrote the letter that recorded the arrival of the first Africans in 1619: "20 and odd Negroes" landed at Point Comfort.'],
    facts: ['Planted the first profitable tobacco, 1612', 'Married Pocahontas, 1614', 'Recorded the arrival of the first Africans, 1619'],
    standards: ['VS.3e', 'VS.3f'], related: ['idea-tobacco', 'person-pocahontas', 'event-africans-1619'] },
  { id: 'person-christopher-newport', type: 'person', name: 'Captain Christopher Newport', emoji: '⚓', tagline: 'Commander of the three ships', born: '1561', died: '1617',
    blurb: '<strong>Christopher Newport</strong> commanded the <em>Susan Constant</em>, <em>Godspeed</em>, and <em>Discovery</em> on the 1607 voyage and made several more trips carrying supplies and new colonists. He had lost an arm fighting the Spanish.',
    body: [], facts: ['Commanded the 1607 voyage', 'Ships: Susan Constant, Godspeed, Discovery', 'Made five voyages to Virginia'],
    standards: ['VS.3b'], related: ['event-voyage-1606', 'place-cape-henry'] },

  /* ───────────── EVENTS (timeline) ───────────── */
  { id: 'event-charter-1606', type: 'event', name: 'King James grants the charter', short: 'The charter', emoji: '📜', year: 1606, month: 4,
    blurb: 'April 10, 1606: King James I gives the Virginia Company of London permission to settle Virginia. The colony is on paper.', body: [], facts: [], standards: ['VS.3c'], related: ['document-charter-1606', 'org-virginia-company'] },
  { id: 'event-voyage-1606', type: 'event', name: 'Three ships leave London', short: 'Ships sail', emoji: '⛵', year: 1606, month: 12,
    blurb: 'December 20, 1606: the <em>Susan Constant</em>, <em>Godspeed</em>, and <em>Discovery</em> leave England with 104 men and boys. The trip takes more than four months.', body: [], facts: [], standards: ['VS.3b'], related: ['person-christopher-newport'] },
  { id: 'event-landing-1607', type: 'event', name: 'Landing at Jamestown', short: 'Jamestown founded', emoji: '🏝️', year: 1607, month: 5,
    blurb: 'April 26: first landfall at Cape Henry. May 14: the colonists land on Jamestown Island and start building a fort.', body: [], facts: [], standards: ['VS.3b'], related: ['place-jamestown', 'place-cape-henry'] },
  { id: 'event-smith-captured-1607', type: 'event', name: 'John Smith is captured', short: 'Smith meets Powhatan', emoji: '👑', year: 1607, month: 12,
    blurb: 'December 1607: while exploring, John Smith is captured and brought to Chief Powhatan at Werowocomoco. He is released a few weeks later. Smith later said Pocahontas saved him.', body: [], facts: [], standards: ['VS.3d'], related: ['person-john-smith', 'person-powhatan', 'place-werowocomoco'] },
  { id: 'event-smith-president-1608', type: 'event', name: '"He that will not work shall not eat"', short: 'Smith takes charge', emoji: '🧭', year: 1608, month: 9,
    blurb: 'September 1608: John Smith becomes president. Everyone works. He trades with the Powhatan for corn and the colony gets through the winter with few deaths.', body: [], facts: [], standards: ['VS.3e'], related: ['person-john-smith'] },
  { id: 'event-starving-time', type: 'event', name: 'The Starving Time', short: 'Starving Time', emoji: '❄️', year: 1609, month: 11,
    blurb: 'Winter 1609–1610: Smith has gone home, the Powhatan stop trading, and the fort is under siege. Of about 500 colonists, only around 60 survive. In spring they abandon Jamestown, and are turned back by a new governor\'s supply ships at the river\'s mouth.', body: [], facts: [], standards: ['VS.3e'], related: ['person-john-smith', 'place-jamestown'] },
  { id: 'event-tobacco-1612', type: 'event', name: 'Rolfe plants tobacco', short: 'Tobacco', emoji: '🌿', year: 1612,
    blurb: '1612: John Rolfe grows a sweet Caribbean tobacco. By 1614 the first shipment sells in England. The colony has a cash crop.', body: [], facts: [], standards: ['VS.3e'], related: ['idea-tobacco', 'person-john-rolfe'] },
  { id: 'event-rolfe-pocahontas-1614', type: 'event', name: 'Pocahontas marries John Rolfe', short: 'The marriage', emoji: '🕊️', year: 1614, month: 4,
    blurb: 'April 1614: Pocahontas (Matoaka) marries John Rolfe at Jamestown. Years of peace between the Powhatan and the English follow.', body: [], facts: [], standards: ['VS.3d'], related: ['person-pocahontas', 'person-john-rolfe'] },
  { id: 'event-land-1616', type: 'event', name: 'Colonists get their own land', short: 'Own land', emoji: '🏡', year: 1616,
    blurb: 'Starting around 1616 the Company lets colonists own land instead of working only for the Company. Later the "headright" gave 50 acres to anyone who paid a person\'s passage. People work harder for land that is theirs.', body: [], facts: [], standards: ['VS.3e'], related: ['org-virginia-company', 'idea-tobacco'] },
  { id: 'event-assembly-1619', type: 'event', name: 'The first General Assembly meets', short: 'General Assembly', emoji: '🏛️', year: 1619, month: 7,
    blurb: 'July 30, 1619: in the church at Jamestown, the governor, his council, and 22 elected <strong>burgesses</strong> (two from each of 11 settlements) meet as the <strong>General Assembly</strong>, the first elected law-making body in English America.',
    body: [
      'Only free English men who owned land could vote or serve. Women, Indigenous people, Africans, and servants could not. Still, it was the first time colonists had a say in their own laws, and Virginia\'s General Assembly has met ever since, the oldest legislature in the Americas.',
      'The governor\'s council was made up of the wealthiest men in the colony, appointed for life. Over time the elected burgesses became the <strong>House of Burgesses</strong> and gained more power.'
    ],
    facts: ['July 30, 1619, in the Jamestown church', 'Governor + council + 22 burgesses', 'First representative legislature in English America', 'Still meets today as the Virginia General Assembly'],
    standards: ['VS.3g'], related: ['document-charter-1606', 'place-jamestown'] },
  { id: 'event-africans-1619', type: 'event', name: 'The first Africans arrive', short: 'First Africans', emoji: '⛓️', year: 1619, month: 8,
    blurb: 'Late August 1619: an English pirate ship, the <em>White Lion</em>, lands "20 and odd" Africans at Point Comfort and trades them for food. They had been captured in the <strong>Kingdom of Ndongo</strong>, in the Angola region of West Central Africa, and taken from a Portuguese slave ship.',
    body: [
      'These men and women were free people in their homeland. They were farmers, herders, and skilled workers, and they came from a region with rivers and a warm climate much like Virginia\'s Tidewater. In Virginia they were forced to work; some were treated as indentured servants who might one day be free, but over the following decades the colony passed laws that made slavery lifelong and based on race.',
      'Their arrival is remembered as the beginning of African American history in the English colonies.'
    ],
    facts: ['August 1619, Point Comfort', 'From Ndongo, in the Angola region of Africa', 'Free people, captured and forcibly transported', 'The colony later made slavery lifelong and race-based'],
    standards: ['VS.3f', 'VS.4c'], related: ['place-point-comfort', 'idea-tobacco', 'person-john-rolfe'] },
  { id: 'event-women-1620', type: 'event', name: 'English women arrive', short: 'Women arrive', emoji: '👒', year: 1620,
    blurb: '1620: the Company sends about 90 young women to Virginia, and more follow. A few women had come earlier (the first two in 1608), but now colonists could marry and raise families. Jamestown stops being a camp of men and becomes a <strong>permanent</strong> colony.', body: [], facts: [], standards: ['VS.3f'], related: ['place-jamestown', 'org-virginia-company'] },
  { id: 'event-attack-1622', type: 'event', name: 'The Powhatan attack of 1622', short: '1622 attack', emoji: '⚔️', year: 1622, month: 3,
    blurb: 'March 22, 1622: Powhatan\'s successor, <strong>Opechancanough</strong>, leads a surprise attack on the spreading English settlements, killing about 350 colonists, a quarter of the colony. The English strike back for years. The time of trading and peace is over.', body: [], facts: [], standards: ['VS.3d'], related: ['person-powhatan', 'lang-algonquian'] },
  { id: 'event-royal-1624', type: 'event', name: 'Virginia becomes a royal colony', short: 'Royal colony', emoji: '👑', year: 1624,
    blurb: '1624: the Virginia Company has gone broke. King James takes the colony over. From now on the king, not investors, appoints the governor, but the General Assembly keeps meeting.', body: [], facts: [], standards: ['VS.3c', 'VS.3g'], related: ['org-virginia-company', 'event-assembly-1619'] },
]);
