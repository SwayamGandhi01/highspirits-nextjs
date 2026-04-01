import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapBox from '@/components/MapBox';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

// Helper function to get phone number based on Australia time
const getPhoneNumber = () => {
  // Get current time in Australia/Perth timezone (AWST - Western Australia where Bunbury is located)
  const now = new Date();
  const australiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Perth' }));

  // Temporary number valid until Feb 9, 2026, 6:00 AM Australia/Perth time
  const switchBackTime = new Date('2026-02-09T06:00:00');

  if (australiaTime < switchBackTime) {
    return '+61 0451 382 958'; // Tonight's temporary number
  }
  return '+61 420 408 809'; // Original number
};

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us | Indian Buffet Restaurant in Bunbury';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact High Spirits in Bunbury to book a table, enquire about events, or learn more about our Indian buffet dining experience.');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare API payload - Strapi v4 format
      const payload = {
        data: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || '',
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }
      };

      const response = await fetch(
        'https://calm-actor-864a39d720.strapiapp.com/api/contact-forms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData?.message || 'Failed to send message');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      toast.success("Message sent! We'll respond within 24 hours.");
    } catch (err) {
      console.error('Error submitting contact form:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['1/57 Victoria Street', 'Bunbury 6230', 'Australia'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [getPhoneNumber()],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['highspirits005@gmail.com'],
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: [
        '5:00 PM - 9:00 PM (Mon-Sun)'
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20 luxury-gradient">
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            We're here to answer your questions and make your experience perfect
          </motion.p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury mb-6">
                  Visit Us Today
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether you have questions about our menu, want to make a reservation, or simply wish to share feedback, we'd love to hear from you.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-effect rounded-lg p-8">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Phone 
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 luxury-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
              Find Us
            </h2>
            <p className="text-muted-foreground text-lg">
              Located in the heart of Bunbury's premium dining district
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto rounded-lg overflow-hidden elegant-shadow"
          >
            <div className="w-full h-[450px]">
              <MapBox />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;