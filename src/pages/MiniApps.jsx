/**
 * Mini Apps Page
 * Screen 13: Mini App Management - Professional production-ready design
 */
import { useState } from 'react';
import { HiDeviceMobile, HiPlus, HiEye, HiPencil, HiCloudUpload, HiPhotograph, HiCode, HiLink, HiCheckCircle, HiClock } from 'react-icons/hi';
import { Button, Input, Textarea, Select, Card, Badge } from '../components/common';
import { Layout } from '../components/layout';

export default function MiniApps({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  miniApps = [],
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
  onRegisterApp,
  onViewApp,
  onEditApp,
}) {
  const [activeTab, setActiveTab] = useState('registered');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '1.0.0',
    icon: null,
    bundleUrl: '',
    bundleFile: null,
    accountId: '',
  });
  const [iconPreview, setIconPreview] = useState(null);
  const [bundleFilePreview, setBundleFilePreview] = useState(null);

  const defaultApps = [
    {
      id: '1',
      name: 'Ordering System',
      version: 'v1.2.3',
      status: 'active',
      boundToAccount: true,
    },
    {
      id: '2',
      name: 'Loyalty Program',
      version: 'v2.0.1',
      status: 'pending',
      boundToAccount: false,
    },
  ];

  const appsToShow = miniApps.length > 0 ? miniApps : defaultApps;
  const accounts = ['My Business (Current)', 'Another Business Account'];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Icon file size must be less than 2MB');
        return;
      }
      setFormData(prev => ({ ...prev, icon: file }));
      const reader = new FileReader();
      reader.onload = (e) => setIconPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBundleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, bundleFile: file }));
      setBundleFilePreview(file.name);
    }
  };

  const handleRemoveIcon = () => {
    setFormData(prev => ({ ...prev, icon: null }));
    setIconPreview(null);
    document.getElementById('icon-input')?.setAttribute('value', '');
  };

  const handleRemoveBundle = () => {
    setFormData(prev => ({ ...prev, bundleFile: null }));
    setBundleFilePreview(null);
    document.getElementById('bundle-input')?.setAttribute('value', '');
  };

  const handleRegister = () => {
    if (!formData.name || !formData.version || (!formData.bundleUrl && !formData.bundleFile) || !formData.accountId) {
      alert('Please fill in all required fields');
      return;
    }
    onRegisterApp?.(formData);
    // Reset form
    setFormData({
      name: '',
      description: '',
      version: '1.0.0',
      icon: null,
      bundleUrl: '',
      bundleFile: null,
      accountId: '',
    });
    setIconPreview(null);
    setBundleFilePreview(null);
    setActiveTab('registered');
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-light text-primary rounded text-xs font-medium">
          <HiCheckCircle className="w-3.5 h-3.5" />
          Active
        </span>
      );
    }
    if (status === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
          <HiClock className="w-3.5 h-3.5" />
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
        {status}
      </span>
    );
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
        activeItem: 'miniapps',
        onItemClick: onNavClick,
        onLogout: () => window.location.href = '/',
      }}
    >
      <div className="miniapps-page-container">
        {/* Header */}
        <div className="miniapps-header mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Mini Apps</h1>
            <p className="text-sm md:text-base text-dark-lighter">Register and manage mini apps for your account</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="miniapps-tabs mb-6">
          <button
            className={`miniapps-tab ${activeTab === 'registered' ? 'active' : ''}`}
            onClick={() => setActiveTab('registered')}
          >
            <HiDeviceMobile className="w-4 h-4" />
            <span>Registered Apps</span>
          </button>
          <button
            className={`miniapps-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <HiPlus className="w-4 h-4" />
            <span>Register New</span>
          </button>
        </div>

        {/* Registered Apps Tab */}
        {activeTab === 'registered' && (
          <div className="miniapps-registered-card">
            <div className="miniapps-card-header">
              <div className="flex items-center gap-2">
                <HiDeviceMobile className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-dark">Registered Mini Apps</h2>
              </div>
            </div>
            <div className="miniapps-card-content">
              <div className="table-wrapper">
                <table className="miniapps-table">
                  <thead>
                    <tr>
                      <th>Mini App Name</th>
                      <th>Version</th>
                      <th>Status</th>
                      <th>Bound to Account</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appsToShow.map((app) => (
                      <tr key={app.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <HiDeviceMobile className="w-5 h-5 text-primary" />
                            <span className="font-medium text-dark">{app.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="text-sm text-dark-lighter font-mono">{app.version}</span>
                        </td>
                        <td>{getStatusBadge(app.status)}</td>
                        <td>
                          {app.boundToAccount ? (
                            <span className="flex items-center gap-1 text-sm text-primary">
                              <HiCheckCircle className="w-4 h-4" />
                              Yes
                            </span>
                          ) : (
                            <span className="text-sm text-dark-lighter">No</span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button
                              className="miniapps-action-btn"
                              onClick={() => onViewApp?.(app)}
                            >
                              <HiEye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            <button
                              className="miniapps-action-btn"
                              onClick={() => onEditApp?.(app)}
                            >
                              <HiPencil className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Register New Tab */}
        {activeTab === 'register' && (
          <div className="miniapps-register-card">
            <div className="miniapps-card-header">
              <div className="flex items-center gap-2">
                <HiPlus className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-dark">Register New Mini App</h2>
              </div>
            </div>
            <div className="miniapps-card-content">
              <div className="miniapps-info-box mb-6">
                <div className="flex items-start gap-3">
                  <HiDeviceMobile className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-dark leading-relaxed">
                    <strong>Note:</strong> Register and manage mini apps. Mini apps are built externally by third-party developers and can be integrated into your account.
                  </div>
                </div>
              </div>

              <Input
                label="Mini App Name"
                required
                icon={HiDeviceMobile}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter mini app name"
              />

              <Textarea
                label="Description"
                icon={HiCode}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter mini app description"
                rows={4}
              />

              <Input
                label="Version"
                required
                icon={HiCode}
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                placeholder="e.g., 1.0.0"
              />
              <div className="text-xs text-dark-lighter mt-1.5 mb-4">
                Follow semantic versioning (major.minor.patch)
              </div>

              <div className="form-group">
                <label className="form-label">
                  <HiPhotograph className="w-4 h-4 inline mr-1.5" />
                  Icon
                </label>
                {!iconPreview ? (
                  <div
                    className="miniapps-upload-area"
                    onClick={() => document.getElementById('icon-input')?.click()}
                  >
                    <input
                      type="file"
                      id="icon-input"
                      accept="image/*"
                      onChange={handleIconUpload}
                      className="hidden"
                    />
                    <HiCloudUpload className="w-12 h-12 text-primary mb-3" />
                    <div className="font-medium text-dark mb-1">Click to upload icon</div>
                    <div className="text-xs text-dark-lighter">
                      PNG, JPG, SVG up to 2MB
                    </div>
                  </div>
                ) : (
                  <div className="miniapps-icon-preview">
                    <div className="miniapps-icon-preview-wrapper">
                      <img
                        src={iconPreview}
                        alt="Icon preview"
                        className="miniapps-icon-preview-image"
                      />
                      <button
                        className="miniapps-icon-preview-remove"
                        onClick={handleRemoveIcon}
                      >
                        <HiPencil className="w-4 h-4" />
                      </button>
                    </div>
                    <Button variant="outline" onClick={handleRemoveIcon} className="mt-3">
                      Remove Icon
                    </Button>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <HiLink className="w-4 h-4 inline mr-1.5" />
                  Hosted Bundle URL or Package Upload <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <Input
                    type="url"
                    icon={HiLink}
                    placeholder="https://example.com/bundle.js or upload package"
                    value={formData.bundleUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, bundleUrl: e.target.value }))}
                  />
                </div>
                {!bundleFilePreview ? (
                  <div
                    className="miniapps-upload-area"
                    onClick={() => document.getElementById('bundle-input')?.click()}
                  >
                    <input
                      type="file"
                      id="bundle-input"
                      accept=".zip,.tar,.js"
                      onChange={handleBundleUpload}
                      className="hidden"
                    />
                    <HiCloudUpload className="w-12 h-12 text-primary mb-3" />
                    <div className="font-medium text-dark mb-1">Or drag and drop package file here</div>
                    <div className="text-xs text-dark-lighter">
                      ZIP, TAR, or bundle file
                    </div>
                  </div>
                ) : (
                  <div className="miniapps-bundle-preview">
                    <div className="miniapps-bundle-preview-box">
                      <HiCode className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-dark">{bundleFilePreview}</span>
                    </div>
                    <Button variant="outline" onClick={handleRemoveBundle} className="mt-3">
                      Remove Bundle
                    </Button>
                  </div>
                )}
              </div>

              <Select
                label="Assign to Account"
                required
                icon={HiDeviceMobile}
                value={formData.accountId}
                onChange={(e) => setFormData(prev => ({ ...prev, accountId: e.target.value }))}
                placeholder="Select account"
                options={accounts}
              />
              <div className="text-xs text-dark-lighter mt-1.5 mb-6">
                Select which account this mini app will be available for
              </div>

              <div className="miniapps-form-actions">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setActiveTab('registered');
                    setFormData({
                      name: '',
                      description: '',
                      version: '1.0.0',
                      icon: null,
                      bundleUrl: '',
                      bundleFile: null,
                      accountId: '',
                    });
                    setIconPreview(null);
                    setBundleFilePreview(null);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleRegister} className="px-8">
                  <HiPlus className="w-4 h-4 inline mr-2" />
                  Register Mini App
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

