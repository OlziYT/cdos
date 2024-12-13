import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Club } from "../../types/club";

interface ClubMapProps {
  clubs: Club[];
  center?: [number, number];
  zoom?: number;
  isDark?: boolean;
}

export const ClubMap = React.forwardRef<any, ClubMapProps>(
  (
    {
      clubs,
      center = [43.9277, 2.1478], // Albi coordinates
      zoom = 10,
      isDark = false,
    },
    ref
  ) => {
    return (
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-lg z-0"
        ref={ref}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            isDark
              ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        {clubs.map((club) => {
          if (!club.location?.coordinates) return null;

          return (
            <Marker
              key={club.id}
              position={[
                club.location.coordinates[1],
                club.location.coordinates[0],
              ]}
            >
              <Popup>
                <div
                  className={`p-2 ${
                    isDark ? "bg-gray-800 text-white" : "bg-white"
                  }`}
                >
                  <h3 className="font-semibold">{club.name}</h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {club.street}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {club.postal_code} {club.city}
                  </p>
                  <div className="mt-2 flex gap-1">
                    {club.handicap_access && (
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          isDark
                            ? "bg-blue-900 text-blue-200"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        Handicap
                      </span>
                    )}
                    {club.sport_health && (
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          isDark
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        Sport-santé
                      </span>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
  }
);

ClubMap.displayName = "ClubMap";
