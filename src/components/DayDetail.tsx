import { AlertTriangle, ArrowDown, ArrowUp, Check, ExternalLink, MapPinned, RotateCcw } from 'lucide-react';
import type { DayPlan, PlaceStatus, TripState } from '../types/trip';
import { buildDayRouteUrl, orderedPlacesForDay } from '../utils/export';

const statusClasses: Record<PlaceStatus, string> = {
  main: 'bg-sea text-white',
  optional: 'bg-sand text-deepSea',
  done: 'bg-olive text-white',
  skipped: 'bg-slate-200 text-slate-600 line-through'
};

const statusLabels: Record<PlaceStatus, string> = {
  main: 'hlavné',
  optional: 'voliteľné',
  done: 'hotovo',
  skipped: 'vynechané'
};

interface Props {
  day: DayPlan;
  state: TripState;
  onStatus: (placeId: string, status: PlaceStatus) => void;
  onDayNote: (dayId: string, note: string) => void;
  onPlaceNote: (placeId: string, note: string) => void;
  onMealTime: (dayId: string, key: keyof DayPlan['mealTimes'], value: string) => void;
  onMove: (dayId: string, placeId: string, direction: 'up' | 'down') => void;
}

export function DayDetail({ day, state, onStatus, onDayNote, onPlaceNote, onMealTime, onMove }: Props) {
  const orderedPlaces = orderedPlacesForDay(day.id, state);
  const routeUrl = buildDayRouteUrl(day.id, state);
  const times = state.mealTimes[day.id] ?? day.mealTimes;
  const crowded = orderedPlaces.filter((place) => place.crowdWarning);

  return (
    <section className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wide text-olive">Dnešný plán</p>
        <h2 className="text-2xl font-bold leading-tight text-deepSea">{day.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{day.route}</p>
        {routeUrl && <a href={routeUrl} target="_blank" rel="noreferrer" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-deepSea px-4 font-semibold text-white"><MapPinned size={19} />Otvoriť trasu dňa v Google Maps</a>}
      </div>

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h3 className="text-lg font-bold text-deepSea">Časy a all inclusive</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {([
            ['breakfast', 'Raňajky'],
            ['lunch', 'Obed'],
            ['hotelReturn', 'Návrat'],
            ['dinner', 'Večera']
          ] as const).map(([key, label]) => (
            <label key={key} className="text-sm font-semibold text-slate-700">
              {label}
              <input className="mt-1 min-h-12 w-full rounded-lg border border-sea/20 bg-foam/40 px-3 text-base" value={times[key]} onChange={(event) => onMealTime(day.id, key, event.target.value)} />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h3 className="text-lg font-bold text-deepSea">Checklist miest</h3>
        <div className="mt-3 space-y-3">
          {orderedPlaces.map((place, index) => {
            const status = state.placeStatuses[place.id] ?? place.status;
            const isDone = status === 'done';
            return (
              <article key={place.id} className="rounded-lg border border-sea/10 bg-white p-3">
                <div className="flex gap-3">
                  <button aria-label={`Označiť ${place.name} ako hotovo`} onClick={() => onStatus(place.id, isDone ? place.status : 'done')} className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 ${isDone ? 'border-olive bg-olive text-white' : 'border-sea/40 bg-white text-transparent'}`}>
                    <Check size={22} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-deepSea">{place.name}</h4>
                      <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusClasses[status]}`}>{statusLabels[status]}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{place.shortNote}</p>
                    <p className="mt-1 text-sm font-semibold text-olive">Odporúčaný čas: {place.recommendedTime}</p>
                    {place.crowdWarning && <p className="mt-2 rounded-md bg-coral/10 p-2 text-sm text-coral"><AlertTriangle className="mr-1 inline" size={16} />{place.crowdWarning}</p>}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {(['main', 'optional', 'done', 'skipped'] as PlaceStatus[]).map((nextStatus) => <button key={nextStatus} onClick={() => onStatus(place.id, nextStatus)} className={`min-h-10 rounded-md px-2 text-xs font-bold ${status === nextStatus ? statusClasses[nextStatus] : 'bg-slate-100 text-slate-600'}`}>{statusLabels[nextStatus]}</button>)}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button disabled={index === 0} onClick={() => onMove(day.id, place.id, 'up')} className="flex min-h-11 items-center justify-center gap-1 rounded-md border border-sea/20 text-sm font-semibold text-sea disabled:opacity-30"><ArrowUp size={16} />Hore</button>
                  <button disabled={index === orderedPlaces.length - 1} onClick={() => onMove(day.id, place.id, 'down')} className="flex min-h-11 items-center justify-center gap-1 rounded-md border border-sea/20 text-sm font-semibold text-sea disabled:opacity-30"><ArrowDown size={16} />Dole</button>
                  <a href={place.googleMapsUrl} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-center gap-1 rounded-md bg-sea px-2 text-center text-sm font-semibold text-white"><ExternalLink size={16} />Mapy</a>
                </div>
                <textarea value={state.placeNotes[place.id] ?? ''} onChange={(event) => onPlaceNote(place.id, event.target.value)} placeholder="Poznámka k miestu..." className="mt-3 min-h-20 w-full rounded-lg border border-sea/15 bg-foam/40 p-3 text-base" />
              </article>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h3 className="text-lg font-bold text-deepSea">Plán dňa</h3>
        <ol className="mt-3 space-y-2 text-sm text-slate-700">
          {day.program.map((item) => <li key={item} className="rounded-md bg-foam/60 p-2">{item}</li>)}
        </ol>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h3 className="flex items-center gap-2 text-lg font-bold text-deepSea"><RotateCcw size={18} />Plán B</h3>
        <p className="mt-2 text-sm text-slate-700">{day.planB}</p>
      </div>

      {crowded.length > 0 && <div className="rounded-lg bg-coral/10 p-4"><h3 className="font-bold text-coral">Davy a špička</h3><ul className="mt-2 space-y-2 text-sm text-coral">{crowded.map((place) => <li key={place.id}>{place.name}: {place.crowdWarning}</li>)}</ul></div>}

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h3 className="font-bold text-deepSea">Bezpečnosť</h3>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">{day.safetyNotes.map((note) => <li key={note}>• {note}</li>)}</ul>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h3 className="text-lg font-bold text-deepSea">Poznámky ku dňu</h3>
        <textarea value={state.dayNotes[day.id] ?? ''} onChange={(event) => onDayNote(day.id, event.target.value)} placeholder="Dopíš časy, rezervácie, nápady alebo čo zmeniť..." className="mt-3 min-h-28 w-full rounded-lg border border-sea/15 bg-foam/40 p-3 text-base" />
      </div>
    </section>
  );
}
