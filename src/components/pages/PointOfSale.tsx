import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, Plus, Minus, Trash2, Calculator, Receipt, Search, Dog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Sale, SaleItem } from '@/types/sales';
import type { Animal, Tutor, Breed } from '@/types';
import { Label } from '@/components/ui/label';

// MOCK DATA - In a real app, this would come from an API
const mockBreeds: Breed[] = [
    { id: '1', name: 'Golden Retriever', species: 'dog', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Persa', species: 'cat', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() }
];

const mockTutors: Tutor[] = [
    { id: '1', name: 'João Silva', cpf: '123.456.789-00', phone: '(11) 99999-9999', email: 'joao@email.com', address: { street: 'Rua A', number: '1', neighborhood: 'Bairro', city: 'Cidade', state: 'SP', zipCode: '12345-678' }, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Maria Santos', cpf: '987.654.321-00', phone: '(11) 99999-2222', email: 'maria@email.com', address: { street: 'Rua B', number: '2', neighborhood: 'Bairro', city: 'Cidade', state: 'SP', zipCode: '12345-678' }, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() }
];

const mockAnimals: Animal[] = [
    { id: '1', name: 'Rex', species: 'dog', breedId: '1', breed: mockBreeds[0], age: 3, sex: 'male', weight: 32.5, tutorId: '1', tutor: mockTutors[0], isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Luna', species: 'cat', breedId: '2', breed: mockBreeds[1], age: 2, sex: 'female', weight: 4.2, tutorId: '1', tutor: mockTutors[0], isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Thor', species: 'dog', breedId: '1', breed: mockBreeds[0], age: 5, sex: 'male', weight: 35, tutorId: '2', tutor: mockTutors[1], isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
];

const availableItems = [
    { id: 'prod-1', name: 'Ração Premium 15kg', type: 'product' as const, price: 89.90, stock: 25 },
    { id: 'prod-2', name: 'Shampoo Antipulgas', type: 'product' as const, price: 24.50, stock: 12 },
    { id: 'serv-1', name: 'Consulta Veterinária', type: 'service' as const, price: 120.00, stock: null },
    { id: 'serv-2', name: 'Banho e Tosa', type: 'service' as const, price: 45.00, stock: null },
    { id: 'serv-3', name: 'Vacina V8', type: 'service' as const, price: 35.00, stock: null },
];

interface PointOfSaleProps {
  onSaleCompleted: (sale: Sale) => void;
  initialCartItems?: SaleItem[] | null;
  onCartLoaded?: () => void;
}

const PointOfSale: React.FC<PointOfSaleProps> = ({ onSaleCompleted, initialCartItems, onCartLoaded }) => {
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<SaleItem[]>([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [discount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedAnimal = useMemo(() => mockAnimals.find(a => a.id === selectedAnimalId), [selectedAnimalId]);
  const customer = useMemo(() => selectedAnimal?.tutor, [selectedAnimal]);

  useEffect(() => {
    if (initialCartItems && initialCartItems.length > 0) {
      setCartItems(prevItems => {
        const newItems = [...prevItems];
        initialCartItems.forEach(initialItem => {
          const existingItemIndex = newItems.findIndex(item => item.id === initialItem.id);
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

      const firstItem = initialCartItems[0];
      if (firstItem.name.includes(' - ')) {
        const animalName = firstItem.name.split(' - ')[1];
        const animal = mockAnimals.find(a => a.name === animalName);
        if (animal) {
          setSelectedAnimalId(animal.id);
        }
      }

      if (onCartLoaded) {
        onCartLoaded();
      }
    }
  }, [initialCartItems, onCartLoaded, toast]);

  const filteredItems = availableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: typeof availableItems[0]) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
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
      item.id === id ? { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.total, 0), [cartItems]);
  const discountAmount = useMemo(() => subtotal * (discount / 100), [subtotal, discount]);
  const total = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);

  const getPaymentMethodName = (method: string) => {
    const map: { [key: string]: string } = { cash: 'Dinheiro', card: 'Cartão', pix: 'PIX', check: 'Cheque' };
    return map[method] || 'Outro';
  };
  
  const processSale = () => {
    if (cartItems.length === 0) {
      toast({ title: "Carrinho vazio", description: "Adicione itens para finalizar a venda.", variant: "destructive" });
      return;
    }
    if (!paymentMethod) {
      toast({ title: "Forma de pagamento", description: "Selecione uma forma de pagamento.", variant: "destructive" });
      return;
    }

    const newSale: Sale = {
      id: String(Date.now()),
      date: new Date(),
      customerName: customer ? customer.name : 'Cliente não identificado',
      customerPhone: customer?.phone,
      animalId: selectedAnimal?.id,
      animalName: selectedAnimal?.name,
      items: cartItems,
      subtotal: subtotal,
      discount: discountAmount,
      total: total,
      paymentMethod: getPaymentMethodName(paymentMethod),
      status: 'completed',
    };
    
    onSaleCompleted(newSale);
    // In a real app, you might want a setting for auto-printing
    // generateInvoice(newSale); 

    toast({
      title: "Venda finalizada",
      description: `Venda de R$ ${total.toFixed(2)} processada com sucesso!`,
    });

    // Reset state
    setCartItems([]);
    setSelectedAnimalId('');
    setPaymentMethod('');
    setDiscount(0);
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">PDV - Ponto de Vendas</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products and Services */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Produtos e Serviços</CardTitle>
              <CardDescription>Selecione os itens para adicionar à venda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar produtos ou serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-1">
                {filteredItems.map(item => (
                  <Card key={item.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <Badge variant={item.type === 'product' ? 'default' : 'secondary'}>
                          {item.type === 'product' ? 'Produto' : 'Serviço'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-2xl font-bold text-teal-600">R$ {item.price.toFixed(2)}</p>
                      {item.stock !== null && <p className="text-sm text-gray-500 mt-2">Estoque: {item.stock}</p>}
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button onClick={() => addToCart(item)} className="w-full" disabled={item.stock === 0}>
                        <Plus className="w-4 h-4 mr-2" /> Adicionar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart and Checkout */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Dog className="w-5 h-5 mr-2" /> Cliente e Animal</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedAnimalId} onValueChange={setSelectedAnimalId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar animal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidentified">Cliente não identificado</SelectItem>
                  {mockAnimals.map(animal => (
                    <SelectItem key={animal.id} value={animal.id}>
                      {animal.name} (Tutor: {animal.tutor.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {customer && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                  <p className="font-semibold">{customer.name}</p>
                  <p className="text-gray-600">{customer.phone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center"><ShoppingCart className="w-5 h-5 mr-2" /> Carrinho</CardTitle>
                <Badge variant="secondary">{cartItems.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="max-h-[30vh] overflow-y-auto p-1">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
              ) : (
                <div className="space-y-2 p-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} x R$ {item.unitPrice.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <p className="w-20 text-right font-medium text-sm">R$ {item.total.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {cartItems.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="flex items-center"><Calculator className="w-5 h-5 mr-2" /> Pagamento</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Desconto (%)</Label>
                  <Input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} min="0" max="100" />
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
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm"><span>Subtotal:</span><span>R$ {subtotal.toFixed(2)}</span></div>
                  {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Desconto:</span><span>- R$ {discountAmount.toFixed(2)}</span></div>}
                  <div className="flex justify-between text-lg font-bold"><span>Total:</span><span>R$ {total.toFixed(2)}</span></div>
                </div>
                <Button onClick={processSale} className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
                  <Receipt className="w-4 h-4 mr-2" /> Finalizar Venda
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
