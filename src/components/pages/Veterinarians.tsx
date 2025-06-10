
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
import { Search, Plus, Edit, Trash2, Phone, Mail, UserCheck, UserX, Stethoscope } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Veterinarian } from '@/types';

const Veterinarians: React.FC = () => {
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([
    {
      id: '1',
      name: 'Dr. Carlos Silva',
      crmv: 'CRMV-SP 12345',
      specialties: ['Clínica Geral', 'Dermatologia'],
      phone: '(11) 99999-9999',
      email: 'carlos@clinica.com',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Dra. Ana Costa',
      crmv: 'CRMV-SP 67890',
      specialties: ['Cirurgia', 'Cardiologia'],
      phone: '(11) 88888-8888',
      email: 'ana@clinica.com',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVet, setEditingVet] = useState<Veterinarian | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    crmv: '',
    specialties: [] as string[],
    phone: '',
    email: '',
    status: 'active' as Veterinarian['status'],
  });

  const specialtyOptions = [
    'Clínica Geral',
    'Cirurgia',
    'Dermatologia',
    'Cardiologia',
    'Oncologia',
    'Neurologia',
    'Ortopedia',
    'Oftalmologia',
    'Endocrinologia',
    'Anestesiologia'
  ];

  const filteredVeterinarians = veterinarians.filter(vet =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.crmv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSave = () => {
    if (editingVet) {
      setVeterinarians(veterinarians.map(v => 
        v.id === editingVet.id 
          ? { ...editingVet, ...formData, updatedAt: new Date() }
          : v
      ));
    } else {
      const newVet: Veterinarian = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setVeterinarians([...veterinarians, newVet]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVet(null);
    setFormData({
      name: '',
      crmv: '',
      specialties: [],
      phone: '',
      email: '',
      status: 'active',
    });
  };

  const handleEdit = (vet: Veterinarian) => {
    setEditingVet(vet);
    setFormData(vet);
    setIsDialogOpen(true);
  };

  const handleDelete = (vetId: string) => {
    setVeterinarians(veterinarians.filter(v => v.id !== vetId));
  };

  const toggleSpecialty = (specialty: string) => {
    const newSpecialties = formData.specialties.includes(specialty)
      ? formData.specialties.filter(s => s !== specialty)
      : [...formData.specialties, specialty];
    setFormData({ ...formData, specialties: newSpecialties });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veterinários</h1>
          <p className="text-gray-600">Gerencie os veterinários da clínica</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Veterinários</CardTitle>
              <CardDescription>
                {filteredVeterinarians.length} veterinários cadastrados
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Veterinário
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingVet ? 'Editar Veterinário' : 'Novo Veterinário'}
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
                      placeholder="Dr. João Silva"
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
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({...formData, status: value as Veterinarian['status']})}
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
                  
                  <div className="md:col-span-2">
                    <Label>Especialidades</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {specialtyOptions.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={specialty}
                            checked={formData.specialties.includes(specialty)}
                            onChange={() => toggleSpecialty(specialty)}
                            className="rounded"
                          />
                          <label htmlFor={specialty} className="text-sm">{specialty}</label>
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
              placeholder="Buscar por nome, CRMV ou especialidade..."
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
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVeterinarians.map((vet) => (
                  <TableRow key={vet.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium">{vet.name}</div>
                          <div className="text-sm text-gray-500">{vet.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{vet.crmv}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {vet.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {vet.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1" />
                          {vet.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={vet.status === 'active' ? 'default' : 'secondary'}>
                        {vet.status === 'active' ? (
                          <>
                            <UserCheck className="w-3 h-3 mr-1" />
                            Ativo
                          </>
                        ) : (
                          <>
                            <UserX className="w-3 h-3 mr-1" />
                            Inativo
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(vet)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(vet.id)}
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
