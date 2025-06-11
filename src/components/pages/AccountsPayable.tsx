
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Edit, Trash2, Search, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AccountPayable } from '@/types/products';

const AccountsPayable = () => {
  const [accounts, setAccounts] = useState<AccountPayable[]>([
    {
      id: '1',
      description: 'Compra Pet Food Ltda - Ração Premium',
      amount: 900.00,
      dueDate: new Date('2024-12-15'),
      supplier: 'Pet Food Ltda',
      category: 'Estoque',
      status: 'pending',
      createdAt: new Date(),
    },
    {
      id: '2',
      description: 'Energia Elétrica - Dezembro',
      amount: 350.00,
      dueDate: new Date('2024-12-20'),
      supplier: 'Companhia de Energia',
      category: 'Utilidades',
      status: 'overdue',
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountPayable | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    dueDate: '',
    supplier: '',
    category: '',
  });

  const categories = ['Estoque', 'Utilidades', 'Fixas', 'Equipamentos', 'Marketing', 'Outros'];

  const handleSave = () => {
    if (editingAccount) {
      setAccounts(accounts.map(account => 
        account.id === editingAccount.id 
          ? {
              ...account,
              description: formData.description,
              amount: parseFloat(formData.amount),
              dueDate: new Date(formData.dueDate),
              supplier: formData.supplier,
              category: formData.category,
            }
          : account
      ));
    } else {
      const newAccount: AccountPayable = {
        id: Date.now().toString(),
        description: formData.description,
        amount: parseFloat(formData.amount),
        dueDate: new Date(formData.dueDate),
        supplier: formData.supplier,
        category: formData.category,
        status: 'pending',
        createdAt: new Date(),
      };
      setAccounts([...accounts, newAccount]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      dueDate: '',
      supplier: '',
      category: '',
    });
    setEditingAccount(null);
  };

  const handleEdit = (account: AccountPayable) => {
    setEditingAccount(account);
    setFormData({
      description: account.description,
      amount: account.amount.toString(),
      dueDate: account.dueDate.toISOString().split('T')[0],
      supplier: account.supplier,
      category: account.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
  };

  const handleMarkAsPaid = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { 
            ...account, 
            status: 'paid' as const, 
            paymentDate: new Date() 
          }
        : account
    ));
  };

  const filteredAccounts = accounts.filter(account =>
    account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Vencido</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contas a Pagar</h1>
          <p className="text-gray-600">Controle de contas e pagamentos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAccount ? 'Editar Conta' : 'Nova Conta a Pagar'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da conta
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descrição da conta"
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
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Valor</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Data de Vencimento</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  {editingAccount ? 'Salvar Alterações' : 'Criar Conta'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contas a Pagar</CardTitle>
          <CardDescription>
            Gerencie todas as contas e pagamentos
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar contas..."
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
                  <th className="text-left p-2">Descrição</th>
                  <th className="text-left p-2">Fornecedor</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-left p-2">Valor</th>
                  <th className="text-left p-2">Vencimento</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{account.description}</span>
                      </div>
                    </td>
                    <td className="p-2">{account.supplier}</td>
                    <td className="p-2">
                      <Badge variant="outline">{account.category}</Badge>
                    </td>
                    <td className="p-2">
                      <span className="font-bold">R$ {account.amount.toFixed(2)}</span>
                    </td>
                    <td className="p-2">
                      {account.dueDate.toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-2">
                      {getStatusBadge(account.status)}
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        {account.status !== 'paid' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleMarkAsPaid(account.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Pagar
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(account)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(account.id)}
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

export default AccountsPayable;
