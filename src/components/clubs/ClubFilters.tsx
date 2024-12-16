import React, { useState } from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { useThemeStore } from '../../stores/theme';

const AVAILABLE_SPORTS = [
  "Football",
  "Basketball",
  "Tennis",
  "Natation",
  "Athlétisme",
  "Judo",
  "Gymnastique",
  "Cyclisme",
  "Rugby",
  "Volleyball",
  "Handball",
  "Pétanque",
  "Badminton",
  "Escalade",
  "Karaté"
] as const;

export interface FilterValues {
  search: string;
  committee: string;
  ageRange: string;
  sports: string[];
  features: {
    handicapAccess: boolean;
    sportHealth: boolean;
    feminine: boolean;
    mixed: boolean;
    competition: boolean;
    leisure: boolean;
  };
}

interface ClubFiltersProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  committees: Array<{ id: string; name: string }>;
  isDark?: boolean;
}

export const ClubFilters = ({ values, onChange, committees, isDark = false }: ClubFiltersProps) => {
  const [sportsSearch, setSportsSearch] = useState("");
  
  const handleFeatureChange = (key: keyof FilterValues['features']) => {
    onChange({
      ...values,
      features: {
        ...values.features,
        [key]: !values.features[key],
      },
    });
  };

  const handleSportChange = (sport: string) => {
    const newSports = values.sports.includes(sport)
      ? values.sports.filter(s => s !== sport)
      : [...values.sports, sport];
    
    onChange({
      ...values,
      sports: newSports,
    });
  };

  const handleClearFilters = () => {
    onChange({
      search: "",
      committee: "",
      ageRange: "",
      sports: [],
      features: {
        handicapAccess: false,
        sportHealth: false,
        feminine: false,
        mixed: false,
        competition: false,
        leisure: false,
      },
    });
    setSportsSearch("");
  };

  const filteredSports = AVAILABLE_SPORTS.filter(sport => 
    sport.toLowerCase().includes(sportsSearch.toLowerCase())
  );

  const hasActiveFilters = 
    values.search !== "" ||
    values.committee !== "" ||
    values.ageRange !== "" ||
    values.sports.length > 0 ||
    Object.values(values.features).some(value => value);

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      {/* Header with title and reset button */}
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} flex items-center`}>
          <Filter className={`h-5 w-5 mr-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          Filtres
        </h3>
        {hasActiveFilters && (
          <Button
            variant={isDark ? "ghost-dark" : "ghost"}
            size="sm"
            onClick={handleClearFilters}
            className="flex items-center text-sm"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Search input */}
      <div className="mb-6">
        <Input
          placeholder="Rechercher un club..."
          value={values.search}
          onChange={(e) => onChange({ ...values, search: e.target.value })}
          icon={<Search className={`h-4 w-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />}
          isDark={isDark}
        />
      </div>

      {/* Main filters grid */}
      <div className="grid gap-6">
        {/* Committee select */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Comité
          </label>
          <Select
            value={values.committee}
            onChange={(e) => onChange({ ...values, committee: e.target.value })}
            isDark={isDark}
          >
            <option value="">Tous les comités</option>
            {committees.map((committee) => (
              <option key={committee.id} value={committee.id}>
                {committee.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Age range select */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Tranche d'âge
          </label>
          <Select
            value={values.ageRange}
            onChange={(e) => onChange({ ...values, ageRange: e.target.value })}
            isDark={isDark}
          >
            <option value="">Toutes les tranches d'âge</option>
            <option value="3-6">3-6 ans</option>
            <option value="7-11">7-11 ans</option>
            <option value="12-15">12-15 ans</option>
            <option value="16-18">16-18 ans</option>
            <option value="adult">Adultes</option>
            <option value="senior">Seniors</option>
          </Select>
        </div>

        {/* Sports filter */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Sports
          </label>
          <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
            {/* Sports search */}
            <Input
              placeholder="Rechercher un sport..."
              value={sportsSearch}
              onChange={(e) => setSportsSearch(e.target.value)}
              isDark={isDark}
              className="mb-2"
            />
            
            {/* Selected sports tags */}
            {values.sports.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {values.sports.map(sport => (
                  <span 
                    key={sport}
                    className={`
                      inline-flex items-center px-2 py-1 rounded-full text-sm
                      ${isDark 
                        ? 'bg-blue-900 text-blue-100' 
                        : 'bg-blue-100 text-blue-800'
                      }
                    `}
                  >
                    {sport}
                    <button
                      onClick={() => handleSportChange(sport)}
                      className={`ml-1 p-0.5 rounded-full hover:bg-blue-200 hover:text-blue-900`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {/* Sports list */}
            <div 
              className={`
                max-h-48 overflow-y-auto custom-scrollbar
                ${isDark ? 'dark-scrollbar' : 'light-scrollbar'}
              `}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? '#4B5563 #1F2937' : '#D1D5DB #F3F4F6'
              }}
            >
              {filteredSports.map(sport => (
                <div
                  key={sport}
                  className={`
                    px-2 py-1.5 rounded cursor-pointer text-sm mb-1 transition-colors
                    ${values.sports.includes(sport)
                      ? isDark
                        ? 'bg-blue-900 text-blue-100'
                        : 'bg-blue-100 text-blue-800'
                      : isDark
                        ? 'hover:bg-gray-600 text-gray-200'
                        : 'hover:bg-gray-200 text-gray-700'
                    }
                  `}
                  onClick={() => handleSportChange(sport)}
                >
                  {sport}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features checkboxes */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Caractéristiques
          </label>
          <div className="grid grid-cols-1 gap-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <Checkbox
                    id="handicapAccess"
                    label="Accès handicapé"
                    checked={values.features.handicapAccess}
                    onChange={() => handleFeatureChange('handicapAccess')}
                    isDark={isDark}
                  />
                  <Checkbox
                    id="feminine"
                    label="Section féminine"
                    checked={values.features.feminine}
                    onChange={() => handleFeatureChange('feminine')}
                    isDark={isDark}
                  />
                  <Checkbox
                    id="competition"
                    label="Compétition"
                    checked={values.features.competition}
                    onChange={() => handleFeatureChange('competition')}
                    isDark={isDark}
                  />
                </div>
                <div className="space-y-3">
                  <Checkbox
                    id="sportHealth"
                    label="Sport-santé"
                    checked={values.features.sportHealth}
                    onChange={() => handleFeatureChange('sportHealth')}
                    isDark={isDark}
                  />
                  <Checkbox
                    id="mixed"
                    label="Section mixte"
                    checked={values.features.mixed}
                    onChange={() => handleFeatureChange('mixed')}
                    isDark={isDark}
                  />
                  <Checkbox
                    id="leisure"
                    label="Loisirs"
                    checked={values.features.leisure}
                    onChange={() => handleFeatureChange('leisure')}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};