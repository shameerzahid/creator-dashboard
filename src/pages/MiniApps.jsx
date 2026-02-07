/**
 * Mini Apps Page
 * Screen 13: Mini App Management - matches wireframe exactly
 */
import { useState } from 'react';
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
    if (status === 'active') return <Badge variant="verified">Active</Badge>;
    if (status === 'pending') return <Badge variant="pending">Pending</Badge>;
    return <Badge variant="pending">{status}</Badge>;
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
      <h1 className="mb-[30px] text-2xl text-dark">Mini Apps</h1>

      {/* Tabs */}
      <div className="filter-tabs mb-5">
        <button
          className={`filter-tab ${activeTab === 'registered' ? 'active' : ''}`}
          onClick={() => setActiveTab('registered')}
        >
          Registered Apps
        </button>
        <button
          className={`filter-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register New
        </button>
      </div>

      {/* Registered Apps Tab */}
      {activeTab === 'registered' && (
        <Card>
          <div className="card-title">Registered Mini Apps</div>
          <div className="table-wrapper">
            <table className="table">
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
                  <td>{app.name}</td>
                  <td>{app.version}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>{app.boundToAccount ? 'Yes' : 'No'}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      className="icon-btn"
                      onClick={() => onViewApp?.(app)}
                      style={{ marginRight: '8px' }}
                    >
                      View
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => onEditApp?.(app)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Card>
      )}

      {/* Register New Tab */}
      {activeTab === 'register' && (
        <Card>
          <div className="card-title">Register New Mini App</div>
          <div className="text-sm text-dark-lighter mb-5">
            Register and manage mini apps. Mini apps are built externally by third-party developers.
          </div>

          <Input
            label="Mini App Name"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter mini app name"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter mini app description"
            rows={4}
          />

          <Input
            label="Version"
            required
            value={formData.version}
            onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
            placeholder="e.g., 1.0.0"
          />
          <div className="text-xs text-dark-lighter mt-1.5">
            Follow semantic versioning (major.minor.patch)
          </div>

          <div className="form-group">
            <label className="form-label">Icon</label>
            {!iconPreview ? (
              <div
                className="upload-area p-5"
                onClick={() => document.getElementById('icon-input')?.click()}
              >
                <input
                  type="file"
                  id="icon-input"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="hidden"
                />
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(3, 38, 37, 0.5)"
                  strokeWidth="2"
                  className="mb-2.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <div>Click to upload icon</div>
                <div className="text-xs text-dark-lighter mt-1.5">
                  PNG, JPG, SVG up to 2MB
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={iconPreview}
                  alt="Icon preview"
                  className="max-w-[100px] max-h-[100px] rounded-sm border border-dark-20 mb-2.5"
                />
                <div className="flex gap-2.5">
                  <Button variant="outline" onClick={handleRemoveIcon}>
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Hosted Bundle URL or Package Upload <span className="text-danger">*</span>
            </label>
            <div className="mb-2.5">
              <input
                type="url"
                className="form-input"
                placeholder="https://example.com/bundle.js or upload package"
                value={formData.bundleUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, bundleUrl: e.target.value }))}
              />
            </div>
            {!bundleFilePreview ? (
              <div
                className="upload-area p-5"
                onClick={() => document.getElementById('bundle-input')?.click()}
              >
                <input
                  type="file"
                  id="bundle-input"
                  accept=".zip,.tar,.js"
                  onChange={handleBundleUpload}
                  className="hidden"
                />
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(3, 38, 37, 0.5)"
                  strokeWidth="2"
                  className="mb-2.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <div>Or drag and drop package file here</div>
                <div className="text-xs text-dark-lighter mt-1.5">
                  ZIP, TAR, or bundle file
                </div>
              </div>
            ) : (
              <div>
                <div className="p-2.5 bg-dark-03 border border-dark-20 rounded-sm mb-2.5">
                  {bundleFilePreview}
                </div>
                <Button variant="outline" onClick={handleRemoveBundle}>
                  Remove
                </Button>
              </div>
            )}
          </div>

          <Select
            label="Assign to Account"
            required
            value={formData.accountId}
            onChange={(e) => setFormData(prev => ({ ...prev, accountId: e.target.value }))}
            placeholder="Select account"
            options={accounts}
          />
          <div className="text-xs text-dark-lighter mt-1.5">
            Select which account this mini app will be available for
          </div>

          <div className="action-buttons">
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
            <Button variant="primary" onClick={handleRegister}>
              Register Mini App
            </Button>
          </div>
        </Card>
      )}
    </Layout>
  );
}

