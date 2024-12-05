import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { CommitteeFormData } from '../../types/committee';

const committeeSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  siret: z.string().length(14, 'SIRET must be exactly 14 digits'),
  rna: z.string().regex(/^W\d{9}$/, 'RNA must start with W followed by 9 digits'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^0[1-9]\d{8}$/, 'Invalid phone number'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().regex(/^\d{5}$/, 'Invalid postal code'),
});

interface CommitteeFormProps {
  initialData?: CommitteeFormData;
  onSubmit: (data: CommitteeFormData) => Promise<void>;
  isLoading: boolean;
}

export const CommitteeForm = ({
  initialData,
  onSubmit,
  isLoading,
}: CommitteeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommitteeFormData>({
    resolver: zodResolver(committeeSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Committee Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="SIRET Number"
          {...register('siret')}
          error={errors.siret?.message}
        />
        <Input
          label="RNA Number"
          {...register('rna')}
          error={errors.rna?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Input
          label="Street Address"
          {...register('street')}
          error={errors.street?.message}
        />
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="Postal Code"
          {...register('postalCode')}
          error={errors.postalCode?.message}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          isLoading={isLoading}
        >
          {initialData ? 'Update Committee' : 'Create Committee'}
        </Button>
      </div>
    </form>
  );
};