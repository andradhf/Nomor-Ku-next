export default function FAQ() {
  const faqs = [
    {
      question: 'Apa material yang digunakan?',
      answer: 'Kami menggunakan Akrilik Marga Cipta (Grade A) dengan ketebalan 3mm - 5mm tergantung desain. Tahan cuaca ekstrem, tidak mudah pudar, dan tahan karat.'
    },
    {
      question: 'Berapa lama proses pengerjaannya?',
      answer: 'Normal pengerjaan memakan waktu 2-4 hari kerja setelah desain disetujui oleh Anda. Kami mengutamakan ketelitian dan finishing yang halus.'
    },
    {
      question: 'Bagaimana cara pemasangannya?',
      answer: 'Sangat mudah! Setiap pembelian sudah termasuk baut pen (glass pin) atau perekat 3M VHB Original tergantung pilihan Anda. Kami juga menyertakan panduan pemasangan.'
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-headline text-4xl mb-12 text-center">Yang Paling Sering Ditanyakan</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-surface-container rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center p-6 cursor-pointer select-none">
                <h3 className="font-bold">{faq.question}</h3>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
