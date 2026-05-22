import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, Sparkles, Target, Calendar, MapPin, Trophy, Users } from 'lucide-react';
const restaurantAmbience = '/images/restaurant-ambience.jpg';
const chefPortrait = '/images/ishpreet-bedi.jpg';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About High Spirits | Indian Buffet & Dining in Bunbury';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about High Spirits, a Bunbury Indian dining destination known for its curated buffet, refined flavours and welcoming hospitality.');
    }
  }, []);

  const values = [
    { icon: Heart, title: 'Passion', description: 'Every dish is crafted with love and dedication to authentic flavors' },
    { icon: Sparkles, title: 'Excellence', description: 'We pursue perfection in every aspect of the dining experience' },
    { icon: Award, title: 'Quality', description: 'Only the finest ingredients meet our exacting standards' },
    { icon: Target, title: 'Innovation', description: 'Tradition meets modern culinary artistry in every creation' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <Image src={restaurantAmbience} alt="About High Spirit" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            About Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-playfair font-bold text-luxury mb-4 text-center whitespace-normal break-words leading-tight text-[clamp(2.25rem,6vw,5.5rem)]"
          >
            High Spirits
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Where Tradition Meets Luxury in Every Bite
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At High Spirits, we bring the soul of India to the heart of Bunbury, WA, crafting an experience that goes far beyond a meal. As a refined restaurant & bar, our vision is rooted in authenticity, honouring time-loved Indian recipes while presenting them with modern elegance and thoughtful detail.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We see food as an art form and a celebration of culture, connection, and life’s finest moments. Every dish carries a story of heritage, passion, and uncompromising quality, designed to be savoured slowly and remembered fondly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 luxury-gradient">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">Our Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">Core Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="glass-effect rounded-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-accent mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Origin */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">The Team</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6">Passionate Professionals</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">Our team of expert chefs, sommeliers, and hospitality professionals work in perfect harmony to create an unforgettable experience.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6">From Punjab to Australia</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">Our business partner, Ishpreet Bedi, grew up in the heart of Punjab, where hospitality is a way of life.</p>
              <p className="text-lg text-muted-foreground leading-relaxed">With a refined vision shaped by hospitality experience across India and Australia, Ishpreet leads the brand with a focus on operational excellence and cultural authenticity.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden rounded-lg elegant-shadow">
                  <Image 
                    src={chefPortrait} 
                    alt="Chef Ishpreet Bedi" 
                    width={480} 
                    height={640} 
                    className="w-full h-auto object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                </div>
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline & Awards */}
      <section className="py-24 luxury-gradient">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">Milestones & Achievements</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { year: '2003', title: 'The Beginning', description: 'High Spirit was founded with a vision to bring authentic Indian luxury dining to Australia' },
              { year: '2008', title: 'First Award', description: 'Recognized as Best Indian Restaurant in Sydney' },
              { year: '2015', title: 'Expansion', description: 'Opened our second location and introduced our signature tasting menu' },
              { year: '2020', title: 'Global Recognition', description: "Featured in the World's 50 Best Restaurants list for Indian cuisine" },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative">
                <div className="glass-effect rounded-lg p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-playfair font-bold text-accent mb-2">{item.year}</h3>
                      <h4 className="text-xl font-semibold text-foreground mb-3">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">Recognition</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">Awards & Accolades</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Trophy, title: '15+ Culinary Awards', description: 'Recognition from prestigious organizations' },
              { icon: MapPin, title: 'Top 3 in Sydney', description: 'Consistently ranked among the best' },
              { icon: Users, title: '50,000+ Happy Guests', description: 'Creating memories since 2003' },
            ].map((award, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }} className="glass-effect rounded-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <award.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-accent mb-3">{award.title}</h3>
                <p className="text-muted-foreground">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
