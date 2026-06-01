import { Download, FileText, RotateCcw, Share2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import type { TripState } from '../types/trip';
import { buildTextExport, downloadJson, sharePlan } from '../utils/export';

interface Props {
  state: TripState;
  onImport: (state: TripState) => void;
  onReset: () => void;
}

export function BackupPanel({ state, onImport, onReset }: Props) {
  const [jsonText, setJsonText] = useState('');
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const text = buildTextExport(state);

  const importFromText = (value: string) => {
    try {
      onImport(JSON.parse(value) as TripState);
      setMessage('Záloha bola importovaná.');
      setJsonText('');
    } catch {
      setMessage('JSON sa nepodarilo načítať. Skontroluj vložený text alebo súbor.');
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h2 className="text-xl font-bold text-deepSea">Export a zdieľanie</h2>
        <div className="mt-3 grid gap-2">
          <button onClick={async () => { await navigator.clipboard.writeText(text); setMessage('Text plánu je skopírovaný.'); }} className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-sea/20 font-semibold text-sea"><FileText size={18} />Exportovať plán ako text</button>
          <button onClick={async () => { const result = await sharePlan(text); setMessage(result === 'shared' ? 'Plán je odoslaný na zdieľanie.' : 'Zdieľanie nie je dostupné, text je skopírovaný.'); }} className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sea font-semibold text-white"><Share2 size={18} />Zdieľať plán</button>
          <button onClick={() => downloadJson(state)} className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-deepSea font-semibold text-white"><Download size={18} />Exportovať JSON zálohu</button>
          <button onClick={() => window.print()} className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-sea/20 font-semibold text-sea">Tlačiť A4 plán</button>
        </div>
        <textarea readOnly value={text} className="mt-3 h-48 w-full rounded-lg border border-sea/15 bg-foam/40 p-3 text-sm" />
      </div>

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <h2 className="text-xl font-bold text-deepSea">Obnova z JSON</h2>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          importFromText(await file.text());
          event.target.value = '';
        }} />
        <div className="mt-3 grid gap-2">
          <button onClick={() => fileRef.current?.click()} className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-sea/20 font-semibold text-sea"><Upload size={18} />Importovať zo súboru</button>
          <textarea value={jsonText} onChange={(event) => setJsonText(event.target.value)} placeholder="Alebo sem vlož JSON zálohu..." className="min-h-32 w-full rounded-lg border border-sea/15 bg-foam/40 p-3 text-base" />
          <button onClick={() => importFromText(jsonText)} className="min-h-12 rounded-lg bg-sea font-semibold text-white">Importovať vložený JSON</button>
        </div>
      </div>

      <div className="rounded-lg bg-coral/10 p-4">
        <h2 className="text-lg font-bold text-coral">Reset plánu</h2>
        <p className="mt-1 text-sm text-coral">Vymaže lokálne poznámky, statusy, poradie a časy iba v tomto zariadení.</p>
        <button onClick={() => { if (confirm('Naozaj resetovať plán v tomto mobile?')) onReset(); }} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-coral font-semibold text-white"><RotateCcw size={18} />Resetovať plán</button>
      </div>
      {message && <p className="rounded-lg bg-foam p-3 text-sm font-semibold text-deepSea">{message}</p>}
    </section>
  );
}
