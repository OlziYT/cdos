import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileEdit, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Committee } from '../../types/committee';

interface CommitteeListProps {
  committees: Committee[];
  onDelete: (id: string) => void;
}

export const CommitteeList = ({ committees, onDelete }: CommitteeListProps) => {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Committees</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all sports committees in the Tarn department.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/dashboard/committees/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Committee
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SIRET</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Members</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Clubs</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {committees.map((committee) => (
                    <tr key={committee.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {committee.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {committee.siret}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {committee.address.city}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {committee.stats.totalMembers}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {committee.stats.totalClubs}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/dashboard/committees/${committee.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FileEdit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => onDelete(committee.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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