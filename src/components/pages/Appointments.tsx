import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, Package, Play } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Veterinarian, ServiceType, Appointment, Room, Breed, Tutor, Product, WorkSchedule, ClinicSettings as ClinicSettingsType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import AppointmentForm from './appointments/AppointmentForm';
import ExecuteAppointmentDialog from './appointments/ExecuteAppointmentDialog';

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
      appointmentDate: new Date(2024, 11, 15), // Mês é 0-indexado (11 = Dezembro)
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
      appointmentDate: new Date(2024, 11, 18), // Mês é 0-indexado (11 = Dezembro)
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
  const { toast } = useToast();

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
    products: [] as { product: Product; productId: string; quantity: number }[],
  };

  const [appointmentForm, setAppointmentForm] = useState(initialFormState);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.animal.tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // CORREÇÃO: Usar métodos de data locais (getFullYear, getMonth, getDate) para consistência
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDateFromInput = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    // Adiciona o horário local para evitar problemas de fuso horário
    const localDate = new Date(year, month - 1, day);
    return localDate;
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
    
    const appointmentDate = parseDateFromInput(appointmentForm.appointmentDate);
    
    const dayIndex = appointmentDate.getUTCDay();
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
                apt.appointmentDate.getTime() === appointmentDate.getTime() &&
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
                apt.appointmentDate.getTime() === appointmentDate.getTime() &&
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
    
    setAppointmentForm({
      animalId: appointment.animalId,
      appointmentDate: formatDateForInput(appointment.appointmentDate),
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

  const handleStartService = (appointment: Appointment) => {
    // Atualizar status para em andamento
    setAppointments(appointments.map(apt => 
      apt.id === appointment.id
        ? { ...appointment, status: 'in_progress', updatedAt: new Date() }
        : apt
    ));
  };

  const handleUpdateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(apt => 
      apt.id === updatedAppointment.id ? updatedAppointment : apt
    ));
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
                
                <AppointmentForm
                  appointmentForm={appointmentForm}
                  setAppointmentForm={setAppointmentForm}
                  animals={mockAnimals}
                  serviceTypes={mockServiceTypes}
                  veterinarians={mockVeterinarians}
                  rooms={mockRooms}
                  onAddProduct={() => openProductDialog('form')}
                  onRemoveProduct={handleRemoveProduct}
                />
                
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

            <ExecuteAppointmentDialog
              open={isExecuteDialogOpen}
              onOpenChange={setIsExecuteDialogOpen}
              appointment={executingAppointment}
              onStartService={handleStartService}
              onAddProduct={() => openProductDialog('execution')}
              onRemoveProduct={handleRemoveProductFromExecution}
              onUpdateAppointment={handleUpdateAppointment}
            />

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
