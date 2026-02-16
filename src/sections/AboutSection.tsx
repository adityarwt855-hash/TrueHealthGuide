import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Leaf, Heart, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animations
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Leaf,
      title: 'Real Lifestyle-Based Approach',
      description: 'No quick fixes, only sustainable habits that fit your daily life.',
    },
    {
      icon: Heart,
      title: 'No Crash Diets or Fake Supplements',
      description: '100% natural methods backed by science and real results.',
    },
    {
      icon: TrendingUp,
      title: 'Sustainable Fat Loss & Metabolic Health',
      description: 'Long-term solutions that keep you healthy for life.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-cream/30 -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="w-full section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-card">
              <img
                src="/coach-photo.jpg"
                alt="Ranjeet Singh Rawat - Certified Health Coach"
                className="w-full h-[400px] lg:h-[550px] object-cover object-top"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/30 via-transparent to-transparent" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-10 lg:-right-10 bg-white rounded-2xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-brand-blue">5+</div>
                <div className="text-sm text-brand-text-grey mt-1">Years of</div>
                <div className="text-sm font-semibold text-brand-text-dark">Experience</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-yellow/40 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 left-1/4 w-32 h-32 bg-brand-cyan/40 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex flex-col gap-6">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-full w-fit">
              <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium text-brand-blue">About The Expert</span>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text-dark leading-tight">
              Meet Your Health Coach
            </h2>

            {/* Description */}
            <p className="text-lg text-brand-text-grey leading-relaxed">
              <span className="font-semibold text-brand-text-dark">Ranjeet Singh Rawat</span> is a 
              certified health coach specializing in insulin resistance reversal and sustainable fat loss. 
              With a real lifestyle-based approach, he helps clients achieve their health goals without 
              crash diets or fake supplements.
            </p>

            <p className="text-brand-text-grey leading-relaxed">
              His mission is to empower individuals to take control of their health through personalized 
              diet plans, lifestyle modifications, and continuous support. Every transformation journey 
              is unique, and Ranjeet ensures that each client receives a plan tailored to their specific 
              needs and goals.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-brand-bg-grey/50 hover:bg-brand-cream/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text-dark flex items-center gap-2">
                      {feature.title}
                      <Check className="w-4 h-4 text-green-500" />
                    </h3>
                    <p className="text-sm text-brand-text-grey mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="#assessment"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-dark-blue transition-all hover:shadow-glow"
              >
                Start Your Journey
              </a>
              <a
                href="https://wa.me/+918847492236"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-brand-blue font-semibold rounded-full border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-cream transition-all"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
