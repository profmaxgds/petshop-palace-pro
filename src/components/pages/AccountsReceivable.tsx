
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, DollarSign, Calendar, Search } from 'lucide-react';
import { AccountReceivable, Tutor } from '@/types';
import { t } from '@/lib/i18n';

const AccountsReceivable = () => {
  const [accounts, setAccounts] = useState<AccountReceivable[]>([
    {
      id: '1',
      tutorId: '1',
      tutor: {
        id: '1',
        name: 'João Silva',
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999',
        email: 'joao@email.com',
        address: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        },
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      description: 'Consulta veterinária - Max',
      amount: 120.00,
      dueDate: new Date('2024-02-15'),
      status: 'pending',
      createdBy: '1',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountReceivable | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    tutorId: '',
    description: '',
    amount: 0,
    dueDate: '',
    paymentMethod: '',
    status: 'pending' as AccountReceivable['status']
  });

  const tutors = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAccount: AccountReceivable = {
      id: selectedAccount?.id || Date.now().toString(),
      ...formData,
      amount: Number(formData.amount),
      dueDate: new Date(formData.dueDate),
      paymentDate: formData.status === 'paid' ? new Date() : undefined,
      createdBy: '1',
      createdAt: selectedAccount?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (selectedAccount) {
      setAccounts(accounts.map(acc => acc.id === selectedAccount.id ? newAccount : acc));
    } else {
      setAccounts([...accounts, newAccount]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      tutorId: '',
      description: '',
      amount: 0,
      dueDate: '',
      paymentMethod: '',
      status: 'pending'
    });
    setSelectedAccount(null);
  };

  const handleEdit = (account: AccountReceivable) => {
    setSelectedAccount(account);
    setFormData({
      tutorId: account.tutorId,
      description: account.description,
      amount: account.amount,
      dueDate: account.dueDate.toISOString().split('T')[0],
      paymentMethod: account.paymentMethod || '',
      status: account.status
    });
    setIsDialogOpen(true);
  };

  const handleReceive = (id: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === id 
        ? { ...acc, status: 'paid' as const, paymentDate: new Date(), updatedAt: new Date() }
        : acc
    ));
  };

  const getStatusBadge = (status: AccountReceivable['status']) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const },
      paid: { label: 'Pago', variant: 'default' as const },
      overdue: { label: 'Vencido', variant: 'destructive' as const },
      cancelled: { label: 'Cancelado', variant: 'outline' as const }
    };

    return (
      <Badge variant={statusConfig[status].variant}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.tutor?.name.toLowerCase().includes(searchTerm.toLowerCase()) || '';
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPending = accounts
    .filter(acc => acc.status === 'pending')
    .reduce((sum, acc) => sum + acc.amount, 0);

  const totalReceived = accounts
    .filter(acc => acc.status === 'paid')
    .reduce((sum, acc) => sum + acc.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contas a Receber</h1>
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
                {selectedAccount ? 'Editar Conta a Receber' : 'Nova Conta a Receber'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="tutorId">Cliente</Label>
                <Select value={formData.tutorId} onValueChange={(value) => setFormData({ ...formData, tutorId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {tutors.map((tutor) => (
                      <SelectItem key={tutor.id} value={tutor.id}>
                        {tutor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a forma de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="money">Dinheiro</SelectItem>
                    <SelectItem value="card">Cartão</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="transfer">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: AccountReceivable['status']) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="overdue">Vencido</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {selectedAccount ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total a Receber</p>
                <p className="text-2xl font-bold">R$ {totalPending.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Recebido</p>
                <p className="text-2xl font-bold">R$ {totalReceived.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contas Pendentes</p>
                <p className="text-2xl font-bold">{accounts.filter(acc => acc.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Contas a Receber</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar contas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="overdue">Vencido</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium">{account.description}</h3>
                      <p className="text-sm text-gray-500">Cliente: {account.tutor?.name}</p>
                      <p className="text-sm text-gray-500">
                        Vencimento: {account.dueDate.toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    {getStatusBadge(account.status)}
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-green-600">
                      R$ {account.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {account.status === 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReceive(account.id)}
                      className="text-green-600"
                    >
                      Receber
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(account)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsReceivable;
