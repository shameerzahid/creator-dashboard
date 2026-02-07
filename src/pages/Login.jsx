/**
 * Login Page
 * Screen 2: Login - matches wireframe exactly with default, error, and loading states
 */
import { useState } from 'react';
import { Button, Input, Card } from '../components/common';
import { Header } from '../components/layout';

export default function Login({ onBackClick, onSignUpClick, onForgotPasswordClick, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen bg-white">
      <Header
        showAccountSwitcher={false}
        onUserMenuClick={null}
        headerRight={
          <div className="header-right">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onBackClick?.();
              }}
              className="text-secondary no-underline hover:underline"
            >
              Back to Home
            </a>
          </div>
        }
      />
      
      <div className="flex justify-center items-center min-h-[600px] p-10">
        <div className="w-full max-w-[400px]">
          <form onSubmit={handleSubmit}>
            <Card>
              <h1 className="text-center mb-[30px] text-3xl text-dark">Login</h1>
              
              {/* Error Summary */}
              {showErrorState && errors.general && (
                <div className="form-error-summary mb-5">
                  {errors.general}
                </div>
              )}
              
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
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
              
              <div className="form-group">
                <Button 
                  type="submit"
                  variant="primary" 
                  className="w-full"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Login
                </Button>
              </div>
              
              <div className="text-center mt-4 text-sm text-dark-lighter">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onForgotPasswordClick?.();
                  }}
                  className="text-secondary no-underline hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              
              <div className="text-center mt-5 text-sm text-dark-lighter">
                Don't have an account?{' '}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onSignUpClick?.();
                  }}
                  className="text-secondary no-underline hover:underline"
                >
                  Sign up
                </a>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

