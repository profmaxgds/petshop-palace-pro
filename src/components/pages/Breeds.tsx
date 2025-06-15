import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Breed } from '@/types';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

interface SpeciesData {
  id: string;
  name: string;
  systemName: string;
  isActive: boolean;
}

interface BreedsProps {
  speciesList: SpeciesData[];
}

const Breeds: React.FC<BreedsProps> = ({ speciesList }) => {
  const { toast } = useToast();
  const [breeds, setBreeds] = useState<Breed[]>([
    {
      id: '1',
      name: 'Labrador',
      species: 'dog',
      characteristics: 'Cão dócil e amigável',
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Persa',
      species: 'cat',
      characteristics: 'Gato de pelo longo',
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Golden Retriever',
      species: 'dog',
      characteristics: 'Cão inteligente e leal',
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    species: speciesList.find(s => s.isActive)?.id || '',
    characteristics: '',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedSpeciesData = speciesList.find(s => s.id === formData.species);

    const newBreed: Breed = {
      id: selectedBreed?.id || Date.now().toString(),
      name: formData.name,
      species: (selectedSpeciesData?.systemName || 'other') as Breed['species'],
      characteristics: formData.characteristics,
      isActive: formData.isActive,
      createdBy: selectedBreed?.createdBy || '1',
      createdAt: selectedBreed?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (selectedBreed) {
      setBreeds(breeds.map(breed => breed.id === selectedBreed.id ? newBreed : breed));
      toast({
        title: t('success'),
        description: 'Raça atualizada com sucesso!',
      });
    } else {
      setBreeds([...breeds, newBreed]);
      toast({
        title: t('success'),
        description: 'Raça cadastrada com sucesso!',
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      species: speciesList.find(s => s.isActive)?.id || '',
      characteristics: '',
      isActive: true
    });
    setSelectedBreed(null);
  };

  const handleEdit = (breed: Breed) => {
    setSelectedBreed(breed);
    const speciesEntry = speciesList.find(s => s.systemName === breed.species);
    setFormData({
      name: breed.name,
      species: speciesEntry ? speciesEntry.id : (speciesList.find(s => s.isActive)?.id || ''),
      characteristics: breed.characteristics || '',
      isActive: breed.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta raça?')) {
      setBreeds(breeds.filter(breed => breed.id !== id));
      toast({
        title: t('success'),
        description: 'Raça excluída com sucesso!',
      });
    }
  };

  const getSpeciesLabel = (speciesSystemName: string) => {
    return speciesList.find(s => s.systemName === speciesSystemName)?.name || speciesSystemName;
  };

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = filterSpecies === 'all' || breed.species === filterSpecies;
    return matchesSearch && matchesSpecies;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('breeds')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Raça
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedBreed ? 'Editar Raça' : 'Nova Raça'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="species">{t('species')}</Label>
                <Select value={formData.species} onValueChange={(value) => setFormData({ ...formData, species: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    {speciesList.filter(s => s.isActive).map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="characteristics">Características</Label>
                <Input
                  id="characteristics"
                  value={formData.characteristics}
                  onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
                  placeholder="Descreva as características da raça"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Raça ativa</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit">
                  {selectedBreed ? t('save') : t('add')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Raças Cadastradas</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar raças..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterSpecies} onValueChange={setFilterSpecies}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por espécie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as espécies</SelectItem>
                  {speciesList.map((s) => (
                      <SelectItem key={s.id} value={s.systemName}>{s.name}s</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBreeds.map((breed) => (
              <div key={breed.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium">{breed.name}</h3>
                      <p className="text-sm text-gray-500">{breed.characteristics}</p>
                    </div>
                    <Badge variant="outline">
                      {getSpeciesLabel(breed.species)}
                    </Badge>
                    {!breed.isActive && (
                      <Badge variant="destructive">Inativa</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(breed)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(breed.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Breeds;
