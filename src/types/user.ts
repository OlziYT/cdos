export type UserRole = 'user' | 'admin' | 'super_admin';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}
