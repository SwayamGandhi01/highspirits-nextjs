import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VideoBackground from "./VideoBackground";

/* IMAGES FOR GALLERY */
import restaurantAmbience from "@/assets/Image.jpg";
import img2 from "@/assets/Image2.jpg";
import img3 from "@/assets/Image3.jpg";

const AmbienceTour = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
        
  const galleryImages = [restaurantAmbience, img2, img3];

  // const spaces = [
  //   {
  //     title: "Main Dining Hall",
  //     description:
  //       "An opulent 120-seat space featuring soaring ceilings, crystal chandeliers, and floor-to-ceiling windows overlooking Melbourne's skyline.",
  //     capacity: "120 guests",
  //   },
  //   {
  //     title: "Private Wine Room",
  //     description:
  //       "Intimate 16-seat glass-enclosed room surrounded by our 500+ bottle collection, perfect for exclusive gatherings.",
  //     capacity: "16 guests",
  //   },
  //   {
  //     title: "Chef's Table",
  //     description:
  //       "An exclusive 8-seat counter offering front-row views of our kitchen brigade at work, with personalized culinary commentary.",
  //     capacity: "8 guests",
  //   },
  //   {
  //     title: "Terrace Lounge",
  //     description:
  //       "Sophisticated outdoor space with lush greenery, ambient lighting, and panoramic city views—ideal for pre-dinner cocktails.",
  //     capacity: "40 guests",
  //   },
  // ];

  return (
    <section ref={containerRef} className="py-0 relative overflow-hidden bg-[#E7EBDD]">
      <VideoBackground overlayOpacity={0.5} />

      <div className="container mx-auto px-4 relative z-10">

        {/* ==== GALLERY SECTION (IMPROVED) ==== */}
        <motion.div
          style={{ y, scale }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto mb-28"
        >
          {/* CENTERED HEADING */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-luxury">
              Our Gallery
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the magic of Maison Gourmet through our gallery! Explore how every detail is designed to make your experience truly unique.
            </p>
          </div>

          {/* IMAGE GRID WITH ANIMATION */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
          >
            {/* LEFT IMAGE */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 80 },
                show: { opacity: 1, y: 0 },
              }}
              className="w-full h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-md"
            >
              <img
                src={galleryImages[0]}
                alt="Gallery Left"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* CENTER BIG IMAGE */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              className="w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={galleryImages[1]}
                alt="Gallery Center"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 80 },
                show: { opacity: 1, y: 0 },
              }}
              className="w-full h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-md"
            >
              <img
                src={galleryImages[2]}
                alt="Gallery Right"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        {/* ==== GALLERY END ==== */}

        {/* ==== SPACES GRID (unchanged) ==== */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-xl p-6 group cursor-pointer backdrop-blur-md bg-white/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-playfair font-bold text-accent-foreground">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-playfair font-bold text-luxury mb-3">
                {space.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {space.description}
              </p>

              <div className="pt-4 border-t border-accent/20">
                <span className="text-xs text-accent font-semibold tracking-wider uppercase">
                  {space.capacity}
                </span>
              </div>
            </motion.div>
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default AmbienceTour;
