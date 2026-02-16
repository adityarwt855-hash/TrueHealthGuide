import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Activity, 
  Flame, 
  Scale, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import type { HealthReport, HealthData } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface HealthReportSectionProps {
  report: HealthReport;
  data: HealthData;
}

const HealthReportSection = ({ report }: HealthReportSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState({
    bmi: 0,
    calories: 0,
    idealMin: 0,
    idealMax: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    // Animate numbers counting up
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setAnimatedValues({
        bmi: parseFloat((report.bmi * easeProgress).toFixed(1)),
        calories: Math.round(report.dailyCalories * easeProgress),
        idealMin: parseFloat((report.idealWeightMin * easeProgress).toFixed(1)),
        idealMax: parseFloat((report.idealWeightMax * easeProgress).toFixed(1)),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          bmi: report.bmi,
          calories: report.dailyCalories,
          idealMin: report.idealWeightMin,
          idealMax: report.idealWeightMax,
        });
      }
    }, interval);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, [report]);

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-yellow-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-orange-500';
    return 'text-red-500';
  };

  const getBMIBgColor = (bmi: number) => {
    if (bmi < 18.5) return 'bg-yellow-50';
    if (bmi < 25) return 'bg-green-50';
    if (bmi < 30) return 'bg-orange-50';
    return 'bg-red-50';
  };

  const getRiskIcon = (risk: string) => {
    if (risk.includes('High')) return <AlertTriangle className="w-6 h-6 text-red-500" />;
    if (risk.includes('Moderate')) return <TrendingUp className="w-6 h-6 text-orange-500" />;
    return <TrendingDown className="w-6 h-6 text-green-500" />;
  };

  const getRiskColor = (risk: string) => {
    if (risk.includes('High')) return 'text-red-600 bg-red-50 border-red-200';
    if (risk.includes('Moderate')) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  return (
    <section
      id="health-report"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-cream/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <Activity className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Assessment Complete</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text-dark mb-4">
            Your Personalized Health Report
          </h2>
          <p className="text-lg text-brand-text-grey">
            Based on your details, here is your comprehensive health analysis. 
            Review your metrics and scroll down to see your customized plan.
          </p>
        </div>

        {/* Report Cards Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {/* BMI Card */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className={`w-14 h-14 ${getBMIBgColor(report.bmi)} rounded-xl flex items-center justify-center mb-4`}>
              <Scale className={`w-7 h-7 ${getBMIColor(report.bmi)}`} />
            </div>
            <h3 className="text-sm font-medium text-brand-text-grey mb-1">Body Mass Index (BMI)</h3>
            <div className={`text-4xl font-heading font-bold ${getBMIColor(report.bmi)} mb-2`}>
              {animatedValues.bmi}
            </div>
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getBMIBgColor(report.bmi)} ${getBMIColor(report.bmi)}`}>
              {report.bmiCategory}
            </div>
            <p className="text-xs text-brand-text-grey mt-3">
              BMI = Weight(kg) / Height²(m²)
            </p>
          </div>

          {/* Daily Calories Card */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <Flame className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-sm font-medium text-brand-text-grey mb-1">Daily Calorie Need</h3>
            <div className="text-4xl font-heading font-bold text-brand-text-dark mb-2">
              {animatedValues.calories.toLocaleString()}
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-600">
              kcal/day
            </div>
            <p className="text-xs text-brand-text-grey mt-3">
              Based on your activity level
            </p>
          </div>

          {/* Ideal Weight Card */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-brand-cream rounded-xl flex items-center justify-center mb-4">
              <Minus className="w-7 h-7 text-brand-blue" />
            </div>
            <h3 className="text-sm font-medium text-brand-text-grey mb-1">Ideal Weight Range</h3>
            <div className="text-4xl font-heading font-bold text-brand-blue mb-2">
              {animatedValues.idealMin}-{animatedValues.idealMax}
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-brand-cream text-brand-blue">
              kg
            </div>
            <p className="text-xs text-brand-text-grey mt-3">
              For your height & age
            </p>
          </div>

          {/* Metabolism Risk Card */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${getRiskColor(report.metabolismRisk).split(' ')[1]}`}>
              {getRiskIcon(report.metabolismRisk)}
            </div>
            <h3 className="text-sm font-medium text-brand-text-grey mb-1">Metabolic Health</h3>
            <div className={`text-lg font-heading font-bold mb-2 ${getRiskColor(report.metabolismRisk).split(' ')[0]}`}>
              {report.metabolismRisk}
            </div>
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(report.metabolismRisk)}`}>
              Based on health profile
            </div>
            <p className="text-xs text-brand-text-grey mt-3">
              Insulin resistance indicator
            </p>
          </div>
        </div>

        {/* Health Insights */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-6 lg:p-8 border border-brand-blue/10">
            <h3 className="font-heading text-xl font-semibold text-brand-text-dark mb-4">
              Understanding Your Results
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-brand-text-dark mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-blue" />
                  What is BMI?
                </h4>
                <p className="text-sm text-brand-text-grey leading-relaxed">
                  Body Mass Index (BMI) is a measure of body fat based on your weight in relation to your height. 
                  It helps determine if you're at a healthy weight for your height.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-brand-text-dark mb-2 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-brand-blue" />
                  Daily Calorie Need
                </h4>
                <p className="text-sm text-brand-text-grey leading-relaxed">
                  This is the estimated number of calories your body needs daily to maintain your current weight 
                  based on your age, gender, height, weight, and activity level.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-brand-text-dark mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-blue" />
                  Ideal Weight Range
                </h4>
                <p className="text-sm text-brand-text-grey leading-relaxed">
                  This range represents a healthy weight for your height according to WHO standards 
                  (BMI 18.5-24.9). Staying within this range reduces health risks.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-brand-text-dark mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-brand-blue" />
                  Metabolic Health
                </h4>
                <p className="text-sm text-brand-text-grey leading-relaxed">
                  This assesses your risk for metabolic issues like insulin resistance. 
                  Conditions like diabetes and thyroid issues can affect your metabolism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthReportSection;
