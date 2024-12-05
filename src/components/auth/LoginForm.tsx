import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { getAuthStore } from '../../stores/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(12, 'Password must be at least 12 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = getAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
};