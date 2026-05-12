import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-20 pb-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-luxury mb-8">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Information We Collect
                </h2>
                <p className="mb-4">
                  At High Spirit, we collect information that you provide directly to us when making reservations, contacting us, or using our services. This may include your name, email address, phone number, and dining preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and confirm your reservations</li>
                  <li>Communicate with you about your bookings</li>
                  <li>Send you promotional materials (with your consent)</li>
                  <li>Improve our services and customer experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Your Rights
                </h2>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  Email: privacy@highspirit.com.au
                  <br />
                  Phone: +61 2 3456 7890
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;