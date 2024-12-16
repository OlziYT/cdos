import React, { useEffect, useState } from 'react';
import { CommitteeList } from '../../components/committees/CommitteeList';
import { useCommitteeStore } from '../../stores/committee';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

export const CommitteesPage = () => {
  const { committees, fetchCommittees, deleteCommittee } = useCommitteeStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [committeeToDelete, setCommitteeToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchCommittees();
  }, [fetchCommittees]);

  const handleDelete = async (id: string) => {
    setCommitteeToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (committeeToDelete) {
      try {
        await deleteCommittee(committeeToDelete);
      } catch (error) {
        console.error('Failed to delete committee:', error);
      }
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div>
      <CommitteeList
        committees={committees}
        onDelete={handleDelete}
      />
      
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer le comité"
        message="Êtes-vous sûr de vouloir supprimer ce comité ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
};