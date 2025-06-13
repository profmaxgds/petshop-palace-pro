
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import type { Animal, Tutor, Vaccine, Appointment, GroomingService, Breed } from '@/types';
import AnimalForm from './animals/AnimalForm';
import AnimalsTable from './animals/AnimalsTable';
import AnimalHistoryDialog from './animals/AnimalHistoryDialog';

const Animals: React.FC = () => {
  const navigate = useNavigate();

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

  const handleSave = () => {
    if (!formData.species || !formData.name || !formData.tutorId) {
      return;
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
          
          <AnimalsTable
            animals={filteredAnimals}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewHistory={handleViewHistory}
            onVaccinate={handleVaccinate}
            onDownloadCard={downloadVaccineCard}
          />
        </CardContent>
      </Card>

      <AnimalForm
        isOpen={isAddDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        editingAnimal={editingAnimal}
        formData={formData}
        setFormData={setFormData}
        tutors={tutors}
        breeds={breeds}
      />

      <AnimalHistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        animal={selectedAnimal}
        vaccines={mockVaccines}
        appointments={mockAppointments}
        grooming={mockGrooming}
        onDownloadCard={downloadVaccineCard}
      />
    </div>
  );
};

export default Animals;
