import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation - character by character
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: 90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.02 },
          0.2
        );
      }

      // Subheadline animation
      tl.fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.6
      );

      // CTA animation
      tl.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        0.8
      );

      // Image animation
      tl.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotateY: 15 },
        { x: 0, opacity: 1, rotateY: 0, duration: 1.2 },
        0.4
      );

      // Decorative elements
      tl.fromTo(
        decorRef.current?.children || [],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
        0.8
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToAssessment = () => {
    const element = document.getElementById('assessment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split headline into characters
  const headline = "Reverse Insulin Resistance & Lose Fat Naturally";
  const headlineChars = headline.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-brand-cream/30 to-white pt-20"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-cream/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-cyan/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-pink/20 rounded-full blur-3xl" />
      </div>

      {/* Decorative shapes */}
      <div ref={decorRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-[10%] w-16 h-16 bg-brand-yellow/60 rounded-2xl rotate-12" />
        <div className="absolute bottom-40 left-[15%] w-12 h-12 bg-brand-pink/60 rounded-full" />
        <div className="absolute top-40 right-[45%] w-8 h-8 bg-brand-cyan/60 rounded-lg -rotate-12" />
      </div>

      <div className="w-full section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="flex flex-col gap-6 lg:gap-8 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span className="text-sm font-medium text-brand-blue">
                Certified Health Coach & Lifestyle Mentor
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text-dark leading-tight"
              style={{ perspective: '1000px' }}
            >
              {headlineChars}
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadRef}
              className="text-lg sm:text-xl text-brand-text-grey leading-relaxed max-w-xl"
            >
              Personalized diet & lifestyle guidance by Health Coach{' '}
              <span className="text-brand-blue font-semibold">Ranjeet Singh Rawat</span>
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={scrollToAssessment}
                className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-dark-blue transition-all hover:shadow-glow hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Check Your Health & Diet Plan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/+918847492236"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-brand-blue font-semibold rounded-full border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-cream transition-all flex items-center justify-center"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-4 pt-6 border-t border-brand-blue/10">
              <div>
                <div className="text-3xl font-heading font-bold text-brand-blue">500+</div>
                <div className="text-sm text-brand-text-grey">Lives Transformed</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-brand-blue">98%</div>
                <div className="text-sm text-brand-text-grey">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-brand-blue">5+</div>
                <div className="text-sm text-brand-text-grey">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* Main Image Container */}
              <div className="relative w-[300px] h-[380px] sm:w-[380px] sm:h-[480px] lg:w-[420px] lg:h-[530px] rounded-[2rem] overflow-hidden shadow-card">
                <img
                  src="/coach-photo.jpg"
                  alt="Ranjeet Singh Rawat - Health Coach"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 via-transparent to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-text-dark">Fat Loss</div>
                    <div className="text-xs text-brand-text-grey">Natural & Sustainable</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-card animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-cream rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🩺</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-text-dark">Insulin</div>
                    <div className="text-xs text-brand-text-grey">Resistance Reversal</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3 */}
              <div className="absolute left-1/4 -bottom-6 bg-white rounded-2xl p-4 shadow-card animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-pink/30 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🥗</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-text-dark">Diet Plan</div>
                    <div className="text-xs text-brand-text-grey">Personalized For You</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
