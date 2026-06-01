import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { globalSafetyNotes, packingItems } from '../data/checklists';
import type { TripState } from '../types/trip';

interface Props {
  state: TripState;
  onPacking: (item: string, checked: boolean) => void;
}

export function PackingSafety({ state, onPacking }: Props) {
  return (
    <section className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h2 className="text-xl font-bold text-deepSea">Čo zobrať</h2>
        <div className="mt-3 space-y-2">
          {packingItems.map((item) => (
            <label key={item} className="flex min-h-12 items-center gap-3 rounded-lg border border-sea/10 bg-foam/40 px-3 text-base font-semibold text-slate-700">
              <input type="checkbox" checked={state.packingChecked[item] ?? false} onChange={(event) => onPacking(item, event.target.checked)} className="h-7 w-7 accent-sea" />
              <span>{item}</span>
              {state.packingChecked[item] && <CheckCircle2 className="ml-auto text-olive" size={20} />}
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h2 className="flex items-center gap-2 text-xl font-bold text-deepSea"><AlertTriangle size={20} />Bezpečnostné upozornenia</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">{globalSafetyNotes.map((note) => <li key={note} className="rounded-md bg-sand/60 p-2">{note}</li>)}</ul>
      </div>
    </section>
  );
}
