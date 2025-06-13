
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, Calendar, TrendingUp, Users, PlusCircle, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportData {
  id: string;
  name: string;
  category: 'animals' | 'vaccines' | 'appointments' | 'financial' | 'inventory';
  description: string;
  data: any[];
}

const Reports: React.FC = () => {
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Mock data for reports
  const animalsBySpecies = [
    { name: 'Cães', value: 45, color: '#0088FE' },
    { name: 'Gatos', value: 32, color: '#00C49F' },
    { name: 'Aves', value: 8, color: '#FFBB28' },
    { name: 'Outros', value: 5, color: '#FF8042' },
  ];

  const vaccinesPerMonth = [
    { month: 'Jan', vaccines: 24 },
    { month: 'Fev', vaccines: 31 },
    { month: 'Mar', vaccines: 28 },
    { month: 'Abr', vaccines: 35 },
    { month: 'Mai', vaccines: 42 },
    { month: 'Jun', vaccines: 38 },
  ];

  const appointmentsByStatus = [
    { status: 'Agendado', count: 15 },
    { status: 'Confirmado', count: 12 },
    { status: 'Concluído', count: 28 },
    { status: 'Cancelado', count: 5 },
  ];

  const financialData = [
    { month: 'Jan', receita: 12500, despesa: 8200 },
    { month: 'Fev', receita: 14200, despesa: 9100 },
    { month: 'Mar', receita: 13800, despesa: 8800 },
    { month: 'Abr', receita: 16100, despesa: 9500 },
    { month: 'Mai', receita: 18200, despesa: 10200 },
    { month: 'Jun', receita: 17500, despesa: 9800 },
  ];

  const topServices = [
    { service: 'Consulta Geral', count: 45, revenue: 3600 },
    { service: 'Vacinação', count: 38, revenue: 1520 },
    { service: 'Exame de Sangue', count: 22, revenue: 2640 },
    { service: 'Cirurgia', count: 8, revenue: 4800 },
    { service: 'Banho e Tosa', count: 35, revenue: 2100 },
  ];

  const inventoryAlerts = [
    { product: 'Vacina V8', currentStock: 5, minimumStock: 10, status: 'low' },
    { product: 'Ração Premium', currentStock: 2, minimumStock: 15, status: 'critical' },
    { product: 'Medicamento A', currentStock: 12, minimumStock: 8, status: 'ok' },
    { product: 'Shampoo Pet', currentStock: 7, minimumStock: 10, status: 'low' },
  ];

  const recentAnimals = [
    { name: 'Rex', species: 'Cão', tutor: 'João Silva', registrationDate: '2024-12-15' },
    { name: 'Luna', species: 'Gato', tutor: 'Maria Santos', registrationDate: '2024-12-14' },
    { name: 'Bob', species: 'Cão', tutor: 'Pedro Costa', registrationDate: '2024-12-13' },
    { name: 'Mimi', species: 'Gato', tutor: 'Ana Oliveira', registrationDate: '2024-12-12' },
  ];

  const handleExportReport = (reportType: string) => {
    let data: any[] = [];
    let filename = '';

    switch (reportType) {
      case 'animals':
        data = recentAnimals;
        filename = 'relatorio-animais.csv';
        break;
      case 'vaccines':
        data = vaccinesPerMonth;
        filename = 'relatorio-vacinas.csv';
        break;
      case 'appointments':
        data = appointmentsByStatus;
        filename = 'relatorio-agendamentos.csv';
        break;
      case 'financial':
        data = financialData;
        filename = 'relatorio-financeiro.csv';
        break;
      case 'inventory':
        data = inventoryAlerts;
        filename = 'relatorio-estoque.csv';
        break;
      default:
        return;
    }

    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, filename);
    
    toast({
      title: "Relatório exportado",
      description: `O relatório foi exportado como ${filename}`,
    });
  };

  const convertToCSV = (data: any[]): string => {
    if (!data.length) return '';

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    );

    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e relatórios do sistema</p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Configure os filtros para gerar relatórios personalizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  <SelectItem value="animals">Animais</SelectItem>
                  <SelectItem value="vaccines">Vacinas</SelectItem>
                  <SelectItem value="appointments">Agendamentos</SelectItem>
                  <SelectItem value="financial">Financeiro</SelectItem>
                  <SelectItem value="inventory">Estoque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="period">Período</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                  <SelectItem value="custom">Período personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={selectedPeriod !== 'custom'}
              />
            </div>
            
            <div>
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={selectedPeriod !== 'custom'}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Animais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90</div>
            <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacinas Aplicadas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">236</div>
            <p className="text-xs text-muted-foreground">+8% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60</div>
            <p className="text-xs text-muted-foreground">15 para hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 17.500</div>
            <p className="text-xs text-muted-foreground">-3% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Animais por Espécie</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('animals')}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={animalsBySpecies}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {animalsBySpecies.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Vacinas por Mês</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('vaccines')}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vaccinesPerMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vaccines" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Receita vs Despesa</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('financial')}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="receita" stroke="#00C49F" strokeWidth={2} />
                <Line type="monotone" dataKey="despesa" stroke="#FF8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Agendamentos por Status</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('appointments')}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentsByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Serviços Mais Realizados</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('services')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Relatório Completo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Receita</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topServices.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>{service.service}</TableCell>
                    <TableCell>{service.count}</TableCell>
                    <TableCell>R$ {service.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alertas de Estoque</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('inventory')}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Atual</TableHead>
                  <TableHead>Mínimo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryAlerts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>{item.minimumStock}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          item.status === 'critical' ? 'destructive' : 
                          item.status === 'low' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {item.status === 'critical' ? 'Crítico' : 
                         item.status === 'low' ? 'Baixo' : 'OK'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Animals */}
      <Card>
        <CardHeader>
          <CardTitle>Animais Cadastrados Recentemente</CardTitle>
          <CardDescription>Últimos animais adicionados ao sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Espécie</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Data de Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAnimals.map((animal, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{animal.name}</TableCell>
                  <TableCell>{animal.species}</TableCell>
                  <TableCell>{animal.tutor}</TableCell>
                  <TableCell>{new Date(animal.registrationDate).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
