
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
import { Calendar as CalendarIcon, Scissors, Plus, Edit, Trash2, Search, DollarSign, Clock } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { GroomingService, Animal } from '@/types';

const Grooming: React.FC = () => {
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

  const [groomingServices, setGroomingServices] = useState<GroomingService[]>([
    {
      id: '1',
      animalId: '1',
      animal: animals[0],
      date: new Date('2024-12-10'),
      serviceType: 'Banho e Tosa Completa',
      status: 'scheduled',
      notes: 'Animal de grande porte, cuidado especial com escovação',
      price: 80.00,
      createdAt: new Date(),
    },
    {
      id: '2',
      animalId: '2',
      animal: animals[1],
      date: new Date('2024-12-11'),
      serviceType: 'Banho Simples',
      status: 'in-progress',
      notes: 'Gato persa, cuidado com pelos longos',
      price: 45.00,
      createdAt: new Date(),
    },
    {
      id: '3',
      animalId: '1',
      animal: animals[0],
      date: new Date('2024-12-08'),
      serviceType: 'Tosa Higiênica',
      status: 'completed',
      notes: 'Serviço realizado com sucesso',
      price: 35.00,
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<GroomingService | null>(null);
  const [formData, setFormData] = useState({
    animalId: '',
    date: '',
    serviceType: '',
    price: '',
    notes: '',
  });

  const filteredServices = groomingServices.filter(service => {
    const matchesSearch = 
      service.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: GroomingService['status']) => {
    switch (status) {
      case 'scheduled':
        return { label: 'Agendado', color: 'default' };
      case 'in-progress':
        return { label: 'Em Andamento', color: 'secondary' };
      case 'completed':
        return { label: 'Concluído', color: 'outline' };
      default:
        return { label: status, color: 'default' };
    }
  };

  const handleSave = () => {
    const selectedAnimal = animals.find(a => a.id === formData.animalId);
    
    if (editingService) {
      setGroomingServices(groomingServices.map(s => 
        s.id === editingService.id 
          ? { 
              ...editingService, 
              ...formData,
              animal: selectedAnimal,
              date: new Date(formData.date),
              price: parseFloat(formData.price),
            }
          : s
      ));
    } else {
      const newService: GroomingService = {
        id: Date.now().toString(),
        ...formData,
        animal: selectedAnimal,
        date: new Date(formData.date),
        price: parseFloat(formData.price),
        status: 'scheduled',
        createdAt: new Date(),
      };
      setGroomingServices([...groomingServices, newService]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingService(null);
    setFormData({
      animalId: '',
      date: '',
      serviceType: '',
      price: '',
      notes: '',
    });
  };

  const handleEdit = (service: GroomingService) => {
    setEditingService(service);
    setFormData({
      animalId: service.animalId,
      date: service.date.toISOString().split('T')[0],
      serviceType: service.serviceType,
      price: service.price.toString(),
      notes: service.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    setGroomingServices(groomingServices.filter(s => s.id !== serviceId));
  };

  const handleStatusChange = (serviceId: string, newStatus: GroomingService['status']) => {
    setGroomingServices(groomingServices.map(s => 
      s.id === serviceId ? { ...s, status: newStatus } : s
    ));
  };

  const serviceTypes = [
    'Banho Simples',
    'Banho com Condicionador',
    'Tosa Higiênica',
    'Tosa na Máquina',
    'Tosa na Tesoura',
    'Banho e Tosa Completa',
    'Corte de Unhas',
    'Limpeza de Ouvidos',
    'Escovação de Dentes'
  ];

  const totalRevenue = groomingServices
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.price, 0);

  const todayServices = groomingServices.filter(s => 
    s.date.toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banho e Tosa</h1>
          <p className="text-gray-600">Gestão de serviços de estética animal</p>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Hoje</p>
                <p className="text-2xl font-bold">{todayServices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Agendados</p>
                <p className="text-2xl font-bold">
                  {groomingServices.filter(s => s.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold">
                  {groomingServices.filter(s => s.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Serviços de Banho e Tosa</CardTitle>
              <CardDescription>
                {filteredServices.length} serviços encontrados
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingService ? 'Editar Serviço' : 'Novo Serviço'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do serviço de banho e tosa
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
                  
                  <div>
                    <Label htmlFor="serviceType">Tipo de Serviço</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({...formData, serviceType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="date">Data e Hora</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Observações sobre o serviço, cuidados especiais..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
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
                placeholder="Buscar por animal ou tipo de serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="scheduled">Agendados</SelectItem>
                <SelectItem value="in-progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => {
                  const statusBadge = getStatusBadge(service.status);
                  
                  return (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Scissors className="w-4 h-4 text-orange-600" />
                          <div>
                            <div className="font-medium">{service.animal?.name}</div>
                            <div className="text-sm text-gray-500">
                              {service.animal?.species} - {service.animal?.breed}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{service.serviceType}</div>
                        {service.notes && (
                          <div className="text-sm text-gray-500 mt-1">{service.notes}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {service.date.toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.date.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          R$ {service.price.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={service.status}
                          onValueChange={(value) => handleStatusChange(service.id, value as GroomingService['status'])}
                        >
                          <SelectTrigger className="w-[140px]">
                            <Badge variant={statusBadge.color as any}>
                              {statusBadge.label}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Agendado</SelectItem>
                            <SelectItem value="in-progress">Em Andamento</SelectItem>
                            <SelectItem value="completed">Concluído</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(service.id)}
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
    </div>
  );
};

export default Grooming;
