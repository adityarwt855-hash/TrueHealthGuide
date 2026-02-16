import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Ruler, 
  Weight, 
  Target, 
  Activity, 
  Utensils,
  Stethoscope,
  Send,
  Check
} from 'lucide-react';
import type { HealthData } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface HealthFormSectionProps {
  onSubmit: (data: HealthData) => void;
}

const HealthFormSection = ({ onSubmit }: HealthFormSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<HealthData>({
    fullName: '',
    mobile: '',
    email: '',
    age: 30,
    gender: 'male',
    height: 170,
    currentWeight: 70,
    targetWeightLoss: 5,
    activityLevel: 'moderate',
    foodPreference: 'vegetarian',
    healthProblems: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof HealthData, string>>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { rotateX: 20, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof HealthData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    if (formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Height must be between 100cm and 250cm';
    }

    if (formData.currentWeight < 30 || formData.currentWeight > 200) {
      newErrors.currentWeight = 'Weight must be between 30kg and 200kg';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof HealthData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleHealthProblem = (problem: string) => {
    setFormData(prev => ({
      ...prev,
      healthProblems: prev.healthProblems.includes(problem)
        ? prev.healthProblems.filter(p => p !== problem)
        : [...prev.healthProblems, problem],
    }));
  };

  const healthProblems = ['Diabetes', 'BP', 'Thyroid', 'PCOS', 'None'];

  return (
    <section
      id="assessment"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-brand-cream/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-cyan/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-pink/20 rounded-full blur-3xl" />

      <div className="w-full section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-full mb-6">
            <Stethoscope className="w-4 h-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-blue">Free Health Assessment</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text-dark mb-4">
            Get Your Personalized Health Report
          </h2>
          <p className="text-lg text-brand-text-grey">
            Fill in your details below to receive a comprehensive health analysis and 
            a customized 1-month diet and lifestyle plan.
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-card p-6 sm:p-8 lg:p-12"
          style={{ perspective: '1000px' }}
        >
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Contact Details Section */}
            <div className="md:col-span-2">
              <h3 className="font-heading text-xl font-semibold text-brand-text-dark mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-brand-blue" />
                Contact Details
              </h3>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-grey" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-200'
                  } focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all`}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-grey" />
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.mobile ? 'border-red-500' : 'border-gray-200'
                  } focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all`}
                />
              </div>
              {errors.mobile && (
                <p className="text-sm text-red-500">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Email ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-grey" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Divider */}
            <div className="md:col-span-2 border-t border-gray-100 my-4" />

            {/* Health Details Section */}
            <div className="md:col-span-2">
              <h3 className="font-heading text-xl font-semibold text-brand-text-dark mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-blue" />
                Health & Body Details
              </h3>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Age (years)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-grey" />
                <input
                  type="number"
                  min={18}
                  max={100}
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.age ? 'border-red-500' : 'border-gray-200'
                  } focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all`}
                />
              </div>
              {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Gender
              </label>
              <div className="flex gap-4">
                {['male', 'female'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => handleInputChange('gender', gender)}
                    className={`flex-1 py-3 px-4 rounded-xl border capitalize transition-all ${
                      formData.gender === gender
                        ? 'border-brand-blue bg-brand-cream text-brand-blue'
                        : 'border-gray-200 text-brand-text-grey hover:border-brand-blue/50'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Height (cm)
              </label>
              <div className="relative">
                <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-grey" />
                <input
                  type="number"
                  min={100}
                  max={250}
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.height ? 'border-red-500' : 'border-gray-200'
                  } focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all`}
                />
              </div>
              {errors.height && <p className="text-sm text-red-500">{errors.height}</p>}
            </div>

            {/* Current Weight */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Current Weight (kg)
              </label>
              <div className="relative">
                <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-grey" />
                <input
                  type="number"
                  min={30}
                  max={200}
                  value={formData.currentWeight}
                  onChange={(e) => handleInputChange('currentWeight', parseInt(e.target.value) || 0)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.currentWeight ? 'border-red-500' : 'border-gray-200'
                  } focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all`}
                />
              </div>
              {errors.currentWeight && (
                <p className="text-sm text-red-500">{errors.currentWeight}</p>
              )}
            </div>

            {/* Target Weight Loss */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Target Weight Loss (kg)
              </label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-grey" />
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={formData.targetWeightLoss}
                  onChange={(e) => handleInputChange('targetWeightLoss', parseInt(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Activity Level
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all appearance-none bg-white"
              >
                <option value="low">Low (Sedentary)</option>
                <option value="moderate">Moderate (Light exercise)</option>
                <option value="active">Active (Regular exercise)</option>
              </select>
            </div>

            {/* Food Preference */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-text-dark">
                Food Preference
              </label>
              <div className="flex gap-4">
                {['vegetarian', 'non-vegetarian'].map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => handleInputChange('foodPreference', pref)}
                    className={`flex-1 py-3 px-4 rounded-xl border capitalize transition-all ${
                      formData.foodPreference === pref
                        ? 'border-brand-blue bg-brand-cream text-brand-blue'
                        : 'border-gray-200 text-brand-text-grey hover:border-brand-blue/50'
                    }`}
                  >
                    <Utensils className="w-4 h-4 inline mr-2" />
                    {pref.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Problems */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-medium text-brand-text-dark">
                Existing Health Problems (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-3">
                {healthProblems.map((problem) => (
                  <button
                    key={problem}
                    type="button"
                    onClick={() => toggleHealthProblem(problem)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      formData.healthProblems.includes(problem)
                        ? 'border-brand-blue bg-brand-blue text-white'
                        : 'border-gray-200 text-brand-text-grey hover:border-brand-blue/50'
                    }`}
                  >
                    {formData.healthProblems.includes(problem) && (
                      <Check className="w-3 h-3 inline mr-1" />
                    )}
                    {problem}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-dark-blue transition-all hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Your Report...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Get My Health Report & Diet Plan
                  </>
                )}
              </button>
              <p className="text-center text-sm text-brand-text-grey mt-4">
                Your information is secure and will only be used to generate your personalized plan.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HealthFormSection;
