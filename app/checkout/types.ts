export type JenisOption = {
  id: string;
  label: string;
  bg: string;
  textColor: string;
  subColor: string;
  lineColor: string;
  frameColor: string | null;
  led: boolean;
};

export type SizeOption = {
  id: string;
  label: string;
  dim: string;
  price: number;
};

export type FontOption = {
  id: string;
  label: string;
  css: string;
  weight: number;
  style: 'normal' | 'italic'; 
};

export type FontVariant = {
  id: string;
  label: string;
  weight: number;
  style: 'normal' | 'italic';
};

export type FontFamilyGroup = {
  id: string;
  label: string;
  css: string;
  variants: FontVariant[];
};

export type ProductConfig = {
  jenis: JenisOption[];
  sizes: SizeOption[];
  shape: 'portrait' | 'landscape' | 'lightbox';
  images: Record<string, string>;
};

export type CartItem = {
  id: number;
  name: string;
  details: string;
  price: number;
  imageSrc: string;
  quantity: number;
};