
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
import { Calendar, Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { Appointment, Animal, ServiceType, Veterinarian, Room } from '@/types';

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
      veterinariId: '1',
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

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.animal.tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSaveAppointment = () => {
    if (!appointmentForm.animalId || !appointmentForm.appointmentDate || !appointmentForm.serviceTypeId) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const animal = animals.find(a => a.id === appointmentForm.animalId);
    const serviceType = serviceTypes.find(s => s.id === appointmentForm.serviceTypeId);
    const veterinarian = veterinarians.find(v => v.id === appointmentForm.veterinarianId);
    const room = rooms.find(r => r.id === appointmentForm.roomId);

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
              veterinariId: appointmentForm.veterinarianId,
              room,
              roomId: appointmentForm.roomId,
              notes: appointmentForm.notes,
              totalPrice: serviceType.price,
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
        serviceType,
        serviceTypeId: appointmentForm.serviceTypeId,
        veterinarian,
        veterinariId: appointmentForm.veterinarianId,
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
      veterinarianId: appointment.veterinariId || '',
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingAppointment ? t('editAppointment') : t('addAppointment')}
                  </DialogTitle>
                  <DialogDescription>
                    {t('fillAppointmentData')}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
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
                    <Label htmlFor="serviceType">{t('serviceType')}</Label>
                    <Select
                      value={appointmentForm.serviceTypeId}
                      onValueChange={(value) => setAppointmentForm({...appointmentForm, serviceTypeId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectServiceType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - R$ {service.price}
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
                  
                  <div className="md:col-span-2">
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
                <SelectItem value="">{t('allStatuses')}</SelectItem>
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
