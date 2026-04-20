
const testimonials = [
  {
    rating: 5,
    text: '"Seller ramah, pengiriman lumayan cepat, hasilnya bagus saya suka hanya saran aja untuk bagian belakang nya agak lebih kuat lagi karena kemarin saya coba gerakkan ada yg longgar atau mau patah tapi masih aman kok, oiya satu lgi jangan lupa gratis kan baut atau paku tembok nya karena biasa nya saya pesan ada gratis paku tembok nya , terimakasih"',
    name: 'raxxxxxx275',
    location: '',
  },
  {
    rating: 5,
    text: '"Material akriliknya tebal dan premium. Sudah kena panas hujan 6 bulan tetap kinclong. Bikin rumah kelihatan lebih \'berkelas\' seketika."',
    name: 'Budi Santoso',
    location: 'Tangerang Selatan',
  },
  {
    rating: 5,
    text: '"Suka banget sama model Sage Garden-nya. Packaging aman, pengiriman cepat. Gak nyesel beli"',
    name: 'Keluarga Pratama',
    location: 'Yogyakarta',
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface-container-low" id="testimoni">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl mb-4">Cerita dari Pemilik Rumah</h2>
          <p className="text-on-surface-variant">Lebih dari sekadar penanda alamat, Inilah ulasan jujur dari pelanggan kami.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-surface-bright p-8 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex gap-1 text-tertiary mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-on-surface-variant mb-8 leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-on-surface">{testimonial.name}</p>
                  <p className="text-xs text-on-surface-variant">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
