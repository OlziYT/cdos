import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CommitteeForm } from '../../components/committees/CommitteeForm';
import { useCommitteeStore } from '../../stores/committee';
import { useThemeStore } from '../../stores/theme';
import type { CommitteeFormData } from '../../types/committee';

export const EditCommitteePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { committees, updateCommittee, isLoading } = useCommitteeStore();
  const { isDark } = useThemeStore();

  const committee = committees.find((c) => c.id === id);

  useEffect(() => {
    if (!committee) {
      navigate('/dashboard/committees');
    }
  }, [committee, navigate]);

  if (!committee) return null;

  const initialData: CommitteeFormData = {
    name: committee.name,
    siret: committee.siret,
    rna: committee.rna,
    email: committee.email,
    phone: committee.phone,
    street: committee.address.street,
    city: committee.address.city,
    postalCode: committee.address.postalCode,
  };

  const handleSubmit = async (data: CommitteeFormData) => {
    try {
      await updateCommittee(id!, data);
      navigate('/dashboard/committees');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du comité:', error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className={`text-2xl font-bold leading-7 ${isDark ? 'text-white' : 'text-gray-900'} sm:truncate sm:text-3xl sm:tracking-tight`}>
            Modifier le comité
          </h2>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Mettre à jour les informations du comité.
          </p>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm ring-1 ${isDark ? 'ring-gray-700' : 'ring-gray-900/5'} sm:rounded-xl md:col-span-2`}>
        <div className="px-4 py-6 sm:p-8">
          <CommitteeForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};