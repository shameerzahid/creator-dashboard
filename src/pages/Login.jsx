/**
 * Login Page
 * Enhanced production-ready design with icons and better UX
 */
import { useState } from 'react';
import { HiMail, HiLockClosed, HiArrowLeft } from 'react-icons/hi';
import { Button, Input, Card } from '../components/common';
import { Header } from '../components/layout';

export default function Login({ onBackClick, onSignUpClick, onForgotPasswordClick, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {};
    
    // Validation
    if (!email) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowErrorState(true);
      return;
    }
    
    // Simulate login
    setIsLoading(true);
    setErrors({});
    setShowErrorState(false);
    
    try {
      // Call onSubmit callback if provided
      if (onSubmit) {
        await onSubmit({ email, password });
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Login successful');
      }
    } catch (error) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
      setShowErrorState(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-lighter to-white">
      <Header
        showAccountSwitcher={false}
        onUserMenuClick={null}
        className="header-enhanced"
        headerRight={
          <div className="header-right">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onBackClick?.();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-secondary no-underline font-medium hover:bg-primary-light hover:text-primary transition-all"
            >
              <HiArrowLeft className="text-base" />
              <span>Back to Home</span>
            </a>
          </div>
        }
      />
      
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4 md:p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-xl border border-dark-20 p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Welcome Back</h1>
                <p className="text-sm md:text-base text-dark-lighter">Sign in to your account to continue</p>
              </div>
              
              {/* Error Summary */}
              {showErrorState && errors.general && (
                <div className="mb-6 p-4 bg-danger-light border border-danger rounded-md flex items-start gap-3">
                  <svg className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-danger flex-1">{errors.general}</span>
                </div>
              )}
              
              {/* Form Fields */}
              <div className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  icon={HiMail}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  error={!!errors.email}
                  errorMessage={errors.email}
                  disabled={isLoading}
                />
                
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon={HiLockClosed}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                  error={!!errors.password}
                  errorMessage={errors.password}
                  disabled={isLoading}
                />
                
                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary border-dark-lighter rounded focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                      disabled={isLoading}
                    />
                    <span className="text-sm text-dark group-hover:text-primary transition-colors">Remember me</span>
                  </label>
                  
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onForgotPasswordClick?.();
                    }}
                    className="text-sm text-secondary no-underline hover:text-primary hover:underline transition-all"
                  >
                    Forgot password?
                  </a>
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit"
                  variant="primary" 
                  className="w-full py-3 text-base font-semibold"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
              
              {/* Footer */}
              <div className="mt-6 text-center">
                <span className="text-sm text-dark-lighter">Don't have an account? </span>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onSignUpClick?.();
                  }}
                  className="text-sm text-secondary no-underline font-medium hover:text-primary hover:underline transition-all"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

