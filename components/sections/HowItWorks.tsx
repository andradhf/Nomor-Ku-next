export default function HowItWorks() {
  const steps = [
    {
      icon: 'palette',
      title: '1. Pilih Desain',
      desc: 'Tentukan model, ukuran, dan warna yang sesuai karakter rumahmu.'
    },
    {
      icon: 'edit_note',
      title: '2. Preview Instan',
      desc: 'Ketik nomor & alamat rumahmu. Lihat hasilnya real-time sebelum kamu memutuskan.'
    },
    {
      icon: 'precision_manufacturing',
      title: '3. Produksi Presisi',
      desc: 'Laser cut dengan akurasi industri. Selesai dalam 3–5 hari kerja.'
    },
    {
      icon: 'local_shipping',
      title: '4. Tiba di Pintumu',
      desc: 'Dikemas aman, dikirim ke seluruh Indonesia. Siap pasang, langsung elegan.'
    }
  ];

  return (
    <section className="py-24 bg-surface-container-low" id="cara-pesan">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">Cara Pesan</p>
          <div className="w-8 h-px bg-on-surface-variant mx-auto mb-6" />
          <h2 className="font-headline text-4xl md:text-5xl">
            Dari Layar ke Depan Pintu<br />dalam 4 Langkah Mudah
          </h2>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-outline-variant z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center max-w-[200px]">
              <div className="w-24 h-24 bg-surface-container-lowest rounded-full border-4 border-surface shadow-md flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">{step.icon}</span>
              </div>
              <h4 className="font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-on-surface-variant">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
