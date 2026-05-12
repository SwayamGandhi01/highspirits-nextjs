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

  // Fetch menu items directly and group by category
  useEffect(() => {
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
          <Tabs defaultValue="buffet" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12 bg-secondary/50 p-2 rounded-lg h-auto w-full max-w-5xl mx-auto">
              <TabsTrigger value="buffet" className="text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-2 md:px-6">
                Buffet
              </TabsTrigger>
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
            <TabsContent value="buffet" className="space-y-4 md:space-y-6 lg:space-y-8">
              {buffetLoading ? (
                <MenuItemSkeleton count={4} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-4xl mx-auto"
                >
                  {/* Premium Buffet Container */}
                  <div className="relative rounded-3xl overflow-hidden border-3 border-accent gold-glow">
                    {/* Elegant Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-background to-accent/10 pointer-events-none"></div>

                    <div className="relative p-6 md:p-14 lg:p-16">
                      {/* Luxe Header Section */}
                      <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-8 md:mb-14 pb-6 md:pb-10 border-b-2 md:border-b-3 border-gradient-to-r from-accent/30 via-accent/50 to-accent/30"
                      >
                        {/* Floating Crown */}
                        <motion.div
                          animate={{ y: [0, -12, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="flex justify-center mb-4 md:mb-6"
                        >
                          <span className="text-4xl md:text-6xl lg:text-7xl drop-shadow-lg">👑</span>
                        </motion.div>
 
                        {/* Main Title with Gradient */}
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-3 md:mb-4 inline-block bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent leading-tight">
                          High Spirits Buffet
                        </h2>
 
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          className="mt-2 md:mt-4 space-y-1 md:space-y-2"
                        >
                          <p className="text-xs sm:text-sm md:text-lg text-accent font-semibold tracking-wide uppercase">
                            ✨ The Ultimate Fine-Dining Experience ✨
                          </p>
                          <p className="text-sm sm:text-base md:text-xl text-muted-foreground">
                            Unlimited Authentic Indian & Punjabi Specialties
                          </p>
                        </motion.div>
                      </motion.div>

                      {/* Buffet Categories - Vertical List */}
                      <div className="space-y-12">
                        {buffetCategories.map((buffetCategory, catIndex) => {
                          const categoryEmojis: { [key: string]: string } = {
                            'Starters': '🥘',
                            'Main Course': '🍛',
                            'Mains': '🍛',
                            'Breads': '🍞',
                            'Bread': '🍞',
                            'Desserts': '🍰',
                            'Dessert': '🍰',
                            'Beverages': '🥤',
                            'Beverage': '🥤',
                          };

                          const emoji = Object.entries(categoryEmojis).find(([key]) =>
                            buffetCategory.title.toLowerCase().includes(key.toLowerCase())
                          )?.[1] || '🍽️';

                          return (
                            <motion.div
                              key={buffetCategory.id}
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                              className="group"
                            >
                              {/* Category Header */}
                              <div className="mb-8 relative">
                                <div className="flex items-center gap-3 md:gap-4 pb-3 md:pb-4">
                                  {/* Animated Emoji */}
                                  <motion.span
                                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: catIndex * 0.3 }}
                                    className="text-3xl md:text-5xl flex-shrink-0"
                                  >
                                    {emoji}
                                  </motion.span>

                                  {/* Title and Item Count */}
                                  <div className="flex-1">
                                    <h3 className="text-xl sm:text-2xl md:text-4xl font-playfair font-bold text-accent group-hover:text-white transition-colors duration-300">
                                      {buffetCategory.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                                      {buffetCategory.buffet_items.length} Authentic Specialties
                                    </p>
                                  </div>

                                  {/* Item Count Badge */}
                                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/70 text-accent-foreground font-bold text-lg shadow-lg shadow-accent/30">
                                    {buffetCategory.buffet_items.length}
                                  </div>
                                </div>

                                {/* Gradient Divider */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent rounded-full"></div>
                              </div>

                              {/* Items List */}
                              <ul className="space-y-4 pl-2 md:pl-6">
                                {buffetCategory.buffet_items.map((item: any, itemIndex: number) => (
                                  <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: itemIndex * 0.06 }}
                                    className="group/item flex items-start gap-3 md:gap-4 p-3 md:p-5 rounded-xl bg-gradient-to-r from-accent/5 to-transparent border-l-4 border-accent/0 group-hover/item:border-accent group-hover/item:bg-accent/8 transition-all duration-300 hover:shadow-md hover:shadow-accent/20"
                                  >
                                    {/* Left Accent Bar */}
                                    <div className="flex-shrink-0 w-0.5 md:w-1 h-full min-h-[50px] md:min-h-[60px] bg-gradient-to-b from-accent to-accent/30 rounded-full transition-all duration-300"></div>

                                    {/* Item Content */}
                                    <div className="flex-1 min-w-0">
                                      {/* Item Name & Badges */}
                                      <div className="flex items-start justify-between gap-3 mb-2">
                                        <h4 className="text-base md:text-lg font-semibold text-foreground group-hover/item:text-accent transition-colors duration-300 leading-snug">
                                          {item.name}
                                        </h4>

                                        {/* Badge Container */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                          {/* Veg/Non-Veg Indicator */}
                                          {item.isVeg !== null && (
                                            <motion.div
                                              whileHover={{ scale: 1.2 }}
                                              className={`flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                                                item.isVeg
                                                  ? 'border-green-500 bg-green-500/20 shadow-md shadow-green-500/30'
                                                  : 'border-red-500 bg-red-500/20 shadow-md shadow-red-500/30'
                                              }`}
                                            >
                                              <span
                                                className={`w-2.5 h-2.5 rounded-full ${
                                                  item.isVeg ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                              ></span>
                                            </motion.div>
                                          )}

                                          {/* Spicy Badge */}
                                          {item.isSpicy && (
                                            <motion.span
                                              whileHover={{ scale: 1.25 }}
                                              className="text-base md:text-lg font-bold cursor-default"
                                            >
                                              🌶️
                                            </motion.span>
                                          )}
                                        </div>
                                      </div>

                                      {/* Description */}
                                      {item.description && (
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors duration-300">
                                          {item.description}
                                        </p>
                                      )}
                                    </div>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Premium Pricing Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-16 pt-12 border-t-3 border-gradient-to-r from-accent/30 via-accent/50 to-accent/30"
                      >
                        <div className="text-center">
                          {/* Price Tag */}
                          <motion.div
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                          >
                            <p className="text-base md:text-lg text-muted-foreground mb-4 font-medium">
                              Complete Dining Experience for Just
                            </p>

                            <div className="mb-8">
                              {/* Price Glow Effect */}
                              <div className="relative inline-block">
                                <div className="absolute -inset-4 bg-accent/30 blur-3xl rounded-3xl"></div>

                                <div className="relative px-6 py-6 md:px-10 md:py-8 rounded-2xl md:rounded-3xl border-2 md:border-3 border-accent bg-gradient-to-b from-accent/15 to-accent/5">
                                  <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-accent leading-none">
                                    ${buffetCategories[0]?.price}
                                  </p>
                                  <p className="text-base md:text-xl text-foreground font-semibold mt-2 md:mt-3">
                                    Per Person
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Features & Info */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-8"
                          >
                            <p className="text-base md:text-lg text-accent font-semibold mb-6">
                              ✨ Benefits Include ✨
                            </p>

                           
                          </motion.div>

                          {/* CTA Button */}
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex justify-center"
                          >
                            <Button 
                              onClick={() => addToCart({ 
                                id: 9999, // Unique ID for Buffet
                                title: "High Spirits Buffet", 
                                price: buffetCategories[0]?.price || 0, 
                                quantity: 1 
                              })}
                              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 sm:px-12 py-6 sm:py-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl gold-glow flex items-center gap-3 sm:gap-4 transition-all duration-300"
                            >
                              <ShoppingBag className="w-5 h-5 sm:w-6 h-6" />
                              Add Buffet to Cart
                            </Button>
                          </motion.div>

                          {/* Tagline */}
                          <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="text-base md:text-lg text-accent italic font-semibold"
                          >
                            "Where Every Meal is a Celebration"
                          </motion.p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </TabsContent>
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