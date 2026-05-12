import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Terms = () => {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Reservation Policy
                </h2>
                <p className="mb-4">
                  By making a reservation at High Spirit, you agree to the following terms:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reservations are confirmed upon receipt of confirmation email</li>
                  <li>A valid credit card may be required to secure bookings for large parties</li>
                  <li>Please arrive within 15 minutes of your reservation time</li>
                  <li>Tables are held for 15 minutes past reservation time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Cancellation Policy
                </h2>
                <p className="mb-4">
                  We understand that plans change. Please note:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cancellations must be made at least 24 hours in advance</li>
                  <li>No-shows or late cancellations may incur a fee</li>
                  <li>For parties of 8 or more, 48 hours notice is required</li>
                  <li>Cancellation fees apply to special events and private bookings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Dining Guidelines
                </h2>
                <p className="mb-4">
                  To ensure an exceptional experience for all guests:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Smart casual dress code is encouraged</li>
                  <li>Children are welcome; high chairs available upon request</li>
                  <li>Please inform us of any dietary restrictions when booking</li>
                  <li>We accommodate special occasions with advance notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Payment Terms
                </h2>
                <p>
                  We accept all major credit cards, debit cards, and cash. Gratuity is not included in menu prices and is at your discretion. For large parties and events, payment terms will be discussed during booking.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Liability
                </h2>
                <p>
                  While we take every care with food preparation and service, High Spirit cannot be held liable for allergic reactions or dietary issues not communicated to our staff. Please inform us of any allergies or dietary restrictions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Changes to Terms
                </h2>
                <p>
                  High Spirit reserves the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Contact
                </h2>
                <p>
                  For questions about these terms, please contact:
                  <br />
                  Email: info@highspirit.com.au
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

export default Terms;