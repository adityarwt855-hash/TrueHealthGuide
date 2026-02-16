import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Assessment', href: '#assessment' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className={`font-heading font-bold text-xl transition-colors ${
                isScrolled ? 'text-brand-text-dark' : 'text-brand-text-dark'
              }`}>
                TrueHealthGuide
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium transition-all hover:text-brand-blue relative group ${
                    isScrolled ? 'text-brand-text-grey' : 'text-brand-text-grey'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#assessment"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#assessment');
                }}
                className="px-6 py-2.5 bg-brand-blue text-white text-sm font-semibold rounded-full hover:bg-brand-dark-blue transition-all hover:shadow-glow hover:-translate-y-0.5"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-brand-cream transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-brand-text-dark" />
              ) : (
                <Menu className="w-6 h-6 text-brand-text-dark" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-card p-6 transition-all duration-500 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-lg font-medium text-brand-text-dark py-2 px-4 rounded-xl hover:bg-brand-cream transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#assessment"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#assessment');
              }}
              className="mt-2 px-6 py-3 bg-brand-blue text-white text-center font-semibold rounded-full hover:bg-brand-dark-blue transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
