/**
 * Entry Page (Homepage)
 * Modern split-layout design with feature highlights
 */
import { useEffect } from 'react';
import { HiUser, HiOfficeBuilding, HiChartBar } from 'react-icons/hi';
import { Button } from '../components/common';
import { Header } from '../components/layout';

export default function EntryPage({ onLoginClick, onSignUpClick, onCreateAccountClick }) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const features = [
    {
      icon: HiUser,
      title: 'Creator Accounts',
      description: 'Build your personal brand and connect with followers'
    },
    {
      icon: HiOfficeBuilding,
      title: 'Business Accounts',
      description: 'Manage your business presence and engage customers'
    },
    {
      icon: HiChartBar,
      title: 'Analytics & Insights',
      description: 'Track performance and understand your audience'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
                onLoginClick?.();
              }}
              className="header-link"
            >
              Log in
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSignUpClick?.();
              }}
              className="header-link"
            >
              Sign up
            </a>
          </div>
        }
      />
      
      <div className="entry-page-container">
        {/* Split Hero Section */}
        <div className="entry-hero-split">
          {/* Left Side - Content */}
          <div className="entry-hero-content">
            <div className="entry-hero-badge">
              <span className="entry-badge-text">Get Started Today</span>
            </div>
            
            <h1 className="entry-hero-title">
              Official Accounts
            </h1>
            
            <p className="entry-hero-description">
              Create and manage your official account to connect with your audience, share updates, and grow your presence. Choose between Creator or Business accounts to get started.
            </p>
            
            <div className="entry-hero-actions">
              <Button 
                variant="primary" 
                onClick={onCreateAccountClick}
                className="entry-cta-primary"
              >
                Create Official Account
              </Button>
              
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onLoginClick?.();
                }}
                className="entry-cta-secondary"
              >
                Log in to existing account
              </a>
            </div>
          </div>
          
          {/* Right Side - Image/Illustration */}
          <div className="entry-hero-visual">
            <div className="entry-hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=800&fit=crop&q=80" 
                alt="Official Accounts Dashboard"
                className="entry-hero-image"
              />
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="entry-features">
          <div className="entry-features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="entry-feature-card">
                  <div className="entry-feature-icon">
                    <IconComponent />
                  </div>
                  <h3 className="entry-feature-title">{feature.title}</h3>
                  <p className="entry-feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

