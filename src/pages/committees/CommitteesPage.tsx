import React, { useEffect } from 'react';
import { CommitteeList } from '../../components/committees/CommitteeList';
import { useCommitteeStore } from '../../stores/committee';

export const CommitteesPage = () => {
  const { committees, fetchCommittees, deleteCommittee } = useCommitteeStore();

  useEffect(() => {
    fetchCommittees();
  }, [fetchCommittees]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this committee?')) {
      try {
        await deleteCommittee(id);
      } catch (error) {
        console.error('Failed to delete committee:', error);
      }
    }
  };

  return (
    <div>
      <CommitteeList
        committees={committees}
        onDelete={handleDelete}
      />
    </div>
  );
};