import { motion } from 'framer-motion';
import { Sparkles, Leaf, Flame, Award } from 'lucide-react';

const MenuStory = () => {
  const stories = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Fusion Innovation",
      description: "Our menu is a carefully curated dialogue between two culinary giants. We marry the complex spice profiles of Punjab with the clean, produce-driven ethos of Australian fine dining. Each dish is reimagined to surprise and delight, honoring tradition while embracing contemporary technique."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Seasonal Philosophy",
      description: "We believe the best meals follow nature's calendar. Our menu evolves with the seasons, showcasing peak-season Australian produce alongside premium imported spices and heritage ingredients. This approach ensures every dish bursts with authentic flavor and optimal nutrition."
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Culinary Craftsmanship",
      description: "Behind every dish lies hours of preparation, ancient techniques, and modern innovation. From our 18-hour slow-cooked dal to our tandoor-roasted meats finished with Australian native herbs, each element is crafted with precision and passion by our brigade of talented chefs."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Signature Creations",
      description: "Our signature dishes have become legends in Melbourne's dining scene. The Truffle-Infused Dal Makhani, Tasmanian Lamb Rogan Josh, and Gold Leaf Kulfi represent the pinnacle of our fusion philosophy—dishes that couldn't exist anywhere else in the world."
    }
  ];

  return (
    <section className="pt-0 pb-10 bg-gradient-to-b from-secondary/20 via-background to-secondary/20 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <motion.p
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            The Art of Cuisine
          </motion.p>
          <h2 className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6">
            Our Menu Story
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every dish tells a story of heritage, innovation, and the pursuit of culinary perfection
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-2xl p-8 group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center text-accent-foreground mb-6 gold-glow"
              >
                {story.icon}
              </motion.div>

              <h3 className="text-2xl font-playfair font-bold text-foreground mb-4 group-hover:text-luxury transition-colors duration-300">
                {story.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {story.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Unique Dishes Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="glass-effect rounded-3xl p-12 elegant-shadow"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-playfair font-bold text-luxury mb-4">
              What Makes Our Dishes Unique
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The intersection of two culinary worlds, perfected through innovation and respect for tradition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Slow Cooking Mastery",
                detail: "18-24 hour preparations for depth of flavor unmatched in modern dining"
              },
              {
                number: "02",
                title: "Spice Alchemy",
                description: "Custom-blended masalas created in-house using 40+ individual spices"
              },
              {
                number: "03",
                title: "Plating as Art",
                description: "Each dish composed with the precision of a painter, beauty meeting flavor"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center overflow-visible"
              >
                <motion.div
                
                  className="text-6xl md:text-7xl font-playfair font-bold mb-4 leading-none overflow-visible text-luxury px-2"
                >
                  {item.number}
                </motion.div>
                <h4 className="text-xl font-playfair font-bold text-foreground mb-3">
                  {item.title}
                </h4>
                <p className="text-muted-foreground">
                  {item.detail || item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Discover the full story on your plate
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-10 py-4 rounded-md gold-glow transition-all duration-300"
            onClick={() => window.location.href = '/menu'}
          >
            Explore Our Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuStory;
