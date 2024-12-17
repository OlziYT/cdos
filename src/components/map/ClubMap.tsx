import "leaflet/dist/leaflet.css";
import "../../styles/leaflet-dark.css";
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import type { Club } from "../../types/club";
import { Button } from "../ui/Button";
import { Navigation2 } from "lucide-react";

interface ClubMapProps {
  clubs: Club[];
  center?: [number, number];
  zoom?: number;
  isDark?: boolean;
}

interface Route {
  coordinates: [number, number][];
  distance: number;
  duration: number;
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
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      // Vérifie si l'utilisateur a déjà donné la permission
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            getUserLocation();
          }
        });
    }, []);

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            console.error("Erreur de géolocalisation:", error);
          }
        );
      }
    };

    const getRoute = async (club: Club) => {
      if (!userLocation || !club.location?.coordinates) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${club.location.coordinates[0]},${club.location.coordinates[1]}?overview=full&geometries=geojson`
        );

        if (!response.ok) {
          throw new Error("Erreur lors du calcul de l'itinéraire");
        }

        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          setSelectedRoute({
            coordinates: route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]),
            distance: route.distance / 1000, // Convert to km
            duration: route.duration / 60 // Convert to minutes
          });
        }
      } catch (error) {
        console.error("Erreur lors du calcul de l'itinéraire:", error);
      }
      setIsLoading(false);
    };

    // Création d'une icône personnalisée pour la position de l'utilisateur
    const createUserLocationIcon = (isDark: boolean) => 
      L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
          background-color: #EF4444;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        ">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

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

        {userLocation && (
          <Marker position={userLocation} icon={createUserLocationIcon(isDark)}>
            <Popup className={isDark ? "dark-theme" : "light-theme"}>
              <div className={`${
                isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
              } -m-2 p-4 rounded-lg`}>
                <p className="font-medium">Votre position</p>
              </div>
            </Popup>
          </Marker>
        )}

        {selectedRoute && (
          <Polyline
            positions={selectedRoute.coordinates}
            color={isDark ? "#60A5FA" : "#2563EB"}
            weight={4}
            opacity={0.7}
          />
        )}

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
              <Popup className={isDark ? "dark-theme" : "light-theme"}>
                <div className={`${
                  isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
                } -m-2 p-4 rounded-lg`}>
                  <h3 className="font-semibold text-lg">{club.name}</h3>
                  <p className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } text-sm mt-1`}>{club.street}</p>
                  <p className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } text-sm`}>{club.postal_code} {club.city}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {club.handicap_access && (
                      <span className="bg-blue-900 text-blue-200 rounded px-2 py-1 text-xs">
                        Handicap
                      </span>
                    )}
                    {club.sport_health && (
                      <span className="bg-green-900 text-green-200 rounded px-2 py-1 text-xs">
                        Sport-santé
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!userLocation) {
                          await getUserLocation();
                        }
                        if (club) {
                          getRoute(club);
                        }
                      }}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark
                          ? "bg-blue-900/80 text-blue-100 hover:bg-blue-800/80"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <Navigation2 className="h-4 w-4" />
                      {isLoading ? "Calcul en cours..." : "Calculer l'itinéraire"}
                    </Button>
                    
                    {selectedRoute && (
                      <div className="text-gray-300 text-sm mt-2">
                        <p>Distance : {selectedRoute.distance.toFixed(1)} km</p>
                        <p>Durée : {Math.round(selectedRoute.duration)} min</p>
                      </div>
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
