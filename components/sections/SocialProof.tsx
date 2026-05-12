export default function SocialProof() {
  return (
    <section className="py-12 bg-surface-container">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="space-y-1">
          <p className="text-[28px] font-headline font-bold text-primary">500+</p>
          <p className="text-[16px] font-sans font-medium text-on-surface-variant">Rumah Teridentifikasi dengan Elegan</p>
        </div>
        <div className="space-y-1">
         <div className="flex items-center justify-center gap-1">
           <p className="text-[28px] font-headline font-bold text-primary">4.9</p>
           <span className="material-symbols-outlined text-2xl" style={{ color: '#5a5854ff', fontVariationSettings: "'FILL' 1" }}>star</span>
         </div>
         <p className="text-[16px] font-sans font-medium text-on-surface-variant">Rating dari Pemilik Rumah Puas</p>
        </div>
        <div className="space-y-1">
          <p className="text-[28px] font-headline font-bold text-primary">3-5</p>
          <p className="text-[16px] font-sans font-medium text-on-surface-variant">Hari Kerja Selesai Produksi</p>
        </div>
        <div className="space-y-1">
          <p className="text-[28px] font-headline font-bold text-primary">100%</p>
          <p className="text-[16px] font-sans font-medium text-on-surface-variant">Custom — Persis Seperti Keinginanmu</p>
        </div>
        </div>
      </div>
    </section>
  );
}
