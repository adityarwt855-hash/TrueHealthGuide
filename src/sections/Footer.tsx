import { Heart, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Health Assessment', href: '#assessment' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Insulin Resistance Reversal',
    'Fat Loss Coaching',
    'Diet Planning',
    'Lifestyle Coaching',
    'Personal Consultation',
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-text-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-light-blue rounded-full blur-3xl" />
      </div>

      <div className="w-full section-padding relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl">
                  TrueHealthGuide
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Transforming lives through personalized diet and lifestyle coaching. 
                Your journey to better health starts here.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/+918847492236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a
                  href="tel:+918847492236"
                  className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
                <a
                  href="mailto:ranjeetrawat303@gmail.com"
                  className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service, i) => (
                  <li key={i}>
                    <span className="text-gray-400 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+918847492236"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm">+91 88474 92236</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ranjeetrawat303@gmail.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm">ranjeetrawat303@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/+918847492236"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-sm">WhatsApp Chat</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-brand-blue mt-0.5" />
                  <span className="text-sm">Available for Online Consultation Across India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              {currentYear} TrueHealthGuide. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{' '}
              <span className="text-white">Ranjeet Singh Rawat</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
