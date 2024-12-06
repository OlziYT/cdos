import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { CommitteeFormData } from '../../types/committee';
import { useThemeStore } from '../../stores/theme';

const committeeSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  siret: z.string().length(14, 'Le numéro SIRET doit contenir exactement 14 chiffres'),
  rna: z.string().regex(/^W\d{9}$/, 'Le numéro RNA doit commencer par W suivi de 9 chiffres'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().regex(/^0[1-9]\d{8}$/, 'Numéro de téléphone invalide'),
  street: z.string().min(5, 'L\'adresse est requise'),
  city: z.string().min(2, 'La ville est requise'),
  postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
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
  const { isDark } = useThemeStore();

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
          label="Nom du comité"
          {...register('name')}
          error={errors.name?.message}
          isDark={isDark}
        />
        <Input
          label="Numéro SIRET"
          {...register('siret')}
          error={errors.siret?.message}
          isDark={isDark}
        />
        <Input
          label="Numéro RNA"
          {...register('rna')}
          error={errors.rna?.message}
          isDark={isDark}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          isDark={isDark}
        />
        <Input
          label="Téléphone"
          {...register('phone')}
          error={errors.phone?.message}
          isDark={isDark}
        />
        <Input
          label="Adresse"
          {...register('street')}
          error={errors.street?.message}
          isDark={isDark}
        />
        <Input
          label="Ville"
          {...register('city')}
          error={errors.city?.message}
          isDark={isDark}
        />
        <Input
          label="Code postal"
          {...register('postalCode')}
          error={errors.postalCode?.message}
          isDark={isDark}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          isLoading={isLoading}
          isDark={isDark}
        >
          {initialData ? 'Mettre à jour' : 'Créer le comité'}
        </Button>
      </div>
    </form>
  );
};