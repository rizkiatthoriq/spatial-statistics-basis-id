
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ArrowDownUp, Thermometer, Coins } from 'lucide-react';

const variableTypes = [
  {
    id: 'nominal',
    icon: Tag,
    title: 'Jenis Kopi',
    example: '"Espresso", "Latte", "Cappuccino"',
    type: 'Kategorikal: Nominal',
    explanation: 'Ini adalah kategori tanpa urutan atau peringkat yang melekat. "Latte" tidak lebih tinggi atau lebih rendah dari "Espresso".',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200'
  },
  {
    id: 'ordinal',
    icon: ArrowDownUp,
    title: 'Ukuran Gelas',
    example: '"Small", "Medium", "Large"',
    type: 'Kategorikal: Ordinal',
    explanation: 'Ada urutan yang jelas dan bermakna dalam kategori ini (Small < Medium < Large), tetapi jarak antar kategori tidak dapat diukur.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'interval',
    icon: Thermometer,
    title: 'Suhu Penyajian',
    example: '"65°C", "70°C", "75°C"',
    type: 'Numerik: Interval',
    explanation: 'Perbedaan antara nilai-nilai ini bermakna (jarak dari 65 ke 70 sama dengan 70 ke 75), tetapi tidak ada "nol mutlak". 0°C bukan berarti tidak ada suhu.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    id: 'ratio',
    icon: Coins,
    title: 'Pendapatan Harian',
    example: '"Rp 500.000", "Rp 1.200.000"',
    type: 'Numerik: Rasio',
    explanation: 'Data ini memiliki "nol mutlak" yang bermakna (Rp 0 berarti tidak ada pendapatan). Kita bisa mengatakan Rp 1.000.000 adalah dua kali lipat dari Rp 500.000.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  }
];

const VariableCard = ({ variable, onClick, isOpen }: { variable: any, onClick: () => void, isOpen: boolean }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-shadow hover:shadow-md ${isOpen ? 'shadow-lg' : ''} ${variable.bgColor} ${variable.borderColor}`}
    >
      <motion.div layout="position" className="flex items-center gap-3">
        <variable.icon className={`w-8 h-8 flex-shrink-0 ${variable.color}`} />
        <div>
          <h4 className="font-semibold text-neutral-800">{variable.title}</h4>
          <p className="text-sm text-neutral-500">{variable.example}</p>
        </div>
      </motion.div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className="overflow-hidden"
        >
          <div className="border-t pt-3 mt-3">
             <p className={`font-bold text-sm ${variable.color}`}>{variable.type}</p>
             <p className="text-sm text-neutral-600 mt-1">{variable.explanation}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const VariableTypeExplorer: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">Penjelajah Tipe Variabel</h3>
      <p className="text-neutral-600 mb-4">Sebagai analis data untuk kedai kopi, Anda perlu memahami data Anda. Klik setiap kartu di bawah untuk mengklasifikasikan variabelnya.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variableTypes.map(variable => (
          <VariableCard 
            key={variable.id}
            variable={variable} 
            onClick={() => handleToggle(variable.id)}
            isOpen={openId === variable.id}
          />
        ))}
      </div>
    </div>
  );
};

export default VariableTypeExplorer;
