import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemSkeleton } from '@/components/skeletons/MenuItemSkeleton';
import ShareButtons from '@/components/ShareButtons';
import { useCart } from '@/context/CartContext';
import { useWalkInPopup } from '@/context/WalkInPopupContext';
import { ShoppingBag, Plus } from 'lucide-react';
import LOCAL_MENU, { USE_LOCAL_MENU } from '@/lib/menuData';


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
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12 bg-secondary/50 p-2 rounded-lg h-auto w-full max-w-5xl mx-auto">
              {/* Buffet removed - categories from menu JSON shown below */}
              {menuCategories.map((category: any) => {
                const slug = category.slug || category.attributes?.slug || `category-${category.id}`;
                const title = category.title || category.attributes?.title || 'Menu';
                return (
                  <TabsTrigger
                    key={category.id}
                    value={slug}
                    className="text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-2 md:px-6"
                  >
                    {title}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Menu Categories Tabs */}
            {menuCategories.map((category: any) => {
              const slug = category.slug || category.attributes?.slug || `category-${category.id}`;
              // Handle both new flat structure and old nested structure
              const menuItems = category.menu_items || category.attributes?.menu_items?.data || [];

              return (
                <TabsContent key={category.id} value={slug} className="space-y-4 md:space-y-6 lg:space-y-8">
                  {isLoading ? (
                    <MenuItemSkeleton count={6} />
                  ) : menuItems.length > 0 ? (
                    menuItems.map((item: any, index: number) => {
                      // Handle both new flat structure and old nested structure
                      const title = item.title || item.attributes?.title;
                      const price = item.price || item.attributes?.price;
                      const shortDescription = item.shortDescription || item.attributes?.shortDescription;
                      const featured = item.featured !== undefined ? item.featured : item.attributes?.featured;
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`glass-effect rounded-lg md:rounded-xl overflow-hidden hover:scale-[1.01] md:hover:scale-[1.02] transition-transform duration-300 p-4 md:p-6 lg:p-8 ${
                            featured ? 'border-2 border-accent gold-glow' : ''
                          }`}
                        >
                          <div className="flex flex-col justify-center">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-4 gap-3">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair font-bold text-foreground leading-tight">
                                  {title}
                                </h3>
                                {featured && (
                                  <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-[9px] md:text-xs font-semibold uppercase tracking-wider w-fit">
                                    Chef's Special
                                  </span>
                                )}
                              </div>
                                {!['starters', 'mains', 'breads', 'desserts', 'tasting-menus', 'tasting-menu'].includes(slug) && !slug?.toLowerCase().includes('tasting') && (
                                  <span className="text-xl md:text-2xl font-bold text-accent flex-shrink-0">
                                    ${price?.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                                {shortDescription}
                              </p>
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-0">
                                <div className="flex items-center justify-between sm:justify-start gap-4">
                                  <ShareButtons title={title} />
                                  <Button 
                                    onClick={() => addToCart({ id: item.id, title, price, quantity: 1 })}
                                    className="sm:hidden flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-10 px-4 rounded-full font-semibold"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add to Cart
                                  </Button>
                                </div>
                                <Button 
                                  onClick={() => addToCart({ id: item.id, title, price, quantity: 1 })}
                                  className="hidden sm:flex bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-10 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                  <Plus className="w-4 h-4" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">No items available in this category</p>
                    </div>
                  )}
                </TabsContent>
              );
            })}

            {/* Buffet Tab */}
            {/* Buffet removed - no dedicated buffet tab */}
          </Tabs>

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

      <Footer />
    </div>
  );
};

export default Menu;