/**
 * Creator Dashboard Page
 * Screen 14: Creator Account Dashboard (Limited Features) - matches wireframe exactly
 */
import { Card } from '../components/common';
import { Layout } from '../components/layout';

export default function CreatorDashboard({ 
  accountName = 'My Creator',
  role = 'admin',
  isVerified = false,
  stats = {},
  recentActivity = [],
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
}) {
  const defaultStats = {
    followers: 567,
    posts: 23,
    engagement: 312,
  };

  const defaultActivity = [
    { title: 'New post published', time: '1 day ago' },
    { title: 'Profile updated', time: '3 days ago' },
  ];

  const statsToShow = Object.keys(stats).length > 0 ? stats : defaultStats;
  const activity = recentActivity.length > 0 ? recentActivity : defaultActivity;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'analytics', label: 'Analytics' },
  ];

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
      <h1 className="mb-[30px] text-2xl text-dark">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-3 mb-[30px]">
        <div className="stat-card">
          <div className="stat-value">{statsToShow.followers.toLocaleString()}</div>
          <div className="stat-label">Followers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statsToShow.posts}</div>
          <div className="stat-label">Total Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statsToShow.engagement.toLocaleString()}</div>
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

