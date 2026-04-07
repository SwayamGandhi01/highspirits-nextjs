import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Award, MapPin, ChefHat, Star } from 'lucide-react';

const TimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const timeline = [
    {
      year: "2015",
      icon: <MapPin className="w-6 h-6" />,
      title: "The Vision",
      description: "Born from a dream to bring authentic North Indian fine dining to Australia, High Spirit was conceived in the vibrant culinary scene of Melbourne.",
      color: "from-accent to-accent/70"
    },
    {
      year: "2017",
      icon: <ChefHat className="w-6 h-6" />,
      title: "Opening Night",
      description: "Our doors opened to Melbourne's elite, introducing a revolutionary fusion of traditional Punjabi flavors with modern Australian sensibilities.",
      color: "from-primary to-secondary"
    },
    {
      year: "2018",
      icon: <Star className="w-6 h-6" />,
      title: "Critical Acclaim",
      description: "Awarded 'Best New Restaurant' by Australian Gourmet Traveller and featured in International Culinary Magazine's Top 100.",
      color: "from-accent to-accent/70"
    },
    {
      year: "2020",
      icon: <Award className="w-6 h-6" />,
      title: "Chef's Recognition",
      description: "Executive Chef Amardeep Singh receives the prestigious 'Chef of the Year' award, cementing High Spirit's position as Australia's premier Indian fine dining destination.",
      color: "from-primary to-secondary"
    },
    {
      year: "2022",
      icon: <Star className="w-6 h-6" />,
      title: "Michelin Guide",
      description: "Featured in the Michelin Guide Australia with a coveted star, recognizing our commitment to excellence and innovation.",
      color: "from-accent to-accent/70"
    },
    {
      year: "2024",
      icon: <Award className="w-6 h-6" />,
      title: "Today",
      description: "Continuing to push boundaries with seasonal tasting menus, sustainable sourcing, and an unwavering dedication to the art of fine dining.",
      color: "from-primary to-secondary"
    }
  ];

  return (
    <section ref={containerRef} className="py-10 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute right-0 top-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute left-0 bottom-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-24"
        >
          <motion.p
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Our Journey
          </motion.p>
         <h2
  className="
    font-playfair font-bold text-luxury mb-6 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2.2rem,6vw,4.8rem)]
  "
>
  A Legacy of Excellence
</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From humble beginnings to Australia's most celebrated Indian fine dining destination
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-primary to-accent hidden md:block" />

          <div className="space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 glass-effect rounded-2xl p-8 elegant-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-accent-foreground gold-glow`}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-4xl font-playfair font-bold text-accent">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="hidden md:block w-6 h-6 bg-accent rounded-full gold-glow border-4 border-background relative z-10"
                />

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
