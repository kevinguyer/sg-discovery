/* Virginia Explorer — content: Life in the Virginia Colony (VS.4)
   Chapter 4. Standards VS.4a–f. Reading level grades 4–5.
   Enslavement and the laws that created it are told plainly, factually, and without graphic detail
   (school guidance, 2026-09-06). Laws carry `year` so they sit on the timeline.
*/
VA.add([
  /* ───────────── CULTURES (VS.4b) ───────────── */
  { id: 'culture-english', type: 'culture', name: 'The English', emoji: '🏠', tagline: 'Tidewater and Piedmont · brick, church, and tobacco', mapRef: { kind: 'region', id: 'coastal' },
    blurb: 'Most colonists came from <strong>England</strong>. They settled the Tidewater first, then pushed west into the Piedmont as tobacco wore out the soil. They brought their <strong>language</strong>, the <strong>Church of England</strong>, English law and courts, and English ways of building.',
    body: [
      'Wealthy planters built brick houses and churches that looked like the ones back home. Poorer farmers built small wooden houses. Towns were rare; the colony was a scattering of farms along the rivers, because every planter wanted a dock for tobacco ships.',
      'English customs shaped everything: county courts, parish churches, the General Assembly, holidays like Christmas, and foods like beef, wheat bread, and beer.'
    ],
    facts: ['<b>Where:</b> Coastal Plain (Tidewater), then the Piedmont', '<b>Brought:</b> the English language, the Church of England, English law, brick and timber-frame buildings', '<b>Work:</b> tobacco planting, trade, government'],
    standards: ['VS.4b'], related: ['idea-tobacco', 'culture-african', 'place-williamsburg', 'region-coastal', 'region-piedmont'] },
  { id: 'culture-scots-irish', type: 'culture', name: 'The Scots-Irish', emoji: '🐑', tagline: 'The Shenandoah Valley · log cabins and fiddles', mapRef: { kind: 'region', id: 'valley' },
    blurb: 'In the 1700s thousands of <strong>Scots-Irish</strong> families walked south from Pennsylvania down the <strong>Great Wagon Road</strong> into the Shenandoah Valley. They were Presbyterians, tough farmers, and they wanted cheap land far from the tobacco planters.',
    body: ['They built <strong>log cabins</strong>, raised wheat, cattle, and sheep instead of tobacco, and rarely owned enslaved people. Their music, with fiddles and old ballads, became the root of Appalachian music. Many later moved on through the Cumberland Gap into Kentucky.'],
    facts: ['<b>Where:</b> the Valley and Ridge region', '<b>Brought:</b> the Presbyterian church, log-cabin building, fiddle music, wheat and livestock farming', '<b>Came by:</b> the Great Wagon Road from Pennsylvania'],
    standards: ['VS.4b'], related: ['culture-german', 'region-valley', 'place-cumberland-gap'] },
  { id: 'culture-german', type: 'culture', name: 'The Germans', emoji: '🌾', tagline: 'The Valley · big barns and careful farms', mapRef: { kind: 'region', id: 'valley' },
    blurb: '<strong>German</strong> settlers also came down the Great Wagon Road into the Valley. They were known for large, well-built <strong>barns</strong>, neat farms, and craft skills like blacksmithing, pottery, and furniture-making.',
    body: ['Many were Lutherans or Mennonites who had left Germany to worship freely. For a while some Valley towns spoke more German than English. Their foods, like sausages and sauerkraut, and their craftsmanship are still part of Valley life.'],
    facts: ['<b>Where:</b> the Shenandoah Valley', '<b>Brought:</b> Lutheran and Mennonite churches, big bank barns, pottery and ironwork, German foods', '<b>Came by:</b> the Great Wagon Road'],
    standards: ['VS.4b'], related: ['culture-scots-irish', 'region-valley'] },
  { id: 'culture-african', type: 'culture', name: 'Africans and African Americans', emoji: '🥁', tagline: 'Tidewater and Piedmont plantations · skills, music, and faith', mapRef: { kind: 'region', id: 'piedmont' },
    blurb: 'By 1750, about four in ten Virginians were of <strong>African</strong> descent, nearly all of them enslaved on the tobacco farms of the Tidewater and Piedmont. They came from many nations, especially from the Angola region and West Africa, and they brought <strong>skills</strong> the colony depended on.',
    body: [
      'Africans knew how to farm rice and grow crops in warm, wet country, how to work iron, and how to build boats. Their <strong>music</strong>, with drums, call-and-response singing, and an instrument that became the banjo, shaped American music. Their foods, like black-eyed peas, okra, and peanuts, became Virginia foods.',
      'Enslaved families kept their cultures alive in secret and in the open: stories, names, ways of cooking and healing, and, in time, their own churches. A small number of Black Virginians were free, and some owned land.'
    ],
    facts: ['<b>Where:</b> Tidewater and Piedmont farms and plantations', '<b>Brought:</b> farming and ironworking skills, music (drums, banjo, call-and-response), foods (okra, black-eyed peas, peanuts), stories', '<b>By 1750:</b> about 40% of Virginians'],
    standards: ['VS.4b', 'VS.4c'], related: ['idea-enslavement', 'idea-indenture', 'law-1705', 'idea-tobacco'] },
  { id: 'culture-indigenous', type: 'culture', name: 'Virginia\'s Indigenous People', emoji: '🏹', tagline: 'Pushed west and onto reservations, but still here',
    blurb: 'As tobacco farms spread, the colony took the river land where the <strong>Powhatan</strong> and other nations had lived for thousands of years. After the wars of 1622 and 1644, a treaty in <strong>1646</strong> and another in <strong>1677</strong> set aside small <strong>reservations</strong> for the Pamunkey, Mattaponi, and other tribes.',
    body: [
      'Many Indigenous people moved west or blended into the colony. Their knowledge stayed: colonists learned to grow <strong>corn, beans, and squash</strong>, to build dugout canoes, to use tobacco itself, and hundreds of place names, from the Rappahannock to the Shenandoah, are Indigenous words.',
      'The Pamunkey and Mattaponi reservations from those treaties still exist, the oldest in the United States.'
    ],
    facts: ['<b>Where:</b> reservations on the Pamunkey and Mattaponi rivers; the Piedmont and mountains', '<b>Gave the colony:</b> corn, beans, squash, canoes, tobacco, place names', '<b>Treaties:</b> 1646 and 1677'],
    standards: ['VS.4b', 'VS.2e'], related: ['tribe-pamunkey', 'tribe-mattaponi', 'lang-algonquian', 'event-attack-1622'] },

  /* ───────────── LABOR (VS.4c) ───────────── */
  { id: 'idea-indenture', type: 'idea', name: 'Indentured servants', emoji: '📝', tagline: 'Years of forced work for a ticket to Virginia',
    blurb: 'An <strong>indentured servant</strong> signed a contract, called an indenture, agreeing to work for a master for <strong>four to seven years</strong>. In return the master paid the servant\'s passage across the ocean. Most were poor young English, Irish, or Scottish people.',
    body: [
      'Servants worked hard, could be bought and sold while their contract lasted, and could be punished. But the contract <strong>ended</strong>. At the end they got "freedom dues," often clothes, tools, corn, and sometimes land, and were free.',
      'For the first 50 years of the colony, most workers on tobacco farms were indentured servants, not enslaved people.'
    ],
    facts: ['A contract for 4–7 years', 'Mostly poor English, Irish, and Scottish people', 'Freed at the end, with freedom dues', 'The colony\'s main workers until about 1680'],
    standards: ['VS.4c'], related: ['idea-enslavement', 'idea-tobacco', 'culture-english'] },
  { id: 'idea-enslavement', type: 'idea', name: 'Enslaved people and the Atlantic slave trade', emoji: '⛓️', tagline: 'Forced labor for life, bought and sold as property',
    blurb: 'An <strong>enslaved person</strong> had no contract and no end date. Enslaved Africans and their children were held as <strong>property</strong>, bought and sold, and forced to work for life. Beginning in the 1600s, European countries built a trade in human beings across the Atlantic.',
    body: [
      'Ships from England, Portugal, the Netherlands, France, and Spain sailed to the coast of West and West Central Africa. There, traders exchanged cloth, guns, metal goods, and rum for people who had been captured in wars or raids. The captives were chained below deck for the terrible weeks-long voyage called the <strong>Middle Passage</strong>. Many died. Those who survived were sold at ports like Yorktown and Jamestown to planters who needed workers for tobacco.',
      'Virginia chose this system because it made tobacco profitable: an enslaved worker cost more than a servant but never had to be freed. By 1750 about 40 percent of Virginians were enslaved.'
    ],
    facts: ['No contract, no end: enslaved for life, and their children too', 'Captured in Africa, traded for goods, transported across the Atlantic, sold in the colonies', 'Chosen by the colony to grow tobacco cheaply', 'About 40% of Virginians by 1750'],
    standards: ['VS.4c', 'VS.4a'], related: ['idea-indenture', 'law-1705', 'event-africans-1619', 'culture-african'] },

  /* ───────────── LAWS (VS.4d) ───────────── */
  { id: 'law-1640', type: 'law', name: 'The John Punch decision', short: 'John Punch', emoji: '⚖️', year: 1640,
    blurb: 'In 1640 three servants ran away together: two Europeans and an African named <strong>John Punch</strong>. When they were caught, the court gave the two Europeans extra years of service. It sentenced John Punch to serve <strong>for the rest of his life</strong>. It was the first time a Virginia court treated a person differently because he was African.',
    body: [], facts: ['First recorded case of lifelong servitude based on race', 'The Europeans got extra years; the African got life'], standards: ['VS.4d'], related: ['idea-enslavement', 'law-1662'] },
  { id: 'law-1662', type: 'law', name: 'Children follow the mother', short: 'Born enslaved', emoji: '⚖️', year: 1662,
    blurb: 'In 1662 the General Assembly ruled that a child\'s status <strong>followed the mother</strong>: a child born to an enslaved woman was enslaved from birth, no matter who the father was. This broke with English law and made slavery pass from parent to child forever.',
    body: [], facts: ['Made enslavement hereditary', 'Reversed English law, which followed the father'], standards: ['VS.4d'], related: ['law-1640', 'law-1667'] },
  { id: 'law-1667', type: 'law', name: 'Baptism does not free', short: 'Baptism law', emoji: '⚖️', year: 1667,
    blurb: 'Some enslaved people had argued that becoming Christian should make them free. In 1667 the Assembly said <strong>no</strong>: baptism "doth not alter the condition of the person as to his bondage." Religion could no longer be a path out of slavery.',
    body: [], facts: ['Closed the last legal path out of enslavement'], standards: ['VS.4d'], related: ['law-1662', 'law-1705'] },
  { id: 'law-1705', type: 'law', name: 'The Virginia Slave Codes', short: 'Slave Codes', emoji: '📕', year: 1705,
    blurb: 'In 1705 the Assembly gathered all its earlier rules into one set of laws, the <strong>Virginia Slave Codes</strong>. They declared enslaved people to be <strong>property</strong>, like land or livestock, that could be bought, sold, and inherited. They said only non-Christians from non-Christian lands (meaning Africans and Indigenous people) could be enslaved, and they took away the rights of free Black Virginians, too.',
    body: ['With the 1705 codes, race-based slavery was fully written into Virginia law. It stayed there for 160 years, until the end of the Civil War.'],
    facts: ['Enslaved people declared property', 'Slavery tied to race by law', 'Rights of free Black Virginians reduced', 'Lasted until 1865'],
    standards: ['VS.4d'], related: ['idea-enslavement', 'law-1662', 'culture-african'] },

  /* ───────────── THE CAPITAL (VS.4e) ───────────── */
  { id: 'place-williamsburg', type: 'place', name: 'Williamsburg', emoji: '🏛️', tagline: 'Capital of Virginia, 1699–1780', lat: 37.2707, lon: -76.7075,
    blurb: 'In <strong>1699</strong> Virginia moved its capital from Jamestown to a small town called Middle Plantation and renamed it <strong>Williamsburg</strong>, after King William III. It stayed the capital for 81 years, until 1780.',
    body: [
      'Middle Plantation sat on high, dry ground halfway between the James and York rivers, with good wells and no swamp. It already had the <strong>College of William &amp; Mary</strong>, founded in 1693, the second college in the colonies. And Jamestown\'s statehouse had just burned down, in 1698, for the fourth time.',
      'Williamsburg was a planned town with a wide main street, the Capitol at one end and the college at the other. It was small, but for a few weeks each year, when the General Assembly and the courts met, it was the busiest place in Virginia.'
    ],
    facts: ['Capital 1699–1780', 'Named for King William III', 'Home of the College of William &amp; Mary (1693)', 'Chosen for high ground, clean water, and a fresh start after the 1698 fire'],
    standards: ['VS.4e'], related: ['event-capital-1699', 'place-jamestown', 'place-richmond'] },
  { id: 'event-capital-1699', type: 'event', name: 'The capital moves to Williamsburg', short: 'Capital moves', emoji: '🏛️', year: 1699,
    blurb: 'After 92 years at Jamestown, the government moved to Williamsburg in 1699. Three reasons: Jamestown\'s <strong>water</strong> was bad, its low, marshy ground was <strong>unhealthy</strong>, and the statehouse had <strong>burned</strong> in 1698.',
    body: [], facts: ['Reasons: contaminated water, unhealthy conditions, fire', 'Jamestown slowly emptied out afterward'], standards: ['VS.4e'], related: ['place-williamsburg', 'place-jamestown'] },
  { id: 'event-college-1693', type: 'event', name: 'The College of William & Mary is founded', short: 'College founded', emoji: '🎓', year: 1693,
    blurb: 'King William and Queen Mary chartered a college at Middle Plantation in 1693. It gave the town importance, and six years later the capital followed. Thomas Jefferson, James Monroe, and John Tyler all studied there.',
    body: [], facts: ['Second-oldest college in the United States'], standards: ['VS.4e'], related: ['place-williamsburg'] },

  /* ───────────── EXCHANGE (VS.4f) ───────────── */
  { id: 'idea-tobacco-money', type: 'idea', name: 'Tobacco as money', emoji: '🍂', tagline: 'When leaves were cash',
    blurb: 'Coins were rare in colonial Virginia; England sent few, and most went straight back to pay for goods. So Virginians used <strong>tobacco as money</strong>. Prices, taxes, fines, and even ministers\' salaries were set in pounds of tobacco.',
    body: ['Later, planters stored tobacco in public warehouses and got a paper receipt, a <strong>tobacco note</strong>, that could be spent like a bill. Paper money in Virginia began as a receipt for leaves.'],
    facts: ['Prices set in pounds of tobacco', 'Tobacco notes: receipts that worked like paper money', 'Coins were scarce'],
    standards: ['VS.4f'], related: ['idea-barter', 'idea-credit', 'idea-tobacco'] },
  { id: 'idea-barter', type: 'idea', name: 'Barter', emoji: '🔄', tagline: 'Trading goods for goods',
    blurb: '<strong>Barter</strong> is trading one thing directly for another with no money: a bushel of corn for a pair of shoes, a deerskin for a knife. Neighbors bartered all the time, and so did colonists and Indigenous people.',
    body: ['Barter works when both sides want what the other has. When they don\'t, you need money or credit.'],
    facts: ['Goods for goods, no money', 'Common between neighbors and with Indigenous traders'], standards: ['VS.4f'], related: ['idea-tobacco-money', 'idea-credit'] },
  { id: 'idea-credit', type: 'idea', name: 'Credit', emoji: '📒', tagline: 'Buy now, pay at harvest',
    blurb: '<strong>Credit</strong> means getting goods now and promising to pay later. Tobacco came in once a year, so planters bought cloth, tools, and sugar from English merchants all year on credit and settled up, in tobacco, after the harvest.',
    body: ['Credit let farms run, but it also trapped people. A bad crop meant debt that rolled into the next year. Many big planters, including George Washington and Thomas Jefferson, owed English merchants money for years.'],
    facts: ['Goods now, payment at harvest', 'Kept in merchants\' ledgers', 'Debt was a constant worry'], standards: ['VS.4f'], related: ['idea-tobacco-money', 'idea-barter'] },
]);
