import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

type Item = any;

const MenuCard: React.FC<{ item: Item }> = ({ item }) => {
  const { addToCart } = useCart();

  const title = item.title || item.attributes?.title || 'Item';
  const price = typeof item.price === 'number' ? item.price : item.attributes?.price || 0;
  const desc = item.shortDescription || item.attributes?.shortDescription || '';

  const nameLower = (title + ' ' + desc).toLowerCase();
  const isVeg = /\b(veg|vegetarian|paneer|dal|gobi|aloo|naan|dosa|lassi|kulfi|gulab|samosa)\b/.test(nameLower);

  const placeholder = `https://source.unsplash.com/collection/190727/400x300?sig=${item.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-card border border-border rounded-xl p-4 shadow-lg"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-lg font-playfair font-semibold text-foreground">{title}</h4>
              <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${isVeg ? 'bg-emerald-800 text-emerald-300' : 'bg-red-900 text-red-300'}`}>
                {isVeg ? 'Veg' : 'Non-Veg'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-accent">${price?.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">per serving</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => addToCart({ id: item.id, title, price, quantity: 1 })}
            className="ml-auto bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-sm hover:brightness-105 transition"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
