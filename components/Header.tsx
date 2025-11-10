
import React from 'react';
import { View, User } from '../types';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  currentUser: User | null;
  onLogout: () => void;
}

const NavLink: React.FC<{
  viewName: View;
  currentView: View;
  setCurrentView: (view: View) => void;
  children: React.ReactNode;
}> = ({ viewName, currentView, setCurrentView, children }) => {
  const isActive = currentView === viewName;
  return (
    <button
      onClick={() => setCurrentView(viewName)}
      className={`relative py-2 px-3 text-sm font-semibold transition-colors duration-300 rounded-md ${isActive ? 'bg-primary-dark text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, currentUser, onLogout }) => {
  return (
    <header className="bg-dark shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1.1a4 4 0 01-.94 2.6L4.2 11.75A1 1 0 005 13h10a1 1 0 00.8-1.25l-2.86-4.04A4 4 0 0112 5.1V4a2 2 0 00-2-2zm0 14a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-bold text-xl tracking-tight">JobFinder</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <NavLink viewName="student" currentView={currentView} setCurrentView={setCurrentView}>
              Find Jobs
            </NavLink>
            {currentUser?.role === 'admin' && (
              <NavLink viewName="admin" currentView={currentView} setCurrentView={setCurrentView}>
                Admin
              </NavLink>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm hidden sm:block">Welcome, {currentUser?.email}</span>
            <button
              onClick={onLogout}
              className="py-2 px-3 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;