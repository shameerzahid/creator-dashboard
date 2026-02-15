/**
 * Choose Account Type Page
 * Enhanced production-ready design with better visual hierarchy
 */
import { useState } from 'react';
import { HiUser, HiOfficeBuilding, HiCheckCircle, HiXCircle, HiArrowRight } from 'react-icons/hi';
import { Button } from '../components/common';
import { Header } from '../components/layout';

export default function ChooseAccountType({ 
  currentAccount,
  currentRole,
  onContinue,
  onBack,
  onAccountSwitch,
  onUserMenuClick 
}) {
  const [selectedType, setSelectedType] = useState('creator');

  const handleContinue = () => {
    onContinue?.(selectedType);
  };

  const creatorFeatures = [
    'Create and publish posts',
    'Manage profile & settings',
    'View analytics & insights',
    'Connect with followers'
  ];

  const creatorNotIncluded = ['Inbox', 'Menu', 'Mini Apps'];

  const businessFeatures = [
    'Customer inbox & messaging',
    'Menu button configuration',
    'Mini app registration & management',
    'Advanced analytics & reporting'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-lighter to-white">
      <Header
        accountName={currentAccount || 'My Business'}
        role={currentRole || 'owner'}
        showAccountSwitcher={true}
        onAccountSwitch={onAccountSwitch}
        onUserMenuClick={onUserMenuClick}
        className="header-enhanced"
      />
      
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">
            Choose Account Type
          </h1>
          <p className="text-sm md:text-base text-dark-lighter">
            Create an additional Official Account
          </p>
        </div>
        
        {/* Info Box */}
        <div className="text-center mb-10 p-4 md:p-5 bg-primary-light border-l-4 border-primary rounded-md max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm md:text-base text-dark font-medium">
              Select account type. This affects available features.
            </div>
          </div>
        </div>
        
        {/* Account Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Creator Account Card */}
          <div
            className={`relative bg-white border-2 rounded-lg p-6 md:p-8 cursor-pointer transition-all duration-300 ${
              selectedType === 'creator'
                ? 'border-primary shadow-xl scale-[1.02]'
                : 'border-dark-20 shadow-md hover:border-primary hover:shadow-lg'
            }`}
            onClick={() => setSelectedType('creator')}
          >
            {/* Selection Indicator */}
            {selectedType === 'creator' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <HiCheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
            
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedType === 'creator' ? 'bg-primary text-white' : 'bg-primary-light text-primary'
            } transition-colors`}>
              <HiUser className="w-8 h-8" />
            </div>
            
            <div className="text-2xl md:text-3xl font-bold text-dark mb-3">
              Creator Account
            </div>
            <div className="text-sm md:text-base text-dark-lighter mb-6">
              Content-focused account for creators and influencers
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-dark text-sm md:text-base">
                Available Features:
              </div>
              <div className="space-y-2.5">
                {creatorFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-dark-lighter">
                    <HiCheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-dark-20">
                <div className="flex items-start gap-2 text-xs text-dark-lighter">
                  <HiXCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                  <span className="italic">Not included: {creatorNotIncluded.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Business Account Card */}
          <div
            className={`relative bg-white border-2 rounded-lg p-6 md:p-8 cursor-pointer transition-all duration-300 ${
              selectedType === 'business'
                ? 'border-primary shadow-xl scale-[1.02]'
                : 'border-dark-20 shadow-md hover:border-primary hover:shadow-lg'
            }`}
            onClick={() => setSelectedType('business')}
          >
            {/* Selection Indicator */}
            {selectedType === 'business' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <HiCheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
            
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedType === 'business' ? 'bg-primary text-white' : 'bg-primary-light text-primary'
            } transition-colors`}>
              <HiOfficeBuilding className="w-8 h-8" />
            </div>
            
            <div className="text-2xl md:text-3xl font-bold text-dark mb-3">
              Business Account
            </div>
            <div className="text-sm md:text-base text-dark-lighter mb-6">
              Full-featured account with all business tools
            </div>
            
            <div className="space-y-4">
              <div className="font-semibold text-dark text-sm md:text-base">
                Includes All Creator Features, Plus:
              </div>
              <div className="space-y-2.5">
                {businessFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-dark-lighter">
                    <HiCheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-dark-20">
                <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                  <HiCheckCircle className="w-4 h-4" />
                  <span>Complete feature set</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Continue Button */}
        <div className="text-center">
          <Button 
            variant="primary" 
            onClick={handleContinue}
            className="px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            Continue
            <HiArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}




