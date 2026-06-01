import { ArrowRight, Car, Footprints, ShipWheel } from 'lucide-react';
import { places } from '../data/places';
import type { DayPlan, TripState } from '../types/trip';

interface Props {
  days: DayPlan[];
  state: TripState;
  onOpen: (dayId: string) => void;
  onSetCurrent: (dayId: string) => void;
}

function DayIcon({ type }: { type: string }) {
  if (type.includes('loď') || type.includes('lod')) return <ShipWheel size={20} />;
  if (type.includes('bez auta')) return <Footprints size={20} />;
  return <Car size={20} />;
}

export function DayOverview({ days, state, onOpen, onSetCurrent }: Props) {
  return (
    <section className="space-y-4">
      {days.map((day) => {
        const dayPlaces = places.filter((place) => place.dayId === day.id);
        const mainCount = dayPlaces.filter((place) => (state.placeStatuses[place.id] ?? place.status) === 'main').length;
        return (
          <article key={day.id} className={`rounded-lg border bg-white p-4 shadow-soft ${state.currentDayId === day.id ? 'border-sea ring-2 ring-sea/15' : 'border-sea/10'}`}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foam text-sea"><DayIcon type={day.type} /></div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-olive">{day.type}</p>
                <h2 className="text-lg font-bold leading-tight text-deepSea">{day.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{day.summaryNote}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md bg-sand/70 p-3"><span className="block text-xs text-slate-500">Odchod</span><b>{day.recommendedDeparture}</b></div>
              <div className="rounded-md bg-foam p-3"><span className="block text-xs text-slate-500">Hlavné body</span><b>{mainCount} z {dayPlaces.length}</b></div>
            </div>
            <p className="mt-3 text-sm text-slate-600"><b>Miesta:</b> {dayPlaces.slice(0, 4).map((place) => place.name).join(', ')}{dayPlaces.length > 4 ? '...' : ''}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="min-h-12 rounded-lg border border-sea/20 px-3 font-semibold text-sea" onClick={() => onSetCurrent(day.id)}>Nastaviť ako dnešný</button>
              <button className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sea px-3 font-semibold text-white" onClick={() => onOpen(day.id)}>Otvoriť deň <ArrowRight size={18} /></button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
