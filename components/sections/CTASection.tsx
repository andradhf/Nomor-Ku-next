import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="py-24 bg-primary text-on-primary overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoKhVtipHso0k3R6E-fMtygfrN_vgZGTeiS1YXmUeGkG6xhmiKDkgiIV3HaW-sHwTJYwOGTp7WwpDpfBUSkhxTq8AlKabMvtryen9M76CM2kBHDO3kBt713xHAic0gIRf2nHQntS5MkP_wXbjlQEX5XEJvivlOfb3FcdDG85KX58q2JL6NObJ3nBYtAkSwIgXJWB_vq-VT_gxg_yjiof-IPK4U7AiikEkB0oNnDGuJlc-fEf0cJNoK7ZvG2Mni7ys9e-UIOb5Vd-4"
          alt="Pattern Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-headline text-4xl md:text-6xl mb-8 leading-tight">
          Rumahmu Berhak Punya<br />Identitas yang Spesial
        </h2>
        <p className="text-on-primary-container text-lg mb-12 max-w-2xl mx-auto">
          Mulai rancang nomor rumah impianmu hari ini dan rasakan kebanggaan setiap kali tiba di rumah.
        </p>
        <button className="px-12 py-5 bg-tertiary text-on-tertiary rounded-full font-bold text-xl hover:bg-tertiary-container hover:scale-105 transition-all shadow-xl">
          Mulai Desain Sekarang
        </button>
      </div>
    </section>
  );
}
