
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

interface SpeciesData {
  id: string;
  name: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  systemName: string;
}

interface SpeciesProps {
  speciesList: SpeciesData[];
  onAdd: (species: Pick<SpeciesData, 'name' | 'isActive'>) => void;
  onUpdate: (species: SpeciesData) => void;
  onDelete: (id: string) => void;
}

const Species: React.FC<SpeciesProps> = ({ speciesList, onAdd, onUpdate, onDelete }) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [formData, setFormData] = useState({ name: '', isActive: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({ title: t('error'), description: 'O nome da espécie é obrigatório.', variant: 'destructive' });
      return;
    }

    if (selectedSpecies) {
      onUpdate({
        ...selectedSpecies,
        name: formData.name,
        isActive: formData.isActive,
      } as SpeciesData);
    } else {
      onAdd(formData);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({ name: '', isActive: true });
    setSelectedSpecies(null);
  };

  const handleEdit = (species: SpeciesData) => {
    setSelectedSpecies(species);
    setFormData({ name: species.name, isActive: species.isActive });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta espécie? Raças associadas a ela podem ser afetadas.')) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('species')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          if (!isOpen) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Espécie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedSpecies ? 'Editar Espécie' : 'Nova Espécie'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">{t('name')}</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                <Label htmlFor="isActive">Espécie ativa</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>{t('cancel')}</Button>
                <Button type="submit">{selectedSpecies ? t('save') : t('add')}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle>Espécies Cadastradas</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {speciesList.map((species) => (
              <div key={species.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium">{species.name}</h3>
                  {!species.isActive && <Badge variant="destructive">Inativa</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(species)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(species.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
            {speciesList.length === 0 && <p className="text-sm text-gray-500">Nenhuma espécie cadastrada.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Species;
