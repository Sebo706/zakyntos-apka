import { days } from '../data/days';
import { packingItems } from '../data/checklists';
import { places } from '../data/places';
import type { PlaceStatus, TripState } from '../types/trip';

const statusLabels: Record<PlaceStatus, string> = {
  main: 'hlavné',
  optional: 'voliteľné',
  done: 'hotovo',
  skipped: 'vynechané'
};

export function orderedPlacesForDay(dayId: string, state: TripState) {
  const dayPlaces = places.filter((place) => place.dayId === dayId);
  const order = state.dayPlaceOrder[dayId] ?? [];
  return [...dayPlaces].sort((a, b) => {
    const aIndex = order.indexOf(a.id);
    const bIndex = order.indexOf(b.id);
    return (aIndex === -1 ? a.priority : aIndex) - (bIndex === -1 ? b.priority : bIndex);
  });
}

export function buildDayRouteUrl(dayId: string, state: TripState) {
  const activePlaces = orderedPlacesForDay(dayId, state).filter((place) => state.placeStatuses[place.id] !== 'skipped');
  if (activePlaces.length === 0) return '';
  const destination = activePlaces[activePlaces.length - 1];
  const waypoints = activePlaces.slice(0, -1).map((place) => place.name).join('|');
  const params = new URLSearchParams({ api: '1', travelmode: 'driving', destination: destination.name });
  if (waypoints) params.set('waypoints', waypoints);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function buildTextExport(state: TripState) {
  const lines: string[] = ['Zakynthos rodinný plán', ''];
  for (const day of days) {
    lines.push(day.title, `Odchod: ${day.recommendedDeparture}`, `Trasa: ${day.route}`);
    const times = state.mealTimes[day.id] ?? day.mealTimes;
    lines.push(`Jedlo: raňajky ${times.breakfast}, obed ${times.lunch}, návrat ${times.hotelReturn}, večera ${times.dinner}`);
    const note = state.dayNotes[day.id];
    if (note) lines.push(`Poznámka dňa: ${note}`);
    for (const place of orderedPlacesForDay(day.id, state)) {
      const status = statusLabels[state.placeStatuses[place.id] ?? place.status];
      lines.push(`- [ ] ${place.name} (${status}) - ${place.recommendedTime}`);
      const placeNote = state.placeNotes[place.id];
      if (placeNote) lines.push(`  pozn.: ${placeNote}`);
    }
    lines.push(`Plán B: ${day.planB}`, '');
  }
  lines.push('Čo zobrať:');
  packingItems.forEach((item) => lines.push(`- ${state.packingChecked[item] ? '[x]' : '[ ]'} ${item}`));
  return lines.join('\n');
}

export async function sharePlan(text: string) {
  if (navigator.share) {
    await navigator.share({ title: 'Zakynthos plán', text });
    return 'shared';
  }
  await navigator.clipboard.writeText(text);
  return 'copied';
}

export function downloadJson(state: TripState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'zakynthos-plan-zaloha.json';
  link.click();
  URL.revokeObjectURL(url);
}
