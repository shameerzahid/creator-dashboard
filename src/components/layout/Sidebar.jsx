/**
 * Sidebar Component
 * Enhanced professional design with icons
 */
import { 
  HiHome, 
  HiDocumentText, 
  HiCog, 
  HiMenu, 
  HiInbox, 
  HiChartBar, 
  HiDeviceMobile,
  HiLogout,
  HiLockClosed
} from 'react-icons/hi';

const getIcon = (itemId) => {
  const iconMap = {
    dashboard: HiHome,
    posts: HiDocumentText,
    profile: HiCog,
    menu: HiMenu,
    inbox: HiInbox,
    analytics: HiChartBar,
    miniapps: HiDeviceMobile,
  };
  return iconMap[itemId] || HiHome;
};

export default function Sidebar({ 
  items = [],
  activeItem,
  onItemClick,
  onLogout,
  className = '',
  ...props 
}) {
  const handleItemClick = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div className={`w-full md:w-64 bg-white border-r border-dark-20 fixed left-0 top-16 bottom-0 overflow-y-auto z-30 transform transition-transform duration-300 md:transform-none shadow-sm ${className}`.trim()} {...props}>
      <div className="flex flex-col h-full py-2">
        <div className="flex-1 px-2 pt-2">
          {items.map((item) => {
            const isActive = activeItem === item.id;
            const isDisabled = item.disabled;
            const Icon = getIcon(item.id);
            
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 text-sm md:text-base transition-all relative ${
                  isActive
                    ? 'bg-primary text-white font-semibold rounded-lg'
                    : isDisabled
                    ? 'text-dark-lighter opacity-50 cursor-not-allowed rounded-lg'
                    : 'text-dark hover:bg-primary-light hover:text-primary rounded-lg'
                }`}
                onClick={!isDisabled ? (e) => handleItemClick(e, item.id) : undefined}
                disabled={isDisabled}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {isDisabled && (
                  <HiLockClosed className="w-4 h-4 text-danger flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
        {onLogout && (
          <div className="mt-auto border-t border-dark-20 pt-2 px-2 pb-2">
            <button
              className="w-full flex items-center gap-3 px-4 md:px-6 py-3 text-sm md:text-base text-danger hover:bg-danger-light transition-all rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onLogout) {
                  onLogout();
                }
              }}
            >
              <HiLogout className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


