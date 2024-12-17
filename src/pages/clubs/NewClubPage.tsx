import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClubForm } from "../../components/clubs/ClubForm";
import { useClubStore } from "../../stores/club";
import { useCommitteeStore } from "../../stores/committee";
import { useThemeStore } from "../../stores/theme";
import { ClubFormData } from "../../types/club";

export const NewClubPage = () => {
  const { createClub } = useClubStore();
  const { fetchCommittees } = useCommitteeStore();
  const { isDark } = useThemeStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCommittees();
  }, [fetchCommittees]);

  const handleSubmit = async (data: ClubFormData, image: File | null) => {
    try {
      setError(null);
      console.log("Tentative de création du club avec les données:", data);
      const result = await createClub(data, image);
      
      if (result) {
        console.log("Club créé avec succès, redirection...");
        navigate("/dashboard/clubs");
        return;
      }
      
      setError("La création du club a échoué. Veuillez réessayer.");
      console.error("Erreur: Le club n'a pas été créé");
    } catch (error) {
      setError("Une erreur est survenue lors de la création du club.");
      console.error("Erreur lors de la création du club:", error);
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2
            className={`text-2xl font-bold leading-7 ${
              isDark ? "text-white" : "text-gray-900"
            } sm:truncate sm:text-3xl sm:tracking-tight`}
          >
            Nouveau Club
          </h2>
          <p
            className={`mt-1 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Créer un nouveau club sportif dans le département du Tarn.
          </p>
        </div>
      </div>

      {error && (
        <div className={`mb-4 p-4 rounded-lg ${
          isDark ? "bg-red-900/50 text-red-200" : "bg-red-50 text-red-800"
        }`}>
          {error}
        </div>
      )}

      <div
        className={`${isDark ? "bg-gray-800" : "bg-white"} shadow-sm ring-1 ${
          isDark ? "ring-gray-700" : "ring-gray-900/5"
        } sm:rounded-xl md:col-span-2`}
      >
        <div className="px-4 py-6 sm:p-8">
          <ClubForm onSubmit={handleSubmit} isLoading={false} />
        </div>
      </div>
    </div>
  );
};
