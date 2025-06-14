
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Edit, Trash2, Search, Calendar as CalendarIcon, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AccountPayable {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
  supplier?: string;
  category: string;
  notes?: string;
  paymentDate?: Date;
  createdAt: Date;
}

const AccountsPayable: React.FC = () => {
  const { toast } = useToast();
  
  const [accounts, setAccounts] = useState<AccountPayable[]>([
    {
      id: '1',
      description: 'Fornecedor de Ração Premium',
      amount: 1500.00,
      dueDate: new Date('2024-12-25'),
      status: 'pending',
      supplier: 'Pet Food Ltda',
      category: 'Produtos',
      createdAt: new Date(),
    },
    {
      id: '2',
      description: 'Aluguel da Clínica',
      amount: 3500.00,
      dueDate: new Date('2024-12-30'),
      status: 'pending',
      category: 'Operacional',
      createdAt: new Date(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountPayable | null>(null);
  const [dueDateCalendar, setDueDateCalendar] = useState<Date | undefined>(undefined);

  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
    dueDate: undefined as Date | undefined,
    supplier: '',
    category: '',
    notes: '',
  });

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (!formData.description || !formData.amount || !formData.dueDate) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (editingAccount) {
      setAccounts(accounts.map(a => 
        a.id === editingAccount.id 
          ? { 
              ...editingAccount,
              description: formData.description,
              amount: formData.amount,
              dueDate: formData.dueDate,
              supplier: formData.supplier,
              category: formData.category,
              notes: formData.notes,
            }
          : a
      ));
      toast({
        title: "Conta atualizada",
        description: "A conta a pagar foi atualizada com sucesso.",
      });
    } else {
      const newAccount: AccountPayable = {
        id: Date.now().toString(),
        description: formData.description,
        amount: formData.amount,
        dueDate: formData.dueDate,
        supplier: formData.supplier,
        category: formData.category,
        notes: formData.notes,
        status: 'pending',
        createdAt: new Date(),
      };
      setAccounts([...accounts, newAccount]);
      toast({
        title: "Conta criada",
        description: "A conta a pagar foi criada com sucesso.",
      });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAccount(null);
    setDueDateCalendar(undefined);
    setFormData({
      description: '',
      amount: 0,
      dueDate: undefined,
      supplier: '',
      category: '',
      notes: '',
    });
  };

  const handleEdit = (account: AccountPayable) => {
    setEditingAccount(account);
    setFormData({
      description: account.description,
      amount: account.amount,
      dueDate: account.dueDate,
      supplier: account.supplier || '',
      category: account.category,
      notes: account.notes || '',
    });
    setDueDateCalendar(account.dueDate);
    setIsDialogOpen(true);
  };

  const handlePayment = (accountId: string) => {
    setAccounts(accounts.map(a => 
      a.id === accountId 
        ? { ...a, status: 'paid' as const, paymentDate: new Date() }
        : a
    ));
    toast({
      title: "Pagamento registrado",
      description: "O pagamento foi registrado com sucesso.",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: 'Pendente', variant: 'secondary' as const },
      'paid': { label: 'Pago', variant: 'default' as const },
      'overdue': { label: 'Vencido', variant: 'destructive' as const },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'outline' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const totalPending = accounts
    .filter(a => a.status === 'pending')
    .reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contas a Pagar</h1>
          <p className="text-gray-600">Gerencie suas contas e pagamentos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalPending.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contas Vencidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {accounts.filter(a => a.status === 'overdue').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pagas este Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {accounts.filter(a => a.status === 'paid').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Contas a Pagar</CardTitle>
              <CardDescription>
                {filteredAccounts.length} contas encontradas
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Conta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingAccount ? 'Editar Conta a Pagar' : 'Nova Conta a Pagar'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados da conta a pagar
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição *</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Ex: Fornecedor de Ração"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Valor *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                      placeholder="0,00"
                    />
                  </div>
                  
                  <div>
                    <Label>Data de Vencimento *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dueDateCalendar && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDateCalendar ? format(dueDateCalendar, "PPP", { locale: ptBR }) : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dueDateCalendar}
                          onSelect={(date) => {
                            setDueDateCalendar(date);
                            setFormData({...formData, dueDate: date});
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="produtos">Produtos</SelectItem>
                        <SelectItem value="operacional">Operacional</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="equipamentos">Equipamentos</SelectItem>
                        <SelectItem value="servicos">Serviços</SelectItem>
                      </SelectContent>
                    </Select>
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
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por descrição ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="paid">Pagas</SelectItem>
                <SelectItem value="overdue">Vencidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{account.description}</div>
                      <div className="text-sm text-gray-500">{account.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{account.supplier || '-'}</TableCell>
                  <TableCell className="font-medium">
                    R$ {account.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {format(account.dueDate, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{getStatusBadge(account.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {account.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePayment(account.id)}
                          className="text-green-600"
                        >
                          <DollarSign className="w-4 h-4" />
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

export default AccountsPayable;
