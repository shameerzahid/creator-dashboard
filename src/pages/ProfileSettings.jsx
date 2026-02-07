/**
 * Profile & Settings Page
 * Screen 7: Profile & Settings - matches wireframe exactly
 */
import { useState } from 'react';
import { Button, Input, Select, Textarea, Card, Badge } from '../components/common';
import { Layout } from '../components/layout';

export default function ProfileSettings({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  accountData = {},
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
  onSave,
  onCancel,
  onStartVerification,
  onChangeLogo,
}) {
  const [formData, setFormData] = useState({
    accountId: accountData.accountId || 'ACC-123456789',
    accountName: accountData.accountName || 'My Business',
    category: accountData.category || 'Food & Restaurant',
    description: accountData.description || 'This is my business account description.',
    contact: accountData.contact || 'contact@mybusiness.com',
    logo: accountData.logo || null,
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const categories = [
    'Food & Restaurant',
    'Retail',
    'Services',
    'Entertainment',
    'Technology',
    'Healthcare',
    'Education',
    'Real Estate',
    'Finance',
    'Travel & Hospitality',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
  };

  return (
    <Layout
      showHeader={true}
      showSidebar={true}
      headerProps={{
        accountName,
        role,
        showAccountSwitcher: true,
        onAccountSwitch,
        onUserMenuClick,
      }}
      sidebarProps={{
        items: sidebarItems,
        activeItem: 'profile',
        onItemClick: onNavClick,
        onLogout: () => window.location.href = '/',
      }}
    >
      <h1 className="mb-[30px] text-2xl text-dark">Profile & Settings</h1>

      {/* Basic Info Section */}
      <Card className="mb-[30px]">
        <div className="card-title mb-5 pb-4 border-b border-dark-20">Basic Info</div>
        
        <div className="form-group">
          <label className="form-label">Account ID</label>
          <input
            type="text"
            className="form-input"
            value={formData.accountId}
            readOnly
            style={{ background: 'rgba(3, 38, 37, 0.05)', cursor: 'not-allowed' }}
          />
          <div className="text-xs text-dark-lighter mt-1.5">
            This is your unique account identifier
          </div>
        </div>

        <Input
          label="Account Name"
          value={formData.accountName}
          onChange={(e) => handleInputChange('accountName', e.target.value)}
        />

        <Select
          label="Category"
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          options={categories}
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
        />

        <div className="form-group">
          <label className="form-label">
            Contact Email or Phone <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            placeholder="Enter email or phone number"
          />
          <div className="text-xs text-dark-lighter mt-1.5">
            Used for account verification and important notifications
          </div>
        </div>
      </Card>

      {/* Branding Section */}
      <Card className="mb-[30px]">
        <div className="card-title mb-5 pb-4 border-b border-dark-20">Branding</div>
        
        <div className="form-group">
          <label className="form-label">Logo</label>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gray-placeholder rounded-full"></div>
            <Button variant="outline" onClick={onChangeLogo}>
              Change Logo
            </Button>
          </div>
        </div>
      </Card>

      {/* Verification Section */}
      <Card className="mb-[30px]">
        <div className="card-title mb-5 pb-4 border-b border-dark-20">Verification</div>
        
        <div className="form-group">
          <label className="form-label">Verification Status</label>
          <div className="mt-2.5 mb-4">
            {isVerified ? (
              <Badge variant="verified">Verified</Badge>
            ) : (
              <Badge variant="unverified">Unverified</Badge>
            )}
          </div>
          <div className="text-sm text-dark-lighter mb-4">
            Verify your account to unlock all features and build trust with your audience.
          </div>
          {!isVerified && (
            <Button variant="primary" onClick={onStartVerification}>
              Start Verification
            </Button>
          )}
        </div>
      </Card>

      {/* Staff Management Section */}
      <Card className="mb-[30px]">
        <div className="card-title mb-5 pb-4 border-b border-dark-20">Staff Management</div>
        
        <div className="p-5 bg-dark-03 rounded-sm border border-dashed border-dark-20">
          <div className="flex items-center mb-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(3, 38, 37, 0.5)" strokeWidth="2" className="mr-2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <div className="font-semibold text-dark">Coming Soon</div>
          </div>
          <div className="text-sm text-dark-lighter mb-4">
            Manage team members, assign roles (Owner, Admin, Support), and control access to your account. This feature will be available in a future update.
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <span className="px-2.5 py-1 bg-dark-05 rounded-xl text-xs text-dark-light">
              Owner Role
            </span>
            <span className="px-2.5 py-1 bg-dark-05 rounded-xl text-xs text-dark-light">
              Admin Role
            </span>
            <span className="px-2.5 py-1 bg-dark-05 rounded-xl text-xs text-dark-light">
              Support Role
            </span>
          </div>
        </div>
      </Card>

      {/* Save Actions */}
      <div className="action-buttons">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </Layout>
  );
}


