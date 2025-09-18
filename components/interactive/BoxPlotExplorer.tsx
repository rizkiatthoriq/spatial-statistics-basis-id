
import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

// Helper to calculate quantiles
const getQuantile = (sortedData: number[], q: number): number => {
  const pos = (sortedData.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sortedData[base + 1] !== undefined) {
    return sortedData[base] + rest * (sortedData[base + 1] - sortedData[base]);
  } else {
    return sortedData[base];
  }
};

const BoxPlotExplorer: React.FC = () => {
  const [data, setData] = useState<number[]>([10, 20, 22, 25, 28, 30, 31, 33, 38, 50, 75]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const handleAddNumber = () => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      setError('Harap masukkan angka yang valid.');
      return;
    }
    if (data.length >= 30) {
      setError('Jumlah data maksimal adalah 30.');
      return;
    }
    setData([...data, num]);
    setInputValue('');
    setError('');
  };

  const handleRemoveNumber = (indexToRemove: number) => {
    setData(data.filter((_, index) => index !== indexToRemove));
  };
  
  const stats = useMemo(() => {
    if (data.length < 4) return null;
    
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = getQuantile(sorted, 0.25);
    const median = getQuantile(sorted, 0.5);
    const q3 = getQuantile(sorted, 0.75);
    const iqr = q3 - q1;
    
    const lowerWhiskerBound = q1 - 1.5 * iqr;
    const upperWhiskerBound = q3 + 1.5 * iqr;

    const outliers = sorted.filter(d => d < lowerWhiskerBound || d > upperWhiskerBound);
    const nonOutliers = sorted.filter(d => d >= lowerWhiskerBound && d <= upperWhiskerBound);
    
    const min = nonOutliers[0];
    const max = nonOutliers[nonOutliers.length - 1];

    const dataMin = sorted[0];
    const dataMax = sorted[sorted.length-1];

    return { q1, median, q3, iqr, min, max, outliers, dataMin, dataMax };
  }, [data]);
  
  const getPosition = (value: number) => {
    if (!stats) return 0;
    const range = (stats.dataMax + 10) - (stats.dataMin - 10);
    if (range === 0) return 50;
    return ((value - (stats.dataMin - 10)) / range) * 100;
  };
  
  return (
    <div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">Eksplorasi Box Plot Interaktif</h3>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddNumber()}
          placeholder="e.g., 50"
          className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-neutral-900"
          aria-label="Tambah angka baru"
        />
        <button onClick={handleAddNumber} className="px-5 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Tambah
        </button>
         {error && <p className="text-sm text-red-500 w-full mt-1">{error}</p>}
      </div>

      <div className="relative h-48 w-full">
        {/* Axis line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-300 -translate-y-px"></div>
        
        {/* Data points */}
        <AnimatePresence>
          {data.map((d, i) => (
            <motion.div
              key={`${d}-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute group"
              style={{
                left: `${getPosition(d)}%`,
                top: `calc(50% + ${(i % 2 === 0 ? -1 : 1) * (15 + (i % 5) * 4)}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <button onClick={() => handleRemoveNumber(i)} className={`w-4 h-4 rounded-full border-2 border-white shadow transition-all duration-200 ${stats && stats.outliers.includes(d) ? 'bg-red-500' : 'bg-neutral-500'} group-hover:scale-125 group-hover:bg-red-500`}>
                <span className="sr-only">Hapus {d}</span>
              </button>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{d}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Box Plot */}
        {stats && (
          <motion.div 
            className="absolute top-1/2 left-0 h-16 -translate-y-1/2" 
            style={{ width: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Box */}
            <div className="absolute h-full bg-primary-100 border-2 border-primary-500 rounded-md" style={{ left: `${getPosition(stats.q1)}%`, width: `${getPosition(stats.q3) - getPosition(stats.q1)}%` }}></div>
            {/* Median line */}
            <div className="absolute h-full w-1 bg-primary-600" style={{ left: `${getPosition(stats.median)}%` }}></div>
            {/* Whiskers */}
            <div className="absolute top-1/2 h-0.5 bg-primary-500" style={{ left: `${getPosition(stats.min)}%`, width: `${getPosition(stats.q1) - getPosition(stats.min)}%` }}></div>
            <div className="absolute top-1/2 h-0.5 bg-primary-500" style={{ left: `${getPosition(stats.q3)}%`, width: `${getPosition(stats.max) - getPosition(stats.q3)}%` }}></div>
            {/* Min/Max ticks */}
            <div className="absolute top-1/2 -translate-y-1/2 h-6 w-0.5 bg-primary-500" style={{ left: `${getPosition(stats.min)}%` }}></div>
            <div className="absolute top-1/2 -translate-y-1/2 h-6 w-0.5 bg-primary-500" style={{ left: `${getPosition(stats.max)}%` }}></div>
          </motion.div>
        )}
      </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-6">
        <div className="bg-primary-50 p-3 rounded-lg">
          <p className="text-xs text-primary-700 font-semibold">Q1 (Kuartil 1)</p>
          <p className="text-2xl font-bold text-primary-900">{stats ? stats.q1.toFixed(1) : 'N/A'}</p>
        </div>
        <div className="bg-primary-100 p-3 rounded-lg">
          <p className="text-xs text-primary-700 font-semibold">MEDIAN (Q2)</p>
          <p className="text-2xl font-bold text-primary-900">{stats ? stats.median.toFixed(1) : 'N/A'}</p>
        </div>
        <div className="bg-primary-50 p-3 rounded-lg">
          <p className="text-xs text-primary-700 font-semibold">Q3 (Kuartil 3)</p>
          <p className="text-2xl font-bold text-primary-900">{stats ? stats.q3.toFixed(1) : 'N/A'}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-xs text-purple-700 font-semibold">IQR (Q3 - Q1)</p>
          <p className="text-2xl font-bold text-purple-900">{stats ? stats.iqr.toFixed(1) : 'N/A'}</p>
        </div>
      </div>
      <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-800">
               Titik data berwarna merah adalah <strong>"outlier"</strong> (pencilan) karena berada di luar batas 1.5 x IQR dari kotak utama. Klik pada titik mana pun untuk menghapusnya dan lihat bagaimana box plot beradaptasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxPlotExplorer;
