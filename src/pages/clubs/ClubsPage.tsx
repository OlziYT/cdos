import React, { useEffect } from 'react';
import { ClubList } from '../../components/clubs/ClubList';
import { useClubStore } from '../../stores/club';

export const ClubsPage = () => {
  const { clubs, fetchClubs, deleteClub, importClubs } = useClubStore();

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce club ?')) {
      try {
        await deleteClub(id);
      } catch (error) {
        console.error('Échec de la suppression du club:', error);
      }
    }
  };

  const handleImport = async (file: File) => {
    try {
      await importClubs(file);
    } catch (error) {
      console.error('Échec de l\'importation des clubs:', error);
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