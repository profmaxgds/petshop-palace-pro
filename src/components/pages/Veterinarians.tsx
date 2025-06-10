
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Plus, Edit, Trash2, UserMd, Phone, Mail } from 'lucide-react';
import type { Veterinarian } from '@/types';

const Veterinarians: React.FC = () => {
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([
    {
      id: '1',
      name: 'Dr. Carlos Silva',
      crmv: 'CRMV-SP 12345',
      phone: '(11) 99999-9999',
      email: 'carlos@clinica.com',
      specialties: ['Clínica Geral', 'Cirurgia'],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Dra. Ana Costa',
      crmv: 'CRMV-SP 67890',
      phone: '(11) 88888-8888',
      email: 'ana@clinica.com',
      specialties: ['Dermatologia', 'Cardiologia'],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVeterinarian, setEditingVeterinarian] = useState<Veterinarian | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    crmv: '',
    phone: '',
    email: '',
    specialties: [] as string[],
    status: 'active' as 'active' | 'inactive',
  });

  const availableSpecialties = [
    'Clínica Geral',
    'Cirurgia',
    'Dermatologia',
    'Cardiologia',
    'Oftalmologia',
    'Neurologia',
    'Ortopedia',
    'Oncologia',
    'Anestesiologia',
    'Reprodução',
    'Exóticos',
    'Felinos'
  ];

  const filteredVeterinarians = veterinarians.filter(vet =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.crmv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (editingVeterinarian) {
      setVeterinarians(veterinarians.map(v => 
        v.id === editingVeterinarian.id 
          ? { ...editingVeterinarian, ...formData, updatedAt: new Date() }
          : v
      ));
    } else {
      const newVeterinarian: Veterinarian = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setVeterinarians([...veterinarians, newVeterinarian]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingVeterinarian(null);
    setFormData({
      name: '',
      crmv: '',
      phone: '',
      email: '',
      specialties: [],
      status: 'active',
    });
  };

  const handleEdit = (veterinarian: Veterinarian) => {
    setEditingVeterinarian(veterinarian);
    setFormData(veterinarian);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (veterinarianId: string) => {
    setVeterinarians(veterinarians.filter(v => v.id !== veterinarianId));
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialty]
      });
    } else {
      setFormData({
        ...formData,
        specialties: formData.specialties.filter(s => s !== specialty)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veterinários</h1>
          <p className="text-gray-600">Gerencie a equipe de veterinários</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Equipe Veterinária</CardTitle>
              <CardDescription>
                {filteredVeterinarians.length} veterinários cadastrados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Veterinário
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingVeterinarian ? 'Editar Veterinário' : 'Adicionar Veterinário'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do veterinário
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Dr. Nome Sobrenome"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="crmv">CRMV</Label>
                    <Input
                      id="crmv"
                      value={formData.crmv}
                      onChange={(e) => setFormData({...formData, crmv: e.target.value})}
                      placeholder="CRMV-SP 12345"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'active' | 'inactive') => setFormData({...formData, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label>Especialidades</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                      {availableSpecialties.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={specialty}
                            checked={formData.specialties.includes(specialty)}
                            onCheckedChange={(checked) => 
                              handleSpecialtyChange(specialty, checked as boolean)
                            }
                          />
                          <Label htmlFor={specialty} className="text-sm">
                            {specialty}
                          </Label>
                        </div>
                      ))}
                    </div>
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
              placeholder="Buscar por nome, CRMV ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Veterinário</TableHead>
                  <TableHead>CRMV</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVeterinarians.map((veterinarian) => (
                  <TableRow key={veterinarian.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserMd className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium">{veterinarian.name}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {veterinarian.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{veterinarian.crmv}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {veterinarian.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {veterinarian.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {veterinarian.specialties.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{veterinarian.specialties.length - 2} mais
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={veterinarian.status === 'active' ? 'default' : 'secondary'}>
                        {veterinarian.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(veterinarian)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(veterinarian.id)}
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

export default Veterinarians;
