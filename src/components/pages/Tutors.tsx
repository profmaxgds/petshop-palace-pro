import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, User, Phone, Mail, MapPin, CalendarIcon } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Tutor, Animal, Breed } from '@/types';
import AnimalForm from './animals/AnimalForm';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Tutors: React.FC = () => {
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

  const [tutors, setTutors] = useState<Tutor[]>([
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
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: '1',
      name: 'Rex',
      species: 'dog',
      breedId: '1',
      breed: mockBreeds[0],
      birthDate: new Date('2022-06-15'),
      sex: 'male',
      weight: 32.5,
      tutorId: '1',
      tutor: tutors[0],
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
      birthDate: new Date('2023-01-20'),
      sex: 'female',
      weight: 4.2,
      tutorId: '2',
      tutor: tutors[1],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Buddy',
      species: 'dog',
      breedId: '1',
      breed: mockBreeds[0],
      birthDate: new Date('2020-03-10'),
      sex: 'male',
      weight: 28.0,
      tutorId: '1',
      tutor: tutors[0],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    birthDate: undefined as Date | undefined,
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  // Animal Form State
  const [isAnimalFormOpen, setIsAnimalFormOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [animalFormData, setAnimalFormData] = useState({
    name: '',
    species: 'dog' as 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other',
    breedId: '',
    birthDate: undefined as Date | undefined,
    sex: 'male' as 'male' | 'female',
    weight: 0,
    tutorId: '',
  });

  const filteredTutors = tutors.filter(tutor =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.cpf?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!formData.name) {
      return;
    }

    if (editingTutor) {
      setTutors(tutors.map(t => 
        t.id === editingTutor.id 
          ? { ...editingTutor, ...formData, updatedAt: new Date() }
          : t
      ));
    } else {
      const newTutor: Tutor = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTutors([...tutors, newTutor]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingTutor(null);
    setFormData({
      name: '',
      cpf: '',
      phone: '',
      email: '',
      birthDate: undefined,
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
      },
    });
  };

  const handleEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setFormData({
      name: tutor.name,
      cpf: tutor.cpf || '',
      phone: tutor.phone || '',
      email: tutor.email || '',
      birthDate: tutor.birthDate,
      address: {
        street: tutor.address?.street || '',
        number: tutor.address?.number || '',
        neighborhood: tutor.address?.neighborhood || '',
        city: tutor.address?.city || '',
        state: tutor.address?.state || '',
        zipCode: tutor.address?.zipCode || '',
      },
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (tutorId: string) => {
    setTutors(tutors.filter(t => t.id !== tutorId));
  };

  const getTutorAnimals = (tutorId: string) => {
    return animals.filter(animal => animal.tutorId === tutorId);
  };

  const handleZipCodeChange = async (zip: string) => {
    const cleanedZip = zip.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, address: { ...prev.address, zipCode: cleanedZip } }));

    if (cleanedZip.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanedZip}/json/`);
            if (!response.ok) throw new Error('CEP não encontrado');
            const data = await response.json();
            if (data.erro) {
                console.warn('CEP não encontrado');
                return;
            }
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf,
                }
            }));
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    }
  };

  // Animal Handlers
  const handleAddNewAnimal = (tutorId: string) => {
    setEditingAnimal(null);
    setAnimalFormData({
      name: '',
      species: 'dog',
      breedId: '',
      birthDate: undefined,
      sex: 'male',
      weight: 0,
      tutorId: tutorId,
    });
    setIsAnimalFormOpen(true);
  };

  const handleEditAnimal = (animal: Animal) => {
    setEditingAnimal(animal);
    setAnimalFormData({
      name: animal.name,
      species: animal.species,
      breedId: animal.breedId || '',
      birthDate: animal.birthDate,
      sex: animal.sex,
      weight: animal.weight || 0,
      tutorId: animal.tutorId,
    });
    setIsAnimalFormOpen(true);
  };

  const handleDeleteAnimal = (animalId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este animal?')) {
      setAnimals(animals.filter(a => a.id !== animalId));
    }
  };

  const handleCloseAnimalDialog = () => {
    setIsAnimalFormOpen(false);
    setEditingAnimal(null);
    setAnimalFormData({
      name: '',
      species: 'dog',
      breedId: '',
      birthDate: undefined,
      sex: 'male',
      weight: 0,
      tutorId: '',
    });
  };

  const handleSaveAnimal = () => {
    if (!animalFormData.species || !animalFormData.name || !animalFormData.tutorId) {
      return;
    }

    const selectedTutor = tutors.find(t => t.id === animalFormData.tutorId);
    const selectedBreed = mockBreeds.find(b => b.id === animalFormData.breedId);

    if (editingAnimal) {
      setAnimals(animals.map(a =>
        a.id === editingAnimal.id
          ? { ...editingAnimal, ...animalFormData, tutor: selectedTutor!, breed: selectedBreed, updatedAt: new Date() }
          : a
      ));
    } else {
      const newAnimal: Animal = {
        id: Date.now().toString(),
        ...animalFormData,
        tutor: selectedTutor!,
        breed: selectedBreed,
        isActive: true,
        createdBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAnimals([...animals, newAnimal]);
    }
    handleCloseAnimalDialog();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('tutors')}</h1>
          <p className="text-gray-600">Gerencie os tutores dos animais</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Tutores</CardTitle>
              <CardDescription>
                {filteredTutors.length} tutores cadastrados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addTutor')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTutor ? 'Editar Tutor' : 'Novo Tutor'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do tutor
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">{t('tutorName')}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Nome completo do tutor"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cpf">{t('cpf')}</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthDate">{t('birthDate')}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.birthDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.birthDate ? format(formData.birthDate, "dd/MM/yyyy") : <span>Selecione a data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.birthDate}
                          onSelect={(date) => setFormData({ ...formData, birthDate: date as Date | undefined})}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">Endereço</h3>
                  </div>

                  <div>
                    <Label htmlFor="zipCode">{t('zipCode')}</Label>
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) => handleZipCodeChange(e.target.value)}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                  </div>

                  <div>
                    <Label htmlFor="street">{t('street')}</Label>
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, street: e.target.value}
                      })}
                      placeholder="Nome da rua"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      value={formData.address.number}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, number: e.target.value}
                      })}
                      placeholder="123"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="neighborhood">{t('neighborhood')}</Label>
                    <Input
                      id="neighborhood"
                      value={formData.address.neighborhood}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, neighborhood: e.target.value}
                      })}
                      placeholder="Nome do bairro"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">{t('city')}</Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, city: e.target.value}
                      })}
                      placeholder="Nome da cidade"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">{t('state')}</Label>
                    <Input
                      id="state"
                      value={formData.address.state}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, state: e.target.value}
                      })}
                      placeholder="SP"
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
              placeholder="Buscar por nome, CPF ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tutor</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Animais</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTutors.map((tutor) => {
                  const tutorAnimals = getTutorAnimals(tutor.id);
                  return (
                    <TableRow key={tutor.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-teal-600" />
                          <div>
                            <div className="font-medium">{tutor.name}</div>
                            <div className="text-sm text-gray-500">CPF: {tutor.cpf}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            {tutor.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1" />
                            {tutor.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          {tutor.address?.city}, {tutor.address?.state}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2 items-start">
                          {tutorAnimals.map((animal) => (
                            <div key={animal.id} className="flex items-center justify-between w-full text-sm p-1 rounded-md hover:bg-gray-50">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{animal.name}</span>
                                <Badge variant="outline" className="text-xs">{t(animal.species)}</Badge>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEditAnimal(animal)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600 hover:text-red-700" onClick={() => handleDeleteAnimal(animal.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          {tutorAnimals.length === 0 && (
                            <span className="text-gray-400 text-sm px-1">Nenhum animal</span>
                          )}
                           <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => handleAddNewAnimal(tutor.id)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Adicionar Animal
                            </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(tutor)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(tutor.id)}
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

      <AnimalForm
        isOpen={isAnimalFormOpen}
        onClose={handleCloseAnimalDialog}
        onSave={handleSaveAnimal}
        editingAnimal={editingAnimal}
        formData={animalFormData}
        setFormData={setAnimalFormData}
        tutors={tutors}
        breeds={mockBreeds}
      />
    </div>
  );
};

export default Tutors;
