import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Tutor, Vaccine, Appointment, GroomingService, Breed, Veterinarian } from '@/types';
import AnimalForm from './animals/AnimalForm';
import AnimalsTable from './animals/AnimalsTable';
import AnimalHistoryDialog from './animals/AnimalHistoryDialog';
import AnimalSearchAndFilter from './animals/AnimalSearchAndFilter';
import { generateVaccineCard } from './animals/VaccineCardGenerator';

interface AnimalsProps {
  onNavigate?: (page: string, state?: any) => void;
}

const Animals: React.FC<AnimalsProps> = ({ onNavigate }) => {
  
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

  const mockVeterinarians: Veterinarian[] = [
    { 
      id: '1', 
      name: 'Dr. Carlos Silva', 
      crmv: 'CRMV-SP 12345',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { 
      id: '2', 
      name: 'Dra. Ana Costa', 
      crmv: 'CRMV-SP 54321',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockVaccines: Vaccine[] = [
    {
      id: '1',
      animal: {} as Animal,
      animalId: '1',
      vaccineType: 'V8',
      batch: '12345',
      applicationDate: new Date('2024-11-15'),
      nextDueDate: new Date('2025-11-15'),
      veterinarianId: '1',
      veterinarian: mockVeterinarians[0],
      notes: 'Primeira dose da V8',
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: '3',
      animal: {} as Animal,
      animalId: '1',
      vaccineType: 'Antirrábica',
      batch: '',
      applicationDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      nextDueDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate() + 30)),
      veterinarianId: '2',
      veterinarian: mockVeterinarians[1],
      notes: 'Agendamento da vacina antirrábica anual',
      createdBy: 'system',
      createdAt: new Date(),
    },
  ];

  const mockAppointments: Appointment[] = [];

  const mockGrooming: GroomingService[] = [];

  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: '1',
      name: 'Rex',
      species: 'dog',
      breedId: '1',
      breed: breeds[0],
      age: 3,
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
      breed: breeds[1],
      age: 2,
      birthDate: new Date('2023-06-15'),
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
    birthDate: undefined as Date | undefined,
    sex: 'male' as 'male' | 'female',
    weight: 0,
    tutorId: '',
  });

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(animal.species).toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.tutor?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (birthDate?: Date): number | undefined => {
    if (!birthDate) return undefined;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSave = () => {
    if (!formData.species || !formData.name || !formData.tutorId) {
      return;
    }

    const selectedTutor = tutors.find(t => t.id === formData.tutorId);
    const selectedBreed = breeds.find(b => b.id === formData.breedId);
    const age = calculateAge(formData.birthDate);
    
    if (editingAnimal) {
      setAnimals(animals.map(a => 
        a.id === editingAnimal.id 
          ? { ...editingAnimal, ...formData, age, tutor: selectedTutor!, breed: selectedBreed, updatedAt: new Date() }
          : a
      ));
    } else {
      const newAnimal: Animal = {
        id: Date.now().toString(),
        ...formData,
        age,
        tutor: selectedTutor!,
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
      birthDate: undefined,
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
      breedId: animal.breedId || '',
      birthDate: animal.birthDate,
      sex: animal.sex,
      weight: animal.weight || 0,
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

  const handleNavigateToVaccines = (animalId: string) => {
    if (onNavigate) {
      onNavigate('vaccines', { selectedAnimalId: animalId });
    }
  };

  const downloadVaccineCard = (animalId: string) => {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) return;
    generateVaccineCard(animal, mockVaccines);
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
          <AnimalSearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <AnimalsTable
            animals={filteredAnimals}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewHistory={handleViewHistory}
            onNavigateToVaccines={handleNavigateToVaccines}
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
        appointments={[]}
        grooming={[]}
        onDownloadCard={downloadVaccineCard}
      />
    </div>
  );
};

export default Animals;
