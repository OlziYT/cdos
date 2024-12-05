import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, LogIn, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { UserMenu } from './UserMenu';
import { getAuthStore } from '../../stores/auth';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = getAuthStore();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 relative z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">CDOS Tarn</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/search" 
              className="text-gray-100 hover:text-white flex items-center space-x-1"
            >
              <Users className="h-5 w-5" />
              <span>Clubs</span>
            </Link>
            
            {user ? (
              <div className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="rounded-full flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{user.firstName}</span>
                </Button>
                <UserMenu
                  isOpen={isUserMenuOpen}
                  onClose={() => setIsUserMenuOpen(false)}
                />
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="secondary"
                  size="sm"
                  className="rounded-full flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Connexion</span>
                </Button>
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};