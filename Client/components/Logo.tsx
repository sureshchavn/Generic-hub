import React from 'react';

interface LogoProps {
  /** 'full' for navbar (icon + text), 'mark' for auth pages (icon only) */
  variant?: 'full' | 'mark';
}

const Logo: React.FC<LogoProps> = ({ variant = 'mark' }) => {
  if (variant === 'full') {
    // This is the version for the Navbar
    return (
      <div className="flex items-center gap-2 group">
        <svg className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xl font-bold text-dark dark:text-white">Generic Hub</span>
      </div>
    );
  }

  // This is the version for the auth pages (variant='mark')
  return (
    <div className="mx-auto h-14 w-14 flex justify-center items-center bg-primary rounded-full mb-4">
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
  );
};

export default Logo;
