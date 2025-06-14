
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Edit, Trash2, Syringe } from 'lucide-react';
import type { Animal } from '@/types';

interface AnimalActionsProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (animalId: string) => void;
  onViewHistory: (animal: Animal) => void;
  onNavigateToVaccines: (animalId: string) => void;
  onDownloadCard: (animalId: string) => void;
}

const AnimalActions: React.FC<AnimalActionsProps> = ({
  animal,
  onEdit,
  onDelete,
  onViewHistory,
  onNavigateToVaccines,
  onDownloadCard
}) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewHistory(animal)}
        title="Ver Histórico"
      >
        <Calendar className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDownloadCard(animal.id)}
        className="text-blue-600 hover:text-blue-800"
        title="Baixar Carteirinha"
      >
        <Download className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigateToVaccines(animal.id)}
        className="text-green-600 hover:text-green-800"
        title="Vacinar"
      >
        <Syringe className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(animal)}
        title="Editar"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(animal.id)}
        className="text-red-600 hover:text-red-800"
        title="Excluir"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AnimalActions;
