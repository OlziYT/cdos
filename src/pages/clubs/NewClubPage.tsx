import { useNavigate } from 'react-router-dom';
import { useClubStore } from '../../stores/club';
import { useThemeStore } from '../../stores/theme';
import { ClubForm } from '../../components/clubs/ClubForm';
import type { ClubFormData } from '../../types/club';

export const NewClubPage = () => {
  const navigate = useNavigate();
  const { createClub, isLoading } = useClubStore();
  const { isDark } = useThemeStore();

  const handleSubmit = async (data: ClubFormData) => {
    try {
      await createClub(data);
      navigate('/dashboard/clubs');
    } catch (error) {
      console.error('Erreur lors de la création du club:', error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className={`text-2xl font-bold leading-7 ${isDark ? 'text-white' : 'text-gray-900'} sm:truncate sm:text-3xl sm:tracking-tight`}>
            Nouveau Club
          </h2>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Créer un nouveau club sportif dans le département du Tarn.
          </p>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm ring-1 ${isDark ? 'ring-gray-700' : 'ring-gray-900/5'} sm:rounded-xl md:col-span-2`}>
        <div className="px-4 py-6 sm:p-8">
          <ClubForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};