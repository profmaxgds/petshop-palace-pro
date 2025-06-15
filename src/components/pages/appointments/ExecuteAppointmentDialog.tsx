
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Play } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import type { Appointment, Product, Sale, SaleItem } from '@/types';

interface ExecuteAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
  onStartService: (appointment: Appointment) => void;
  onAddProduct: () => void;
  onRemoveProduct: (productId: string) => void;
  onUpdateAppointment: (appointment: Appointment) => void;
}

const ExecuteAppointmentDialog: React.FC<ExecuteAppointmentDialogProps> = ({
  open,
  onOpenChange,
  appointment,
  onStartService,
  onAddProduct,
  onRemoveProduct,
  onUpdateAppointment,
}) => {
  const { toast } = useToast();
  const [showConfirmPayment, setShowConfirmPayment] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR');
  };

  const calculateTotal = () => {
    if (!appointment) return 0;
    
    const serviceTotal = appointment.serviceType.price;
    const productsTotal = (appointment.products || []).reduce((sum, p) => 
      sum + (p.product.salePrice || 0) * p.quantity, 0
    );
    
    return serviceTotal + productsTotal;
  };

  const handleConfirmPayment = () => {
    if (!appointment) return;

    // Criar venda para o PDV
    const serviceItem: SaleItem = {
      id: appointment.serviceType.id,
      name: appointment.serviceType.name,
      quantity: 1,
      unitPrice: appointment.serviceType.price,
      total: appointment.serviceType.price,
      type: 'service',
    };

    const productItems: SaleItem[] = (appointment.products || []).map(p => ({
      id: p.productId,
      name: p.product.name,
      quantity: p.quantity,
      unitPrice: p.product.salePrice || 0,
      total: (p.product.salePrice || 0) * p.quantity,
      type: 'product',
    }));

    const items = [serviceItem, ...productItems];
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);

    const newSale: Sale = {
      id: `apt-${appointment.id}`,
      date: new Date(),
      customerName: appointment.animal.tutor.name,
      customerPhone: appointment.animal.tutor.phone,
      animalId: appointment.animal.id,
      animalName: appointment.animal.name,
      items: items,
      subtotal: subtotal,
      discount: 0,
      total: subtotal,
      paymentMethod: '',
      status: 'pending',
    };

    try {
      const existingSalesJSON = localStorage.getItem('pos_sales');
      const existingSales: Sale[] = existingSalesJSON ? JSON.parse(existingSalesJSON) : [];
      localStorage.setItem('pos_sales', JSON.stringify([...existingSales, newSale]));
      
      toast({
        title: t("paymentConfirmed"),
        description: t("appointmentSentToPOS"),
      });

      // Atualizar status do agendamento para concluído
      const updatedAppointment = { ...appointment, status: 'completed' as const, updatedAt: new Date() };
      onUpdateAppointment(updatedAppointment);
      
    } catch (error) {
      console.error("Failed to save sale to localStorage", error);
      toast({
        title: t("error"),
        description: "Falha ao confirmar pagamento.",
        variant: 'destructive',
      });
    }

    setShowConfirmPayment(false);
    onOpenChange(false);
  };

  const handleStartService = () => {
    if (!appointment) return;
    onStartService(appointment);
    setShowConfirmPayment(true);
  };

  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('executeAppointment')}</DialogTitle>
          <DialogDescription>
            {t('confirmAppointmentAndAddProducts')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm p-4 border rounded-lg bg-gray-50">
            <div><strong className="block text-gray-500">{t('animal')}:</strong> {appointment.animal.name}</div>
            <div><strong className="block text-gray-500">{t('tutor')}:</strong> {appointment.animal.tutor.name}</div>
            <div><strong className="block text-gray-500">{t('service')}:</strong> {appointment.serviceType.name}</div>
            <div><strong className="block text-gray-500">{t('dateTime')}:</strong> {formatDate(appointment.appointmentDate)} às {appointment.appointmentTime}</div>
            <div className="col-span-2"><strong className="block text-gray-500">{t('veterinarian')}:</strong> {appointment.veterinarian?.name || 'N/A'}</div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base font-semibold">{t('products')}</Label>
              <Button variant="outline" size="sm" onClick={onAddProduct}>
                <Plus className="w-4 h-4 mr-2" />
                {t('addProduct')}
              </Button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto p-1">
              {appointment.products && appointment.products.map(p => (
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
              {(!appointment.products || appointment.products.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-2">{t('noProductsAdded')}</p>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>{t('total')}:</span>
              <span>R$ {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          
          {showConfirmPayment && (
            <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">{t('confirmPayment')}</h4>
              <p className="text-sm text-yellow-700 mb-4">
                Confirme o pagamento para finalizar o atendimento e enviar para o PDV.
              </p>
              <div className="flex gap-2">
                <Button onClick={handleConfirmPayment} className="bg-green-600 hover:bg-green-700">
                  {t('confirmPayment')}
                </Button>
                <Button variant="outline" onClick={() => setShowConfirmPayment(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('cancel')}</Button>
          {!showConfirmPayment && (
            <Button onClick={handleStartService} className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              {t('startAppointment')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExecuteAppointmentDialog;
