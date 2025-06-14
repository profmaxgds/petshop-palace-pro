
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Building2, DollarSign } from 'lucide-react';
import type { BankAccount } from '@/types';

const Banks: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: 'Conta Corrente Principal',
      bankCode: '001',
      agency: '1234',
      account: '12345-6',
      type: 'checking',
      balance: 15000.00,
      isActive: true,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Poupança Reserva',
      bankCode: '341',
      agency: '5678',
      account: '98765-4',
      type: 'savings',
      balance: 25000.00,
      isActive: true,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    bankCode: '',
    agency: '',
    account: '',
    type: 'checking' as 'checking' | 'savings',
    balance: 0,
  });

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.bankCode.includes(searchTerm) ||
    account.agency.includes(searchTerm)
  );

  const totalBalance = accounts
    .filter(account => account.isActive)
    .reduce((sum, account) => sum + account.balance, 0);

  const handleSave = () => {
    if (!formData.name || !formData.bankCode || !formData.agency || !formData.account) {
      return;
    }

    if (editingAccount) {
      setAccounts(accounts.map(a => 
        a.id === editingAccount.id 
          ? { 
              ...editingAccount, 
              ...formData,
              updatedAt: new Date()
            }
          : a
      ));
    } else {
      const newAccount: BankAccount = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAccounts([...accounts, newAccount]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingAccount(null);
    setFormData({
      name: '',
      bankCode: '',
      agency: '',
      account: '',
      type: 'checking',
      balance: 0,
    });
  };

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      bankCode: account.bankCode,
      agency: account.agency,
      account: account.account,
      type: account.type,
      balance: account.balance,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (accountId: string) => {
    setAccounts(accounts.filter(a => a.id !== accountId));
  };

  const toggleAccountStatus = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, isActive: !account.isActive, updatedAt: new Date() }
        : account
    ));
  };

  const getBankName = (bankCode: string) => {
    const banks: Record<string, string> = {
      '001': 'Banco do Brasil',
      '104': 'Caixa Econômica',
      '237': 'Bradesco',
      '341': 'Itaú',
      '033': 'Santander',
      '748': 'Sicredi',
      '756': 'Sicoob',
    };
    return banks[bankCode] || `Banco ${bankCode}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contas Bancárias</h1>
          <p className="text-gray-600">Gerencie as contas bancárias da clínica</p>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contas Ativas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {accounts.filter(a => a.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saldo Total</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {totalBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conta Corrente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {accounts.filter(a => a.type === 'checking' && a.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Contas</CardTitle>
              <CardDescription>
                {filteredAccounts.length} contas cadastradas
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Conta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingAccount ? 'Editar Conta' : 'Nova Conta Bancária'}
                  </DialogTitle>
                  <DialogDescription>
                    Cadastre uma nova conta bancária
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">Nome da Conta</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Conta Corrente Principal"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bankCode">Código do Banco</Label>
                    <Select value={formData.bankCode} onValueChange={(value) => setFormData({...formData, bankCode: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o banco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="001">001 - Banco do Brasil</SelectItem>
                        <SelectItem value="104">104 - Caixa Econômica</SelectItem>
                        <SelectItem value="237">237 - Bradesco</SelectItem>
                        <SelectItem value="341">341 - Itaú</SelectItem>
                        <SelectItem value="033">033 - Santander</SelectItem>
                        <SelectItem value="748">748 - Sicredi</SelectItem>
                        <SelectItem value="756">756 - Sicoob</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="agency">Agência</Label>
                      <Input
                        id="agency"
                        value={formData.agency}
                        onChange={(e) => setFormData({...formData, agency: e.target.value})}
                        placeholder="1234"
                      />
                    </div>
                    <div>
                      <Label htmlFor="account">Conta</Label>
                      <Input
                        id="account"
                        value={formData.account}
                        onChange={(e) => setFormData({...formData, account: e.target.value})}
                        placeholder="12345-6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Tipo de Conta</Label>
                    <Select value={formData.type} onValueChange={(value: 'checking' | 'savings') => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Conta Corrente</SelectItem>
                        <SelectItem value="savings">Poupança</SelectItem>
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
                      onChange={(e) => setFormData({...formData, balance: parseFloat(e.target.value)})}
                      placeholder="0.00"
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
              placeholder="Buscar contas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conta</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-sm text-gray-500">
                        Ag: {account.agency} | CC: {account.account}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                      {getBankName(account.bankCode)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={account.type === 'checking' ? 'default' : 'secondary'}>
                      {account.type === 'checking' ? 'Conta Corrente' : 'Poupança'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">R$ {account.balance.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={account.isActive ? 'default' : 'secondary'}>
                      {account.isActive ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                        onClick={() => toggleAccountStatus(account.id)}
                        className={account.isActive ? 'text-orange-600' : 'text-green-600'}
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

export default Banks;
