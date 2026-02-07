/**
 * Inbox Page
 * Screen 11: Inbox - matches wireframe exactly
 */
import { useState } from 'react';
import { Button, Input } from '../components/common';
import { Layout } from '../components/layout';

export default function Inbox({ 
  accountName = 'My Business',
  role = 'owner',
  isVerified = false,
  conversations = [],
  onAccountSwitch,
  onUserMenuClick,
  onNavClick,
  onSelectConversation,
  onSendMessage,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  const defaultConversations = [
    {
      id: '1',
      name: 'John Doe',
      preview: 'Thanks for the quick response!',
      time: '2 hours ago',
      unread: false,
      unreadCount: 0,
      online: true,
      messages: [
        {
          id: '1',
          sender: 'John Doe',
          text: 'Hello, I have a question about my order.',
          time: '2 hours ago',
          status: 'seen',
        },
        {
          id: '2',
          sender: 'You',
          text: "Hi John! I'd be happy to help. What's your order number?",
          time: '1 hour ago',
          status: 'delivered',
        },
        {
          id: '3',
          sender: 'John Doe',
          text: 'Thanks for the quick response!',
          time: '30 minutes ago',
          status: 'seen',
        },
      ],
    },
    {
      id: '2',
      name: 'Jane Smith',
      preview: 'When will my order arrive?',
      time: '5 hours ago',
      unread: true,
      unreadCount: 3,
      online: false,
      messages: [],
    },
    {
      id: '3',
      name: 'Mike Johnson',
      preview: 'I have a question about...',
      time: '1 day ago',
      unread: true,
      unreadCount: 0,
      online: false,
      messages: [],
    },
  ];

  const conversationsToShow = conversations.length > 0 ? conversations : defaultConversations;
  const activeConversation = selectedConversation || conversationsToShow[0];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'posts', label: 'Posts' },
    { id: 'profile', label: 'Profile & Settings' },
    { id: 'menu', label: 'Menu Configuration' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'miniapps', label: 'Mini Apps' },
  ];

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    onSelectConversation?.(conversation);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    onSendMessage?.(activeConversation.id, messageText);
    setMessageText('');
  };

  const getStatusIcon = (status) => {
    if (status === 'seen' || status === 'delivered') {
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      );
    }
    return null;
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
        activeItem: 'inbox',
        onItemClick: onNavClick,
        onLogout: () => window.location.href = '/',
      }}
      className="inbox-layout"
    >
      <div className="inbox-container">
        {/* Conversation List */}
        <div className="conversation-list">
          <div className="conversation-search">
            <div className="search-icon-wrapper">
              <input
                type="text"
                className="conversation-search-input"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(3, 38, 37, 0.5)"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          {conversationsToShow.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${
                activeConversation?.id === conversation.id ? 'active' : ''
              } ${conversation.unread ? 'unread' : ''}`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="conversation-name">
                <span>{conversation.name}</span>
                {conversation.unread && (
                  <span className={`unread-badge ${conversation.unreadCount > 0 ? 'has-count' : ''}`}>
                    {conversation.unreadCount > 0 ? conversation.unreadCount : ''}
                  </span>
                )}
              </div>
              <div className="conversation-preview">{conversation.preview}</div>
              <div className="text-xs text-dark-lighter mt-1.5">{conversation.time}</div>
            </div>
          ))}
        </div>

        {/* Message Thread */}
        <div className="message-thread">
          {activeConversation && (
            <>
              <div className="message-header">
                <div className="font-semibold text-lg text-dark">{activeConversation.name}</div>
                <div className="text-xs text-dark-lighter mt-1.5 flex items-center gap-2">
                  <span className={`status-indicator ${activeConversation.online ? 'status-online' : 'status-offline'}`}></span>
                  {activeConversation.online ? 'Online' : 'Offline'}
                </div>
              </div>

              <div className="messages">
                {activeConversation.messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === 'You' ? 'message-sent' : ''}`}
                  >
                    <div className="font-semibold mb-1.5 text-dark">{message.sender}</div>
                    <div>{message.text}</div>
                    <div className={`flex items-center gap-2 mt-1.5 ${message.sender === 'You' ? 'justify-end' : ''}`}>
                      <div className="text-xs text-dark-lighter">{message.time}</div>
                      <span className="text-[10px] text-dark-light">•</span>
                      <span className="text-xs text-dark-lighter flex items-center gap-1">
                        {getStatusIcon(message.status)}
                        {message.status === 'seen' ? 'Seen' : message.status === 'delivered' ? 'Delivered' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input-area">
                {/* Quick Replies (Future Feature) */}
                <div className="p-2.5 bg-dark-03 rounded-sm border border-dashed border-dark-20 mb-2.5">
                  <div className="flex items-center mb-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(3, 38, 37, 0.5)"
                      strokeWidth="2"
                      className="mr-1.5"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                    </svg>
                    <div className="text-xs font-semibold text-dark">Quick Replies (Coming Soon)</div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      disabled
                    >
                      Thanks for contacting us!
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      disabled
                    >
                      We'll get back to you soon
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      disabled
                    >
                      Your order is being processed
                    </button>
                  </div>
                  <div className="text-[11px] text-dark-lighter mt-1.5 italic">
                    Pre-configured quick responses for faster customer support
                  </div>
                </div>

                <input
                  type="text"
                  className="message-input"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <div className="mt-2.5">
                  <Button variant="primary" onClick={handleSendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

