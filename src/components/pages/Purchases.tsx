
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Edit, Trash2, Search, Calendar, Package } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Purchase, PurchaseItem, Product } from '@/types';

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: '1',
      supplierId: 'supplier-1',
      date: new Date('2024-12-10'),
      items: [
        {
          productId: '1',
          quantity: 20,
          unitPrice: 45.00,
          total: 900.00,
        },
        {
          productId: '2',
          quantity: 10,
          unitPrice: 25.00,
          total: 250.00,
        },
      ],
      total: 1150.00,
      status: 'completed',
      createdAt: new Date(),
    },
    {
      id: '2',
      supplierId: 'supplier-2',
      date: new Date('2024-12-08'),
      items: [
        {
          productId: '3',
          quantity: 15,
          unitPrice: 8.00,
          total: 120.00,
        },
      ],
      total: 120.00,
      status: 'pending',
      createdAt: new Date(),
    },
  ]);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Ração Premium Cães Adultos',
      category: 'Ração',
      quantity: 50,
      minQuantity: 10,
      costPrice: 45.00,
      salePrice: 65.00,
      supplier: 'Pet Food Ltda',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Antipulgas Gatos',
      category: 'Medicamentos',
      quantity: 25,
      minQuantity: 5,
      costPrice: 25.00,
      salePrice: 35.00,
      supplier: 'Farmácia Veterinária',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Brinquedo Corda',
      category: 'Brinquedos',
      quantity: 3,
      minQuantity: 5,
      costPrice: 8.00,
      salePrice: 15.00,
      supplier: 'Pet Toys Distribuidora',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [suppliers] = useState([
    { id: 'supplier-1', name: 'Pet Food Ltda' },
    { id: 'supplier-2', name: 'Pet Toys Distribuidora' },
    { id: 'supplier-3', name: 'Farmácia Veterinária' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [formData, setFormData] = useState({
    supplierId: '',
    date: new Date().toISOString().split('T')[0],
    items: [] as PurchaseItem[],
  });

  const [newItem, setNewItem] = useState({
    productId: '',
    quantity: '',
    unitPrice: '',
  });

  const handleAddItem = () => {
    if (!newItem.productId || !newItem.quantity || !newItem.unitPrice) return;

    const quantity = parseInt(newItem.quantity);
    const unitPrice = parseFloat(newItem.unitPrice);
    const total = quantity * unitPrice;

    const item: PurchaseItem = {
      productId: newItem.productId,
      quantity,
      unitPrice,
      total,
    };

    setFormData({
      ...formData,
      items: [...formData.items, item],
    });

    setNewItem({ productId: '', quantity: '', unitPrice: '' });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    const total = formData.items.reduce((sum, item) => sum + item.total, 0);

    if (editingPurchase) {
      setPurchases(purchases.map(purchase => 
        purchase.id === editingPurchase.id 
          ? {
              ...purchase,
              supplierId: formData.supplierId,
              date: new Date(formData.date),
              items: formData.items,
              total,
            }
          : purchase
      ));
    } else {
      const newPurchase: Purchase = {
        id: Date.now().toString(),
        supplierId: formData.supplierId,
        date: new Date(formData.date),
        items: formData.items,
        total,
        status: 'pending',
        createdAt: new Date(),
      };
      setPurchases([...purchases, newPurchase]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      supplierId: '',
      date: new Date().toISOString().split('T')[0],
      items: [],
    });
    setNewItem({ productId: '', quantity: '', unitPrice: '' });
    setEditingPurchase(null);
  };

  const handleEdit = (purchase: Purchase) => {
    setEditingPurchase(purchase);
    setFormData({
      supplierId: purchase.supplierId,
      date: purchase.date.toISOString().split('T')[0],
      items: purchase.items,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (purchaseId: string) => {
    setPurchases(purchases.filter(purchase => purchase.id !== purchaseId));
  };

  const handleCompletePurchase = (purchaseId: string) => {
    setPurchases(purchases.map(purchase => 
      purchase.id === purchaseId 
        ? { ...purchase, status: 'completed' as const }
        : purchase
    ));
    
    // Aqui você adicionaria a lógica para atualizar o estoque
    // e criar conta a pagar automaticamente
    console.log('Compra finalizada - atualizar estoque e criar conta a pagar');
  };

  const filteredPurchases = purchases.filter(purchase => {
    const supplier = suppliers.find(s => s.id === purchase.supplierId);
    return supplier?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getSupplierName = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId)?.name || 'Fornecedor';
  };

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || 'Produto';
  };

  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.total, 0);
  const pendingPurchases = purchases.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compras</h1>
          <p className="text-gray-600">Gerencie compras de produtos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Compra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPurchase ? 'Editar Compra' : 'Nova Compra'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da compra
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supplier">Fornecedor</Label>
                  <Select value={formData.supplierId} onValueChange={(value) => setFormData({...formData, supplierId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="date">Data da Compra</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Adicionar Item</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="product">Produto</Label>
                    <Select value={newItem.productId} onValueChange={(value) => setNewItem({...newItem, productId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitPrice">Preço Unitário</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.01"
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem({...newItem, unitPrice: e.target.value})}
                      placeholder="0,00"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddItem} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>

              {formData.items.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Itens da Compra</h3>
                  <div className="space-y-2">
                    {formData.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div className="flex-1">
                          <span className="font-medium">{getProductName(item.productId)}</span>
                          <div className="text-sm text-gray-600">
                            {item.quantity} x R$ {item.unitPrice.toFixed(2)} = R$ {item.total.toFixed(2)}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="text-right pt-2 border-t">
                      <span className="text-lg font-bold">
                        Total: R$ {formData.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={formData.items.length === 0}>
                  {editingPurchase ? 'Salvar Alterações' : 'Criar Compra'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalPurchases.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compras Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPurchases}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Compras</CardTitle>
          <CardDescription>
            Gerencie todas as compras realizadas
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Data</th>
                  <th className="text-left p-2">Fornecedor</th>
                  <th className="text-left p-2">Itens</th>
                  <th className="text-left p-2">Total</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      {purchase.date.toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{getSupplierName(purchase.supplierId)}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <span>{purchase.items.length} item(s)</span>
                    </td>
                    <td className="p-2">
                      <span className="font-bold">R$ {purchase.total.toFixed(2)}</span>
                    </td>
                    <td className="p-2">
                      <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                        {purchase.status === 'completed' ? 'Finalizada' : 'Pendente'}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        {purchase.status === 'pending' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleCompletePurchase(purchase.id)}
                          >
                            Finalizar
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(purchase)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(purchase.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Purchases;
