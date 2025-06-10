
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Package, AlertTriangle, Calendar } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Product } from '@/types';

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Vacina V10',
      category: 'vacina',
      quantity: 15,
      minQuantity: 5,
      costPrice: 25.00,
      salePrice: 45.00,
      supplier: 'Zoetis',
      batch: 'V10-2024-001',
      expirationDate: new Date('2025-06-15'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Vacina Antirrábica',
      category: 'vacina',
      quantity: 3,
      minQuantity: 10,
      costPrice: 18.00,
      salePrice: 35.00,
      supplier: 'Virbac',
      batch: 'AR-2024-002',
      expirationDate: new Date('2025-03-20'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Ração Premium Cães',
      category: 'ração',
      quantity: 25,
      minQuantity: 10,
      costPrice: 35.00,
      salePrice: 65.00,
      supplier: 'Royal Canin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    costPrice: 0,
    salePrice: 0,
    supplier: '',
    batch: '',
    expirationDate: '',
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(p => p.quantity <= p.minQuantity);

  const getStockStatus = (product: Product) => {
    if (product.quantity === 0) return { status: 'out', label: 'Sem estoque', color: 'destructive' };
    if (product.quantity <= product.minQuantity) return { status: 'low', label: 'Estoque baixo', color: 'secondary' };
    return { status: 'good', label: 'Em estoque', color: 'default' };
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...editingProduct, 
              ...formData,
              expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : undefined,
              updatedAt: new Date() 
            }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      minQuantity: 0,
      costPrice: 0,
      salePrice: 0,
      supplier: '',
      batch: '',
      expirationDate: '',
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      minQuantity: product.minQuantity,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      supplier: product.supplier,
      batch: product.batch || '',
      expirationDate: product.expirationDate ? product.expirationDate.toISOString().split('T')[0] : '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const categories = ['vacina', 'medicamento', 'ração', 'acessório', 'higiene', 'brinquedo'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
          <p className="text-gray-600">Gerencie produtos e controle de estoque</p>
        </div>
      </div>

      {/* Alertas de estoque baixo */}
      {lowStockProducts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="w-5 h-5" />
              Alertas de Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <span className="font-medium">{product.name}</span>
                    <span className="mx-2">-</span>
                    <span className="text-sm text-gray-600">Restam {product.quantity} unidades</span>
                  </div>
                  <Badge variant="secondary">Estoque baixo</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Produtos em Estoque</CardTitle>
              <CardDescription>
                {filteredProducts.length} produtos cadastrados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do produto
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Nome do produto"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="supplier">Fornecedor</Label>
                    <Input
                      id="supplier"
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                      placeholder="Nome do fornecedor"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                      placeholder="Quantidade em estoque"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="minQuantity">Estoque Mínimo</Label>
                    <Input
                      id="minQuantity"
                      type="number"
                      value={formData.minQuantity}
                      onChange={(e) => setFormData({...formData, minQuantity: parseInt(e.target.value) || 0})}
                      placeholder="Quantidade mínima"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="costPrice">Preço de Custo (R$)</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      step="0.01"
                      value={formData.costPrice}
                      onChange={(e) => setFormData({...formData, costPrice: parseFloat(e.target.value) || 0})}
                      placeholder="0,00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="salePrice">Preço de Venda (R$)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      step="0.01"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({...formData, salePrice: parseFloat(e.target.value) || 0})}
                      placeholder="0,00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="batch">Lote</Label>
                    <Input
                      id="batch"
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                      placeholder="Número do lote"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="expirationDate">Data de Validade</Label>
                    <Input
                      id="expirationDate"
                      type="date"
                      value={formData.expirationDate}
                      onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, categoria ou fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Preços</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const status = getStockStatus(product);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.supplier}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.quantity} unidades</div>
                          <div className="text-sm text-gray-500">Min: {product.minQuantity}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Custo: R$ {product.costPrice.toFixed(2)}</div>
                          <div>Venda: R$ {product.salePrice.toFixed(2)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.expirationDate && (
                          <div className="flex items-center text-sm">
                            <Calendar className="w-3 h-3 mr-1" />
                            {product.expirationDate.toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.color as any}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
