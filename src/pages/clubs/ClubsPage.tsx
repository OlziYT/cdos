import { useState, useEffect } from "react";
import { useClubStore } from "../../stores/club";
import { ClubList } from "../../components/clubs/ClubList";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

export const ClubsPage = () => {
  const { clubs, fetchClubs, deleteClub, importClubs } = useClubStore();
  const [clubToDelete, setClubToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const handleDelete = async (id: string) => {
    setClubToDelete(id);
  };

  const confirmDelete = async () => {
    if (clubToDelete) {
      try {
        await deleteClub(clubToDelete);
      } catch (error) {
        console.error("Échec de la suppression du club:", error);
      }
      setClubToDelete(null);
    }
  };

  const handleImport = async (file: File) => {
    try {
      await importClubs(file);
    } catch (error) {
      console.error("Échec de l'importation des clubs:", error);
    }
  };

  return (
    <div>
      <ClubList clubs={clubs} onDelete={handleDelete} onImport={handleImport} />
      
      <ConfirmDialog
        isOpen={clubToDelete !== null}
        onClose={() => setClubToDelete(null)}
        onConfirm={confirmDelete}
        title="Supprimer le club"
        message="Êtes-vous sûr de vouloir supprimer ce club ? Cette action est irréversible."
      />
    </div>
  );
};
