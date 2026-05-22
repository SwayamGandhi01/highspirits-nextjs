import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DishGrid from '@/components/DishGrid';
import Footer from '@/components/Footer';
import SignatureExperiences from '@/components/SignatureExperiences';
import TimelineSection from '@/components/TimelineSection';
import IngredientsShowcase from '@/components/IngredientsShowcase';
import AmbienceTour from '@/components/AmbienceTour';
import ChefPhilosophy from '@/components/ChefPhilosophy';
import MenuStory from '@/components/MenuStory';
import Carousel3D from '@/components/Carousel3D';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { ChefHat, CalendarDays, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const chefPortrait = '/images/ishpreet-bedi.jpg';
const restaurantAmbience = '/images/Image.jpg';
const heroDish1 = '/images/hero-dish-1.jpg';
const heroDish2 = '/images/hero-dish-2.jpg';
const heroDish3 = '/images/hero-dish-3.jpg';
const dalMakhani = '/images/dish-dal-makhani.jpg';
const palakPaneer = '/images/dish-palak-paneer.jpg';
const roganJosh = '/images/dish-rogan-josh.jpg';

const Index = () => {
  useEffect(() => {
    // SEO handled by next/head in the render method
  }, []);

  const statsRef = useRef(null);
  const chefRef = useRef(null);
  const ambienceRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const isChefInView = useInView(chefRef, { once: true });
  const isAmbienceInView = useInView(ambienceRef, { once: true });

  const stats = [
    { icon: ChefHat, value: '100%', label: 'Authentic Punjabi Recipes' },
    { icon: CalendarDays, value: '7 Days', label: 'Freshly Served' },
    { icon: ShieldCheck, value: 'Zero', label: 'Compromise' },
    { icon: Star, value: '5.0', label: 'Google Rating' },
  ];

  

  const [carouselItems, setCarouselItems] = useState<Array<{ image: string; title: string; description: string }>>([]);

  useEffect(() => {
    let mounted = true;
    const fetchSignature = async () => {
      try {
        const res = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/signature-creations?populate=*');
        if (!res.ok) throw new Error('Failed to fetch signature creations');
        const json = await res.json();
        const items = (json?.data || []).map((it: any) => {
          const img = it.image;
          const url = img?.formats?.medium?.url || img?.formats?.small?.url || img?.url || null;
          return {
            image: url,
            title: it.title || '',
            description: it.shortDescription || ''
          };
        }).filter((i: any) => i.image);

        if (mounted) setCarouselItems(items);
      } catch (e) {
        console.warn('Failed to load signature creations', e);
        if (mounted) setCarouselItems([]);
      }
    };

    fetchSignature();
    return () => { mounted = false; };
  }, []);
  const fallbackTestimonials = [
    {
      name: 'Frans Buissink',
      review: 'Some of the best Indian food to be had in Bunbury. Definitely worth checking out. Buffet of delicious selections at the moment — looking forward to the à la carte menu in the near future.',
      rating: 5,
      publishedAt: '2 days ago',
      price: '$20–40',
      waitTime: 'No wait',
    },
    {
      name: 'Gemma Ainsworth',
      review: 'Amazing food, five star service and the warmest welcome. Highly recommend the best authentic Indian in Bunbury.',
      rating: 5,
      publishedAt: '2 days ago',
      price: '$20–40',
      waitTime: 'No wait',
    },
    {
      name: 'Mohit Sharma',
      review: 'Incredible Indian food with bold, authentic flavours. Every dish is fresh, perfectly spiced, and full of character. Great atmosphere, friendly staff, and food that keeps you coming back. A true standout!',
      rating: 5,
      publishedAt: '3 days ago',
      price: '$80–100',
      waitTime: 'Up to 10 min',
    },
  ];

  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    let mounted = true;
    const fetchReviews = async () => {
      try {
        const res = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/guest-reviews');
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        const items = (json?.data || [])
          .map((it: any) => ({
            name: it.guestName || 'Guest',
            review: (it.reviewText || '').replace(/^"|"$/g, '').trim(),
            rating: it.rating ?? 5,
            publishedAt: it.publishedAt ? new Date(it.publishedAt).toLocaleDateString() : '',
            price: '',
            waitTime: ''
          }))
          .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));

        if (mounted && items.length) setTestimonials(items);
      } catch (e) {
        console.warn('Failed to fetch guest reviews', e);
      }
    };

    fetchReviews();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Premium Indian Buffet Restaurant in Bunbury | High Spirits</title>
        <meta name="description" content="High Spirits is a classy Indian restaurant in Bunbury, offering a curated Indian buffet with vegetarian and non-vegetarian meals in a premium setting." />
      </Head>
      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 sm:py-20 md:py-24 luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center h-full">
                  <div className="inline-flex items-center justify-center w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent mb-2 sm:mb-3">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground font-inter text-xs sm:text-sm md:text-base tracking-wide leading-snug">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DishGrid />
      
      {/* Signature Experiences */}
      <SignatureExperiences />
      
      {/* 3D Carousel Section */}
      <section className="py-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-6"
          >
            <motion.p
              className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Chef's Specials
            </motion.p>
           <h2
  className="
    font-playfair font-bold shimmer-text mb-6 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2.2rem,6vw,4.2rem)]
  "
>
  Signature Creations
</h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience our most celebrated dishes through an immersive 3D journey
            </p>
          </motion.div>
          
          {carouselItems.length > 0 && <Carousel3D items={carouselItems} />}
        </div>
      </section>
      
      {/* Menu Story */}
      <MenuStory />
      
      {/* Chef Philosophy */}
      <ChefPhilosophy />

      {/* Chef Section */}
      <section ref={chefRef} className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isChefInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden elegant-shadow">
                <Image
                  src={chefPortrait}
                  alt="Executive Chef Ishpreet Bedi"
                  width={480}
                  height={640}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isChefInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm text-center md:text-left">
                
              </p>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-6 text-center md:text-left">
                Meet Our Business Partner
              </h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed text-center md:text-left">
              In her role as a business partner, Ishpreet takes an active part in the operations every day and gets to know the customers personally, assuring that each and every visit is made pleasing, considerate, and unforgettable. Her presence, eye for detail, and genuine devotion to the art of making people's lives happier play an important part in creating the image of High Spirits as a classy restaurant and bar where one can enjoy the real taste of Indian fine dining in Bunbury, WA. Moreover, it helps the restaurant gain the fine dining standard in Australia through care, consistency, and warm-hearted hospitality.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed text-center md:text-left">
                In her role as a business partner, Ishpreet takes an active part in the operations every day and gets to know the customers personally, assuring that each and every visit is made pleasing, considerate, and unforgettable. 
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed text-center md:text-left">
                Her presence, eye for detail, and genuine devotion to the art of making people's lives happier play an important part in creating the image of High Spirits as a classy restaurant and bar where one can enjoy the real taste of Indian fine dining in Bunbury, WA. Moreover, it helps the restaurant gain the fine dining standard in Australia through care, consistency, and warm-hearted hospitality.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow"
                  >
                    Discover Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ambience Section */}
      <section ref={ambienceRef} className="py-10 relative overflow-hidden">
        <div className="absolute inset-0">
            <Image src={restaurantAmbience} alt="Restaurant Ambience" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isAmbienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-accent font-inter tracking-widest mb-4 uppercase text-sm">
              Luxurious Atmosphere
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-luxury mb-6">
              An Unforgettable Experience
            </h2>
            <p className="text-foreground text-lg mb-8 leading-relaxed">
              Step into a world of elegance where every detail is designed to enchant. From our handcrafted interiors to our attentive service, we create moments that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/gallery">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow"
                >
                  View Gallery
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Host an Event
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Ingredients Showcase */}
      <IngredientsShowcase />
      
      {/* Ambience Tour */}
      <AmbienceTour />

      {/* Testimonials Preview */}
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
              Guest Reviews
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              What Our Guests Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
              {
              testimonials.map((testimonial, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: index % 2 === 0 ? 20 : 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  className="glass-effect rounded-lg p-6 hover:scale-105 transform-gpu transition-transform duration-400 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">{testimonial.name.split(' ').map((n:any)=>n[0]).slice(0,2).join('')}</div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        {(((testimonial as any).title) || testimonial.publishedAt) && (
                          <p className="text-muted-foreground text-sm">{[(testimonial as any).title, testimonial.publishedAt].filter(Boolean).join(' · ')}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-1">
                        {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground italic mb-4 leading-relaxed flex-1">"{testimonial.review}"</p>

                  
                </motion.article>
              ))
            }
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;