import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Utensils, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const CustomerChoicePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
    navigate(path);
  };

  const handleClose = () => {
    sessionStorage.setItem('hasSeenChoicePopup', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-accent/30 bg-background/40 p-1 shadow-2xl backdrop-blur-xl"
          >
            {/* Inner Glow */}
            <div className="absolute -inset-24 bg-accent/10 blur-[100px] pointer-events-none" />

            <div className="relative overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-background/90 to-background/95 px-6 py-10 sm:px-12 sm:py-16">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-6 top-6 text-muted-foreground transition-colors hover:text-accent"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 flex justify-center"
                >
                  <div className="rounded-full bg-accent/10 p-3 ring-1 ring-accent/20">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 font-playfair text-3xl font-bold tracking-tight text-foreground sm:text-5xl"
                >
                  Welcome to <span className="text-luxury">High Spirits</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mx-auto mb-10 max-w-md text-base text-muted-foreground sm:text-lg"
                >
                  Indulge in the finest Indian flavors. How would you like to experience our culinary journey today?
                </motion.p>

                {/* Choices Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Dine-In Choice */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => handleChoice('/menu')}
                    className="group cursor-pointer rounded-2xl border border-accent/10 bg-accent/5 p-6 transition-all duration-500 hover:border-accent/40 hover:bg-accent/10 hover:shadow-[0_0_30px_rgba(203,161,53,0.15)]"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-2xl bg-accent/20 p-4 transition-transform duration-500 group-hover:scale-110">
                        <Utensils className="h-8 w-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-playfair text-xl font-bold text-foreground">Dine-In</h3>
                    <p className="text-sm text-muted-foreground">
                      Experience our premium ambiance and warm hospitality.
                    </p>
                  </motion.div>

                  {/* Take Away Choice */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => handleChoice('/menu')}
                    className="group cursor-pointer rounded-2xl border border-accent/10 bg-accent/5 p-6 transition-all duration-500 hover:border-accent/40 hover:bg-accent/10 hover:shadow-[0_0_30px_rgba(203,161,53,0.15)]"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-2xl bg-accent/20 p-4 transition-transform duration-500 group-hover:scale-110">
                        <ShoppingBag className="h-8 w-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-playfair text-xl font-bold text-foreground">Take Away</h3>
                    <p className="text-sm text-muted-foreground">
                      Enjoy our authentic flavors from the comfort of your home.
                    </p>
                  </motion.div>
                </div>

                {/* Footer Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12"
                >
                  <Button
                    onClick={() => handleChoice('/menu')}
                    variant="link"
                    className="group h-auto p-0 text-accent hover:text-accent/80"
                  >
                    <span className="text-lg font-semibold tracking-wide">Explore Our Full Menu</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
