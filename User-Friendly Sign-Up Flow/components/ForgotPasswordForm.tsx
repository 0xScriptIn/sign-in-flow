import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ForgotPasswordFormProps {
  onBackToSignin?: () => void;
}

export function ForgotPasswordForm({ onBackToSignin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full border-0 shadow-none">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription className="text-base">
            We've sent a password reset link to your email address
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              If an account with email <strong>{email}</strong> exists, you will receive a password reset link shortly.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Didn't receive the email? Check your spam folder or try again with a different email address.
            </p>
            
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="w-full"
            >
              Try with different email
            </Button>
            
            <Button
              variant="ghost"
              onClick={onBackToSignin}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
        <CardDescription className="text-base">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Reset Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                className={`pl-10 h-11 ${error ? 'border-destructive' : ''}`}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11" 
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Sending reset link...
              </>
            ) : (
              'Send reset link'
            )}
          </Button>
        </form>

        {/* Back to Sign In */}
        <Button
          variant="ghost"
          onClick={onBackToSignin}
          className="w-full"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Button>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Remember your password?{' '}
            <Button
              variant="link"
              onClick={onBackToSignin}
              className="px-0 text-xs font-medium"
              disabled={isLoading}
            >
              Sign in instead
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}