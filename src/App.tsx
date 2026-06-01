import { useMemo, useState } from 'react';
import { Anchor, Printer } from 'lucide-react';
import { BackupPanel } from './components/BackupPanel';
import { BottomNav } from './components/BottomNav';
import { DayDetail } from './components/DayDetail';
import { DayOverview } from './components/DayOverview';
import { PackingSafety } from './components/PackingSafety';
import { PrintView } from './components/PrintView';
import { TripMap } from './components/TripMap';
import { days } from './data/days';
import { useTripState } from './hooks/useTripState';

type Tab = 'today' | 'days' | 'map' | 'pack' | 'backup';

function App() {
  const trip = useTripState();
  const [tab, setTab] = useState<Tab>('today');
  const currentDay = useMemo(() => days.find((day) => day.id === trip.state.currentDayId) ?? days[0], [trip.state.currentDayId]);

  const openDay = (dayId: string) => {
    trip.setCurrentDay(dayId);
    setTab('today');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-foam via-white to-sand/50 pb-24 text-slate-800 print:hidden">
        <header className="sticky top-0 z-40 border-b border-sea/10 bg-foam/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sea text-white"><Anchor size={22} /></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-olive">rodinná dovolenka</p>
              <h1 className="truncate text-xl font-extrabold text-deepSea">Zakynthos plánovač</h1>
            </div>
            <button onClick={() => window.print()} className="flex h-11 w-11 items-center justify-center rounded-lg border border-sea/20 bg-white text-sea" aria-label="Tlačiť"><Printer size={19} /></button>
          </div>
        </header>

        <main className="mx-auto max-w-lg px-4 py-4">
          {tab === 'today' && <DayDetail day={currentDay} state={trip.state} onStatus={trip.setPlaceStatus} onDayNote={trip.setDayNote} onPlaceNote={trip.setPlaceNote} onMealTime={trip.setMealTime} onMove={trip.movePlace} />}
          {tab === 'days' && <DayOverview days={days} state={trip.state} onOpen={openDay} onSetCurrent={trip.setCurrentDay} />}
          {tab === 'map' && <TripMap state={trip.state} onOpenDay={openDay} />}
          {tab === 'pack' && <PackingSafety state={trip.state} onPacking={trip.setPacking} />}
          {tab === 'backup' && <BackupPanel state={trip.state} onImport={trip.importState} onReset={trip.reset} />}
        </main>

        <BottomNav active={tab} onChange={setTab} />
      </div>
      <PrintView state={trip.state} />
    </>
  );
}

export default App;
