import { useState } from 'react';
import { SignupCarousel } from './components/SignupCarousel';
import { SignupForm } from './components/SignupForm';
import { SigninCarousel } from './components/SigninCarousel';
import { SigninForm } from './components/SigninForm';

type AuthMode = 'signin' | 'signup';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  
  const totalSteps = 3;

  const handleSigninSuccess = (userData: any) => {
    setUser(userData);
    console.log('User signed in:', userData);
  };

  const handleSwitchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setCurrentStep(1);
    setUser(null);
  };

  // If user is signed in, show a welcome screen
  if (user) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center">
          <div className="text-center text-white max-w-lg mx-auto">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100 text-lg">You're successfully signed in.</p>
            </div>
            <button
              onClick={() => setUser(null)}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600">Your dashboard content would appear here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Visual Storytelling */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center">
        {authMode === 'signin' ? <SigninCarousel /> : <SignupCarousel />}
      </div>

      {/* Right Panel - Auth Form */}
      <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {authMode === 'signin' ? (
            <SigninForm 
              onSwitchToSignup={() => handleSwitchMode('signup')}
              onSigninSuccess={handleSigninSuccess}
            />
          ) : (
            <SignupForm 
              currentStep={currentStep}
              totalSteps={totalSteps}
              onStepChange={setCurrentStep}
            />
          )}
          
          {/* Mode Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => handleSwitchMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {authMode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}