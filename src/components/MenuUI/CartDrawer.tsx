import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

const CartDrawer: React.FC = () => {
  const { cart, totalItems, totalPrice, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart } = useCart();

  const tax = +(totalPrice * 0.05).toFixed(2);
  const service = +(totalPrice * 0.02).toFixed(2);
  const grand = +(totalPrice + tax + service).toFixed(2);

  return (
    <>
      {/* Mobile bottom bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] sm:hidden">
          <div className="bg-card/80 p-3 rounded-full shadow-xl flex items-center justify-between border border-border">
            <div className="flex items-center gap-3">
              <div className="bg-accent text-accent-foreground rounded-full p-2"><ShoppingCart className="w-5 h-5"/></div>
              <div>
                <div className="text-sm text-muted-foreground">{totalItems} items</div>
                <div className="font-bold text-foreground">${grand.toFixed(2)}</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(true)} className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold">View Cart</button>
          </div>
        </div>
      )}

      {/* Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 right-0 bottom-0 top-0 z-60 pointer-events-none"
      >
        <div className={`absolute inset-0 bg-black/50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} onClick={() => setIsOpen(false)} />
        <div className="absolute left-0 right-0 bottom-0 bg-card rounded-t-2xl p-4 shadow-2xl max-h-[70vh] overflow-y-auto pointer-events-auto border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Cart</h3>
            <div className="text-sm text-muted-foreground">{totalItems} items</div>
          </div>
          <div className="space-y-3">
            {cart.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">Your cart is empty</div>
            ) : (
              cart.map((it) => (
                <div key={it.id} className="flex items-center justify-between bg-neutral-900/40 p-3 rounded-lg">
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-muted-foreground">${(it.price * it.quantity).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(it.id, it.quantity - 1)} className="p-1 rounded-full bg-neutral-800"><Minus className="w-4 h-4"/></button>
                    <div className="px-3">{it.quantity}</div>
                    <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="p-1 rounded-full bg-neutral-800"><Plus className="w-4 h-4"/></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span className="text-foreground">${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-muted-foreground"><span>Tax (5%)</span><span className="text-foreground">${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-muted-foreground"><span>Service</span><span className="text-foreground">${service.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg text-foreground"><span>Total</span><span>${grand.toFixed(2)}</span></div>
            <div className="flex gap-2">
              <button onClick={() => { clearCart(); setIsOpen(false); }} className="flex-1 bg-secondary text-muted-foreground rounded-full py-2">Clear</button>
              <button className="flex-1 bg-accent text-accent-foreground rounded-full py-2 font-semibold">Checkout</button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CartDrawer;
