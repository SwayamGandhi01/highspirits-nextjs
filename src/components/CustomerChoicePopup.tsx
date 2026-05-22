import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { X, Utensils, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const CustomerChoicePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenChoicePopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Show after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (path: string) => {
    sessionStorage.setItem('hasSeenChoicePopup', 'true');
    setIsOpen(false);
    router.push(path);
  };

  const handleClose = () => {
    sessionStorage.setItem('hasSeenChoicePopup', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[2rem] border border-accent/30 bg-background/40 p-1 shadow-2xl backdrop-blur-xl"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Inner Glow */}
            <div className="absolute -inset-24 bg-accent/10 blur-[100px] pointer-events-none" />

            <div className="relative min-h-full rounded-[1.9rem] bg-gradient-to-b from-background/90 to-background/95 px-4 py-8 sm:px-12 sm:py-16">
              {/* Close Button - Sticky for easy access */}
              <div className="sticky top-0 z-20 flex justify-end pointer-events-none w-full pb-2">
                <button
                  onClick={handleClose}
                  className="rounded-full bg-background/50 p-2 text-muted-foreground transition-all hover:text-accent hover:bg-background/80 pointer-events-auto backdrop-blur-sm -mr-2 sm:-mr-6 -mt-4 sm:-mt-10"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3 sm:mb-4 flex justify-center"
                >
                  <div className="rounded-full bg-accent/10 p-2 sm:p-3 ring-1 ring-accent/20">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-3 sm:mb-4 font-playfair text-2xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
                >
                  Welcome to <span className="text-luxury">High Spirits</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mx-auto mb-6 sm:mb-10 max-w-md text-sm text-muted-foreground sm:text-lg px-2"
                >
                  Indulge in the finest Indian flavors. How would you like to experience our culinary journey today?
                </motion.p>

                {/* Choices Grid */}
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  {/* Dine-In Choice */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => handleChoice('/menu')}
                    className="group cursor-pointer rounded-2xl border border-accent/10 bg-accent/5 p-4 sm:p-6 transition-all duration-500 hover:border-accent/40 hover:bg-accent/10 hover:shadow-[0_0_30px_rgba(203,161,53,0.15)]"
                  >
                    <div className="mb-3 sm:mb-4 flex justify-center">
                      <div className="rounded-2xl bg-accent/20 p-3 sm:p-4 transition-transform duration-500 group-hover:scale-110">
                        <Utensils className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="mb-1 sm:mb-2 font-playfair text-lg sm:text-xl font-bold text-foreground">Dine-In</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Experience our premium ambiance and warm hospitality.
                    </p>
                  </motion.div>

                  {/* Take Away Choice */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => handleChoice('/menu')}
                    className="group cursor-pointer rounded-2xl border border-accent/10 bg-accent/5 p-4 sm:p-6 transition-all duration-500 hover:border-accent/40 hover:bg-accent/10 hover:shadow-[0_0_30px_rgba(203,161,53,0.15)]"
                  >
                    <div className="mb-3 sm:mb-4 flex justify-center">
                      <div className="rounded-2xl bg-accent/20 p-3 sm:p-4 transition-transform duration-500 group-hover:scale-110">
                        <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="mb-1 sm:mb-2 font-playfair text-lg sm:text-xl font-bold text-foreground">Take Away</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Enjoy our authentic flavors from the comfort of your home.
                    </p>
                  </motion.div>
                </div>

                {/* Footer Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 sm:mt-12"
                >
                  <Button
                    onClick={() => handleChoice('/menu')}
                    variant="link"
                    className="group h-auto p-0 text-accent hover:text-accent/80"
                  >
                    <span className="text-base sm:text-lg font-semibold tracking-wide">Explore Our Full Menu</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomerChoicePopup;
