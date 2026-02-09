import { Medicine, Store } from './types';

export const MOCK_MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Antidiabetic Plus',
    genericName: 'Acetaminophen',
    manufacturer: 'Johnson & Johnson',
    category: 'Diabetes',
    price: 20,
    stock: 150,
    imageUrl: 'https://i.postimg.cc/placeholder/antidiabetic.jpg',
    description: 'Provides temporary relief from minor aches and pains due to the common cold, headache, backache, minor pain of arthritis, toothache, muscular aches, and premenstrual and menstrual cramps. Temporarily reduces fever.',
    discount: 10,
    finalPrice: 765,
  },
  {
    id: '2',
    name: 'Advil',
    genericName: 'Ibuprofen',
    manufacturer: 'Pfizer',
    category: 'Pain Relief',
    price: 720,
    stock: 200,
    imageUrl: 'https://i.postimg.cc/k47v45P6/advil.jpg',
    description: 'A nonsteroidal anti-inflammatory drug (NSAID) used for treating pain, fever, and inflammation. This includes painful menstrual periods, migraines, and rheumatoid arthritis.',
    discount: 0,
    finalPrice: 720,
  },
  // ... other medicines
];

export const STORES: Store[] = [
  {
    id: '1',
    name: 'Generic Hub',
    address: '123 Health St, Wellness City',
    isOurStore: true,
    priceInfo: 'Best prices guaranteed',
    distance: '0.5 km',
    phone: '(123) 456-7890',
    hours: 'Mon-Sat: 9am - 9pm, Sun: 10am - 6pm',
    location: [19.115, 72.869], // ✅ added lat/lon
  },
  {
    id: '2',
    name: 'City Pharmacy',
    address: '456 Main Ave, Metroville',
    isOurStore: false,
    priceInfo: 'Avg. 15% more expensive',
    distance: '3.2 km',
    phone: '(123) 555-0101',
    hours: 'Mon-Fri: 8am - 10pm, Sat-Sun: 9am - 8pm',
    location: [19.060, 72.830],
  },
  {
    id: '3',
    name: 'Wellness Drugs',
    address: '789 Cure Blvd, Suburbia',
    isOurStore: false,
    priceInfo: 'Avg. 12% more expensive',
    distance: '5.8 km',
    phone: '(123) 555-0102',
    hours: 'Open 24/7',
    location: [19.050, 72.870],
  },
  {
    id: '4',
    name: 'Quick Meds',
    address: '101 Speedy Ln, Downtown',
    isOurStore: false,
    priceInfo: 'Avg. 20% more expensive',
    distance: '8.1 km',
    phone: '(123) 555-0103',
    hours: 'Mon-Sun: 7am - 11pm',
    location: [19.100, 72.880],
  },
];
