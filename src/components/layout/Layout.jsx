/**
 * Layout Component
 * Wraps Header, Sidebar, and Main Content
 * Matches wireframe layout structure
 */
import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({
  children,
  headerProps = {},
  sidebarProps = {},
  showHeader = true,
  showSidebar = true,
  className = '',
  ...props
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen bg-white ${className}`} {...props}>
      {showHeader && (
        <Header
          {...headerProps}
          className="layout-header"
          onMenuClick={showSidebar ? () => setSidebarOpen(!sidebarOpen) : undefined}
        />
      )}
      <div className="layout-container">
        {showSidebar && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-20 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <Sidebar
              {...sidebarProps}
              className={sidebarOpen ? 'open' : ''}
              onItemClick={(id) => {
                setSidebarOpen(false);
                if (sidebarProps.onItemClick) {
                  sidebarProps.onItemClick(id);
                }
              }}
              onLogout={sidebarProps.onLogout}
            />
          </>
        )}
        <div className={`main-content ${!showSidebar ? 'ml-0' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

