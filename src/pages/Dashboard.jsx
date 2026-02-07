/**
 * Main Dashboard (Business Account)
 * Screen 6: Main Dashboard - matches wireframe exactly
 */
import { Button, Card } from '../components/common';
import { Layout } from '../components/layout';

export default function Dashboard({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  stats = {
    followers: 1234,
    totalPosts: 45,
    engagement: 892,
  },
  recentActivity = [],
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
  onCreatePost,
  onStartVerification,
}) {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const defaultActivity = [
    { title: 'New post published', time: '2 hours ago' },
    { title: 'New message received', time: '5 hours ago' },
    { title: 'Menu updated', time: '1 day ago' },
  ];

  const activity = recentActivity.length > 0 ? recentActivity : defaultActivity;

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
        activeItem: 'dashboard',
        onItemClick: onNavClick,
        onLogout: () => window.location.href = '/',
      }}
    >
      {/* Verification Banner */}
      {!isVerified && (
        <Card className="mb-[30px]" style={{ 
          background: 'rgba(239, 68, 68, 0.15)', 
          border: '2px solid #EF4444', 
          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)' 
        }}>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="font-bold text-dark mb-1.5 text-base">
                ⚠️ Account not verified
              </div>
              <div className="text-sm text-dark-light">
                Start verification to unlock all features including Inbox, Menu Configuration, and Mini Apps
              </div>
            </div>
            <Button
              variant="primary"
              onClick={onStartVerification}
              className="whitespace-nowrap ml-5"
            >
              Start Verification
            </Button>
          </div>
        </Card>
      )}

      <h1 className="mb-[30px] text-2xl text-dark">Dashboard</h1>

      {/* Quick Actions */}
      <Card className="mb-[30px]">
        <div className="card-title">Quick Actions</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Create Post */}
          <button
            onClick={onCreatePost}
            className="btn btn-primary w-full text-left justify-start flex items-center p-4 no-underline"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Create Post</span>
          </button>

          {/* Open Inbox (Locked if not verified) */}
          <button
            disabled={!isVerified}
            className={`btn btn-primary w-full text-left justify-start flex items-center p-4 no-underline relative ${
              !isVerified ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ pointerEvents: !isVerified ? 'none' : 'auto' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Open Inbox</span>
            {!isVerified && (
              <span className="absolute top-1.5 right-1.5 bg-danger-light text-danger text-[10px] px-1.5 py-0.5 rounded-[10px] font-semibold">
                🔒 Locked
              </span>
            )}
          </button>

          {/* Configure Menu (Locked if not verified) */}
          <button
            disabled={!isVerified}
            className={`btn btn-primary w-full text-left justify-start flex items-center p-4 no-underline relative ${
              !isVerified ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ pointerEvents: !isVerified ? 'none' : 'auto' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2.5">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
            </svg>
            <span>Configure Menu</span>
            {!isVerified && (
              <span className="absolute top-1.5 right-1.5 bg-danger-light text-danger text-[10px] px-1.5 py-0.5 rounded-[10px] font-semibold">
                🔒 Locked
              </span>
            )}
          </button>

          {/* Mini Apps (Locked if not verified) */}
          <button
            disabled={!isVerified}
            className={`btn btn-primary w-full text-left justify-start flex items-center p-4 no-underline relative ${
              !isVerified ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ pointerEvents: !isVerified ? 'none' : 'auto' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2.5">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <span>Mini Apps</span>
            {!isVerified && (
              <span className="absolute top-1.5 right-1.5 bg-danger-light text-danger text-[10px] px-1.5 py-0.5 rounded-[10px] font-semibold">
                🔒 Locked
              </span>
            )}
          </button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-[30px]">
        <div className="stat-card">
          <div className="stat-value">{stats.followers.toLocaleString()}</div>
          <div className="stat-label">Followers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalPosts}</div>
          <div className="stat-label">Total Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.engagement.toLocaleString()}</div>
          <div className="stat-label">Engagement</div>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="card-title">Recent Activity</div>
        {activity.map((item, index) => (
          <div
            key={index}
            className={`py-2.5 ${index < activity.length - 1 ? 'border-b border-dark-20' : ''}`}
          >
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-dark-lighter mt-1.5">{item.time}</div>
          </div>
        ))}
      </Card>
    </Layout>
  );
}

