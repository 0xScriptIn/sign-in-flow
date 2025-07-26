import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

interface SigninFormProps {
  onSigninSuccess?: (userData: any) => void;
  onForgotPassword?: () => void;
  onSignupRedirect?: () => void;
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function SigninForm({ 
  onSigninSuccess, 
  onForgotPassword, 
  onSignupRedirect 
}: SigninFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSocial, setIsLoadingSocial] = useState<string | null>(null);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful signin
      const userData = {
        email: formData.email,
        name: 'John Doe',
        id: 'user-123'
      };
      
      onSigninSuccess?.(userData);
      console.log('Signin successful:', userData);
    } catch (error) {
      console.error('Signin failed:', error);
      setErrors({ email: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignin = async (provider: string) => {
    setIsLoadingSocial(provider);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Signing in with ${provider}`);
      onSigninSuccess?.({ provider, email: 'user@example.com' });
    } catch (error) {
      console.error(`${provider} signin failed:`, error);
    } finally {
      setIsLoadingSocial(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Social Sign-in Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-11 border-gray-300 hover:bg-gray-50"
            onClick={() => handleSocialSignin('google')}
            disabled={isLoadingSocial !== null}
          >
            <Chrome className="w-4 h-4 mr-2" />
            {isLoadingSocial === 'google' ? 'Signing in...' : 'Continue with Google'}
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-11 border-gray-300 hover:bg-gray-50"
            onClick={() => handleSocialSignin('github')}
            disabled={isLoadingSocial !== null}
          >
            <Github className="w-4 h-4 mr-2" />
            {isLoadingSocial === 'github' ? 'Signing in...' : 'Continue with GitHub'}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Sign-in Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`pl-10 h-11 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className={`pl-10 pr-10 h-11 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => updateFormData('rememberMe', checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center">
                Sign in
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSignupRedirect}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}