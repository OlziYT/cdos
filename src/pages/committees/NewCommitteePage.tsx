import { useNavigate } from 'react-router-dom';
import { useCommitteeStore } from '../../stores/committee';
import { useThemeStore } from '../../stores/theme';
import { CommitteeForm } from '../../components/committees/CommitteeForm';
import type { CommitteeFormData } from '../../types/committee';
import { useState } from 'react';

export const NewCommitteePage = () => {
  const navigate = useNavigate();
  const { createCommittee, isLoading } = useCommitteeStore();
  const { isDark } = useThemeStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CommitteeFormData) => {
    try {
      setError(null);
      await createCommittee(data);
      navigate('/dashboard/committees');
    } catch (error) {
      console.error('Erreur lors de la création du comité:', error);
      setError('Une erreur est survenue lors de la création du comité. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className={`text-2xl font-bold leading-7 ${isDark ? 'text-white' : 'text-gray-900'} sm:truncate sm:text-3xl sm:tracking-tight`}>
            Nouveau Comité
          </h2>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Créer un nouveau comité sportif dans le département du Tarn.
          </p>
        </div>
      </div>

      {error && (
        <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-800'}`}>
          {error}
        </div>
      )}

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm ring-1 ${isDark ? 'ring-gray-700' : 'ring-gray-900/5'} sm:rounded-xl md:col-span-2`}>
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