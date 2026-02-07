/**
 * Entry Page (Homepage)
 * Screen 1: Entry Page - matches wireframe exactly
 */
import { Button } from '../components/common';
import { Header } from '../components/layout';

export default function EntryPage({ onLoginClick, onSignUpClick, onCreateAccountClick }) {
  return (
    <div className="min-h-screen bg-white">
      <Header
        showAccountSwitcher={false}
        onUserMenuClick={null}
        headerRight={
          <div className="header-right">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onLoginClick?.();
              }}
              className="text-secondary no-underline mr-5 hover:underline"
            >
              Log in
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSignUpClick?.();
              }}
              className="text-secondary no-underline hover:underline"
            >
              Sign up
            </a>
          </div>
        }
      />
      
      <div className="py-20 px-10 max-w-[800px] mx-auto text-center">
        <h1 className="text-5xl font-bold text-dark mb-[30px]">
          Official Accounts
        </h1>
        <p className="text-lg text-dark-lighter leading-relaxed mb-[50px] max-w-[600px] mx-auto">
          Create and manage your official account to connect with your audience, share updates, and grow your presence. Choose between Creator or Business accounts to get started.
        </p>
        <div className="mb-[30px]">
          <Button 
            variant="primary" 
            onClick={onCreateAccountClick}
            className="px-[50px] py-[14px] text-base"
          >
            Create Official Account
          </Button>
        </div>
        <div className="text-sm text-dark-lighter">
          Already have an account?{' '}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onLoginClick?.();
            }}
            className="text-secondary no-underline font-medium hover:underline"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

