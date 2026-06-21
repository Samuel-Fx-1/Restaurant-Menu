import React from 'react';
import { Leaf, Flame, Sprout, Wheat } from 'lucide-react';
import { MenuItem } from '../data';
import { motion } from 'framer-motion';

interface ItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onAdd }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {item.dietary.vegan && (
            <div className="bg-green-100 p-1.5 rounded-full text-green-600 shadow-sm" title="Vegan">
              <Leaf size={16} />
            </div>
          )}
          {item.dietary.vegetarian && (
            <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600 shadow-sm" title="Vegetarian">
              <Sprout size={16} />
            </div>
          )}
          {item.dietary.glutenFree && (
            <div className="bg-yellow-100 p-1.5 rounded-full text-yellow-600 shadow-sm" title="Gluten Free">
              <Wheat size={16} />
            </div>
          )}
          {item.dietary.spicy && (
            <div className="bg-red-100 p-1.5 rounded-full text-red-600 shadow-sm" title="Spicy">
              <Flame size={16} />
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.name}</h3>
          <span className="text-emerald-600 font-bold">${item.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{item.description}</p>
        <button 
          onClick={() => onAdd(item)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
        >
          Add to Order
        </button>
      </div>
    </motion.div>
  );
};
