import Image from 'next/image';

const testimonials = [
  {
    rating: 5,
    text: '"Hasilnya luar biasa rapi. Sangat cocok dengan konsep rumah industrial saya. CS-nya juga sabar banget bantu revisi desain berkali-kali."',
    name: 'Arini Wijaya',
    location: 'Bekasi',
    avatarStr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQYACpFzOgZGi0jTeGAoK0Jh4Hu6ZT4p44pUo18AF-MsiHrsJzEjxN2vkECr-zfxM60war1Daas_9tCQbI2T8KpiQyowf3XmK4I1Iz2ircNXZEXu3b3O15u9v-g5_mtOwDygcZpGd_q19ux_h3QLZX6pT_SYW7yyNYVmtfAYMvSbM-r9MUw468xUoYwfRuarBby_JIGyAaH4gE-BhUnkT4aByslIy-3ayygdMZAWm0VcUdr051wQmUKPFelYG7mPG-Ff5KZv4kc8c'
  },
  {
    rating: 5,
    text: '"Material akriliknya tebal dan premium. Sudah kena panas hujan 6 bulan tetap kinclong. Bikin rumah kelihatan lebih \'berkelas\' seketika."',
    name: 'Budi Santoso',
    location: 'Tangerang Selatan',
    avatarStr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8DSu9pOIGazlylyhnGuynGQH9-yj16-Wm8er3Jag4Jxm_GAoPe9rhhU7AaaPCQpL-EiqU-k4RWBmnU2qsO0blDWxTzqsNjcpF0JOAIwiM2D63ALKX7U2Zyv2lGi_5vKgwioDlZIbxVKAdZ0jy8I4XVEeLm7kAELgIJ1mYZ0lgBuQLQ-zXqsRFFnNGqa3Fj3pIgolSICi1wTEZwOs0AW_V3Q3c8mqu3CsaSB1MkKPZgbmfUAleJmiCmp4rdl6Jx9gMXhN6tdl21uo'
  },
  {
    rating: 5,
    text: '"Suka banget sama model Sage Garden-nya. Packaging aman, pengiriman cepat. Gak nyesel beli di NomorKu!"',
    name: 'Keluarga Pratama',
    location: 'Yogyakarta',
    avatarStr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR-CFqKhjlZbaIaXHoR1qqBQ6MIobfYladq5nvUqESrfAEahC4I7ZJ61AwRW45jon_pCUTBf6Y6BY7v-GC2ogRhmmf576qHXP4NykaXZFKOpi6LQR9yLRmUf6vosrQ8u2Jozw0s9o2UPvrjEwaUJWcy6AdzMs_BD_N35S9-Xd0XCZwVkEoHDiXvv9hnd4os5ehZr7062WKJSShUj10Eq_6Sxc4ZQ3YzmpS_Txw0mJh3x_iPMlJNnQnj-56Tx0Tk7WA2bu2GJ85j9o'
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
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image 
                    src={testimonial.avatarStr} 
                    alt={`Avatar of ${testimonial.name}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
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
