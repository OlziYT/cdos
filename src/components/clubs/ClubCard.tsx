import React from 'react';
import { MapPin, Info, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Club } from '../../types/club';

interface ClubCardProps {
  club: Club;
  onShowOnMap: () => void;
}

export const ClubCard = ({ club, onShowOnMap }: ClubCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={club.imageUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
          alt={club.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-lg font-semibold text-white">{club.name}</h3>
          <p className="text-sm text-gray-200 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {club.address.city}
          </p>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-1">
          {club.features.handicapAccess && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
              Handicap
            </span>
          )}
          {club.features.sportHealth && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
              Sport-santé
            </span>
          )}
          {club.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-initial"
            onClick={onShowOnMap}
          >
            <Target className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Voir sur la carte</span>
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-initial"
            onClick={() => {/* TODO: Implement modal with details */}}
          >
            <Info className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Plus d'infos</span>
          </Button>
        </div>
      </div>
    </div>
  );
};