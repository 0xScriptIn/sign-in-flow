import { useState } from 'react';
import SigninPage from './SigninPage';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { CheckCircle, LogOut, User } from 'lucide-react';

type AppState = 'home' | 'signin' | 'signed-in';

interface UserData {
  email: string;
  name: string;
  id: string;
}

export default function SigninDemo() {
  const [appState, setAppState] = useState<AppState>('home');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleSigninSuccess = (userData: UserData) => {
    setUserData(userData);
    setAppState('signed-in');
  };

  const handleSignOut = () => {
    setUserData(null);
    setAppState('home');
  };

  const handleBackToHome = () => {
    setAppState('home');
  };

  if (appState === 'signin') {
    return (
      <SigninPage
        onSigninSuccess={handleSigninSuccess}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (appState === 'signed-in' && userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome back!
            </CardTitle>
            <CardDescription className="text-gray-600">
              You've successfully signed in to your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{userData.name}</p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  // In a real app, you would navigate to the dashboard
                  console.log('Navigate to dashboard');
                }}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Go to Dashboard
              </Button>
              
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full h-11 border-gray-300 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-8">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Our App
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Experience our user-friendly sign-in flow
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Features included:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Modern, responsive design</li>
                <li>• Social login options (Google, GitHub)</li>
                <li>• Password visibility toggle</li>
                <li>• Remember me functionality</li>
                <li>• Forgot password flow</li>
                <li>• Real-time validation</li>
                <li>• Loading states and feedback</li>
                <li>• Accessibility features</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={() => setAppState('signin')}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium"
          >
            Try the Sign-In Flow
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              This is a demo showcasing best practices for user authentication
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}