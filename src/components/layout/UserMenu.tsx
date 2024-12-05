import React from 'react';
import { Link } from 'react-router-dom';
import { User, LayoutDashboard, Search, LogOut } from 'lucide-react';
import { getAuthStore } from '../../stores/auth';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserMenu = ({ isOpen, onClose }: UserMenuProps) => {
  const { user, logout } = getAuthStore();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        <div className="px-4 py-2 border-b">
          <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        
        <Link
          to="/search"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          <Search className="mr-2 h-4 w-4" />
          Rechercher un club
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Menu admin
        </Link>

        <Link
          to="/profile"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          <User className="mr-2 h-4 w-4" />
          Mon profil
        </Link>

        <button
          className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
          onClick={() => {
            logout();
            onClose();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};