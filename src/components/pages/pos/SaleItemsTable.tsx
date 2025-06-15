
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SaleItem } from '@/types/sales';

interface SaleItemsTableProps {
    items: SaleItem[];
    onRemoveItem: (item: SaleItem) => void;
    subtotal: number;
}

const SaleItemsTable: React.FC<SaleItemsTableProps> = ({ items, onRemoveItem, subtotal }) => {
    return (
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
                                        <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item)}>
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
    );
};

export default SaleItemsTable;
