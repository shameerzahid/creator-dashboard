/**
 * Inbox Page
 * Screen 11: Inbox - Professional production-ready design
 */
import { useState } from 'react';
import { HiSearch, HiPaperAirplane, HiDocumentText, HiCheck, HiCheckCircle, HiClock, HiUserCircle } from 'react-icons/hi';
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
    if (status === 'seen') {
      return <HiCheckCircle className="w-3.5 h-3.5 text-primary" />;
    }
    if (status === 'delivered') {
      return <HiCheck className="w-3.5 h-3.5 text-dark-lighter" />;
    }
    return <HiClock className="w-3.5 h-3.5 text-dark-lighter" />;
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
      <div className="inbox-page-container">
        {/* Header */}
        {/* <div className="inbox-header">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark mb-1">Inbox</h1>
            <p className="text-xs md:text-sm text-dark-lighter">Manage your conversations and customer messages</p>
          </div>
        </div> */}

        <div className="inbox-container">
          {/* Conversation List */}
          <div className="conversation-list">
            <div className="conversation-search">
              <div className="search-icon-wrapper">
                <HiSearch className="search-icon" />
                <input
                  type="text"
                  className="conversation-search-input"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="conversation-list-content">
              {conversationsToShow.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`conversation-item ${
                    activeConversation?.id === conversation.id ? 'active' : ''
                  } ${conversation.unread ? 'unread' : ''}`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="conversation-avatar">
                    <HiUserCircle className="w-10 h-10 text-dark-lighter" />
                    {conversation.online && (
                      <span className="conversation-online-indicator"></span>
                    )}
                  </div>
                  <div className="conversation-content">
                    <div className="conversation-name">
                      <span className="font-semibold text-dark">{conversation.name}</span>
                      {conversation.unread && (
                        <span className={`unread-badge ${conversation.unreadCount > 0 ? 'has-count' : ''}`}>
                          {conversation.unreadCount > 0 ? conversation.unreadCount : ''}
                        </span>
                      )}
                    </div>
                    <div className="conversation-preview">{conversation.preview}</div>
                    <div className="text-xs text-dark-lighter mt-1">{conversation.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className="message-thread">
            {activeConversation ? (
              <>
                <div className="message-header">
                  <div className="message-header-user">
                    <HiUserCircle className="w-10 h-10 text-dark-lighter" />
                    <div className="message-header-info">
                      <div className="font-semibold text-lg text-dark">{activeConversation.name}</div>
                      <div className="text-xs text-dark-lighter mt-1 flex items-center gap-2">
                        <span className={`status-indicator ${activeConversation.online ? 'status-online' : 'status-offline'}`}></span>
                        {activeConversation.online ? 'Online' : 'Offline'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="messages">
                  {activeConversation.messages?.length > 0 ? (
                    activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`message ${message.sender === 'You' ? 'message-sent' : 'message-received'}`}
                      >
                        {message.sender !== 'You' && (
                          <div className="message-avatar">
                            <HiUserCircle className="w-8 h-8 text-dark-lighter" />
                          </div>
                        )}
                        <div className="message-content">
                          {message.sender !== 'You' && (
                            <div className="font-semibold mb-1 text-sm text-dark">{message.sender}</div>
                          )}
                          <div className={`message-bubble ${message.sender === 'You' ? 'message-bubble-sent' : 'message-bubble-received'}`}>
                            <div className="text-dark">{message.text}</div>
                          </div>
                          <div className={`flex items-center gap-2 mt-1.5 ${message.sender === 'You' ? 'justify-end' : ''}`}>
                            <div className="text-xs text-dark-lighter">{message.time}</div>
                            {message.sender === 'You' && (
                              <>
                                <span className="text-[10px] text-dark-light">•</span>
                                <span className="text-xs text-dark-lighter flex items-center gap-1">
                                  {getStatusIcon(message.status)}
                                  {message.status === 'seen' ? 'Seen' : message.status === 'delivered' ? 'Delivered' : 'Sending'}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="messages-empty">
                      <HiDocumentText className="w-12 h-12 text-dark-lighter mx-auto mb-3" />
                      <p className="text-sm text-dark-lighter text-center">No messages yet. Start the conversation!</p>
                    </div>
                  )}
                </div>

                <div className="message-input-area">
                  {/* Quick Replies (Future Feature) */}
                  <div className="message-quick-replies">
                    <div className="flex items-center mb-3">
                      <HiDocumentText className="w-4 h-4 text-primary mr-2" />
                      <div className="text-xs font-semibold text-dark">Quick Replies (Coming Soon)</div>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <button
                        className="px-3 py-1.5 text-xs border border-dark-lighter rounded-md text-dark-lighter hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled
                      >
                        Thanks for contacting us!
                      </button>
                      <button
                        className="px-3 py-1.5 text-xs border border-dark-lighter rounded-md text-dark-lighter hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled
                      >
                        We'll get back to you soon
                      </button>
                      <button
                        className="px-3 py-1.5 text-xs border border-dark-lighter rounded-md text-dark-lighter hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled
                      >
                        Your order is being processed
                      </button>
                    </div>
                    <div className="text-[11px] text-dark-lighter italic">
                      Pre-configured quick responses for faster customer support
                    </div>
                  </div>

                  <div className="message-input-wrapper">
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
                    <button
                      className="message-send-button"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <HiPaperAirplane className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="messages-empty">
                <HiDocumentText className="w-12 h-12 text-dark-lighter mx-auto mb-3" />
                <p className="text-sm text-dark-lighter text-center">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

