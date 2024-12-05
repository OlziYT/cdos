import React, { useEffect } from 'react';
import { ClubList } from '../../components/clubs/ClubList';
import { useClubStore } from '../../stores/club';

export const ClubsPage = () => {
  const { clubs, fetchClubs, deleteClub, importClubs } = useClubStore();

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await deleteClub(id);
      } catch (error) {
        console.error('Failed to delete club:', error);
      }
    }
  };

  const handleImport = async (file: File) => {
    try {
      await importClubs(file);
    } catch (error) {
      console.error('Failed to import clubs:', error);
    }
  };

  return (
    <div>
      <ClubList
        clubs={clubs}
        onDelete={handleDelete}
        onImport={handleImport}
      />
    </div>
  );
};