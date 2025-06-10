import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Download, Plus, Search } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Vaccine, Animal } from '@/types';

const Vaccines: React.FC = () => {
  // Mock veterinarians data
  const veterinarians = [
    {
      id: '1',
      name: 'Dr. Carlos Silva',
      crmv: 'CRMV-SP 12345',
    },
    {
      id: '2',
      name: 'Dra. Ana Costa',
      crmv: 'CRMV-SP 67890',
    },
  ];

  // Mock animals data
  const animals: Animal[] = [
    {
      id: '1',
      name: 'Rex',
      species: 'Cão',
      breed: 'Golden Retriever',
      age: 3,
      sex: 'male',
      weight: 32.5,
      tutorId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Luna',
      species: 'Gato',
      breed: 'Persa',
      age: 2,
      sex: 'female',
      weight: 4.2,
      tutorId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: '1',
      animalId: '1',
      animal: animals[0],
      type: 'V8',
      batch: '12345',
      applicationDate: new Date('2024-11-15'),
      nextDueDate: new Date('2025-11-15'),
      veterinarian: 'Dr. Carlos Silva',
      notes: 'Primeira dose da V8',
      createdAt: new Date(),
    },
    {
      id: '2',
      animalId: '2',
      animal: animals[1],
      type: 'Antirrábica',
      batch: '67890',
      applicationDate: new Date('2024-11-20'),
      nextDueDate: new Date('2025-11-20'),
      veterinarian: 'Dra. Ana Costa',
      notes: 'Dose única da Antirrábica',
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [formData, setFormData] = useState({
    animalId: '',
    type: '',
    batch: '',
    applicationDate: '',
    nextDueDate: '',
    veterinarianId: '',
    notes: '',
  });

  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    const selectedAnimal = animals.find(a => a.id === formData.animalId);
    const selectedVet = veterinarians.find(v => v.id === formData.veterinarianId);
    
    if (editingVaccine) {
      setVaccines(vaccines.map(v => 
        v.id === editingVaccine.id 
          ? { 
              ...editingVaccine, 
              animalId: formData.animalId,
              animal: selectedAnimal,
              type: formData.type,
              batch: formData.batch,
              applicationDate: new Date(formData.applicationDate),
              nextDueDate: new Date(formData.nextDueDate),
              veterinarian: selectedVet?.name || '',
              notes: formData.notes,
            }
          : v
      ));
    } else {
      const newVaccine: Vaccine = {
        id: Date.now().toString(),
        animalId: formData.animalId,
        animal: selectedAnimal,
        type: formData.type,
        batch: formData.batch,
        applicationDate: new Date(formData.applicationDate),
        nextDueDate: new Date(formData.nextDueDate),
        veterinarian: selectedVet?.name || '',
        notes: formData.notes,
        createdAt: new Date(),
      };
      setVaccines([...vaccines, newVaccine]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVaccine(null);
    setFormData({
      animalId: '',
      type: '',
      batch: '',
      applicationDate: '',
      nextDueDate: '',
      veterinarianId: '',
      notes: '',
    });
  };

  const handleEdit = (vaccine: Vaccine) => {
    const selectedVet = veterinarians.find(v => v.name === vaccine.veterinarian);
    setEditingVaccine(vaccine);
    setFormData({
      animalId: vaccine.animalId,
      type: vaccine.type,
      batch: vaccine.batch,
      applicationDate: vaccine.applicationDate.toISOString().split('T')[0],
      nextDueDate: vaccine.nextDueDate.toISOString().split('T')[0],
      veterinarianId: selectedVet?.id || '',
      notes: vaccine.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (vaccineId: string) => {
    setVaccines(vaccines.filter(vaccine => vaccine.id !== vaccineId));
  };

  const downloadCard = (vaccine: Vaccine) => {
    alert(`Download do cartão de vacinação de ${vaccine.animal?.name} (Em desenvolvimento)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cartão de Vacinação</h1>
          <p className="text-gray-600">Gerencie as vacinas aplicadas nos animais</p>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Total de Vacinas</p>
            <p className="text-2xl font-bold">{vaccines.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Próximas Doses (30 dias)</p>
            <p className="text-2xl font-bold">
              {vaccines.filter(v => 
                v.nextDueDate >= new Date() &&
                v.nextDueDate <= new Date(new Date().setDate(new Date().getDate() + 30))
              ).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Vacinas Atrasadas</p>
            <p className="text-2xl font-bold">
              {vaccines.filter(v => v.nextDueDate < new Date()).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cartão de Vacinação</CardTitle>
              <CardDescription>
                {filteredVaccines.length} vacinas aplicadas
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Vacina
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVaccine ? 'Editar Vacina' : 'Nova Vacina'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados da vacinação
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="animalId">Animal</Label>
                    <Select
                      value={formData.animalId}
                      onValueChange={(value) => setFormData({...formData, animalId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o animal" />
                      </SelectTrigger>
                      <SelectContent>
                        {animals.map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} - {animal.species}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Tipo de Vacina</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({...formData, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="V8">V8 (Óctupla)</SelectItem>
                        <SelectItem value="V10">V10 (Décupla)</SelectItem>
                        <SelectItem value="Antirrábica">Antirrábica</SelectItem>
                        <SelectItem value="Gripe Canina">Gripe Canina</SelectItem>
                        <SelectItem value="Giardia">Giardia</SelectItem>
                        <SelectItem value="Tríplice Felina">Tríplice Felina</SelectItem>
                        <SelectItem value="Quíntupla Felina">Quíntupla Felina</SelectItem>
                        <SelectItem value="FeLV">FeLV (Leucemia Felina)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="batch">Lote</Label>
                    <Input
                      id="batch"
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                      placeholder="Número do lote"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="applicationDate">Data de Aplicação</Label>
                    <Input
                      id="applicationDate"
                      type="date"
                      value={formData.applicationDate}
                      onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nextDueDate">Próxima Dose</Label>
                    <Input
                      id="nextDueDate"
                      type="date"
                      value={formData.nextDueDate}
                      onChange={(e) => setFormData({...formData, nextDueDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="veterinarianId">Veterinário</Label>
                    <Select
                      value={formData.veterinarianId}
                      onValueChange={(value) => setFormData({...formData, veterinarianId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o veterinário" />
                      </SelectTrigger>
                      <SelectContent>
                        {veterinarians.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name} - {vet.crmv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Observações sobre a vacinação..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    {t('save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por animal, tipo ou lote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Aplicação</TableHead>
                  <TableHead>Próxima Dose</TableHead>
                  <TableHead>Veterinário</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVaccines.map((vaccine) => (
                  <TableRow key={vaccine.id}>
                    <TableCell>
                      <div className="font-medium">{vaccine.animal?.name}</div>
                      <div className="text-sm text-gray-500">{vaccine.animal?.species}</div>
                    </TableCell>
                    <TableCell>{vaccine.type}</TableCell>
                    <TableCell>{vaccine.batch}</TableCell>
                    <TableCell>{vaccine.applicationDate.toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{vaccine.nextDueDate.toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{vaccine.veterinarian}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadCard(vaccine)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t('download')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Vaccines;
