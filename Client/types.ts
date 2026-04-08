export interface Medicine {
  id: number;
  disease: any;
  disesase: any;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;  // Add this line
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
  discount: number;
  finalPrice: number;
}

export interface User {
  username: string;
  role: 'admin' | 'customer';
  fullName: string;
  email: string;
  phone: string;
  age: number;
}

export interface CartItem extends Medicine {
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  isOurStore: boolean;
  priceInfo: string;
  distance: string;
  phone?: string;
  hours?: string;

  // ✅ Add this line for Leaflet map markers
  location: [number, number]; // [latitude, longitude]
}

export interface ShopLocation {
  name: string;
  address: string;
  uri: string;
  reviewSnippets?: string[];
  distance?: number; // Optional: for client-side distance calculation if needed
  latitude?: number; // Optional: for client-side distance calculation if needed
  longitude?: number; // Optional: for client-side distance calculation if needed
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface GenericMedicine {
  name: string;
  uses: string;
  sideEffects: string;
  genericBrands: string[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING_INFO = 'LOADING_INFO',
  LOADING_GEOLOCATION = 'LOADING_GEOLOCATION',
  SEARCHING_SHOPS = 'SEARCHING_SHOPS',
  LOADING_DATABASE = 'LOADING_DATABASE', // New status for loading generic medicine database
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}
