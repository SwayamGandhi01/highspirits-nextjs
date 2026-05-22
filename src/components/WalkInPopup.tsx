import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface WalkInPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  enquiry: string;
}

const WalkInPopup: React.FC<WalkInPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    enquiry: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/walk-ins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            fullName: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            enquiry: formData.enquiry,
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', enquiry: '' });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', response.status, errorData);
        console.error('Full error details:', JSON.stringify(errorData, null, 2));
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl rounded-3xl border border-accent/20" />

              {/* Gold accent glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/30 via-transparent to-accent/10 rounded-3xl blur-2xl opacity-50" />

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Close Button - Sticky for easy access */}
                <div className="sticky top-0 z-20 flex justify-end pointer-events-none w-full pb-2 -mt-2 sm:-mt-4">
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-background/50 hover:bg-accent/20 transition-colors pointer-events-auto backdrop-blur-sm -mr-2 sm:-mr-4"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground hover:text-accent" />
                  </motion.button>
                </div>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-accent mb-2">
                    Walk-In
                  </h2>
                  <p className="text-muted-foreground">Tell us about your visit</p>
                </motion.div>

                {/* Form */}
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">We've received your enquiry. Our team will contact you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="group"
                    >
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-accent" />
                          Full Name
                        </div>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all duration-300 group-hover:border-accent/40"
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="group"
                    >
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-accent" />
                          Email Address
                        </div>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all duration-300 group-hover:border-accent/40"
                      />
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="group"
                    >
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-accent" />
                          Phone Number
                        </div>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all duration-300 group-hover:border-accent/40"
                      />
                    </motion.div>

                    {/* Enquiry Field */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="group"
                    >
                      <label htmlFor="enquiry" className="block text-sm font-semibold text-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-accent" />
                          Your Enquiry
                        </div>
                      </label>
                      <textarea
                        id="enquiry"
                        name="enquiry"
                        value={formData.enquiry}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your visit, group size, preferences, etc."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all duration-300 group-hover:border-accent/40 resize-none"
                      />
                    </motion.div>

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm"
                      >
                        Failed to submit. Please try again.
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg"
                      >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WalkInPopup;
