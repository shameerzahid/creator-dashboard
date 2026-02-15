/**
 * Analytics Page
 * Screen 12: Analytics - Professional production-ready design
 */
import { useState } from 'react';
import { HiChartBar, HiUsers, HiHeart, HiDocumentText, HiCalendar, HiTrendingUp, HiEye, HiClock } from 'react-icons/hi';
import { Button, Card, Select } from '../components/common';
import { Layout } from '../components/layout';

export default function Analytics({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  stats = {},
  topPosts = [],
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
}) {
  const [dateRange, setDateRange] = useState('7days');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const defaultStats = {
    followers: 1234,
    engagement: 892,
    posts: 45,
  };

  const defaultTopPosts = [
    {
      id: '1',
      title: 'Welcome to our new store!',
      engagement: 245,
      views: 1234,
      date: '2024-01-15',
    },
    {
      id: '2',
      title: 'Holiday special offer',
      engagement: 189,
      views: 987,
      date: '2024-01-10',
    },
    {
      id: '3',
      title: 'New product announcement',
      engagement: 156,
      views: 756,
      date: '2024-01-08',
    },
  ];

  const statsToShow = Object.keys(stats).length > 0 ? stats : defaultStats;
  const postsToShow = topPosts.length > 0 ? topPosts : defaultTopPosts;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const handleDateRangeChange = (e) => {
    const value = e.target.value;
    setDateRange(value);
    setShowCustomRange(value === 'custom');
  };

  const handleApplyCustomRange = () => {
    // Apply custom date range
    console.log('Apply custom range:', customStartDate, customEndDate);
  };

  // Chart data for the week
  const chartData = [
    { day: 'Mon', value: 120 },
    { day: 'Tue', value: 180 },
    { day: 'Wed', value: 140 },
    { day: 'Thu', value: 200 },
    { day: 'Fri', value: 160 },
    { day: 'Sat', value: 100 },
    { day: 'Sun', value: 80 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

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
        activeItem: 'analytics',
        onItemClick: onNavClick,
        onLogout: () => window.location.href = '/',
      }}
    >
      <div className="analytics-page-container">
        {/* Header */}
        <div className="analytics-header mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Analytics</h1>
            <p className="text-sm md:text-base text-dark-lighter">Track your account performance and engagement metrics</p>
          </div>
          <div className="analytics-date-filter">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <HiCalendar className="w-5 h-5 text-primary" />
                <label className="text-sm font-medium text-dark">Date Range:</label>
              </div>
              <div className="relative">
                <select
                  className="form-select pl-10 pr-9"
                  style={{ width: 'auto', minWidth: '160px', padding: '10px 35px 10px 40px' }}
                  value={dateRange}
                  onChange={handleDateRangeChange}
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="6months">Last 6 months</option>
                  <option value="year">Last year</option>
                  <option value="all">All time</option>
                  <option value="custom">Custom range</option>
                </select>
                <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-lighter pointer-events-none" />
              </div>
              {showCustomRange && (
                <div className="flex gap-2 items-center flex-wrap bg-white p-3 rounded-lg border border-dark-20">
                  <input
                    type="date"
                    className="form-input"
                    style={{ width: '140px', padding: '8px 12px' }}
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                  />
                  <span className="text-dark-lighter text-sm">to</span>
                  <input
                    type="date"
                    className="form-input"
                    style={{ width: '140px', padding: '8px 12px' }}
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleApplyCustomRange} className="px-4 py-2">
                    Apply
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="analytics-stats-grid mb-8">
          <div className="analytics-stat-card">
            <div className="analytics-stat-icon-wrapper bg-primary-light">
              <HiUsers className="analytics-stat-icon text-primary" />
            </div>
            <div className="analytics-stat-content">
              <div className="analytics-stat-value">{statsToShow.followers.toLocaleString()}</div>
              <div className="analytics-stat-label">Total Followers</div>
              <div className="analytics-stat-trend">
                <HiTrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">+12.5%</span>
              </div>
            </div>
          </div>
          <div className="analytics-stat-card">
            <div className="analytics-stat-icon-wrapper bg-primary-light">
              <HiHeart className="analytics-stat-icon text-primary" />
            </div>
            <div className="analytics-stat-content">
              <div className="analytics-stat-value">{statsToShow.engagement.toLocaleString()}</div>
              <div className="analytics-stat-label">Total Engagement</div>
              <div className="analytics-stat-trend">
                <HiTrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">+8.2%</span>
              </div>
            </div>
          </div>
          <div className="analytics-stat-card">
            <div className="analytics-stat-icon-wrapper bg-primary-light">
              <HiDocumentText className="analytics-stat-icon text-primary" />
            </div>
            <div className="analytics-stat-content">
              <div className="analytics-stat-value">{statsToShow.posts}</div>
              <div className="analytics-stat-label">Total Posts</div>
              <div className="analytics-stat-trend">
                <HiTrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">+3 this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Engagement Chart */}
        <div className="analytics-chart-card mb-8">
          <div className="analytics-chart-header">
            <div className="flex items-center gap-2">
              <HiChartBar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-dark">Post Engagement</h2>
            </div>
          </div>
          <div className="analytics-chart-content">
            {/* Bar Chart */}
            <div className="analytics-chart-wrapper">
              {/* Y-axis labels */}
              <div className="analytics-chart-y-axis">
                <span>200</span>
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>
              {/* Chart bars */}
              <div className="analytics-chart-bars">
                {chartData.map((data, index) => {
                  const height = (data.value / maxValue) * 200;
                  return (
                    <div key={index} className="analytics-chart-bar-group">
                      <div className="analytics-chart-bar-container">
                        <div
                          className="analytics-chart-bar"
                          style={{ height: `${height}px` }}
                        >
                          <div className="analytics-chart-bar-value">{data.value}</div>
                        </div>
                      </div>
                      <div className="analytics-chart-bar-label">{data.day}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Legend */}
            <div className="analytics-chart-legend">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                <span className="text-xs text-dark-light font-medium">Engagement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="analytics-posts-card">
          <div className="analytics-posts-header">
            <div className="flex items-center gap-2">
              <HiDocumentText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-dark">Top Performing Posts</h2>
            </div>
          </div>
          <div className="analytics-posts-content">
            <div className="table-wrapper">
              <table className="analytics-posts-table">
                <thead>
                  <tr>
                    <th>Post Title</th>
                    <th>
                      <div className="flex items-center gap-1.5">
                        <HiHeart className="w-4 h-4" />
                        Engagement
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center gap-1.5">
                        <HiEye className="w-4 h-4" />
                        Views
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center gap-1.5">
                        <HiClock className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {postsToShow.map((post, index) => (
                    <tr key={post.id} className={index === 0 ? 'analytics-top-post' : ''}>
                      <td className="analytics-post-title">
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <span className="analytics-rank-badge">#1</span>
                          )}
                          <span className="font-medium text-dark">{post.title}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <HiHeart className="w-4 h-4 text-primary" />
                          <span className="font-medium text-dark">{post.engagement}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <HiEye className="w-4 h-4 text-dark-lighter" />
                          <span className="text-dark-lighter">{post.views.toLocaleString()}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <HiClock className="w-4 h-4 text-dark-lighter" />
                          <span className="text-dark-lighter">{post.date}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

