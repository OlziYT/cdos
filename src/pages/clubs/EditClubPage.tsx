import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClubStore } from '../../stores/club';
import { useThemeStore } from '../../stores/theme';
import { ClubForm } from '../../components/clubs/ClubForm';
import type { ClubFormData } from '../../types/club';

export const EditClubPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clubs, updateClub, isLoading } = useClubStore();
  const { isDark } = useThemeStore();

  const club = clubs.find((c) => c.id === id);

  useEffect(() => {
    if (!club) {
      navigate('/dashboard/clubs');
    }
  }, [club, navigate]);

  if (!club) return null;

  const initialData: ClubFormData = {
    name: club.name,
    committeeId: club.committee_id,
    siret: club.siret,
    rna: club.rna,
    email: club.email,
    phone: club.phone,
    street: club.street,
    city: club.city,
    postalCode: club.postal_code,
    tags: club.tags,
    sports: club.sports,
    handicapAccess: club.handicap_access,
    sportHealth: club.sport_health,
    image_url: club.image_url,
  };

  const handleSubmit = async (data: ClubFormData, image: File | null) => {
    try {
      await updateClub(id!, data, image);
      navigate('/dashboard/clubs');
    } catch (error) {
      console.error('Échec de la mise à jour du club:', error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Modifier le club
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Mettre à jour les informations du club.
          </p>
        </div>
      </div>
      <ClubForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        initialData={initialData}
        submitText="Modifier le club"
      />
    </div>
  );
};