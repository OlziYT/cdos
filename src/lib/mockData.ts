export const mockUsers = [
  {
    id: '1',
    email: 'admin@cdos81.fr',
    password: 'admin123456789', // In a real app, this would be hashed
    firstName: 'Admin',
    lastName: 'User',
    role: 'SUPER_ADMIN' as const,
    lastLogin: new Date().toISOString()
  }
];