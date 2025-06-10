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
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2, Search, Stethoscope, User, Scissors, Activity, Beaker } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Appointment, Animal, Veterinarian, ServiceType } from '@/types';

const Appointments: React.FC = () => {
  // Mock data
  const veterinarians: Veterinarian[] = [
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
  ];

  const serviceTypes: ServiceType[] = [
    {
      id: '1',
      name: 'Consulta Clínica Geral',
      category: 'consultation',
      duration: 30,
      price: 80.00,
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
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

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

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      animalId: '1',
      animal: animals[0],
      date: new Date('2024-12-10'),
      time: '09:00',
      type: 'consultation',
      veterinarian: 'Dr. Carlos Silva',
      status: 'scheduled',
      notes: 'Consulta de rotina',
      createdAt: new Date(),
    },
    {
      id: '2',
      animalId: '2',
      animal: animals[1],
      date: new Date('2024-12-11'),
      time: '14:30',
      type: 'exam',
      veterinarian: 'Dra. Ana Costa',
      status: 'scheduled',
      notes: 'Exame de sangue',
      createdAt: new Date(),
    },
    {
      id: '3',
      animalId: '1',
      animal: animals[0],
      date: new Date('2024-12-08'),
      time: '10:00',
      type: 'consultation',
      veterinarian: 'Dr. Carlos Silva',
      status: 'completed',
      notes: 'Consulta realizada com sucesso',
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    animalId: '',
    date: '',
    time: '',
    serviceTypeId: '',
    veterinarianId: '',
    notes: '',
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.animal?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return { label: 'Agendado', color: 'default' };
      case 'completed':
        return { label: 'Realizado', color: 'secondary' };
      case 'cancelled':
        return { label: 'Cancelado', color: 'destructive' };
      default:
        return { label: status, color: 'default' };
    }
  };

  const getTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="w-4 h-4 text-blue-600" />;
      case 'exam':
        return <Beaker className="w-4 h-4 text-purple-600" />;
      case 'surgery':
        return <Activity className="w-4 h-4 text-red-600" />;
      case 'grooming':
        return <Scissors className="w-4 h-4 text-green-600" />;
      default:
        return <Stethoscope className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTypeBadge = (type: Appointment['type']) => {
    switch (type) {
      case 'consultation':
        return { label: 'Consulta', color: 'default' };
      case 'exam':
        return { label: 'Exame', color: 'secondary' };
      case 'surgery':
        return { label: 'Cirurgia', color: 'destructive' };
      case 'grooming':
        return { label: 'Banho & Tosa', color: 'outline' };
      default:
        return { label: type, color: 'default' };
    }
  };

  const handleSave = () => {
    const selectedAnimal = animals.find(a => a.id === formData.animalId);
    const selectedVet = veterinarians.find(v => v.id === formData.veterinarianId);
    const selectedService = serviceTypes.find(s => s.id === formData.serviceTypeId);
    
    if (editingAppointment) {
      setAppointments(appointments.map(a => 
        a.id === editingAppointment.id 
          ? { 
              ...editingAppointment, 
              animalId: formData.animalId,
              animal: selectedAnimal,
              date: new Date(formData.date),
              time: formData.time,
              type: selectedService?.category || 'consultation',
              veterinarian: selectedVet?.name || '',
              notes: formData.notes,
            }
          : a
      ));
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        animalId: formData.animalId,
        animal: selectedAnimal,
        date: new Date(formData.date),
        time: formData.time,
        type: selectedService?.category || 'consultation',
        veterinarian: selectedVet?.name || '',
        status: 'scheduled',
        notes: formData.notes,
        createdAt: new Date(),
      };
      setAppointments([...appointments, newAppointment]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAppointment(null);
    setFormData({
      animalId: '',
      date: '',
      time: '',
      serviceTypeId: '',
      veterinarianId: '',
      notes: '',
    });
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      animalId: appointment.animalId,
      date: appointment.date.toISOString().split('T')[0],
      time: appointment.time,
      serviceTypeId: appointment.serviceTypeId,
      veterinarianId: appointment.veterinarianId,
      notes: appointment.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (appointmentId: string) => {
    setAppointments(appointments.filter(a => a.id !== appointmentId));
  };

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(a => 
      a.id === appointmentId ? { ...a, status: newStatus } : a
    ));
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gestão de consultas e exames veterinários</p>
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
                <p className="text-2xl font-bold">
                  {appointments.filter(a => 
                    a.date.toDateString() === new Date().toDateString() && a.status === 'scheduled'
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Agendados</p>
                <p className="text-2xl font-bold">
                  {appointments.filter(a => a.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-600">Realizados</p>
                <p className="text-2xl font-bold">
                  {appointments.filter(a => a.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Cancelados</p>
                <p className="text-2xl font-bold">
                  {appointments.filter(a => a.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Agendamentos</CardTitle>
              <CardDescription>
                {filteredAppointments.length} agendamentos encontrados
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do agendamento
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
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="serviceTypeId">Tipo de Serviço</Label>
                    <Select
                      value={formData.serviceTypeId}
                      onValueChange={(value) => setFormData({...formData, serviceTypeId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.filter(s => s.isActive).map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - R$ {service.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="veterinarianId">Veterinário</Label>
                    <Select
                      value={formData.veterinarianId}
                      onValueChange={(value) => setFormData({...formData, veterinarianId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o veterinário" />
                      </SelectTrigger>
                      <SelectContent>
                        {veterinarians.filter(v => v.status === 'active').map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name} - {vet.crmv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => setFormData({...formData, time: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Observações sobre o agendamento..."
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por animal, veterinário ou tipo..."
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
                <SelectItem value="completed">Realizados</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Veterinário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => {
                  const statusBadge = getStatusBadge(appointment.status);
                  const typeBadge = getTypeBadge(appointment.type);
                  
                  return (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(appointment.type)}
                          <div>
                            <div className="font-medium">{appointment.animal?.name}</div>
                            <div className="text-sm text-gray-500">{appointment.animal?.species}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{appointment.date.toLocaleDateString('pt-BR')}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={typeBadge.color as any}>
                          {typeBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{appointment.veterinarian}</div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={appointment.status}
                          onValueChange={(value) => handleStatusChange(appointment.id, value as Appointment['status'])}
                        >
                          <SelectTrigger className="w-[130px]">
                            <Badge variant={statusBadge.color as any}>
                              {statusBadge.label}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Agendado</SelectItem>
                            <SelectItem value="completed">Realizado</SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(appointment)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(appointment.id)}
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

export default Appointments;
