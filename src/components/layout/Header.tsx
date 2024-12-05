import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, LogIn, Menu, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { getAuthStore } from '../../stores/auth';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = getAuthStore();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800">
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
              <Link to="/dashboard">
                <Button 
                  variant="secondary"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button 
                  variant="secondary"
                  size="sm"
                  className="flex items-center space-x-2"
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