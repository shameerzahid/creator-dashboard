/**
 * Account Selection / Dashboard Home
 * Enhanced production-ready design with better visual hierarchy
 */
import { HiOfficeBuilding, HiUser, HiCog, HiExternalLink, HiX } from 'react-icons/hi';
import { Button, Card, Badge, RoleBadge } from '../components/common';
import { Header } from '../components/layout';

export default function AccountSelection({ 
  accounts = [],
  onCreateAccountClick,
  onAccountClick,
  onManageClick,
  onSettingsClick,
  onLeaveClick,
  onUserMenuClick 
}) {
  // Default accounts for demonstration
  const defaultAccounts = [
    {
      id: '1',
      name: 'My Business',
      type: 'business',
      status: 'verified',
      role: 'owner',
      logo: null,
    },
    {
      id: '2',
      name: 'My Creator',
      type: 'creator',
      status: 'pending',
      role: 'admin',
      logo: null,
    },
    {
      id: '3',
      name: 'Another Business',
      type: 'business',
      status: 'verified',
      role: 'support',
      logo: null,
    },
  ];

  const accountsToShow = accounts.length > 0 ? accounts : defaultAccounts;

  const getStatusBadge = (status) => {
    if (status === 'verified') return <Badge variant="verified">Verified</Badge>;
    if (status === 'pending') return <Badge variant="pending">Pending</Badge>;
    return <Badge variant="unverified">Unverified</Badge>;
  };

  const getTypeIcon = (type) => {
    return type === 'business' ? <HiOfficeBuilding className="w-5 h-5" /> : <HiUser className="w-5 h-5" />;
  };

  const getTypeBadge = (type) => {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-light text-primary rounded-sm text-xs font-medium">
        {getTypeIcon(type)}
        {type === 'business' ? 'Business' : 'Creator'}
      </span>
    );
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      owner: 'Full access: Manage all features, settings, staff, and account configuration',
      admin: 'Partial access: Manage posts, content, and analytics; cannot modify settings or staff',
      support: 'Limited access: View and respond to messages/inbox only',
    };
    return descriptions[role] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-lighter to-white">
      <Header
        showAccountSwitcher={false}
        onUserMenuClick={onUserMenuClick}
        className="header-enhanced"
      />
      
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Your Official Accounts</h1>
          <p className="text-sm md:text-base text-dark-lighter">Manage and switch between your accounts</p>
        </div>
        
        {/* Info Box */}
        <div className="mb-6 p-4 md:p-5 bg-primary-light border-l-4 border-primary rounded-md">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 text-primary mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm md:text-base text-dark mb-2">Account Switching & Role Permissions</div>
              <div className="text-xs md:text-sm text-dark-lighter mb-3 leading-relaxed">
                When you switch accounts, the system will automatically reload permissions, features, and navigation based on the selected account type (Business or Creator) and your role.
              </div>
              <div className="text-xs md:text-sm text-dark-lighter">
                <div className="font-semibold mb-2 text-dark">Role Access Levels:</div>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-primary font-semibold">Owner</span> → Full access: Manage all features, settings, staff, and account configuration
                  </div>
                  <div>
                    <span className="text-secondary font-semibold">Admin</span> → Partial access: Manage posts, content, and analytics; cannot modify settings or staff
                  </div>
                  <div>
                    <span className="text-dark-light font-semibold">Support</span> → Limited access: View and respond to messages/inbox only
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Create Account Button */}
        <div className="mb-8">
          <Button 
            variant="primary" 
            onClick={onCreateAccountClick}
            className="px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <span className="mr-2">+</span>
            Create Official Account
          </Button>
        </div>
        
        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountsToShow.map((account) => (
            <div
              key={account.id}
              className="bg-white border border-dark-20 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onAccountClick?.(account);
                }}
                className="no-underline text-inherit block cursor-pointer"
              >
                {/* Account Header */}
                <div className="flex items-start mb-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 mr-4 shadow-md">
                    {account.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg md:text-xl text-dark mb-2 truncate">
                      {account.name}
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                      {getStatusBadge(account.status)}
                      {getTypeBadge(account.type)}
                    </div>
                  </div>
                </div>
                
                {/* Role Section */}
                <div className="mb-5 pt-5 border-t border-dark-20">
                  <div className="text-xs font-medium text-dark-lighter mb-2 uppercase tracking-wide">Your Role</div>
                  <div className="flex items-center gap-2 mb-2">
                    <RoleBadge role={account.role}>
                      {account.role.charAt(0).toUpperCase() + account.role.slice(1)}
                    </RoleBadge>
                  </div>
                  <div className="text-xs text-dark-light leading-relaxed">
                    {getRoleDescription(account.role)}
                  </div>
                </div>
              </a>
              
              {/* Action Buttons */}
              <div 
                className="flex gap-2 pt-5 border-t border-dark-20"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="outline"
                  className="flex-1 px-3 py-2 text-xs flex items-center justify-center gap-1.5"
                  onClick={() => onManageClick?.(account)}
                >
                  <HiExternalLink className="w-3.5 h-3.5" />
                  Manage
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 px-3 py-2 text-xs flex items-center justify-center gap-1.5"
                  onClick={() => onSettingsClick?.(account)}
                >
                  <HiCog className="w-3.5 h-3.5" />
                  Settings
                </Button>
                {account.role !== 'owner' && (
                  <Button
                    variant="leave"
                    className="flex-1 px-3 py-2 text-xs flex items-center justify-center gap-1.5"
                    onClick={() => onLeaveClick?.(account)}
                  >
                    <HiX className="w-3.5 h-3.5" />
                    Leave
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

