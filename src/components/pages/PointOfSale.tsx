
import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Receipt, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Sale, SaleItem } from '@/types/sales';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface PointOfSaleProps {
  sales: Sale[];
  onUpdateSale: (sale: Sale) => void;
}

const CheckoutForm = ({ sale, onConfirm, onClose }: { sale: Sale, onConfirm: (paymentMethod: string, discount: number) => void, onClose: () => void }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [discount, setDiscount] = useState(0);

    const subtotal = useMemo(() => sale.items.reduce((sum, item) => sum + item.total, 0), [sale.items]);
    const discountAmount = useMemo(() => subtotal * (discount / 100), [subtotal, discount]);
    const total = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);
    const { toast } = useToast();

    const handleConfirm = () => {
        if (!paymentMethod) {
          toast({ title: "Forma de pagamento", description: "Selecione uma forma de pagamento.", variant: "destructive" });
          return;
        }
        onConfirm(paymentMethod, discount);
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Finalizar Venda #{sale.id}</DialogTitle>
                <DialogDescription>
                    Cliente: {sale.customerName} | Animal: {sale.animalName}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="max-h-60 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Qtd</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sale.items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>R$ {item.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="space-y-4 border-t pt-4">
                     <div>
                      <Label>Desconto (%)</Label>
                      <Input type="number" value={discount} onChange={e => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))} min="0" max="100" />
                    </div>
                    <div>
                      <Label>Forma de Pagamento</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Dinheiro</SelectItem>
                          <SelectItem value="card">Cartão</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm"><span>Subtotal:</span><span>R$ {subtotal.toFixed(2)}</span></div>
                      {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Desconto:</span><span>- R$ {discountAmount.toFixed(2)}</span></div>}
                      <div className="flex justify-between text-lg font-bold"><span>Total:</span><span>R$ {total.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button onClick={handleConfirm} className="bg-teal-600 hover:bg-teal-700">
                    <Receipt className="w-4 h-4 mr-2" /> Confirmar Pagamento
                </Button>
            </DialogFooter>
        </>
    );
}

const PointOfSale: React.FC<PointOfSaleProps> = ({ sales, onUpdateSale }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const pendingSales = useMemo(() => sales.filter(s => s.status === 'pending'), [sales]);

  const filteredSales = useMemo(() => {
    return pendingSales.filter(sale => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch =
        sale.customerName.toLowerCase().includes(lowerSearchTerm) ||
        (sale.animalName && sale.animalName.toLowerCase().includes(lowerSearchTerm)) ||
        sale.id.toLowerCase().includes(lowerSearchTerm);

      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = format(sale.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = sale.date >= weekAgo;
      }

      return matchesSearch && matchesDate;
    });
  }, [pendingSales, searchTerm, dateFilter]);

  const handleOpenCheckout = (sale: Sale) => {
    setSelectedSale(sale);
    setIsCheckoutOpen(true);
  };

  const handleProcessSale = (paymentMethod: string, discount: number) => {
    if (!selectedSale) return;

    const subtotal = selectedSale.items.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal - discountAmount;

    const updatedSale: Sale = {
      ...selectedSale,
      status: 'completed',
      paymentMethod: paymentMethod,
      discount: discountAmount,
      subtotal,
      total,
      date: new Date(),
    };

    onUpdateSale(updatedSale);
    setIsCheckoutOpen(false);
    setSelectedSale(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">PDV - Vendas Pendentes</h1>
      <p className="text-gray-600">Gerencie e finalize as vendas enviadas pelos setores de serviço.</p>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por cliente, animal ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Últimos 7 dias</SelectItem>
              </SelectContent>
            </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Vendas Pendentes</CardTitle>
          <CardDescription>{filteredSales.length} venda(s) aguardando finalização.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Venda</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente/Animal</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">Nenhuma venda pendente encontrada.</TableCell>
                </TableRow>
              ) : (
                filteredSales.map(sale => (
                    <TableRow key={sale.id}>
                        <TableCell className="font-mono">#{sale.id.slice(-6)}</TableCell>
                        <TableCell>{format(sale.date, 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                        <TableCell>
                            <div>{sale.customerName}</div>
                            <div className="text-sm text-muted-foreground">{sale.animalName}</div>
                        </TableCell>
                        <TableCell>{sale.items.length}</TableCell>
                        <TableCell className="font-medium">R$ {sale.total.toFixed(2)}</TableCell>
                        <TableCell>
                            <Button onClick={() => handleOpenCheckout(sale)} size="sm">
                                <Receipt className="w-4 h-4 mr-2" /> Finalizar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-lg">
            {selectedSale && <CheckoutForm sale={selectedSale} onConfirm={handleProcessSale} onClose={() => setIsCheckoutOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PointOfSale;
