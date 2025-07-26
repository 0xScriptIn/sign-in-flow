import { useState } from 'react';
import { SigninForm } from './components/SigninForm';
import { SignupForm } from './components/SignupForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { SigninCarousel } from './components/SigninCarousel';

type View = 'signin' | 'signup' | 'forgotPassword' | 'dashboard';

export default function SigninApp() {
  const [currentView, setCurrentView] = useState<View>('signin');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleSigninSuccess = () => {
    console.log('Sign in successful!');
    setCurrentView('dashboard');
  };

  const handleSwitchToSignup = () => {
    setCurrentView('signup');
    setCurrentStep(1);
  };

  const handleSwitchToSignin = () => {
    setCurrentView('signin');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgotPassword');
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'signin':
        return (
          <SigninForm
            onSigninSuccess={handleSigninSuccess}
            onSwitchToSignup={handleSwitchToSignup}
            onForgotPassword={handleForgotPassword}
          />
        );
      case 'signup':
        return (
          <div className="space-y-4">
            <SignupForm
              currentStep={currentStep}
              totalSteps={totalSteps}
              onStepChange={setCurrentStep}
            />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={handleSwitchToSignin}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in instead
                </button>
              </p>
            </div>
          </div>
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordForm onBackToSignin={handleSwitchToSignin} />
        );
      case 'dashboard':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-green-600">Welcome to your Dashboard!</h1>
              <p className="text-muted-foreground">
                You've successfully signed in. This is where your main application would load.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h2 className="text-lg font-semibold text-green-800 mb-2">🎉 Sign-in Complete!</h2>
              <p className="text-green-700">
                The sign-in flow has been successfully implemented with all the features you requested.
              </p>
            </div>
            <button
              onClick={handleSwitchToSignin}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Sign In (Demo)
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'signin':
        return 'Sign In';
      case 'signup':
        return 'Sign Up';
      case 'forgotPassword':
        return 'Reset Password';
      case 'dashboard':
        return 'Dashboard';
      default:
        return '';
    }
  };

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {renderMainContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Visual Storytelling */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center">
        <SigninCarousel />
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {getTitle()}
            </h1>
          </div>

          {/* Main Content */}
          {renderMainContent()}

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                © 2024 Your Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}