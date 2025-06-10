
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Tutor } from '@/types';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
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
                <Button className="bg-blue-600 hover:bg-blue-700">
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
                          onClick={() => {/* Navigate to animals page with tutor pre-selected */}}
                          className="text-green-600 hover:text-green-800"
                          title="Cadastrar Animal"
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
    </div>
  );
