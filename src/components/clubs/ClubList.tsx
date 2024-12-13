import { FileEdit, Plus, Trash2, Upload } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../../stores/theme";
import type { Club } from "../../types/club";
import { Button } from "../ui/Button";

interface ClubListProps {
  clubs: Club[];
  onDelete: (id: string) => void;
  onImport: (file: File) => void;
}

export const ClubList = ({ clubs, onDelete, onImport }: ClubListProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { isDark } = useThemeStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1
            className={`text-2xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Clubs
          </h1>
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Liste de tous les clubs sportifs du département du Tarn.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
          />
          <Button
            variant={isDark ? "outline-dark" : "outline"}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload
              className={`h-4 w-4 mr-2 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            />
            Importer
          </Button>
          <Link to="/dashboard/clubs/new">
            <Button variant={isDark ? "primary-dark" : "primary"}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau club
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div
              className={`overflow-hidden shadow ring-1 ${
                isDark ? "ring-gray-700" : "ring-black ring-opacity-5"
              } md:rounded-lg`}
            >
              <table
                className={`min-w-full divide-y ${
                  isDark ? "divide-gray-700" : "divide-gray-300"
                }`}
              >
                <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
                  <tr>
                    <th
                      scope="col"
                      className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      } sm:pl-6`}
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Ville
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Membres
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3.5 text-left text-sm font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Caractéristiques
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? "divide-gray-700" : "divide-gray-200"
                  } ${isDark ? "bg-gray-900" : "bg-white"}`}
                >
                  {clubs.map((club) => (
                    <tr
                      key={club.id}
                      className={
                        isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                      }
                    >
                      <td
                        className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium ${
                          isDark ? "text-gray-300" : "text-gray-900"
                        } sm:pl-6`}
                      >
                        {club.name}
                      </td>
                      <td
                        className={`whitespace-nowrap px-3 py-4 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {club.city}
                      </td>
                      <td
                        className={`whitespace-nowrap px-3 py-4 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {club.total_members}
                      </td>
                      <td
                        className={`whitespace-nowrap px-3 py-4 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{club.email}</span>
                          <span>{club.phone}</span>
                        </div>
                      </td>
                      <td
                        className={`px-3 py-4 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        <div className="flex flex-wrap gap-2">
                          {club.handicap_access && (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                isDark
                                  ? "bg-blue-900/50 text-blue-200"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              Accès PMR
                            </span>
                          )}
                          {club.sport_health && (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                isDark
                                  ? "bg-green-900/50 text-green-200"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              Sport-Santé
                            </span>
                          )}
                          {club.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                isDark
                                  ? "bg-purple-900/50 text-purple-200"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/dashboard/clubs/${club.id}/edit`}
                            className={`${
                              isDark
                                ? "text-blue-400 hover:text-blue-300"
                                : "text-blue-600 hover:text-blue-900"
                            }`}
                          >
                            <FileEdit className="h-4 w-4" />
                            <span className="sr-only">
                              Modifier {club.name}
                            </span>
                          </Link>
                          <button
                            onClick={() => onDelete(club.id)}
                            className={`${
                              isDark
                                ? "text-red-400 hover:text-red-300"
                                : "text-red-600 hover:text-red-900"
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">
                              Supprimer {club.name}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
