
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const CorrelationStrengthViz: React.FC = () => {
  const [correlation, setCorrelation] = useState(0.8);

  const { label, color, Icon, bgColor } = useMemo(() => {
    if (correlation > 0.7) return { label: 'Positif Kuat', color: 'text-green-600', Icon: TrendingUp, bgColor: 'bg-green-50' };
    if (correlation > 0.3) return { label: 'Positif Sedang', color: 'text-green-500', Icon: TrendingUp, bgColor: 'bg-green-50' };
    if (correlation > -0.3) return { label: 'Tidak Ada / Lemah', color: 'text-neutral-500', Icon: Minus, bgColor: 'bg-neutral-100' };
    if (correlation > -0.7) return { label: 'Negatif Sedang', color: 'text-red-500', Icon: TrendingDown, bgColor: 'bg-red-50' };
    return { label: 'Negatif Kuat', color: 'text-red-600', Icon: TrendingDown, bgColor: 'bg-red-50' };
  }, [correlation]);
  
  // Use a fixed value for bar1 to represent an input, and bar2 reacts
  const bar1Height = 75; // Represents a high value for variable X
  const midPoint = 50;
  // Calculate bar2 height based on correlation
  const bar2Height = midPoint + (bar1Height - midPoint) * correlation;

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-neutral-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-neutral-800 text-center">Visualisasi Kekuatan Hubungan</h3>
      <p className="text-center text-sm text-neutral-600 max-w-md">
        Geser slider untuk melihat bagaimana dua variabel dapat berhubungan. Perhatikan bagaimana perubahan pada "Variabel X" memengaruhi "Variabel Y" berdasarkan kekuatan dan arah korelasi.
      </p>

      {/* Visual Bars */}
      <div className="w-full max-w-xs h-48 flex justify-around items-end gap-8 px-4 pt-4">
        {/* Bar 1 */}
        <div className="w-16 flex flex-col items-center">
            <motion.div
                className="w-full bg-blue-500 rounded-t-md"
                animate={{ height: `${bar1Height}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
            />
            <p className="mt-2 text-sm font-semibold text-neutral-700">Variabel X</p>
            <p className="text-xs text-neutral-500">(mis. Jam Belajar)</p>
        </div>
        
        {/* Correlation Icon */}
        <div className="self-center mb-20">
            <Icon className={`w-10 h-10 transition-colors ${color}`} />
        </div>

        {/* Bar 2 */}
        <div className="w-16 flex flex-col items-center">
            <motion.div
                className="w-full bg-purple-500 rounded-t-md"
                animate={{ height: `${bar2Height}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
            />
            <p className="mt-2 text-sm font-semibold text-neutral-700">Variabel Y</p>
             <p className="text-xs text-neutral-500">(mis. Nilai Ujian)</p>
        </div>
      </div>

      {/* Slider and Labels */}
      <div className="w-full max-w-sm">
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={correlation}
          onChange={(e) => setCorrelation(parseFloat(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>-1.0 (Negatif)</span>
          <span>0.0 (Netral)</span>
          <span>+1.0 (Positif)</span>
        </div>
      </div>
      
      <div className={`mt-2 p-3 rounded-lg text-center transition-colors w-full max-w-sm ${bgColor}`}>
          <p className={`font-bold text-lg ${color}`}>{label}</p>
          <p className="text-sm text-neutral-700">Korelasi: <span className="font-mono font-semibold">{correlation.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default CorrelationStrengthViz;
