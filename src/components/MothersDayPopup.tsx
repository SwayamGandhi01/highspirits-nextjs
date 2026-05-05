import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mothersDayBg from '@/assets/mothers-day-bg.png';

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

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('mothersDayPopupSeen', 'true');
  };

  const handleReserve = () => {
    handleClose();
    navigate('/contact');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none bg-transparent shadow-none sm:rounded-3xl z-[100]">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] shadow-2xl border border-accent/20">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={mothersDayBg} 
              alt="Mother's Day" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 pt-16 sm:pt-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mb-4 sm:mb-6 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-accent fill-accent animate-pulse" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-3 sm:mb-4 leading-tight"
            >
              Celebrate the <span className="text-accent italic">Queen</span> <br /> of Your Heart
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8 font-inter leading-relaxed max-w-[240px] sm:max-w-[280px]"
            >
              This Mother's Day, treat her to an exquisite culinary celebration at <span className="text-accent font-semibold">High Spirits</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="w-full grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 group hover:border-accent/30 transition-colors">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1.5 sm:mb-2" />
                <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold mb-0.5 sm:mb-1">Date</p>
                <p className="text-white text-xs sm:text-sm font-medium">Sunday, May 10</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 group hover:border-accent/30 transition-colors">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-1.5 sm:mb-2" />
                <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold mb-0.5 sm:mb-1">Hours</p>
                <p className="text-white text-xs sm:text-sm font-medium">11 AM – 9 PM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col w-full gap-3 sm:gap-4"
            >
              <Button 
                onClick={handleReserve}
                className="bg-accent text-[#0a0a0a] hover:bg-accent/90 font-bold py-6 sm:py-7 text-base sm:text-lg rounded-2xl gold-glow shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Reserve Your Table
              </Button>
              <button 
                onClick={handleClose}
                className="text-white/40 hover:text-white/80 text-[10px] sm:text-xs font-medium transition-colors uppercase tracking-[0.2em]"
              >
                Dismiss
              </button>
            </motion.div>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 group"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MothersDayPopup;
