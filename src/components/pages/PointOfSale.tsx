
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, Plus, Minus, Trash2, Calculator, CreditCard, Banknote, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Sale, SaleItem } from '@/types/sales';

interface PointOfSaleProps {
  onSaleCompleted: (sale: Sale) => void;
  initialCartItems?: SaleItem[] | null;
  onCartLoaded?: () => void;
}

const PointOfSale: React.FC<PointOfSaleProps> = ({ onSaleCompleted, initialCartItems, onCartLoaded }) => {
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<SaleItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [discount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (initialCartItems && initialCartItems.length > 0) {
      setCartItems(prevItems => {
        const newItems = [...prevItems];
        initialCartItems.forEach(initialItem => {
          const existingItemIndex = newItems.findIndex(item => item.id === initialItem.id && item.type === initialItem.type);
          if (existingItemIndex > -1) {
            const existingItem = newItems[existingItemIndex];
            const newQuantity = existingItem.quantity + initialItem.quantity;
            newItems[existingItemIndex] = {
              ...existingItem,
              quantity: newQuantity,
              total: newQuantity * existingItem.unitPrice,
            };
          } else {
            newItems.push(initialItem);
          }
        });
        return newItems;
      });

      toast({
        title: "Itens adicionados ao carrinho",
        description: "Itens de outras telas foram adicionados à venda atual.",
      });

      if (onCartLoaded) {
        onCartLoaded();
      }
    }
  }, [initialCartItems, onCartLoaded, toast]);

  // Mock data for products and services
  const availableItems = [
    { id: '1', name: 'Ração Premium 15kg', type: 'product' as const, price: 89.90, stock: 25 },
    { id: '2', name: 'Shampoo Antipulgas', type: 'product' as const, price: 24.50, stock: 12 },
    { id: '3', name: 'Consulta Veterinária', type: 'service' as const, price: 120.00, stock: null },
    { id: '4', name: 'Banho e Tosa', type: 'service' as const, price: 45.00, stock: null },
    { id: '5', name: 'Vacina V8', type: 'service' as const, price: 35.00, stock: null },
  ];

  const customers = [
    { id: '1', name: 'João Silva', phone: '(11) 99999-1111' },
    { id: '2', name: 'Maria Santos', phone: '(11) 99999-2222' },
    { id: '3', name: 'Pedro Oliveira', phone: '(11) 99999-3333' },
  ];

  const filteredItems = availableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: typeof availableItems[0]) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.quantity + 1) * cartItem.unitPrice }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, {
        id: item.id,
        name: item.name,
        type: item.type,
        unitPrice: item.price,
        quantity: 1,
        total: item.price
      }]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice }
        : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = subtotal * (discount / 100);
    return subtotal - discountAmount;
  };
  
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'cash': return 'Dinheiro';
      case 'card': return 'Cartão';
      case 'pix': return 'PIX';
      case 'check': return 'Cheque';
      default: return 'Outro';
    }
  };
  
  const generateInvoice = (sale: Sale) => {
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
  };

  const processSale = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho para finalizar a venda.",
        variant: "destructive",
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: "Forma de pagamento",
        description: "Selecione uma forma de pagamento.",
        variant: "destructive",
      });
      return;
    }

    const subtotal = calculateSubtotal();
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal - discountAmount;
    
    const selectedCustomerData = customers.find(c => c.id === selectedCustomer);

    const newSale: Sale = {
      id: String(Date.now()),
      date: new Date(),
      customerName: selectedCustomerData ? selectedCustomerData.name : 'Cliente não identificado',
      customerPhone: selectedCustomerData?.phone,
      items: cartItems,
      subtotal: subtotal,
      discount: discountAmount,
      total: total,
      paymentMethod: getPaymentMethodName(paymentMethod),
      status: 'completed',
    };
    
    onSaleCompleted(newSale);
    generateInvoice(newSale);

    toast({
      title: "Venda finalizada",
      description: `Venda de R$ ${total.toFixed(2)} processada com sucesso!`,
    });

    setCartItems([]);
    setSelectedCustomer('');
    setPaymentMethod('');
    setDiscount(0);
    setSearchTerm('');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PDV - Ponto de Vendas</h1>
          <p className="text-gray-600">Sistema de vendas e serviços</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products and Services */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Produtos e Serviços</CardTitle>
              <CardDescription>Selecione os itens para venda</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Buscar produtos ou serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-2xl font-bold text-teal-600">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <Badge variant={item.type === 'product' ? 'default' : 'secondary'}>
                        {item.type === 'product' ? 'Produto' : 'Serviço'}
                      </Badge>
                    </div>
                    
                    {item.stock !== null && (
                      <p className="text-sm text-gray-500 mb-2">
                        Estoque: {item.stock} unidades
                      </p>
                    )}
                    
                    <Button
                      onClick={() => addToCart(item)}
                      className="w-full"
                      disabled={item.stock === 0}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart and Checkout */}
        <div className="space-y-6">
          {/* Customer Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Cart */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Carrinho ({cartItems.length})
                </CardTitle>
                {cartItems.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Carrinho vazio</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-teal-600 font-bold">R$ {item.unitPrice.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment */}
          {cartItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Desconto (%)</label>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Forma de Pagamento</label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Dinheiro</SelectItem>
                      <SelectItem value="card">Cartão</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="check">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto ({discount}%):</span>
                      <span>- R$ {(calculateSubtotal() * discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={processSale}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  size="lg"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Finalizar Venda
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
