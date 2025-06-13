import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Edit, Trash2, Heart, Scale, Calendar, Syringe, Download, Stethoscope, Scissors } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import type { Animal, Tutor, Vaccine, Appointment, GroomingService, Breed } from '@/types';

const Animals: React.FC = () => {
  const navigate = useNavigate();

  // Mock tutors data
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
  ];

  const breeds: Breed[] = [
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

  // Mock historical data
  const mockVaccines: Vaccine[] = [
    {
      id: '1',
      animalId: '1',
      vaccineType: 'V8',
      batch: '12345',
      applicationDate: new Date('2024-11-15'),
      nextDueDate: new Date('2025-11-15'),
      veterinarianId: '1',
      notes: 'Primeira dose da V8',
      createdBy: 'system',
      createdAt: new Date(),
    },
  ];

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      animalId: '1',
      appointmentDate: new Date('2024-12-10'),
      appointmentTime: '09:00',
      serviceTypeId: '1',
      veterinarianId: '1',
      status: 'scheduled',
      notes: 'Consulta de rotina',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockGrooming: GroomingService[] = [
    {
      id: '1',
      animalId: '1',
      serviceDate: new Date('2024-12-08'),
      serviceTypeId: '1',
      status: 'completed',
      notes: 'Serviço realizado com sucesso',
      price: 80.00,
      createdBy: 'system',
      createdAt: new Date(),
    },
  ];

  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: '1',
      name: 'Rex',
      species: 'dog',
      breedId: '1',
      breed: breeds[0],
      age: 3,
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
      breed: breeds[1],
      age: 2,
      sex: 'female',
      weight: 4.2,
      tutorId: '2',
      tutor: tutors[1],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog' as 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other',
    breedId: '',
    age: 0,
    sex: 'male' as 'male' | 'female',
    weight: 0,
    tutorId: '',
  });

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(animal.species).toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.tutor?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFilteredBreeds = () => {
    return breeds.filter(breed => breed.species === formData.species && breed.isActive);
  };

  const handleSave = () => {
    if (!formData.species || !formData.name || !formData.tutorId) {
      return; // Basic validation
    }

    const selectedTutor = tutors.find(t => t.id === formData.tutorId);
    const selectedBreed = breeds.find(b => b.id === formData.breedId);
    
    if (editingAnimal) {
      setAnimals(animals.map(a => 
        a.id === editingAnimal.id 
          ? { ...editingAnimal, ...formData, tutor: selectedTutor, breed: selectedBreed, updatedAt: new Date() }
          : a
      ));
    } else {
      const newAnimal: Animal = {
        id: Date.now().toString(),
        ...formData,
        tutor: selectedTutor,
        breed: selectedBreed,
        isActive: true,
        createdBy: 'current-user',
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
      species: 'dog',
      breedId: '',
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
      breedId: animal.breedId,
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

  const handleViewHistory = (animal: Animal) => {
    setSelectedAnimal(animal);
    setIsHistoryDialogOpen(true);
  };

  const handleVaccinate = (animalId: string) => {
    navigate('/vaccines', { state: { selectedAnimalId: animalId } });
  };

  const downloadVaccineCard = (animalId: string) => {
    const animalVaccines = mockVaccines.filter(v => v.animalId === animalId);
    const animal = animals.find(a => a.id === animalId);
    
    if (!animal) return;

    const cardContent = `
      <html>
        <head>
          <title>Carteirinha de Vacinação - ${animal.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .animal-info { background: #f5f5f5; padding: 15px; margin-bottom: 20px; }
            .vaccine-record { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Carteirinha de Vacinação</h1>
          </div>
          <div class="animal-info">
            <h2>Dados do Animal</h2>
            <p><strong>Nome:</strong> ${animal.name}</p>
            <p><strong>Espécie:</strong> ${t(animal.species)}</p>
            <p><strong>Raça:</strong> ${animal.breed?.name}</p>
            <p><strong>Tutor:</strong> ${animal.tutor?.name}</p>
          </div>
          ${animalVaccines.map(vaccine => `
            <div class="vaccine-record">
              <h3>Registro de Vacinação</h3>
              <p><strong>Vacina:</strong> ${vaccine.vaccineType}</p>
              <p><strong>Lote:</strong> ${vaccine.batch}</p>
              <p><strong>Data de Aplicação:</strong> ${vaccine.applicationDate.toLocaleDateString('pt-BR')}</p>
              <p><strong>Próxima Dose:</strong> ${vaccine.nextDueDate?.toLocaleDateString('pt-BR')}</p>
              ${vaccine.notes ? `<p><strong>Observações:</strong> ${vaccine.notes}</p>` : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `;

    const blob = new Blob([cardContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carteirinha-${animal.name}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                <Button className="bg-teal-600 hover:bg-teal-700">
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
                      onValueChange={(value: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other') => setFormData({...formData, species: value, breedId: ''})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a espécie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">{t('dog')}</SelectItem>
                        <SelectItem value="cat">{t('cat')}</SelectItem>
                        <SelectItem value="bird">{t('bird')}</SelectItem>
                        <SelectItem value="rabbit">{t('rabbit')}</SelectItem>
                        <SelectItem value="hamster">{t('hamster')}</SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="breedId">{t('breed')}</Label>
                    <Select
                      value={formData.breedId}
                      onValueChange={(value) => setFormData({...formData, breedId: value})}
                      disabled={!formData.species}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a raça" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFilteredBreeds().map((breed) => (
                          <SelectItem key={breed.id} value={breed.id}>
                            {breed.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="male">{t('male')}</SelectItem>
                        <SelectItem value="female">{t('female')}</SelectItem>
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
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewHistory(animal)}
                          title="Ver Histórico"
                        >
                          <Calendar className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadVaccineCard(animal.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Baixar Carteirinha"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVaccinate(animal.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Vacinar"
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

      {/* Dialog de Histórico */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Histórico - {selectedAnimal?.name}</DialogTitle>
            <DialogDescription>
              Histórico completo de vacinas, consultas e serviços
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="vaccines" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="vaccines">{t('vaccines')}</TabsTrigger>
              <TabsTrigger value="appointments">Consultas</TabsTrigger>
              <TabsTrigger value="exams">Exames</TabsTrigger>
              <TabsTrigger value="grooming">Banho & Tosa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vaccines" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t('vaccineHistory')}</h3>
                <Button
                  size="sm"
                  onClick={() => selectedAnimal && downloadVaccineCard(selectedAnimal.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('downloadCard')}
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vacina</TableHead>
                      <TableHead>Lote</TableHead>
                      <TableHead>Aplicação</TableHead>
                      <TableHead>Próxima Dose</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVaccines.filter(v => v.animalId === selectedAnimal?.id).map((vaccine) => (
                      <TableRow key={vaccine.id}>
                        <TableCell>{vaccine.vaccineType}</TableCell>
                        <TableCell>{vaccine.batch}</TableCell>
                        <TableCell>{vaccine.applicationDate.toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{vaccine.nextDueDate?.toLocaleDateString('pt-BR')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4">
              <h3 className="text-lg font-semibold">{t('appointmentHistory')}</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAppointments.filter(a => a.animalId === selectedAnimal?.id).map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.appointmentDate.toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{appointment.appointmentTime}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-blue-600" />
                            Consulta
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={appointment.status === 'completed' ? 'default' : 'secondary'}>
                            {appointment.status === 'completed' ? 'Realizada' : 'Agendada'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="exams" className="space-y-4">
              <h3 className="text-lg font-semibold">Histórico de Exames</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Tipo de Exame</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-gray-500">
                        Nenhum exame registrado
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="grooming" className="space-y-4">
              <h3 className="text-lg font-semibold">Histórico de Banho & Tosa</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockGrooming.filter(g => g.animalId === selectedAnimal?.id).map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.serviceDate.toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Scissors className="w-4 h-4 text-green-600" />
                            Banho e Tosa
                          </div>
                        </TableCell>
                        <TableCell>R$ {service.price?.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={service.status === 'completed' ? 'default' : 'secondary'}>
                            {service.status === 'completed' ? 'Concluído' : 'Agendado'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Animals;
