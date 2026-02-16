import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import HealthFormSection from './sections/HealthFormSection';
import HealthReportSection from './sections/HealthReportSection';
import PlanSection from './sections/PlanSection';
import WhatsAppCTA from './sections/WhatsAppCTA';
import TrustSection from './sections/TrustSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export interface HealthData {
  fullName: string;
  mobile: string;
  email: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  currentWeight: number;
  targetWeightLoss: number;
  activityLevel: 'low' | 'moderate' | 'active';
  foodPreference: 'vegetarian' | 'non-vegetarian';
  healthProblems: string[];
}

export interface HealthReport {
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  idealWeightMin: number;
  idealWeightMax: number;
  metabolismRisk: string;
}

function App() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);
  const [showReport, setShowReport] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger on load
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const calculateHealthReport = (data: HealthData): HealthReport => {
    // Calculate BMI
    const heightInMeters = data.height / 100;
    const bmi = parseFloat((data.currentWeight / (heightInMeters * heightInMeters)).toFixed(1));
    
    // Determine BMI category
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal Weight';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (data.gender === 'male') {
      bmr = 10 * data.currentWeight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      bmr = 10 * data.currentWeight + 6.25 * data.height - 5 * data.age - 161;
    }

    // Apply activity multiplier
    let activityMultiplier = 1.2;
    if (data.activityLevel === 'moderate') activityMultiplier = 1.375;
    if (data.activityLevel === 'active') activityMultiplier = 1.55;

    const dailyCalories = Math.round(bmr * activityMultiplier);

    // Calculate ideal weight range (BMI 18.5-24.9)
    const idealWeightMin = parseFloat((18.5 * heightInMeters * heightInMeters).toFixed(1));
    const idealWeightMax = parseFloat((24.9 * heightInMeters * heightInMeters).toFixed(1));

    // Determine metabolism risk
    let metabolismRisk = 'Low Risk';
    if (data.healthProblems.includes('Diabetes') || data.healthProblems.includes('Thyroid')) {
      metabolismRisk = 'High Risk - Consultation Recommended';
    } else if (bmi >= 30 || data.healthProblems.includes('BP')) {
      metabolismRisk = 'Moderate Risk - Lifestyle Changes Needed';
    }

    return {
      bmi,
      bmiCategory,
      dailyCalories,
      idealWeightMin,
      idealWeightMax,
      metabolismRisk,
    };
  };

  const handleFormSubmit = async (data: HealthData) => {
    setHealthData(data);
    const report = calculateHealthReport(data);
    setHealthReport(report);
    setShowReport(true);

    // Send email notification
    try {
      await fetch('https://formsubmit.co/ajax/ranjeetrawat303@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          subject: `New Health Assessment - ${data.fullName}`,
          name: data.fullName,
          email: data.email,
          mobile: data.mobile,
          age: data.age,
          gender: data.gender,
          height: data.height,
          currentWeight: data.currentWeight,
          targetWeightLoss: data.targetWeightLoss,
          activityLevel: data.activityLevel,
          foodPreference: data.foodPreference,
          healthProblems: data.healthProblems.join(', '),
          bmi: report.bmi,
          bmiCategory: report.bmiCategory,
          dailyCalories: report.dailyCalories,
          metabolismRisk: report.metabolismRisk,
        }),
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }

    // Scroll to report section
    setTimeout(() => {
      const reportSection = document.getElementById('health-report');
      if (reportSection) {
        reportSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <HealthFormSection onSubmit={handleFormSubmit} />
        {showReport && healthReport && healthData && (
          <>
            <HealthReportSection report={healthReport} data={healthData} />
            <PlanSection report={healthReport} data={healthData} />
          </>
        )}
        <WhatsAppCTA />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
