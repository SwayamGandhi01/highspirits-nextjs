import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
const dalMakhani = '/images/dish-dal-makhani.jpg';
const palakPaneer = '/images/dish-palak-paneer.jpg';
const roganJosh = '/images/dish-rogan-josh.jpg';
const naan = '/images/dish-naan.jpg';
const heroDish1 = '/images/hero-dish-1.jpg';
const heroDish2 = '/images/hero-dish-2.jpg';

type RemoteDish = {
  id: number;
  title: string;
  shortDescription?: string;
  displayOrder?: number;
  image?: any;
};

const DishGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [dishes, setDishes] = useState<Array<{ id: number; image: string; name: string; category?: string }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchSignature = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/signature-dishes?populate=*');
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        const items: RemoteDish[] = json?.data || [];
        const mapped = items
          .map((it) => {
            const img = it.image;
            // prefer medium, then small, then full url
            const url = img?.formats?.medium?.url || img?.formats?.small?.url || img?.url || null;
            return {
              id: it.id,
              image: url,
              name: it.title || (it as any).documentId || 'Dish',
              category: it.shortDescription || undefined,
            };
          })
          .filter((d) => d.image) // only show if image available
          .sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

        if (mounted && mapped.length) setDishes(mapped as any);
      } catch (e) {
        // keep fallback
        console.warn('Failed to fetch signature dishes', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSignature();
    return () => { mounted = false; };
  }, []);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
            Culinary Excellence
          </p>
       <h2
  className="
    font-playfair font-bold text-luxury mb-4 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2rem,5.5vw,3.5rem)]
  "
>
  Signature Dishes
</h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handcrafted with the finest ingredients and authentic spices
          </p>
        </motion.div>

        {dishes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative overflow-hidden rounded-lg elegant-shadow cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={typeof dish.image === 'string' ? dish.image : (dish.image as any)?.default || dish.image}
                  alt={dish.name}
                  width={600}
                  height={600}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              >
                <p className="text-accent text-sm font-inter uppercase tracking-wider mb-1">
                  {dish.category}
                </p>
                <h3 className="text-2xl font-playfair font-bold text-foreground">
                  {dish.name}
                </h3>
                <div className="w-16 h-1 bg-accent mt-3 rounded-full" />
              </motion.div>
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-accent text-xl">+</span>
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DishGrid;