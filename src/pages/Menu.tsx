import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { MenuItemSkeleton } from '@/components/skeletons/MenuItemSkeleton';
import { useCart } from '@/context/CartContext';
import { useWalkInPopup } from '@/context/WalkInPopupContext';
 
import LOCAL_MENU, { USE_LOCAL_MENU } from '@/lib/menuData';
import CategoryTabs from '@/components/MenuUI/CategoryTabs';
import MenuCard from '@/components/MenuUI/MenuCard';
import CartDrawer from '@/components/MenuUI/CartDrawer';
import SearchBar from '@/components/MenuUI/SearchBar';
import RecommendationCarousel from '@/components/MenuUI/RecommendationCarousel';


interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    thumbnail?: { url: string };
  };
}


interface MenuItem {
  id: number;
  documentId?: string;
  title: string;
  shortDescription: string;
  price: number;
  priceLabel?: string;
  featured: boolean;
  displayOrder?: number;
  image?: StrapiImage | null;
  // Legacy support
  attributes?: {
    title: string;
    shortDescription: string;
    price: number;
    priceLabel: string;
    featured: boolean;
    displayOrder: number;
    image: StrapiImage | { data?: { attributes?: { url: string; alternativeText?: string } } };
  };
}


interface MenuCategory {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  displayOrder?: number;
  menu_items?: MenuItem[];
  attributes?: {
    title: string;
    slug: string;
    displayOrder: number;
    menu_items?: {
      data: MenuItem[];
    };
  };
}

interface BuffetItem {
  id: number;
  name: string;
  description: string | null;
  isVeg: boolean | null;
  isSpicy: boolean | null;
  order: number;
}

interface BuffetCategory {
  id: number;
  title: string;
  order: number;
  price: number;
  buffet_items: BuffetItem[];
}

const Menu = () => {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [buffetCategories, setBuffetCategories] = useState<BuffetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buffetLoading, setBuffetLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [nonVegOnly, setNonVegOnly] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { openPopup } = useWalkInPopup();

  useEffect(() => {
    document.title = 'High Spirits Menu | Indian Buffet & Fine Dining Bunbury';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore the High Spirits menu featuring an Indian buffet and fine dining dishes, with vegetarian and non-vegetarian mains crafted for refined tastes.');
    }
  }, []);

  // Select first category tab when menuCategories populate
  useEffect(() => {
    if (!activeTab && menuCategories.length > 0) {
      const first = menuCategories[0];
      const slug = first.slug || first.attributes?.slug || `category-${first.id}`;
      setActiveTab(slug);
    }
  }, [menuCategories, activeTab]);

  const filteredCategories = useMemo(() => {
    const kw = searchQuery.trim().toLowerCase();
    const isVegName = (name: string) => {
      const n = name.toLowerCase();
      return /\b(veg|vegetarian|vegetable|paneer|dal|gobi|aloo|rice|naan|dosa|lassi|kulfi|gulab|samosa)\b/.test(n);
    };

    const isNonVegName = (name: string) => {
      const n = name.toLowerCase();
      return /\b(chicken|beef|lamb|mutton|goat|prawn|prawns|fish|seafood|egg|tikka|tandoori|meat|shrimp|roast|kebab)\b/.test(n);
    };

    return menuCategories
      .map((category: any) => {
        const items = category.menu_items || category.attributes?.menu_items?.data || [];
        const filtered = items.filter((it: any) => {
          const title = (it.title || it.attributes?.title || '').toString().toLowerCase();
          const desc = (it.shortDescription || it.attributes?.shortDescription || '').toString().toLowerCase();
          const matchesQuery = !kw || title.includes(kw) || desc.includes(kw);
          // If only veg selected -> require veg match
          if (vegOnly && !nonVegOnly) {
            return matchesQuery && (isVegName(title) || isVegName(desc));
          }
          // If only non-veg selected -> require non-veg match
          if (nonVegOnly && !vegOnly) {
            return matchesQuery && (isNonVegName(title) || isNonVegName(desc));
          }
          // If both or none selected -> allow all (but still apply search query)
          return matchesQuery;
        });
        return { ...category, menu_items: filtered };
      })
      .filter((c: any) => (c.menu_items || []).length > 0);
  }, [menuCategories, searchQuery, vegOnly]);

  // Fetch menu items directly and group by category
  useEffect(() => {
    if (USE_LOCAL_MENU && LOCAL_MENU?.menuCategories) {
      setMenuCategories(LOCAL_MENU.menuCategories || []);
      setIsLoading(false);
      return;
    }

    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/menu-items');
        apiUrl.searchParams.append('populate', '*');
        apiUrl.searchParams.append('sort', 'displayOrder:asc');
        apiUrl.searchParams.append('pagination[pageSize]', '100');

        console.log('Fetching menu items from:', apiUrl.toString());

        const response = await fetch(apiUrl.toString());

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data: any = await response.json();
        console.log('Full API Response:', data);
        
        const items = data.data || [];
        console.log('Raw Items:', items);
        
        // Group items by category
        const categoryMap = new Map<number, any>();
        
        items.forEach((item: any) => {
          // Extract item attributes (handles v4 nested and v5 flat)
          const attrs = item.attributes || item;
          
          // Extract category info (handles v4 { data: { id, attributes } } and v5 flat)
          const catWrapper = attrs.menu_category;
          const catData = catWrapper?.data?.attributes || (catWrapper?.attributes ? catWrapper.attributes : (catWrapper?.data ? catWrapper.data : catWrapper));
          const catId = catWrapper?.data?.id || catWrapper?.id || item.menu_category?.id;
          
          if (catData && catId) {
            // Check isActive (default to true if not specified)
            const isActive = catData.isActive !== undefined ? catData.isActive : true;
            
            if (isActive) {
              if (!categoryMap.has(catId)) {
                categoryMap.set(catId, {
                  id: catId,
                  documentId: catData.documentId || catWrapper?.data?.documentId,
                  title: catData.title,
                  slug: catData.slug,
                  displayOrder: catData.displayOrder || 0,
                  menu_items: [],
                });
              }
              const group = categoryMap.get(catId)!;
              group.menu_items.push(item);
            }
          } else {
            console.warn('Item missing category info:', item);
          }
        });

        // Convert to sorted array
        const sortedCategories = Array.from(categoryMap.values()).sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        
        console.log('Grouped Categories:', sortedCategories);
        setMenuCategories(sortedCategories);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Fetch buffet categories
  useEffect(() => {
    if (USE_LOCAL_MENU && LOCAL_MENU?.menuCategories) {
      setBuffetCategories(LOCAL_MENU.buffetCategories || []);
      setBuffetLoading(false);
      return;
    }

    const fetchBuffetCategories = async () => {
      try {
        setBuffetLoading(true);
        
        const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/buffet-categories');
        
        apiUrl.searchParams.append('fields[0]', 'title');
        apiUrl.searchParams.append('fields[1]', 'price');
        apiUrl.searchParams.append('fields[2]', 'order');
        apiUrl.searchParams.append('sort', 'order:asc');
        
        apiUrl.searchParams.append('populate[buffet_items][fields][0]', 'name');
        apiUrl.searchParams.append('populate[buffet_items][fields][1]', 'description');
        apiUrl.searchParams.append('populate[buffet_items][fields][2]', 'isVeg');
        apiUrl.searchParams.append('populate[buffet_items][fields][3]', 'isSpicy');
        apiUrl.searchParams.append('populate[buffet_items][sort]', 'order:asc');
        apiUrl.searchParams.append('pagination[pageSize]', '100');

        const buffetRes = await fetch(apiUrl.toString());

        if (!buffetRes.ok) {
          throw new Error('Failed to fetch buffet categories');
        }

        const buffetData = await buffetRes.json();
        const categories = (buffetData.data || []) as BuffetCategory[];

        setBuffetCategories(categories);
      } catch (error) {
        console.error('Error fetching buffet categories:', error);
      } finally {
        setBuffetLoading(false);
      }
    };

    fetchBuffetCategories();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20 luxury-gradient">
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Culinary Delights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            A curated selection of authentic Indian & Punjabi specialties
          </motion.p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <SearchBar query={searchQuery} onQuery={setSearchQuery} vegOnly={vegOnly} setVegOnly={setVegOnly} />
          <RecommendationCarousel items={(menuCategories[0]?.menu_items || menuCategories.flatMap((c:any)=>c.menu_items||[])).slice(0, 12)} />

          <CategoryTabs categories={menuCategories} active={activeTab} onChange={(s) => setActiveTab(s)} />

          <div className="space-y-4 md:space-y-6 lg:space-y-8 mt-4">
            {isLoading ? (
              <MenuItemSkeleton count={6} />
            ) : (
              filteredCategories.map((category: any) => {
                const slug = category.slug || category.attributes?.slug || `category-${category.id}`;
                if (slug !== activeTab) return null;
                const items = category.menu_items || category.attributes?.menu_items?.data || [];

                return (
                  <div key={category.id} className="space-y-4">
                    <h2 className="text-2xl font-playfair font-semibold text-foreground">{category.title || category.attributes?.title}</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {items.map((item: any) => (
                        <MenuCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6 text-lg">
              Ready to experience culinary excellence?
            </p>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow"
              onClick={() => openPopup()}
            >
              Book Your Table
            </Button>
          </motion.div>
        </div>
      </section>

      <CartDrawer />
      <Footer />
    </div>
  );
};

export default Menu;