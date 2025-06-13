
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Calendar, Activity, Clock, MapPin } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import type { Animal, Appointment, Veterinarian, ServiceType, Room, Breed, Tutor } from '@/types';

const AnimalHealth: React.FC = () => {
  const { toast } = useToast();

  // Mock data
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
      price: 80.00,
      description: 'Consulta veterinária geral',
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
      price: 120.00,
      description: 'Exame laboratorial de sangue',
      requiresVeterinarian: true,
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockRooms: Room[] = [
    {
      id: '1',
      name: 'Consultório 1',
      type: 'consultation',
      capacity: 3,
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Sala de Cirurgia',
      type: 'surgery',
      capacity: 5,
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

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      animalId: '1',
      animal: mockAnimals[0],
      appointmentDate: new Date('2024-12-20'),
      appointmentTime: '09:00',
      serviceTypeId: '1',
      serviceType: mockServiceTypes[0],
      veterinarianId: '1',
      veterinarian: mockVeterinarians[0],
      roomId: '1',
      room: mockRooms[0],
      status: 'scheduled',
      totalPrice: 80.00,
      notes: 'Consulta de rotina',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      animalId: '2',
      animal: mockAnimals[1],
      appointmentDate: new Date('2024-12-21'),
      appointmentTime: '14:30',
      serviceTypeId: '2',
      serviceType: mockServiceTypes[1],
      veterinarianId: '2',
      veterinarian: mockVeterinarians[1],
      roomId: '1',
      room: mockRooms[0],
      status: 'confirmed',
      totalPrice: 120.00,
      notes: 'Exame de sangue para check-up',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    animalId: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceTypeId: '',
    veterinarianId: '',
    roomId: '',
    notes: '',
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.animal?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.serviceType?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.veterinarian?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (!formData.animalId || !formData.appointmentDate || !formData.appointmentTime || !formData.serviceTypeId) {
      return;
    }

    const selectedAnimal = mockAnimals.find(a => a.id === formData.animalId);
    const selectedServiceType = mockServiceTypes.find(s => s.id === formData.serviceTypeId);
    const selectedVeterinarian = mockVeterinarians.find(v => v.id === formData.veterinarianId);
    const selectedRoom = mockRooms.find(r => r.id === formData.roomId);

    if (editingAppointment) {
      setAppointments(appointments.map(a => 
        a.id === editingAppointment.id 
          ? { 
              ...editingAppointment, 
              ...formData,
              animal: selectedAnimal,
              serviceType: selectedServiceType,
              veterinarian: selectedVeterinarian,
              room: selectedRoom,
              appointmentDate: new Date(formData.appointmentDate),
              totalPrice: selectedServiceType?.price,
              updatedAt: new Date(),
            }
          : a
      ));
      toast({
        title: "Agendamento atualizado",
        description: "O agendamento foi atualizado com sucesso.",
      });
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...formData,
        animal: selectedAnimal,
        serviceType: selectedServiceType,
        veterinarian: selectedVeterinarian,
        room: selectedRoom,
        appointmentDate: new Date(formData.appointmentDate),
        status: 'scheduled',
        totalPrice: selectedServiceType?.price,
        createdBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAppointments([...appointments, newAppointment]);
      toast({
        title: "Agendamento criado",
        description: "O agendamento foi criado com sucesso.",
      });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingAppointment(null);
    setFormData({
      animalId: '',
      appointmentDate: '',
      appointmentTime: '',
      serviceTypeId: '',
      veterinarianId: '',
      roomId: '',
      notes: '',
    });
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
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

  const handleDelete = (appointmentId: string) => {
    setAppointments(appointments.filter(a => a.id !== appointmentId));
    toast({
      title: "Agendamento excluído",
      description: "O agendamento foi excluído com sucesso.",
    });
  };

  const handleUpdateStatus = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(a => 
      a.id === appointmentId 
        ? { ...a, status: newStatus, updatedAt: new Date() }
        : a
    ));
    toast({
      title: "Status atualizado",
      description: "O status do agendamento foi atualizado.",
    });
  };

  const getStatusBadge = (status: Appointment['status']) => {
    const statusMap = {
      scheduled: { label: 'Agendado', variant: 'secondary' as const },
      confirmed: { label: 'Confirmado', variant: 'default' as const },
      in_progress: { label: 'Em Andamento', variant: 'destructive' as const },
      completed: { label: 'Concluído', variant: 'outline' as const },
      cancelled: { label: 'Cancelado', variant: 'destructive' as const },
      no_show: { label: 'Não Compareceu', variant: 'destructive' as const },
    };
    
    const config = statusMap[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saúde Animal</h1>
          <p className="text-gray-600">Gerencie consultas e procedimentos veterinários</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agendamentos</CardTitle>
              <CardDescription>
                {filteredAppointments.length} agendamentos encontrados
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
                    <Label htmlFor="animalId">Animal</Label>
                    <Select
                      value={formData.animalId}
                      onValueChange={(value) => setFormData({...formData, animalId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o animal" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAnimals.map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} - {animal.tutor?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="serviceTypeId">Tipo de Serviço</Label>
                    <Select
                      value={formData.serviceTypeId}
                      onValueChange={(value) => setFormData({...formData, serviceTypeId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockServiceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - R$ {service.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="appointmentDate">Data</Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="appointmentTime">Horário</Label>
                    <Input
                      id="appointmentTime"
                      type="time"
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="veterinarianId">Veterinário</Label>
                    <Select
                      value={formData.veterinarianId}
                      onValueChange={(value) => setFormData({...formData, veterinarianId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o veterinário" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVeterinarians.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="roomId">Sala</Label>
                    <Select
                      value={formData.roomId}
                      onValueChange={(value) => setFormData({...formData, roomId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a sala" />
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
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Observações sobre o agendamento"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
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
                placeholder="Buscar por animal, serviço ou veterinário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
                <SelectItem value="no_show">Não Compareceu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Veterinário</TableHead>
                  <TableHead>Sala</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{appointment.animal?.name}</div>
                        <div className="text-sm text-gray-500">{appointment.animal?.tutor?.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        {appointment.serviceType?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div>{appointment.appointmentDate.toLocaleDateString('pt-BR')}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.appointmentTime}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{appointment.veterinarian?.name || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {appointment.room?.name || '-'}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>R$ {appointment.totalPrice?.toFixed(2) || '0,00'}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimalHealth;
