import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { ClubFilters, type FilterValues } from './ClubFilters';

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  committees: Array<{ id: string; name: string }>;
}

export const MobileFiltersDrawer = ({
  isOpen,
  onClose,
  values,
  onChange,
  committees,
}: MobileFiltersDrawerProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Filtres</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="p-4">
            <ClubFilters
              values={values}
              onChange={onChange}
              committees={committees}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button onClick={onClose} className="w-full">
            Appliquer les filtres
          </Button>
        </div>
      </div>
    </div>
  );
};