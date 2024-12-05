import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Search, LayoutDashboard, LogIn, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { getAuthStore } from '../../stores/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, logout } = getAuthStore();

  return (
    <div 
      className={`fixed inset-0 isolate ${isOpen ? 'z-[9999]' : '-z-10'} lg:hidden`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Menu */}
      <div 
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
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

        {user && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}

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
            <>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={onClose}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Menu admin
              </Link>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={onClose}
              >
                <User className="h-5 w-5 mr-3" />
                Mon profil
              </Link>
              <button
                className="flex w-full items-center p-2 text-red-600 hover:bg-red-50 rounded-lg"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </button>
            </>
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