/**
 * Menu Configuration Page
 * Screen 10: Menu Configuration - matches wireframe exactly
 */
import { useState } from 'react';
import { Button, Input, Select, Card, Modal } from '../components/common';
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
      <div className="flex justify-between items-center mb-[30px] flex-wrap gap-4">
        <h1 className="text-2xl text-dark">Menu Configuration</h1>
        <Button variant="primary" onClick={() => {/* Show add form */}}>
          + Add Menu Button
        </Button>
      </div>

      {/* Menu Preview */}
      <Card className="mb-[30px]">
        <div className="card-title">Menu Preview</div>
        <div className="p-5 bg-dark-03 rounded-lg border-2 border-dashed border-dark-20">
          <div className="text-xs text-dark-lighter mb-4 text-center">
            How your menu will appear in the app
          </div>
          <div className="flex flex-col gap-2.5 max-w-[300px] mx-auto">
            {buttonsToShow.map((button) => (
              <div
                key={button.id}
                className="p-3 px-4 bg-white border border-dark-20 rounded-md flex items-center justify-between"
              >
                <span className="font-medium text-dark">{button.label}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(3, 38, 37, 0.5)"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Menu Buttons Table */}
      <Card>
        <div className="card-title">Menu Buttons</div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Button Label</th>
                <th>Type</th>
                <th>Action</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {buttonsToShow.map((button) => (
              <tr key={button.id}>
                <td>
                  <div className="drag-handle" title="Drag to reorder">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="9" cy="5" r="1"></circle>
                      <circle cx="9" cy="12" r="1"></circle>
                      <circle cx="9" cy="19" r="1"></circle>
                      <circle cx="15" cy="5" r="1"></circle>
                      <circle cx="15" cy="12" r="1"></circle>
                      <circle cx="15" cy="19" r="1"></circle>
                    </svg>
                  </div>
                </td>
                <td>{button.label}</td>
                <td>{getTypeDisplay(button.type)}</td>
                <td>{button.action}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <button
                    className="icon-btn"
                    onClick={() => onEditButton?.(button)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => handleDeleteClick(button)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add New Menu Button Form */}
      <Card className="mt-[30px]">
        <div className="card-title">Add New Menu Button</div>
        
        <div className="info-box mb-5">
          <div className="text-sm text-dark-lighter">
            <strong>Note:</strong> The Action field changes dynamically based on the selected Button Type. Select a type to see the corresponding configuration fields.
          </div>
        </div>

        <Input
          label="Button Label"
          required
          value={formData.label}
          onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
          placeholder="Enter button label"
        />

        <div className="form-group">
          <label className="form-label">
            Button Type <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={buttonType}
            onChange={handleButtonTypeChange}
          >
            <option value="">Select type</option>
            <option value="deeplink">Deep link to app screen</option>
            <option value="miniapp">Open mini app</option>
            <option value="chat">Open support chat</option>
          </select>
          <div className="text-xs text-dark-lighter mt-1.5">
            Select a type to configure the action
          </div>
        </div>

        {/* Deep Link Configuration */}
        {buttonType === 'deeplink' && (
          <Input
            label="App Route"
            required
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
              value={formData.miniappId}
              onChange={(e) => setFormData(prev => ({ ...prev, miniappId: e.target.value }))}
              placeholder="Select mini app"
              options={miniApps}
            />
            <Input
              label="Page"
              required
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
          <div className="form-group">
            <label className="form-label">Action</label>
            <div className="p-2.5 bg-dark-05 border border-dark-20 rounded-sm text-dark-lighter">
              Opens chat
            </div>
            <div className="text-xs text-dark-lighter mt-1.5">
              Support chat opens automatically when this button is clicked. No additional configuration needed.
            </div>
          </div>
        )}

        {/* Submenus Future Feature */}
        <div className="form-group mt-5 pt-5 border-t border-dark-20">
          <label className="form-label">Submenus (Future Feature)</label>
          <div className="p-4 bg-dark-03 rounded-sm border border-dashed border-dark-20">
            <div className="flex items-center mb-2.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(3, 38, 37, 0.5)"
                strokeWidth="2"
                className="mr-2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <div className="font-semibold text-dark text-sm">Coming Soon</div>
            </div>
            <div className="text-sm text-dark-light mb-2.5">
              Create nested menu items and organize buttons into submenus for better navigation structure.
            </div>
            <div className="text-xs text-dark-lighter italic">
              Example: "Services" → "Delivery", "Pickup", "Catering"
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Button variant="secondary" onClick={() => {
            setFormData({
              label: '',
              type: '',
              deeplink: '',
              miniappId: '',
              miniappPage: '',
            });
            setButtonType('');
          }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddButton}>
            Add Button
          </Button>
        </div>
      </Card>

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

