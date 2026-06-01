import { useEffect, useState } from 'react';
import type { DayPlan, PlaceStatus, TripState } from '../types/trip';
import { clearState, defaultState, loadState, saveState } from '../utils/storage';

export function useTripState() {
  const [state, setState] = useState<TripState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setCurrentDay = (dayId: string) => setState((current) => ({ ...current, currentDayId: dayId }));

  const setPlaceStatus = (placeId: string, status: PlaceStatus) => setState((current) => ({
    ...current,
    placeStatuses: { ...current.placeStatuses, [placeId]: status }
  }));

  const setDayNote = (dayId: string, note: string) => setState((current) => ({
    ...current,
    dayNotes: { ...current.dayNotes, [dayId]: note }
  }));

  const setPlaceNote = (placeId: string, note: string) => setState((current) => ({
    ...current,
    placeNotes: { ...current.placeNotes, [placeId]: note }
  }));

  const setMealTime = (dayId: string, key: keyof DayPlan['mealTimes'], value: string) => setState((current) => ({
    ...current,
    mealTimes: {
      ...current.mealTimes,
      [dayId]: { ...current.mealTimes[dayId], [key]: value }
    }
  }));

  const movePlace = (dayId: string, placeId: string, direction: 'up' | 'down') => setState((current) => {
    const order = [...(current.dayPlaceOrder[dayId] ?? [])];
    const index = order.indexOf(placeId);
    const target = direction === 'up' ? index - 1 : index + 1;
    if (index < 0 || target < 0 || target >= order.length) return current;
    [order[index], order[target]] = [order[target], order[index]];
    return { ...current, dayPlaceOrder: { ...current.dayPlaceOrder, [dayId]: order } };
  });

  const setPacking = (item: string, checked: boolean) => setState((current) => ({
    ...current,
    packingChecked: { ...current.packingChecked, [item]: checked }
  }));

  const importState = (nextState: TripState) => setState({
    ...defaultState,
    ...nextState,
    placeStatuses: { ...defaultState.placeStatuses, ...nextState.placeStatuses },
    dayNotes: { ...defaultState.dayNotes, ...nextState.dayNotes },
    placeNotes: { ...defaultState.placeNotes, ...nextState.placeNotes },
    mealTimes: { ...defaultState.mealTimes, ...nextState.mealTimes },
    dayPlaceOrder: { ...defaultState.dayPlaceOrder, ...nextState.dayPlaceOrder },
    packingChecked: { ...defaultState.packingChecked, ...nextState.packingChecked }
  });

  const reset = () => {
    clearState();
    setState(defaultState);
  };

  return { state, setCurrentDay, setPlaceStatus, setDayNote, setPlaceNote, setMealTime, movePlace, setPacking, importState, reset };
}
