import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Carousel3DItem {
  image: string;
  title: string;
  description: string;
}

interface Carousel3DProps {
  items: Carousel3DItem[];
  autoPlay?: boolean;
}

const Carousel3D = ({ items, autoPlay = true }: Carousel3DProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-4xl h-[500px] glass-effect rounded-2xl overflow-hidden elegant-shadow"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src={items[currentIndex].image}
              alt={items[currentIndex].title}
              className="w-full h-full object-cover"
            />
            
            {/* Glass overlay with content */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary via-primary/95 to-transparent"
            >
              <h3 className="text-3xl font-playfair font-bold text-luxury mb-3">
                {items[currentIndex].title}
              </h3>
              <p className="text-lg text-foreground/90">
                {items[currentIndex].description}
              </p>
            </motion.div>
            
            {/* Gold glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border-2 border-accent/20 rounded-2xl gold-glow" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="absolute left-4 z-10 p-4 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full gold-glow transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="absolute right-4 z-10 p-4 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full gold-glow transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

    </div>
  );
};

export default Carousel3D;
