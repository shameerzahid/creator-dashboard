/**
 * Main Dashboard (Business Account)
 * Enhanced production-ready design with better visual hierarchy
 */
import { HiDocumentText, HiInbox, HiCog, HiDeviceMobile, HiUsers, HiChartBar, HiLockClosed, HiExclamationCircle, HiClock } from 'react-icons/hi';
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
        <div className="mb-8 p-5 bg-danger-light border-l-4 border-danger rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 w-6 h-6 text-danger mt-0.5">
                <HiExclamationCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-dark mb-1.5 text-base">
                  Account not verified
                </div>
                <div className="text-sm text-dark-light leading-relaxed">
                  Start verification to unlock all features including Inbox, Menu Configuration, and Mini Apps
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={onStartVerification}
              className="whitespace-nowrap px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl"
            >
              Start Verification
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Dashboard</h1>
        <p className="text-sm md:text-base text-dark-lighter">Welcome back! Here's what's happening with your account.</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 mb-8">
        <h2 className="text-lg md:text-xl font-bold text-dark mb-5">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Create Post */}
          <button
            onClick={onCreatePost}
            className="group relative bg-primary text-white rounded-lg p-5 text-left hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <HiDocumentText className="w-6 h-6" />
              </div>
              <span className="font-semibold text-base">Create Post</span>
            </div>
          </button>

          {/* Open Inbox (Locked if not verified) */}
          <button
            disabled={!isVerified}
            onClick={() => onNavClick?.('inbox')}
            className={`group relative rounded-lg p-5 text-left transition-all ${
              !isVerified
                ? 'bg-gray-100 text-dark-lighter cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                !isVerified ? 'bg-dark-05' : 'bg-white/20'
              }`}>
                <HiInbox className="w-6 h-6" />
              </div>
              <span className="font-semibold text-base">Open Inbox</span>
            </div>
            {!isVerified && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-danger-light text-danger text-xs px-2 py-1 rounded-full font-semibold">
                <HiLockClosed className="w-3 h-3" />
                <span>Locked</span>
              </div>
            )}
          </button>

          {/* Configure Menu (Locked if not verified) */}
          <button
            disabled={!isVerified}
            onClick={() => onNavClick?.('menu')}
            className={`group relative rounded-lg p-5 text-left transition-all ${
              !isVerified
                ? 'bg-gray-100 text-dark-lighter cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                !isVerified ? 'bg-dark-05' : 'bg-white/20'
              }`}>
                <HiCog className="w-6 h-6" />
              </div>
              <span className="font-semibold text-base">Configure Menu</span>
            </div>
            {!isVerified && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-danger-light text-danger text-xs px-2 py-1 rounded-full font-semibold">
                <HiLockClosed className="w-3 h-3" />
                <span>Locked</span>
              </div>
            )}
          </button>

          {/* Mini Apps (Locked if not verified) */}
          <button
            disabled={!isVerified}
            onClick={() => onNavClick?.('miniapps')}
            className={`group relative rounded-lg p-5 text-left transition-all ${
              !isVerified
                ? 'bg-gray-100 text-dark-lighter cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                !isVerified ? 'bg-dark-05' : 'bg-white/20'
              }`}>
                <HiDeviceMobile className="w-6 h-6" />
              </div>
              <span className="font-semibold text-base">Mini Apps</span>
            </div>
            {!isVerified && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-danger-light text-danger text-xs px-2 py-1 rounded-full font-semibold">
                <HiLockClosed className="w-3 h-3" />
                <span>Locked</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
              <HiUsers className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-dark mb-1">{stats.followers.toLocaleString()}</div>
          <div className="text-sm text-dark-lighter">Followers</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
              <HiDocumentText className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-dark mb-1">{stats.totalPosts}</div>
          <div className="text-sm text-dark-lighter">Total Posts</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
              <HiChartBar className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-dark mb-1">{stats.engagement.toLocaleString()}</div>
          <div className="text-sm text-dark-lighter">Engagement</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6">
        <h2 className="text-lg md:text-xl font-bold text-dark mb-5">Recent Activity</h2>
        <div className="space-y-4">
          {activity.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 pb-4 last:pb-0 border-b border-dark-20 last:border-0"
            >
              <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <HiClock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-dark mb-1">{item.title}</div>
                <div className="text-xs text-dark-lighter">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

