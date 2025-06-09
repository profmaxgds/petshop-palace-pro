
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { UserCheck, Plus, Edit, Trash2, Search, Phone, Mail } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Veterinarian } from '@/types';

const Veterinarians: React.FC = () => {
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([
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
    {
      id: '2',
      name: 'Dra. Maria Santos',
      crmv: 'CRMV-SP 67890',
      phone: '(11) 88888-8888',
      email: 'maria.santos@email.com',
      specialties: ['Dermatologia', 'Oftalmologia'],
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVeterinarian, setEditingVeterinarian] = useState<Veterinarian | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    crmv: '',
    phone: '',
    email: '',
    specialties: '',
  });

  const filteredVeterinarians = veterinarians.filter(vet => 
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.crmv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    const specialtiesArray = formData.specialties.split(',').map(s => s.trim()).filter(s => s);
    
    if (editingVeterinarian) {
      setVeterinarians(veterinarians.map(vet => 
        vet.id === editingVeterinarian.id 
          ? { 
              ...editingVeterinarian, 
              ...formData,
              specialties: specialtiesArray,
              updatedAt: new Date(),
            }
          : vet
      ));
    } else {
      const newVeterinarian: Veterinarian = {
        id: Date.now().toString(),
        ...formData,
        specialties: specialtiesArray,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setVeterinarians([...veterinarians, newVeterinarian]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVeterinarian(null);
    setFormData({
      name: '',
      crmv: '',
      phone: '',
      email: '',
      specialties: '',
    });
  };

  const handleEdit = (veterinarian: Veterinarian) => {
    setEditingVeterinarian(veterinarian);
    setFormData({
      name: veterinarian.name,
      crmv: veterinarian.crmv,
      phone: veterinarian.phone,
      email: veterinarian.email,
      specialties: veterinarian.specialties.join(', '),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (veterinarianId: string) => {
    setVeterinarians(veterinarians.filter(vet => vet.id !== veterinarianId));
  };

  const toggleActive = (veterinarianId: string) => {
    setVeterinarians(veterinarians.map(vet => 
      vet.id === veterinarianId ? { ...vet, active: !vet.active, updatedAt: new Date() } : vet
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veterinários</h1>
          <p className="text-gray-600">Gestão de veterinários e especialistas</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Veterinários Cadastrados</CardTitle>
              <CardDescription>
                {filteredVeterinarians.length} veterinários encontrados
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Veterinário
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVeterinarian ? 'Editar Veterinário' : 'Novo Veterinário'}
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
                      placeholder="Dr(a). Nome do veterinário"
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
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="veterinario@email.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="specialties">Especialidades</Label>
                    <Input
                      id="specialties"
                      value={formData.specialties}
                      onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                      placeholder="Clínica Geral, Cirurgia, Dermatologia (separar por vírgula)"
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, CRMV ou e-mail..."
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
                  <TableHead>Veterinário</TableHead>
                  <TableHead>CRMV</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVeterinarians.map((veterinarian) => (
                  <TableRow key={veterinarian.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium">{veterinarian.name}</div>
                          <div className="text-sm text-gray-500">{veterinarian.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{veterinarian.crmv}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          {veterinarian.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          {veterinarian.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {veterinarian.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={veterinarian.active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleActive(veterinarian.id)}
                      >
                        {veterinarian.active ? 'Ativo' : 'Inativo'}
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
