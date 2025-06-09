import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Heart, Scale, Calendar, Syringe } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Tutor, Vaccine, Product, Veterinarian } from '@/types';

const Animals: React.FC = () => {
  // Mock data
  const tutors: Tutor[] = [
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Maria Santos Costa',
      cpf: '987.654.321-00',
      phone: '(11) 88888-8888',
      email: 'maria@email.com',
      address: {
        street: 'Av. Principal',
        number: '456',
        neighborhood: 'Jardim América',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '05432-100'
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockVaccines: Product[] = [
    {
      id: '1',
      name: 'Vacina V8',
      category: 'vaccine',
      description: 'Vacina múltipla para cães',
      quantity: 10,
      minQuantity: 5,
      costPrice: 25.00,
      salePrice: 45.00,
      supplier: 'VetPharma',
      batch: 'VAC001',
      expirationDate: new Date('2025-12-31'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Vacina Antirrábica',
      category: 'vaccine',
      description: 'Vacina contra raiva',
      quantity: 15,
      minQuantity: 3,
      costPrice: 30.00,
      salePrice: 50.00,
      supplier: 'VetPharma',
      batch: 'RAB001',
      expirationDate: new Date('2025-11-30'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockVeterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. Carlos Silva',
      crmv: 'CRMV-SP 12345',
      phone: '(11) 99999-0001',
      email: 'carlos@vetclinic.com',
      specialties: ['Clínica Geral', 'Cirurgia'],
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: '1',
      name: 'Rex',
      species: 'Cão',
      breed: 'Golden Retriever',
      age: 3,
      sex: 'male',
      weight: 32.5,
      tutorId: '1',
      tutor: tutors[0],
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
      tutor: tutors[1],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isVaccineDialogOpen, setIsVaccineDialogOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [selectedAnimalForVaccine, setSelectedAnimalForVaccine] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
    sex: 'male' as 'male' | 'female',
    weight: 0,
    tutorId: '',
  });

  const [vaccineFormData, setVaccineFormData] = useState({
    productId: '',
    batch: '',
    applicationDate: new Date().toISOString().split('T')[0],
    nextDueDate: '',
    veterinarianId: '',
    notes: '',
  });

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.tutor?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    const selectedTutor = tutors.find(t => t.id === formData.tutorId);
    
    if (editingAnimal) {
      setAnimals(animals.map(a => 
        a.id === editingAnimal.id 
          ? { ...editingAnimal, ...formData, tutor: selectedTutor, updatedAt: new Date() }
          : a
      ));
    } else {
      const newAnimal: Animal = {
        id: Date.now().toString(),
        ...formData,
        tutor: selectedTutor,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAnimals([...animals, newAnimal]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingAnimal(null);
    setFormData({
      name: '',
      species: '',
      breed: '',
      age: 0,
      sex: 'male',
      weight: 0,
      tutorId: '',
    });
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setFormData({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      age: animal.age,
      sex: animal.sex,
      weight: animal.weight,
      tutorId: animal.tutorId,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (animalId: string) => {
    setAnimals(animals.filter(a => a.id !== animalId));
  };

  const handleVaccinate = (animalId: string) => {
    setSelectedAnimalForVaccine(animalId);
    setIsVaccineDialogOpen(true);
  };

  const handleSaveVaccine = () => {
    const selectedProduct = mockVaccines.find(v => v.id === vaccineFormData.productId);
    const selectedVet = mockVeterinarians.find(v => v.id === vaccineFormData.veterinarianId);
    
    const newVaccine: Vaccine = {
      id: Date.now().toString(),
      animalId: selectedAnimalForVaccine,
      productId: vaccineFormData.productId,
      product: selectedProduct,
      batch: vaccineFormData.batch,
      applicationDate: new Date(vaccineFormData.applicationDate),
      nextDueDate: new Date(vaccineFormData.nextDueDate),
      veterinarianId: vaccineFormData.veterinarianId,
      veterinarian: selectedVet,
      notes: vaccineFormData.notes,
      createdAt: new Date(),
    };
    
    setVaccines([...vaccines, newVaccine]);
    handleCloseVaccineDialog();
  };

  const handleCloseVaccineDialog = () => {
    setIsVaccineDialogOpen(false);
    setSelectedAnimalForVaccine('');
    setVaccineFormData({
      productId: '',
      batch: '',
      applicationDate: new Date().toISOString().split('T')[0],
      nextDueDate: '',
      veterinarianId: '',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('animals')}</h1>
          <p className="text-gray-600">Gerencie os animais cadastrados</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Animais</CardTitle>
              <CardDescription>
                {filteredAnimals.length} animais cadastrados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addAnimal')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingAnimal ? 'Editar Animal' : t('addAnimal')}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do animal
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">{t('animalName')}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Nome do animal"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="species">{t('species')}</Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) => setFormData({...formData, species: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a espécie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cão">Cão</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                        <SelectItem value="Pássaro">Pássaro</SelectItem>
                        <SelectItem value="Coelho">Coelho</SelectItem>
                        <SelectItem value="Hamster">Hamster</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="breed">{t('breed')}</Label>
                    <Input
                      id="breed"
                      value={formData.breed}
                      onChange={(e) => setFormData({...formData, breed: e.target.value})}
                      placeholder="Raça do animal"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">{t('age')}</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                      placeholder="Idade em anos"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sex">{t('sex')}</Label>
                    <Select
                      value={formData.sex}
                      onValueChange={(value: 'male' | 'female') => setFormData({...formData, sex: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Macho</SelectItem>
                        <SelectItem value="female">Fêmea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">{t('weight')} (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value) || 0})}
                      placeholder="Peso em kg"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="tutorId">{t('tutor')}</Label>
                    <Select
                      value={formData.tutorId}
                      onValueChange={(value) => setFormData({...formData, tutorId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tutor" />
                      </SelectTrigger>
                      <SelectContent>
                        {tutors.map((tutor) => (
                          <SelectItem key={tutor.id} value={tutor.id}>
                            {tutor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
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
              placeholder="Buscar por nome, espécie ou tutor..."
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
                  <TableHead>Espécie/Raça</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>Tutor</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnimals.map((animal) => (
                  <TableRow key={animal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{animal.name}</div>
                          <Badge variant={animal.sex === 'male' ? 'default' : 'secondary'} className="text-xs">
                            {animal.sex === 'male' ? 'Macho' : 'Fêmea'}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{animal.species}</div>
                        <div className="text-sm text-gray-500">{animal.breed}</div>
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
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVaccinate(animal.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Syringe className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(animal)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(animal.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Dialog para aplicar vacina */}
      <Dialog open={isVaccineDialogOpen} onOpenChange={setIsVaccineDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Aplicar Vacina</DialogTitle>
            <DialogDescription>
              Registre a aplicação da vacina no animal selecionado
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="md:col-span-2">
              <Label htmlFor="productId">Vacina</Label>
              <Select
                value={vaccineFormData.productId}
                onValueChange={(value) => setVaccineFormData({...vaccineFormData, productId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a vacina" />
                </SelectTrigger>
                <SelectContent>
                  {mockVaccines.map((vaccine) => (
                    <SelectItem key={vaccine.id} value={vaccine.id}>
                      {vaccine.name} - {vaccine.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="batch">Lote</Label>
              <Input
                id="batch"
                value={vaccineFormData.batch}
                onChange={(e) => setVaccineFormData({...vaccineFormData, batch: e.target.value})}
                placeholder="Número do lote"
              />
            </div>
            
            <div>
              <Label htmlFor="applicationDate">Data de Aplicação</Label>
              <Input
                id="applicationDate"
                type="date"
                value={vaccineFormData.applicationDate}
                onChange={(e) => setVaccineFormData({...vaccineFormData, applicationDate: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="nextDueDate">Próxima Dose</Label>
              <Input
                id="nextDueDate"
                type="date"
                value={vaccineFormData.nextDueDate}
                onChange={(e) => setVaccineFormData({...vaccineFormData, nextDueDate: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="veterinarianId">Veterinário</Label>
              <Select
                value={vaccineFormData.veterinarianId}
                onValueChange={(value) => setVaccineFormData({...vaccineFormData, veterinarianId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veterinário" />
                </SelectTrigger>
                <SelectContent>
                  {mockVeterinarians.map((vet) => (
                    <SelectItem key={vet.id} value={vet.id}>
                      {vet.name} - {vet.crmv}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="notes">Observações</Label>
              <Input
                id="notes"
                value={vaccineFormData.notes}
                onChange={(e) => setVaccineFormData({...vaccineFormData, notes: e.target.value})}
                placeholder="Observações sobre a vacinação"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseVaccineDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSaveVaccine} className="bg-blue-500 hover:bg-blue-600">
              Aplicar Vacina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Animals;
