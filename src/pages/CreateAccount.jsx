/**
 * Create Official Account Form
 * Screen 5: Create Account - matches wireframe exactly
 */
import { useState } from 'react';
import { Button, Input, Select, Textarea, Card } from '../components/common';
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
    <div className="min-h-screen bg-white">
      <Header
        showAccountSwitcher={false}
        onUserMenuClick={null}
      />
      
      <div className="p-10 max-w-[600px] mx-auto">
        <h1 className="mb-[30px] text-2xl text-dark">Create Official Account</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <Input
              label="Account Name"
              required
              value={formData.accountName}
              onChange={(e) => handleInputChange('accountName', e.target.value)}
              placeholder="Enter account name"
              error={!!errors.accountName}
              errorMessage={errors.accountName}
            />
            
            <Select
              label="Region"
              required
              value={formData.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              placeholder="Select region"
              options={regions}
              error={!!errors.region}
              errorMessage={errors.region}
            />
            
            <div className="form-group">
              <label className="form-label">
                Category <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
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
              {errors.category && (
                <div className="error-message">{errors.category}</div>
              )}
            </div>
            
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter account description"
              rows={4}
            />
            
            <div className="form-group">
              <label className="form-label">
                Contact Email or Phone <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.contact ? 'error' : ''}`}
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="Enter email or phone number"
              />
              {errors.contact && (
                <div className="error-message">{errors.contact}</div>
              )}
              <div className="text-xs text-dark-lighter mt-1.5">
                Used for account verification and important notifications
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Logo</label>
              {!logoPreview ? (
                <div className="upload-area" onClick={() => document.getElementById('logo-upload').click()}>
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(3, 38, 37, 0.5)" strokeWidth="2" className="mb-2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <div>Click to upload or drag and drop</div>
                  <div className="text-xs text-dark-lighter mt-1.5">PNG, JPG up to 5MB</div>
                </div>
              ) : (
                <div>
                  <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-[300px] rounded-sm border border-dark-20 mb-2.5" />
                  <div className="flex gap-2.5">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        setLogoPreview(null);
                        setFormData(prev => ({ ...prev, logo: null }));
                        document.getElementById('logo-upload').value = '';
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              {errors.logo && (
                <div className="error-message">{errors.logo}</div>
              )}
            </div>
            
            <div className="action-buttons mt-[30px] pt-5 border-t border-dark-20">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                Create Account
              </Button>
            </div>
            
            {/* Info Box */}
            <div className="info-box mt-5">
              <div className="info-box-title">ℹ️ Account Verification</div>
              <div className="info-box-text">
                Account verification unlocks full features. After creation, you'll be redirected to your account dashboard. Verification can be started later from Profile & Settings.
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}

