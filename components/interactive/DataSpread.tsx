import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { Trash2, Info } from 'lucide-react';

const DataSpread: React.FC = () => {
  const [data, setData] = useState<number[]>([60, 65, 70, 75, 80]);

  const { range, stdDev, mean } = useMemo(() => {
    if (data.length < 2) return { range: 0, stdDev: 0, mean: data[0] || 0 };
    
    const sortedData = [...data].sort((a, b) => a - b);
    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];
    const range = max - min;
    
    const sum = sortedData.reduce((acc, val) => acc + val, 0);
    const meanVal = sum / sortedData.length;
    
    const variance = sortedData.reduce((acc, val) => acc + Math.pow(val - meanVal, 2), 0) / sortedData.length;
    const stdDevVal = Math.sqrt(variance);
    
    return { range, stdDev: stdDevVal, mean: meanVal };
  }, [data]);

  const chartData = useMemo(() => {
    return data.map((value, index) => ({ name: `P${index + 1}`, value }));
  }, [data]);
  
  const handleDataChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index] = Number(value);
    setData(newData);
  };
  
  const addDataPoint = () => {
    if(data.length < 15) {
      setData([...data, Math.round(mean)]);
    }
  }

  const removeDataPoint = (index: number) => {
    if(data.length > 2) {
      setData(data.filter((_, i) => i !== index));
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">Interaksi Keragaman Data</h3>
      <p className="text-neutral-600 mb-6">Rata-rata (mean) memberitahu kita pusat data, tapi seberapa baik ia mewakili keseluruhan data? Di sinilah ukuran keragaman berperan. Ukuran ini mengukur seberapa jauh setiap titik data tersebar dari rata-ratanya. Apakah datanya 'rapat' dan konsisten, atau 'menyebar' luas dan bervariasi? Ubah nilai di bawah untuk melihatnya secara visual.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {data.map((value, index) => (
          <div key={index} className="relative">
            <label className="block text-xs font-medium text-neutral-500 mb-1">Poin {index + 1}</label>
            <input 
              type="number" 
              value={value}
              onChange={(e) => handleDataChange(index, e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-neutral-900"
            />
            <button 
              onClick={() => removeDataPoint(index)} 
              className="absolute top-0 right-0 mt-1 mr-1 text-neutral-400 hover:text-red-500 disabled:opacity-50"
              disabled={data.length <= 2}
              aria-label={`Hapus Poin ${index + 1}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {data.length < 15 && (
           <div className="flex items-end">
             <button onClick={addDataPoint} className="w-full h-11 bg-primary-100 text-primary-700 font-semibold rounded-md hover:bg-primary-200 transition-colors">
               + Tambah
             </button>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
        <div className="bg-rose-50 p-4 rounded-lg">
          <p className="text-sm text-rose-700 font-semibold">RANGE (Jangkauan)</p>
          <p className="text-3xl font-bold text-rose-900">{range.toFixed(2)}</p>
        </div>
        <div className="bg-sky-50 p-4 rounded-lg">
          <p className="text-sm text-sky-700 font-semibold">STANDAR DEVIASI</p>
          <p className="text-3xl font-bold text-sky-900">{stdDev.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip wrapperClassName="!bg-white !border-neutral-200 !rounded-md !shadow-lg" />
            {data.length > 1 && (
                <ReferenceArea 
                    y1={mean - stdDev} 
                    y2={mean + stdDev} 
                    strokeOpacity={0.3} 
                    fill="#0ea5e9" 
                    fillOpacity={0.1} 
                    label={{ value: '±1 Std Dev', position: 'insideTopLeft', fill: '#0369a1', fontSize: 12 }} 
                />
            )}
            {data.length > 0 && (
                <ReferenceLine y={mean} stroke="#1d4ed8" strokeWidth={2} strokeDasharray="3 3" label={{ value: 'Mean', position: 'right', fill: '#1d4ed8' }} />
            )}
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
       <div className="mt-4 bg-sky-50 border-l-4 border-sky-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-sky-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-sky-800">
              Area biru muda menunjukkan rentang ±1 standar deviasi dari mean. Semakin lebar area ini, semakin besar keragaman data, yang berarti data lebih tersebar dari rata-ratanya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSpread;
