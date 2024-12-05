import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Select } from '../ui/Select';
import { TagInput } from '../ui/TagInput';
import type { ClubFormData } from '../../types/club';
import { useCommitteeStore } from '../../stores/committee';

const clubSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  committeeId: z.string().min(1, 'Committee is required'),
  siret: z.string().length(14, 'SIRET must be exactly 14 digits'),
  rna: z.string().regex(/^W\d{9}$/, 'RNA must start with W followed by 9 digits'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^0[1-9]\d{8}$/, 'Invalid phone number'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().regex(/^\d{5}$/, 'Invalid postal code'),
  tags: z.array(z.string()),
  handicapAccess: z.boolean(),
  sportHealth: z.boolean(),
});

interface ClubFormProps {
  initialData?: ClubFormData;
  onSubmit: (data: ClubFormData) => Promise<void>;
  isLoading: boolean;
}

export const ClubForm = ({
  initialData,
  onSubmit,
  isLoading,
}: ClubFormProps) => {
  const { committees } = useCommitteeStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClubFormData>({
    resolver: zodResolver(clubSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Club Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Select
          label="Committee"
          {...register('committeeId')}
          error={errors.committeeId?.message}
        >
          <option value="">Select a committee</option>
          {committees.map((committee) => (
            <option key={committee.id} value={committee.id}>
              {committee.name}
            </option>
          ))}
        </Select>
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
        <div className="md:col-span-2">
          <TagInput
            label="Tags"
            name="tags"
            control={control}
            error={errors.tags?.message}
          />
        </div>
        <div className="space-y-4 md:col-span-2">
          <Checkbox
            label="Handicap Access"
            {...register('handicapAccess')}
          />
          <Checkbox
            label="Sport Health Program"
            {...register('sportHealth')}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          isLoading={isLoading}
        >
          {initialData ? 'Update Club' : 'Create Club'}
        </Button>
      </div>
    </form>
  );
};