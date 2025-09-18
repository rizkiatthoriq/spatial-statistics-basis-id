
import React, { useState } from 'react';
import { Train } from 'lucide-react';

const GRID_SIZE = 9;
const center = { r: Math.floor(GRID_SIZE / 2), c: Math.floor(GRID_SIZE / 2) };

const calculateDistance = (r1: number, c1: number, r2: number, c2: number) => {
    return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(c1 - c2, 2));
};

const maxDistance = calculateDistance(0, 0, center.r, center.c);

const ToblersLawViz: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const getCellOpacity = (r: number, c: number) => {
    if (!isHovered) return 0.1;
    const distance = calculateDistance(r, c, center.r, center.c);
    return Math.max(0.1, 1 - distance / (maxDistance + 1));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-neutral-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-neutral-800 text-center flex items-center gap-2"><Train className="w-5 h-5 text-primary-600"/>Studi Kasus: Pengaruh Stasiun MRT</h3>
      <div 
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from({ length: GRID_SIZE }).map((_, r) =>
          Array.from({ length: GRID_SIZE }).map((_, c) => {
            const isCenter = r === center.r && c === center.c;
            return (
              <div
                key={`${r}-${c}`}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md transition-all duration-300 ${isCenter ? 'bg-primary-500 ring-2 ring-primary-300 ring-offset-2 flex items-center justify-center' : 'bg-amber-500'}`}
                style={{
                  opacity: isCenter ? 1 : getCellOpacity(r, c),
                  transform: (isHovered && !isCenter) ? `scale(${1 - getCellOpacity(r, c) * 0.1 + 0.1})` : 'scale(1)',
                }}
              >
              {isCenter && <Train className="w-4 h-4 text-white"/>}
              </div>
            );
          })
        )}
      </div>
      <p className="text-center text-neutral-600 max-w-md">
        Bayangkan titik biru adalah stasiun MRT baru, dan sel kuning adalah nilai properti di sekitarnya. Arahkan kursor ke grid. Intensitas warna menunjukkan bagaimana nilai properti memudar seiring jarak dari stasiun. Ini adalah contoh sempurna dari <strong className="font-semibold text-neutral-800">"hal-hal yang lebih dekat (ke stasiun) lebih berhubungan (memiliki nilai lebih tinggi)."</strong>
      </p>
    </div>
  );
};

export default ToblersLawViz;
