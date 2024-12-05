import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Club } from '../../types/club';
import { MapPin } from 'lucide-react';

interface ClubMapProps {
  clubs: Club[];
  center?: [number, number];
  zoom?: number;
}

export const ClubMap = React.forwardRef<any, ClubMapProps>(({
  clubs,
  center = [43.9277, 2.1478], // Albi coordinates
  zoom = 10,
}, ref) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-[500px] w-full rounded-lg z-0"
      ref={ref}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clubs.map((club) => (
        <Marker
          key={club.id}
          position={[club.address.location.lat, club.address.location.lng]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{club.name}</h3>
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
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

ClubMap.displayName = 'ClubMap';