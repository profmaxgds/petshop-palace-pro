
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Tag } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import type { ProductCategory } from '@/types';

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<(ProductCategory & { isVaccine?: boolean })[]>([
    {
      id: '1',
      name: 'Medicamentos',
      description: 'Medicamentos veterinários diversos',
      isActive: true,
      isVaccine: false,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Alimentação',
      description: 'Rações e suplementos alimentares',
      isActive: true,
      isVaccine: false,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Higiene',
      description: 'Produtos de limpeza e higiene',
      isActive: true,
      isVaccine: false,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Vacinas',
      description: 'Vacinas para animais',
      isActive: true,
      isVaccine: true,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<(ProductCategory & { isVaccine?: boolean }) | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isVaccine: false,
  });

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!formData.name) {
      return;
    }

    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { 
              ...editingCategory, 
              ...formData,
              updatedAt: new Date()
            }
          : c
      ));
    } else {
      const newCategory: (ProductCategory & { isVaccine?: boolean }) = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      isVaccine: false,
    });
  };

  const handleEdit = (category: (ProductCategory & { isVaccine?: boolean })) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      isVaccine: category.isVaccine || false,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  const toggleCategoryStatus = (categoryId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, isActive: !category.isActive, updatedAt: new Date() }
        : category
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias de Produtos</h1>
          <p className="text-gray-600">Organize os produtos por categorias</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Categorias</CardTitle>
              <CardDescription>
                {filteredCategories.length} categorias cadastradas
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                  </DialogTitle>
                  <DialogDescription>
                    Crie uma nova categoria para organizar os produtos
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">Nome da Categoria</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: Medicamentos"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descrição da categoria"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="isVaccine" checked={formData.isVaccine} onCheckedChange={(checked) => setFormData({...formData, isVaccine: !!checked})} />
                    <Label htmlFor="isVaccine" className="font-normal">Esta categoria é para vacinas</Label>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
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
              placeholder="Buscar categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="font-medium">{category.name}</span>
                      {category.isVaccine && <Badge variant="outline" className="ml-2 border-blue-600 text-blue-600">Vacina</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Badge variant={category.isActive ? 'default' : 'secondary'}>
                      {category.isActive ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {category.createdAt.toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCategoryStatus(category.id)}
                        className={category.isActive ? 'text-orange-600' : 'text-green-600'}
                      >
                        {category.isActive ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCategories;
