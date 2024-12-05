import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClubForm } from '../../components/clubs/ClubForm';
import { useClubStore } from '../../stores/club';
import type { ClubFormData } from '../../types/club';

export const NewClubPage = () => {
  const navigate = useNavigate();
  const { createClub, isLoading } = useClubStore();

  const handleSubmit = async (data: ClubFormData) => {
    try {
      await createClub(data);
      navigate('/dashboard/clubs');
    } catch (error) {
      console.error('Failed to create club:', error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            New Club
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a new sports club in the Tarn department.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <ClubForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};