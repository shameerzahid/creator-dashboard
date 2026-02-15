/**
 * Profile & Settings Page
 * Enhanced production-ready design with better UX
 */
import { useState } from 'react';
import { HiUser, HiTag, HiDocumentText, HiMail, HiPhotograph, HiShieldCheck, HiUsers, HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi';
import { Button, Input, Select, Textarea, Badge } from '../components/common';
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Profile & Settings</h1>
        <p className="text-sm md:text-base text-dark-lighter">Manage your account information and preferences</p>
      </div>

      {/* Basic Info Section */}
      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 md:p-8 mb-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-dark-20">
          <HiUser className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-dark">Basic Info</h2>
        </div>
        
        <div className="space-y-6">
          <div className="mb-5">
            <label className="block mb-2 font-medium text-dark text-sm">Account ID</label>
            <input
              type="text"
              className="w-full px-3 py-2.5 border border-dark-lighter rounded-sm text-sm text-dark bg-dark-05 cursor-not-allowed"
              value={formData.accountId}
              readOnly
            />
            <div className="text-xs text-dark-lighter mt-1.5">
              This is your unique account identifier
            </div>
          </div>

          <Input
            label="Account Name"
            icon={HiUser}
            value={formData.accountName}
            onChange={(e) => handleInputChange('accountName', e.target.value)}
          />

          <Select
            label="Category"
            icon={HiTag}
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            options={categories}
          />

          <Textarea
            label="Description"
            icon={HiDocumentText}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
          />

          <div className="mb-5">
            <label className="block mb-2 font-medium text-dark text-sm">
              Contact Email or Phone <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none">
                <HiMail className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2.5 border border-dark-lighter rounded-sm text-sm text-dark placeholder:text-dark-lightest transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="Enter email or phone number"
              />
            </div>
            <div className="text-xs text-dark-lighter mt-1.5">
              Used for account verification and important notifications
            </div>
          </div>
        </div>
      </div>

      {/* Branding Section */}
      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 md:p-8 mb-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-dark-20">
          <HiPhotograph className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-dark">Branding</h2>
        </div>
        
        <div className="mb-5">
          <label className="block mb-3 font-medium text-dark text-sm">Logo</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {formData.accountName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col gap-3">
              <Button 
                variant="outline" 
                onClick={onChangeLogo}
                className="px-6 py-2.5"
              >
                <HiPhotograph className="w-4 h-4 inline mr-2" />
                Change Logo
              </Button>
              <p className="text-xs text-dark-lighter">
                Recommended: Square image, at least 400x400px, PNG or JPG format
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 md:p-8 mb-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-dark-20">
          <HiShieldCheck className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-dark">Verification</h2>
        </div>
        
        <div className="mb-5">
          <label className="block mb-3 font-medium text-dark text-sm">Verification Status</label>
          <div className="flex items-center gap-3 mb-4">
            {isVerified ? (
              <Badge variant="verified" className="flex items-center gap-1.5">
                <HiCheckCircle className="w-4 h-4" />
                Verified
              </Badge>
            ) : (
              <Badge variant="unverified" className="flex items-center gap-1.5">
                <HiXCircle className="w-4 h-4" />
                Unverified
              </Badge>
            )}
          </div>
          <div className="p-4 bg-primary-light border-l-4 border-primary rounded-md mb-4">
            <div className="flex items-start gap-3">
              <HiInformationCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-dark leading-relaxed">
                Verify your account to unlock all features and build trust with your audience.
              </div>
            </div>
          </div>
          {!isVerified && (
            <Button 
              variant="primary" 
              onClick={onStartVerification}
              className="px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl"
            >
              <HiShieldCheck className="w-4 h-4 inline mr-2" />
              Start Verification
            </Button>
          )}
        </div>
      </div>

      {/* Staff Management Section */}
      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 md:p-8 mb-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-dark-20">
          <HiUsers className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-dark">Staff Management</h2>
        </div>
        
        <div className="p-6 bg-dark-03 rounded-lg border-2 border-dashed border-dark-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <HiUsers className="w-6 h-6 text-primary" />
            </div>
            <div className="font-semibold text-lg text-dark">Coming Soon</div>
          </div>
          <div className="text-sm text-dark-lighter mb-5 leading-relaxed">
            Manage team members, assign roles (Owner, Admin, Support), and control access to your account. This feature will be available in a future update.
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <span className="px-3 py-1.5 bg-dark-05 rounded-lg text-xs font-medium text-dark-light">
              Owner Role
            </span>
            <span className="px-3 py-1.5 bg-dark-05 rounded-lg text-xs font-medium text-dark-light">
              Admin Role
            </span>
            <span className="px-3 py-1.5 bg-dark-05 rounded-lg text-xs font-medium text-dark-light">
              Support Role
            </span>
          </div>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-dark-20">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="px-6 py-2.5"
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSave}
          className="px-8 py-2.5 font-semibold shadow-lg hover:shadow-xl"
        >
          Save Changes
        </Button>
      </div>
    </Layout>
  );
}


