import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', 'Penjualan Es Krim': 120, 'Insiden Tenggelam': 5, 'Suhu Rata-rata (°C)': 10 },
  { month: 'Feb', 'Penjualan Es Krim': 150, 'Insiden Tenggelam': 7, 'Suhu Rata-rata (°C)': 12 },
  { month: 'Mar', 'Penjualan Es Krim': 210, 'Insiden Tenggelam': 10, 'Suhu Rata-rata (°C)': 16 },
  { month: 'Apr', 'Penjualan Es Krim': 350, 'Insiden Tenggelam': 15, 'Suhu Rata-rata (°C)': 20 },
  { month: 'Mei', 'Penjualan Es Krim': 580, 'Insiden Tenggelam': 25, 'Suhu Rata-rata (°C)': 25 },
  { month: 'Jun', 'Penjualan Es Krim': 800, 'Insiden Tenggelam': 40, 'Suhu Rata-rata (°C)': 30 },
  { month: 'Jul', 'Penjualan Es Krim': 950, 'Insiden Tenggelam': 48, 'Suhu Rata-rata (°C)': 33 },
  { month: 'Agu', 'Penjualan Es Krim': 900, 'Insiden Tenggelam': 45, 'Suhu Rata-rata (°C)': 32 },
  { month: 'Sep', 'Penjualan Es Krim': 600, 'Insiden Tenggelam': 30, 'Suhu Rata-rata (°C)': 27 },
  { month: 'Okt', 'Penjualan Es Krim': 300, 'Insiden Tenggelam': 14, 'Suhu Rata-rata (°C)': 21 },
  { month: 'Nov', 'Penjualan Es Krim': 180, 'Insiden Tenggelam': 8, 'Suhu Rata-rata (°C)': 15 },
  { month: 'Des', 'Penjualan Es Krim': 130, 'Insiden Tenggelam': 6, 'Suhu Rata-rata (°C)': 11 },
];

const CorrelationCausation: React.FC = () => {
  const [showLurking, setShowLurking] = useState(false);

  return (
    <div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">Studi Kasus: Es Krim & Tenggelam</h3>
      <p className="text-neutral-600 mb-4">Grafik di bawah menunjukkan korelasi positif yang sangat kuat antara penjualan es krim dan insiden tenggelam. Apakah artinya makan es krim menyebabkan orang tenggelam?</p>
      
      <div className="h-96 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: '#475569' }}/>
            <YAxis yAxisId="left" stroke="#2563eb" tick={{ fill: '#475569' }}/>
            <YAxis yAxisId="right" orientation="right" stroke="#dc2626" tick={{ fill: '#475569' }}/>
            <Tooltip wrapperClassName="!bg-white !border-neutral-200 !rounded-md !shadow-lg"/>
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="Penjualan Es Krim" stroke="#2563eb" fill="#dbeafe" strokeWidth={2} />
            <Area yAxisId="right" type="monotone" dataKey="Insiden Tenggelam" stroke="#dc2626" fill="#fee2e2" strokeWidth={2} />
            {showLurking && <Area yAxisId="right" type="monotone" dataKey="Suhu Rata-rata (°C)" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} name="Suhu (Variabel Tersembunyi)" />}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {!showLurking && (
        <div className="text-center">
          <button
            onClick={() => setShowLurking(true)}
            className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition-all transform hover:scale-105"
          >
            Ungkap Variabel Tersembunyi!
          </button>
        </div>
      )}

      {showLurking && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
          <h4 className="font-bold text-amber-800">Variabel Tersembunyi (Lurking Variable) Terungkap!</h4>
          <p className="text-amber-700 mt-2">
            Tentu saja tidak! Penyebab sebenarnya adalah <strong className="font-semibold">cuaca panas (suhu)</strong>.
            Saat cuaca panas, lebih banyak orang membeli es krim DAN lebih banyak orang pergi berenang (meningkatkan risiko tenggelam).
            Cuaca panas adalah variabel tersembunyi yang mempengaruhi kedua variabel lainnya, menciptakan korelasi palsu (spurious correlation) di antara keduanya.
          </p>
        </div>
      )}
    </div>
  );
};

export default CorrelationCausation;