import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils, Calendar, Clock } from 'lucide-react';
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
      <DialogContent className="max-w-[90vw] sm:max-w-[500px] max-h-[95vh] overflow-y-auto sm:overflow-y-visible p-0 overflow-x-hidden border-none bg-transparent shadow-none z-[100] outline-none scrollbar-none">
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

            {/* Overlay Reserve button placed on top of the image - Desktop Only */}
            <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-20 w-2/3 px-6 pb-4">
              <Button
                onClick={handleReserve}
                style={{ backgroundColor: '#3d4402', color: '#ffffff' }}
                className="w-full font-bold pb-3 pt-3 text-lg rounded-xl border-none shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Utensils className="w-5 h-5" />
                Reserve a Table
              </Button>
            </div>
          </motion.div>

          {/* Mobile Reserve button - Shown only on mobile, below the image */}
          <div className="sm:hidden w-full px-6 pt-8 flex justify-center">
            <Button
              onClick={handleReserve}
              style={{ backgroundColor: '#3d4402', color: '#ffffff' }}
              className="w-full font-bold py-4 text-lg rounded-xl border-none shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Utensils className="w-5 h-5" />
              Reserve a Table
            </Button>
          </div>

          {/* Date & Hours boxes (shown only on mobile) */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="sm:hidden w-full px-6 mt-6"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-36 bg-[#3d4402] rounded-sm border border-white/40 p-3 text-center text-sm font-bold text-[#ffffff]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="uppercase text-xs">Date</span>
                </div>
                <div className="mt-1 text-sm font-medium">Sunday, May 10</div>
              </div>

              <div className="w-36 bg-[#d9a835] rounded-sm border border-white/40 p-3 text-center text-sm font-bold text-[#0a0a0a]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="uppercase text-xs">Hours</span>
                </div>
                <div className="mt-1 text-sm font-medium">11AM - 9PM</div>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MothersDayPopup;
