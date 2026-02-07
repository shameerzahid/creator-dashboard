/**
 * Post Editor Page
 * Screen 9: Post Editor - matches wireframe exactly
 */
import { useState } from 'react';
import { Button, Input, Textarea, Card, Badge } from '../components/common';
import { Layout } from '../components/layout';

export default function PostEditor({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  post = null, // null for new post, object for editing
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
  onSaveDraft,
  onPublish,
  onPreview,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    media: null,
    status: post?.status || 'draft',
  });
  const [mediaPreview, setMediaPreview] = useState(post?.mediaUrl || null);
  const [titleCharCount, setTitleCharCount] = useState(post?.title?.length || 0);
  const [contentCharCount, setContentCharCount] = useState(post?.content?.length || 0);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setFormData(prev => ({ ...prev, title: value }));
      setTitleCharCount(value.length);
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2000) {
      setFormData(prev => ({ ...prev, content: value }));
      setContentCharCount(value.length);
    }
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, media: file }));
      const reader = new FileReader();
      reader.onload = (e) => setMediaPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setFormData(prev => ({ ...prev, media: null }));
    setMediaPreview(null);
    document.getElementById('file-input')?.setAttribute('value', '');
  };

  const handleSaveDraft = () => {
    onSaveDraft?.(formData);
  };

  const handlePublish = () => {
    if (formData.content.length < 50) {
      alert('Content must be at least 50 characters');
      return;
    }
    onPublish?.(formData);
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
      <h1 className="mb-[30px] text-2xl text-dark">
        {post ? 'Edit Post' : 'Create Post'}
      </h1>

      <Card>
        <Input
          label="Post Title"
          required
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="Enter post title"
          maxLength={100}
        />
        <div className={`char-counter ${titleCharCount > 90 ? 'warning' : ''}`}>
          <span>{titleCharCount}</span>/100 characters
        </div>

        <Textarea
          label="Content"
          required
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Write your post content here..."
          rows={8}
          maxLength={2000}
          style={{ minHeight: '200px' }}
        />
        <div className={`char-counter ${contentCharCount > 1800 ? 'warning' : ''}`}>
          <span>{contentCharCount}</span>/2000 characters
        </div>
        <div className="text-xs text-dark-lighter mt-1.5">
          Minimum 50 characters required
        </div>

        <div className="form-group">
          <label className="form-label">Media (Optional)</label>
          {!mediaPreview ? (
            <div
              className="upload-area p-5"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                type="file"
                id="file-input"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(3, 38, 37, 0.5)"
                strokeWidth="2"
                className="mb-2.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <div>Click to upload images or videos</div>
              <div className="text-xs text-dark-lighter mt-1.5">
                PNG, JPG, MP4 up to 10MB
              </div>
            </div>
          ) : (
            <div>
              <img
                src={mediaPreview}
                alt="Preview"
                className="max-w-full max-h-[300px] rounded-sm border border-dark-20 mb-2.5"
              />
              <div className="flex gap-2.5">
                <Button variant="outline" onClick={handleRemoveMedia}>
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <div className="mt-2.5">
            <Badge variant={formData.status === 'published' ? 'published' : 'draft'}>
              {formData.status === 'published' ? 'Published' : 'Draft'}
            </Badge>
          </div>
        </div>

        <div className="mt-[30px] pt-5 border-t border-dark-20">
          <div className="action-buttons">
            <Button variant="outline" onClick={onPreview}>
              Preview
            </Button>
            <Button variant="secondary" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button variant="success" onClick={handlePublish}>
              Publish
            </Button>
          </div>
          <div className="mt-4 text-xs text-dark-lighter">
            Publishing will notify followers
          </div>
        </div>
      </Card>
    </Layout>
  );
}

