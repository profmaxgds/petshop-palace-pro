
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Building2, DollarSign } from 'lucide-react';
import { BankAccount } from '@/types';

const Banks = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bank: 'Banco do Brasil',
      agency: '1234-5',
      account: '67890-1',
      holder: 'PetShop Ltda',
      accountType: 'business',
      balance: 15000.00,
      isActive: true,
      createdBy: '1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      bank: 'Itaú',
      agency: '5678',
      account: '12345-6',
      holder: 'PetShop Ltda',
      accountType: 'checking',
      balance: 8500.00,
      isActive: true,
      createdBy: '1',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-14')
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  const [formData, setFormData] = useState({
    bank: '',
    agency: '',
    account: '',
    holder: '',
    accountType: 'checking' as BankAccount['accountType'],
    balance: 0,
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAccount: BankAccount = {
      id: selectedAccount?.id || Date.now().toString(),
      ...formData,
      balance: Number(formData.balance),
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
      bank: '',
      agency: '',
      account: '',
      holder: '',
      accountType: 'checking',
      balance: 0,
      isActive: true
    });
    setSelectedAccount(null);
  };

  const handleEdit = (account: BankAccount) => {
    setSelectedAccount(account);
    setFormData({
      bank: account.bank,
      agency: account.agency || '',
      account: account.account || '',
      holder: account.holder || '',
      accountType: account.accountType,
      balance: account.balance,
      isActive: account.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta conta bancária?')) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === id 
        ? { ...acc, isActive: !acc.isActive, updatedAt: new Date() }
        : acc
    ));
  };

  const getAccountTypeBadge = (type: BankAccount['accountType']) => {
    const typeConfig = {
      checking: { label: 'Conta Corrente', variant: 'default' as const },
      savings: { label: 'Poupança', variant: 'secondary' as const },
      business: { label: 'Conta Empresarial', variant: 'outline' as const }
    };

    return (
      <Badge variant={typeConfig[type].variant}>
        {typeConfig[type].label}
      </Badge>
    );
  };

  const totalBalance = accounts
    .filter(acc => acc.isActive)
    .reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contas Bancárias</h1>
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
                {selectedAccount ? 'Editar Conta Bancária' : 'Nova Conta Bancária'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="bank">Banco</Label>
                <Input
                  id="bank"
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agency">Agência</Label>
                  <Input
                    id="agency"
                    value={formData.agency}
                    onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="account">Conta</Label>
                  <Input
                    id="account"
                    value={formData.account}
                    onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="holder">Titular</Label>
                <Input
                  id="holder"
                  value={formData.holder}
                  onChange={(e) => setFormData({ ...formData, holder: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="accountType">Tipo de Conta</Label>
                <Select 
                  value={formData.accountType} 
                  onValueChange={(value: BankAccount['accountType']) => setFormData({ ...formData, accountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Conta Corrente</SelectItem>
                    <SelectItem value="savings">Poupança</SelectItem>
                    <SelectItem value="business">Conta Empresarial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="balance">Saldo Inicial</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Conta ativa</Label>
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

      {/* Card de Resumo */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Saldo Total</p>
              <p className="text-2xl font-bold text-green-600">R$ {totalBalance.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contas Bancárias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{account.bank}</h3>
                      <p className="text-sm text-gray-500">
                        Ag: {account.agency} • Conta: {account.account}
                      </p>
                      {account.holder && (
                        <p className="text-sm text-gray-500">Titular: {account.holder}</p>
                      )}
                    </div>
                    {getAccountTypeBadge(account.accountType)}
                    <Badge variant={account.isActive ? 'default' : 'secondary'}>
                      {account.isActive ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Saldo</p>
                    <p className="text-lg font-bold text-green-600">
                      R$ {account.balance.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(account)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(account.id)}
                      className={account.isActive ? 'text-red-600' : 'text-green-600'}
                    >
                      {account.isActive ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(account.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Banks;
