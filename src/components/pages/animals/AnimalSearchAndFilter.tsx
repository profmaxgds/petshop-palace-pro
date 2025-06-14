
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface AnimalSearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const AnimalSearchAndFilter: React.FC<AnimalSearchAndFilterProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Search className="w-4 h-4 text-gray-400" />
      <Input
        placeholder="Buscar por nome, espécie ou tutor..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default AnimalSearchAndFilter;
