import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Phone, Mail, UserCheck, UserX, Stethoscope } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Veterinarian, WorkSchedule } from '@/types';
import { Switch } from '@/components/ui/switch';

interface VeterinariansProps {
  veterinarians: Veterinarian[];
  setVeterinarians: React.Dispatch<React.SetStateAction<Veterinarian[]>>;
}

const Veterinarians: React.FC<VeterinariansProps> = ({ veterinarians, setVeterinarians }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVet, setEditingVet] = useState<Veterinarian | null>(null);

  const defaultSchedule: WorkSchedule = {
    sunday: { active: false, start: '09:00', end: '18:00' },
    monday: { active: true, start: '09:00', end: '18:00' },
    tuesday: { active: true, start: '09:00', end: '18:00' },
    wednesday: { active: true, start: '09:00', end: '18:00' },
    thursday: { active: true, start: '09:00', end: '18:00' },
    friday: { active: true, start: '09:00', end: '18:00' },
    saturday: { active: false, start: '09:00', end: '18:00' },
  };

  const [formData, setFormData] = useState({
    name: '',
    crmv: '',
    cpf: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    },
    specialties: [] as string[],
    phone: '',
    email: '',
    status: 'active' as Veterinarian['status'],
    schedule: defaultSchedule,
  });

  const specialtyOptions = [
    'Clínica Geral', 'Cirurgia', 'Dermatologia', 'Cardiologia',
    'Oncologia', 'Neurologia', 'Ortopedia', 'Oftalmologia',
    'Endocrinologia', 'Anestesiologia'
  ];

  const daysOfWeek: (keyof WorkSchedule)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const filteredVeterinarians = veterinarians.filter(vet =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.crmv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vet.cpf && vet.cpf.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (vet.specialties && vet.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, address: { ...prev.address, zipCode } }));

    if (zipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            address: {
              ...prev.address,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
            }
          }));
        }
      } catch (error) {
        console.error("Error fetching address from CEP", error);
      }
    }
  };

  const handleSave = () => {
    if (editingVet) {
      setVeterinarians(veterinarians.map(v => 
        v.id === editingVet.id 
          ? { ...editingVet, ...formData, updatedAt: new Date() }
          : v
      ));
    } else {
      const newVet: Veterinarian = {
        id: Date.now().toString(),
        ...formData,
        createdBy: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setVeterinarians([...veterinarians, newVet]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVet(null);
    setFormData({
      name: '', crmv: '', cpf: '',
      address: { street: '', number: '', neighborhood: '', city: '', state: '', zipCode: '' },
      specialties: [], phone: '', email: '', status: 'active',
      schedule: defaultSchedule,
    });
  };

  const handleEdit = (vet: Veterinarian) => {
    setEditingVet(vet);
    setFormData({
      name: vet.name,
      crmv: vet.crmv,
      cpf: vet.cpf || '',
      address: {
        street: vet.address?.street || '',
        number: vet.address?.number || '',
        neighborhood: vet.address?.neighborhood || '',
        city: vet.address?.city || '',
        state: vet.address?.state || '',
        zipCode: vet.address?.zipCode || '',
      },
      specialties: vet.specialties || [],
      phone: vet.phone || '',
      email: vet.email || '',
      status: vet.status,
      schedule: vet.schedule ? { ...defaultSchedule, ...vet.schedule } : defaultSchedule,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (vetId: string) => {
    setVeterinarians(veterinarians.filter(v => v.id !== vetId));
  };

  const toggleSpecialty = (specialty: string) => {
    const newSpecialties = formData.specialties.includes(specialty)
      ? formData.specialties.filter(s => s !== specialty)
      : [...formData.specialties, specialty];
    setFormData({ ...formData, specialties: newSpecialties });
  };
  
  const handleScheduleChange = (day: keyof WorkSchedule, field: 'active' | 'start' | 'end', value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('veterinarians')}</h1>
          <p className="text-gray-600">{t('manageVeterinarians')}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('veterinariansList')}</CardTitle>
              <CardDescription>
                {filteredVeterinarians.length} {t('veterinariansRegistered')}
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
              if (!isOpen) handleCloseDialog();
              else setIsDialogOpen(true);
            }}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('newVeterinarian')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingVet ? t('editVeterinarian') : t('newVeterinarian')}
                  </DialogTitle>
                  <DialogDescription>
                    {t('fillVeterinarianData')}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">{t('fullName')}</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Dr. João Silva" />
                  </div>
                  
                  <div>
                    <Label htmlFor="crmv">{t('crmv')}</Label>
                    <Input id="crmv" value={formData.crmv} onChange={(e) => setFormData({...formData, crmv: e.target.value})} placeholder="CRMV-SP 12345" />
                  </div>

                  <div>
                    <Label htmlFor="cpf">{t('cpf')}</Label>
                    <Input id="cpf" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} placeholder="000.000.000-00" />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">{t('status')}</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as Veterinarian['status']})} >
                      <SelectTrigger><SelectValue placeholder={t('status')} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{t('active')}</SelectItem>
                        <SelectItem value="inactive">{t('inactive')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(11) 99999-9999" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email@exemplo.com" />
                  </div>

                  <div className="md:col-span-2 border-t pt-4 mt-4">
                     <Label className="text-base font-semibold">{t('address')}</Label>
                  </div>
                  
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <Label htmlFor="zipCode">{t('zipCode')}</Label>
                        <Input id="zipCode" value={formData.address.zipCode} onChange={handleZipCodeChange} placeholder="00000-000" />
                     </div>
                     <div className="md:col-span-2">
                        <Label htmlFor="street">{t('street')}</Label>
                        <Input id="street" value={formData.address.street} onChange={(e) => setFormData({...formData, address: {...formData.address, street: e.target.value}})} placeholder="Rua das Flores" />
                     </div>
                     <div>
                        <Label htmlFor="number">{t('number')}</Label>
                        <Input id="number" value={formData.address.number} onChange={(e) => setFormData({...formData, address: {...formData.address, number: e.target.value}})} placeholder="123" />
                     </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="neighborhood">{t('neighborhood')}</Label>
                        <Input id="neighborhood" value={formData.address.neighborhood} onChange={(e) => setFormData({...formData, address: {...formData.address, neighborhood: e.target.value}})} placeholder="Centro" />
                     </div>
                     <div>
                        <Label htmlFor="city">{t('city')}</Label>
                        <Input id="city" value={formData.address.city} onChange={(e) => setFormData({...formData, address: {...formData.address, city: e.target.value}})} placeholder="São Paulo" />
                     </div>
                     <div>
                        <Label htmlFor="state">{t('state')}</Label>
                        <Input id="state" value={formData.address.state} onChange={(e) => setFormData({...formData, address: {...formData.address, state: e.target.value}})} placeholder="SP" />
                     </div>
                  </div>
                  
                  <div className="md:col-span-2 border-t pt-4 mt-4">
                    <Label className="text-base font-semibold">{t('specialties')}</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                      {specialtyOptions.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <input type="checkbox" id={specialty} checked={formData.specialties.includes(specialty)} onChange={() => toggleSpecialty(specialty)} className="rounded" />
                          <label htmlFor={specialty} className="text-sm">{specialty}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 border-t pt-4 mt-4">
                    <Label className="text-base font-semibold">{t('workSchedule')}</Label>
                    <div className="space-y-3 mt-2">
                      {daysOfWeek.map((day) => {
                        const daySchedule = formData.schedule[day];
                        return (
                          <div key={day} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                              <Switch
                                id={`schedule-${day}`}
                                checked={daySchedule.active}
                                onCheckedChange={(checked) => handleScheduleChange(day, 'active', checked)}
                              />
                              <Label htmlFor={`schedule-${day}`} className="capitalize font-normal">{t(day)}</Label>
                            </div>
                            <div className="col-span-1">
                              <Input
                                type="time"
                                value={daySchedule.start}
                                onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                                disabled={!daySchedule.active}
                                aria-label={`${t('startTime')} for ${t(day)}`}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                type="time"
                                value={daySchedule.end}
                                onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                                disabled={!daySchedule.active}
                                aria-label={`${t('endTime')} for ${t(day)}`}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>{t('cancel')}</Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">{t('save')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-4 h-4 text-gray-400" />
            <Input placeholder={t('searchByCrmvCpfOrSpecialty')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('veterinarian')}</TableHead>
                  <TableHead>{t('crmv')}</TableHead>
                  <TableHead>{t('cpf')}</TableHead>
                  <TableHead>{t('specialties')}</TableHead>
                  <TableHead>{t('contact')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVeterinarians.map((vet) => (
                  <TableRow key={vet.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <div className="font-medium">{vet.name}</div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{vet.crmv}</Badge></TableCell>
                    <TableCell>{vet.cpf}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {vet.specialties?.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm"><Phone className="w-3 h-3 mr-1" />{vet.phone}</div>
                        <div className="flex items-center text-sm"><Mail className="w-3 h-3 mr-1" />{vet.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={vet.status === 'active' ? 'default' : 'secondary'}>
                        {vet.status === 'active' ? (
                          <><UserCheck className="w-3 h-3 mr-1" />{t('active')}</>
                        ) : (
                          <><UserX className="w-3 h-3 mr-1" />{t('inactive')}</>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(vet)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(vet.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></Button>
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

export default Veterinarians;
