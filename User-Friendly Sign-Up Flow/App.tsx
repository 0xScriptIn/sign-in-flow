import { useState } from 'react';
import { SignupCarousel } from './components/SignupCarousel';
import { SignupForm } from './components/SignupForm';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Visual Storytelling */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center">
        <SignupCarousel />
      </div>

      {/* Right Panel - Signup Form */}
      <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <SignupForm 
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepChange={setCurrentStep}
          />
        </div>
      </div>
    </div>
  );
}