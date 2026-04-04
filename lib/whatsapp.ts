export interface WhatsAppFormData {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export function generateWhatsAppMessage(
  productName: string,
  price: string,
  formData: WhatsAppFormData,
): string {
  const message = `Halo NomorKu! Saya ingin memesan nomor rumah:

*Detail Pesanan:*
- Produk: ${productName}
- Harga: ${price}

*Data Pemesan:*
- Nama: ${formData.name}
- No. WhatsApp: ${formData.phone}
- Alamat Pengiriman: ${formData.address}
- Catatan Khusus/Nomor Rumah:
${formData.notes}

Mohon info untuk proses selanjutnya. Terima kasih!`;

  return encodeURIComponent(message);
}

export function buildWhatsAppUrl(message: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
  return `https://wa.me/${phoneNumber}?text=${message}`;
}
