
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BarChartHorizontal } from 'lucide-react';

const generateData = (count: number) => 
  Array.from({ length: count }, () => Math.floor(Math.random() * 80 + 20));

const DataSummarizationIntro: React.FC = () => {
  const [isSummarized, setIsSummarized] = useState(false);
  const data = useMemo(() => generateData(100), []);

  const summary = useMemo(() => {
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    return { count: data.length, mean: mean.toFixed(1), min, max };
  }, [data]);

  const histogramData = useMemo(() => {
    const bins = Array.from({ length: 10 }, (_, i) => ({
      range: `${i * 10}-${i * 10 + 9}`,
      count: 0,
    }));
    data.forEach(value => {
      const binIndex = Math.floor(value / 10);
      if (bins[binIndex]) {
        bins[binIndex].count++;
      }
    });
    return bins;
  }, [data]);

  const maxFreq = Math.max(...histogramData.map(b => b.count));

  return (
    <div className="text-center bg-neutral-50 p-6 rounded-lg border">
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">Dari Kekacauan ke Kejelasan</h3>
      <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">Bayangkan ini adalah waktu tunggu (dalam detik) untuk 100 pelanggan di sebuah kafe. Sulit untuk melihat pola apa pun dari data mentah.</p>

      <div className="relative w-full h-64 bg-white rounded-lg border shadow-inner overflow-hidden">
        <AnimatePresence>
          {!isSummarized ? (
            <motion.div key="raw">
              {data.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.005 }}
                  className="absolute w-2.5 h-2.5 bg-primary-400 rounded-full"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div key="summary" className="p-4 h-full flex flex-col justify-end">
              <div className="flex items-end h-full gap-px">
                {histogramData.map((bin, i) => (
                   <motion.div
                    key={bin.range}
                    className="w-full bg-primary-500 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${(bin.count / maxFreq) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05, type: 'spring', stiffness: 100 }}
                  >
                     <div className="relative w-full h-full">
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500">{bin.range}</span>
                    </div>
                   </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
      {isSummarized && (
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-6"
        >
            <div className="bg-white p-3 rounded-lg border">
              <p className="text-xs text-neutral-500 font-semibold">JUMLAH PELANGGAN</p>
              <p className="text-2xl font-bold text-primary-900">{summary.count}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <p className="text-xs text-neutral-500 font-semibold">RATA-RATA TUNGGU</p>
              <p className="text-2xl font-bold text-primary-900">{summary.mean}s</p>
            </div>
             <div className="bg-white p-3 rounded-lg border">
              <p className="text-xs text-neutral-500 font-semibold">TERCEPAT</p>
              <p className="text-2xl font-bold text-green-600">{summary.min}s</p>
            </div>
             <div className="bg-white p-3 rounded-lg border">
              <p className="text-xs text-neutral-500 font-semibold">TERLAMA</p>
              <p className="text-2xl font-bold text-red-600">{summary.max}s</p>
            </div>
        </motion.div>
      )}
      </AnimatePresence>

      <button
        onClick={() => setIsSummarized(!isSummarized)}
        className="mt-6 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
      >
        {isSummarized ? <BarChartHorizontal size={18} /> : <Zap size={18} />}
        {isSummarized ? 'Lihat Data Mentah Lagi' : 'Ringkas Data Ini!'}
      </button>
    </div>
  );
};

export default DataSummarizationIntro;
