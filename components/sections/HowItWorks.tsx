export default function HowItWorks() {
  const steps = [
    {
      icon: 'palette',
      title: 'Pilih Desain',
      desc: 'Tentukan model dan ukuran yang sesuai.'
    },
    {
      icon: 'edit_note',
      title: 'Isi Data',
      desc: 'Ketik nomor rumah dan alamat via WhatsApp.'
    },
    {
      icon: 'precision_manufacturing',
      title: 'Produksi',
      desc: 'Proses laser cut presisi selama 2-3 hari kerja.'
    },
    {
      icon: 'local_shipping',
      title: 'Pengiriman',
      desc: 'Pesanan dikirim aman sampai ke depan pintu.'
    }
  ];

  return (
    <section className="py-24 bg-surface-container-low" id="cara-pesan">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-headline text-4xl mb-16">Mulai Pesanan Anda di Sini</h2>
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
