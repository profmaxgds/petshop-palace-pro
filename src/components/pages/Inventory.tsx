import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Package, Search, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product, ProductCategory } from '@/types/products';

const Inventory = () => {
  const [categories] = useState<ProductCategory[]>([
    { id: 'cat1', name: 'Ração', isActive: true, isVaccine: false },
    { id: 'cat2', name: 'Medicamentos', isActive: true, isVaccine: false },
    { id: 'cat3', name: 'Brinquedos', isActive: true, isVaccine: false },
    { id: 'cat4', name: 'Acessórios', isActive: true, isVaccine: false },
    { id: 'cat5', name: 'Higiene', isActive: true, isVaccine: false },
    { id: 'cat6', name: 'Petiscos', isActive: true, isVaccine: false },
    { id: 'cat7', name: 'Vacinas', isActive: true, isVaccine: true },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Ração Premium Cães Adultos',
      categoryId: 'cat1',
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
      categoryId: 'cat2',
      quantity: 3,
      minQuantity: 5,
      costPrice: 25.00,
      salePrice: 35.00,
      supplier: 'Farmácia Veterinária',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [adjustmentData, setAdjustmentData] = useState({
    type: 'add',
    quantity: '',
    reason: '',
  });

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(product => product.quantity <= product.minQuantity);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
          <p className="text-gray-600">Controle e movimentação do estoque</p>
        </div>
      </div>

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
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="font-medium">{product.name}</span>
                  <Badge variant="destructive">
                    {product.quantity} / {product.minQuantity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Controle de Estoque</CardTitle>
          <CardDescription>
            Visualize e ajuste o estoque dos produtos
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
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
                  <th className="text-left p-2">Produto</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-left p-2">Estoque Atual</th>
                  <th className="text-left p-2">Estoque Mínimo</th>
                  <th className="text-left p-2">Valor Total</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const category = categories.find(c => c.id === product.categoryId);
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline">{category ? category.name : 'N/A'}</Badge>
                      </td>
                      <td className="p-2">
                        <span className="font-bold text-lg">{product.quantity}</span>
                      </td>
                      <td className="p-2">{product.minQuantity}</td>
                      <td className="p-2">R$ {(product.quantity * product.costPrice).toFixed(2)}</td>
                      <td className="p-2">
                        {product.quantity <= product.minQuantity ? (
                          <Badge variant="destructive">Baixo</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">Normal</Badge>
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
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
