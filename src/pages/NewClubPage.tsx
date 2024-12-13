import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClub } from '../services/club';
import { fetchCommittees, type Committee } from '../services/committee';

export default function NewClubPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [isLoadingCommittees, setIsLoadingCommittees] = useState(true);

  useEffect(() => {
    const loadCommittees = async () => {
      try {
        const data = await fetchCommittees();
        setCommittees(data);
      } catch (err) {
        console.error('Erreur lors du chargement des comités:', err);
        setError('Impossible de charger les comités');
      } finally {
        setIsLoadingCommittees(false);
      }
    };

    loadCommittees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      const clubData = {
        name: formData.get('name') as string,
        committee_id: formData.get('committee_id') as string,
        siret: formData.get('siret') as string,
        rna: formData.get('rna') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        street: formData.get('street') as string,
        city: formData.get('city') as string,
        postal_code: formData.get('postal_code') as string,
        handicap_access: formData.get('handicap_access') === 'on',
        sport_health: formData.get('sport_health') === 'on',
        tags: formData.get('keywords')?.toString().split(',').map(tag => tag.trim()).filter(Boolean) || []
      };

      await createClub(clubData);
      navigate('/clubs');
    } catch (err) {
      console.error('Erreur lors de la création du club:', err);
      setError('Une erreur est survenue lors de la création du club');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Autres champs... */}
      
      <div>
        <label htmlFor="committee_id">Comité</label>
        <select 
          id="committee_id" 
          name="committee_id" 
          required
          disabled={isLoadingCommittees}
        >
          <option value="">Sélectionnez un comité</option>
          {committees.map(committee => (
            <option key={committee.id} value={committee.id}>
              {committee.name}
            </option>
          ))}
        </select>
        {isLoadingCommittees && <span>Chargement des comités...</span>}
      </div>

      {/* Autres champs... */}
      
      {error && <div className="error text-red-500">{error}</div>}
      <button 
        type="submit" 
        disabled={isSubmitting || isLoadingCommittees}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? 'Création en cours...' : 'Créer le club'}
      </button>
    </form>
  );
} 