
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Service } from '@/types/services';
import { SaleItem } from '@/types/sales';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface AddServiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    services: Service[];
    onAddItem: (item: Omit<SaleItem, 'total'>) => void;
}

const AddServiceDialog: React.FC<AddServiceDialogProps> = ({ open, onOpenChange, services, onAddItem }) => {
    const { toast } = useToast();
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!open) {
            setSelectedServiceId(null);
            setQuantity(1);
        }
    }, [open]);

    const handleConfirm = () => {
        if (!selectedServiceId) {
            toast({ title: 'Selecione um serviço', variant: 'destructive' });
            return;
        }
        const service = services.find(s => s.id === selectedServiceId);
        if (!service) {
            toast({ title: 'Serviço não encontrado', variant: 'destructive' });
            return;
        }

        onAddItem({
            id: service.id,
            name: service.name,
            type: 'service',
            quantity: quantity,
            unitPrice: service.price,
        });

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Serviço à Venda</DialogTitle>
                    <DialogDescription>Selecione um serviço e a quantidade desejada.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="service-select">Serviço</Label>
                        <Select onValueChange={setSelectedServiceId}>
                            <SelectTrigger id="service-select"><SelectValue placeholder="Selecione um serviço..." /></SelectTrigger>
                            <SelectContent>
                                {services.map(service => (
                                    <SelectItem key={service.id} value={service.id}>{service.name} (R$ {service.price.toFixed(2)})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="service-quantity">Quantidade</Label>
                        <Input id="service-quantity" type="number" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} min="1" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleConfirm} disabled={!selectedServiceId}>
                        <Plus className="mr-2 h-4 w-4" /> Adicionar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddServiceDialog;
