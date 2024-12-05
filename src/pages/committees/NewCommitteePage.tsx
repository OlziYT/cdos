import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommitteeForm } from '../../components/committees/CommitteeForm';
import { useCommitteeStore } from '../../stores/committee';
import type { CommitteeFormData } from '../../types/committee';

export const NewCommitteePage = () => {
  const navigate = useNavigate();
  const { createCommittee, isLoading } = useCommitteeStore();

  const handleSubmit = async (data: CommitteeFormData) => {
    try {
      await createCommittee(data);
      navigate('/dashboard/committees');
    } catch (error) {
      console.error('Failed to create committee:', error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            New Committee
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a new sports committee in the Tarn department.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <CommitteeForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};