export interface Fish {
  id: string;
  name: string;
  nameSwahili: string;
  category: 'lake' | 'ocean' | 'ornamental';
  price: number;
  unit: 'kg' | 'piece';
  image: string;
  description: string;
  supplier: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
  inStock: boolean;
  catchDate: string;
  nutritionalInfo: {
    protein: string;
    omega3: string;
    calories: string;
  };
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalSales: number;
  verified: boolean;
  image: string;
}

export interface Order {
  id: string;
  items: { fish: Fish; quantity: number }[];
  status: 'placed' | 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered';
  total: number;
  deliveryAddress: string;
  createdAt: string;
  estimatedDelivery: string;
  distributor?: {
    name: string;
    phone: string;
  };
}

export const fishCategories = [
  { id: 'lake', name: 'Lake Fish', nameSwahili: 'Samaki wa Ziwa', icon: '🐟' },
  { id: 'ocean', name: 'Ocean Fish', nameSwahili: 'Samaki wa Bahari', icon: '🦈' },
  { id: 'ornamental', name: 'Ornamental', nameSwahili: 'Samaki wa Mapambo', icon: '🐠' },
];

export const locations = [
  'Ferry Market, Dar es Salaam',
  'Msasani Fish Market',
  'Kunduchi Beach',
  'Lake Victoria, Mwanza',
  'Lake Tanganyika, Kigoma',
  'Lake Nyasa, Mbeya',
  'Masaki',
  'Posta',
  'Kariakoo',
  'Mikocheni',
  'Mbezi Beach',
  'Kigamboni',
];

export const sampleFish: Fish[] = [
  {
    id: '1',
    name: 'Tilapia',
    nameSwahili: 'Sato',
    category: 'lake',
    price: 15000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    description: 'Fresh tilapia from Lake Victoria. Known for its mild, sweet flavor and tender white flesh.',
    supplier: {
      id: 's1',
      name: 'Mwanza Fresh Catch',
      location: 'Lake Victoria, Mwanza',
      rating: 4.8,
    },
    inStock: true,
    catchDate: '2024-01-15',
    nutritionalInfo: {
      protein: '26g per 100g',
      omega3: '0.5g per 100g',
      calories: '128 kcal',
    },
  },
  {
    id: '2',
    name: 'Nile Perch',
    nameSwahili: 'Sangara',
    category: 'lake',
    price: 22000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400&h=300&fit=crop',
    description: 'Premium Nile Perch, the king of Lake Victoria. Perfect for grilling or frying.',
    supplier: {
      id: 's2',
      name: 'Victoria Premium',
      location: 'Lake Victoria, Mwanza',
      rating: 4.9,
    },
    inStock: true,
    catchDate: '2024-01-15',
    nutritionalInfo: {
      protein: '19g per 100g',
      omega3: '0.8g per 100g',
      calories: '97 kcal',
    },
  },
  {
    id: '3',
    name: 'Tuna',
    nameSwahili: 'Jodari',
    category: 'ocean',
    price: 35000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=300&fit=crop',
    description: 'Fresh yellowfin tuna from the Indian Ocean. Perfect for sashimi or grilling.',
    supplier: {
      id: 's3',
      name: 'Ocean Fresh Ltd',
      location: 'Ferry Market, Dar es Salaam',
      rating: 4.7,
    },
    inStock: true,
    catchDate: '2024-01-15',
    nutritionalInfo: {
      protein: '29g per 100g',
      omega3: '1.3g per 100g',
      calories: '144 kcal',
    },
  },
  {
    id: '4',
    name: 'Kingfish',
    nameSwahili: 'Nguru',
    category: 'ocean',
    price: 28000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop',
    description: 'Premium kingfish with firm, flavorful flesh. Great for steaks and curry.',
    supplier: {
      id: 's4',
      name: 'Msasani Fishermen',
      location: 'Msasani Fish Market',
      rating: 4.6,
    },
    inStock: true,
    catchDate: '2024-01-14',
    nutritionalInfo: {
      protein: '21g per 100g',
      omega3: '0.9g per 100g',
      calories: '112 kcal',
    },
  },
  {
    id: '5',
    name: 'Prawns',
    nameSwahili: 'Kamba',
    category: 'ocean',
    price: 45000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
    description: 'Large tiger prawns from Dar es Salaam coast. Sweet and succulent.',
    supplier: {
      id: 's5',
      name: 'Coastal Delights',
      location: 'Kunduchi Beach',
      rating: 4.9,
    },
    inStock: true,
    catchDate: '2024-01-15',
    nutritionalInfo: {
      protein: '24g per 100g',
      omega3: '0.5g per 100g',
      calories: '99 kcal',
    },
  },
  {
    id: '6',
    name: 'Octopus',
    nameSwahili: 'Pweza',
    category: 'ocean',
    price: 32000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=400&h=300&fit=crop',
    description: 'Fresh octopus, tender and flavorful. A Zanzibari delicacy.',
    supplier: {
      id: 's6',
      name: 'Zanzibar Seafood',
      location: 'Ferry Market, Dar es Salaam',
      rating: 4.8,
    },
    inStock: false,
    catchDate: '2024-01-13',
    nutritionalInfo: {
      protein: '15g per 100g',
      omega3: '0.3g per 100g',
      calories: '82 kcal',
    },
  },
  {
    id: '7',
    name: 'Sardines',
    nameSwahili: 'Dagaa',
    category: 'lake',
    price: 8000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
    description: 'Small but mighty! Dried dagaa, perfect for local dishes.',
    supplier: {
      id: 's7',
      name: 'Mwanza Dagaa',
      location: 'Lake Victoria, Mwanza',
      rating: 4.5,
    },
    inStock: true,
    catchDate: '2024-01-14',
    nutritionalInfo: {
      protein: '21g per 100g',
      omega3: '1.5g per 100g',
      calories: '208 kcal',
    },
  },
  {
    id: '8',
    name: 'Lobster',
    nameSwahili: 'Kamba Kochi',
    category: 'ocean',
    price: 85000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1553659971-f01207815844?w=400&h=300&fit=crop',
    description: 'Premium rock lobster from the Tanzanian coast. Pure luxury.',
    supplier: {
      id: 's8',
      name: 'Premium Seafood TZ',
      location: 'Msasani Fish Market',
      rating: 5.0,
    },
    inStock: true,
    catchDate: '2024-01-15',
    nutritionalInfo: {
      protein: '19g per 100g',
      omega3: '0.4g per 100g',
      calories: '89 kcal',
    },
  },
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      { fish: sampleFish[0], quantity: 2 },
      { fish: sampleFish[2], quantity: 1 },
    ],
    status: 'out_for_delivery',
    total: 65000,
    deliveryAddress: 'Masaki, Plot 123, Dar es Salaam',
    createdAt: '2024-01-15T10:30:00',
    estimatedDelivery: '2024-01-15T14:00:00',
    distributor: {
      name: 'John Mwangi',
      phone: '+255 712 345 678',
    },
  },
  {
    id: 'ORD-002',
    items: [
      { fish: sampleFish[4], quantity: 3 },
    ],
    status: 'delivered',
    total: 135000,
    deliveryAddress: 'Mikocheni A, House 45, Dar es Salaam',
    createdAt: '2024-01-14T09:00:00',
    estimatedDelivery: '2024-01-14T12:00:00',
  },
  {
    id: 'ORD-003',
    items: [
      { fish: sampleFish[1], quantity: 5 },
      { fish: sampleFish[6], quantity: 2 },
    ],
    status: 'confirmed',
    total: 126000,
    deliveryAddress: 'Kariakoo, Street 7, Dar es Salaam',
    createdAt: '2024-01-15T11:00:00',
    estimatedDelivery: '2024-01-15T16:00:00',
  },
];

export const stats = {
  fishermen: 2500,
  ordersDelivered: 50000,
  satisfactionRate: 98,
  regionsServed: 5,
};

export const testimonials = [
  {
    id: '1',
    name: 'Mama Lisu Restaurant',
    location: 'Masaki, Dar es Salaam',
    text: 'FishHappy imebadilisha biashara yetu! Samaki fresh kila siku, bei nzuri, na delivery haraka.',
    rating: 5,
    type: 'Restaurant',
  },
  {
    id: '2',
    name: 'Serena Hotel',
    location: 'City Center, Dar es Salaam',
    text: 'Reliable supplier for our seafood buffet. The blockchain tracking gives our guests confidence in freshness.',
    rating: 5,
    type: 'Hotel',
  },
  {
    id: '3',
    name: 'Butchery Kariakoo',
    location: 'Kariakoo, Dar es Salaam',
    text: 'Great variety and consistent quality. My customers love the fresh dagaa!',
    rating: 4,
    type: 'Butcher',
  },
];

export const formatTZS = (amount: number): string => {
  return new Intl.NumberFormat('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
