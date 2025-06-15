
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Animal, Veterinarian, ServiceType, Room, Product } from '@/types';

interface AppointmentFormProps {
  appointmentForm: {
    animalId: string;
    appointmentDate: string;
    appointmentTime: string;
    serviceTypeId: string;
    veterinarianId: string;
    roomId: string;
    notes: string;
    products: { product: Product; productId: string; quantity: number }[];
  };
  setAppointmentForm: React.Dispatch<React.SetStateAction<any>>;
  animals: Animal[];
  serviceTypes: ServiceType[];
  veterinarians: Veterinarian[];
  rooms: Room[];
  onAddProduct: () => void;
  onRemoveProduct: (productId: string) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointmentForm,
  setAppointmentForm,
  animals,
  serviceTypes,
  veterinarians,
  rooms,
  onAddProduct,
  onRemoveProduct,
}) => {
  return (
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
            <SelectValue placeholder={t('selectService')} />
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
            {rooms.map((room) => (
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
          <Button variant="outline" size="sm" onClick={onAddProduct}>
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
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemoveProduct(p.productId)}>
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
  );
};

export default AppointmentForm;
