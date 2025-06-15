
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
}

const Species = () => {
  const { toast } = useToast();
  const [speciesList, setSpeciesList] = useState<SpeciesData[]>([
    { id: '1', name: 'Cão', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Gato', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Ave', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '4', name: 'Coelho', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '5', name: 'Hamster', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '6', name: 'Outro', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [formData, setFormData] = useState({ name: '', isActive: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({ title: t('error'), description: 'O nome da espécie é obrigatório.', variant: 'destructive' });
      return;
    }

    const newSpecies: SpeciesData = {
      id: selectedSpecies?.id || Date.now().toString(),
      name: formData.name,
      isActive: formData.isActive,
      createdBy: selectedSpecies?.createdBy || 'current_user',
      createdAt: selectedSpecies?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (selectedSpecies) {
      setSpeciesList(speciesList.map(s => s.id === selectedSpecies.id ? newSpecies : s));
      toast({ title: t('success'), description: 'Espécie atualizada com sucesso!' });
    } else {
      setSpeciesList([...speciesList, newSpecies]);
      toast({ title: t('success'), description: 'Espécie cadastrada com sucesso!' });
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
      setSpeciesList(speciesList.filter(s => s.id !== id));
      toast({ title: t('success'), description: 'Espécie excluída com sucesso!' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('species')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
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
