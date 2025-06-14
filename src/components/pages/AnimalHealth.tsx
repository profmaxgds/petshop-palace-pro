import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { Appointment, Animal, ServiceType, Veterinarian, Room } from '@/types';

interface AppointmentService {
  serviceTypeId: string;
  serviceType: ServiceType;
  price: number;
}

const AnimalHealth: React.FC = () => {
  const { toast } = useToast();

  // Mock data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      animal: {
        id: '1',
        name: 'Rex',
        species: 'dog',
        sex: 'male',
        tutor: {
          id: '1',
          name: 'João Silva',
          phone: '(11) 99999-9999',
          isActive: true,
          createdBy: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        tutorId: '1',
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      animalId: '1',
      appointmentDate: new Date('2024-12-20'),
      appointmentTime: '09:00',
      serviceType: {
        id: '1',
        name: 'Consulta Veterinária',
        category: 'consultation',
        duration: 30,
        price: 80,
        requiresVeterinarian: true,
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      serviceTypeId: '1',
      veterinarian: {
        id: '1',
        name: 'Dr. Carlos Silva',
        crmv: '12345',
        status: 'active',
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      veterinarianId: '1',
      status: 'scheduled',
      totalPrice: 80,
      isActive: true,
      createdBy: '1',
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

  // Mock data for selects
  const animals: Animal[] = [
    {
      id: '1',
      name: 'Rex',
      species: 'dog',
      sex: 'male',
      tutor: {
        id: '1',
        name: 'João Silva',
        phone: '(11) 99999-9999',
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      tutorId: '1',
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const serviceTypes: ServiceType[] = [
    {
      id: '1',
      name: 'Consulta Veterinária',
      category: 'consultation',
      duration: 30,
      price: 80,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const veterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. Carlos Silva',
      crmv: '12345',
      status: 'active',
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const rooms: Room[] = [
    {
      id: '1',
      name: 'Consultório 1',
      type: 'consultation',
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const veterinaryServiceTypes: ServiceType[] = [
    {
      id: '1',
      name: 'Consulta Veterinária',
      category: 'consultation',
      duration: 30,
      price: 80,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Exame de Sangue',
      category: 'exam',
      duration: 15,
      price: 120,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Cirurgia',
      category: 'surgery',
      duration: 120,
      price: 500,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Raio-X',
      category: 'exam',
      duration: 30,
      price: 150,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      name: 'Ultrassom',
      category: 'exam',
      duration: 45,
      price: 200,
      requiresVeterinarian: true,
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const [appointmentServices, setAppointmentServices] = useState<AppointmentService[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.animal.tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const addServiceToAppointment = () => {
    if (!selectedServiceId) return;
    
    const serviceType = veterinaryServiceTypes.find(s => s.id === selectedServiceId);
    if (!serviceType) return;
    
    // Verificar se o serviço já foi adicionado
    if (appointmentServices.some(s => s.serviceTypeId === selectedServiceId)) {
      toast({
        title: "Serviço já adicionado",
        description: "Este serviço já foi adicionado ao agendamento.",
        variant: "destructive",
      });
      return;
    }
    
    const newService: AppointmentService = {
      serviceTypeId: selectedServiceId,
      serviceType,
      price: serviceType.price,
    };
    
    setAppointmentServices([...appointmentServices, newService]);
    setSelectedServiceId('');
  };

  const removeServiceFromAppointment = (serviceTypeId: string) => {
    setAppointmentServices(appointmentServices.filter(s => s.serviceTypeId !== serviceTypeId));
  };

  const getTotalPrice = () => {
    return appointmentServices.reduce((total, service) => total + service.price, 0);
  };

  const handleSaveAppointment = () => {
    if (!appointmentForm.animalId || !appointmentForm.appointmentDate || appointmentServices.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios e adicione pelo menos um serviço.",
        variant: "destructive",
      });
      return;
    }

    const animal = animals.find(a => a.id === appointmentForm.animalId);
    const veterinarian = veterinarians.find(v => v.id === appointmentForm.veterinarianId);
    const room = rooms.find(r => r.id === appointmentForm.roomId);

    if (!animal) return;

    // Para múltiplos serviços, vamos usar o primeiro como principal
    const mainService = appointmentServices[0];

    if (editingAppointment) {
      setAppointments(appointments.map(a => 
        a.id === editingAppointment.id 
          ? {
              ...editingAppointment,
              animal,
              animalId: appointmentForm.animalId,
              appointmentDate: new Date(appointmentForm.appointmentDate),
              appointmentTime: appointmentForm.appointmentTime,
              serviceType: mainService.serviceType,
              serviceTypeId: mainService.serviceTypeId,
              veterinarian,
              veterinarianId: appointmentForm.veterinarianId,
              room,
              roomId: appointmentForm.roomId,
              notes: appointmentForm.notes,
              totalPrice: getTotalPrice(),
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
        animal,
        animalId: appointmentForm.animalId,
        appointmentDate: new Date(appointmentForm.appointmentDate),
        appointmentTime: appointmentForm.appointmentTime,
        serviceType: mainService.serviceType,
        serviceTypeId: mainService.serviceTypeId,
        veterinarian,
        veterinarianId: appointmentForm.veterinarianId,
        room,
        roomId: appointmentForm.roomId,
        status: 'scheduled',
        totalPrice: getTotalPrice(),
        notes: appointmentForm.notes,
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAppointments([...appointments, newAppointment]);
      toast({
        title: "Agendamento criado",
        description: `Agendamento criado com ${appointmentServices.length} serviço(s).`,
      });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingAppointment(null);
    setAppointmentServices([]);
    setSelectedServiceId('');
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
    setAppointmentServices([{
      serviceTypeId: appointment.serviceTypeId,
      serviceType: appointment.serviceType,
      price: appointment.serviceType.price,
    }]);
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
      toast({
        title: "Agendamento excluído",
        description: "O agendamento foi excluído com sucesso.",
      });
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
          <h1 className="text-3xl font-bold text-gray-900">{t('animalHealth')}</h1>
          <p className="text-gray-600">{t('manageAppointments')}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('appointmentsList')}</CardTitle>
              <CardDescription>
                {filteredAppointments.length} {t('appointmentsRegistered')}
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addAppointment')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingAppointment ? t('editAppointment') : t('addAppointment')}
                  </DialogTitle>
                  <DialogDescription>
                    {t('fillAppointmentData')}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="animal">{t('animal')}</Label>
                      <Select
                        value={appointmentForm.animalId}
                        onValueChange={(value) => setAppointmentForm({...appointmentForm, animalId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectAnimal')} />
                        </SelectTrigger>
                        <SelectContent>
                          {animals.map((animal) => (
                            <SelectItem key={animal.id} value={animal.id}>
                              {animal.name} - {animal.tutor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="veterinarian">{t('veterinarian')}</Label>
                      <Select
                        value={appointmentForm.veterinarianId}
                        onValueChange={(value) => setAppointmentForm({...appointmentForm, veterinarianId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectVeterinarian')} />
                        </SelectTrigger>
                        <SelectContent>
                          {veterinarians.map((vet) => (
                            <SelectItem key={vet.id} value={vet.id}>
                              {vet.name} - CRMV {vet.crmv}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="date">{t('date')}</Label>
                      <Input
                        id="date"
                        type="date"
                        value={appointmentForm.appointmentDate}
                        onChange={(e) => setAppointmentForm({...appointmentForm, appointmentDate: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="time">{t('time')}</Label>
                      <Input
                        id="time"
                        type="time"
                        value={appointmentForm.appointmentTime}
                        onChange={(e) => setAppointmentForm({...appointmentForm, appointmentTime: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="room">{t('room')}</Label>
                      <Select
                        value={appointmentForm.roomId}
                        onValueChange={(value) => setAppointmentForm({...appointmentForm, roomId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectRoom')} />
                        </SelectTrigger>
                        <SelectContent>
                          {rooms.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Seção de Serviços */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Serviços</h3>
                    
                    <div className="flex gap-2">
                      <Select
                        value={selectedServiceId}
                        onValueChange={setSelectedServiceId}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Selecionar serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {veterinaryServiceTypes.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - R$ {service.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        type="button"
                        onClick={addServiceToAppointment}
                        disabled={!selectedServiceId}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {appointmentServices.length > 0 && (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">Serviços Selecionados</h4>
                        <div className="space-y-2">
                          {appointmentServices.map((service) => (
                            <div key={service.serviceTypeId} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div>
                                <span className="font-medium">{service.serviceType.name}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                  ({service.serviceType.duration} min)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">R$ {service.price}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeServiceFromAppointment(service.serviceTypeId)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <span className="font-semibold">Total:</span>
                          <span className="font-semibold text-lg">R$ {getTotalPrice()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">{t('observationsNotes')}</Label>
                    <Textarea
                      id="notes"
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                      placeholder={t('observationsNotes')}
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSaveAppointment} className="bg-teal-600 hover:bg-teal-700">
                    {t('save')}
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
                placeholder={t('searchByAnimalOrVeterinarian')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t('allStatuses')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allStatuses')}</SelectItem>
                <SelectItem value="scheduled">{t('scheduled')}</SelectItem>
                <SelectItem value="completed">{t('completed')}</SelectItem>
                <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('animalName')}</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>{t('service')}</TableHead>
                <TableHead>{t('dateTime')}</TableHead>
                <TableHead>{t('veterinarian')}</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
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
                  <TableCell>R$ {appointment.totalPrice || appointment.serviceType.price}</TableCell>
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

export default AnimalHealth;
