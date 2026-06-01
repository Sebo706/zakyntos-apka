import { CalendarDays, CheckSquare, Map, Printer, ShieldCheck, Share2 } from 'lucide-react';

type Tab = 'today' | 'days' | 'map' | 'pack' | 'backup';

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const items = [
  { id: 'today' as const, label: 'Dnes', icon: CalendarDays },
  { id: 'days' as const, label: 'Dni', icon: CheckSquare },
  { id: 'map' as const, label: 'Mapa', icon: Map },
  { id: 'pack' as const, label: 'Veci', icon: ShieldCheck },
  { id: 'backup' as const, label: 'Export', icon: Share2 }
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-[500] border-t border-sea/10 bg-white/95 px-2 pb-safe pt-2 shadow-[0_-10px_30px_rgba(31,92,100,0.12)] backdrop-blur print:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => onChange(item.id)} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold ${active === item.id ? 'bg-sea text-white' : 'text-deepSea hover:bg-foam'}`} aria-label={item.label}>
              <Icon size={21} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
