import React from 'react';
import { MenuItem } from '../data';
import { ShoppingBag, X, Plus, Minus, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderItem extends MenuItem {
  quantity: number;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  orderItems, 
  onRemove, 
  onUpdateQuantity,
  isOpen,
  onClose
}) => {
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:h-[calc(100vh-120px)] lg:rounded-2xl lg:shadow-md
      `}>
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-600" />
            <h2 className="text-xl font-bold">Your Order</h2>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Your order is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode='popLayout'>
                {orderItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-800 line-clamp-1">{item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-gray-500 hover:text-emerald-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-gray-500 hover:text-emerald-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-red-400 hover:text-red-600 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            disabled={orderItems.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};
