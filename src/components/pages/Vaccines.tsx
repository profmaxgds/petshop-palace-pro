
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Syringe, FileText, Download, Calendar, User } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Vaccine, Animal, Product, Veterinarian } from '@/types';

const Vaccines: React.FC = () => {
  // Mock data - apenas produtos que são vacinas
  const vaccineProducts: Product[] = [
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

  const mockAnimals: Animal[] = [
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

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: '1',
      animalId: '1',
      animal: mockAnimals[0],
      productId: '1',
      product: vaccineProducts[0],
      batch: 'VAC001-A',
      applicationDate: new Date('2024-01-15'),
      nextDueDate: new Date('2025-01-15'),
      veterinarianId: '1',
      veterinarian: mockVeterinarians[0],
      notes: 'Aplicação normal, animal reagiu bem',
      createdAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [selectedAnimalForCard, setSelectedAnimalForCard] = useState<string>('');
  const [formData, setFormData] = useState({
    animalId: '',
    productId: '',
    batch: '',
    applicationDate: new Date().toISOString().split('T')[0],
    nextDueDate: '',
    veterinarianId: '',
    notes: '',
  });

  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.veterinarian?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    const selectedAnimal = mockAnimals.find(a => a.id === formData.animalId);
    const selectedProduct = vaccineProducts.find(p => p.id === formData.productId);
    const selectedVet = mockVeterinarians.find(v => v.id === formData.veterinarianId);
    
    if (editingVaccine) {
      setVaccines(vaccines.map(v => 
        v.id === editingVaccine.id 
          ? { 
              ...editingVaccine, 
              ...formData, 
              animal: selectedAnimal,
              product: selectedProduct,
              veterinarian: selectedVet,
              applicationDate: new Date(formData.applicationDate),
              nextDueDate: formData.nextDueDate ? new Date(formData.nextDueDate) : new Date(),
            }
          : v
      ));
    } else {
      const newVaccine: Vaccine = {
        id: Date.now().toString(),
        animalId: formData.animalId,
        animal: selectedAnimal,
        productId: formData.productId,
        product: selectedProduct,
        batch: formData.batch,
        applicationDate: new Date(formData.applicationDate),
        nextDueDate: new Date(formData.nextDueDate),
        veterinarianId: formData.veterinarianId,
        veterinarian: selectedVet,
        notes: formData.notes,
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
      productId: '',
      batch: '',
      applicationDate: new Date().toISOString().split('T')[0],
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
    setIsAddDialogOpen(true);
  };

  const handleDelete = (vaccineId: string) => {
    setVaccines(vaccines.filter(v => v.id !== vaccineId));
  };

  const handleShowCard = (animalId: string) => {
    setSelectedAnimalForCard(animalId);
    setIsCardDialogOpen(true);
  };

  const handleDownloadCard = () => {
    const selectedAnimal = mockAnimals.find(a => a.id === selectedAnimalForCard);
    const animalVaccines = vaccines.filter(v => v.animalId === selectedAnimalForCard);
    
    if (!selectedAnimal) return;

    // Criar conteúdo HTML para o PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Carteirinha de Vacinação - ${selectedAnimal.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #06a1ff; padding-bottom: 10px; }
            .animal-info { margin-bottom: 20px; }
            .vaccine-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .vaccine-table th, .vaccine-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .vaccine-table th { background-color: #06a1ff; color: white; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐾 CARTEIRINHA DE VACINAÇÃO</h1>
            <h2>PetShop Manager</h2>
          </div>
          
          <div class="animal-info">
            <h3>Dados do Animal</h3>
            <p><strong>Nome:</strong> ${selectedAnimal.name}</p>
            <p><strong>Espécie:</strong> ${selectedAnimal.species}</p>
            <p><strong>Raça:</strong> ${selectedAnimal.breed}</p>
            <p><strong>Idade:</strong> ${selectedAnimal.age} anos</p>
            <p><strong>Peso:</strong> ${selectedAnimal.weight} kg</p>
            <p><strong>Sexo:</strong> ${selectedAnimal.sex === 'male' ? 'Macho' : 'Fêmea'}</p>
          </div>

          <h3>Histórico de Vacinações</h3>
          <table class="vaccine-table">
            <thead>
              <tr>
                <th>Vacina</th>
                <th>Lote</th>
                <th>Data Aplicação</th>
                <th>Próxima Dose</th>
                <th>Veterinário</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              ${animalVaccines.map(vaccine => `
                <tr>
                  <td>${vaccine.product?.name || 'N/A'}</td>
                  <td>${vaccine.batch}</td>
                  <td>${vaccine.applicationDate.toLocaleDateString('pt-BR')}</td>
                  <td>${vaccine.nextDueDate.toLocaleDateString('pt-BR')}</td>
                  <td>${vaccine.veterinarian?.name || 'N/A'}</td>
                  <td>${vaccine.notes || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>Documento gerado em ${new Date().toLocaleDateString('pt-BR')} pelo PetShop Manager</p>
          </div>
        </body>
      </html>
    `;

    // Criar e baixar o arquivo
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `carteirinha-vacinacao-${selectedAnimal.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('vaccines')}</h1>
          <p className="text-gray-600">Gerencie as vacinações dos animais</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registro de Vacinas</CardTitle>
              <CardDescription>
                {filteredVaccines.length} vacinações registradas
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                    <FileText className="w-4 h-4 mr-2" />
                    Carteirinha Digital
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Carteirinha de Vacinação</DialogTitle>
                    <DialogDescription>
                      Selecione um animal para visualizar ou baixar a carteirinha
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <Label htmlFor="animalSelect">Animal</Label>
                    <Select
                      value={selectedAnimalForCard}
                      onValueChange={setSelectedAnimalForCard}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um animal" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAnimals.map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} - {animal.species}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCardDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleDownloadCard} 
                      disabled={!selectedAnimalForCard}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600">
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
                      Preencha os dados da vacinação
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div>
                      <Label htmlFor="animalId">Animal</Label>
                      <Select
                        value={formData.animalId}
                        onValueChange={(value) => setFormData({...formData, animalId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o animal" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockAnimals.map((animal) => (
                            <SelectItem key={animal.id} value={animal.id}>
                              {animal.name} - {animal.species}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="productId">Vacina</Label>
                      <Select
                        value={formData.productId}
                        onValueChange={(value) => setFormData({...formData, productId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a vacina" />
                        </SelectTrigger>
                        <SelectContent>
                          {vaccineProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
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
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Observações sobre a vacinação"
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
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Syringe className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{vaccine.animal?.name}</div>
                          <div className="text-sm text-gray-500">{vaccine.animal?.species}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vaccine.product?.name}</div>
                        <div className="text-sm text-gray-500">{vaccine.product?.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{vaccine.batch}</Badge>
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
                      <div className="flex items-center text-sm">
                        <User className="w-3 h-3 mr-1" />
                        {vaccine.veterinarian?.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShowCard(vaccine.animalId)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
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
    </div>
  );
};

export default Vaccines;
