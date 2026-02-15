/**
 * Menu Configuration Page
 * Enhanced production-ready design with better UX
 */
import { useState } from 'react';
import { HiMenu, HiPlus, HiPencil, HiTrash, HiChevronRight, HiDotsVertical, HiLink, HiDeviceMobile, HiChat, HiInformationCircle, HiDocumentText } from 'react-icons/hi';
import { Button, Input, Select, Modal } from '../components/common';
import { Layout } from '../components/layout';

export default function MenuConfiguration({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  menuButtons = [],
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
  onAddButton,
  onEditButton,
  onDeleteButton,
}) {
  const [buttonType, setButtonType] = useState('');
  const [formData, setFormData] = useState({
    label: '',
    type: '',
    deeplink: '',
    miniappId: '',
    miniappPage: '',
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [buttonToDelete, setButtonToDelete] = useState(null);

  const defaultButtons = [
    {
      id: '1',
      label: 'View Menu',
      type: 'deeplink',
      action: 'app://menu?x=1',
    },
    {
      id: '2',
      label: 'Order Online',
      type: 'miniapp',
      action: 'APP-001 /home',
    },
    {
      id: '3',
      label: 'Contact Support',
      type: 'chat',
      action: 'Opens chat',
    },
  ];

  const buttonsToShow = menuButtons.length > 0 ? menuButtons : defaultButtons;
  const miniApps = ['Ordering System (APP-001)', 'Loyalty Program (APP-002)'];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const handleButtonTypeChange = (e) => {
    const type = e.target.value;
    setButtonType(type);
    setFormData(prev => ({ ...prev, type }));
  };

  const handleDeleteClick = (button) => {
    setButtonToDelete(button);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (buttonToDelete) {
      onDeleteButton?.(buttonToDelete);
    }
    setDeleteModalOpen(false);
    setButtonToDelete(null);
  };

  const handleAddButton = () => {
    if (!formData.label || !formData.type) {
      alert('Please fill in all required fields');
      return;
    }
    onAddButton?.(formData);
    // Reset form
    setFormData({
      label: '',
      type: '',
      deeplink: '',
      miniappId: '',
      miniappPage: '',
    });
    setButtonType('');
  };

  const getTypeDisplay = (type) => {
    if (type === 'deeplink') return 'Deep Link';
    if (type === 'miniapp') return 'Mini App';
    if (type === 'chat') return 'Support Chat';
    return type;
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
        activeItem: 'menu',
        onItemClick: onNavClick,
        onLogout: () => window.location.href = '/',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Menu Configuration</h1>
          <p className="text-sm md:text-base text-dark-lighter">Configure menu buttons for your account</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => {/* Show add form */}}
          className="px-6 py-3 font-semibold shadow-lg hover:shadow-xl"
        >
          <HiPlus className="w-5 h-5 inline mr-2" />
          Add Menu Button
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left: Menu Preview */}
        <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-dark-20">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <HiMenu className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-dark">Menu Preview</h2>
          </div>
          <div className="p-5 bg-gradient-to-br from-primary-lighter to-white rounded-lg border border-primary/20">
            <div className="text-xs text-dark-lighter mb-4 text-center font-medium uppercase tracking-wide">
              How your menu will appear
            </div>
            <div className="flex flex-col gap-2.5">
              {buttonsToShow.map((button) => (
                <div
                  key={button.id}
                  className="p-3.5 bg-white border border-dark-20 rounded-md flex items-center justify-between shadow-sm hover:shadow-md hover:border-primary transition-all group"
                >
                  <span className="font-medium text-sm text-dark group-hover:text-primary transition-colors">{button.label}</span>
                  <HiChevronRight className="w-4 h-4 text-dark-lighter group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Menu Buttons List */}
        <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-dark-20">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <HiMenu className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-dark">Menu Buttons</h2>
          </div>
          <div className="space-y-3">
            {buttonsToShow.map((button, index) => (
              <div
                key={button.id}
                className="p-4 border border-dark-20 rounded-lg hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="cursor-move text-dark-lighter group-hover:text-primary transition-colors mt-1" title="Drag to reorder">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="9" cy="5" r="1.5"></circle>
                        <circle cx="9" cy="12" r="1.5"></circle>
                        <circle cx="9" cy="19" r="1.5"></circle>
                        <circle cx="15" cy="5" r="1.5"></circle>
                        <circle cx="15" cy="12" r="1.5"></circle>
                        <circle cx="15" cy="19" r="1.5"></circle>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-dark mb-1.5">{button.label}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-light text-primary rounded text-xs font-medium">
                          {button.type === 'deeplink' && <HiLink className="w-3 h-3" />}
                          {button.type === 'miniapp' && <HiDeviceMobile className="w-3 h-3" />}
                          {button.type === 'chat' && <HiChat className="w-3 h-3" />}
                          {getTypeDisplay(button.type)}
                        </span>
                      </div>
                      <div className="text-xs text-dark-lighter font-mono truncate">{button.action}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      className="p-2 border border-dark-lighter rounded-md text-dark hover:bg-primary-light hover:border-primary hover:text-primary transition-all"
                      onClick={() => onEditButton?.(button)}
                      title="Edit"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 border border-danger rounded-md text-danger hover:bg-danger-light transition-all"
                      onClick={() => handleDeleteClick(button)}
                      title="Delete"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add New Menu Button Form */}
      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dark-20">
          <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
            <HiPlus className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-dark">Add New Menu Button</h2>
        </div>
        
        <div className="p-4 bg-primary-light border-l-4 border-primary rounded-md mb-6">
          <div className="flex items-start gap-3">
            <HiInformationCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-dark leading-relaxed">
              <strong>Note:</strong> The Action field changes dynamically based on the selected Button Type. Select a type to see the corresponding configuration fields.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Input
            label="Button Label"
            required
            icon={HiMenu}
            value={formData.label}
            onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
            placeholder="Enter button label"
          />

          <div className="mb-5">
            <label className="block mb-2 font-medium text-dark text-sm">
              Button Type <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none">
                <HiMenu className="w-5 h-5" />
              </div>
              <select
                className="w-full pl-10 pr-9 py-2.5 border border-dark-lighter rounded-sm text-sm text-dark bg-white appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23032625' fill-opacity='0.5' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '12px'
                }}
                value={buttonType}
                onChange={handleButtonTypeChange}
              >
                <option value="">Select type</option>
                <option value="deeplink">Deep link to app screen</option>
                <option value="miniapp">Open mini app</option>
                <option value="chat">Open support chat</option>
              </select>
            </div>
            <div className="text-xs text-dark-lighter mt-1.5">
              Select a type to configure the action
            </div>
          </div>

          {/* Deep Link Configuration */}
          {buttonType === 'deeplink' && (
            <Input
              label="App Route"
              required
              icon={HiLink}
              value={formData.deeplink}
              onChange={(e) => setFormData(prev => ({ ...prev, deeplink: e.target.value }))}
              placeholder="e.g., app://menu?x=1 or app://screen?param=value"
            />
          )}

          {/* Mini App Configuration */}
          {buttonType === 'miniapp' && (
            <>
              <Select
                label="Mini App ID"
                required
                icon={HiDeviceMobile}
                value={formData.miniappId}
                onChange={(e) => setFormData(prev => ({ ...prev, miniappId: e.target.value }))}
                placeholder="Select mini app"
                options={miniApps}
              />
              <Input
                label="Page"
                required
                icon={HiDocumentText}
                value={formData.miniappPage}
                onChange={(e) => setFormData(prev => ({ ...prev, miniappPage: e.target.value }))}
                placeholder="e.g., /home, /products"
              />
              <div className="text-xs text-dark-lighter mt-1.5">
                Enter the page path within the mini app (e.g., /home)
              </div>
            </>
          )}

          {/* Support Chat Configuration */}
          {buttonType === 'chat' && (
            <div className="mb-5">
              <label className="block mb-2 font-medium text-dark text-sm">Action</label>
              <div className="p-4 bg-dark-05 border border-dark-20 rounded-md flex items-center gap-3">
                <HiChat className="w-5 h-5 text-primary" />
                <span className="text-sm text-dark-lighter">Opens chat</span>
              </div>
              <div className="text-xs text-dark-lighter mt-1.5">
                Support chat opens automatically when this button is clicked. No additional configuration needed.
              </div>
            </div>
          )}

          {/* Submenus Future Feature */}
          <div className="mt-6 pt-6 border-t border-dark-20">
            <label className="block mb-3 font-medium text-dark text-sm">Submenus (Future Feature)</label>
            <div className="p-5 bg-dark-03 rounded-lg border-2 border-dashed border-dark-20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <HiDocumentText className="w-6 h-6 text-primary" />
                </div>
                <div className="font-semibold text-base text-dark">Coming Soon</div>
              </div>
              <div className="text-sm text-dark-light mb-3 leading-relaxed">
                Create nested menu items and organize buttons into submenus for better navigation structure.
              </div>
              <div className="text-xs text-dark-lighter italic">
                Example: "Services" → "Delivery", "Pickup", "Catering"
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6 border-t border-dark-20">
          <Button 
            variant="outline" 
            onClick={() => {
              setFormData({
                label: '',
                type: '',
                deeplink: '',
                miniappId: '',
                miniappPage: '',
              });
              setButtonType('');
            }}
            className="px-6 py-2.5"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddButton}
            className="px-8 py-2.5 font-semibold shadow-lg hover:shadow-xl"
          >
            <HiPlus className="w-4 h-4 inline mr-2" />
            Add Button
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setButtonToDelete(null);
        }}
        title="Delete Menu Button"
        message={
          buttonToDelete
            ? `Are you sure you want to delete "${buttonToDelete.label}"? This action cannot be undone.`
            : ''
        }
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setDeleteModalOpen(false);
                setButtonToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </>
        }
      />
    </Layout>
  );
}

