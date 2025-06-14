
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Calendar, Syringe, AlertTriangle } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import type { Animal, Vaccine, Veterinarian, Breed, Tutor } from '@/types';

interface VaccinesProps {
  navigationState?: any;
}

const Vaccines: React.FC<VaccinesProps> = ({ navigationState }) => {
  const { toast } = useToast();
  const selectedAnimalId = navigationState?.selectedAnimalId;

  // Mock data
  const mockVeterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. João Silva',
      crmv: '12345-SP',
      specialties: ['Clínica Geral', 'Cirurgia'],
      phone: '(11) 99999-9999',
      email: 'joao@veterinaria.com',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Dra. Maria Santos',
      crmv: '67890-SP',
      specialties: ['Dermatologia', 'Oftalmologia'],
      phone: '(11) 88888-8888',
      email: 'maria@veterinaria.com',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockBreeds: Breed[] = [
    {
      id: '1',
      name: 'Golden Retriever',
      species: 'dog',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Persa',
      species: 'cat',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const mockTutors: Tutor[] = [
    {
      id: '1',
      name: 'João Silva Santos',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999',
      email: 'joao@email.com',
      address: {
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockAnimals: Animal[] = [
    {
      id: '1',
      name: 'Rex',
      species: 'dog',
      breedId: '1',
      breed: mockBreeds[0],
      age: 3,
      sex: 'male',
      weight: 32.5,
      tutorId: '1',
      tutor: mockTutors[0],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Luna',
      species: 'cat',
      breedId: '2',
      breed: mockBreeds[1],
      age: 2,
      sex: 'female',
      weight: 4.2,
      tutorId: '1',
      tutor: mockTutors[0],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: '1',
      animalId: '1',
      animal: mockAnimals[0],
      vaccineType: 'V8',
      batch: '12345',
      applicationDate: new Date('2024-11-15'),
      nextDueDate: new Date('2025-11-15'),
      veterinarianId: '1',
      veterinarian: mockVeterinarians[0],
      notes: 'Primeira dose da V8',
      createdBy: 'system',
      createdAt: new Date('2024-11-15'),
    },
    {
      id: '2',
      animalId: '2',
      animal: mockAnimals[1],
      vaccineType: 'Antirrábica',
      batch: '67890',
      applicationDate: new Date('2024-12-01'),
      nextDueDate: new Date('2025-12-01'),
      veterinarianId: '2',
      veterinarian: mockVeterinarians[1],
      notes: 'Vacina antirrábica anual',
      createdBy: 'system',
      createdAt: new Date('2024-12-01'),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [animalFilter, setAnimalFilter] = useState<string>(selectedAnimalId || 'all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [formData, setFormData] = useState({
    animalId: selectedAnimalId || '',
    vaccineType: '',
    batch: '',
    applicationDate: '',
    nextDueDate: '',
    veterinarianId: '',
    notes: '',
  });

  useEffect(() => {
    if (selectedAnimalId) {
      setAnimalFilter(selectedAnimalId);
      setFormData(prev => ({ ...prev, animalId: selectedAnimalId }));
    }
  }, [selectedAnimalId]);

  const filteredVaccines = vaccines.filter(vaccine => {
    const matchesSearch = vaccine.animal?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccine.vaccineType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccine.veterinarian?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAnimal = animalFilter === 'all' || vaccine.animalId === animalFilter;
    
    return matchesSearch && matchesAnimal;
  });

  const canDeleteVaccine = (vaccine: Vaccine): boolean => {
    const daysDifference = Math.floor((new Date().getTime() - vaccine.createdAt.getTime()) / (1000 * 3600 * 24));
    return daysDifference <= 2;
  };

  const handleSave = () => {
    if (!formData.animalId || !formData.vaccineType || !formData.applicationDate || !formData.veterinarianId) {
      return;
    }

    const selectedAnimal = mockAnimals.find(a => a.id === formData.animalId);
    const selectedVeterinarian = mockVeterinarians.find(v => v.id === formData.veterinarianId);

    if (editingVaccine) {
      setVaccines(vaccines.map(v => 
        v.id === editingVaccine.id 
          ? { 
              ...editingVaccine, 
              ...formData,
              animal: selectedAnimal,
              veterinarian: selectedVeterinarian,
              applicationDate: new Date(formData.applicationDate),
              nextDueDate: formData.nextDueDate ? new Date(formData.nextDueDate) : undefined,
            }
          : v
      ));
      toast({
        title: "Vacina atualizada",
        description: "A vacina foi atualizada com sucesso.",
      });
    } else {
      const newVaccine: Vaccine = {
        id: Date.now().toString(),
        ...formData,
        animal: selectedAnimal,
        veterinarian: selectedVeterinarian,
        applicationDate: new Date(formData.applicationDate),
        nextDueDate: formData.nextDueDate ? new Date(formData.nextDueDate) : undefined,
        createdBy: 'current-user',
        createdAt: new Date(),
      };
      setVaccines([...vaccines, newVaccine]);
      toast({
        title: "Vacina cadastrada",
        description: "A vacina foi cadastrada com sucesso.",
      });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingVaccine(null);
    setFormData({
      animalId: selectedAnimalId || '',
      vaccineType: '',
      batch: '',
      applicationDate: '',
      nextDueDate: '',
      veterinarianId: '',
      notes: '',
    });
  };

  const handleEdit = (vaccine: Vaccine) => {
    setEditingVaccine(vaccine);
    setFormData({
      animalId: vaccine.animalId,
      vaccineType: vaccine.vaccineType,
      batch: vaccine.batch || '',
      applicationDate: vaccine.applicationDate.toISOString().split('T')[0],
      nextDueDate: vaccine.nextDueDate?.toISOString().split('T')[0] || '',
      veterinarianId: vaccine.veterinarianId || '',
      notes: vaccine.notes || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (vaccineId: string) => {
    const vaccine = vaccines.find(v => v.id === vaccineId);
    if (!vaccine) return;

    if (!canDeleteVaccine(vaccine)) {
      toast({
        title: "Não é possível excluir",
        description: "Vacinas não podem ser excluídas após 2 dias de seu lançamento.",
        variant: "destructive",
      });
      return;
    }

    setVaccines(vaccines.filter(v => v.id !== vaccineId));
    toast({
      title: "Vacina excluída",
      description: "A vacina foi excluída com sucesso.",
    });
  };

  const vaccineTypes = [
    'V8', 'V10', 'V12', 'Antirrábica', 'Giárdia', 'Gripe Canina', 
    'Leishmaniose', 'Tríplice Felina', 'Quíntupla Felina', 'FeLV'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('vaccines')}</h1>
          <p className="text-gray-600">Gerencie as vacinas dos animais</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Vacinas</CardTitle>
              <CardDescription>
                {filteredVaccines.length} vacinas registradas
                {selectedAnimalId && (
                  <span className="ml-2 text-teal-600">
                    (Filtrado para: {mockAnimals.find(a => a.id === selectedAnimalId)?.name})
                  </span>
                )}
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addVaccine')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVaccine ? t('editVaccine') : t('addVaccine')}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados da vacina
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div>
                    <Label htmlFor="animalId">{t('animal')}</Label>
                    <Select
                      value={formData.animalId}
                      onValueChange={(value) => setFormData({...formData, animalId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectAnimal')} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAnimals.map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} - {animal.tutor?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="vaccineType">{t('vaccineType')}</Label>
                    <Select
                      value={formData.vaccineType}
                      onValueChange={(value) => setFormData({...formData, vaccineType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectVaccineType')} />
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
                    <Label htmlFor="batch">{t('batch')}</Label>
                    <Input
                      id="batch"
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                      placeholder="Número do lote"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="applicationDate">{t('applicationDate')}</Label>
                    <Input
                      id="applicationDate"
                      type="date"
                      value={formData.applicationDate}
                      onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nextDueDate">{t('nextDueDate')}</Label>
                    <Input
                      id="nextDueDate"
                      type="date"
                      value={formData.nextDueDate}
                      onChange={(e) => setFormData({...formData, nextDueDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="veterinarianId">{t('veterinarian')}</Label>
                    <Select
                      value={formData.veterinarianId}
                      onValueChange={(value) => setFormData({...formData, veterinarianId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectVeterinarian')} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVeterinarians.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">{t('notes')}</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Observações sobre a vacina"
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por animal, vacina ou veterinário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select value={animalFilter} onValueChange={setAnimalFilter}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Todos os animais" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os animais</SelectItem>
                {mockAnimals.map((animal) => (
                  <SelectItem key={animal.id} value={animal.id}>
                    {animal.name} - {animal.tutor?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Vacina</TableHead>
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
                      <div>
                        <div className="font-medium">{vaccine.animal?.name}</div>
                        <div className="text-sm text-gray-500">{vaccine.animal?.tutor?.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Syringe className="w-4 h-4 text-green-600" />
                        {vaccine.vaccineType}
                      </div>
                    </TableCell>
                    <TableCell>{vaccine.batch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {vaccine.applicationDate.toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      {vaccine.nextDueDate ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {vaccine.nextDueDate.toLocaleDateString('pt-BR')}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{vaccine.veterinarian?.name}</TableCell>
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
                          className={`${
                            canDeleteVaccine(vaccine) 
                              ? 'text-red-600 hover:text-red-800' 
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!canDeleteVaccine(vaccine)}
                          title={
                            canDeleteVaccine(vaccine) 
                              ? 'Excluir vacina' 
                              : 'Não é possível excluir após 2 dias'
                          }
                        >
                          {canDeleteVaccine(vaccine) ? (
                            <Trash2 className="w-4 h-4" />
                          ) : (
                            <AlertTriangle className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
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
