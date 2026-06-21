import React, { useState, useMemo } from 'react';
import { MENU_DATA, Category, MenuItem } from './data';
import { ItemCard } from './components/ItemCard';
import { CategoryFilter } from './components/CategoryFilter';
import { OrderSummary } from './components/OrderSummary';
import { ShoppingCart, UtensilsCrossed, Search, MapPin, Clock, Leaf, Sprout, Wheat, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderItem extends MenuItem {
  quantity: number;
}

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const categories: Category[] = ['Starters', 'Main Course', 'Desserts', 'Beverages', 'Specials'];

  const filteredItems = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToOrder = (item: MenuItem) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOrderOpen(true);
  };

  const removeFromOrder = (itemId: string) => {
    setOrderItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setOrderItems(prev => prev.map(i => {
      if (i.id === itemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <UtensilsCrossed size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-emerald-800">LUMIÈRE <span className="text-slate-400 font-light text-lg">BISTRO</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500 mr-8">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-emerald-500" />
                <span>Downtown Ave, NY</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-emerald-500" />
                <span>Open until 11 PM</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOrderOpen(true)}
              className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Section */}
          <div className="flex-1">
            <div className="mb-8 space-y-4">
              <h2 className="text-3xl font-bold text-slate-800">Our Menu</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for your favorite dishes..." 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredItems.map((item) => (
                  <ItemCard 
                    key={item.id} 
                    item={item} 
                    onAdd={addToOrder}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-lg">No dishes found matching your search.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                  className="mt-4 text-emerald-600 font-bold hover:underline"
                >
                  View all items
                </button>
              </div>
            )}
          </div>

          {/* Sidebar / Order Builder */}
          <div className="lg:w-96">
            <div className="sticky top-24">
              <OrderSummary 
                orderItems={orderItems}
                onRemove={removeFromOrder}
                onUpdateQuantity={updateQuantity}
                isOpen={isOrderOpen}
                onClose={() => setIsOrderOpen(false)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Action Button */}
      {totalItems > 0 && !isOrderOpen && (
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 right-6 left-6 lg:hidden bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-2xl flex items-center justify-between px-8 z-40"
          onClick={() => setIsOrderOpen(true)}
        >
          <div className="flex items-center gap-3">
            <span className="bg-white/20 px-2 py-0.5 rounded-lg">{totalItems} items</span>
            <span>View Order</span>
          </div>
          <span className="text-xl">
            ${orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
          </span>
        </motion.button>
      )}

      {/* Dietary Legend */}
      <footer className="bg-white border-t mt-12 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-green-100 p-1.5 rounded-full text-green-600"><Leaf size={16} /></div>
              <span className="text-sm font-medium">Vegan</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600"><Sprout size={16} /></div>
              <span className="text-sm font-medium">Vegetarian</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-yellow-100 p-1.5 rounded-full text-yellow-600"><Wheat size={16} /></div>
              <span className="text-sm font-medium">Gluten Free</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-red-100 p-1.5 rounded-full text-red-600"><Flame size={16} /></div>
              <span className="text-sm font-medium">Spicy</span>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            <p>© 2024 Lumière Bistro. All prices are in USD. Tax and gratuity not included.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
