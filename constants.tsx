
import React from 'react';
import { BookOpen, BarChart2, Share2, Map, Globe } from 'lucide-react';
import type { Module } from './types';
import MeanMedianMode from './components/interactive/MeanMedianMode';
import DataSpread from './components/interactive/DataSpread';
import HistogramExplorer from './components/interactive/HistogramExplorer';
import ScatterPlotExplorer from './components/interactive/ScatterPlotExplorer';
import CorrelationCausation from './components/interactive/CorrelationCausation';
import SpatialAutocorrelationMap from './components/interactive/SpatialAutocorrelationMap';
import BoxPlotExplorer from './components/interactive/BoxPlotExplorer';
import SpatialVsNonSpatial from './components/interactive/SpatialVsNonSpatial';
import ToblersLawViz from './components/interactive/ToblersLawViz';
import MoranLISAConcept from './components/interactive/MoranLISAConcept';
import DataSummarizationIntro from './components/interactive/DataSummarizationIntro';
import VariableTypeExplorer from './components/interactive/VariableTypeExplorer';
import CorrelationStrengthViz from './components/interactive/CorrelationStrengthViz';

export const contentModules: Module[] = [
  {
    id: 'sesi-1',
    title: 'Sesi 1: Fondasi Statistik Deskriptif',
    description: 'Memahami "bahasa" data dengan meringkas dan menggambarkan fitur utamanya.',
    icon: (props) => <BarChart2 {...props} />,
    content: [
      { type: 'heading', text: '1.1 Seni Meringkas Dunia yang Kompleks' },
      { type: 'paragraph', text: 'Statistik deskriptif adalah metode untuk meringkas, menggambarkan, dan menyajikan data apa adanya, tanpa membuat kesimpulan tentang populasi yang lebih besar. Tujuannya adalah menyederhanakan kompleksitas data menjadi informasi yang mudah dipahami.' },
      { type: 'interactive', component: DataSummarizationIntro },
      { type: 'heading', text: '1.2 Mengenal Tipe Data dan Variabel' },
      { type: 'paragraph', text: 'Memahami tipe variabel adalah fundamental. Variabel terbagi menjadi dua kategori utama:' },
      { type: 'interactive', component: VariableTypeExplorer },
      { type: 'list', items: [
        'Data Kategorikal: Mengklasifikasikan data ke dalam kelompok (Nominal: tanpa urutan, misal jenis toko; Ordinal: dengan urutan, misal tingkat kepuasan).',
        'Data Numerik: Merepresentasikan data dalam bentuk angka (Interval: perbedaan bermakna tapi nol tidak mutlak, misal suhu Celcius; Rasio: memiliki nol mutlak, misal jumlah penduduk).'
      ]},
      { type: 'heading', text: '1.3 Mengukur Pusat Data (The Heart of Data)' },
      { type: 'paragraph', text: 'Ukuran pemusatan (measures of central tendency) digunakan untuk menemukan "nilai tipikal" dalam data. Coba interaksi di bawah untuk melihat bagaimana mean, median, dan modus bereaksi terhadap perubahan data, terutama dengan adanya outlier.' },
      { type: 'interactive', component: MeanMedianMode },
      { type: 'heading', text: '1.4 Mengukur Keragaman Data (The Spread of Data)' },
      { type: 'paragraph', text: 'Selain pusat data, penting untuk memahami seberapa beragam atau bervariasi data tersebut. Ukuran penyebaran (measures of dispersion) menggambarkan sejauh mana nilai-nilai tersebar.' },
      { type: 'interactive', component: DataSpread },
      { type: 'heading', text: '1.5 Visualisasi untuk Penceritaan: Histogram' },
      { type: 'paragraph', text: 'Histogram adalah representasi visual yang kuat untuk melihat bentuk distribusi data numerik. Ia membagi data menjadi interval (bins) dan menunjukkan frekuensi data di setiap interval. Eksplorasi histogram di bawah untuk melihat distribusi berbeda.' },
      { type: 'interactive', component: HistogramExplorer },
      { type: 'heading', text: '1.6 Membaca Sebaran dengan Box Plot' },
      { type: 'paragraph', text: 'Box plot (atau box-and-whisker plot) adalah cara ringkas untuk menampilkan distribusi data numerik melalui lima ringkasan utamanya: minimum, kuartil pertama (Q1), median (Q2), kuartil ketiga (Q3), dan maksimum. Ini sangat berguna untuk mengidentifikasi outlier dan membandingkan sebaran antar kelompok data.' },
      { type: 'interactive', component: BoxPlotExplorer },
    ]
  },
  {
    id: 'sesi-2',
    title: 'Sesi 2: Dasar Statistik Inferensial',
    description: 'Menemukan dan mengukur hubungan antar fenomena atau variabel.',
    icon: (props) => <Share2 {...props} />,
    content: [
      { type: 'heading', text: '2.1 Mengukur Keterkaitan Antar Fenomena' },
      { type: 'paragraph', text: 'Statistik inferensial menggunakan data dari sampel untuk membuat kesimpulan atau prediksi tentang populasi yang lebih besar. Salah satu teknik fundamentalnya adalah korelasi, yang mengukur sejauh mana dua variabel saling bergantung.' },
      { type: 'interactive', component: CorrelationStrengthViz },
      { type: 'heading', text: '2.2 Visualisasi Hubungan dengan Scatter Plot' },
      { type: 'paragraph', text: 'Scatter plot adalah alat visual pertama untuk mengeksplorasi hubungan antara dua variabel numerik. Setiap titik mewakili nilai dari dua variabel. Pola titik-titik dapat mengindikasikan jenis korelasi.' },
      { type: 'interactive', component: ScatterPlotExplorer },
      { type: 'heading', text: '2.3 Mantra Paling Penting: Korelasi Bukan Kausalitas!' },
      { type: 'paragraph', text: 'Ini adalah prinsip terpenting dalam statistik: hanya karena dua variabel berhubungan (berkorelasi), tidak berarti satu variabel menyebabkan perubahan pada variabel lainnya. Hubungan ini mungkin disebabkan oleh faktor ketiga yang tersembunyi (lurking variable).' },
      { type: 'interactive', component: CorrelationCausation }
    ]
  },
  {
    id: 'sesi-3-4',
    title: 'Sesi 3 & 4: Analisis Statistik Spasial',
    description: 'Memasukkan unsur "Spasi" untuk mengungkap pola geografis.',
    icon: (props) => <Map {...props} />,
    content: [
      { type: 'heading', text: '3.1 Mengapa Lokasi Itu Penting?' },
      { type: 'paragraph', text: 'Statistik konvensional sering mengabaikan lokasi. Analisis spasial mengakui bahwa fenomena di dunia nyata tidak terjadi secara acak di dalam ruang. Ia menambahkan dimensi lokasi ke dalam data untuk mengungkap pola yang tidak mungkin dilihat dengan analisis non-spasial.' },
      { type: 'interactive', component: SpatialVsNonSpatial },
      { type: 'heading', text: '3.2 Fondasi Analisis Spasial: Hukum Pertama Geografi Tobler' },
      { type: 'paragraph', text: '"Segala sesuatu berhubungan dengan segala sesuatu yang lain, tetapi hal-hal yang lebih dekat lebih berhubungan daripada hal-hal yang jauh." Prinsip ini adalah dasar teoritis yang membenarkan perlunya mengukur ketergantungan spasial.' },
      { type: 'interactive', component: ToblersLawViz },
      { type: 'heading', text: '3.3 Mengukur Ketergantungan: Autokorelasi Spasial' },
      { type: 'paragraph', text: 'Autokorelasi spasial mengukur sejauh mana nilai di suatu lokasi mirip (atau berbeda) dengan nilai di lokasi tetangganya. Ini adalah manifestasi terukur dari Hukum Tobler. Gunakan peta interaktif di bawah untuk memahami perbedaannya.' },
      { type: 'interactive', component: SpatialAutocorrelationMap },
      { type: 'heading', text: '4.1 Moran\'s I dan LISA: Mengukur Pola Global dan Lokal' },
      { type: 'paragraph', text: 'Setelah memahami konsepnya, kita butuh alat ukur. Dalam statistik spasial, ada dua yang utama:' },
      { type: 'list', items: [
        'Moran\'s I (Global): Memberikan satu angka yang merangkum keseluruhan pola di peta. Nilai positif menunjukkan pengelompokan (clustering), nilai negatif menunjukkan penyebaran (dispersion), dan nilai mendekati nol menunjukkan pola acak (random).',
        'LISA (Local Indicators of Spatial Association): Memecah statistik global menjadi kontribusi dari setiap lokasi, memungkinkan identifikasi klaster lokal yang signifikan seperti "Hotspots" (area bernilai tinggi dikelilingi tetangga bernilai tinggi) dan "Coldspots" (area bernilai rendah dikelilingi tetangga bernilai rendah).'
      ]},
      { type: 'interactive', component: MoranLISAConcept },
    ]
  }
];
