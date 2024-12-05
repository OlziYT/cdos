import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClubForm } from '../../components/clubs/ClubForm';
import { useClubStore } from '../../stores/club';
import type { ClubFormData } from '../../types/club';

export const EditClubPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clubs, updateClub, isLoading } = useClubStore();

  const club = clubs.find((c) => c.id === id);

  useEffect(() => {
    if (!club) {
      navigate('/dashboard/clubs');
    }
  }, [club, navigate]);

  if (!club) return null;

  const initialData: ClubFormData = {
    name: club.name,
    committeeId: club.committeeId,
    siret: club.siret,
    rna: club.rna,
    email: club.email,
    phone: club.phone,
    street: club.address.street,
    city: club.address.city,
    postalCode: club.address.postalCode,
    tags: club.tags,
    handicapAccess: club.features.handicapAccess,
    sportHealth: club.features.sportHealth,
  };

  const handleSubmit = async (data: ClubFormData) => {
    try {
      await updateClub(id!, data);
      navigate('/dashboard/clubs');
    } catch (error) {
      console.error('Failed to update club:', error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Edit Club
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update the club's information.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <ClubForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};