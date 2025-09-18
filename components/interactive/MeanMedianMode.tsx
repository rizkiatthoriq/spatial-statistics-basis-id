import React, { useState, useMemo } from 'react';
import { Lightbulb } from 'lucide-react';

const MeanMedianMode: React.FC = () => {
  const [data, setData] = useState<number[]>([10, 20, 20, 30, 70]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddNumber = () => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      setError('Harap masukkan angka yang valid.');
      return;
    }
    if (data.length >= 20) {
      setError('Jumlah data maksimal adalah 20 untuk menjaga visualisasi tetap jelas.');
      return;
    }
    setData([...data, num].sort((a,b)=>a-b));
    setInputValue('');
    setError('');
  };
  
  const handleRemoveNumber = (indexToRemove: number) => {
    setData(data.filter((_, index) => index !== indexToRemove));
  };

  const { mean, median, mode, sortedData, min, max } = useMemo(() => {
    if (data.length === 0) return { mean: 0, median: 0, mode: 'N/A', sortedData: [], min:0, max: 100 };
    
    const sorted = [...data].sort((a, b) => a - b);
    
    const sum = sorted.reduce((acc, val) => acc + val, 0);
    const meanVal = sum / sorted.length;
    
    let medianVal;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      medianVal = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      medianVal = sorted[mid];
    }
    
    const counts: { [key: number]: number } = {};
    sorted.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
    });
    let maxCount = 0;
    let modes: number[] = [];
    for (const num in counts) {
      if (counts[num] > maxCount) {
        modes = [Number(num)];
        maxCount = counts[num];
      } else if (counts[num] === maxCount && counts[num] > 1) {
        modes.push(Number(num));
      }
    }
    const modeStr = modes.length === 0 || maxCount === 1 ? 'N/A' : modes.join(', ');

    const dataMin = sorted[0];
    const dataMax = sorted[sorted.length - 1];

    return { mean: meanVal, median: medianVal, mode: modeStr, sortedData: sorted, min: dataMin, max: dataMax };
  }, [data]);

  const getPosition = (value: number) => {
    const range = max - min;
    if (range === 0) return 50;
    return ((value - min) / range) * 100;
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">Visualisasi Pusat Data</h3>
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
        {error && <p className="text-sm text-red-500 w-full">{error}</p>}
      </div>

      <div className="relative h-40 bg-neutral-50 rounded-lg p-4 pt-12 border">
        {/* Axis line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-neutral-300 -translate-y-1/2" />
        
        {/* Data points */}
        {sortedData.map((num, index) => (
          <div 
            key={index}
            className="absolute -translate-x-1/2 group cursor-pointer"
            style={{ left: `${getPosition(num)}%`, bottom: '50%' }}
            onClick={() => handleRemoveNumber(index)}
          >
            <div className="w-5 h-5 bg-primary-500 rounded-full border-2 border-white shadow transition-transform group-hover:scale-125"></div>
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{num}</span>
          </div>
        ))}

        {/* Mean marker */}
        {data.length > 0 && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ left: `${getPosition(mean)}%`, width: `calc(100% - ${getPosition(mean)}%)`}}>
             <div 
                className="absolute top-2 -translate-x-1/2 transition-all duration-500 ease-out"
              >
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-indigo-600">Mean</span>
                <span className="text-xs font-mono text-indigo-600">{mean.toFixed(1)}</span>
                <div className="w-0.5 h-6 bg-indigo-500 mt-1"></div>
              </div>
            </div>
          </div>
        )}

        {/* Median marker */}
        {data.length > 0 && (
           <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ left: `${getPosition(median)}%`, width: `calc(100% - ${getPosition(median)}%)`}}>
             <div 
               className="absolute bottom-2 -translate-x-1/2 transition-all duration-500 ease-out"
             >
               <div className="flex flex-col items-center">
                 <div className="w-0.5 h-6 bg-teal-500 mb-1"></div>
                 <span className="text-sm font-bold text-teal-600">Median</span>
                 <span className="text-xs font-mono text-teal-600">{median.toFixed(1)}</span>
               </div>
            </div>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-indigo-700 font-semibold">MEAN</p>
          <p className="text-3xl font-bold text-indigo-900">{mean.toFixed(2)}</p>
        </div>
        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="text-sm text-teal-700 font-semibold">MEDIAN</p>
          <p className="text-3xl font-bold text-teal-900">{median.toFixed(2)}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-sm text-amber-700 font-semibold">MODE</p>
          <p className="text-3xl font-bold text-amber-900">{mode}</p>
        </div>
      </div>
       <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Lightbulb className="h-5 w-5 text-amber-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <strong>Tips Interaktif:</strong> Tambahkan angka yang sangat besar (misal: 1000) untuk melihat bagaimana penanda 'Mean' tertarik kuat oleh outlier, sementara 'Median' tetap stabil di tengah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeanMedianMode;
