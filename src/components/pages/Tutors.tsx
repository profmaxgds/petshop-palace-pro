import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Tutor, Animal } from '@/types';

const Tutors: React.FC = () => {
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
    },
  ]);

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAnimalDialogOpen, setIsAnimalDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [selectedTutorForAnimal, setSelectedTutorForAnimal] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const [animalFormData, setAnimalFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
    sex: 'male' as 'male' | 'female',
    weight: 0,
  });

  const filteredTutors = tutors.filter(tutor =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.cpf.includes(searchTerm) ||
    tutor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
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
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
  };

  const handleEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setFormData(tutor);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (tutorId: string) => {
    setTutors(tutors.filter(t => t.id !== tutorId));
  };

  const handleAddAnimal = (tutorId: string) => {
    setSelectedTutorForAnimal(tutorId);
    setIsAnimalDialogOpen(true);
  };

  const handleSaveAnimal = () => {
    const selectedTutor = tutors.find(t => t.id === selectedTutorForAnimal);
    const newAnimal: Animal = {
      id: Date.now().toString(),
      ...animalFormData,
      tutorId: selectedTutorForAnimal,
      tutor: selectedTutor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAnimals([...animals, newAnimal]);
    handleCloseAnimalDialog();
  };

  const handleCloseAnimalDialog = () => {
    setIsAnimalDialogOpen(false);
    setSelectedTutorForAnimal('');
    setAnimalFormData({
      name: '',
      species: '',
      breed: '',
      age: 0,
      sex: 'male',
      weight: 0,
    });
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
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addTutor')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTutor ? 'Editar Tutor' : t('addTutor')}
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
                      placeholder="Nome completo"
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
                      placeholder="(11) 99999-9999"
                    />
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
                    <Label htmlFor="number">{t('number')}</Label>
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
                      placeholder="Bairro"
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
                      placeholder="Cidade"
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
                  
                  <div>
                    <Label htmlFor="zipCode">{t('zipCode')}</Label>
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, zipCode: e.target.value}
                      })}
                      placeholder="00000-000"
                    />
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
              placeholder="Buscar por nome, CPF ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('tutorName')}</TableHead>
                  <TableHead>{t('cpf')}</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTutors.map((tutor) => (
                  <TableRow key={tutor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tutor.name}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Mail className="w-3 h-3 mr-1" />
                          {tutor.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tutor.cpf}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {tutor.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {tutor.address.street}, {tutor.address.number} - {tutor.address.neighborhood}
                        <br />
                        <span className="text-gray-500">
                          {tutor.address.city}, {tutor.address.state}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddAnimal(tutor.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog para cadastrar animal */}
      <Dialog open={isAnimalDialogOpen} onOpenChange={setIsAnimalDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cadastrar Animal</DialogTitle>
            <DialogDescription>
              Preencha os dados do animal para o tutor selecionado
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="md:col-span-2">
              <Label htmlFor="animalName">Nome do Animal</Label>
              <Input
                id="animalName"
                value={animalFormData.name}
                onChange={(e) => setAnimalFormData({...animalFormData, name: e.target.value})}
                placeholder="Nome do animal"
              />
            </div>
            
            <div>
              <Label htmlFor="species">Espécie</Label>
              <Select
                value={animalFormData.species}
                onValueChange={(value) => setAnimalFormData({...animalFormData, species: value})}
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
              <Label htmlFor="breed">Raça</Label>
              <Input
                id="breed"
                value={animalFormData.breed}
                onChange={(e) => setAnimalFormData({...animalFormData, breed: e.target.value})}
                placeholder="Raça do animal"
              />
            </div>
            
            <div>
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                type="number"
                value={animalFormData.age}
                onChange={(e) => setAnimalFormData({...animalFormData, age: parseInt(e.target.value) || 0})}
                placeholder="Idade em anos"
              />
            </div>
            
            <div>
              <Label htmlFor="sex">Sexo</Label>
              <Select
                value={animalFormData.sex}
                onValueChange={(value: 'male' | 'female') => setAnimalFormData({...animalFormData, sex: value})}
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
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={animalFormData.weight}
                onChange={(e) => setAnimalFormData({...animalFormData, weight: parseFloat(e.target.value) || 0})}
                placeholder="Peso em kg"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseAnimalDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAnimal} className="bg-blue-500 hover:bg-blue-600">
              Salvar Animal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tutors;
