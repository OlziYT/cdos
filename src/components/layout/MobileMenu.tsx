import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Search, LayoutDashboard, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { getAuthStore } from '../../stores/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = getAuthStore();

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />

      {/* Menu */}
      <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={onClose}
          >
            <Home className="h-5 w-5 mr-3" />
            Accueil
          </Link>
          
          <Link
            to="/search"
            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={onClose}
          >
            <Search className="h-5 w-5 mr-3" />
            Rechercher un club
          </Link>

          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={onClose}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={onClose}
            >
              <LogIn className="h-5 w-5 mr-3" />
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};