import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileEdit, Trash2, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { useThemeStore } from '../../stores/theme';
import type { Club } from '../../types/club';

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
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Clubs</h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            A list of all sports clubs in the Tarn department.
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
            <Upload className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            Import
          </Button>
          <Link to="/dashboard/clubs/new">
            <Button variant={isDark ? "primary-dark" : "primary"}>
              <Plus className="h-4 w-4 mr-2" />
              Add Club
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className={`overflow-hidden shadow ring-1 ${isDark ? 'ring-gray-700' : 'ring-black ring-opacity-5'} md:rounded-lg`}>
              <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-300'}`}>
                <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-3 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Name</th>
                    <th className={`px-3 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Committee</th>
                    <th className={`px-3 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>City</th>
                    <th className={`px-3 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Members</th>
                    <th className={`px-3 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Features</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
                  {clubs.map((club) => (
                    <tr key={club.id} className={isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {club.name}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {club.committeeId}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {club.address.city}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {club.stats.totalMembers}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        <div className="flex gap-2">
                          {club.features.handicapAccess && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              isDark 
                                ? 'bg-blue-900 text-blue-200' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              Handicap
                            </span>
                          )}
                          {club.features.sportHealth && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              isDark 
                                ? 'bg-green-900 text-green-200' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              Sport Health
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/dashboard/clubs/${club.id}/edit`}
                            className={`text-blue-600 hover:text-blue-900 ${isDark ? 'text-blue-400 hover:text-blue-300' : ''}`}
                          >
                            <FileEdit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => onDelete(club.id)}
                            className={`text-red-600 hover:text-red-900 ${isDark ? 'text-red-400 hover:text-red-300' : ''}`}
                          >
                            <Trash2 className="h-4 w-4" />
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