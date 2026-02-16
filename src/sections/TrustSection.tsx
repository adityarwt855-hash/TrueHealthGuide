import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Target, TrendingUp, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      icon: Heart,
      title: 'Health is Long-Term',
      description: 'There are no shortcuts to good health. Sustainable changes today lead to a healthier tomorrow. Focus on progress, not perfection.',
      color: 'from-rose-50 to-pink-50',
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-100',
    },
    {
      icon: Target,
      title: 'Discipline Beats Motivation',
      description: 'Motivation comes and goes, but discipline is what keeps you going. Build habits that stick, even when you don\'t feel like it.',
      color: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-100',
    },
    {
      icon: TrendingUp,
      title: 'Lifestyle Change = Disease Reversal',
      description: 'The right diet and lifestyle can reverse insulin resistance, manage diabetes, and transform your metabolic health naturally.',
      color: 'from-green-50 to-emerald-50',
      iconColor: 'text-green-500',
      iconBg: 'bg-green-100',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      result: 'Lost 12 kg in 3 months',
      quote: 'Ranjeet Sir changed my life. His approach is practical and easy to follow. No crash diets, just real food and real results!',
    },
    {
      name: 'Amit Patel',
      location: 'Mumbai',
      result: 'Reversed pre-diabetes',
      quote: 'My HbA1c dropped from 6.8 to 5.6 in just 4 months. The personalized plan made all the difference. Highly recommended!',
    },
    {
      name: 'Sneha Gupta',
      location: 'Bangalore',
      result: 'Lost 8 kg, gained energy',
      quote: 'I feel more energetic and confident than ever. The WhatsApp support kept me motivated throughout my journey.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-cream/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-cyan/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full section-padding relative z-10">
        {/* Principles Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-full mb-6">
            <Heart className="w-4 h-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-blue">Our Core Philosophy</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text-dark mb-4">
            The Foundation of <span className="text-brand-blue">True Health</span>
          </h2>
          <p className="text-lg text-brand-text-grey">
            These principles guide every transformation journey at TrueHealthGuide.
          </p>
        </div>

        {/* Principle Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-24"
        >
          {principles.map((principle, i) => (
            <div
              key={i}
              className={`relative bg-gradient-to-br ${principle.color} rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-lg transition-all group`}
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200 group-hover:text-gray-300 transition-colors" />

              {/* Icon */}
              <div className={`w-14 h-14 ${principle.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                <principle.icon className={`w-7 h-7 ${principle.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-semibold text-brand-text-dark mb-3">
                {principle.title}
              </h3>
              <p className="text-brand-text-grey leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-dark mb-4">
              Success Stories
            </h3>
            <p className="text-brand-text-grey">
              Real people, real transformations, real results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-all"
              >
                {/* Result badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                  <TrendingUp className="w-3 h-3" />
                  {testimonial.result}
                </div>

                {/* Quote */}
                <p className="text-brand-text-grey leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <span className="text-brand-blue font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-text-dark text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-brand-text-grey">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-brand-blue to-brand-light-blue rounded-2xl p-6 lg:p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-heading font-bold">500+</div>
                <div className="text-white/80 text-sm mt-1">Lives Transformed</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-heading font-bold">98%</div>
                <div className="text-white/80 text-sm mt-1">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-heading font-bold">5000+</div>
                <div className="text-white/80 text-sm mt-1">Kgs Lost</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-heading font-bold">4.9★</div>
                <div className="text-white/80 text-sm mt-1">Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
