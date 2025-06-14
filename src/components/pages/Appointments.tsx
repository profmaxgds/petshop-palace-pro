
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Edit, Trash2, Search, Clock, Stethoscope } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Veterinarian, ServiceType, Appointment, Room, Breed, Tutor } from '@/types';

const Appointments: React.FC = () => {
  // Mock data with proper typing
  const mockVeterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. João Silva',
      crmv: '12345-SP',
      specialties: ['Clínica Geral', 'Cirurgia'],
      phone: '(11) 99999-9999',
      email: 'joao@veterinaria.com',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Dra. Maria Santos',
      crmv: '67890-SP',
      specialties: ['Dermatologia', 'Oftalmologia'],
      phone: '(11) 88888-8888',
      email: 'maria@veterinaria.com',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockServiceTypes: ServiceType[] = [
    {
      id: '1',
      name: 'Consulta Geral',
      category: 'consultation',
      duration: 30,
      price: 100.00,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Exame de Sangue',
      category: 'exam',
      duration: 15,
      price: 80.00,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Banho e Tosa',
      category: 'grooming',
      duration: 60,
      price: 50.00,
      requiresVeterinarian: false,
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Cirurgia',
      category: 'surgery',
      duration: 120,
      price: 800.00,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockBreeds: Breed[] = [
    {
      id: '1',
      name: 'Golden Retriever',
      species: 'dog',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Persa',
      species: 'cat',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const mockTutors: Tutor[] = [
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
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockAnimals: Animal[] = [
    {
      id: '1',
      name: 'Rex',
      species: 'dog',
      breedId: '1',
      breed: mockBreeds[0],
      age: 3,
      sex: 'male',
      weight: 32.5,
      tutorId: '1',
      tutor: mockTutors[0],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Luna',
      species: 'cat',
      breedId: '2',
      breed: mockBreeds[1],
      age: 2,
      sex: 'female',
      weight: 4.2,
      tutorId: '1',
      tutor: mockTutors[0],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockRooms: Room[] = [
    {
      id: '1',
      name: 'Sala 1',
      type: 'consultation',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Sala 2',
      type: 'surgery',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      animalId: '1',
      animal: mockAnimals[0],
      appointmentDate: new Date('2024-12-15'),
      appointmentTime: '09:00',
      serviceTypeId: '1',
      serviceType: mockServiceTypes[0],
      veterinarianId: '1',
      veterinarian: mockVeterinarians[0],
      roomId: '1',
      room: mockRooms[0],
      status: 'scheduled',
      notes: 'Consulta de rotina',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      animalId: '2',
      animal: mockAnimals[1],
      appointmentDate: new Date('2024-12-16'),
      appointmentTime: '14:30',
      serviceTypeId: '2',
      serviceType: mockServiceTypes[1],
      veterinarianId: '2',
      veterinarian: mockVeterinarians[1],
      roomId: '2',
      room: mockRooms[1],
      status: 'confirmed',
      notes: 'Exame de rotina',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const [appointmentForm, setAppointmentForm] = useState({
    animalId: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceTypeId: '',
    veterinarianId: '',
    roomId: '',
    notes: '',
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.animal.tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSaveAppointment = () => {
    if (!appointmentForm.animalId || !appointmentForm.appointmentDate || !appointmentForm.serviceTypeId) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const animal = mockAnimals.find(a => a.id === appointmentForm.animalId);
    const serviceType = mockServiceTypes.find(s => s.id === appointmentForm.serviceTypeId);
    const veterinarian = mockVeterinarians.find(v => v.id === appointmentForm.veterinarianId);
    const room = mockRooms.find(r => r.id === appointmentForm.roomId);

    if (!animal || !serviceType) return;

    if (editingAppointment) {
      setAppointments(appointments.map(a => 
        a.id === editingAppointment.id 
          ? {
              ...editingAppointment,
              animal,
              animalId: appointmentForm.animalId,
              appointmentDate: new Date(appointmentForm.appointmentDate),
              appointmentTime: appointmentForm.appointmentTime,
              serviceType,
              serviceTypeId: appointmentForm.serviceTypeId,
              veterinarian,
              veterinarianId: appointmentForm.veterinarianId,
              room,
              roomId: appointmentForm.roomId,
              notes: appointmentForm.notes,
              totalPrice: serviceType.price,
              updatedAt: new Date(),
            }
          : a
      ));
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        animal,
        animalId: appointmentForm.animalId,
        appointmentDate: new Date(appointmentForm.appointmentDate),
        appointmentTime: appointmentForm.appointmentTime,
        serviceType,
        serviceTypeId: appointmentForm.serviceTypeId,
        veterinarian,
        veterinarianId: appointmentForm.veterinarianId,
        room,
        roomId: appointmentForm.roomId,
        status: 'scheduled',
        totalPrice: serviceType.price,
        notes: appointmentForm.notes,
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAppointments([...appointments, newAppointment]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingAppointment(null);
    setAppointmentForm({
      animalId: '',
      appointmentDate: '',
      appointmentTime: '',
      serviceTypeId: '',
      veterinarianId: '',
      roomId: '',
      notes: '',
    });
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setAppointmentForm({
      animalId: appointment.animalId,
      appointmentDate: appointment.appointmentDate.toISOString().split('T')[0],
      appointmentTime: appointment.appointmentTime,
      serviceTypeId: appointment.serviceTypeId,
      veterinarianId: appointment.veterinarianId || '',
      roomId: appointment.roomId || '',
      notes: appointment.notes || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAppointments(appointments.filter(a => a.id !== appointmentId));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      'scheduled': { label: 'Agendado', variant: 'secondary' },
      'confirmed': { label: 'Confirmado', variant: 'default' },
      'in_progress': { label: 'Em Andamento', variant: 'default' },
      'completed': { label: 'Concluído', variant: 'default' },
      'cancelled': { label: 'Cancelado', variant: 'destructive' },
      'no_show': { label: 'Não Compareceu', variant: 'outline' },
    };
    
    const statusInfo = statusMap[status] || { label: status, variant: 'outline' };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saúde Animal</h1>
          <p className="text-gray-600">Gerencie os agendamentos de saúde dos animais</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Agendamentos</CardTitle>
              <CardDescription>
                {filteredAppointments.length} agendamentos registrados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
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
                  <div>
                    <Label htmlFor="animal">Animal</Label>
                    <Select
                      value={appointmentForm.animalId}
                      onValueChange={(value) => setAppointmentForm({...appointmentForm, animalId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar Animal" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAnimals.map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} - {animal.tutor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="serviceType">Tipo de Serviço</Label>
                    <Select
                      value={appointmentForm.serviceTypeId}
                      onValueChange={(value) => setAppointmentForm({...appointmentForm, serviceTypeId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar Serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockServiceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - R$ {service.price}
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
                      value={appointmentForm.appointmentDate}
                      onChange={(e) => setAppointmentForm({...appointmentForm, appointmentDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={appointmentForm.appointmentTime}
                      onChange={(e) => setAppointmentForm({...appointmentForm, appointmentTime: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="veterinarian">Veterinário</Label>
                    <Select
                      value={appointmentForm.veterinarianId}
                      onValueChange={(value) => setAppointmentForm({...appointmentForm, veterinarianId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar Veterinário" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVeterinarians.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name} - CRMV {vet.crmv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="room">Sala</Label>
                    <Select
                      value={appointmentForm.roomId}
                      onValueChange={(value) => setAppointmentForm({...appointmentForm, roomId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar Sala" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockRooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Input
                      id="notes"
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                      placeholder="Observações sobre o agendamento"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveAppointment} className="bg-teal-600 hover:bg-teal-700">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por animal ou veterinário"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todos os Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os Status</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Animal</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Veterinário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.animal.name}</TableCell>
                  <TableCell>{appointment.animal.tutor.name}</TableCell>
                  <TableCell>{appointment.serviceType.name}</TableCell>
                  <TableCell>
                    {appointment.appointmentDate.toLocaleDateString('pt-BR')} às {appointment.appointmentTime}
                  </TableCell>
                  <TableCell>{appointment.veterinarian?.name || '-'}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
