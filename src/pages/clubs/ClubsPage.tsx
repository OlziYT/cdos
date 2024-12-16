import { useEffect, useState } from "react";
import { ClubList } from "../../components/clubs/ClubList";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { useClubStore } from "../../stores/club";

export const ClubsPage = () => {
  const { clubs, fetchClubs, deleteClub, importClubs } = useClubStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const handleDelete = async (id: string) => {
    setClubToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (clubToDelete) {
      try {
        await deleteClub(clubToDelete);
      } catch (error) {
        console.error("Échec de la suppression du club:", error);
      }
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
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer le club"
        message="Êtes-vous sûr de vouloir supprimer ce club ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
};
