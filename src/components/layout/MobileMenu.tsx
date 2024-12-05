import { Link } from 'react-router-dom';
import { X, Home, Search, LayoutDashboard, LogIn, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { getAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';
import { UserAvatar } from './UserAvatar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, logout } = getAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div 
      className={`fixed inset-0 isolate ${isOpen ? 'z-[9999] pointer-events-auto' : '-z-10 pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div 
        className={`fixed inset-y-0 right-0 w-72 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className={`flex items-center justify-between p-4 ${isDark ? 'border-gray-800' : 'border-gray-200'} border-b`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Menu</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`rounded-full p-2 ${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900'}`}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {user && (
          <div className={`p-4 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <UserAvatar user={user} size="lg" isDark={isDark} />
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.firstName} {user.lastName}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="p-4 space-y-1">
          <button
            onClick={toggleTheme}
            className={`flex w-full items-center p-3 rounded-lg transition-colors ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-800' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="h-5 w-5 mr-3" />
                Mode clair
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 mr-3" />
                Mode sombre
              </>
            )}
          </button>

          <Link
            to="/"
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-800' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={onClose}
          >
            <Home className="h-5 w-5 mr-3" />
            Accueil
          </Link>
          
          <Link
            to="/search"
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-800' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={onClose}
          >
            <Search className="h-5 w-5 mr-3" />
            Rechercher un club
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={onClose}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Menu admin
              </Link>
              <Link
                to="/profile"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={onClose}
              >
                <User className="h-5 w-5 mr-3" />
                Mon profil
              </Link>
              <button
                className={`flex w-full items-center p-3 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-red-400 hover:bg-red-500/10' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
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
              className={`flex items-center p-3 rounded-lg transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={onClose}
            >
              <LogIn className="h-5 w-5 mr-3" />
              Connexion
            </Link>
          )}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <p className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Glissez depuis la droite ou appuyez sur l'icône menu pour ouvrir
          </p>
        </div>
      </div>
    </div>
  );
};