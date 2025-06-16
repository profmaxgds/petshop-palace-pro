import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, X, Receipt, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { Appointment, Animal, ServiceType, Veterinarian, Room, Product } from '@/types';
import { SaleItem } from '@/types/sales';

interface AppointmentService {
  serviceTypeId: string;
  serviceType: ServiceType;
  price: number;
}

interface AnimalHealthProps {
  onNavigate: (page: string, state?: any) => void;
  veterinarians: Veterinarian[];
}

const AnimalHealth: React.FC<AnimalHealthProps> = ({ onNavigate, veterinarians }) => {
  const { toast } = useToast();

  // --- DADOS MOCKADOS (do seu arquivo original) ---
  const mockAnimals: Animal[] = [
    { id: '1', name: 'Rex', species: 'dog', sex: 'male', tutor: { id: '1', name: 'João Silva', phone: '(11) 99999-9999', isActive: true, createdBy: '1', createdAt: new Date(), updatedAt: new Date() }, tutorId: '1', isActive: true, createdBy: '1', createdAt: new Date(), updatedAt: new Date() }
  ];

  const mockServiceTypes: ServiceType[] = [
    { id: '1', name: 'Consulta Veterinária', category: 'consultation', duration: 30, price: 80, requiresVeterinarian: true, isActive: true, createdBy: '1', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Exame de Sangue', category: 'exam', duration: 15, price: 120, requiresVeterinarian: true, isActive: true, createdBy: '1', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Aplicação de Vacina', category: 'vaccine', duration: 10, price: 50, requiresVeterinarian: true, isActive: true, createdBy: '1', createdAt: new Date(), updatedAt: new Date() },
  ];
  
  const mockRooms: Room[] = [
    { id: '1', name: 'Consultório 1', type: 'consultation', capacity: 4, equipment: ['Mesa de exame', 'Estetoscópio', 'Balança'], isActive: true, createdBy: '1', createdAt: new Date(), updatedAt: new Date() }
  ];

  const mockProducts: Product[] = [
    { id: '1', name: 'Ração Premier 1kg', categoryId: 'cat1', quantity: 50, minQuantity: 10, salePrice: 45.00, expirationControl: false, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Antipulgas 5-10kg', categoryId: 'cat2', quantity: 100, minQuantity: 20, salePrice: 60.00, expirationControl: true, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
  ];

  // --- STATES ---
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', animal: mockAnimals[0], animalId: '1', appointmentDate: new Date(2024, 11, 20), appointmentTime: '09:00', serviceType: mockServiceTypes[0], serviceTypeId: '1', veterinarian: veterinarians[0], veterinarianId: '1', status: 'scheduled', totalPrice: 80, isActive: true, createdBy: '1', createdAt: new Date(), updatedAt: new Date(), products: [] }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [dialogAction, setDialogAction] = useState<'edit' | 'complete' | 'cancel' | null>(null);

  const initialFormState = {
    animalId: '',
    appointmentDate: '',
    appointmentTime: '',
    veterinarianId: '',
    roomId: '',
    notes: '',
    services: [] as AppointmentService[],
    products: [] as { product: Product; productId: string; quantity: number }[],
  };
  const [appointmentForm, setAppointmentForm] = useState(initialFormState);
  
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // --- FUNÇÕES ---
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.animal.tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    return new Date(year, month - 1, day);
  };

  const addServiceToAppointment = () => {
    if (!selectedServiceId) return;
    const serviceType = mockServiceTypes.find(s => s.id === selectedServiceId);
    if (!serviceType || appointmentForm.services.some(s => s.serviceTypeId === selectedServiceId)) return;
    setAppointmentForm(f => ({ ...f, services: [...f.services, { serviceTypeId, serviceType, price: serviceType.price }] }));
    setSelectedServiceId('');
  };

  const removeServiceFromAppointment = (serviceTypeId: string) => {
    setAppointmentForm(f => ({ ...f, services: f.services.filter(s => s.serviceTypeId !== serviceTypeId) }));
  };
  
  const handleSelectProduct = (product: Product, quantity: number) => {
    if (quantity > 0 && !appointmentForm.products.some(p => p.productId === product.id)) {
      setAppointmentForm(prev => ({ ...prev, products: [...prev.products, { product, productId: product.id, quantity }] }));
    }
    setIsProductDialogOpen(false);
  };

  const handleRemoveProduct = (productId: string) => {
    setAppointmentForm(prev => ({ ...prev, products: prev.products.filter(p => p.productId !== productId) }));
  };

  const calculateTotalPrice = () => {
    const servicesTotal = appointmentForm.services.reduce((total, service) => total + service.price, 0);
    const productsTotal = appointmentForm.products.reduce((sum, p) => sum + (p.product.salePrice || 0) * p.quantity, 0);
    return servicesTotal + productsTotal;
  };

  const handleOpenDialog = (appointment: Appointment | null, action: 'edit' | 'complete' | 'cancel' | 'new') => {
    if (action === 'new') {
        setEditingAppointment(null);
        setAppointmentForm(initialFormState);
    } else if (appointment) {
        setEditingAppointment(appointment);
        setAppointmentForm({
            animalId: appointment.animalId,
            appointmentDate: formatDateForInput(appointment.appointmentDate),
            appointmentTime: appointment.appointmentTime,
            veterinarianId: appointment.veterinarianId || '',
            roomId: appointment.roomId || '',
            notes: appointment.notes || '',
            // No modo de edição, começamos com o serviço principal. Serviços adicionais podem ser incluídos.
            services: [{ serviceTypeId: appointment.serviceTypeId, serviceType: appointment.serviceType, price: appointment.serviceType.price }],
            products: appointment.products || [],
        });
    }
    setDialogAction(action);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAppointment(null);
    setDialogAction(null);
    setAppointmentForm(initialFormState);
  };

  const handleFinalizeAction = () => {
    if (!appointmentForm.animalId || !appointmentForm.appointmentDate || appointmentForm.services.length === 0) {
      toast({ title: t('error'), description: t('fillRequiredFields'), variant: "destructive" });
      return;
    }

    const animal = mockAnimals.find(a => a.id === appointmentForm.animalId);
    const veterinarianData = veterinarians.find(v => v.id === appointmentForm.veterinarianId);
    const room = mockRooms.find(r => r.id === appointmentForm.roomId);
    
    if (!animal) return;

    const mainService = appointmentForm.services[0];
    const finalTotalPrice = calculateTotalPrice();
    
    const baseAppointmentData = {
        animal,
        animalId: appointmentForm.animalId,
        appointmentDate: parseDateFromInput(appointmentForm.appointmentDate),
        appointmentTime: appointmentForm.appointmentTime,
        serviceType: mainService.serviceType,
        serviceTypeId: mainService.serviceTypeId,
        veterinarian: veterinarianData,
        veterinarianId: appointmentForm.veterinarianId,
        room,
        roomId: appointmentForm.roomId,
        notes: appointmentForm.notes,
        products: appointmentForm.products,
        totalPrice: finalTotalPrice,
        updatedAt: new Date(),
    };

    if (editingAppointment) {
        let updatedAppointment: Appointment = { ...editingAppointment, ...baseAppointmentData };

        if (dialogAction === 'complete') {
            updatedAppointment.status = 'completed';
            const saleItem: SaleItem = { id: updatedAppointment.id, name: `${updatedAppointment.serviceType.name} - ${updatedAppointment.animal.name}`, type: 'service', quantity: 1, unitPrice: updatedAppointment.totalPrice, total: updatedAppointment.totalPrice };
            onNavigate('point-of-sale', { draftSaleItems: [saleItem] });
            toast({ title: "Atendimento Concluído", description: "Enviado para o Ponto de Venda." });
        } else if (dialogAction === 'cancel') {
            updatedAppointment.status = 'cancelled';
            toast({ title: "Agendamento Cancelado" });
        } else {
            toast({ title: t('saveSuccess'), description: "Agendamento atualizado." });
        }
        setAppointments(prev => prev.map(a => a.id === updatedAppointment.id ? updatedAppointment : a));
    } else { // Novo agendamento
        const newAppointment: Appointment = {
            id: Date.now().toString(),
            ...baseAppointmentData,
            status: 'scheduled',
            isActive: true,
            createdBy: '1',
            createdAt: new Date(),
        };
        setAppointments(prev => [...prev, newAppointment]);
        toast({ title: t('saveSuccess'), description: t('newAppointment') + " criado." });
    }
    handleCloseDialog();
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { labelKey: string; variant: any }> = {
      'scheduled': { labelKey: 'scheduled', variant: 'secondary' },
      'completed': { labelKey: 'completed', variant: 'default' },
      'cancelled': { labelKey: 'cancelled', variant: 'destructive' },
    };
    const statusInfo = statusMap[status] || { labelKey: status, variant: 'outline' };
    return <Badge variant={statusInfo.variant}>{t(statusInfo.labelKey)}</Badge>;
  };

  const getDialogFooter = () => {
    let button;
    switch (dialogAction) {
      case 'complete':
        button = <Button onClick={handleFinalizeAction} className="bg-green-600 hover:bg-green-700">Concluir e Enviar para PDV</Button>;
        break;
      case 'cancel':
        button = <Button onClick={handleFinalizeAction} variant="destructive">Confirmar Cancelamento</Button>;
        break;
      default:
        button = <Button onClick={handleFinalizeAction} className="bg-teal-600 hover:bg-teal-700">{editingAppointment ? t('save') : t('add')}</Button>;
    }
    return (
      <DialogFooter>
        <Button variant="outline" onClick={handleCloseDialog}>{t('cancel')}</Button>
        {button}
      </DialogFooter>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('clinic')}</h1>
          <p className="text-gray-600">{t('manageAppointments')}</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => handleOpenDialog(null, 'new')}>
          <Plus className="w-4 h-4 mr-2" />
          {t('newAppointment')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('appointmentsList')}</CardTitle>
          <CardDescription>{filteredAppointments.length} {t('appointmentsRegistered')}</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><Input placeholder={t('searchByAnimalOrVet')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder={t('allStatuses')} /></SelectTrigger>
              <SelectContent><SelectItem value="all">{t('allStatuses')}</SelectItem><SelectItem value="scheduled">{t('scheduled')}</SelectItem><SelectItem value="completed">{t('completed')}</SelectItem><SelectItem value="cancelled">{t('cancelled')}</SelectItem></SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader><TableRow><TableHead>{t('animal')}</TableHead><TableHead>{t('service')}</TableHead><TableHead>{t('dateTime')}</TableHead><TableHead>{t('status')}</TableHead><TableHead className="text-right">{t('actions')}</TableHead></TableRow></TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.animal.name}</TableCell>
                  <TableCell>{appointment.serviceType.name}</TableCell>
                  <TableCell>{formatDate(appointment.appointmentDate)} às {appointment.appointmentTime}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {appointment.status === 'scheduled' ? (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(appointment, 'complete')} title="Concluir Atendimento" className="text-green-600 hover:text-green-800"><CheckCircle className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(appointment, 'edit')} title="Editar"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(appointment, 'cancel')} title="Cancelar" className="text-yellow-600 hover:text-yellow-800"><XCircle className="w-4 h-4" /></Button>
                        </>
                      ) : ( <span>-</span> )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t(dialogAction === 'complete' ? 'executeAppointment' : dialogAction === 'cancel' ? 'cancelled' : editingAppointment ? 'editAppointment' : 'newAppointment')}</DialogTitle>
            <DialogDescription>{t('fillAppointmentData')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="animal">{t('animal')}</Label><Select value={appointmentForm.animalId} onValueChange={(v) => setAppointmentForm(f => ({...f, animalId: v}))}><SelectTrigger><SelectValue placeholder={t('selectAnimal')}/></SelectTrigger><SelectContent>{mockAnimals.map((a) => (<SelectItem key={a.id} value={a.id}>{a.name} - {a.tutor.name}</SelectItem>))}</SelectContent></Select></div>
              <div><Label htmlFor="veterinarian">{t('veterinarian')}</Label><Select value={appointmentForm.veterinarianId} onValueChange={(v) => setAppointmentForm(f => ({...f, veterinarianId: v}))}><SelectTrigger><SelectValue placeholder={t('selectVeterinarian')}/></SelectTrigger><SelectContent>{veterinarians.map((v) => (<SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>))}</SelectContent></Select></div>
              <div><Label htmlFor="date">{t('date')}</Label><Input id="date" type="date" value={appointmentForm.appointmentDate} onChange={(e) => setAppointmentForm(f => ({...f, appointmentDate: e.target.value}))}/></div>
              <div><Label htmlFor="time">{t('time')}</Label><Input id="time" type="time" value={appointmentForm.appointmentTime} onChange={(e) => setAppointmentForm(f => ({...f, appointmentTime: e.target.value}))}/></div>
              <div><Label htmlFor="room">{t('room')}</Label><Select value={appointmentForm.roomId} onValueChange={(v) => setAppointmentForm(f => ({...f, roomId: v}))}><SelectTrigger><SelectValue placeholder={t('selectRoom')}/></SelectTrigger><SelectContent>{mockRooms.map((r) => (<SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>))}</SelectContent></Select></div>
            </div>
            <div className="space-y-4"><h3 className="text-lg font-semibold">Serviços</h3><div className="flex gap-2"><Select value={selectedServiceId} onValueChange={setSelectedServiceId}><SelectTrigger><SelectValue placeholder="Selecionar serviço"/></SelectTrigger><SelectContent>{mockServiceTypes.map((s) => (<SelectItem key={s.id} value={s.id}>{s.name} - R$ {s.price}</SelectItem>))}</SelectContent></Select><Button type="button" onClick={addServiceToAppointment} disabled={!selectedServiceId}><Plus className="w-4 h-4"/></Button></div>
              {appointmentForm.services.length > 0 && (<div className="border rounded-lg p-4"><h4 className="font-medium mb-3">Serviços Selecionados</h4><div className="space-y-2">{appointmentForm.services.map((s) => (<div key={s.serviceTypeId} className="flex items-center justify-between bg-gray-50 p-2 rounded"><div><span className="font-medium">{s.serviceType.name}</span></div><div className="flex items-center gap-2"><span className="font-medium">R$ {s.price}</span><Button type="button" variant="outline" size="sm" onClick={() => removeServiceFromAppointment(s.serviceTypeId)}><X className="w-4 h-4"/></Button></div></div>))}</div></div>)}
            </div>
            <div className="space-y-4 border-t pt-4 mt-4"><h3 className="text-lg font-semibold">Produtos</h3><div className="flex justify-end"><Button variant="outline" size="sm" onClick={() => setIsProductDialogOpen(true)}><Plus className="w-4 h-4 mr-2"/>{t('addProduct')}</Button></div>
                {appointmentForm.products.length > 0 && (<div className="border rounded-lg p-4"><h4 className="font-medium mb-3">Produtos Adicionados</h4><div className="space-y-2">{appointmentForm.products.map((p) => (<div key={p.productId} className="flex items-center justify-between bg-gray-50 p-2 rounded"><div><span className="font-medium">{p.product.name} (x{p.quantity})</span></div><div className="flex items-center gap-2"><span className="font-medium">R$ {((p.product.salePrice || 0) * p.quantity).toFixed(2)}</span><Button type="button" variant="outline" size="sm" onClick={() => handleRemoveProduct(p.productId)}><X className="w-4 h-4"/></Button></div></div>))}</div></div>)}
            </div>
            <div><div className="mt-3 pt-3 border-t flex justify-between items-center"><span className="font-semibold text-xl">Total:</span><span className="font-semibold text-xl">R$ {calculateTotalPrice().toFixed(2)}</span></div></div>
            <div><Label htmlFor="notes">{t('notes')}</Label><Textarea id="notes" value={appointmentForm.notes} onChange={(e) => setAppointmentForm(f => ({...f, notes: e.target.value}))} placeholder="Observações sobre o agendamento..." rows={3}/></div>
          </div>
          {getDialogFooter()}
        </DialogContent>
      </Dialog>

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t('selectProduct')}</DialogTitle></DialogHeader>
          <div className="py-4">
            <Input placeholder={t('searchProduct')} value={productSearch} onChange={e => setProductSearch(e.target.value)}/>
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
              {mockProducts.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase())).map(p => {
                let tempQuantity = 1;
                return (<div key={p.id} className="flex items-center justify-between p-2 border rounded-md"><p className="font-medium">{p.name}</p><div className="flex items-center gap-2"><Input type="number" min="1" defaultValue="1" className="w-20" onChange={e => tempQuantity = parseInt(e.target.value) || 1}/><Button size="sm" onClick={() => handleSelectProduct(p, tempQuantity)}><Plus className="w-4 h-4"/></Button></div></div>)
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnimalHealth;
