/**
 * Analytics Page
 * Screen 12: Analytics - matches wireframe exactly
 */
import { useState } from 'react';
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
      <div className="flex justify-between items-center mb-[30px] flex-wrap gap-4">
        <h1 className="text-2xl text-dark">Analytics</h1>
        <div className="flex items-center gap-2.5 flex-wrap">
          <label className="text-sm text-dark-lighter">Date Range:</label>
          <select
            className="form-select"
            style={{ width: 'auto', minWidth: '150px' }}
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
          {showCustomRange && (
            <div className="flex gap-2 items-center flex-wrap">
              <input
                type="date"
                className="form-input"
                style={{ width: '140px', padding: '8px' }}
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <span className="text-dark-lighter">to</span>
              <input
                type="date"
                className="form-input"
                style={{ width: '140px', padding: '8px' }}
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
              <Button variant="primary" onClick={handleApplyCustomRange} style={{ padding: '8px 16px' }}>
                Apply
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-3 mb-[30px]">
        <div className="stat-card">
          <div className="stat-value">{statsToShow.followers.toLocaleString()}</div>
          <div className="stat-label">Total Followers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statsToShow.engagement.toLocaleString()}</div>
          <div className="stat-label">Total Engagement</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statsToShow.posts}</div>
          <div className="stat-label">Total Posts</div>
        </div>
      </div>

      {/* Post Engagement Chart */}
      <Card>
        <div className="card-title">Post Engagement</div>
        <div className="p-5 bg-white rounded-sm" style={{ minHeight: '300px' }}>
          {/* Bar Chart */}
          <div className="relative flex items-end justify-around" style={{ height: '250px', padding: '20px 0 0 50px', borderBottom: '2px solid rgba(3, 38, 37, 0.2)' }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] text-dark-lighter" style={{ width: '40px', paddingBottom: '2px' }}>
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span style={{ marginBottom: '-2px' }}>0</span>
            </div>
            {/* Chart bars */}
            <div className="flex items-end justify-around w-full gap-4">
              {chartData.map((data, index) => {
                const height = (data.value / maxValue) * 200;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t-sm"
                      style={{ height: `${height}px`, maxWidth: '60px' }}
                    ></div>
                    <div className="text-[11px] text-dark-lighter">{data.day}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <span className="text-xs text-dark-light">Engagement</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Performing Posts */}
      <Card className="mt-5">
        <div className="card-title">Top Performing Posts</div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Post Title</th>
                <th>Engagement</th>
                <th>Views</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {postsToShow.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.engagement}</td>
                <td>{post.views.toLocaleString()}</td>
                <td>{post.date}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
}

