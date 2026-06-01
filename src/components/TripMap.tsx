import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { places } from '../data/places';
import type { PlaceStatus, TripState } from '../types/trip';

const colors: Record<PlaceStatus, string> = {
  main: '#2f7f86',
  optional: '#d9a84f',
  done: '#6f8a57',
  skipped: '#94a3b8'
};

function iconFor(status: PlaceStatus) {
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:22px;height:22px;border-radius:999px;background:${colors[status]};border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,.25)"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
}

interface Props {
  state: TripState;
  onOpenDay: (dayId: string) => void;
}

export function TripMap({ state, onOpenDay }: Props) {
  return (
    <section className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-sea/10 bg-white shadow-soft">
        <MapContainer center={[37.755, 20.82]} zoom={10} scrollWheelZoom={false} className="h-[68vh] min-h-[460px] w-full">
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {places.map((place) => {
            const status = state.placeStatuses[place.id] ?? place.status;
            return (
              <Marker key={place.id} position={place.coordinates} icon={iconFor(status)}>
                <Popup>
                  <div className="space-y-2 text-sm">
                    <strong>{place.name}</strong>
                    <p>{place.shortNote}</p>
                    <p><b>Čas:</b> {place.recommendedTime}</p>
                    <button onClick={() => onOpenDay(place.dayId)} className="w-full rounded-md bg-[#2f7f86] px-3 py-2 font-semibold text-white">Otvoriť deň</button>
                    <a href={place.googleMapsUrl} target="_blank" rel="noreferrer" className="block rounded-md bg-[#1f5c64] px-3 py-2 text-center font-semibold text-white">Otvoriť v Google Maps</a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span className="rounded-md bg-sea p-2 text-center font-bold text-white">hlavné</span>
        <span className="rounded-md bg-sand p-2 text-center font-bold text-deepSea">voliteľné</span>
        <span className="rounded-md bg-olive p-2 text-center font-bold text-white">hotovo</span>
        <span className="rounded-md bg-slate-200 p-2 text-center font-bold text-slate-600">vynechané</span>
      </div>
    </section>
  );
}
