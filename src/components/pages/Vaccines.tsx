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
import { Syringe, Plus, Edit, Trash2, Search, Calendar, FileText, AlertTriangle, X } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Vaccine, Animal, Product, Veterinarian } from '@/types';

const Vaccines: React.FC = () => {
  // Mock data
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
  ];

  const vaccineProducts: Product[] = [
    {
      id: '1',
      name: 'Vacina V8',
      category: 'vaccine',
      description: 'Vacina óctupla para cães',
      quantity: 15,
      minQuantity: 5,
      costPrice: 45.00,
      salePrice: 80.00,
      supplier: 'Laboratório VetMax',
      batch: 'VX2024001',
      expirationDate: new Date('2025-06-15'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Vacina Antirrábica',
      category: 'vaccine',
      description: 'Vacina contra raiva',
      quantity: 8,
      minQuantity: 10,
      costPrice: 25.00,
      salePrice: 45.00,
      supplier: 'Laboratório VetMax',
      batch: 'VR2024002',
      expirationDate: new Date('2025-12-31'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const veterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. João Silva',
      crmv: 'CRMV-SP 12345',
      phone: '(11) 99999-9999',
      email: 'joao.silva@email.com',
      specialties: ['Clínica Geral', 'Cirurgia'],
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: '1',
      animalId: '1',
      animal: animals[0],
      productId: '1',
      product: vaccineProducts[0],
      batch: 'VX2024001',
      applicationDate: new Date('2024-11-15'),
      nextDueDate: new Date('2025-11-15'),
      veterinarianId: '1',
      veterinarian: veterinarians[0],
      notes: 'Primeira dose aplicada com sucesso',
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [selectedAnimalForCard, setSelectedAnimalForCard] = useState<Animal | null>(null);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [formData, setFormData] = useState({
    animalId: '',
    productId: '',
    batch: '',
    applicationDate: '',
    nextDueDate: '',
    veterinarianId: '',
    notes: '',
  });

  const filteredVaccines = vaccines.filter(vaccine => {
    const matchesSearch =
      vaccine.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.batch.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const upcomingVaccines = vaccines.filter(vaccine => {
    const timeDiff = vaccine.nextDueDate.getTime() - new Date().getTime();
    const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysUntil <= 30 && daysUntil >= 0;
  });

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVaccine(null);
    setFormData({
      animalId: '',
      productId: '',
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
      productId: vaccine.productId,
      batch: vaccine.batch,
      applicationDate: vaccine.applicationDate.toISOString().split('T')[0],
      nextDueDate: vaccine.nextDueDate.toISOString().split('T')[0],
      veterinarianId: vaccine.veterinarianId,
      notes: vaccine.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (vaccineId: string) => {
    setVaccines(vaccines.filter(vaccine => vaccine.id !== vaccineId));
  };

  const handleSave = () => {
    const selectedAnimal = animals.find(a => a.id === formData.animalId);
    const selectedProduct = vaccineProducts.find(p => p.id === formData.productId);
    const selectedVeterinarian = veterinarians.find(v => v.id === formData.veterinarianId);

    if (editingVaccine) {
      setVaccines(vaccines.map(vaccine =>
        vaccine.id === editingVaccine.id
          ? {
              ...editingVaccine,
              ...formData,
              animal: selectedAnimal,
              product: selectedProduct,
              veterinarian: selectedVeterinarian,
              applicationDate: new Date(formData.applicationDate),
              nextDueDate: new Date(formData.nextDueDate),
            }
          : vaccine
      ));
    } else {
      const newVaccine: Vaccine = {
        id: Date.now().toString(),
        ...formData,
        animal: selectedAnimal,
        product: selectedProduct,
        veterinarian: selectedVeterinarian,
        applicationDate: new Date(formData.applicationDate),
        nextDueDate: new Date(formData.nextDueDate),
        createdAt: new Date(),
      } as Vaccine;
      setVaccines([...vaccines, newVaccine]);
    }
    handleCloseDialog();
  };

  const handleProductChange = (productId: string) => {
    const selectedProduct = vaccineProducts.find(p => p.id === productId);
    setFormData({
      ...formData,
      productId,
      batch: selectedProduct?.batch || '',
    });
  };

  const getAnimalVaccines = (animalId: string) => {
    return vaccines.filter(v => v.animalId === animalId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Controle de Vacinas</h1>
          <p className="text-gray-600">Gestão de vacinação dos animais</p>
        </div>
      </div>

      {upcomingVaccines.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              Próximas Vacinas (30 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingVaccines.map(vaccine => (
                <div key={vaccine.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div>
                    <div className="font-medium">{vaccine.animal?.name}</div>
                    <div className="text-sm text-gray-500">{vaccine.product?.name}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Próxima dose: {vaccine.nextDueDate.toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vacinas Aplicadas</CardTitle>
              <CardDescription>
                {filteredVaccines.length} vacinas encontradas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setIsCardDialogOpen(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <FileText className="w-4 h-4 mr-2" />
                Carteirinha Digital
              </Button>
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
                      Preencha os dados da aplicação da vacina
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
                              {animal.name} - {animal.species} ({animal.breed})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="productId">Vacina (Estoque)</Label>
                      <Select
                        value={formData.productId}
                        onValueChange={handleProductChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a vacina" />
                        </SelectTrigger>
                        <SelectContent>
                          {vaccineProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} - Estoque: {product.quantity} (Lote: {product.batch})
                            </SelectItem>
                          ))}
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
                      <Label htmlFor="veterinarianId">Veterinário</Label>
                      <Select
                        value={formData.veterinarianId}
                        onValueChange={(value) => setFormData({...formData, veterinarianId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o veterinário" />
                        </SelectTrigger>
                        <SelectContent>
                          {veterinarians.filter(v => v.active).map((vet) => (
                            <SelectItem key={vet.id} value={vet.id}>
                              {vet.name} - {vet.crmv}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        placeholder="Observações sobre a aplicação, reações, etc..."
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
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por animal, vacina ou lote..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
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
                      <div className="flex items-center gap-2">
                        <Syringe className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium">{vaccine.animal?.name}</div>
                          <div className="text-sm text-gray-500">
                            {vaccine.animal?.species} - {vaccine.animal?.breed}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{vaccine.product?.name}</div>
                      <div className="text-sm text-gray-500">{vaccine.product?.description}</div>
                    </TableCell>
                    <TableCell>{vaccine.batch}</TableCell>
                    <TableCell>
                      {vaccine.applicationDate.toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      {vaccine.nextDueDate.toLocaleDateString('pt-BR')}
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

      {/* Carteirinha Digital Dialog */}
      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Carteirinha de Vacinação Digital
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCardDialogOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {animals.map(animal => (
              <Card key={animal.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">{animal.name}</CardTitle>
                  <CardDescription>
                    {animal.species} - {animal.breed}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="text-lg font-semibold mb-2">Vacinas Aplicadas:</h4>
                  {getAnimalVaccines(animal.id).length > 0 ? (
                    <ul className="list-disc list-inside">
                      {getAnimalVaccines(animal.id).map(vaccine => (
                        <li key={vaccine.id} className="mb-1">
                          <span className="font-medium">{vaccine.product?.name}</span>
                          <div className="text-sm text-gray-500">
                            Data: {vaccine.applicationDate.toLocaleDateString('pt-BR')} | Próxima: {vaccine.nextDueDate.toLocaleDateString('pt-BR')}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Nenhuma vacina aplicada.</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vaccines;
