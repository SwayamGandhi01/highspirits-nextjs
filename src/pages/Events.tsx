import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Sparkles, Music, Utensils, PartyPopper } from 'lucide-react';
import { useWalkInPopup } from '@/context/WalkInPopupContext';
import restaurantAmbience from '@/assets/restaurant-ambience.jpg';

const Events = () => {
  const [eventTypes, setEventTypes] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const { openPopup } = useWalkInPopup();

  useEffect(() => {
    document.title = 'Private Events & Indian Buffet Dining | High Spirits';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Plan private events at High Spirits in Bunbury, offering Indian buffet dining, elegant ambience and carefully curated dining experiences.');
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/event-services?populate=*');
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        const items = (json?.data || []).map((it: any) => {
          const attr = it.attributes || it;
          return {
            id: it.id,
            title: attr.title || attr.name || '',
            description: attr.shortDescription || attr.description || attr.content || '',
            capacity: attr.capacity || attr.maxGuests || undefined,
            publishedAt: attr.publishedAt || undefined,
          };
        });

        if (mounted) setEventTypes(items);
      } catch (e) {
        console.warn('Failed to fetch event services', e);
        if (mounted) setEventTypes([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEvents();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={restaurantAmbience}
            alt="Events at High Spirit"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Special Occasions
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
  Events & Catering
</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            Create unforgettable memories with our bespoke event services
          </motion.p>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
              Event Services
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              We Host Every Celebration
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we make every event extraordinary
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {loading ? (
              <div className="col-span-2 text-center py-12">Loading event services…</div>
            ) : eventTypes.length === 0 ? (
              <div className="col-span-2 text-center py-12">No event services available.</div>
            ) : (
              eventTypes.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-lg p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <PartyPopper className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {event.description}
                </p>
                <p className="text-accent font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {event.capacity}
                </p>
              </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 luxury-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              What We Offer
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Utensils, title: 'Customized Menus', description: 'Tailored to your preferences and dietary needs' },
              { icon: Music, title: 'Entertainment Options', description: 'Live music, DJ, and cultural performances' },
              { icon: Calendar, title: 'Event Planning', description: 'Dedicated coordinator for seamless execution' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <feature.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Our Events CTA Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Decorative accent */}
            <div className="text-center mb-12">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-12 h-12 text-accent" />
              </motion.div>
            </div>

            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6 text-center">
              Experience Our Events
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center">
              Ready to celebrate something special? Whether it's a corporate gathering, intimate celebration, or grand occasion, High Spirits is your perfect venue. Walk in and discover why we're the preferred choice for unforgettable events.
            </p>

            {/* Event highlights grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-effect rounded-xl p-6 text-center border border-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                <Users className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Flexible Capacity</h3>
                <p className="text-sm text-muted-foreground">From intimate gatherings to grand celebrations</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-effect rounded-xl p-6 text-center border border-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                <Utensils className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Exquisite Cuisine</h3>
                <p className="text-sm text-muted-foreground">Authentic Punjabi & North Indian delicacies</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-effect rounded-xl p-6 text-center border border-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                <Music className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Premium Ambience</h3>
                <p className="text-sm text-muted-foreground">Luxury setting for your special moments</p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => openPopup()}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 gold-glow"
              >
                Walk-In Enquiry
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold text-lg px-8 py-6"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;