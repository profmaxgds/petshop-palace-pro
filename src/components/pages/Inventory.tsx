
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Edit, Trash2, Search, AlertTriangle, Calendar } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { Product } from '@/types';

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Vacina V8',
      category: 'vaccine',
      description: 'Vacina óctupla para cães',
      quantity: 15,
      minQuantity: 5,
      costPrice: 45.00,
      salePrice: 80.00,
      supplier: 'Laboratório VetMax',
      batch: 'VX2024001',
      expirationDate: new Date('2025-06-15'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Vacina Antirrábica',
      category: 'vaccine',
      description: 'Vacina contra raiva',
      quantity: 8,
      minQuantity: 10,
      costPrice: 25.00,
      salePrice: 45.00,
      supplier: 'Laboratório VetMax',
      batch: 'VR2024002',
      expirationDate: new Date('2025-12-31'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Ração Golden Special',
      category: 'food',
      description: 'Ração premium para cães adultos - 15kg',
      quantity: 25,
      minQuantity: 10,
      costPrice: 85.00,
      salePrice: 150.00,
      supplier: 'Distribuidora Pet',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'vaccine' as Product['category'],
    description: '',
    quantity: '',
    minQuantity: '',
    costPrice: '',
    salePrice: '',
    supplier: '',
    batch: '',
    expirationDate: '',
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter(product => product.quantity <= product.minQuantity);

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...editingProduct, 
              ...formData,
              quantity: parseInt(formData.quantity),
              minQuantity: parseInt(formData.minQuantity),
              costPrice: parseFloat(formData.costPrice),
              salePrice: parseFloat(formData.salePrice),
              expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : undefined,
              updatedAt: new Date(),
            }
          : product
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        quantity: parseInt(formData.quantity),
        minQuantity: parseInt(formData.minQuantity),
        costPrice: parseFloat(formData.costPrice),
        salePrice: parseFloat(formData.salePrice),
        expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'vaccine',
      description: '',
      quantity: '',
      minQuantity: '',
      costPrice: '',
      salePrice: '',
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
      description: product.description || '',
      quantity: product.quantity.toString(),
      minQuantity: product.minQuantity.toString(),
      costPrice: product.costPrice.toString(),
      salePrice: product.salePrice.toString(),
      supplier: product.supplier,
      batch: product.batch || '',
      expirationDate: product.expirationDate ? product.expirationDate.toISOString().split('T')[0] : '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'vaccine': return 'Vacina';
      case 'medication': return 'Medicamento';
      case 'food': return 'Ração';
      case 'accessory': return 'Acessório';
      case 'hygiene': return 'Higiene';
      case 'other': return 'Outros';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vaccine': return 'bg-blue-100 text-blue-800';
      case 'medication': return 'bg-green-100 text-green-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'accessory': return 'bg-purple-100 text-purple-800';
      case 'hygiene': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-600">Gestão de produtos e materiais</p>
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
                <div key={product.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="font-medium">{product.name}</span>
                  <Badge variant="destructive">
                    {product.quantity} unidades (mín: {product.minQuantity})
                  </Badge>
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
                {filteredProducts.length} produtos encontrados
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do produto
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: Vacina V8"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value as Product['category']})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vaccine">Vacina</SelectItem>
                        <SelectItem value="medication">Medicamento</SelectItem>
                        <SelectItem value="food">Ração</SelectItem>
                        <SelectItem value="accessory">Acessório</SelectItem>
                        <SelectItem value="hygiene">Higiene</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descrição do produto"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="minQuantity">Quantidade Mínima</Label>
                    <Input
                      id="minQuantity"
                      type="number"
                      value={formData.minQuantity}
                      onChange={(e) => setFormData({...formData, minQuantity: e.target.value})}
                      placeholder="0"
                    />
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
                    <Label htmlFor="costPrice">Preço de Custo (R$)</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      step="0.01"
                      value={formData.costPrice}
                      onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="salePrice">Preço de Venda (R$)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      step="0.01"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="batch">Lote (opcional)</Label>
                    <Input
                      id="batch"
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                      placeholder="Número do lote"
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <Label htmlFor="expirationDate">Data de Validade (opcional)</Label>
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
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    {t('save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por produto ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="vaccine">Vacinas</SelectItem>
                <SelectItem value="medication">Medicamentos</SelectItem>
                <SelectItem value="food">Ração</SelectItem>
                <SelectItem value="accessory">Acessórios</SelectItem>
                <SelectItem value="hygiene">Higiene</SelectItem>
                <SelectItem value="other">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Preços</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          {product.description && (
                            <div className="text-sm text-gray-500">{product.description}</div>
                          )}
                          {product.batch && (
                            <div className="text-xs text-gray-400">Lote: {product.batch}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(product.category)}>
                        {getCategoryLabel(product.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`font-medium ${product.quantity <= product.minQuantity ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.quantity} unidades
                        </div>
                        <div className="text-sm text-gray-500">
                          Mín: {product.minQuantity}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          Custo: <span className="font-medium">R$ {product.costPrice.toFixed(2)}</span>
                        </div>
                        <div className="text-sm">
                          Venda: <span className="font-medium text-green-600">R$ {product.salePrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{product.supplier}</div>
                    </TableCell>
                    <TableCell>
                      {product.expirationDate ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3" />
                          {product.expirationDate.toLocaleDateString('pt-BR')}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
