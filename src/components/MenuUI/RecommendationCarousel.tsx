import React from 'react';

const RecommendationCarousel: React.FC<{ items: any[]; title?: string }> = ({ items, title = "Chef's Recommendations" }) => {
  if (!items || items.length === 0) return null;

  const picks = items.slice(0, 8).map((it: any) => ({
    id: it.id,
    title: it.title || it.attributes?.title,
    price: it.price || it.attributes?.price || 0,
  }));

  return (
    <div className="px-4 mt-6">
      <h3 className="text-lg font-playfair font-semibold mb-3 text-foreground">{title}</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {picks.map((p) => (
          <div key={p.id} className="min-w-[160px] bg-card/60 p-3 rounded-xl border border-border">
            <div className="font-semibold text-sm text-foreground">{p.title}</div>
            <div className="text-accent font-bold mt-2">${p.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCarousel;
