/**
 * Header Component
 * Enhanced professional design
 */
import { HiMenu, HiChevronDown, HiUserCircle } from 'react-icons/hi';
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
    <div className={`flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 bg-white border-b border-dark-20 shadow-sm ${className}`.trim()} {...props}>
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            className="md:hidden p-2 rounded-md hover:bg-primary-light transition-colors text-dark-lighter hover:text-primary"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <HiMenu className="w-6 h-6" />
          </button>
        )}
        <div className="text-xl md:text-2xl font-bold text-dark tracking-tight">
          Official Accounts
        </div>
      </div>
      {headerRight || (
        <div className="flex items-center gap-3">
          {showAccountSwitcher && accountName && (
            <button
              className="flex items-center gap-2 px-4 py-2 border border-dark-lighter rounded-lg bg-white hover:bg-primary-light hover:border-primary transition-all text-secondary font-medium group"
              onClick={onAccountSwitch}
            >
              <span className="hidden sm:inline text-dark">{accountName}</span>
              <span className="sm:hidden text-dark">Account</span>
              <HiChevronDown className="w-4 h-4 text-dark-lighter group-hover:text-primary transition-colors" />
              {role && <RoleBadge role={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</RoleBadge>}
            </button>
          )}
          {onUserMenuClick && (
            <button
              className="flex items-center gap-2 px-4 py-2 border border-dark-lighter rounded-lg bg-white hover:bg-primary-light hover:border-primary transition-all text-secondary font-medium"
              onClick={onUserMenuClick}
            >
              <HiUserCircle className="w-5 h-5" />
              <span className="hidden sm:inline">User Menu</span>
              <span className="sm:hidden">Menu</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

