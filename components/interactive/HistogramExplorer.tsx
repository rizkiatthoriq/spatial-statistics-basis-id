import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info } from 'lucide-react';

// Simple random number generators for distributions
const generateNormal = (n = 200, mean = 50, stdDev = 10) => Array.from({ length: n }, () => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
});

const generateSkewedRight = (n = 200) => Array.from({ length: n }, () => 100 * Math.pow(Math.random(), 2.5));
const generateSkewedLeft = (n = 200) => Array.from({ length: n }, () => 100 - 100 * Math.pow(Math.random(), 2.5));

const datasets = {
  normal: { name: 'Normal (Simetris)', data: generateNormal(), color: '#14b8a6' },
  skewedRight: { name: 'Miring ke Kanan (Right Skewed)', data: generateSkewedRight(), color: '#f59e0b' },
  skewedLeft: { name: 'Miring ke Kiri (Left Skewed)', data: generateSkewedLeft(), color: '#ef4444' },
};

type DistributionType = 'normal' | 'skewedRight' | 'skewedLeft';

const HistogramExplorer: React.FC = () => {
  const [distribution, setDistribution] = useState<DistributionType>('normal');
  const [binCount, setBinCount] = useState<number>(10);

  const histogramData = useMemo(() => {
    const currentData = datasets[distribution].data;
    const min = Math.min(...currentData);
    const max = Math.max(...currentData);
    const binWidth = (max - min) / binCount;
    
    const bins = Array.from({ length: binCount }, (_, i) => {
      const binMin = min + i * binWidth;
      const binMax = binMin + binWidth;
      return {
        range: `${binMin.toFixed(1)}-${binMax.toFixed(1)}`,
        count: currentData.filter(d => d >= binMin && d < binMax).length,
      };
    });
    // Add the last value to the last bin
    const lastValue = currentData.find(d => d === max);
    if(lastValue) {
      const lastBin = bins[bins.length - 1];
      if(lastBin) lastBin.count++;
    }

    return bins;
  }, [distribution, binCount]);

  return (
    <div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-4">Eksplorasi Histogram</h3>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Pilih Distribusi Data</label>
          <select 
            value={distribution} 
            onChange={(e) => setDistribution(e.target.value as DistributionType)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {Object.entries(datasets).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="bins" className="block text-sm font-medium text-neutral-700 mb-1">Jumlah Bins: {binCount}</label>
          <input
            id="bins"
            type="range"
            min="5"
            max="30"
            value={binCount}
            onChange={(e) => setBinCount(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={histogramData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="range" angle={-30} textAnchor="end" height={50} interval="preserveStartEnd" tick={{ fill: '#475569' }} />
            <YAxis label={{ value: 'Frekuensi', angle: -90, position: 'insideLeft' }} tick={{ fill: '#475569' }}/>
            <Tooltip wrapperClassName="!bg-white !border-neutral-200 !rounded-md !shadow-lg" />
            <Bar dataKey="count">
               {histogramData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={datasets[distribution].color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
       <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Ubah jumlah 'Bins' untuk melihat bagaimana detail distribusi berubah. Terlalu sedikit Bins bisa menyembunyikan pola penting, sementara terlalu banyak Bins bisa menciptakan 'noise' yang membingungkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistogramExplorer;
