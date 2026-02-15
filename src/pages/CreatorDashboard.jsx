/**
 * Creator Dashboard Page
 * Screen 14: Creator Account Dashboard - Professional production-ready design
 */
import { HiUsers, HiDocumentText, HiHeart, HiClock, HiCheckCircle, HiPencil } from 'react-icons/hi';
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
      <div className="creator-dashboard-page-container">
        {/* Header */}
        <div className="creator-dashboard-header mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Creator Dashboard</h1>
            <p className="text-sm md:text-base text-dark-lighter">Welcome back! Here's your account overview</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="creator-dashboard-stats-grid mb-8">
          <div className="creator-dashboard-stat-card">
            <div className="creator-dashboard-stat-icon-wrapper bg-primary-light">
              <HiUsers className="creator-dashboard-stat-icon text-primary" />
            </div>
            <div className="creator-dashboard-stat-content">
              <div className="creator-dashboard-stat-value">{statsToShow.followers.toLocaleString()}</div>
              <div className="creator-dashboard-stat-label">Followers</div>
              <div className="creator-dashboard-stat-trend">
                <HiHeart className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">Growing</span>
              </div>
            </div>
          </div>
          <div className="creator-dashboard-stat-card">
            <div className="creator-dashboard-stat-icon-wrapper bg-primary-light">
              <HiDocumentText className="creator-dashboard-stat-icon text-primary" />
            </div>
            <div className="creator-dashboard-stat-content">
              <div className="creator-dashboard-stat-value">{statsToShow.posts}</div>
              <div className="creator-dashboard-stat-label">Total Posts</div>
              <div className="creator-dashboard-stat-trend">
                <HiCheckCircle className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">Active</span>
              </div>
            </div>
          </div>
          <div className="creator-dashboard-stat-card">
            <div className="creator-dashboard-stat-icon-wrapper bg-primary-light">
              <HiHeart className="creator-dashboard-stat-icon text-primary" />
            </div>
            <div className="creator-dashboard-stat-content">
              <div className="creator-dashboard-stat-value">{statsToShow.engagement.toLocaleString()}</div>
              <div className="creator-dashboard-stat-label">Engagement</div>
              <div className="creator-dashboard-stat-trend">
                <HiHeart className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">+5.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="creator-dashboard-activity-card">
          <div className="creator-dashboard-activity-header">
            <div className="flex items-center gap-2">
              <HiClock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-dark">Recent Activity</h2>
            </div>
          </div>
          <div className="creator-dashboard-activity-content">
            {activity.length > 0 ? (
              <div className="creator-dashboard-activity-list">
                {activity.map((item, index) => (
                  <div
                    key={index}
                    className={`creator-dashboard-activity-item ${index < activity.length - 1 ? 'border-b border-dark-20' : ''}`}
                  >
                    <div className="creator-dashboard-activity-icon">
                      {item.title.includes('published') ? (
                        <HiDocumentText className="w-5 h-5 text-primary" />
                      ) : item.title.includes('updated') ? (
                        <HiPencil className="w-5 h-5 text-primary" />
                      ) : (
                        <HiCheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="creator-dashboard-activity-content-text">
                      <div className="creator-dashboard-activity-title">{item.title}</div>
                      <div className="creator-dashboard-activity-time">
                        <HiClock className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="creator-dashboard-activity-empty">
                <HiClock className="w-12 h-12 text-dark-lighter mx-auto mb-3" />
                <p className="text-sm text-dark-lighter text-center">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

