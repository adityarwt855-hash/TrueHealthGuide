import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Calendar, 
  Clock, 
  Droplets, 
  Dumbbell, 
  Moon, 
  Sun, 
  Utensils,
  ChevronDown,
  Check,
  Sparkles
} from 'lucide-react';
import type { HealthReport, HealthData } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface PlanSectionProps {
  report: HealthReport;
  data: HealthData;
}

const PlanSection = ({ report, data }: PlanSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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

  // Calculate calorie target for weight loss
  const calorieTarget = Math.round(report.dailyCalories * 0.85); // 15% deficit for weight loss

  // Generate meal plan based on food preference
  const getMealPlan = () => {
    if (data.foodPreference === 'vegetarian') {
      return {
        breakfast: [
          'Oats with milk and fruits',
          'Poha with vegetables',
          'Idli with sambar',
          'Moong dal chilla',
          'Sprouts salad with lemon',
        ],
        lunch: [
          '2 chapati + dal + vegetable curry + salad',
          'Brown rice + rajma + cucumber raita',
          'Multigrain roti + paneer bhurji + vegetables',
          'Quinoa pulao + mixed vegetable curry',
          '2 chapati + chole + beetroot salad',
        ],
        dinner: [
          'Vegetable soup + grilled paneer',
          'Dal khichdi with vegetables',
          'Grilled vegetables + tofu',
          'Lentil soup + 1 chapati',
          'Stir-fried vegetables + brown rice',
        ],
        snacks: [
          'Fruits (apple/orange/papaya)',
          'Roasted makhana (handful)',
          'Greek yogurt with nuts',
          'Cucumber/carrot sticks',
          'Green tea + 4 almonds',
        ],
      };
    } else {
      return {
        breakfast: [
          'Egg whites omelette with vegetables',
          'Chicken sandwich (whole wheat)',
          'Oats with milk and boiled egg',
          'Sprouts + boiled eggs',
          'Paneer bhurji with multigrain toast',
        ],
        lunch: [
          '2 chapati + grilled chicken + salad',
          'Brown rice + fish curry + vegetables',
          'Chicken breast + quinoa + vegetables',
          'Egg curry + 2 chapati + salad',
          'Grilled fish + mixed vegetables',
        ],
        dinner: [
          'Grilled chicken breast + soup',
          'Fish tikka + green salad',
          'Egg white bhurji + 1 chapati',
          'Chicken soup + steamed vegetables',
          'Grilled paneer + vegetable stir-fry',
        ],
        snacks: [
          'Boiled eggs (2 whites)',
          'Grilled chicken pieces (100g)',
          'Greek yogurt with nuts',
          'Cucumber/carrot sticks',
          'Green tea + 4 almonds',
        ],
      };
    }
  };

  const mealPlan = getMealPlan();

  const weeks = [
    {
      week: 1,
      title: 'Foundation Week',
      focus: 'Building healthy habits and routine',
      tips: [
        'Focus on meal timings - eat at the same time daily',
        'Drink 3-4 liters of water throughout the day',
        'Start with 20-minute walks after meals',
        'Avoid processed foods and sugary drinks',
        'Sleep 7-8 hours every night',
      ],
    },
    {
      week: 2,
      title: 'Progress Week',
      focus: 'Increasing activity and consistency',
      tips: [
        'Increase walk duration to 30 minutes',
        'Add light stretching or yoga (15 mins)',
        'Monitor portion sizes carefully',
        'Include more vegetables in every meal',
        'Practice mindful eating - chew slowly',
      ],
    },
    {
      week: 3,
      title: 'Intensification Week',
      focus: 'Boosting metabolism and strength',
      tips: [
        'Add bodyweight exercises (squats, push-ups)',
        'Try intermittent fasting (12:12 window)',
        'Include protein in every meal',
        'Reduce salt intake for better BP',
        'Track your weight twice a week',
      ],
    },
    {
      week: 4,
      title: 'Sustainability Week',
      focus: 'Making it a lifestyle',
      tips: [
        'Continue all habits from previous weeks',
        'Find an exercise buddy for motivation',
        'Plan meals in advance for the week',
        'Celebrate small victories',
        'Set goals for the next month',
      ],
    },
  ];

  return (
    <section
      id="plan"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-brand-cream/30 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-20 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-brand-pink/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-blue">Your Customized Plan</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text-dark mb-4">
            Your 1-Month Personalized Plan
          </h2>
          <p className="text-lg text-brand-text-grey">
            Based on your assessment, here is your complete diet and lifestyle plan 
            designed specifically for your goals and preferences.
          </p>
        </div>

        <div ref={contentRef} className="max-w-5xl mx-auto space-y-8">
          {/* Daily Calorie Target Card */}
          <div className="bg-gradient-to-r from-brand-blue to-brand-light-blue rounded-2xl p-6 lg:p-8 text-white shadow-glow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white/80">Daily Calorie Target</h3>
                  <p className="text-4xl font-heading font-bold">{calorieTarget.toLocaleString()} kcal</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-white/80 text-sm">For sustainable weight loss</p>
                <p className="text-white/60 text-xs mt-1">15% deficit from maintenance</p>
              </div>
            </div>
          </div>

          {/* Sample Diet Plan */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-card border border-gray-100">
            <h3 className="font-heading text-xl font-semibold text-brand-text-dark mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-blue" />
              Sample Weekly Diet Plan ({data.foodPreference === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'})
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Breakfast */}
              <div className="bg-brand-cream/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sun className="w-4 h-4 text-orange-500" />
                  <h4 className="font-semibold text-brand-text-dark">Breakfast (8-9 AM)</h4>
                </div>
                <ul className="space-y-2">
                  {mealPlan.breakfast.map((item, i) => (
                    <li key={i} className="text-sm text-brand-text-grey flex items-start gap-2">
                      <Check className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lunch */}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold text-brand-text-dark">Lunch (12-2 PM)</h4>
                </div>
                <ul className="space-y-2">
                  {mealPlan.lunch.map((item, i) => (
                    <li key={i} className="text-sm text-brand-text-grey flex items-start gap-2">
                      <Check className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dinner */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-brand-text-dark">Dinner (7-8 PM)</h4>
                </div>
                <ul className="space-y-2">
                  {mealPlan.dinner.map((item, i) => (
                    <li key={i} className="text-sm text-brand-text-grey flex items-start gap-2">
                      <Check className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Snacks */}
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="w-4 h-4 text-orange-600" />
                  <h4 className="font-semibold text-brand-text-dark">Snacks (11 AM / 4 PM)</h4>
                </div>
                <ul className="space-y-2">
                  {mealPlan.snacks.map((item, i) => (
                    <li key={i} className="text-sm text-brand-text-grey flex items-start gap-2">
                      <Check className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Water & Activity */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Water Intake */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text-dark">Water Intake</h3>
                  <p className="text-sm text-brand-text-grey">Stay hydrated throughout the day</p>
                </div>
              </div>
              <div className="text-3xl font-heading font-bold text-cyan-600 mb-2">3-4 Liters</div>
              <ul className="space-y-2 text-sm text-brand-text-grey">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-500" />
                  500ml warm water after waking up
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-500" />
                  1 glass 30 mins before each meal
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-500" />
                  Avoid water during meals
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-500" />
                  Reduce intake after 7 PM
                </li>
              </ul>
            </div>

            {/* Weekly Activity Plan */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text-dark">Weekly Activity Plan</h3>
                  <p className="text-sm text-brand-text-grey">Based on your {data.activityLevel} activity level</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-brand-text-grey">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-brand-text-dark">Daily:</span> 30-min walk (morning/evening)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-brand-text-dark">Mon/Wed/Fri:</span> Light cardio (15 mins)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-brand-text-dark">Tue/Thu:</span> Bodyweight exercises
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-brand-text-dark">Weekend:</span> Yoga or stretching (30 mins)
                </li>
              </ul>
            </div>
          </div>

          {/* 4-Week Timeline */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-card border border-gray-100">
            <h3 className="font-heading text-xl font-semibold text-brand-text-dark mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-blue" />
              4-Week Progress Timeline
            </h3>

            <div className="space-y-4">
              {weeks.map((week) => (
                <div
                  key={week.week}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                    className="w-full flex items-center justify-between p-4 bg-brand-bg-grey/50 hover:bg-brand-cream/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                        {week.week}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-brand-text-dark">{week.title}</h4>
                        <p className="text-sm text-brand-text-grey">{week.focus}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-text-grey transition-transform ${
                        expandedWeek === week.week ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedWeek === week.week && (
                    <div className="p-4 bg-white">
                      <ul className="space-y-2">
                        {week.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-brand-text-grey">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Tips */}
          <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-6 lg:p-8 border border-brand-blue/10">
            <h3 className="font-heading text-xl font-semibold text-brand-text-dark mb-6">
              Essential Lifestyle Tips
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Moon, title: 'Sleep Well', desc: '7-8 hours of quality sleep every night' },
                { icon: Sun, title: 'Morning Sunlight', desc: '15-20 mins of sunlight after waking up' },
                { icon: Droplets, title: 'Stay Hydrated', desc: '3-4 liters of water daily' },
                { icon: Dumbbell, title: 'Move Daily', desc: 'At least 30 mins of physical activity' },
                { icon: Utensils, title: 'Eat Mindfully', desc: 'Chew slowly, avoid distractions' },
                { icon: Clock, title: 'Fix Timings', desc: 'Eat at the same time every day' },
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-brand-cream rounded-lg flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-text-dark text-sm">{tip.title}</h4>
                    <p className="text-xs text-brand-text-grey mt-1">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
