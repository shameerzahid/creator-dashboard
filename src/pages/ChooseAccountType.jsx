/**
 * Choose Account Type Page
 * Screen 4: Choose Account Type - matches wireframe exactly
 */
import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-white">
      <Header
        accountName={currentAccount || 'My Business'}
        role={currentRole || 'owner'}
        showAccountSwitcher={true}
        onAccountSwitch={onAccountSwitch}
        onUserMenuClick={onUserMenuClick}
      />
      
      <div className="p-10 max-w-[900px] mx-auto">
        <h1 className="text-center mb-2.5 text-3xl text-dark">
          Choose Account Type
        </h1>
        <div className="text-center mb-4 text-sm text-dark-lighter">
          Create an additional Official Account
        </div>
        
        {/* Info Box */}
        <div className="text-center mb-10 p-3 px-5 bg-primary-light rounded-sm max-w-[600px] mx-auto">
          <div className="text-sm text-dark font-medium">
            Select account type. This affects available features.
          </div>
        </div>
        
        {/* Account Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-10">
          {/* Creator Account Card */}
          <div
            className={`account-type-card ${selectedType === 'creator' ? 'selected' : ''}`}
            onClick={() => setSelectedType('creator')}
          >
            <div className="account-type-title">Creator Account</div>
            <div className="my-4 text-dark-lighter">
              Content-focused account for creators and influencers
            </div>
            <div className="account-type-features">
              <div className="mb-2.5 font-semibold text-dark text-sm mt-2.5">
                Available Features:
              </div>
              <div className="mb-2">✓ Create and publish posts</div>
              <div className="mb-2">✓ Manage profile & settings</div>
              <div className="mb-2">✓ View analytics & insights</div>
              <div className="mb-2">✓ Connect with followers</div>
              <div className="mt-4 pt-4 border-t border-dark-20">
                <div className="text-xs text-dark-lighter italic">
                  Not included: Inbox, Menu, Mini Apps
                </div>
              </div>
            </div>
          </div>
          
          {/* Business Account Card */}
          <div
            className={`account-type-card ${selectedType === 'business' ? 'selected' : ''}`}
            onClick={() => setSelectedType('business')}
          >
            <div className="account-type-title">Business Account</div>
            <div className="my-4 text-dark-lighter">
              Full-featured account with all business tools
            </div>
            <div className="account-type-features">
              <div className="mb-2.5 font-semibold text-dark text-sm mt-2.5">
                Includes All Creator Features, Plus:
              </div>
              <div className="mb-2">✓ Customer inbox & messaging</div>
              <div className="mb-2">✓ Menu button configuration</div>
              <div className="mb-2">✓ Mini app registration & management</div>
              <div className="mb-2">✓ Advanced analytics & reporting</div>
              <div className="mt-4 pt-4 border-t border-dark-20">
                <div className="text-xs text-primary font-medium">
                  ✓ Complete feature set
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
            className="px-10 py-3"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}


