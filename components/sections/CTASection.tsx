'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CTASection() {
  const router = useRouter();
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
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <p className="text-xs font-bold tracking-widest uppercase text-on-primary opacity-70 mb-3">Mulai Hari Ini</p>
        <div className="w-8 h-px bg-on-primary opacity-40 mx-auto mb-8" />
        <h2 className="font-headline text-5xl md:text-6xl mb-6 leading-tight">
          Rumahmu Berhak Punya<br />
          <span className="italic">Identitas yang Spesial.</span>
        </h2>
        <p className="text-on-primary opacity-80 text-base mb-10 max-w-sm mx-auto leading-relaxed">
          Kamu sudah meluangkan waktu, energi, dan investasi untuk membuat rumah sesuai impian. Satu detail kecil ini yang menyempurnakan semuanya.
        </p>
        <button
          onClick={() => router.push('/checkout')}
          className="inline-flex items-center gap-2 px-10 py-4 bg-secondary-container text-on-secondary-container rounded-full font-bold text-base hover:opacity-90 transition-opacity mb-4"
        >
          → Lihat Preview Desainmu — Gratis
        </button>
        <p className="text-xs text-on-primary opacity-60">
          Tidak perlu registrasi · Preview instan · Checkout hanya jika sudah puas
        </p>
      </div>
    </section>
  );
}
