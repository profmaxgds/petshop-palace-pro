
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Heart, Scale, Calendar } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal } from '@/types';
import AnimalActions from './AnimalActions';

interface AnimalsTableProps {
  animals: Animal[];
  onEdit: (animal: Animal) => void;
  onDelete: (animalId: string) => void;
  onViewHistory: (animal: Animal) => void;
  onNavigateToVaccines: (animalId: string) => void;
  onDownloadCard: (animalId: string) => void;
}

const AnimalsTable: React.FC<AnimalsTableProps> = ({
  animals,
  onEdit,
  onDelete,
  onViewHistory,
  onNavigateToVaccines,
  onDownloadCard
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Animal</TableHead>
            <TableHead>Espécie/Raça</TableHead>
            <TableHead>Detalhes</TableHead>
            <TableHead>Tutor</TableHead>
            <TableHead className="text-right">{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-medium">{animal.name}</div>
                    <Badge variant={animal.sex === 'male' ? 'default' : 'secondary'} className="text-xs">
                      {t(animal.sex)}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{t(animal.species)}</div>
                  <div className="text-sm text-gray-500">{animal.breed?.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {animal.age} anos
                  </div>
                  <div className="flex items-center text-sm">
                    <Scale className="w-3 h-3 mr-1" />
                    {animal.weight} kg
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">{animal.tutor?.name}</div>
                  <div className="text-gray-500">{animal.tutor?.phone}</div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <AnimalActions
                  animal={animal}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onViewHistory={onViewHistory}
                  onNavigateToVaccines={onNavigateToVaccines}
                  onDownloadCard={onDownloadCard}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnimalsTable;
