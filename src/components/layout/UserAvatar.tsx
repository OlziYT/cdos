import React from 'react';
import type { User } from '../../types/auth';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  isDark?: boolean;
}

export const UserAvatar = ({ user, size = 'md', isDark = false }: UserAvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`relative group rounded-full ${sizes[size]} ${
        isDark ? 'bg-gray-700' : 'bg-blue-100'
      } flex items-center justify-center overflow-hidden`}
    >
      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-blue-600'}`}>
        {user.firstName[0]}
        {user.lastName[0]}
      </span>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
    </div>
  );
};