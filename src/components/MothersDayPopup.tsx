import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import mothersDayPromo from '@/assets/mothers-day-promo-v2.png';

const MothersDayPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('mothersDayPopupSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Show after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleReserve = () => {
    setIsOpen(false);
    localStorage.setItem('mothersDayPopupSeen', 'true');
    navigate('/contact');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        localStorage.setItem('mothersDayPopupSeen', 'true');
      }
    }}>
      <DialogContent className="max-w-[90vw] sm:max-w-[420px] max-h-[95vh] p-0 border-none bg-transparent shadow-none z-[100] outline-none scrollbar-none [&>button]:text-white [&>button]:opacity-100 [&>button]:bg-black/20 [&>button]:hover:bg-black/40 [&>button]:rounded-full [&>button]:p-1.5 [&>button]:transition-all [&>button]:right-2 [&>button]:top-2 sm:[&>button]:-right-4 sm:[&>button]:-top-4">
        <div className="relative group flex flex-col items-center">
          {/* Main Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-accent/20"
          >
            <img
              src={mothersDayPromo}
              alt="Mother's Day Promotion"
              className="w-full h-auto block"
            />

            {/* Unified Overlay for Reserve Button */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-20 w-full flex flex-col items-center px-4">
              {/* Reserve Button */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-[280px] sm:max-w-[320px]"
              >
                <Button
                  onClick={handleReserve}
                  style={{ backgroundColor: '#3d4402', color: '#ffffff' }}
                  className="w-full font-bold py-5 sm:py-7 text-base sm:text-lg rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Utensils className="w-5 h-5" />
                  Reserve a Table
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MothersDayPopup;
