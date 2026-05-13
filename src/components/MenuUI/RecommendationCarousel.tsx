import React from 'react';

const RecommendationCarousel: React.FC<{ items: any[]; title?: string }> = ({ items, title = "Chef's Recommendations" }) => {
  if (!items || items.length === 0) return null;

  const isVegName = (s: string) => /\b(veg|vegetarian|vegetable|paneer|potato|aloo|gobi|cauliflower|chana|dal|lentil|muttar|matar|peas|spinach|palak|korma|kofta|sabzi|raita|salad|gulab|kulfi|pulao|rice|roti|naan|paratha|dosa|idli)\b/.test(s.toLowerCase());
  const isNonVegName = (s: string) => /\b(chicken|beef|lamb|mutton|goat|prawn|prawns|shrimp|fish|seafood|egg|tikka|tandoori|kebab|seekh|meat|biryani|cutlet|momos)\b/.test(s.toLowerCase());

  const picks = items.slice(0, 2).map((it: any) => {
    const combined = (it.title || it.attributes?.title || '') + ' ' + (it.shortDescription || it.attributes?.shortDescription || '');
    let isVeg = false;
    if (typeof it.isVeg === 'boolean') isVeg = it.isVeg;
    else {
      if (isNonVegName(combined)) isVeg = false;
      else if (isVegName(combined)) isVeg = true;
      else isVeg = false;
    }
    return {
      id: it.id,
      title: it.title || it.attributes?.title,
      price: it.price || it.attributes?.price || 0,
      isVeg,
    };
  });

  return (
    <div className="px-4 mt-6">
      <h3 className="text-lg font-playfair font-semibold mb-3 text-foreground">{title}</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {picks.map((p) => (
          <div key={p.id} className="min-w-[160px] bg-card/60 p-3 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-sm text-foreground">{p.title}</div>
              <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.isVeg ? 'bg-emerald-800 text-emerald-300' : 'bg-red-900 text-red-300'}`}>
                {p.isVeg ? 'Veg' : 'Non-Veg'}
              </div>
            </div>
            <div className="text-accent font-bold mt-2">${p.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCarousel;
