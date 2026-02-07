/**
 * Sidebar Component
 * Matches wireframe sidebar styles
 */
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
    <div className={`sidebar ${className}`} {...props}>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          {items.map((item) => {
            const isActive = activeItem === item.id;
            const isDisabled = item.disabled;
            
            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={!isDisabled ? (e) => handleItemClick(e, item.id) : undefined}
                style={isDisabled ? { position: 'relative', pointerEvents: 'none' } : { cursor: 'pointer' }}
              >
                {item.label}
                {isDisabled && (
                  <span style={{ position: 'absolute', right: '10px', fontSize: '10px', color: '#EF4444' }}>
                    🔒
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {onLogout && (
          <div className="mt-auto border-t border-dark-20">
            <div
              className="nav-item text-danger hover:bg-danger-light cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onLogout) {
                  onLogout();
                }
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


