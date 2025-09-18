import React, { useState, useMemo } from 'react';

const GRID_SIZE = 12;

type PatternType = 'clustered' | 'dispersed' | 'random';

const generateGridData = (pattern: PatternType): number[][] => {
  const grid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));

  switch (pattern) {
    case 'clustered':
      // Hotspot
      for (let r = 1; r < 5; r++) for (let c = 1; c < 5; c++) grid[r][c] = 85 + Math.random() * 15;
      // Coldspot
      for (let r = 7; r < 11; r++) for (let c = 7; c < 11; c++) grid[r][c] = Math.random() * 15;
      // Mid-range elsewhere
      for (let r = 0; r < GRID_SIZE; r++) for (let c = 0; c < GRID_SIZE; c++) if (grid[r][c] === 0) grid[r][c] = 30 + Math.random() * 40;
      return grid;
    
    case 'dispersed':
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          grid[r][c] = (r + c) % 2 === 0 ? 85 + Math.random() * 15 : Math.random() * 15;
        }
      }
      return grid;
      
    case 'random':
    default:
      for (let r = 0; r < GRID_SIZE; r++) for (let c = 0; c < GRID_SIZE; c++) grid[r][c] = Math.random() * 100;
      return grid;
  }
};

const getColor = (value: number) => {
    // A more perceptually uniform color scale (e.g., Viridis-like)
    if (value > 90) return 'bg-yellow-400';
    if (value > 80) return 'bg-lime-400';
    if (value > 65) return 'bg-green-500';
    if (value > 50) return 'bg-teal-500';
    if (value > 35) return 'bg-cyan-600';
    if (value > 20) return 'bg-blue-700';
    return 'bg-indigo-800';
};

const LEGEND_COLORS = [
    { color: 'bg-indigo-800', label: 'Sangat Rendah' },
    { color: 'bg-blue-700', label: '' },
    { color: 'bg-teal-500', label: 'Sedang' },
    { color: 'bg-lime-400', label: '' },
    { color: 'bg-yellow-400', label: 'Sangat Tinggi' }
];

const patternInfo = {
    clustered: { 
        title: "Positif (Mengelompok / Clustered)", 
        moran: "~ +0.8", 
        description: "Nilai tinggi cenderung berdekatan dengan nilai tinggi (hotspot), dan nilai rendah berdekatan dengan nilai rendah (coldspot). Ini adalah pola yang paling umum di dunia nyata." 
    },
    dispersed: { 
        title: "Negatif (Menyebar / Dispersed)", 
        moran: "~ -0.7", 
        description: "Nilai tinggi cenderung berdekatan dengan nilai rendah, menciptakan pola seperti papan catur. Contohnya adalah persaingan antar toko ritel."
    },
    random: { 
        title: "Tidak Ada (Acak / Random)", 
        moran: "~ 0.0", 
        description: "Tidak ada pola geografis yang jelas. Nilai-nilai tersebar secara acak di seluruh ruang, menunjukkan tidak adanya ketergantungan spasial."
    }
}

const SpatialAutocorrelationMap: React.FC = () => {
    const [pattern, setPattern] = useState<PatternType>('clustered');
    const gridData = useMemo(() => generateGridData(pattern), [pattern]);

    return (
        <div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-4">Peta Interaktif Autokorelasi Spasial</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(patternInfo).map(p => (
                    <button 
                        key={p} 
                        onClick={() => setPattern(p as PatternType)}
                        className={`px-4 py-2 rounded-md transition-colors font-semibold ${pattern === p ? 'bg-primary-600 text-white shadow' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}
                    >
                       {patternInfo[p as PatternType].title}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                 <div className="flex-shrink-0 grid gap-0.5 border-2 border-neutral-200" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
                    {gridData.map((row, rIdx) => 
                        row.map((cellValue, cIdx) => (
                            <div key={`${rIdx}-${cIdx}`} className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-200 ${getColor(cellValue)}`} />
                        ))
                    )}
                 </div>
                 <div className="flex-1 bg-neutral-50 p-4 rounded-lg border">
                    <h4 className="font-bold text-neutral-800">Pola: {patternInfo[pattern].title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{patternInfo[pattern].description}</p>
                    <div className="mt-3 pt-3 border-t border-neutral-200">
                        <p className="text-sm text-neutral-500">Nilai Moran's I Global (Estimasi): <span className="font-mono font-bold text-primary-600 text-base">{patternInfo[pattern].moran}</span></p>
                    </div>
                 </div>
            </div>
             <div className="flex items-center justify-center gap-1 mt-4 text-xs text-neutral-500 w-full max-w-sm mx-auto">
                <span className="flex-1 text-right">Rendah</span>
                <div className="flex">
                    {LEGEND_COLORS.map(item => <div key={item.color} className={`w-8 h-4 ${item.color}`} />)}
                </div>
                <span className="flex-1 text-left">Tinggi</span>
            </div>
        </div>
    );
};

export default SpatialAutocorrelationMap;