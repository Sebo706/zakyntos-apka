# Zakynthos rodinný plánovač

Mobilná React + Vite + TypeScript PWA aplikácia pre konkrétnu rodinnú dovolenku na Zakynthose. Funguje bez prihlasovania, bez databázy, bez backendu a bez platených API. Každý mobil si ukladá vlastný stav do `localStorage`.

## Spustenie lokálne

```bash
npm install
npm run dev
```

Potom otvor adresu, ktorú vypíše Vite, najčastejšie `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

Výsledné súbory budú v priečinku `dist`.


## Odporúčané nasadenie cez GitHub Pages automaticky

Projekt obsahuje GitHub Actions workflow:

```text
.github/workflows/deploy.yml
```

Po každom pushnutí do vetvy `main` GitHub automaticky:

1. nainštaluje závislosti cez `npm install`,
2. zostaví aplikáciu cez `npm run build`,
3. publikuje priečinok `dist` cez GitHub Pages.

V GitHub repozitári nastav:

1. `Settings` -> `Pages`,
2. `Build and deployment`,
3. `Source`: `GitHub Actions`.

Potom pushni zdrojový kód do vetvy `main`. Po dokončení workflow bude aplikácia dostupná na adrese GitHub Pages, napríklad:

```text
https://TVOJ_GITHUB_USERNAME.github.io/NAZOV_REPOZITARA/
```

Aplikácia používa relatívny Vite `base: './'`, takže funguje aj v podpriečinku repozitára na GitHub Pages.

## Otvorenie v mobile a pridanie na plochu

Po nasadení otvor GitHub Pages adresu v mobile.

Android / Chrome:

1. otvor stránku,
2. menu s tromi bodkami,
3. `Pridať na plochu` alebo `Inštalovať aplikáciu`.

iPhone / Safari:

1. otvor stránku v Safari,
2. stlač tlačidlo zdieľania,
3. vyber `Pridať na plochu`.

GitHub Pages používa HTTPS, takže manifest a service worker môžu fungovať ako PWA. Aplikácia stále nepoužíva platené služby, API kľúče, backend ani databázu.

## Nasadenie na GitHub Pages cez gh-pages balík

1. Vytvor GitHub repozitár.
2. V `package.json` uprav hodnotu `homepage` na tvar:

```json
"homepage": "https://TVOJ_GITHUB_USERNAME.github.io/NAZOV_REPOZITARA/"
```

3. Inicializuj git iba v tomto priečinku projektu, commitni zmeny a pushni ich na GitHub.
4. Spusti:

```bash
npm run deploy
```

Skript vytvorí produkčný build a odošle priečinok `dist` na vetvu `gh-pages`.

Alternatíva: v GitHub repozitári nastav Pages na publikovanie z vetvy `gh-pages`.

## Kde upraviť dáta

- Dni a texty itinerára: `src/data/days.ts`
- Miesta a GPS súradnice: `src/data/places.ts`
- Zoznam „Čo zobrať“ a všeobecná bezpečnosť: `src/data/checklists.ts`

Dizajn a logika sú oddelené od dát, takže bežné úpravy plánu netreba robiť v komponentoch.

## Ako pridať nové miesto

V `src/data/places.ts` pridaj objekt s týmito poľami:

- `id`
- `name`
- `dayId`
- `category`
- `priority`
- `coordinates`
- `shortNote`
- `crowdWarning`, ak treba
- `recommendedTime`
- `googleMapsUrl`
- `status`

Ak si nie si istý súradnicami, do `shortNote` alebo ku položke pridaj text `TODO_VERIFY_COORDINATES`.

## Ako pridať nový deň

1. V `src/data/days.ts` pridaj nový objekt do poľa `days`.
2. Použi jedinečné `id`.
3. V `src/data/places.ts` pridaj miesta s rovnakým `dayId`.

## Lokálne ukladanie

Aplikácia ukladá do `localStorage`:

- statusy miest,
- poznámky ku dňom,
- poznámky k miestam,
- upravené časy jedla a návratu,
- poradie bodov v rámci dňa,
- checklist „Čo zobrať“,
- ručne vybraný dnešný deň.

Nie je to synchronizácia medzi mobilmi. Každý používa vlastnú lokálnu verziu.

## Záloha a obnova

V aplikácii je sekcia Export:

- export čitateľného textu,
- zdieľanie cez Web Share API alebo kopírovanie do schránky,
- export JSON zálohy,
- import JSON zo súboru alebo vloženého textu.

## Mapa

Mapa používa Leaflet + OpenStreetMap. Nepoužíva Google Maps API kľúč. Každé miesto má samostatné tlačidlo „Otvoriť v Google Maps“ a deň má odkaz na trasu dňa, ak existujú body.

## PWA

PWA súbory sú v `public`:

- `manifest.webmanifest`
- `sw.js`
- `icon-192.svg`
- `icon-512.svg`

Po nasadení cez HTTPS si aplikáciu môžeš pridať na plochu mobilu.

## Na overenie / TODO

- `Keri Caves` má označenie `TODO_VERIFY_COORDINATES`, pretože presná poloha lodnej zastávky sa líši podľa trasy a prevádzkovateľa.
- Pred dovolenkou odporúčam skontrolovať aktuálne prístupy a bezpečnostné obmedzenia pri Navagio Viewpoint a útesoch pri Keri.

