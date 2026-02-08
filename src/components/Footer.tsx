import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

// Helper function to get phone number based on Australia time
const getPhoneNumber = () => {
  const now = new Date();
  const australiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Perth' }));
  const switchBackTime = new Date('2026-02-09T06:00:00');

  if (australiaTime < switchBackTime) {
    return { display: '0451 382 958', tel: '0451382958' };
  }
  return { display: '+61 420-408-809', tel: '+61420408809' };
};

const Footer = () => {
  const phone = getPhoneNumber();
  return (
    <footer className="luxury-gradient border-t border-accent/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* About */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-luxury mb-4">
              HIGH SPIRITS
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Authentic Indian flavours crafted with passion, served in a premium fine-dining experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-accent hover:text-accent-foreground" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-accent hover:text-accent-foreground" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-accent hover:text-accent-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-playfair font-semibold text-accent mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Menu', 'Gallery', 'Events'].map((link) => {
                const path =
                  link === 'Home'
                    ? '/'
                    : `/${link.toLowerCase().replace(/\s+/g, '-')}`;

                return (
                  <li key={link}>
                    <Link
                      to={path}
                      className="text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>

          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-playfair font-semibold text-accent mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">

              {/* UPDATED ADDRESS */}
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">
                  1/57 Victoria Street Bunbury 6230
                </span>
              </li>

              {/* UPDATED PHONE */}
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`tel:${phone.tel}`} className="text-muted-foreground hover:text-accent transition-colors">
                  {phone.display}
                </a>
              </li>

              {/* UPDATED EMAIL */}
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-muted-foreground">
                  highspirits005@gmail.com
                </span>
              </li>

            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xl font-playfair font-semibold text-accent mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              Lunch: 11:30 AM - 2:30 PM (Mon-Sun)
              <br />
              <br />
              Dinner: 5:00 PM - 9:00 PM (Mon-Sun)
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} High Spirit. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
