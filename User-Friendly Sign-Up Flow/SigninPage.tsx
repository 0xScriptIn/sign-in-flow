import { useState } from 'react';
import { SigninForm } from './components/SigninForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { Button } from './components/ui/button';
import { ArrowLeft, Shield, Zap, Users } from 'lucide-react';

interface SigninPageProps {
  onSigninSuccess?: (userData: any) => void;
  onBackToHome?: () => void;
}

export default function SigninPage({ onSigninSuccess, onBackToHome }: SigninPageProps) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSigninSuccess = (userData: any) => {
    console.log('User signed in successfully:', userData);
    onSigninSuccess?.(userData);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToSignin = () => {
    setShowForgotPassword(false);
  };

  const handleSignupRedirect = () => {
    // In a real app, you would navigate to the signup page
    console.log('Navigate to signup page');
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Get started in seconds with our streamlined process"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Ready",
      description: "Built for teams of all sizes, from startups to enterprises"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Panel - Visual Storytelling */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 flex flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10">
          {/* Back Button */}
          {onBackToHome && (
            <Button
              variant="ghost"
              onClick={onBackToHome}
              className="text-white hover:bg-white/10 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          )}

          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back to your workspace
            </h1>
            <p className="text-xl text-blue-100 mb-12">
              Sign in to continue building amazing things with your team
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign-in Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {showForgotPassword ? (
            <ForgotPasswordForm
              onBackToSignin={handleBackToSignin}
              onResetSuccess={(email) => {
                console.log('Password reset email sent to:', email);
                // You could show a toast notification here
              }}
            />
          ) : (
            <SigninForm
              onSigninSuccess={handleSigninSuccess}
              onForgotPassword={handleForgotPassword}
              onSignupRedirect={handleSignupRedirect}
            />
          )}
        </div>
      </div>

      {/* Mobile Responsive */}
      <div className="lg:hidden bg-white p-6 border-t">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleSignupRedirect}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}