import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, Stethoscope, Package, X, Play } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Veterinarian, ServiceType, Appointment, Room, Breed, Tutor, Product, WorkSchedule, ClinicSettings as ClinicSettingsType } from '@/types';
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
      appointmentDate: new Date('2024-12-15T00:00:00'),
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
      appointmentDate: new Date('2024-12-16T00:00:00'),
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
  const [isExecuteDialogOpen, setIsExecuteDialogOpen] = useState(false);
  const [executingAppointment, setExecutingAppointment] = useState<Appointment | null>(null);
  const [productDialogContext, setProductDialogContext] = useState<'form' | 'execution'>('form');

  const [clinicSettings, setClinicSettings] = useState<Partial<ClinicSettingsType>>({
    preventAnimalDoubleBooking: true,
    preventVetDoubleBooking: true,
    preventBookingOutsideWorkHours: true,
    allowDoubleBookingForExamServices: true,
  });

  useEffect(() => {
    const CLINIC_SETTINGS_KEY = 'clinicSettings';
    try {
      const savedSettings = localStorage.getItem(CLINIC_SETTINGS_KEY);
      if (savedSettings) {
        setClinicSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Failed to load clinic settings from localStorage", error);
    }
  }, []);

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

  const formatDate = (date: Date): string => {
    // Garante que a data seja formatada de forma consistente com base no horário local, evitando problemas de fuso horário.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const handleSaveAppointment = () => {
    // --- Validation Logic ---
    const { animalId, appointmentDate: dateString, appointmentTime, serviceTypeId, veterinarianId, notes, products } = appointmentForm;

    if (!animalId || !dateString || !appointmentTime || !serviceTypeId) {
      alert(t('fillRequiredFields'));
      return;
    }

    const serviceType = mockServiceTypes.find(s => s.id === serviceTypeId);
    if (!serviceType) {
        console.error("Invalid service type selected.");
        return;
    }
    
    if (serviceType.requiresVeterinarian && !veterinarianId) {
        alert(t('vetRequired'));
        return;
    }
    
    const veterinarian = veterinarianId ? mockVeterinarians.find(v => v.id === veterinarianId) : undefined;
    const appointmentDate = new Date(dateString + 'T00:00:00');
    const dayIndex = appointmentDate.getDay();
    const dayOfWeek = (['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as (keyof WorkSchedule)[])[dayIndex];

    // 1. Vet availability check
    if (clinicSettings.preventBookingOutsideWorkHours && veterinarian && veterinarian.schedule) {
        const vetSchedule = veterinarian.schedule[dayOfWeek];
        if (!vetSchedule || !vetSchedule.active || appointmentTime < vetSchedule.start || appointmentTime > vetSchedule.end) {
            alert(t('vetUnavailable'));
            return;
        }
    }
    
    const performClashCheck = !(serviceType.category === 'exam' && clinicSettings.allowDoubleBookingForExamServices);

    if (performClashCheck) {
        // 2. Animal double-booking check
        if (clinicSettings.preventAnimalDoubleBooking) {
            const animalHasClash = appointments.some(apt =>
                apt.id !== editingAppointment?.id &&
                apt.animalId === animalId &&
                new Date(apt.appointmentDate).toDateString() === appointmentDate.toDateString() &&
                apt.appointmentTime === appointmentTime
            );
            if (animalHasClash) {
                alert(t('animalDoubleBooked'));
                return;
            }
        }

        // 3. Vet double-booking check
        if (clinicSettings.preventVetDoubleBooking && veterinarian) {
            const vetHasClash = appointments.some(apt => 
                apt.id !== editingAppointment?.id &&
                apt.veterinarianId === veterinarian.id &&
                new Date(apt.appointmentDate).toDateString() === appointmentDate.toDateString() &&
                apt.appointmentTime === appointmentTime
            );
            if (vetHasClash) {
                alert(t('vetDoubleBooked'));
                return;
            }
        }
    }

    // --- Save Logic ---
    const animal = mockAnimals.find(a => a.id === appointmentForm.animalId);
    const room = mockRooms.find(r => r.id === appointmentForm.roomId);

    if (!animal) {
        console.error("Invalid animal selected.");
        return;
    }

    if (editingAppointment) {
      setAppointments(appointments.map(a =>
        a.id === editingAppointment.id
          ? {
              ...editingAppointment,
              animal,
              animalId: appointmentForm.animalId,
              appointmentDate,
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
        appointmentDate,
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

    // Correctly format the date to YYYY-MM-DD to avoid timezone issues
    const date = appointment.appointmentDate;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    setAppointmentForm({
      animalId: appointment.animalId,
      appointmentDate: formattedDate,
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
    if (window.confirm(t('confirmAppointmentDelete'))) {
      setAppointments(appointments.filter(a => a.id !== appointmentId));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { labelKey: string; variant: any }> = {
      'scheduled': { labelKey: 'scheduled', variant: 'secondary' },
      'confirmed': { labelKey: 'confirmed', variant: 'default' },
      'in_progress': { labelKey: 'inProgress', variant: 'default' },
      'completed': { labelKey: 'completed', variant: 'default' },
      'cancelled': { labelKey: 'cancelled', variant: 'destructive' },
      'no_show': { labelKey: 'noShow', variant: 'outline' },
    };
    
    const statusInfo = statusMap[status] || { labelKey: status, variant: 'outline' };
    return <Badge variant={statusInfo.variant}>{t(statusInfo.labelKey)}</Badge>;
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

  const handleOpenExecuteDialog = (appointment: Appointment) => {
    setExecutingAppointment({ ...appointment });
    setIsExecuteDialogOpen(true);
  };

  const handleStartService = () => {
    if (!executingAppointment) return;
    
    setAppointments(appointments.map(apt => 
        apt.id === executingAppointment.id
        ? { ...executingAppointment, status: 'in_progress', updatedAt: new Date() }
        : apt
    ));

    setIsExecuteDialogOpen(false);
    setExecutingAppointment(null);
  };

  const openProductDialog = (context: 'form' | 'execution') => {
    setProductDialogContext(context);
    setIsProductDialogOpen(true);
  };

  const handleSelectProduct = (product: Product, quantity: number) => {
    if (quantity <= 0) return;

    if (productDialogContext === 'execution' && executingAppointment) {
      setExecutingAppointment(prev => {
        if (!prev) return null;
        const existingProducts = prev.products || [];
        const newProduct = { product, productId: product.id, quantity };
        return { ...prev, products: [...existingProducts, newProduct] };
      });
    } else {
      setAppointmentForm(prev => ({
        ...prev,
        products: [...prev.products, { product, productId: product.id, quantity }]
      }));
    }
    setIsProductDialogOpen(false);
  };

  const handleRemoveProductFromExecution = (productId: string) => {
    if (!executingAppointment) return;
    setExecutingAppointment(prev => {
        if (!prev) return null;
        return {
            ...prev,
            products: prev.products?.filter(p => p.productId !== productId) || []
        }
    });
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
                        <Button variant="outline" size="sm" onClick={() => openProductDialog('form')}>
                            <Plus className="w-4 h-4 mr-2" />
                            {t('addProduct')}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {appointmentForm.products.map(p => (
                            <div key={p.productId} className="flex items-center justify-between p-2 border rounded-md">
                                <div>
                                    <p className="font-medium">{p.product.name}</p>
                                    <p className="text-sm text-gray-500">R$ {p.product.salePrice?.toFixed(2)}</p>
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

            {/* Execute Appointment Dialog */}
            <Dialog open={isExecuteDialogOpen} onOpenChange={setIsExecuteDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t('executeAppointment')}</DialogTitle>
                  <DialogDescription>
                    {t('confirmAppointmentAndAddProducts')}
                  </DialogDescription>
                </DialogHeader>
                {executingAppointment && (
                  <div className="py-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm p-4 border rounded-lg bg-gray-50">
                      <div><strong className="block text-gray-500">{t('animal')}:</strong> {executingAppointment.animal.name}</div>
                      <div><strong className="block text-gray-500">{t('tutor')}:</strong> {executingAppointment.animal.tutor.name}</div>
                      <div><strong className="block text-gray-500">{t('service')}:</strong> {executingAppointment.serviceType.name}</div>
                      <div><strong className="block text-gray-500">{t('dateTime')}:</strong> {formatDate(executingAppointment.appointmentDate)} às {executingAppointment.appointmentTime}</div>
                      <div className="col-span-2"><strong className="block text-gray-500">{t('veterinarian')}:</strong> {executingAppointment.veterinarian?.name || 'N/A'}</div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-base font-semibold">{t('products')}</Label>
                        <Button variant="outline" size="sm" onClick={() => openProductDialog('execution')}>
                          <Plus className="w-4 h-4 mr-2" />
                          {t('addProduct')}
                        </Button>
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto p-1">
                        {executingAppointment.products && executingAppointment.products.map(p => (
                          <div key={p.productId} className="flex items-center justify-between p-2 border rounded-md">
                            <div>
                              <p className="font-medium">{p.product.name}</p>
                              <p className="text-sm text-gray-500">R$ {p.product.salePrice?.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span>{t('quantity')}: {p.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveProductFromExecution(p.productId)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {(!executingAppointment.products || executingAppointment.products.length === 0) && (
                          <p className="text-sm text-gray-500 text-center py-2">{t('noProductsAdded')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsExecuteDialogOpen(false)}>{t('cancel')}</Button>
                  <Button onClick={handleStartService} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    {t('startAppointment')}
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
                            <Button size="sm" onClick={() => handleSelectProduct(p, tempQuantity)}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
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
                      {formatDate(appointment.appointmentDate)} às {appointment.appointmentTime}
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
                      <div className="flex items-center justify-end space-x-1">
                        {['scheduled', 'confirmed'].includes(appointment.status) && (
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenExecuteDialog(appointment)}
                              className="text-green-600 hover:text-green-800 h-8 w-8"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditAppointment(appointment)}
                          className="h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-800 h-8 w-8"
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
