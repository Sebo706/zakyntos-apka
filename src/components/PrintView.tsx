import { days } from '../data/days';
import { packingItems } from '../data/checklists';
import type { TripState } from '../types/trip';
import { orderedPlacesForDay } from '../utils/export';

interface Props {
  state: TripState;
}

export function PrintView({ state }: Props) {
  return (
    <section className="print-area hidden print:block">
      <h1>Zakynthos rodinný plán</h1>
      {days.map((day) => (
        <article key={day.id} className="print-day">
          <h2>{day.title}</h2>
          <p><b>Odchod:</b> {day.recommendedDeparture}</p>
          <p><b>Trasa:</b> {day.route}</p>
          <div className="print-grid">
            {orderedPlacesForDay(day.id, state).map((place) => <p key={place.id}>☐ {place.name} - {place.recommendedTime}</p>)}
          </div>
          <p><b>Plán B:</b> {day.planB}</p>
          <div className="notes-box">Poznámky:</div>
        </article>
      ))}
      <h2>Čo zobrať</h2>
      <div className="print-grid">{packingItems.map((item) => <p key={item}>☐ {item}</p>)}</div>
    </section>
  );
}
