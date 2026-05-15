import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Clock, MapPin, Sparkle, Star, ChefHat, Flame } from 'lucide-react';
import { Button } from './ui/button';

interface LunchWelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const HighSpiritsPopup: React.FC<LunchWelcomePopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const colors = {
    emerald: '#146854',
    emeraldDark: '#0d4a3d',
    gold: '#FBBF24',
    goldLight: '#FDE68A',
    dark: '#0a0a0a'
  };

  const handleExploreMenu = () => {
    onClose();
    navigate('/menu');
  };

  const paragraphText = `We are delighted to welcome you for lunch dine-in at High Spirits. Enjoy our thoughtfully created menu in a relaxed, refined setting.`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Enhanced Luxury Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a1a 100%)`,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 opacity-50 pointer-events-none">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute rounded-3xl pointer-events-none"
                style={{
                  inset: '-2px',
                  background: `conic-gradient(from 0deg, ${colors.gold}, ${colors.emerald}, ${colors.gold})`,
                  filter: 'blur(8px)',
                }}
              />
            </div>

            {/* Inner container */}
            <div className="relative min-h-full" style={{ background: colors.dark }}>
              {/* Decorative top accent */}
              <div
                className="h-2 w-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.emerald} 0%, ${colors.gold} 50%, ${colors.emerald} 100%)`,
                }}
              />

              {/* Close button - Fixed to the container so it stays accessible */}
              <div className="sticky top-0 z-20 flex justify-end p-4 pointer-events-none">
                <button
                  onClick={onClose}
                  className="rounded-full p-2 transition-all hover:scale-110 pointer-events-auto backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(20, 104, 84, 0.3)',
                    color: colors.goldLight,
                    border: `1px solid ${colors.gold}30`,
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Animated flame decorations */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-8 left-6 sm:left-8 pointer-events-none"
                style={{ color: colors.gold, opacity: 0.6 }}
              >
                <Flame size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
                className="absolute top-8 right-20 sm:right-24 pointer-events-none"
                style={{ color: colors.gold, opacity: 0.6 }}
              >
                <Flame size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
              </motion.div>

              {/* Main content */}
              <div className="relative px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
                {/* Floating decorative elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-8 left-8 pointer-events-none"
                  style={{ color: colors.gold, opacity: 0.3 }}
                >
                  <Sparkle size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute top-16 right-12 pointer-events-none"
                  style={{ color: colors.emerald, opacity: 0.3 }}
                >
                  <Star size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="absolute bottom-20 right-8 pointer-events-none"
                  style={{ color: colors.goldLight, opacity: 0.2 }}
                >
                  <Sparkle size={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />
                </motion.div>

                {/* Logo circle with glow and animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                  className="mx-auto mb-4 sm:mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full text-4xl font-bold shadow-2xl relative"
                  style={{
                    background: `linear-gradient(135deg, ${colors.emerald} 0%, ${colors.emeraldDark} 100%)`,
                    color: colors.gold,
                    boxShadow: `0 0 40px ${colors.emerald}60, 0 0 80px ${colors.gold}30, inset 0 0 20px ${colors.gold}10`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <ChefHat className="w-10 h-10 sm:w-12 sm:h-12" />
                  </motion.div>
                </motion.div>

                {/* Title with gradient text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-3 sm:mb-4 text-center"
                >
                  <h2
                    className="mb-1 text-3xl sm:text-4xl font-bold tracking-wide"
                    style={{
                      background: `linear-gradient(135deg, ${colors.goldLight} 0%, ${colors.gold} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Lunch Dine-In
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-6 sm:w-8" style={{ backgroundColor: colors.emerald }} />
                    <p className="text-[10px] sm:text-xs font-light tracking-widest" style={{ color: colors.goldLight }}>
                      NOW OPEN FOR LUNCH
                    </p>
                    <div className="h-px w-6 sm:w-8" style={{ backgroundColor: colors.emerald }} />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 sm:mb-8 text-center text-sm sm:text-base leading-relaxed px-2"
                  style={{ color: '#d1d5db' }}
                >
                  {paragraphText}
                </motion.p>

                {/* Info cards with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  {/* Time card */}
                  <div
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl p-3 sm:p-4 backdrop-blur-sm transition-all hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 104, 84, 0.15) 0%, rgba(20, 104, 84, 0.05) 100%)',
                      border: `1px solid ${colors.emerald}30`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${colors.emerald}30`, color: colors.gold }}
                    >
                      <Clock size={20} className="sm:w-6 sm:h-6" />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium" style={{ color: colors.goldLight }}>
                        Lunch Timings
                      </p>
                      <p className="text-[13px] sm:text-base font-semibold tracking-wide" style={{ color: '#fff' }}>
                        11:30 AM — 2:30 PM (Wed-Sun)
                      </p>
                    </div>
                  </div>

                  {/* Location card */}
                  <div
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl p-3 sm:p-4 backdrop-blur-sm transition-all hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%)',
                      border: `1px solid ${colors.gold}30`,
                    }}
                  >
                    <div
                      className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${colors.gold}30`, color: colors.emerald }}
                    >
                      <MapPin size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium" style={{ color: colors.goldLight }}>
                        Find Us At
                      </p>
                      <p className="text-[13px] sm:text-base font-semibold tracking-wide" style={{ color: '#fff' }}>
                        1/57 Victoria Street, Bunbury
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom tagline with CTA button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 sm:mt-8 space-y-4"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-xs tracking-widest">
                    <span style={{ color: colors.gold }}>AUTHENTIC</span>
                    <span style={{ color: colors.emerald }}>•</span>
                    <span style={{ color: colors.gold }}>PREMIUM</span>
                    <span style={{ color: colors.emerald }}>•</span>
                    <span style={{ color: colors.gold }}>UNFORGETTABLE</span>
                  </div>
                  <div className="flex justify-center pt-2 sm:pt-4">
                    <Button
                      onClick={handleExploreMenu}
                      className="px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all transform hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                        color: colors.dark,
                        boxShadow: `0 8px 24px ${colors.gold}40`,
                      }}
                    >
                      Explore Menu
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Decorative bottom accent */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.emerald} 0%, ${colors.gold} 50%, ${colors.emerald} 100%)`,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HighSpiritsPopup;

