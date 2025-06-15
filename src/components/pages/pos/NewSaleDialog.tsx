import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X, ShoppingBag, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Sale, SaleItem } from '@/types/sales';
import { Tutor, Animal } from '@/types';
import { Product } from '@/types/products';
import { Service } from '@/types/services';
import { Separator } from '@/components/ui/separator';
import AddProductDialog from './AddProductDialog';
import AddServiceDialog from './AddServiceDialog';

interface NewSaleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tutors: Tutor[];
    animals: Animal[];
    products: Product[];
    services: Service[];
    onStartSale: (sale: Sale) => void;
}

const NewSaleDialog: React.FC<NewSaleDialogProps> = ({ open, onOpenChange, tutors, animals, products, services, onStartSale }) => {
    const { toast } = useToast();
    const [selectedTutorId, setSelectedTutorId] = useState<string>('');
    const [selectedAnimalId, setSelectedAnimalId] = useState<string>('');
    const [items, setItems] = useState<SaleItem[]>([]);
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
    
    const availableAnimals = useMemo(() => {
        if (!selectedTutorId) return [];
        return animals.filter(a => a.tutorId === selectedTutorId);
    }, [selectedTutorId, animals]);

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.total, 0), [items]);

    useEffect(() => {
        if (!open) {
            setSelectedTutorId('');
            setSelectedAnimalId('');
            setItems([]);
            setIsProductDialogOpen(false);
            setIsServiceDialogOpen(false);
        }
    }, [open]);

    useEffect(() => {
        setSelectedAnimalId('');
    }, [selectedTutorId]);

    const handleAddOrUpdateItem = (itemToAdd: Omit<SaleItem, 'total'>) => {
        const existingCartItem = items.find(i => i.id === itemToAdd.id && i.type === itemToAdd.type);

        if (existingCartItem) {
            setItems(items.map(i => i.id === itemToAdd.id && i.type === itemToAdd.type
                ? { ...i, quantity: i.quantity + itemToAdd.quantity, total: (i.quantity + itemToAdd.quantity) * i.unitPrice }
                : i
            ));
        } else {
            const newSaleItem: SaleItem = {
                ...itemToAdd,
                total: itemToAdd.unitPrice * itemToAdd.quantity,
            };
            setItems([...items, newSaleItem]);
        }
        toast({ title: "Item Adicionado", description: `${itemToAdd.name} foi adicionado à venda.` });
    };

    const handleRemoveItem = (itemId: string) => {
        setItems(items.filter(i => i.id !== itemId));
    };

    const handleProceedToCheckout = () => {
        if (!selectedTutorId || !selectedAnimalId) {
            toast({ title: "Cliente ou animal não selecionado", description: "Por favor, selecione o cliente e o animal.", variant: "destructive" });
            return;
        }
        if (items.length === 0) {
            toast({ title: "Nenhum item na venda", description: "Adicione pelo menos um item para continuar.", variant: "destructive" });
            return;
        }

        const tutor = tutors.find(t => t.id === selectedTutorId);
        const animal = animals.find(a => a.id === selectedAnimalId);

        if (!tutor || !animal) {
             toast({ title: "Erro", description: "Cliente ou animal não encontrado.", variant: "destructive" });
             return;
        }

        const newSale: Sale = {
            id: `manual-${Date.now()}`,
            date: new Date(),
            customerName: tutor.name,
            customerPhone: tutor.phone,
            animalId: animal.id,
            animalName: animal.name,
            items: items,
            subtotal: subtotal,
            discount: 0,
            total: subtotal,
            paymentMethod: '',
            status: 'pending',
        };
        
        onStartSale(newSale);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Criar Nova Venda Manual</DialogTitle>
                    <DialogDescription>Selecione o cliente, animal e adicione produtos/serviços.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">1. Cliente e Animal</h3>
                        <div>
                            <Label htmlFor="tutor">Tutor</Label>
                            <Select value={selectedTutorId} onValueChange={setSelectedTutorId}>
                                <SelectTrigger id="tutor"><SelectValue placeholder="Selecione um tutor..." /></SelectTrigger>
                                <SelectContent>
                                    {tutors.map(tutor => (
                                        <SelectItem key={tutor.id} value={tutor.id}>{tutor.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="animal">Animal</Label>
                            <Select value={selectedAnimalId} onValueChange={setSelectedAnimalId} disabled={!selectedTutorId}>
                                <SelectTrigger id="animal"><SelectValue placeholder="Selecione um animal..." /></SelectTrigger>
                                <SelectContent>
                                    {availableAnimals.map(animal => (
                                        <SelectItem key={animal.id} value={animal.id}>{animal.name} ({animal.species})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">2. Adicionar Itens</h3>
                         <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="outline" className="w-full justify-start text-left h-auto py-3" onClick={() => setIsProductDialogOpen(true)}>
                                <ShoppingBag className="mr-4 h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Adicionar Produto</p>
                                    <p className="text-sm text-muted-foreground">Rações, brinquedos, etc.</p>
                                </div>
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-left h-auto py-3" onClick={() => setIsServiceDialogOpen(true)}>
                                <Stethoscope className="mr-4 h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Adicionar Serviço</p>
                                    <p className="text-sm text-muted-foreground">Consultas, banho e tosa, etc.</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator />
                
                <div className="space-y-4 pt-4">
                     <h3 className="text-lg font-medium">3. Itens da Venda</h3>
                     <div className="max-h-60 overflow-y-auto border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Qtd</TableHead>
                                    <TableHead>Preço Unit.</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">Nenhum item adicionado.</TableCell>
                                    </TableRow>
                                ) : (
                                    items.map(item => (
                                        <TableRow key={`${item.type}-${item.id}`}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>R$ {item.unitPrice.toFixed(2)}</TableCell>
                                            <TableCell>R$ {item.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                     </div>
                     <div className="flex justify-end font-bold text-lg">
                        <span>Subtotal: R$ {subtotal.toFixed(2)}</span>
                     </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleProceedToCheckout} disabled={items.length === 0}>Prosseguir para Pagamento</Button>
                </DialogFooter>

                <AddProductDialog
                    open={isProductDialogOpen}
                    onOpenChange={setIsProductDialogOpen}
                    products={products}
                    onAddItem={handleAddOrUpdateItem}
                />
                <AddServiceDialog
                    open={isServiceDialogOpen}
                    onOpenChange={setIsServiceDialogOpen}
                    services={services}
                    onAddItem={handleAddOrUpdateItem}
                />
            </DialogContent>
        </Dialog>
    );
};

export default NewSaleDialog;
