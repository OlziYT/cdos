import React, { useState, useEffect } from 'react';
import { CommitteeList } from '../../components/committees/CommitteeList';
import { useCommitteeStore } from '../../stores/committee';
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

export const CommitteesPage = () => {
  const { committees, fetchCommittees, deleteCommittee } = useCommitteeStore();
  const [committeeToDelete, setCommitteeToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchCommittees();
  }, [fetchCommittees]);

  const handleDelete = async (id: string) => {
    setCommitteeToDelete(id);
  };

  const confirmDelete = async () => {
    if (committeeToDelete) {
      try {
        await deleteCommittee(committeeToDelete);
      } catch (error) {
        console.error("Échec de la suppression du comité:", error);
      }
      setCommitteeToDelete(null);
    }
  };

  return (
    <div>
      <CommitteeList committees={committees} onDelete={handleDelete} />
      
      <ConfirmDialog
        isOpen={committeeToDelete !== null}
        onClose={() => setCommitteeToDelete(null)}
        onConfirm={confirmDelete}
        title="Supprimer le comité"
        message="Êtes-vous sûr de vouloir supprimer ce comité ? Cette action est irréversible et supprimera également tous les clubs associés."
      />
    </div>
  );
};