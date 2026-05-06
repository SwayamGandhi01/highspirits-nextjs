import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MothersDayTopBar = () => {
  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[60] h-10 sm:h-12 flex items-center bg-black border-b border-accent/20 shadow-lg"
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          
          {/* Main Info Group */}
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-accent fill-accent animate-pulse" />
              <span className="text-[10px] sm:text-xs md:text-sm font-playfair font-bold text-accent tracking-[0.2em] whitespace-nowrap uppercase">
                Mother's Day Celebration
              </span>
            </div>
            
            {/* Desktop Details */}
            <div className="hidden md:flex items-center gap-4 text-[10px] font-inter font-medium text-accent/70 uppercase tracking-[0.15em]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent/50" />
                Sunday, May 10
              </span>
              <span className="w-px h-3 bg-accent/20" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent/50" />
                11 AM – 9 PM
              </span>
            </div>
          </div>

          {/* Desktop Separator */}
          <div className="hidden sm:block w-px h-4 bg-accent/20 mx-2" />

          {/* Action Link */}
          <Link 
            to="/contact" 
            className="flex items-center gap-1.5 text-accent hover:text-white transition-colors text-[9px] sm:text-xs font-bold uppercase tracking-widest group"
          >
            <span>Reserve Table</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </motion.div>
  );
};

export default MothersDayTopBar;
