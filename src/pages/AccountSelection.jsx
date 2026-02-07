/**
 * Account Selection / Dashboard Home
 * Screen 3: Account Selection - matches wireframe exactly
 */
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

  const getTypeBadge = (type) => {
    return (
      <span className="badge" style={{ background: 'rgba(13, 148, 136, 0.2)', color: '#0D9488' }}>
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
    <div className="min-h-screen bg-white">
      <Header
        showAccountSwitcher={false}
        onUserMenuClick={onUserMenuClick}
      />
      
      <div className="p-10">
        <h1 className="mb-[30px] text-2xl text-dark">Your Official Accounts</h1>
        
        {/* Info Box */}
        <div className="info-box mb-5">
          <div className="info-box-title">ℹ️ Account Switching & Role Permissions</div>
          <div className="info-box-text mb-2.5">
            When you switch accounts, the system will automatically reload permissions, features, and navigation based on the selected account type (Business or Creator) and your role.
          </div>
          <div className="info-box-text mb-2">
            <strong>Role Access Levels:</strong>
          </div>
          <div className="text-xs text-dark-light leading-relaxed">
            <div className="mb-1.5">
              <span className="text-primary font-semibold">Owner</span> → Full access: Manage all features, settings, staff, and account configuration
            </div>
            <div className="mb-1.5">
              <span className="text-secondary font-semibold">Admin</span> → Partial access: Manage posts, content, and analytics; cannot modify settings or staff
            </div>
            <div>
              <span className="text-dark-light font-semibold">Support</span> → Limited access: View and respond to messages/inbox only
            </div>
          </div>
        </div>
        
        {/* Create Account Button */}
        <div className="mb-[30px]">
          <Button variant="primary" onClick={onCreateAccountClick}>
            + Create Official Account
          </Button>
        </div>
        
        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accountsToShow.map((account) => (
            <Card key={account.id} className="relative">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onAccountClick?.(account);
                }}
                className="no-underline text-inherit block cursor-pointer"
              >
                {/* Account Header */}
                <div className="flex items-center mb-4">
                  <div className="w-[60px] h-[60px] bg-gray-placeholder rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-dark mb-1.5">
                      {account.name}
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                      {getStatusBadge(account.status)}
                      {getTypeBadge(account.type)}
                    </div>
                  </div>
                </div>
                
                {/* Role Section */}
                <div className="mb-4 pt-4 border-t border-dark-20">
                  <div className="text-xs text-dark-lighter mb-1.5">Your Role</div>
                  <div className="flex items-center gap-2 mb-1">
                    <RoleBadge role={account.role}>
                      {account.role.charAt(0).toUpperCase() + account.role.slice(1)}
                    </RoleBadge>
                  </div>
                  <div className="text-xs text-dark-light leading-snug">
                    {getRoleDescription(account.role)}
                  </div>
                </div>
              </a>
              
              {/* Action Buttons */}
              <div 
                className="flex gap-2 pt-4 border-t border-dark-20"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="outline"
                  className="flex-1 px-3 py-2 text-xs"
                  onClick={() => onManageClick?.(account)}
                >
                  Manage
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 px-3 py-2 text-xs"
                  onClick={() => onSettingsClick?.(account)}
                >
                  Settings
                </Button>
                {account.role !== 'owner' && (
                  <Button
                    variant="leave"
                    className="flex-1 px-3 py-2 text-xs"
                    onClick={() => onLeaveClick?.(account)}
                  >
                    Leave
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

