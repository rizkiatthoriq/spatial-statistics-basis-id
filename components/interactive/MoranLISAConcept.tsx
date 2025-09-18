
import React, { useState } from 'react';
import { Globe, MapPin, Coffee, TrendingUp, TrendingDown, Layers, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const GRID_SIZE = 10;
type View = 'data' | 'lisa';

// Data penjualan: 90-100 (tinggi), 10-20 (rendah), null (sedang/tidak signifikan)
const generateClusteredData = (): (number | null)[][] => {
    const grid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(null));
    // Hotspot
    for (let r = 1; r < 4; r++) for (let c = 1; c < 4; c++) grid[r][c] = 90 + Math.random() * 10;
    // Coldspot
    for (let r = 6; r < 9; r++) for (let c = 6; c < 9; c++) grid[r][c] = 10 + Math.random() * 10;
    
    // Data sedang di tempat lain untuk kontras
    grid[0][5] = 55; grid[4][7] = 60; grid[5][2] = 45; grid[9][4] = 50;

    return grid;
};

const salesData = generateClusteredData();

const getColor = (value: number | null, view: View) => {
    if (value === null) return 'bg-neutral-200/50';
    
    if (view === 'lisa') {
        if (value > 80) return 'bg-red-500'; // Hotspot (High-High)
        if (value < 30) return 'bg-blue-500'; // Coldspot (Low-Low)
        return 'bg-neutral-200/50'; // Not significant
    }
    
    // 'data' view
    if (value > 80) return 'bg-yellow-400';
    if (value > 30) return 'bg-teal-400';
    return 'bg-indigo-600';
};

const MapGrid = ({ view }: { view: View }) => {
    return (
        <div className="grid grid-cols-10 gap-0.5 p-1 bg-neutral-200 rounded-md border border-neutral-300">
            {salesData.map((row, rIdx) => 
                row.map((cellValue, cIdx) => (
                     <motion.div 
                        key={`${rIdx}-${cIdx}-${view}`}
                        initial={{ opacity: 0.5, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (rIdx * 0.02 + cIdx * 0.02) }}
                        className={`aspect-square rounded-sm ${getColor(cellValue, view)}`} 
                    />
                ))
            )}
        </div>
    );
};


const MoranLISAConcept: React.FC = () => {
    const [view, setView] = useState<View>('data');

    return (
        <div className="bg-white rounded-lg">
            <h3 className="text-xl font-semibold text-neutral-800 mb-2 text-center flex items-center justify-center gap-2">
                <Coffee className="w-6 h-6 text-amber-800"/>Studi Kasus: Analisis Penjualan Kedai Kopi
            </h3>
            <p className="text-center text-sm text-neutral-500 mb-6">Dari data mentah ke strategi bisnis yang dapat ditindaklanjuti.</p>
            
            <div className="flex justify-center gap-2 mb-4 p-1 bg-neutral-100 rounded-full">
                <button 
                    onClick={() => setView('data')}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors w-40 ${view === 'data' ? 'bg-white text-primary-600 shadow' : 'text-neutral-600 hover:bg-neutral-200'}`}
                >
                    Lihat Data Asli
                </button>
                <button 
                    onClick={() => setView('lisa')}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors w-40 ${view === 'lisa' ? 'bg-white text-primary-600 shadow' : 'text-neutral-600 hover:bg-neutral-200'}`}
                >
                    Tampilkan Analisis LISA
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Global Stats Column */}
                <div className="bg-neutral-50 p-4 rounded-lg border order-2 md:order-1 self-stretch">
                    <h4 className="font-bold text-neutral-800 text-base flex items-center gap-2 mb-3">
                        <Globe className="w-5 h-5 text-primary-600"/> Moran's I (Global)
                    </h4>
                    <p className="text-xs text-neutral-600 mb-3">Memberi tahu kita pola KESELURUHAN dalam satu angka. Nilai ini tidak berubah, apa pun tampilan petanya.</p>
                     <div className="text-center bg-white p-3 rounded-md shadow-inner">
                        <p className="text-xs text-neutral-500">Estimasi Moran's I</p>
                        <p className="text-3xl font-bold text-primary-700">+0.75</p>
                    </div>
                    <p className="text-center text-xs font-semibold text-green-700 mt-2 bg-green-50 p-2 rounded-md">
                        Kesimpulan: Penjualan tinggi cenderung berdekatan satu sama lain.
                    </p>
                </div>

                {/* Map Column */}
                <div className="order-1 md:order-2">
                    <MapGrid view={view} />
                    <div className="flex items-center justify-center gap-4 mt-2 text-xs text-neutral-500">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-indigo-600"></div>Rendah</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-teal-400"></div>Sedang</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-yellow-400"></div>Tinggi</div>
                    </div>
                </div>

                {/* Explanation Column */}
                <div className="order-3 self-stretch">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-neutral-50 p-4 rounded-lg border h-full"
                    >
                        {view === 'data' ? (
                            <div>
                                <h4 className="font-bold text-neutral-800 text-base flex items-center gap-2 mb-3">
                                    <Layers className="w-5 h-5 text-neutral-500"/> Tampilan: Data Penjualan Asli
                                </h4>
                                <p className="text-xs text-neutral-600">
                                    Ini adalah peta penjualan mentah. Kita bisa menduga ada beberapa area yang berkinerja lebih baik dari yang lain, tetapi sulit untuk mengatakan dengan pasti di mana klaster yang 'signifikan' secara statistik berada.
                                    <br/><br/>
                                    <strong>Pertanyaan:</strong> Di mana tepatnya kita harus memfokuskan upaya bisnis kita? Data mentah saja tidak cukup untuk menjawab.
                                </p>
                            </div>
                        ) : (
                             <div>
                                <h4 className="font-bold text-neutral-800 text-base flex items-center gap-2 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-600"/> Tampilan: Hasil Analisis LISA
                                </h4>
                                <p className="text-xs text-neutral-600 mb-3">
                                   LISA memfilter 'noise' dan menunjukkan klaster yang signifikan secara statistik. Sekarang, kita memiliki wawasan yang dapat ditindaklanjuti.
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white p-2 rounded-md border border-red-200">
                                        <h5 className="font-semibold text-red-600 flex items-center gap-1 text-sm"><TrendingUp size={14}/> Hotspot (Peluang)</h5>
                                        <p className="text-xs text-neutral-500">Klaster penjualan tinggi yang dikelilingi oleh penjualan tinggi lainnya. <strong className="text-red-700">Tindakan:</strong> Buka cabang baru, tingkatkan pemasaran.</p>
                                    </div>
                                    <div className="bg-white p-2 rounded-md border border-blue-200">
                                        <h5 className="font-semibold text-blue-600 flex items-center gap-1 text-sm"><TrendingDown size={14}/> Coldspot (Masalah)</h5>
                                        <p className="text-xs text-neutral-500">Klaster penjualan rendah yang dikelilingi oleh penjualan rendah lainnya. <strong className="text-blue-700">Tindakan:</strong> Selidiki masalah operasional atau persaingan.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MoranLISAConcept;
