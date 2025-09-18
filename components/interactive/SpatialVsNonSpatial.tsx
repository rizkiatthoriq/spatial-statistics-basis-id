
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, MapPin } from 'lucide-react';

const GRID_SIZE = 10;

// Data terstruktur dengan mean ~50
const clusteredData = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(30));
for (let r = 2; r < 5; r++) for (let c = 2; c < 5; c++) clusteredData[r][c] = 90;
for (let r = 6; r < 9; r++) for (let c = 6; c < 9; c++) clusteredData[r][c] = 90;
// Flatten and calculate sum to adjust one cell to make mean exactly 50
const flatClustered = clusteredData.flat();
const sumClustered = flatClustered.reduce((a, b) => a + b, 0);
clusteredData[0][0] = 30 + (GRID_SIZE * GRID_SIZE * 50 - sumClustered);


// Data acak dengan mean ~50
const randomData = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0).map(() => Math.random() * 80 + 10));
// Flatten and calculate sum to adjust one cell to make mean exactly 50
const flatRandom = randomData.flat();
const sumRandom = flatRandom.reduce((a, b) => a + b, 0);
randomData[0][0] = 10 + (GRID_SIZE * GRID_SIZE * 50 - (sumRandom - randomData[0][0]));

const getColor = (value: number) => {
  if (value > 80) return 'bg-red-500';
  if (value > 60) return 'bg-orange-400';
  if (value > 40) return 'bg-yellow-300';
  if (value > 20) return 'bg-blue-300';
  return 'bg-blue-500';
};

const MapGrid = ({ data }: { data: number[][] }) => (
    <div className="grid gap-px border bg-neutral-300" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
        {data.map((row, rIdx) => 
            row.map((cellValue, cIdx) => (
                <div key={`${rIdx}-${cIdx}`} className={`aspect-square ${getColor(cellValue)}`} />
            ))
        )}
    </div>
);

const SpatialVsNonSpatial: React.FC = () => {
  return (
    <div className="bg-white rounded-lg">
      <h3 className="text-xl font-semibold text-neutral-800 mb-4 text-center">Studi Kasus: Wabah Penyakit di Dua Kota</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
            <h4 className="font-semibold text-neutral-700 mb-2 flex items-center justify-center gap-2"><MapPin className="w-5 h-5 text-primary-600"/> Kota Cempaka: Pola Terkelompok</h4>
            <MapGrid data={clusteredData} />
             <p className="text-xs text-neutral-500 mt-2">Kasus penyakit terkonsentrasi di dua lingkungan. Ini menunjukkan penyebab lokal (mis. sumber air).</p>
        </div>
        <div className="text-center">
            <h4 className="font-semibold text-neutral-700 mb-2 flex items-center justify-center gap-2"><Users className="w-5 h-5 text-neutral-500"/> Kota Anggrek: Pola Acak</h4>
            <MapGrid data={randomData} />
            <p className="text-xs text-neutral-500 mt-2">Kasus tersebar merata. Ini menunjukkan penyebab yang tidak terlokalisasi (mis. flu musiman).</p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <h4 className="text-lg font-semibold text-center text-neutral-800 mb-4">Statistik Deskriptif Identik</h4>
        <div className="flex justify-around text-center p-4 bg-neutral-50 rounded-lg">
            <div>
                <p className="text-sm text-neutral-500">Total Kasus</p>
                <p className="text-2xl font-bold text-primary-700">100</p>
            </div>
            <div>
                <p className="text-sm text-neutral-500">Rata-rata/Blok</p>
                <p className="text-2xl font-bold text-primary-700">50.0</p>
            </div>
             <div>
                <p className="text-sm text-neutral-500">Std. Dev</p>
                <p className="text-2xl font-bold text-primary-700">~24.5</p>
            </div>
        </div>
        <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
             <p className="text-sm text-amber-800">
                <strong>Kesimpulan:</strong> Kedua kota memiliki jumlah total kasus dan rata-rata yang sama. Namun, analisis spasial di Kota Cempaka mengungkapkan "hotspot" yang memerlukan investigasi lokal yang ditargetkan, sebuah wawasan yang akan terlewatkan sepenuhnya jika hanya melihat statistik ringkasan. Ini membuktikan mengapa lokasi itu penting.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SpatialVsNonSpatial;
