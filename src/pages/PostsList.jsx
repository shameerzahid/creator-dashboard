/**
 * Posts List Page
 * Enhanced production-ready design with better UX
 */
import { useState } from 'react';
import { HiSearch, HiDocumentText, HiPencil, HiTrash, HiPlus, HiFilter, HiSortAscending } from 'react-icons/hi';
import { Button, Badge, Modal } from '../components/common';
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Posts</h1>
          <p className="text-sm md:text-base text-dark-lighter">Manage and organize your posts</p>
        </div>
        <Button 
          variant="primary" 
          onClick={onCreatePost}
          className="px-6 py-3 font-semibold shadow-lg hover:shadow-xl"
        >
          <HiPlus className="w-5 h-5 inline mr-2" />
          Create Post
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 md:p-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 min-w-[250px] relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none">
              <HiSearch className="w-5 h-5" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2.5 border border-dark-lighter rounded-sm text-sm text-dark placeholder:text-dark-lightest transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Search posts by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2.5">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none z-10">
                <HiFilter className="w-4 h-4" />
              </div>
              <select
                className="pl-9 pr-9 py-2.5 border border-dark-lighter rounded-sm text-sm text-dark bg-white appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                style={{
                  width: '150px',
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23032625' fill-opacity='0.5' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '12px'
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-lighter pointer-events-none z-10">
                <HiSortAscending className="w-4 h-4" />
              </div>
              <select
                className="pl-9 pr-9 py-2.5 border border-dark-lighter rounded-sm text-sm text-dark bg-white appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                style={{
                  width: '150px',
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23032625' fill-opacity='0.5' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '12px'
                }}
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
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-0 border-b border-dark-20 mb-6">
          <button
            className={`px-4 md:px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === 'all'
                ? 'text-primary border-primary'
                : 'text-dark-lighter border-transparent hover:text-dark hover:border-dark-20'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-4 md:px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === 'draft'
                ? 'text-primary border-primary'
                : 'text-dark-lighter border-transparent hover:text-dark hover:border-dark-20'
            }`}
            onClick={() => setActiveTab('draft')}
          >
            Draft
          </button>
          <button
            className={`px-4 md:px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === 'published'
                ? 'text-primary border-primary'
                : 'text-dark-lighter border-transparent hover:text-dark hover:border-dark-20'
            }`}
            onClick={() => setActiveTab('published')}
          >
            Published
          </button>
          <button
            className={`px-4 md:px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === 'archived'
                ? 'text-primary border-primary'
                : 'text-dark-lighter border-transparent hover:text-dark hover:border-dark-20'
            }`}
            onClick={() => setActiveTab('archived')}
          >
            Archived
          </button>
        </div>

        {/* Posts Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-dark-20">
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary bg-primary-lighter">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary bg-primary-lighter">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary bg-primary-lighter">Created</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary bg-primary-lighter">Actions</th>
              </tr>
            </thead>
            <tbody>
            {postsToShow.map((post, index) => (
              <tr 
                key={post.id}
                className={`border-b border-dark-20 hover:bg-primary-lighter transition-colors ${
                  index === postsToShow.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-4 py-4">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-dark font-medium hover:text-primary transition-colors no-underline"
                    onClick={(e) => {
                      e.preventDefault();
                      onEditPost?.(post);
                    }}
                  >
                    <HiDocumentText className="w-4 h-4 text-dark-lighter" />
                    {post.title}
                  </a>
                </td>
                <td className="px-4 py-4">{getStatusBadge(post.status)}</td>
                <td className="px-4 py-4 text-sm text-dark-lighter">{post.created}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-dark-lighter rounded-md text-sm text-dark hover:bg-primary-light hover:border-primary hover:text-primary transition-all"
                      onClick={() => onEditPost?.(post)}
                    >
                      <HiPencil className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-danger rounded-md text-sm text-danger hover:bg-danger-light transition-all"
                      onClick={() => handleDeleteClick(post)}
                    >
                      <HiTrash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

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

