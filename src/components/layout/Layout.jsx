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
    <div className={`min-h-screen bg-gradient-to-br from-white via-primary-lighter to-white ${className}`} {...props}>
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-dark-20 shadow-sm">
          <Header
            {...headerProps}
            onMenuClick={showSidebar ? () => setSidebarOpen(!sidebarOpen) : undefined}
          />
        </div>
      )}
      <div className="flex pt-16">
        {showSidebar && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <Sidebar
              {...sidebarProps}
              className={sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
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
        <div className={`flex-1 min-h-screen ${showSidebar ? 'md:ml-64' : ''} transition-all duration-300`}>
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

