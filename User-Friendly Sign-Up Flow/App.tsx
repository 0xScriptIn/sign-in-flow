import { useState } from 'react';
import { SignupCarousel } from './components/SignupCarousel';
import { SignupForm } from './components/SignupForm';
import { SigninForm } from './components/SigninForm';

export default function App() {
  const [mode, setMode] = useState<'signup' | 'signin'>('signin');
  const [currentStep, setCurrentStep] = useState(1); // for signup
  const totalSteps = 3;

  const switchToSignUp = () => setMode('signup');
  const switchToSignIn = () => setMode('signin');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Visual Storytelling */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center">
        <SignupCarousel />
      </div>

      {/* Right Panel - Authentication Forms */}
      <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {mode === 'signup' ? (
            <SignupForm
              currentStep={currentStep}
              totalSteps={totalSteps}
              onStepChange={setCurrentStep}
              onSwitchToSignIn={switchToSignIn}
            />
          ) : (
            <SigninForm onSwitchToSignUp={switchToSignUp} />
          )}
        </div>
      </div>
    </div>
  );
}