
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/products';
import { SaleItem } from '@/types/sales';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface AddProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    products: Product[];
    onAddItem: (item: Omit<SaleItem, 'total'>) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onOpenChange, products, onAddItem }) => {
    const { toast } = useToast();
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!open) {
            setSelectedProductId(null);
            setQuantity(1);
        }
    }, [open]);

    const handleConfirm = () => {
        if (!selectedProductId) {
            toast({ title: 'Selecione um produto', variant: 'destructive' });
            return;
        }
        const product = products.find(p => p.id === selectedProductId);
        if (!product) {
            toast({ title: 'Produto não encontrado', variant: 'destructive' });
            return;
        }

        onAddItem({
            id: product.id,
            name: product.name,
            type: 'product',
            quantity: quantity,
            unitPrice: product.salePrice,
        });
        
        onOpenChange(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Produto à Venda</DialogTitle>
                    <DialogDescription>Selecione um produto e a quantidade desejada.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="product-select">Produto</Label>
                        <Select onValueChange={setSelectedProductId}>
                            <SelectTrigger id="product-select"><SelectValue placeholder="Selecione um produto..." /></SelectTrigger>
                            <SelectContent>
                                {products.map(product => (
                                    <SelectItem key={product.id} value={product.id}>{product.name} (R$ {product.salePrice.toFixed(2)})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="product-quantity">Quantidade</Label>
                        <Input id="product-quantity" type="number" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} min="1" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleConfirm} disabled={!selectedProductId}>
                         <Plus className="mr-2 h-4 w-4" /> Adicionar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductDialog;
