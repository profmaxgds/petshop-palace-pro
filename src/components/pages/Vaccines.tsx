
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
import { Search, Plus, Edit, Trash2, Syringe, AlertTriangle, Calendar } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Vaccine, Animal } from '@/types';

const Vaccines: React.FC = () => {
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
      type: 'V10',
      applicationDate: new Date('2024-01-15'),
      nextDueDate: new Date('2025-01-15'),
      veterinarian: 'Dr. Carlos Silva',
      notes: 'Primeira dose da vacina V10',
      createdAt: new Date(),
    },
    {
      id: '2',
      animalId: '2',
      animal: animals[1],
      type: 'Antirrábica',
      applicationDate: new Date('2024-02-10'),
      nextDueDate: new Date('2025-02-10'),
      veterinarian: 'Dra. Ana Costa',
      notes: 'Vacina antirrábica anual',
      createdAt: new Date(),
    },
    {
      id: '3',
      animalId: '1',
      animal: animals[0],
      type: 'Leishmaniose',
      applicationDate: new Date('2023-12-01'),
      nextDueDate: new Date('2024-06-01'),
      veterinarian: 'Dr. Carlos Silva',
      notes: 'Reforço necessário em breve',
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [formData, setFormData] = useState({
    animalId: '',
    type: '',
    applicationDate: '',
    nextDueDate: '',
    veterinarian: '',
    notes: '',
  });

  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVaccineStatus = (nextDueDate: Date) => {
    const today = new Date();
    const diffTime = nextDueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'overdue', label: 'Vencida', color: 'destructive' };
    if (diffDays <= 30) return { status: 'due-soon', label: 'Vence em breve', color: 'secondary' };
    return { status: 'current', label: 'Em dia', color: 'default' };
  };

  const handleSave = () => {
    const selectedAnimal = animals.find(a => a.id === formData.animalId);
    
    if (editingVaccine) {
      setVaccines(vaccines.map(v => 
        v.id === editingVaccine.id 
          ? { 
              ...editingVaccine, 
              ...formData,
              animal: selectedAnimal,
              applicationDate: new Date(formData.applicationDate),
              nextDueDate: new Date(formData.nextDueDate),
            }
          : v
      ));
    } else {
      const newVaccine: Vaccine = {
        id: Date.now().toString(),
        ...formData,
        animal: selectedAnimal,
        applicationDate: new Date(formData.applicationDate),
        nextDueDate: new Date(formData.nextDueDate),
        createdAt: new Date(),
      };
      setVaccines([...vaccines, newVaccine]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingVaccine(null);
    setFormData({
      animalId: '',
      type: '',
      applicationDate: '',
      nextDueDate: '',
      veterinarian: '',
      notes: '',
    });
  };

  const handleEdit = (vaccine: Vaccine) => {
    setEditingVaccine(vaccine);
    setFormData({
      animalId: vaccine.animalId,
      type: vaccine.type,
      applicationDate: vaccine.applicationDate.toISOString().split('T')[0],
      nextDueDate: vaccine.nextDueDate.toISOString().split('T')[0],
      veterinarian: vaccine.veterinarian,
      notes: vaccine.notes || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (vaccineId: string) => {
    setVaccines(vaccines.filter(v => v.id !== vaccineId));
  };

  const vaccineTypes = [
    'V8', 'V10', 'V12', 'Antirrábica', 'Leishmaniose', 'Gripe Canina', 
    'Giárdia', 'Tríplice Felina', 'FeLV', 'FIV'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('vaccines')}</h1>
          <p className="text-gray-600">Controle de vacinas e imunizações</p>
        </div>
      </div>

      {/* Alertas de vacinas próximas do vencimento */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="w-5 h-5" />
            Alertas de Vacinas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {vaccines
              .filter(v => {
                const status = getVaccineStatus(v.nextDueDate);
                return status.status === 'overdue' || status.status === 'due-soon';
              })
              .map(vaccine => (
                <div key={vaccine.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <span className="font-medium">{vaccine.animal?.name}</span>
                    <span className="mx-2">-</span>
                    <span>{vaccine.type}</span>
                  </div>
                  <Badge variant={getVaccineStatus(vaccine.nextDueDate).color as any}>
                    {getVaccineStatus(vaccine.nextDueDate).label}
                  </Badge>
                </div>
              ))}
            {vaccines.filter(v => {
              const status = getVaccineStatus(v.nextDueDate);
              return status.status === 'overdue' || status.status === 'due-soon';
            }).length === 0 && (
              <p className="text-orange-700">Nenhuma vacina próxima do vencimento.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Vacinas</CardTitle>
              <CardDescription>
                {filteredVaccines.length} vacinas registradas
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Vacina
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVaccine ? 'Editar Vacina' : 'Registrar Vacina'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados da vacina aplicada
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
                        {vaccineTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="veterinarian">Veterinário</Label>
                    <Input
                      id="veterinarian"
                      value={formData.veterinarian}
                      onChange={(e) => setFormData({...formData, veterinarian: e.target.value})}
                      placeholder="Nome do veterinário"
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
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Observações sobre a vacina..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
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
              placeholder="Buscar por animal, vacina ou veterinário..."
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
                  <TableHead>Vacina</TableHead>
                  <TableHead>Aplicação</TableHead>
                  <TableHead>Próxima Dose</TableHead>
                  <TableHead>Veterinário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVaccines.map((vaccine) => {
                  const status = getVaccineStatus(vaccine.nextDueDate);
                  return (
                    <TableRow key={vaccine.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Syringe className="w-4 h-4 text-teal-600" />
                          <div>
                            <div className="font-medium">{vaccine.animal?.name}</div>
                            <div className="text-sm text-gray-500">{vaccine.animal?.species}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{vaccine.type}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          {vaccine.applicationDate.toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          {vaccine.nextDueDate.toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{vaccine.veterinarian}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.color as any}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(vaccine)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(vaccine.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Vaccines;
