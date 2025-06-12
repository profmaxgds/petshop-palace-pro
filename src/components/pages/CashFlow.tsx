
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { CashTransaction } from '@/types';

const CashFlow = () => {
  const [transactions] = useState<CashTransaction[]>([
    {
      id: '1',
      transactionDate: new Date('2024-01-15'),
      type: 'income',
      amount: 120.00,
      description: 'Consulta veterinária - Max',
      paymentMethod: 'card',
      category: 'Consultas',
      createdBy: '1',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      transactionDate: new Date('2024-01-14'),
      type: 'expense',
      amount: 250.00,
      description: 'Compra de medicamentos',
      paymentMethod: 'transfer',
      category: 'Produtos',
      createdBy: '1',
      createdAt: new Date('2024-01-14')
    }
  ]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = transaction.transactionDate;
    const matchesDate = (!startDate || transactionDate >= new Date(startDate)) &&
                       (!endDate || transactionDate <= new Date(endDate));
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesDate && matchesType;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const getTransactionBadge = (type: CashTransaction['type']) => {
    return type === 'income' ? (
      <Badge className="bg-green-100 text-green-800">
        <TrendingUp className="w-3 h-3 mr-1" />
        Entrada
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">
        <TrendingDown className="w-3 h-3 mr-1" />
        Saída
      </Badge>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      money: 'Dinheiro',
      card: 'Cartão',
      pix: 'PIX',
      transfer: 'Transferência'
    };
    return methods[method] || method;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Fluxo de Caixa</h1>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Entradas</SelectItem>
                  <SelectItem value="expense">Saídas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                  setTypeFilter('all');
                }}
                variant="outline"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Entradas</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalIncome.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Saídas</p>
                <p className="text-2xl font-bold text-red-600">R$ {totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className={`h-8 w-8 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saldo do Período</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R$ {balance.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Transações</p>
                <p className="text-2xl font-bold">{filteredTransactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Movimentações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium">{transaction.description}</h3>
                      <p className="text-sm text-gray-500">
                        {transaction.transactionDate.toLocaleDateString('pt-BR')} • 
                        {transaction.category} • 
                        {getPaymentMethodLabel(transaction.paymentMethod || '')}
                      </p>
                    </div>
                    {getTransactionBadge(transaction.type)}
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma transação encontrada para os filtros selecionados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlow;
