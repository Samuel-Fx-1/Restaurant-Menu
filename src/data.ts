export type Category = 'Starters' | 'Main Course' | 'Desserts' | 'Beverages' | 'Specials';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  dietary: {
    vegan?: boolean;
    vegetarian?: boolean;
    glutenFree?: boolean;
    spicy?: boolean;
  };
}

export const MENU_DATA: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Arancini',
    description: 'Crispy risotto balls stuffed with wild mushrooms and truffle oil, served with garlic aioli.',
    price: 14,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=400',
    dietary: { vegetarian: true }
  },
  {
    id: '2',
    name: 'Spicy Calamari',
    description: 'Flash-fried squid with cherry peppers and lemon zest, served with spicy marinara.',
    price: 16,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400',
    dietary: { spicy: true }
  },
  {
    id: '3',
    name: 'Grilled Ribeye Steak',
    description: '12oz grass-fed ribeye with garlic herb butter, roasted asparagus, and truffle mash.',
    price: 38,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400',
    dietary: { glutenFree: true }
  },
  {
    id: '4',
    name: 'Vegan Buddha Bowl',
    description: 'Quinoa, roasted sweet potato, kale, avocado, and chickpeas with tahini dressing.',
    price: 22,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
    dietary: { vegan: true, glutenFree: true }
  },
  {
    id: '5',
    name: 'Classic Margherita Pizza',
    description: 'San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.',
    price: 18,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=400',
    dietary: { vegetarian: true }
  },
  {
    id: '6',
    name: 'Molten Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey center, served with vanilla bean gelato.',
    price: 12,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=400',
    dietary: { vegetarian: true }
  },
  {
    id: '7',
    name: 'Berry Sorbet',
    description: 'A trio of refreshing raspberry, strawberry, and blueberry sorbets.',
    price: 10,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488939091485-046602469fd1?auto=format&fit=crop&q=80&w=400',
    dietary: { vegan: true, glutenFree: true }
  },
  {
    id: '8',
    name: 'Old Fashioned Cocktail',
    description: 'Bourbon, bitters, sugar, and orange peel. A timeless classic.',
    price: 15,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
    dietary: {}
  },
  {
    id: '9',
    name: 'Chef\'s Special Risotto',
    description: 'Saffron-infused risotto with sea scallops and lemon zest.',
    price: 32,
    category: 'Specials',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400',
    dietary: { glutenFree: true }
  }
];
