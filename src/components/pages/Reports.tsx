
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, TrendingUp, Users, Heart, Syringe, DollarSign } from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');

  // Mock data for charts
  const appointmentsData = [
    { month: 'Jan', count: 45 },
    { month: 'Fev', count: 52 },
    { month: 'Mar', count: 48 },
    { month: 'Abr', count: 61 },
    { month: 'Mai', count: 55 },
    { month: 'Jun', count: 67 },
  ];

  const servicesData = [
    { name: 'Consultas', value: 40, color: '#0088FE' },
    { name: 'Vacinas', value: 30, color: '#00C49F' },
    { name: 'Cirurgias', value: 20, color: '#FFBB28' },
    { name: 'Estética', value: 10, color: '#FF8042' },
  ];

  const financialData = [
    { month: 'Jan', receita: 8500, despesa: 3200 },
    { month: 'Fev', receita: 9200, despesa: 3800 },
    { month: 'Mar', receita: 7800, despesa: 3500 },
    { month: 'Abr', receita: 10500, despesa: 4200 },
    { month: 'Mai', receita: 9800, despesa: 3900 },
    { month: 'Jun', receita: 11200, despesa: 4500 },
  ];

  const exportReport = (format: 'pdf' | 'excel') => {
    // Mock export functionality
    alert(`Exportando relatório em ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análise e estatísticas do sistema</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <div className="w-48">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Visão Geral</SelectItem>
                <SelectItem value="appointments">Agendamentos</SelectItem>
                <SelectItem value="financial">Financeiro</SelectItem>
                <SelectItem value="animals">Animais</SelectItem>
                <SelectItem value="vaccines">Vacinas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 3 meses</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-12 w-12 text-teal-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Animais</p>
                <p className="text-2xl font-bold text-gray-900">324</p>
                <p className="text-xs text-green-600">+12% este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-12 w-12 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Agendamentos</p>
                <p className="text-2xl font-bold text-gray-900">67</p>
                <p className="text-xs text-green-600">+8% este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Syringe className="h-12 w-12 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vacinas Aplicadas</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-xs text-green-600">+15% este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-12 w-12 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                <p className="text-2xl font-bold text-gray-900">R$ 11.200</p>
                <p className="text-xs text-green-600">+18% este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos por Mês</CardTitle>
            <CardDescription>Evolução dos agendamentos nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Serviços</CardTitle>
            <CardDescription>Tipos de serviços mais realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={servicesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {servicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Financeiro */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Financeira</CardTitle>
          <CardDescription>Receitas vs Despesas nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value}`, '']} />
              <Bar dataKey="receita" fill="#10b981" name="Receita" />
              <Bar dataKey="despesa" fill="#ef4444" name="Despesa" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabela de Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Detalhado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Animais Cadastrados</h3>
                <p className="text-sm text-gray-600">Total de animais no sistema</p>
              </div>
              <Badge variant="secondary">324</Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Tutores Ativos</h3>
                <p className="text-sm text-gray-600">Tutores com animais cadastrados</p>
              </div>
              <Badge variant="secondary">198</Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Agendamentos Pendentes</h3>
                <p className="text-sm text-gray-600">Consultas marcadas para os próximos dias</p>
              </div>
              <Badge variant="outline">23</Badge>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Vacinas Vencendo</h3>
                <p className="text-sm text-gray-600">Vacinas com vencimento próximo</p>
              </div>
              <Badge variant="destructive">8</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
