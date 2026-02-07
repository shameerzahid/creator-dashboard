import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import EntryPage from './pages/EntryPage'
import Login from './pages/Login'
import AccountSelection from './pages/AccountSelection'
import ChooseAccountType from './pages/ChooseAccountType'
import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import ProfileSettings from './pages/ProfileSettings'
import PostsList from './pages/PostsList'
import PostEditor from './pages/PostEditor'
import MenuConfiguration from './pages/MenuConfiguration'
import Inbox from './pages/Inbox'
import Analytics from './pages/Analytics'
import MiniApps from './pages/MiniApps'
import CreatorDashboard from './pages/CreatorDashboard'

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <EntryPage
            onLoginClick={() => navigate('/login')}
            onSignUpClick={() => {
              console.log('Navigate to signup')
            }}
            onCreateAccountClick={() => {
              console.log('Navigate to create account')
            }}
          />
        } 
      />
      
      <Route 
        path="/login" 
        element={
          <Login
            onBackClick={() => navigate('/')}
            onSignUpClick={() => {
              console.log('Navigate to signup')
            }}
            onForgotPasswordClick={() => {
              console.log('Navigate to forgot password')
            }}
            onSubmit={async (credentials) => {
              console.log('Login attempt:', credentials)
              // Simulate successful login
              await new Promise(resolve => setTimeout(resolve, 1000))
              navigate('/accounts')
            }}
          />
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/accounts" 
        element={
          <AccountSelection
            onCreateAccountClick={() => navigate('/accounts/choose-type')}
            onAccountClick={(account) => navigate('/dashboard')}
            onManageClick={(account) => navigate('/dashboard')}
            onSettingsClick={(account) => navigate('/dashboard/profile')}
            onLeaveClick={(account) => {
              console.log('Leave account:', account)
            }}
            onUserMenuClick={() => {
              console.log('User menu clicked')
            }}
          />
        } 
      />

      <Route 
        path="/accounts/choose-type" 
        element={
          <ChooseAccountType
            currentAccount="My Business"
            currentRole="owner"
            onContinue={(accountType) => navigate('/accounts/create')}
            onBack={() => navigate('/accounts')}
            onAccountSwitch={() => {
              console.log('Switch account')
            }}
            onUserMenuClick={() => {
              console.log('User menu clicked')
            }}
          />
        } 
      />

      <Route 
        path="/accounts/create" 
        element={
          <CreateAccount
            accountType="creator"
            onCancel={() => navigate('/accounts/choose-type')}
            onSubmit={(formData) => {
              console.log('Account created:', formData)
              navigate('/accounts')
            }}
          />
        } 
      />

      <Route 
        path="/dashboard" 
        element={
          <Dashboard
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              }
            }}
            onLogout={() => navigate('/')}
            onCreatePost={() => navigate('/dashboard/posts/create')}
            onStartVerification={() => {
              console.log('Start verification')
            }}
          />
        } 
      />

      <Route 
        path="/dashboard/profile" 
        element={
          <ProfileSettings
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              }
            }}
            onSave={(formData) => {
              console.log('Save profile:', formData)
            }}
            onCancel={() => navigate('/dashboard')}
            onStartVerification={() => {
              console.log('Start verification')
            }}
            onChangeLogo={() => {
              console.log('Change logo')
            }}
          />
        } 
      />

      <Route 
        path="/dashboard/menu" 
        element={
          <MenuConfiguration
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              }
            }}
            onAddButton={(formData) => {
              console.log('Add button:', formData)
            }}
            onEditButton={(button) => {
              console.log('Edit button:', button)
            }}
            onDeleteButton={(button) => {
              console.log('Delete button:', button)
            }}
          />
        } 
      />

      <Route 
        path="/dashboard/inbox" 
        element={
          <Inbox
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else {
                console.log('Navigate to:', navId)
              }
            }}
            onSelectConversation={(conversation) => {
              console.log('Select conversation:', conversation)
            }}
            onSendMessage={(conversationId, message) => {
              console.log('Send message:', conversationId, message)
            }}
          />
        } 
      />

      <Route 
        path="/dashboard/analytics" 
        element={
          <Analytics
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else {
                console.log('Navigate to:', navId)
              }
            }}
          />
        } 
      />

      <Route 
        path="/dashboard/miniapps" 
        element={
          <MiniApps
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else {
                console.log('Navigate to:', navId)
              }
            }}
            onRegisterApp={(formData) => {
              console.log('Register app:', formData)
            }}
            onViewApp={(app) => {
              console.log('View app:', app)
            }}
            onEditApp={(app) => {
              console.log('Edit app:', app)
            }}
          />
        } 
      />

      <Route 
        path="/dashboard/posts" 
        element={
          <PostsList
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              }
            }}
            onCreatePost={() => navigate('/dashboard/posts/create')}
            onEditPost={(post) => navigate(`/dashboard/posts/${post.id}/edit`)}
            onDeletePost={(post) => {
              console.log('Delete post:', post)
            }}
          />
        } 
      />

      <Route 
        path="/dashboard/posts/create" 
        element={
          <PostEditor
            accountName="My Business"
            role="owner"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              }
            }}
            onSaveDraft={(formData) => {
              console.log('Save draft:', formData)
              navigate('/dashboard/posts')
            }}
            onPublish={(formData) => {
              console.log('Publish:', formData)
              navigate('/dashboard/posts')
            }}
            onPreview={() => {
              console.log('Preview post')
            }}
            onCancel={() => navigate('/dashboard/posts')}
          />
        } 
      />

      <Route 
        path="/dashboard/posts/:postId/edit" 
        element={
          <PostEditor
            accountName="My Business"
            role="owner"
            isVerified={false}
            post={{
              id: '1',
              title: 'Welcome to our new store!',
              content: 'This is the post content...',
              status: 'published',
            }}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else if (navId === 'menu') {
                navigate('/dashboard/menu')
              } else if (navId === 'inbox') {
                navigate('/dashboard/inbox')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else if (navId === 'miniapps') {
                navigate('/dashboard/miniapps')
              }
            }}
            onSaveDraft={(formData) => {
              console.log('Save draft:', formData)
              navigate('/dashboard/posts')
            }}
            onPublish={(formData) => {
              console.log('Publish:', formData)
              navigate('/dashboard/posts')
            }}
            onPreview={() => {
              console.log('Preview post')
            }}
            onCancel={() => navigate('/dashboard/posts')}
          />
        } 
      />

      <Route 
        path="/dashboard/creator" 
        element={
          <CreatorDashboard
            accountName="My Creator"
            role="admin"
            isVerified={false}
            onAccountSwitch={() => navigate('/accounts')}
            onUserMenuClick={() => console.log('User menu')}
            onNavClick={(navId) => {
              if (navId === 'dashboard') {
                navigate('/dashboard/creator')
              } else if (navId === 'posts') {
                navigate('/dashboard/posts')
              } else if (navId === 'profile') {
                navigate('/dashboard/profile')
              } else if (navId === 'analytics') {
                navigate('/dashboard/analytics')
              } else {
                console.log('Navigate to:', navId)
              }
            }}
          />
        } 
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
