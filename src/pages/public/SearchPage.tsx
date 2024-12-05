import React, { useState, useEffect, useRef } from 'react';
import { Filter, MapPin, LayoutGrid } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { ClubMap } from '../../components/map/ClubMap';
import { ClubCard } from '../../components/clubs/ClubCard';
import { ClubFilters, type FilterValues } from '../../components/clubs/ClubFilters';
import { MobileFiltersDrawer } from '../../components/clubs/MobileFiltersDrawer';
import { Button } from '../../components/ui/Button';
import { useClubStore } from '../../stores/club';
import { useCommitteeStore } from '../../stores/committee';
import { useThemeStore } from '../../stores/theme';

export const SearchPage = () => {
  const mapRef = useRef<any>(null);
  const { clubs, fetchClubs } = useClubStore();
  const { committees, fetchCommittees } = useCommitteeStore();
  const { isDark } = useThemeStore();
  const [showMap, setShowMap] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    committee: '',
    ageRange: '',
    priceRange: '',
    features: {
      handicapAccess: false,
      sportHealth: false,
      feminine: false,
      mixed: false,
      competition: false,
      leisure: false,
    },
  });

  useEffect(() => {
    fetchClubs();
    fetchCommittees();
  }, [fetchClubs, fetchCommittees]);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCommittee = !filters.committee || club.committeeId === filters.committee;
    const matchesFeatures = 
      (!filters.features.handicapAccess || club.features.handicapAccess) &&
      (!filters.features.sportHealth || club.features.sportHealth) &&
      (!filters.features.feminine || club.tags.includes('Féminin')) &&
      (!filters.features.mixed || club.tags.includes('Mixte')) &&
      (!filters.features.competition || club.tags.includes('Compétition')) &&
      (!filters.features.leisure || club.tags.includes('Loisirs'));
    
    return matchesSearch && matchesCommittee && matchesFeatures;
  });

  const handleShowOnMap = (club: typeof clubs[0]) => {
    setShowMap(true);
    if (mapRef.current) {
      mapRef.current.setView(
        [club.address.location.lat, club.address.location.lng],
        15
      );
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Rechercher un club
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Trouvez le club qui correspond à vos critères parmi notre sélection
          </p>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center justify-between gap-4 mb-6 lg:hidden">
          <Button
            variant={isDark ? "outline-dark" : "outline"}
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex-1"
          >
            <Filter className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            Filtres
          </Button>
          <Button
            variant={isDark ? "outline-dark" : "outline"}
            onClick={() => setShowMap(!showMap)}
            className="flex-1"
          >
            {showMap ? (
              <>
                <LayoutGrid className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                Liste
              </>
            ) : (
              <>
                <MapPin className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                Carte
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:col-span-3">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <ClubFilters
                values={filters}
                onChange={setFilters}
                committees={committees}
                isDark={isDark}
              />
            </div>
          </div>

          {/* Mobile Filters Drawer */}
          <MobileFiltersDrawer
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            values={filters}
            onChange={setFilters}
            committees={committees}
            isDark={isDark}
          />

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* Map (toggleable on mobile) */}
            <div className={`${showMap ? 'block' : 'hidden lg:block'}`}>
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 h-[400px] lg:h-[500px]`}>
                <ClubMap
                  clubs={filteredClubs}
                  ref={mapRef}
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Club List */}
            <div className={`${!showMap ? 'block' : 'hidden lg:block'}`}>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                {filteredClubs.length} club(s) trouvé(s)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    onShowOnMap={() => handleShowOnMap(club)}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};