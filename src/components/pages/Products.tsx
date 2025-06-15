import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product, ProductCategory } from '@/types/products';

const Products = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([
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
        name: 'Vacina V10 Importada',
        categoryId: 'cat7', // Vacinas
        quantity: 15,
        minQuantity: 5,
        costPrice: 30.00,
        salePrice: 55.00,
        supplier: 'Vet Supply',
        createdAt: new Date(),
        updatedAt: new Date(),
        batch: 'V10-2025-01',
        expirationDate: '2025-12-31',
        vaccineType: 'Polivalente',
        manufacturer: 'Major Vet',
        mapaRegistration: 'MAPA SP 0001-1',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    quantity: '',
    minQuantity: '',
    costPrice: '',
    salePrice: '',
    supplier: '',
    batch: '',
    expirationDate: '',
    vaccineType: '',
    manufacturer: '',
    mapaRegistration: '',
  });

  const handleSave = () => {
    const selectedCategory = categories.find(c => c.id === formData.categoryId);

    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? {
              ...product,
              name: formData.name,
              categoryId: formData.categoryId,
              quantity: parseInt(formData.quantity) || 0,
              minQuantity: parseInt(formData.minQuantity) || 0,
              costPrice: parseFloat(formData.costPrice) || 0,
              salePrice: parseFloat(formData.salePrice) || 0,
              supplier: formData.supplier,
              updatedAt: new Date(),
              batch: selectedCategory?.isVaccine ? formData.batch : undefined,
              expirationDate: selectedCategory?.isVaccine ? formData.expirationDate : undefined,
              vaccineType: selectedCategory?.isVaccine ? formData.vaccineType : undefined,
              manufacturer: selectedCategory?.isVaccine ? formData.manufacturer : undefined,
              mapaRegistration: selectedCategory?.isVaccine ? formData.mapaRegistration : undefined,
            }
          : product
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        categoryId: formData.categoryId,
        quantity: parseInt(formData.quantity) || 0,
        minQuantity: parseInt(formData.minQuantity) || 0,
        costPrice: parseFloat(formData.costPrice) || 0,
        salePrice: parseFloat(formData.salePrice) || 0,
        supplier: formData.supplier,
        createdAt: new Date(),
        updatedAt: new Date(),
        batch: selectedCategory?.isVaccine ? formData.batch : undefined,
        expirationDate: selectedCategory?.isVaccine ? formData.expirationDate : undefined,
        vaccineType: selectedCategory?.isVaccine ? formData.vaccineType : undefined,
        manufacturer: selectedCategory?.isVaccine ? formData.manufacturer : undefined,
        mapaRegistration: selectedCategory?.isVaccine ? formData.mapaRegistration : undefined,
      };
      setProducts([...products, newProduct]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      categoryId: '',
      quantity: '',
      minQuantity: '',
      costPrice: '',
      salePrice: '',
      supplier: '',
      batch: '',
      expirationDate: '',
      vaccineType: '',
      manufacturer: '',
      mapaRegistration: '',
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      quantity: product.quantity.toString(),
      minQuantity: product.minQuantity.toString(),
      costPrice: product.costPrice.toString(),
      salePrice: product.salePrice.toString(),
      supplier: product.supplier,
      batch: product.batch || '',
      expirationDate: product.expirationDate || '',
      vaccineType: product.vaccineType || '',
      manufacturer: product.manufacturer || '',
      mapaRegistration: product.mapaRegistration || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    const category = categories.find(c => c.id === product.categoryId);
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (category && category.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const isVaccineCategorySelected = categories.find(c => c.id === formData.categoryId)?.isVaccine;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">Gerencie o catálogo de produtos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do produto
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
              <div>
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Digite o nome do produto"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData({...formData, categoryId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isVaccineCategorySelected && (
                <Card className="p-4 bg-gray-50">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Informações da Vacina</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="batch">Lote</Label>
                        <Input id="batch" value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})} placeholder="Lote do produto" />
                      </div>
                      <div>
                        <Label htmlFor="expirationDate">Data de Validade</Label>
                        <Input id="expirationDate" type="date" value={formData.expirationDate} onChange={(e) => setFormData({...formData, expirationDate: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="vaccineType">Tipo de Vacina</Label>
                      <Input id="vaccineType" value={formData.vaccineType} onChange={(e) => setFormData({...formData, vaccineType: e.target.value})} placeholder="Ex: V10, Antirrábica" />
                    </div>
                    <div>
                      <Label htmlFor="manufacturer">Fabricante</Label>
                      <Input id="manufacturer" value={formData.manufacturer} onChange={(e) => setFormData({...formData, manufacturer: e.target.value})} placeholder="Nome do fabricante" />
                    </div>
                    <div>
                      <Label htmlFor="mapaRegistration">Registro MAPA</Label>
                      <Input id="mapaRegistration" value={formData.mapaRegistration} onChange={(e) => setFormData({...formData, mapaRegistration: e.target.value})} placeholder="Registro no Ministério da Agricultura" />
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="minQuantity">Estoque Mínimo</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({...formData, minQuantity: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="costPrice">Preço de Custo</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <Label htmlFor="salePrice">Preço de Venda</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
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
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>
            Gerencie todos os produtos do seu estoque
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
                  <th className="text-left p-2">Estoque</th>
                  <th className="text-left p-2">Preço Custo</th>
                  <th className="text-left p-2">Preço Venda</th>
                  <th className="text-left p-2">Fornecedor</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const category = categories.find(c => c.id === product.categoryId);
                  const isVaccine = category?.isVaccine;
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{product.name}</span>
                          {isVaccine && <Badge variant="outline" className="ml-2 border-blue-600 text-blue-600">Vacina</Badge>}
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline">{category ? category.name : 'N/A'}</Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <span>{product.quantity}</span>
                          {product.quantity <= product.minQuantity && (
                            <Badge variant="destructive" className="text-xs">Baixo</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2">R$ {product.costPrice.toFixed(2)}</td>
                      <td className="p-2">R$ {product.salePrice.toFixed(2)}</td>
                      <td className="p-2">{product.supplier}</td>
                      <td className="p-2">
                        <div className="flex space-x-2">
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
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
