import Image from 'next/image';

const testimonials = [
  {
    rating: 5,
    text: '"Desain Good, Efek lampu LED auto, Orderan sesuai dan telah tiba dengan baik serta berfungsi dengan baik, terimakasih shopee dan seller"',
    name: 'dody2702',
    location: '',
    image: '/images/testimoni1.png',
    initials: 'D',
  },
  {
    rating: 5,
    text: '"Bagussss ini yang dicari tanpa aliran listrik, Mau order lagi buat rumah yang 1 lagi"',
    name: 'b*****a',
    location: '',
    image: '/images/testimoni22.png',
    initials: 'B',
  },
  {
    rating: 5,
    text: '"Toko ini bener2 zero wasting tau gasiiiihhhhh?! packing kayunya bisa kepake. Bagus bgt luvvv 💕"',
    name: 'bacidundut',
    location: '',
    image: '/images/testimoni3.png',
    initials: 'B',
  },
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
            <div
              key={idx}
              className="bg-surface-bright rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <div className="relative w-full h-60 overflow-hidden bg-gray-900">
                <Image
                  src={testimonial.image}
                  alt={`Produk milik ${testimonial.name}`}
                  fill
                  className="object-contain p-3 transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* bottom fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/60 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-1">
                {/* Stars */}
                <div className="flex gap-1 mb-4" style={{ color: '#d5a03eff' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Text */}
                <p className="italic text-on-surface-variant leading-relaxed flex-1 mb-8">
                  {testimonial.text}
                </p>

                {/* Avatar + Name */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
