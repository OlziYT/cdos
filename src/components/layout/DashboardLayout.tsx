import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Users, Building2, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import { getAuthStore } from '../../stores/auth';
import { Button } from '../ui/Button';
import { Header } from './Header';

const navigation = [
  { name: 'Committees', href: '/dashboard/committees', icon: Building2 },
  { name: 'Clubs', href: '/dashboard/clubs', icon: Users },
  { name: 'Statistics', href: '/dashboard/statistics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const DashboardLayout = () => {
  const location = useLocation();
  const { user, logout } = getAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full p-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`
          fixed inset-y-16 left-0 z-40 w-64 transform bg-white transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${
                      location.pathname.startsWith(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <Icon
                      className={`${
                        location.pathname.startsWith(item.href)
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>

        {/* Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};