import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Button pulse animation
      gsap.to(buttonRef.current, {
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    '1-on-1 personal coaching sessions',
    'Weekly progress tracking & adjustments',
    'Direct access to Ranjeet Sir',
    'Customized meal plans',
    '24/7 WhatsApp support',
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-[#25D366]/10 via-[#128C7E]/5 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#128C7E]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-3xl" />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325D366' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full section-padding relative z-10">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="text-sm font-medium text-brand-text-dark">Personal Coaching Available</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text-dark mb-6">
            Want Personal Coaching <br className="hidden sm:block" />
            <span className="text-[#25D366]">& Faster Results?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-brand-text-grey max-w-2xl mx-auto mb-8">
            Get 1-on-1 guidance from Ranjeet Singh Rawat. Personal coaching includes 
            customized plans, weekly check-ins, and direct WhatsApp support to accelerate 
            your health transformation journey.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
              >
                <Check className="w-4 h-4 text-[#25D366]" />
                <span className="text-sm text-brand-text-dark">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            ref={buttonRef}
            href="https://wa.me/+918847492236"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white font-semibold text-lg rounded-full hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp with Ranjeet Sir
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Contact Info */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-brand-text-grey">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm">Usually replies within 1 hour</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <div className="text-sm">
              Or call: <a href="tel:+918847492236" className="text-brand-blue hover:underline font-medium">+91 88474 92236</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
