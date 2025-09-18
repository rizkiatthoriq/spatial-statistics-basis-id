import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import type { Point } from '../../types';

// Pearson correlation coefficient calculation
const pearsonCorrelation = <T,>(data: T[], getX: (item: T) => number, getY: (item: T) => number): number => {
    if (data.length < 2) return 0;
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (const item of data) {
        const x = getX(item);
        const y = getY(item);
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
        sumY2 += y * y;
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
};


const generatePositive = (n = 50): Point[] => Array.from({ length: n }, (_, i) => ({ x: i, y: i * 2 + Math.random() * 20 }));
const generateNegative = (n = 50): Point[] => Array.from({ length: n }, (_, i) => ({ x: i, y: 100 - i * 2 + Math.random() * 20 }));
const generateNone = (n = 50): Point[] => Array.from({ length: n }, (_, i) => ({ x: i, y: Math.random() * 100 }));


const datasets = {
    positive: { name: 'Korelasi Positif Kuat', data: generatePositive(), color: '#16a34a', interpretation: "Saat Nilai X meningkat, Nilai Y cenderung meningkat.", xAxis: "Jam Belajar", yAxis: "Nilai Ujian" },
    negative: { name: 'Korelasi Negatif Kuat', data: generateNegative(), color: '#dc2626', interpretation: "Saat Nilai X meningkat, Nilai Y cenderung menurun.", xAxis: "Kecepatan (km/jam)", yAxis: "Waktu Tempuh (menit)" },
    none: { name: 'Tidak Ada Korelasi', data: generateNone(), color: '#64748b', interpretation: "Tidak ada hubungan linear yang jelas antara Nilai X dan Nilai Y.", xAxis: "Ukuran Sepatu", yAxis: "Skor IQ" },
};

type CorrelationType = 'positive' | 'negative' | 'none';

const ScatterPlotExplorer: React.FC = () => {
    const [correlationType, setCorrelationType] = useState<CorrelationType>('positive');
    
    const currentDataset = datasets[correlationType];
    const correlationR = useMemo(() => pearsonCorrelation(currentDataset.data, p => p.x, p => p.y), [currentDataset.data]);

    return (
    <div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">Eksplorasi Scatter Plot & Korelasi</h3>
        <p className="text-neutral-600 mb-4">Scatter plot adalah cara terbaik untuk 'melihat' hubungan antara dua variabel. Apakah ada tren? Seberapa kuat tren tersebut? Pilih skenario di bawah untuk melihat bagaimana pola data secara visual berhubungan dengan Koefisien Korelasi Pearson (r).</p>
        <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(datasets).map((key) => (
                <button 
                    key={key} 
                    onClick={() => setCorrelationType(key as CorrelationType)}
                    className={`px-4 py-2 rounded-md transition-colors font-semibold ${correlationType === key ? 'bg-primary-600 text-white shadow' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}
                >
                    {datasets[key as CorrelationType].name}
                </button>
            ))}
        </div>

        <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis type="number" dataKey="x" name={currentDataset.xAxis} tick={{ fill: '#475569' }}>
                       <Label value={currentDataset.xAxis} offset={-30} position="insideBottom" fill="#475569"/>
                    </XAxis>
                    <YAxis type="number" dataKey="y" name={currentDataset.yAxis} tick={{ fill: '#475569' }}>
                       <Label value={currentDataset.yAxis} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#475569"/>
                    </YAxis>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperClassName="!bg-white !border-neutral-200 !rounded-md !shadow-lg" />
                    <Scatter name="Data" data={currentDataset.data} fill={currentDataset.color} />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
        
        <div className="text-center mt-6 bg-neutral-50 p-4 rounded-lg border">
            <p className="text-sm text-neutral-700 font-semibold">KOEFISIEN KORELASI PEARSON (r)</p>
            <p className="text-4xl font-bold" style={{color: currentDataset.color}}>{correlationR.toFixed(3)}</p>
            <p className="text-sm text-neutral-600 mt-2 max-w-lg mx-auto">{currentDataset.interpretation}</p>
            <p className="text-xs text-neutral-500 mt-2 max-w-lg mx-auto">Nilai 'r' berkisar dari -1 (korelasi negatif sempurna) hingga +1 (korelasi positif sempurna). Nilai mendekati 0 menunjukkan tidak ada hubungan linear.</p>
        </div>
    </div>
    );
};

export default ScatterPlotExplorer;
