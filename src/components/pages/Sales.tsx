import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Eye, FileText, Printer, Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';

interface SaleItem {
  id: string;
  name: string;
  type: 'product' | 'service';
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Sale {
  id: string;
  date: Date;
  customerName: string;
  customerPhone?: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

const Sales: React.FC = () => {
  const { toast } = useToast();
  
  const [sales, setSales] = useState<Sale[]>([
    {
      id: '1',
      date: new Date(),
      customerName: 'João Silva',
      customerPhone: '(11) 99999-1111',
      items: [
        { id: '1', name: 'Consulta Veterinária', type: 'service', quantity: 1, unitPrice: 120.00, total: 120.00 },
        { id: '2', name: 'Ração Premium 15kg', type: 'product', quantity: 1, unitPrice: 89.90, total: 89.90 },
      ],
      subtotal: 209.90,
      discount: 0,
      total: 209.90,
      paymentMethod: 'Cartão',
      status: 'completed',
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000),
      customerName: 'Maria Santos',
      customerPhone: '(11) 99999-2222',
      items: [
        { id: '3', name: 'Banho e Tosa', type: 'service', quantity: 1, unitPrice: 45.00, total: 45.00 },
      ],
      subtotal: 45.00,
      discount: 5.00,
      total: 40.00,
      paymentMethod: 'Dinheiro',
      status: 'completed',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = format(sale.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = sale.date >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = sale.date >= monthAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'completed': { label: 'Concluída', variant: 'default' as const },
      'pending': { label: 'Pendente', variant: 'secondary' as const },
      'cancelled': { label: 'Cancelada', variant: 'destructive' as const },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'outline' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDetailDialogOpen(true);
  };

  const generateInvoice = (sale: Sale) => {
    // Simular impressão da fatura
    const invoiceContent = `
FATURA - PetShop System
========================

Venda: ${sale.id}
Data: ${format(sale.date, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
Cliente: ${sale.customerName}
${sale.customerPhone ? `Telefone: ${sale.customerPhone}` : ''}

ITENS:
${sale.items.map(item => 
  `${item.name} - Qtd: ${item.quantity} x R$ ${item.unitPrice.toFixed(2)} = R$ ${item.total.toFixed(2)}`
).join('\n')}

Subtotal: R$ ${sale.subtotal.toFixed(2)}
${sale.discount > 0 ? `Desconto: R$ ${sale.discount.toFixed(2)}` : ''}
TOTAL: R$ ${sale.total.toFixed(2)}

Forma de Pagamento: ${sale.paymentMethod}
`;

    // Criar uma nova janela para impressão
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Fatura - ${sale.id}</title>
            <style>
              body { font-family: monospace; padding: 20px; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${invoiceContent}</pre>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }

    toast({
      title: "Fatura gerada",
      description: "A fatura foi gerada e está sendo impressa.",
    });
  };

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalSalesToday = sales
    .filter(sale => format(sale.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))
    .reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendas</h1>
          <p className="text-gray-600">Histórico de vendas e faturamento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalSalesToday.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Filtrado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {totalSales.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas do Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {filteredSales.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R$ {filteredSales.length > 0 ? (totalSales / filteredSales.length).toFixed(2) : '0,00'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Histórico de Vendas
              </CardTitle>
              <CardDescription>
                {filteredSales.length} vendas encontradas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por cliente ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completed">Concluídas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">7 dias</SelectItem>
                <SelectItem value="month">30 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-mono">#{sale.id}</TableCell>
                  <TableCell>
                    {format(sale.date, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.customerName}</div>
                      {sale.customerPhone && (
                        <div className="text-sm text-gray-500">{sale.customerPhone}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {sale.items.length} {sale.items.length === 1 ? 'item' : 'itens'}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    R$ {sale.total.toFixed(2)}
                  </TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(sale)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateInvoice(sale)}
                        className="text-blue-600"
                      >
                        <Receipt className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes da Venda */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Venda #{selectedSale?.id}</DialogTitle>
            <DialogDescription>
              Informações completas da venda
            </DialogDescription>
          </DialogHeader>
          
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Data/Hora</Label>
                  <p>{format(selectedSale.date, 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Cliente</Label>
                  <p>{selectedSale.customerName}</p>
                  {selectedSale.customerPhone && <p className="text-sm text-gray-500">{selectedSale.customerPhone}</p>}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Itens</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead>Preço Unit.</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSale.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === 'product' ? 'default' : 'secondary'}>
                            {item.type === 'product' ? 'Produto' : 'Serviço'}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>R$ {item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>R$ {item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {selectedSale.subtotal.toFixed(2)}</span>
                </div>
                {selectedSale.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto:</span>
                    <span>- R$ {selectedSale.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {selectedSale.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Forma de Pagamento:</span>
                  <span>{selectedSale.paymentMethod}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Fechar
            </Button>
            {selectedSale && (
              <Button onClick={() => generateInvoice(selectedSale)} className="bg-blue-600 hover:bg-blue-700">
                <Receipt className="w-4 h-4 mr-2" />
                Imprimir Fatura
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;
