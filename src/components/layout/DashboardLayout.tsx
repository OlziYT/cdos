import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Users, Building2, BarChart3, Settings, LogOut } from 'lucide-react';
import { getAuthStore } from '../../stores/auth';
import { Button } from '../ui/Button';

const navigation = [
  { name: 'Committees', href: '/dashboard/committees', icon: Building2 },
  { name: 'Clubs', href: '/dashboard/clubs', icon: Users },
  { name: 'Statistics', href: '/dashboard/statistics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const DashboardLayout = () => {
  const location = useLocation();
  const { user, logout } = getAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold">CDOS Tarn</h1>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
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
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <div className="inline-flex items-center justify-center h-8 w-8 bg-gray-500 rounded-full">
                        <span className="text-sm font-medium leading-none text-white">
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                        onClick={() => logout()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};