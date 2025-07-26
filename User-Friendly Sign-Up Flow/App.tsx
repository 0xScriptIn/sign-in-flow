import { useState } from 'react';
import { SignupCarousel } from './components/SignupCarousel';
import { SignupForm } from './components/SignupForm';
import SigninDemo from './SigninDemo';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSignin, setShowSignin] = useState(false);
  const totalSteps = 3;

  if (showSignin) {
    return <SigninDemo />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Visual Storytelling */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center">
        <SignupCarousel />
      </div>

      {/* Right Panel - Signup Form */}
      <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowSignin(true)}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
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