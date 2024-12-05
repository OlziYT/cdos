import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ClubMap } from '../../components/map/ClubMap';
import { useClubStore } from '../../stores/club';
import { useCommitteeStore } from '../../stores/committee';
import { Header } from '../../components/layout/Header';

export const SearchPage = () => {
  const { clubs, fetchClubs } = useClubStore();
  const { committees, fetchCommittees } = useCommitteeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState({
    handicapAccess: false,
    sportHealth: false,
  });

  useEffect(() => {
    fetchClubs();
    fetchCommittees();
  }, [fetchClubs, fetchCommittees]);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommittee = !selectedCommittee || club.committeeId === selectedCommittee;
    const matchesFeatures =
      (!selectedFeatures.handicapAccess || club.features.handicapAccess) &&
      (!selectedFeatures.sportHealth || club.features.sportHealth);
    return matchesSearch && matchesCommittee && matchesFeatures;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rechercher un club</h1>
          <p className="mt-2 text-gray-600">
            Utilisez les filtres ci-dessous pour trouver le club qui vous correspond
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Filtres</h3>
                <Input
                  placeholder="Rechercher un club..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="h-4 w-4 text-gray-400" />}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comité
                </label>
                <Select
                  value={selectedCommittee}
                  onChange={(e) => setSelectedCommittee(e.target.value)}
                  className="w-full"
                >
                  <option value="">Tous les comités</option>
                  {committees.map((committee) => (
                    <option key={committee.id} value={committee.id}>
                      {committee.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caractéristiques
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.handicapAccess}
                    onChange={(e) =>
                      setSelectedFeatures((prev) => ({
                        ...prev,
                        handicapAccess: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Accès handicapé</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.sportHealth}
                    onChange={(e) =>
                      setSelectedFeatures((prev) => ({
                        ...prev,
                        sportHealth: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Sport-santé</span>
                </label>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                {filteredClubs.length} club(s) trouvé(s)
              </h3>
              <div className="divide-y divide-gray-200">
                {filteredClubs.map((club) => (
                  <div key={club.id} className="py-4">
                    <h4 className="font-semibold text-gray-900">{club.name}</h4>
                    <p className="text-sm text-gray-600">{club.address.street}</p>
                    <p className="text-sm text-gray-600">
                      {club.address.postalCode} {club.address.city}
                    </p>
                    <div className="mt-2 flex gap-1">
                      {club.features.handicapAccess && (
                        <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                          Handicap
                        </span>
                      )}
                      {club.features.sportHealth && (
                        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                          Sport-santé
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <ClubMap clubs={filteredClubs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};