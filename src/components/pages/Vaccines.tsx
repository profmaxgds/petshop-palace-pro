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
import { Search, Plus, Edit, Trash2, Syringe, AlertTriangle, Calendar, CreditCard, Download } from 'lucide-react';
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

  // Mock products (vaccines) from inventory
  const vaccineProducts = [
    { id: '1', name: 'Vacina V10', batch: 'V10-2024-001' },
    { id: '2', name: 'Vacina Antirrábica', batch: 'AR-2024-002' },
    { id: '3', name: 'Vacina Leishmaniose', batch: 'LE-2024-003' },
    { id: '4', name: 'Vacina Gripe Canina', batch: 'GC-2024-004' },
  ];

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: '1',
      animalId: '1',
      animal: animals[0],
      type: 'V10',
      batch: 'V10-2024-001',
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
      batch: 'AR-2024-002',
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
      batch: 'LE-2023-003',
      applicationDate: new Date('2023-12-01'),
      nextDueDate: new Date('2024-06-01'),
      veterinarian: 'Dr. Carlos Silva',
      notes: 'Reforço necessário em breve',
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [selectedAnimalForCard, setSelectedAnimalForCard] = useState<Animal | null>(null);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [formData, setFormData] = useState({
    animalId: '',
    type: '',
    batch: '',
    applicationDate: '',
    nextDueDate: '',
    veterinarian: '',
    notes: '',
  });

  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.veterinarian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.batch.toLowerCase().includes(searchTerm.toLowerCase())
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
      batch: '',
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
      batch: vaccine.batch,
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

  const openVaccineCard = (animal: Animal) => {
    setSelectedAnimalForCard(animal);
    setIsCardDialogOpen(true);
  };

  const getAnimalVaccines = (animalId: string) => {
    return vaccines.filter(v => v.animalId === animalId).sort((a, b) => 
      new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
    );
  };

  const vaccineTypes = [
    'V8', 'V10', 'V12', 'Antirrábica', 'Leishmaniose', 'Gripe Canina', 
    'Giárdia', 'Tríplice Felina', 'FeLV', 'FIV'
  ];

  const downloadVaccineCard = (animal: Animal) => {
    const animalVaccines = getAnimalVaccines(animal.id);
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Carteirinha de Vacina - ${animal.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { background: linear-gradient(135deg, #06a1ff, #3d4756); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .animal-info { display: flex; align-items: center; gap: 15px; }
          .vaccine-card { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; }
          .vaccine-header { display: flex; justify-content: between; align-items: center; margin-bottom: 10px; }
          .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .status-current { background: #d1fae5; color: #065f46; }
          .status-due-soon { background: #fef3c7; color: #92400e; }
          .status-overdue { background: #fee2e2; color: #991b1b; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
          .info-item { margin-bottom: 5px; }
          .label { color: #666; font-size: 14px; }
          .value { font-weight: bold; margin-top: 2px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="animal-info">
            <div>
              <h1>${animal.name}</h1>
              <p>${animal.species} - ${animal.breed}</p>
              <p>Idade: ${animal.age} anos | Peso: ${animal.weight}kg</p>
            </div>
          </div>
        </div>
        
        <h2>Histórico de Vacinas</h2>
        ${animalVaccines.map(vaccine => {
          const status = getVaccineStatus(vaccine.nextDueDate);
          return `
            <div class="vaccine-card">
              <div class="vaccine-header">
                <h3>${vaccine.type}</h3>
                <span class="status-badge status-${status.status}">${status.label}</span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Lote:</div>
                  <div class="value">${vaccine.batch}</div>
                </div>
                <div class="info-item">
                  <div class="label">Aplicação:</div>
                  <div class="value">${vaccine.applicationDate.toLocaleDateString('pt-BR')}</div>
                </div>
                <div class="info-item">
                  <div class="label">Próxima dose:</div>
                  <div class="value">${vaccine.nextDueDate.toLocaleDateString('pt-BR')}</div>
                </div>
                <div class="info-item">
                  <div class="label">Veterinário:</div>
                  <div class="value">${vaccine.veterinarian}</div>
                </div>
                ${vaccine.notes ? `
                  <div class="info-item" style="grid-column: 1 / -1;">
                    <div class="label">Observações:</div>
                    <div class="value">${vaccine.notes}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
        
        ${animalVaccines.length === 0 ? '<p>Nenhuma vacina registrada para este animal.</p>' : ''}
        
        <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
          <p>Carteirinha gerada em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carteirinha-vacina-${animal.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

      {/* Seção de Carteirinhas de Vacina */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Carteirinhas de Vacina Digital
          </CardTitle>
          <CardDescription>
            Acesse e baixe as carteirinhas de vacina dos animais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animals.map((animal) => (
              <Card key={animal.id} className="border-teal-200 hover:border-teal-400 transition-colors cursor-pointer"
                    onClick={() => openVaccineCard(animal)}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Syringe className="w-4 h-4 text-teal-600" />
                    {animal.name}
                  </CardTitle>
                  <CardDescription>{animal.species} - {animal.breed}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    {getAnimalVaccines(animal.id).length} vacinas registradas
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Download className="w-4 h-4 mr-2" />
                    Ver Carteirinha
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                    <Label htmlFor="type">Vacina (do Estoque)</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => {
                        const selectedProduct = vaccineProducts.find(p => p.name === value);
                        setFormData({
                          ...formData, 
                          type: value,
                          batch: selectedProduct?.batch || ''
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione da lista de estoque" />
                      </SelectTrigger>
                      <SelectContent>
                        {vaccineProducts.map((product) => (
                          <SelectItem key={product.id} value={product.name}>
                            {product.name} - Lote: {product.batch}
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
                      placeholder="Preenchido automaticamente"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="veterinarian">Veterinário</Label>
                    <Select
                      value={formData.veterinarian}
                      onValueChange={(value) => setFormData({...formData, veterinarian: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o veterinário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Carlos Silva">Dr. Carlos Silva</SelectItem>
                        <SelectItem value="Dra. Ana Costa">Dra. Ana Costa</SelectItem>
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
                      placeholder="Observações sobre a vacina..."
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
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por animal, vacina, lote ou veterinário..."
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
                          <Syringe className="w-4 h-4 text-blue-600" />
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
                        <div className="text-sm font-mono">{vaccine.batch}</div>
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

      {/* Dialog da Carteirinha de Vacina */}
      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Carteirinha de Vacina - {selectedAnimalForCard?.name}
            </DialogTitle>
            <DialogDescription>
              Histórico completo de vacinação
            </DialogDescription>
          </DialogHeader>
          
          {selectedAnimalForCard && (
            <div className="space-y-4">
              {/* Cabeçalho da carteirinha */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Syringe className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedAnimalForCard.name}</h3>
                    <p className="text-blue-100">{selectedAnimalForCard.species} - {selectedAnimalForCard.breed}</p>
                    <p className="text-blue-100 text-sm">Idade: {selectedAnimalForCard.age} anos | Peso: {selectedAnimalForCard.weight}kg</p>
                  </div>
                </div>
              </div>

              {/* Lista de vacinas */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Histórico de Vacinas</h4>
                {getAnimalVaccines(selectedAnimalForCard.id).map((vaccine, index) => (
                  <div key={vaccine.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{vaccine.type}</h5>
                        <p className="text-sm text-gray-600">Lote: {vaccine.batch}</p>
                      </div>
                      <Badge variant={getVaccineStatus(vaccine.nextDueDate).color as any}>
                        {getVaccineStatus(vaccine.nextDueDate).label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Aplicação:</span>
                        <p className="font-medium">{vaccine.applicationDate.toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Próxima dose:</span>
                        <p className="font-medium">{vaccine.nextDueDate.toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Veterinário:</span>
                        <p className="font-medium">{vaccine.veterinarian}</p>
                      </div>
                      {vaccine.notes && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Observações:</span>
                          <p className="font-medium">{vaccine.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {getAnimalVaccines(selectedAnimalForCard.id).length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhuma vacina registrada para este animal.</p>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCardDialogOpen(false)}>
              Fechar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => selectedAnimalForCard && downloadVaccineCard(selectedAnimalForCard)}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Carteirinha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vaccines;
