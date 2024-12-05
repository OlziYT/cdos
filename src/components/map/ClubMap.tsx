import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Club } from '../../types/club';
import { MapPin } from 'lucide-react';

interface ClubMapProps {
  clubs: Club[];
  center?: [number, number];
  zoom?: number;
  isDark?: boolean;
}

export const ClubMap = React.forwardRef<any, ClubMapProps>(({
  clubs,
  center = [43.9277, 2.1478], // Albi coordinates
  zoom = 10,
  isDark = false,
}, ref) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`h-[500px] w-full rounded-lg z-0`}
      ref={ref}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={isDark 
          ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />
      {clubs.map((club) => (
        <Marker
          key={club.id}
          position={[club.address.location.lat, club.address.location.lng]}
        >
          <Popup>
            <div className={`p-2 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <h3 className="font-semibold">{club.name}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {club.address.street}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {club.address.postalCode} {club.address.city}
              </p>
              <div className="mt-2 flex gap-1">
                {club.features.handicapAccess && (
                  <span className={`rounded px-2 py-1 text-xs ${
                    isDark 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    Handicap
                  </span>
                )}
                {club.features.sportHealth && (
                  <span className={`rounded px-2 py-1 text-xs ${
                    isDark 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    Sport-santé
                  </span>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

ClubMap.displayName = 'ClubMap';