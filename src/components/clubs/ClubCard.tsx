import { Info, MapPin, Target } from "lucide-react";
import type { Club } from "../../types/club";
import { Button } from "../ui/Button";

interface ClubCardProps {
  club: Club;
  onShowOnMap: () => void;
  isDark?: boolean;
}

export const ClubCard = ({
  club,
  onShowOnMap,
  isDark = false,
}: ClubCardProps) => {
  console.log("Club data:", club);
  console.log("Image URL:", club.image_url);
  return (
    <div
      className={`${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md overflow-hidden`}
    >
      <div className="relative">
        <img
          src={
            club.image_url ||
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          }
          alt={club.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-lg font-semibold text-white">{club.name}</h3>
          <p className="text-sm text-gray-200 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {club.city}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-1">
          {club.handicap_access && (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDark
                  ? "bg-blue-900/80 text-blue-100"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              Handicap
            </span>
          )}
          {club.sport_health && (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDark
                  ? "bg-green-900 text-green-200"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Sport-santé
            </span>
          )}
          {club.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDark
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onShowOnMap}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? "bg-blue-900/80 text-blue-100 hover:bg-blue-800/80"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <MapPin className="h-4 w-4" />
            Voir sur la carte
          </button>

          <button
            onClick={() => {
              /* TODO: Implement modal with details */
            }}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? "bg-blue-900/80 text-blue-100 hover:bg-blue-800/80"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Info className="h-4 w-4" />
            Plus d'infos
          </button>
        </div>
      </div>
    </div>
  );
};
