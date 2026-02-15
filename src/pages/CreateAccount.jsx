/**
 * Create Official Account Form
 * Enhanced production-ready design with better UX
 */
import { useState } from 'react';
import { HiUser, HiGlobe, HiTag, HiDocumentText, HiMail, HiPhotograph, HiX, HiArrowLeft } from 'react-icons/hi';
import { Button, Input, Select, Textarea } from '../components/common';
import { Header } from '../components/layout';

export default function CreateAccount({ 
  accountType = 'creator',
  onCancel,
  onSubmit 
}) {
  const [formData, setFormData] = useState({
    accountName: '',
    region: '',
    category: '',
    description: '',
    contact: '',
    logo: null,
  });
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

  const regions = [
    'North America',
    'South America',
    'Europe',
    'Asia',
    'Africa',
    'Oceania',
    'Middle East',
  ];

  const businessCategories = [
    'Food & Restaurant',
    'Retail & E-commerce',
    'Services',
    'Entertainment',
    'Technology',
    'Healthcare',
    'Education',
    'Real Estate',
    'Finance',
    'Travel & Hospitality',
    'Other Business',
  ];

  const creatorCategories = [
    'Content Creator',
    'Influencer',
    'Artist',
    'Musician',
    'Writer',
    'Photographer',
    'Podcaster',
    'Educator',
    'Other Creator',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.accountName.trim()) {
      newErrors.accountName = 'Account name is required';
    }
    if (!formData.region) {
      newErrors.region = 'Region is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact email or phone is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(formData);
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
                onCancel?.();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-secondary no-underline font-medium hover:bg-primary-light hover:text-primary transition-all"
            >
              <HiArrowLeft className="text-base" />
              <span>Cancel</span>
            </a>
          </div>
        }
      />
      
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Create Official Account</h1>
          <p className="text-sm md:text-base text-dark-lighter">
            Fill in the details below to create your new {accountType === 'business' ? 'business' : 'creator'} account
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-xl border border-dark-20 p-6 md:p-8">
            <div className="space-y-6">
              <Input
                label="Account Name"
                required
                icon={HiUser}
                value={formData.accountName}
                onChange={(e) => handleInputChange('accountName', e.target.value)}
                placeholder="Enter account name"
                error={!!errors.accountName}
                errorMessage={errors.accountName}
              />
              
              <Select
                label="Region"
                required
                icon={HiGlobe}
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                placeholder="Select region"
                options={regions}
                error={!!errors.region}
                errorMessage={errors.region}
              />
              
              <div className="mb-5">
                <label className="block mb-2 font-medium text-dark text-sm">
                  Category <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none">
                    <HiTag className="w-5 h-5" />
                  </div>
                  <select
                    className={`w-full pl-10 pr-9 py-2.5 border rounded-sm text-sm text-dark bg-white appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                      errors.category
                        ? 'border-danger focus:border-danger focus:ring-danger/20'
                        : 'border-dark-lighter focus:border-primary focus:ring-primary/20'
                    }`}
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23032625' fill-opacity='0.5' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 10px center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select category</option>
                    <optgroup label="Business Categories">
                      {businessCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Creator Categories">
                      {creatorCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                {errors.category && (
                  <div className="text-danger text-xs mt-1.5">{errors.category}</div>
                )}
              </div>
              
              <Textarea
                label="Description"
                icon={HiDocumentText}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter account description"
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
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-sm text-sm text-dark placeholder:text-dark-lightest transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                      errors.contact
                        ? 'border-danger focus:border-danger focus:ring-danger/20'
                        : 'border-dark-lighter focus:border-primary focus:ring-primary/20'
                    }`}
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Enter email or phone number"
                  />
                </div>
                {errors.contact && (
                  <div className="text-danger text-xs mt-1.5">{errors.contact}</div>
                )}
                <div className="text-xs text-dark-lighter mt-1.5">
                  Used for account verification and important notifications
                </div>
              </div>
            
              <div className="mb-5">
                <label className="block mb-2 font-medium text-dark text-sm">Logo</label>
                {!logoPreview ? (
                  <div
                    className="border-2 border-dashed border-dark-lighter rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary-light transition-all"
                    onClick={() => document.getElementById('logo-upload').click()}
                  >
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                        <HiPhotograph className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-dark mb-1">Click to upload or drag and drop</div>
                      <div className="text-xs text-dark-lighter">PNG, JPG up to 5MB</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative inline-block">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="max-w-full max-h-[300px] rounded-lg border-2 border-dark-20 shadow-md" 
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoPreview(null);
                          setFormData(prev => ({ ...prev, logo: null }));
                          document.getElementById('logo-upload').value = '';
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/90 transition-colors shadow-lg"
                      >
                        <HiX className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
                {errors.logo && (
                  <div className="text-danger text-xs mt-1.5">{errors.logo}</div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-dark-20">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 sm:flex-none px-6 py-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1 sm:flex-none px-8 py-3 font-semibold shadow-lg hover:shadow-xl"
              >
                Create Account
              </Button>
            </div>
            
            {/* Info Box */}
            <div className="mt-6 p-4 bg-primary-light border-l-4 border-primary rounded-md">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 text-primary mt-0.5">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-dark mb-1">Account Verification</div>
                  <div className="text-xs text-dark-lighter leading-relaxed">
                    Account verification unlocks full features. After creation, you'll be redirected to your account dashboard. Verification can be started later from Profile & Settings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

