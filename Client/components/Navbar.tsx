import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon } from './icons';
import Logo from './Logo';


const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile 
      ? "block py-2 px-4 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      : "nav-item";
    
    const activeClass = isMobile ? "bg-secondary text-white" : "active";

    if (user?.role === 'admin') {
      return (
        <NavLink 
          to="/admin" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
        >
          Admin
        </NavLink>
      );
    }

    return (
      <>
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>Home</NavLink>
        <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>About Us</NavLink>
        <NavLink to="/compare" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>Compare</NavLink>
        <NavLink to="/locator" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>Store Locator</NavLink>
      </>
    );
  };

  const renderUserActions = (isMobile = false) => {
    const baseClasses = isMobile ? "w-full text-center" : "";

    if (user) {
      return (
        <div className="flex items-center gap-4 relative">
          <div ref={userMenuRef}>
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
              <UserIcon />
              <span className="font-medium hidden md:block">{user.fullName}</span>
            </button>
            {isUserMenuOpen && (
              <div className="user-dropdown absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">Signed in as <strong className="text-gray-800 dark:text-gray-200">{user.username}</strong></div>
                {user.role === 'admin' && <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsUserMenuOpen(false)}>Return to Home</NavLink>}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className={`flex items-center ${isMobile ? 'flex-col space-y-3 mt-4' : 'space-x-2'}`}>
        <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`${baseClasses} login-btn`}>Login</NavLink>
        <NavLink to="/register" onClick={() => setIsMobileMenuOpen(false)} className={`${baseClasses} signup-btn-animated`}>Sign Up</NavLink>
      </div>
    );
  };

  return (
    <header className={`sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-shadow duration-300 ${isScrolled ? 'shadow-md dark:shadow-black/20' : ''}`}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" aria-label="Homepage">
          <Logo variant="full" />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
            {renderNavLinks()}
        </div>
        
        {/* Desktop User Actions & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
            {renderUserActions()}
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" aria-label="Toggle theme">
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" aria-label="Toggle theme">
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700 dark:text-gray-200" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="mobile-nav md:hidden px-4 pt-2 pb-4 border-t dark:border-gray-700">
          <div className="flex flex-col items-center gap-4">
            {renderNavLinks(true)}
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            {renderUserActions(true)}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;