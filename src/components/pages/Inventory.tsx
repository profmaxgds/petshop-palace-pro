
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Package, Search, AlertTriangle, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product } from '@/types';

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([
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

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [adjustmentData, setAdjustmentData] = useState({
    type: 'add', // 'add' or 'remove'
    quantity: '',
    reason: '',
  });

  const categories = ['all', 'Ração', 'Medicamentos', 'Brinquedos', 'Acessórios', 'Higiene', 'Petiscos'];

  const handleAdjustment = () => {
    if (!adjustingProduct) return;

    const adjustmentQuantity = parseInt(adjustmentData.quantity);
    const newQuantity = adjustmentData.type === 'add' 
      ? adjustingProduct.quantity + adjustmentQuantity
      : adjustingProduct.quantity - adjustmentQuantity;

    setProducts(products.map(product => 
      product.id === adjustingProduct.id 
        ? { ...product, quantity: Math.max(0, newQuantity), updatedAt: new Date() }
        : product
    ));

    setAdjustmentData({ type: 'add', quantity: '', reason: '' });
    setAdjustingProduct(null);
    setIsAdjustmentDialogOpen(false);
  };

  const openAdjustmentDialog = (product: Product) => {
    setAdjustingProduct(product);
    setIsAdjustmentDialogOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter(product => product.quantity <= product.minQuantity);
  const totalValue = products.reduce((sum, product) => sum + (product.quantity * product.costPrice), 0);
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
          <p className="text-gray-600">Controle e movimentação do estoque</p>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Únicos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockProducts.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de estoque baixo */}
      {lowStockProducts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Produtos com Estoque Baixo
            </CardTitle>
            <CardDescription className="text-orange-600">
              {lowStockProducts.length} produto(s) com estoque abaixo do mínimo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <Badge variant="destructive">
                    {product.quantity} / {product.minQuantity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Controle de Estoque</CardTitle>
          <CardDescription>
            Visualize e ajuste o estoque dos produtos
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="max-w-sm">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Produto</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-left p-2">Estoque Atual</th>
                  <th className="text-left p-2">Estoque Mínimo</th>
                  <th className="text-left p-2">Valor Unitário</th>
                  <th className="text-left p-2">Valor Total</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="p-2">
                      <span className="font-bold text-lg">{product.quantity}</span>
                    </td>
                    <td className="p-2">{product.minQuantity}</td>
                    <td className="p-2">R$ {product.costPrice.toFixed(2)}</td>
                    <td className="p-2">R$ {(product.quantity * product.costPrice).toFixed(2)}</td>
                    <td className="p-2">
                      {product.quantity <= product.minQuantity ? (
                        <Badge variant="destructive">Baixo</Badge>
                      ) : product.quantity <= product.minQuantity * 2 ? (
                        <Badge variant="secondary">Médio</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">Alto</Badge>
                      )}
                    </td>
                    <td className="p-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAdjustmentDialog(product)}
                      >
                        Ajustar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Ajuste de Estoque */}
      <Dialog open={isAdjustmentDialogOpen} onOpenChange={setIsAdjustmentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajustar Estoque</DialogTitle>
            <DialogDescription>
              {adjustingProduct?.name} - Estoque atual: {adjustingProduct?.quantity}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="type">Tipo de Ajuste</Label>
              <Select value={adjustmentData.type} onValueChange={(value) => setAdjustmentData({...adjustmentData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                      Entrada
                    </div>
                  </SelectItem>
                  <SelectItem value="remove">
                    <div className="flex items-center">
                      <TrendingDown className="w-4 h-4 mr-2 text-red-600" />
                      Saída
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                value={adjustmentData.quantity}
                onChange={(e) => setAdjustmentData({...adjustmentData, quantity: e.target.value})}
                placeholder="Digite a quantidade"
              />
            </div>
            
            <div>
              <Label htmlFor="reason">Motivo</Label>
              <Input
                id="reason"
                value={adjustmentData.reason}
                onChange={(e) => setAdjustmentData({...adjustmentData, reason: e.target.value})}
                placeholder="Motivo do ajuste (opcional)"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAdjustmentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAdjustment}>
                Confirmar Ajuste
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
