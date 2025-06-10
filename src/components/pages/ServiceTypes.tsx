
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
import { Search, Plus, Edit, Trash2, Clock, DollarSign, Stethoscope, Scissors, Activity, Beaker } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { ServiceType } from '@/types';

const ServiceTypes: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([
    {
      id: '1',
      name: 'Consulta Clínica Geral',
      category: 'consultation',
      duration: 30,
      price: 80.00,
      description: 'Consulta veterinária de rotina',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Hemograma Completo',
      category: 'exam',
      duration: 15,
      price: 45.00,
      description: 'Exame de sangue completo',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Banho e Tosa',
      category: 'grooming',
      duration: 120,
      price: 35.00,
      description: 'Serviço completo de higiene',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Castração',
      category: 'surgery',
      duration: 180,
      price: 200.00,
      description: 'Cirurgia de castração',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'consultation' as ServiceType['category'],
    duration: 30,
    price: 0,
    description: '',
    isActive: true,
  });

  const filteredServices = serviceTypes.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: ServiceType['category']) => {
    switch (category) {
      case 'consultation':
        return <Stethoscope className="w-4 h-4" />;
      case 'exam':
        return <Beaker className="w-4 h-4" />;
      case 'surgery':
        return <Activity className="w-4 h-4" />;
      case 'grooming':
        return <Scissors className="w-4 h-4" />;
      default:
        return <Stethoscope className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: ServiceType['category']) => {
    switch (category) {
      case 'consultation':
        return 'Consulta';
      case 'exam':
        return 'Exame';
      case 'surgery':
        return 'Cirurgia';
      case 'grooming':
        return 'Banho & Tosa';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: ServiceType['category']) => {
    switch (category) {
      case 'consultation':
        return 'default';
      case 'exam':
        return 'secondary';
      case 'surgery':
        return 'destructive';
      case 'grooming':
        return 'outline';
      default:
        return 'default';
    }
  };

  const handleSave = () => {
    if (editingService) {
      setServiceTypes(serviceTypes.map(s => 
        s.id === editingService.id 
          ? { ...editingService, ...formData, updatedAt: new Date() }
          : s
      ));
    } else {
      const newService: ServiceType = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setServiceTypes([...serviceTypes, newService]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingService(null);
    setFormData({
      name: '',
      category: 'consultation',
      duration: 30,
      price: 0,
      description: '',
      isActive: true,
    });
  };

  const handleEdit = (service: ServiceType) => {
    setEditingService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    setServiceTypes(serviceTypes.filter(s => s.id !== serviceId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tipos de Serviços</h1>
          <p className="text-gray-600">Gerencie os tipos de serviços oferecidos</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Serviços</CardTitle>
              <CardDescription>
                {filteredServices.length} tipos de serviços cadastrados
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Tipo de Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingService ? 'Editar Tipo de Serviço' : 'Novo Tipo de Serviço'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do tipo de serviço
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome do Serviço</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: Consulta Clínica Geral"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value as ServiceType['category']})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consulta</SelectItem>
                        <SelectItem value="exam">Exame</SelectItem>
                        <SelectItem value="surgery">Cirurgia</SelectItem>
                        <SelectItem value="grooming">Banho & Tosa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                      placeholder="30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="isActive">Status</Label>
                    <Select
                      value={formData.isActive.toString()}
                      onValueChange={(value) => setFormData({...formData, isActive: value === 'true'})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Ativo</SelectItem>
                        <SelectItem value="false">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descrição do serviço..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    Salvar
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
                placeholder="Buscar por nome do serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="consultation">Consultas</SelectItem>
                <SelectItem value="exam">Exames</SelectItem>
                <SelectItem value="surgery">Cirurgias</SelectItem>
                <SelectItem value="grooming">Banho & Tosa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        {service.description && (
                          <div className="text-sm text-gray-500">{service.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCategoryColor(service.category) as any} className="flex items-center gap-1 w-fit">
                        {getCategoryIcon(service.category)}
                        {getCategoryLabel(service.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {service.duration} min
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-gray-400" />
                        R$ {service.price.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={service.isActive ? 'default' : 'secondary'}>
                        {service.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceTypes;
