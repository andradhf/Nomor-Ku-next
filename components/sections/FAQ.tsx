import React from 'react';

export default function FAQ() {
  const faqs: { question: string; answer?: string; answerNode?: React.ReactNode }[] = [
    {
      question: 'Apa bedanya produk Portrait (Double Layer) dan LED Solar Panel?',
      answerNode: (
        <div className="space-y-4">
          <p>Dua produk, dua karakter yang berbeda:</p>
          <p>
            <strong>Portrait Double Layer</strong> — plakat akrilik 2 lapis dipotong laser presisi.
            Tersedia 3 varian warna (White Black, Black Frosted, Black Silver), pilihan ukuran M/L/XL,
            dan varian LED dengan adapter. Cocok untuk tampilan bersih, minimalis, dan elegan di siang
            maupun malam hari.
          </p>
          <p>
            <strong>LED Solar Panel</strong> — plakat akrilik hitam landscape dengan lampu LED tenaga
            surya. Tanpa kabel, tanpa sambungan listrik — menyala otomatis saat malam, mati saat siang
            berkat sensor cahaya otomatis. Cocok untuk tampilan dramatis di malam hari tanpa kerumitan
            instalasi.
          </p>
        </div>
      )
    },
    {
      question: 'Ada tips pemasangan LED Solar Panel agar awet?',
      answer: ''
    },
    {
      question: 'Apakah tahan cuaca?',
      answer: ''
    },
    {
      question: 'Berapa lama proses pengerjaannya?',
      answer: ''
    },
    {
      question: 'Bagaimana cara pemasangannya? Perlu tukang?',
      answer: ''
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">FAQ</p>
          <div className="w-8 h-px bg-on-surface-variant mx-auto mb-6" />
          <h2 className="font-headline text-4xl mb-4">Yang Paling Sering Ditanyakan</h2>
          <p className="text-on-surface-variant">Jawaban jujur untuk keputusan yang lebih yakin.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-surface-container rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
                <h3 className="font-bold">{faq.question}</h3>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                {faq.answerNode ?? faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
