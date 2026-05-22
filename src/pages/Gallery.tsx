import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12; // 4x3 grid, adjust as needed

  useEffect(() => {
    // SEO handled by next/head in the render method
  }, []);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://calm-actor-864a39d720.strapiapp.com/api/gallery-items?populate=*&pagination[pageSize]=100'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        
        const data = await response.json();
        
        // Sort by displayOrder and transform data
        const sortedImages = data.data
          .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .map((item: any) => ({
            src: item.imsge?.url || item.imsge?.formats?.large?.url || '',
            title: item.Title,
            category: item.Category,
            alt: item.altText || item.Title,
          }));
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(sortedImages.map((img: any) => img.category).filter(Boolean))
        ) as string[];
        
        setImages(sortedImages);
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0] || null); // Select first category by default
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery images');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Filter images based on selected category
  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images;

  // Pagination logic
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Events & Indian Buffet Dining in Bunbury | High Spirits</title>
        <meta name="description" content="See photos from High Spirits capturing Indian buffet dining, refined spaces and happy customers enjoying thoughtful hospitality." />
      </Head>
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
            Visual Journey
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="
              font-playfair font-bold text-luxury mb-6 text-center 
              whitespace-normal break-words leading-tight
              text-[clamp(2.2rem,6vw,4.8rem)]
            "
          >
            Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            Discover the beauty of our cuisine and ambience
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category, idx) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={`px-6 py-2 rounded-full font-semibold uppercase text-sm tracking-widest transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground gold-glow'
                      : 'border-2 border-accent text-accent hover:bg-accent/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <p className="text-muted-foreground text-lg">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {paginatedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative overflow-hidden rounded-xl elegant-shadow cursor-pointer aspect-square"
                  >
                    {/* Image */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Soft hover gradient (no text now) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-80 transition-all duration-500" />
                  </motion.div>
                ))}

              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center justify-center gap-6 mt-12"
                >
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-3 rounded-full border-2 border-accent text-accent hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-accent text-accent-foreground gold-glow'
                            : 'border-2 border-accent text-accent hover:bg-accent/10'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-full border-2 border-accent text-accent hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Image count info */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center mt-8"
                >
                  <p className="text-muted-foreground">
                    Showing {startIndex + 1} - {Math.min(endIndex, filteredImages.length)} of {filteredImages.length} images
                  </p>
                </motion.div>
              )}
            </>
          )}


        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;