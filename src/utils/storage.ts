import { days } from '../data/days';
import { packingItems } from '../data/checklists';
import { places } from '../data/places';
import type { PlaceStatus, TripState } from '../types/trip';

const STORAGE_KEY = 'zakynthos-trip-state-v1';

export const defaultState: TripState = {
  currentDayId: days[0].id,
  placeStatuses: Object.fromEntries(places.map((place) => [place.id, place.status as PlaceStatus])),
  dayNotes: {},
  placeNotes: {},
  mealTimes: Object.fromEntries(days.map((day) => [day.id, day.mealTimes])),
  dayPlaceOrder: Object.fromEntries(days.map((day) => [day.id, places.filter((place) => place.dayId === day.id).sort((a, b) => a.priority - b.priority).map((place) => place.id)])),
  packingChecked: Object.fromEntries(packingItems.map((item) => [item, false]))
};

export function loadState(): TripState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<TripState>;
    return {
      ...defaultState,
      ...parsed,
      placeStatuses: { ...defaultState.placeStatuses, ...parsed.placeStatuses },
      dayNotes: { ...defaultState.dayNotes, ...parsed.dayNotes },
      placeNotes: { ...defaultState.placeNotes, ...parsed.placeNotes },
      mealTimes: { ...defaultState.mealTimes, ...parsed.mealTimes },
      dayPlaceOrder: { ...defaultState.dayPlaceOrder, ...parsed.dayPlaceOrder },
      packingChecked: { ...defaultState.packingChecked, ...parsed.packingChecked }
    };
  } catch {
    return defaultState;
  }
}

export function saveState(state: TripState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
