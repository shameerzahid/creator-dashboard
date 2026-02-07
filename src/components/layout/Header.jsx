/**
 * Header Component
 * Matches wireframe header styles
 */
import { RoleBadge } from '../common';

export default function Header({ 
  accountName,
  role,
  onAccountSwitch,
  onUserMenuClick,
  showAccountSwitcher = false,
  headerRight,
  onMenuClick,
  className = '',
  ...props 
}) {
  return (
    <div className={`header ${className}`.trim()} {...props}>
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            className="mobile-menu-btn"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <div className="logo">Official Accounts</div>
      </div>
      {headerRight || (
        <div className="header-right">
          {showAccountSwitcher && accountName && (
            <div className="account-switcher" onClick={onAccountSwitch}>
              <span className="hidden sm:inline">{accountName}</span>
              <span className="sm:hidden">Account</span>
              <span className="hidden sm:inline">▼</span>
              {role && <RoleBadge role={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</RoleBadge>}
            </div>
          )}
          {onUserMenuClick && (
            <div className="user-menu" onClick={onUserMenuClick}>
              <span className="hidden sm:inline">User Menu</span>
              <span className="sm:hidden">Menu</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

