/**
 * Post Editor Page
 * Enhanced production-ready design with better UX
 */
import { useState } from 'react';
import { HiDocumentText, HiPhotograph, HiSave, HiPaperAirplane, HiEye, HiX, HiExclamationCircle } from 'react-icons/hi';
import { Button, Input, Textarea, Badge } from '../components/common';
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">
          {post ? 'Edit Post' : 'Create Post'}
        </h1>
        <p className="text-sm md:text-base text-dark-lighter">
          {post ? 'Update your post content and settings' : 'Write and publish your new post'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-dark-20 p-6 md:p-8">
        <div className="space-y-6">
          {/* Post Title */}
          <div>
            <Input
              label="Post Title"
              required
              icon={HiDocumentText}
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter post title"
              maxLength={100}
            />
            <div className={`flex justify-end items-center gap-1 mt-1.5 text-xs ${
              titleCharCount > 90 ? 'text-danger' : 'text-dark-lighter'
            }`}>
              {titleCharCount > 90 && <HiExclamationCircle className="w-3 h-3" />}
              <span className={titleCharCount > 90 ? 'font-semibold' : ''}>
                {titleCharCount}/100 characters
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <Textarea
              label="Content"
              required
              icon={HiDocumentText}
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your post content here..."
              rows={8}
              maxLength={2000}
              style={{ minHeight: '200px' }}
            />
            <div className="flex justify-between items-center mt-1.5">
              <div className="text-xs text-dark-lighter">
                Minimum 50 characters required
              </div>
              <div className={`flex items-center gap-1 text-xs ${
                contentCharCount > 1800 ? 'text-danger' : 'text-dark-lighter'
              }`}>
                {contentCharCount > 1800 && <HiExclamationCircle className="w-3 h-3" />}
                <span className={contentCharCount > 1800 ? 'font-semibold' : ''}>
                  {contentCharCount}/2000 characters
                </span>
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-5">
            <label className="block mb-3 font-medium text-dark text-sm">Media (Optional)</label>
            {!mediaPreview ? (
              <div
                className="border-2 border-dashed border-dark-lighter rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary-light transition-all"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  type="file"
                  id="file-input"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                    <HiPhotograph className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-dark mb-1">Click to upload images or videos</div>
                  <div className="text-xs text-dark-lighter">PNG, JPG, MP4 up to 10MB</div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-w-full max-h-[300px] rounded-lg border-2 border-dark-20 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveMedia}
                    className="absolute top-2 right-2 w-8 h-8 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/90 transition-colors shadow-lg"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mb-5">
            <label className="block mb-3 font-medium text-dark text-sm">Status</label>
            <div className="mt-2.5">
              <Badge variant={formData.status === 'published' ? 'published' : 'draft'}>
                {formData.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-dark-20">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={onPreview}
              className="px-6 py-2.5"
            >
              <HiEye className="w-4 h-4 inline mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              className="px-6 py-2.5"
            >
              <HiSave className="w-4 h-4 inline mr-2" />
              Save as Draft
            </Button>
            <Button 
              variant="primary" 
              onClick={handlePublish}
              className="px-8 py-2.5 font-semibold shadow-lg hover:shadow-xl"
            >
              <HiPaperAirplane className="w-4 h-4 inline mr-2" />
              Publish
            </Button>
          </div>
          <div className="mt-4 text-xs text-dark-lighter text-center sm:text-right">
            Publishing will notify followers
          </div>
        </div>
      </div>
    </Layout>
  );
}

