import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Users, Building2, BarChart3, Settings, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Header } from './Header';
import { useThemeStore } from '../../stores/theme';

const navigation = [
  { name: 'Comités', href: '/dashboard/committees', icon: Building2 },
  { name: 'Clubs', href: '/dashboard/clubs', icon: Users },
  { name: 'Statistiques', href: '/dashboard/statistics', icon: BarChart3 },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
];

export const DashboardLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`rounded-full p-2 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Theme toggle */}
        <div className="fixed top-20 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={`rounded-full p-2 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm`}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`
            fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] transform transition-transform duration-200 ease-in-out
            ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            lg:sticky lg:top-16 lg:translate-x-0 lg:border-r
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="flex flex-col h-full">
            <div className="space-y-1 p-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${isActive
                        ? isDark 
                          ? 'bg-blue-900/50 text-blue-400'
                          : 'bg-blue-50 text-blue-700'
                        : isDark
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        mr-3 h-5 w-5
                        ${isActive 
                          ? isDark ? 'text-blue-400' : 'text-blue-700'
                          : isDark ? 'text-gray-400' : 'text-gray-400'
                        }
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>

        {/* Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};