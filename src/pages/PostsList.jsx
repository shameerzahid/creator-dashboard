/**
 * Posts List Page
 * Screen 8: Posts List - matches wireframe exactly
 */
import { useState } from 'react';
import { Button, Card, Badge, Modal } from '../components/common';
import { Layout } from '../components/layout';

export default function PostsList({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  posts = [],
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
  onCreatePost,
  onEditPost,
  onDeletePost,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const defaultPosts = [
    {
      id: '1',
      title: 'Welcome to our new store!',
      status: 'published',
      created: '2024-01-15',
    },
    {
      id: '2',
      title: 'New product announcement',
      status: 'draft',
      created: '2024-01-14',
    },
    {
      id: '3',
      title: 'Holiday special offer',
      status: 'published',
      created: '2024-01-10',
    },
  ];

  const postsToShow = posts.length > 0 ? posts : defaultPosts;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      onDeletePost?.(postToDelete);
    }
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const getStatusBadge = (status) => {
    if (status === 'published') return <Badge variant="published">Published</Badge>;
    if (status === 'draft') return <Badge variant="draft">Draft</Badge>;
    if (status === 'archived') return <Badge variant="pending">Archived</Badge>;
    return <Badge variant="draft">{status}</Badge>;
  };

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
        activeItem: 'posts',
        onItemClick: onNavClick,
        onLogout: () => window.location.href = '/',
      }}
    >
      <div className="flex justify-between items-center mb-[30px] flex-wrap gap-4">
        <h1 className="text-2xl text-dark">Posts</h1>
        <Button variant="primary" onClick={onCreatePost}>
          + Create Post
        </Button>
      </div>

      <Card>
        {/* Search and Filters */}
        <div className="flex gap-4 mb-5 flex-wrap items-center">
          <div className="flex-1 min-w-[250px] relative">
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Search posts by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(3, 38, 37, 0.5)"
              strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <div className="flex gap-2.5">
            <select
              className="form-select"
              style={{ width: '150px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <select
              className="form-select"
              style={{ width: '150px' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs mb-5">
          <button
            className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`filter-tab ${activeTab === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveTab('draft')}
          >
            Draft
          </button>
          <button
            className={`filter-tab ${activeTab === 'published' ? 'active' : ''}`}
            onClick={() => setActiveTab('published')}
          >
            Published
          </button>
          <button
            className={`filter-tab ${activeTab === 'archived' ? 'active' : ''}`}
            onClick={() => setActiveTab('archived')}
          >
            Archived
          </button>
        </div>

        {/* Posts Table */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {postsToShow.map((post) => (
              <tr key={post.id}>
                <td>
                  <a
                    href="#"
                    className="clickable-title"
                    onClick={(e) => {
                      e.preventDefault();
                      onEditPost?.(post);
                    }}
                  >
                    {post.title}
                  </a>
                </td>
                <td>{getStatusBadge(post.status)}</td>
                <td>{post.created}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <button
                    className="icon-btn"
                    onClick={() => onEditPost?.(post)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => handleDeleteClick(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPostToDelete(null);
        }}
        title="Delete Post"
        message={
          postToDelete
            ? `Are you sure you want to delete "${postToDelete.title}"? This action cannot be undone.`
            : ''
        }
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setDeleteModalOpen(false);
                setPostToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </>
        }
      />
    </Layout>
  );
}

