export interface Product {
  id: string;
  name: string;
  nameEn: string;
  brand: 'Hikvision' | 'UNV' | 'Imou';
  category: 'dvr' | 'camera_indoor' | 'camera_outdoor' | 'wireless';
  price: number;
  stock: number;
  specs: string[];
  features: string[];
  resolution?: string;
  nightVision?: string;
  ports?: number;
  warranty: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  badge?: string;
}

export interface PackageOffer {
  id: string;
  title: string;
  targetAudience: string;
  price: number;
  originalPrice: number;
  items: string[];
  badge?: string;
  popular?: boolean;
  warranty: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  engineers: {
    name: string;
    title: string;
  }[];
  locations: string[];
  workingHours: string;
}
