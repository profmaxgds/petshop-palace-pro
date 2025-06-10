
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
import { Search, Plus, Edit, Trash2, Scissors, Stethoscope, Clock } from 'lucide-react';
import type { ServiceType } from '@/types';

const ServiceTypes: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([
    {
      id: '1',
      name: 'Banho e Tosa Completa',
      category: 'grooming',
      price: 45.00,
      duration: 120,
      description: 'Banho, tosa, corte de unhas e limpeza de ouvidos',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Apenas Banho',
      category: 'grooming',
      price: 25.00,
      duration: 60,
      description: 'Banho com produtos específicos para o tipo de pelo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Consulta Veterinária',
      category: 'veterinary',
      price: 80.00,
      duration: 30,
      description: 'Consulta clínica geral com veterinário',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Cirurgia de Castração',
      category: 'veterinary',
      price: 350.00,
      duration: 90,
      description: 'Procedimento cirúrgico de castração com anestesia',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingServiceType, setEditingServiceType] = useState<ServiceType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'grooming' as 'grooming' | 'veterinary',
    price: 0,
    duration: 0,
    description: '',
  });

  const filteredServiceTypes = serviceTypes.filter(serviceType => {
    const matchesSearch = serviceType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         serviceType.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || serviceType.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = () => {
    if (editingServiceType) {
      setServiceTypes(serviceTypes.map(s => 
        s.id === editingServiceType.id 
          ? { ...editingServiceType, ...formData, updatedAt: new Date() }
          : s
      ));
    } else {
      const newServiceType: ServiceType = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setServiceTypes([...serviceTypes, newServiceType]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingServiceType(null);
    setFormData({
      name: '',
      category: 'grooming',
      price: 0,
      duration: 0,
      description: '',
    });
  };

  const handleEdit = (serviceType: ServiceType) => {
    setEditingServiceType(serviceType);
    setFormData(serviceType);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (serviceTypeId: string) => {
    setServiceTypes(serviceTypes.filter(s => s.id !== serviceTypeId));
  };

  const getCategoryIcon = (category: 'grooming' | 'veterinary') => {
    return category === 'grooming' ? Scissors : Stethoscope;
  };

  const getCategoryLabel = (category: 'grooming' | 'veterinary') => {
    return category === 'grooming' ? 'Estética' : 'Veterinário';
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tipos de Serviços</h1>
          <p className="text-gray-600">Gerencie os serviços oferecidos pela clínica</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Serviços Disponíveis</CardTitle>
              <CardDescription>
                {filteredServiceTypes.length} serviços cadastrados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingServiceType ? 'Editar Serviço' : 'Adicionar Serviço'}
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
                      placeholder="Ex: Banho e Tosa Completa"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: 'grooming' | 'veterinary') => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grooming">Estética (Banho e Tosa)</SelectItem>
                        <SelectItem value="veterinary">Veterinário</SelectItem>
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
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      placeholder="0,00"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                      placeholder="60"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descreva o que está incluído no serviço..."
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
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="grooming">Estética</SelectItem>
                <SelectItem value="veterinary">Veterinário</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServiceTypes.map((serviceType) => {
                  const CategoryIcon = getCategoryIcon(serviceType.category);
                  return (
                    <TableRow key={serviceType.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4 text-blue-600" />
                          <div className="font-medium">{serviceType.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={serviceType.category === 'grooming' ? 'default' : 'secondary'}>
                          {getCategoryLabel(serviceType.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">R$ {serviceType.price.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDuration(serviceType.duration)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {serviceType.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(serviceType)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(serviceType.id)}
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

export default ServiceTypes;
