import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, Stethoscope, Package, X } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Veterinarian, ServiceType, Appointment, Room, Breed, Tutor, Product, WorkSchedule } from '@/types';
import { Textarea } from '@/components/ui/textarea';

const Appointments: React.FC = () => {
  // Mock data with proper typing
  const defaultSchedule: WorkSchedule = {
    sunday: { active: false, start: '09:00', end: '18:00' },
    monday: { active: true, start: '09:00', end: '18:00' },
    tuesday: { active: true, start: '09:00', end: '18:00' },
    wednesday: { active: true, start: '09:00', end: '18:00' },
    thursday: { active: true, start: '09:00', end: '18:00' },
    friday: { active: true, start: '09:00', end: '18:00' },
    saturday: { active: false, start: '09:00', end: '18:00' },
  };
  const mockVeterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. João Silva',
      crmv: '12345-SP',
      specialties: ['Clínica Geral', 'Cirurgia'],
      schedule: defaultSchedule,
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
      schedule: { ...defaultSchedule, tuesday: { active: false, start: '09:00', end: '18:00' } },
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

  const mockProducts: Product[] = [
    { id: '1', name: 'Ração Premier 1kg', categoryId: 'cat1', quantity: 50, minQuantity: 10, salePrice: 45.00, expirationControl: false, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Antipulgas 5-10kg', categoryId: 'cat2', quantity: 100, minQuantity: 20, salePrice: 60.00, expirationControl: true, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Shampoo Hipoalergênico', categoryId: 'cat3', quantity: 30, minQuantity: 5, salePrice: 35.50, expirationControl: false, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
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
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const initialFormState = {
    animalId: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceTypeId: '',
    veterinarianId: '',
    roomId: '',
    notes: '',
    products: [] as { product: Product, productId: string, quantity: number }[],
  };

  const [appointmentForm, setAppointmentForm] = useState(initialFormState);

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

    // --- Validation Logic ---
    const appointmentDate = new Date(appointmentForm.appointmentDate + 'T00:00:00');
    const appointmentTime = appointmentForm.appointmentTime;
    const dayIndex = appointmentDate.getDay();
    const dayOfWeek = (['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as (keyof WorkSchedule)[])[dayIndex];
    
    // 1. Vet availability check
    if (veterinarian && veterinarian.schedule) {
      const vetSchedule = veterinarian.schedule[dayOfWeek];
      if (!vetSchedule || !vetSchedule.active || appointmentTime < vetSchedule.start || appointmentTime > vetSchedule.end) {
        alert(t('vetUnavailable'));
        return;
      }
    }
    
    // 2. Animal double-booking check
    const animalHasClash = appointments.some(apt =>
        apt.id !== editingAppointment?.id &&
        apt.animalId === appointmentForm.animalId &&
        new Date(apt.appointmentDate).toDateString() === appointmentDate.toDateString() &&
        apt.appointmentTime === appointmentTime &&
        apt.serviceType.category !== 'exam' && serviceType.category !== 'exam'
    );
    if (animalHasClash) {
      alert(t('animalDoubleBooked'));
      return;
    }
    
    // 3. Vet double-booking check
    if (veterinarian) {
      const vetHasClash = appointments.some(apt => 
        apt.id !== editingAppointment?.id &&
        apt.veterinarianId === veterinarian.id &&
        new Date(apt.appointmentDate).toDateString() === appointmentDate.toDateString() &&
        apt.appointmentTime === appointmentTime &&
        apt.serviceType.category !== 'exam' && serviceType.category !== 'exam'
      );
      if (vetHasClash) {
        alert(t('vetDoubleBooked'));
        return;
      }
    }

    // --- Save Logic ---
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
              products: appointmentForm.products,
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
        products: appointmentForm.products,
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
    setAppointmentForm(initialFormState);
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
      products: appointment.products || [],
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

  const handleAddProduct = (product: Product, quantity: number) => {
    if (quantity > 0) {
      setAppointmentForm(prev => ({
        ...prev,
        products: [...prev.products, { product, productId: product.id, quantity }]
      }));
    }
    setIsProductDialogOpen(false);
  };

  const handleRemoveProduct = (productId: string) => {
    setAppointmentForm(prev => ({
      ...prev,
      products: prev.products.filter(p => p.productId !== productId)
    }));
  }

  const filteredProducts = mockProducts.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('clinic')}</h1>
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
                  {t('newAppointment')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingAppointment ? t('editAppointment') : t('newAppointment')}
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
                        {mockAnimals.map((animal) => (
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
                        <SelectValue placeholder={t('selectService')} />
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
                        {mockVeterinarians.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name}
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
                        {mockRooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="notes">{t('notes')}</Label>
                    <Textarea
                      id="notes"
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                      placeholder={t('notes')}
                    />
                  </div>
                  
                  <div className="md:col-span-2 border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <Label className="text-base font-semibold">{t('products')}</Label>
                        <Button variant="outline" size="sm" onClick={() => setIsProductDialogOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            {t('addProduct')}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {appointmentForm.products.map(p => (
                            <div key={p.productId} className="flex items-center justify-between p-2 border rounded-md">
                                <div>
                                    <p className="font-medium">{p.product.name}</p>
                                    <p className="text-sm text-gray-500">R$ {p.salePrice?.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span>{t('quantity')}: {p.quantity}</span>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveProduct(p.productId)}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                            </div>
                        ))}
                         {appointmentForm.products.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-2">{t('noProductsAdded')}</p>
                         )}
                    </div>
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

            {/* Product Selection Dialog */}
            <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('selectProduct')}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input placeholder={t('searchProduct')} value={productSearch} onChange={e => setProductSearch(e.target.value)} />
                        <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
                            {filteredProducts.map(p => {
                                let tempQuantity = 1;
                                return (
                                <div key={p.id} className="flex items-center justify-between p-2 border rounded-md">
                                    <div>
                                        <p className="font-medium">{p.name}</p>
                                        <p className="text-sm text-gray-500">R$ {p.salePrice?.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" min="1" defaultValue="1" className="w-20" onChange={e => tempQuantity = parseInt(e.target.value) || 1} />
                                        <Button size="sm" onClick={() => handleAddProduct(p, tempQuantity)}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t('searchByAnimalOrVet')}
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
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('animal')}</TableHead>
                  <TableHead>{t('service')}</TableHead>
                  <TableHead>{t('dateTime')}</TableHead>
                  <TableHead>{t('veterinarian')}</TableHead>
                  <TableHead>{t('products')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="font-medium">{appointment.animal.name}</div>
                      <div className="text-sm text-gray-500">{appointment.animal.tutor.name}</div>
                    </TableCell>
                    <TableCell>{appointment.serviceType.name}</TableCell>
                    <TableCell>
                      {appointment.appointmentDate.toLocaleDateString('pt-BR')} às {appointment.appointmentTime}
                    </TableCell>
                    <TableCell>{appointment.veterinarian?.name || '-'}</TableCell>
                    <TableCell>
                      {appointment.products && appointment.products.length > 0 ? (
                        <Badge variant="outline">
                          <Package className="w-3 h-3 mr-1" />
                          {appointment.products.length}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAppointment(appointment.id)}
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

export default Appointments;
