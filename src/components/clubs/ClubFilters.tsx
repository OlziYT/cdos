import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';

export interface FilterValues {
  search: string;
  committee: string;
  ageRange: string;
  priceRange: string;
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
}

export const ClubFilters = ({ values, onChange, committees }: ClubFiltersProps) => {
  const handleFeatureChange = (key: keyof FilterValues['features']) => {
    onChange({
      ...values,
      features: {
        ...values.features,
        [key]: !values.features[key],
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Filtres
        </h3>
        
        <Input
          placeholder="Rechercher un club..."
          value={values.search}
          onChange={(e) => onChange({ ...values, search: e.target.value })}
          icon={<Search className="h-4 w-4 text-gray-400" />}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comité
        </label>
        <Select
          value={values.committee}
          onChange={(e) => onChange({ ...values, committee: e.target.value })}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tranche d'âge
        </label>
        <Select
          value={values.ageRange}
          onChange={(e) => onChange({ ...values, ageRange: e.target.value })}
          className="w-full"
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fourchette de prix
        </label>
        <Select
          value={values.priceRange}
          onChange={(e) => onChange({ ...values, priceRange: e.target.value })}
          className="w-full"
        >
          <option value="">Tous les prix</option>
          <option value="0-100">0-100€</option>
          <option value="100-200">100-200€</option>
          <option value="200-300">200-300€</option>
          <option value="300+">300€ et plus</option>
        </Select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Caractéristiques
        </label>
        
        <Checkbox
          label="Accès handicapé"
          checked={values.features.handicapAccess}
          onChange={() => handleFeatureChange('handicapAccess')}
        />
        
        <Checkbox
          label="Sport-santé"
          checked={values.features.sportHealth}
          onChange={() => handleFeatureChange('sportHealth')}
        />
        
        <Checkbox
          label="Section féminine"
          checked={values.features.feminine}
          onChange={() => handleFeatureChange('feminine')}
        />
        
        <Checkbox
          label="Mixte"
          checked={values.features.mixed}
          onChange={() => handleFeatureChange('mixed')}
        />
        
        <Checkbox
          label="Compétition"
          checked={values.features.competition}
          onChange={() => handleFeatureChange('competition')}
        />
        
        <Checkbox
          label="Loisirs"
          checked={values.features.leisure}
          onChange={() => handleFeatureChange('leisure')}
        />
      </div>
    </div>
  );
};