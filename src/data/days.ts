import type { DayPlan } from '../types/trip';

export const days: DayPlan[] = [
  {
    id: 'no-car-laganas',
    title: 'Deň bez auta - Laganas + Cameo Island',
    type: 'ľahký deň bez auta',
    route: 'Hotel v Laganas -> Cameo Island -> hotel',
    recommendedDeparture: '07:15 alebo 17:45',
    summaryNote: 'Nenáročný rozbeh, fotky na mostíku, pláž, bazén a all inclusive.',
    mealTimes: { breakfast: '07:00', lunch: '12:30', hotelReturn: '10:00 alebo 19:00', dinner: '19:00' },
    program: ['Skoré raňajky', 'Cameo Island skoro ráno alebo podvečer', 'Drevený mostík a fotky', 'Návrat do hotela', 'Laganas, pláž, bazén, all inclusive'],
    planB: 'Ak bude veľa ľudí alebo príliš teplo, zostať pri bazéne a ísť na Cameo Island až podvečer.',
    safetyNotes: ['Na mostíku a pri vode držať dieťa blízko.', 'Netlačiť sa do fotiek, ak je miesto plné.']
  },
  {
    id: 'day-1-north',
    title: 'Deň 1 autom - severný okruh',
    type: 'najnáročnejší deň autom',
    route: 'Laganas -> Navagio Viewpoint -> Volimes -> Xigia Beach -> Therianos Family Farm -> Alykes / Alykanas -> Laganas',
    recommendedDeparture: '07:15',
    summaryNote: 'Skorý štart kvôli davom, Navagio ako viewpoint, Xigia kratšie kúpanie.',
    mealTimes: { breakfast: '06:45', lunch: '13:00', hotelReturn: '17:30', dinner: '19:30' },
    program: ['Skoré raňajky', 'Skorý odchod autom', 'Navagio Viewpoint ako prvé miesto dňa', 'Volimes krátka zastávka', 'Xigia Beach kratšie kúpanie', 'Therianos Family Farm voliteľne', 'Návrat cez Alykes / Alykanas, ak to dáva zmysel'],
    planB: 'Ak bude skupina unavená alebo bude horúco, vynechať Therianos a Alykes / Alykanas a po Xigia ísť späť do Laganas.',
    safetyNotes: ['Navagio brať hlavne ako viewpoint.', 'Pri vyhliadkach neriskovať fotky na okraji.', 'Radšej menej miest a viac pohody.']
  },
  {
    id: 'day-2-beach-town',
    title: 'Deň 2 autom - Banana Beach + mesto + Airport Café',
    type: 'plážový deň s voliteľným mestom',
    route: 'Laganas -> Argassi -> Banana Beach -> Zakynthos Town -> Bochali Viewpoint -> Airport Café Kalamaki -> Laganas',
    recommendedDeparture: '08:30',
    summaryNote: 'Banana Beach je hlavný oddychový bod, ostatné len podľa energie.',
    mealTimes: { breakfast: '07:45', lunch: '13:00', hotelReturn: '17:00', dinner: '19:30' },
    program: ['Raňajky', 'Odchod na Banana Beach', 'Banana Beach skoro ráno', 'Kúpanie, oddych, pláž', 'Zakynthos Town krátka prechádzka voliteľne', 'Bochali Viewpoint voliteľne', 'Airport Café voliteľne'],
    planB: 'Ak bude dieťa alebo skupina unavená, po Banana Beach ísť rovno späť na hotel a mesto presunúť na rezervný deň.',
    safetyNotes: ['Na pláži riešiť tieň, vodu a opaľovací krém.', 'Airport Café brať len ako krátku zastávku.']
  },
  {
    id: 'day-3-keri',
    title: 'Deň 3 autom - Keri + Mizithres Rocks',
    type: 'južné výhľady autom',
    route: 'Laganas -> Lithakia -> Keri Village -> Keri Lighthouse / Mizithres Rocks -> Keri Lake / Marathias -> Agalas -> Laganas',
    recommendedDeparture: '08:00 alebo 16:30',
    summaryNote: 'Mizithres ráno = menej ľudí, podvečer = krajšie svetlo.',
    mealTimes: { breakfast: '07:15', lunch: '12:30', hotelReturn: '17:30 alebo 20:00', dinner: '19:30' },
    program: ['Raňajky', 'Odchod podľa zvolenej verzie', 'Keri Village', 'Keri Lighthouse / Mizithres Rocks', 'Keri Lake / Marathias voliteľne', 'Agalas krátka vyhliadka voliteľne', 'Návrat do hotela'],
    planB: 'Pri horúčave ísť len Keri Village a Mizithres, alebo dať podvečernú krátku verziu bez ďalších zastávok.',
    safetyNotes: ['Pri útesoch držať dieťa blízko seba.', 'Nerobiť riskantné fotky pri okrajoch.', 'Pri silnom vetre neísť blízko k hrane.']
  },
  {
    id: 'day-4-reserve',
    title: 'Deň 4 autom - rezerva / ľahký program',
    type: 'flexibilný oddychový deň',
    route: 'Laganas -> krátky bod podľa počasia a nálady -> Laganas',
    recommendedDeparture: 'podľa nálady',
    summaryNote: 'Nepchať veľa programu, použiť na oddych alebo náhradný plán.',
    mealTimes: { breakfast: '08:00', lunch: '12:30', hotelReturn: '16:00', dinner: '19:00' },
    program: ['Voľný deň podľa počasia a nálady', 'Zakynthos Town / Bochali, ak sa nestihlo', 'Airport Café, ak sa nestihlo', 'Krátky fotostop podľa chuti', 'Viac oddychu, menej naháňania'],
    planB: 'Ak bude príliš teplo alebo únava, zostať v hoteli, bazén, pláž Laganas a pokojný večer.',
    safetyNotes: ['Radšej menej miest a viac pohody.', 'Nerobiť z rezervného dňa ďalší náročný okruh.']
  },
  {
    id: 'day-6-boat',
    title: 'Voliteľný 6. deň bez auta - Keri Caves + Marathonisi',
    type: 'voliteľný lodný výlet',
    route: 'Hotel v Laganas -> Agios Sostis alebo Laganas prístav -> loďou Keri Caves / Marathonisi -> hotel',
    recommendedDeparture: 'podľa lode, ideálne ráno',
    summaryNote: 'Krátky lodný výlet 2,5 až 3 hodiny, zvyšok dňa oddych.',
    mealTimes: { breakfast: '07:30', lunch: '13:30', hotelReturn: '14:30', dinner: '19:30' },
    program: ['Skoré raňajky', 'Presun do prístavu alebo na miesto odchodu lode', 'Krátky výlet loďou približne 2,5 až 3 hodiny', 'Keri Caves', 'Marathonisi / Turtle Island voliteľne podľa ponuky', 'Návrat do hotela', 'Zvyšok dňa oddych'],
    planB: 'Kto nechce loď, zostane v hoteli. Pri vetre alebo horšom mori výlet presunúť alebo zrušiť.',
    safetyNotes: ['Pri lodných výletoch overiť počasie a more.', 'Pri korytnačkách nerušiť zvieratá.', 'Vybrať slušného prevádzkovateľa.']
  }
];
