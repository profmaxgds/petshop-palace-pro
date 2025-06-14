import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Globe, Bell, Shield, Database, Mail, Building, FileText, Palette, Clock } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const [petShopData, setPetShopData] = useState({
    name: 'PetShop Amigo Fiel',
    cnpj: '12.345.678/0001-90',
    ie: '123.456.789.123',
    phone: '(11) 3456-7890',
    whatsapp: '(11) 99999-9999',
    email: 'contato@petshopamigofiel.com.br',
    website: 'www.petshopamigofiel.com.br',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Loja A',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    businessHours: {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '18:00', closed: false },
      saturday: { open: '08:00', close: '16:00', closed: false },
      sunday: { open: '09:00', close: '15:00', closed: false }
    },
    services: 'Consultas veterinárias, vacinação, cirurgias, banho e tosa, hotel, creche',
    mission: 'Oferecer o melhor cuidado e carinho para os pets, garantindo saúde e bem-estar.',
    vision: 'Ser referência em cuidados veterinários e serviços pet na região.',
    values: 'Amor aos animais, qualidade, responsabilidade, transparência e dedicação.'
  });

  const handleSavePetShopData = () => {
    // Aqui você salvaria os dados no backend
    toast({
      title: "Dados salvos",
      description: "As informações do PetShop foram atualizadas com sucesso.",
    });
  };

  const handleSaveBusinessHours = () => {
    toast({
      title: "Horários atualizados",
      description: "Os horários de funcionamento foram salvos com sucesso.",
    });
  };

  const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('settings')}</h1>
        <p className="text-gray-600">Configure as preferências do sistema e informações do PetShop</p>
      </div>

      <Tabs defaultValue="petshop" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="petshop">PetShop</TabsTrigger>
          <TabsTrigger value="user">Usuário</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="email">E-mail</TabsTrigger>
        </TabsList>

        <TabsContent value="petshop" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dados da Empresa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Dados da Empresa
                </CardTitle>
                <CardDescription>
                  Informações básicas do PetShop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="petshop-name">Nome da Empresa</Label>
                  <Input 
                    id="petshop-name" 
                    value={petShopData.name}
                    onChange={(e) => setPetShopData({...petShopData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input 
                      id="cnpj" 
                      value={petShopData.cnpj}
                      onChange={(e) => setPetShopData({...petShopData, cnpj: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input 
                      id="ie" 
                      value={petShopData.ie}
                      onChange={(e) => setPetShopData({...petShopData, ie: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      value={petShopData.phone}
                      onChange={(e) => setPetShopData({...petShopData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input 
                      id="whatsapp" 
                      value={petShopData.whatsapp}
                      onChange={(e) => setPetShopData({...petShopData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email-company">E-mail</Label>
                  <Input 
                    id="email-company" 
                    type="email" 
                    value={petShopData.email}
                    onChange={(e) => setPetShopData({...petShopData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={petShopData.website}
                    onChange={(e) => setPetShopData({...petShopData, website: e.target.value})}
                  />
                </div>
                <Button onClick={handleSavePetShopData} className="bg-teal-600 hover:bg-teal-700">
                  Salvar Dados da Empresa
                </Button>
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card>
              <CardHeader>
                <CardTitle>Endereço</CardTitle>
                <CardDescription>
                  Localização do PetShop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Label htmlFor="street">Rua/Avenida</Label>
                    <Input 
                      id="street" 
                      value={petShopData.address.street}
                      onChange={(e) => setPetShopData({...petShopData, address: {...petShopData.address, street: e.target.value}})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input 
                      id="number" 
                      value={petShopData.address.number}
                      onChange={(e) => setPetShopData({...petShopData, address: {...petShopData.address, number: e.target.value}})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input 
                    id="complement" 
                    value={petShopData.address.complement}
                    onChange={(e) => setPetShopData({...petShopData, address: {...petShopData.address, complement: e.target.value}})}
                  />
                </div>
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input 
                    id="neighborhood" 
                    value={petShopData.address.neighborhood}
                    onChange={(e) => setPetShopData({...petShopData, address: {...petShopData.address, neighborhood: e.target.value}})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input 
                      id="city" 
                      value={petShopData.address.city}
                      onChange={(e) => setPetShopData({...petShopData, address: {...petShopData.address, city: e.target.value}})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Select 
                      value={petShopData.address.state}
                      onValueChange={(value) => setPetShopData({...petShopData, address: {...petShopData.address, state: value}})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        {/* Adicionar outros estados */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input 
                    id="zipCode" 
                    value={petShopData.address.zipCode}
                    onChange={(e) => setPetShopData({...petShopData, address: {...petShopData.address, zipCode: e.target.value}})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Horário de Funcionamento */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Horário de Funcionamento
                </CardTitle>
                <CardDescription>
                  Configure os horários de abertura e fechamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(dayNames).map(([key, name]) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-32">
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={!petShopData.businessHours[key as keyof typeof petShopData.businessHours].closed}
                        onCheckedChange={(checked) => 
                          setPetShopData({
                            ...petShopData,
                            businessHours: {
                              ...petShopData.businessHours,
                              [key]: {
                                ...petShopData.businessHours[key as keyof typeof petShopData.businessHours],
                                closed: !checked
                              }
                            }
                          })
                        }
                      />
                      {!petShopData.businessHours[key as keyof typeof petShopData.businessHours].closed && (
                        <>
                          <Input
                            type="time"
                            className="w-24"
                            value={petShopData.businessHours[key as keyof typeof petShopData.businessHours].open}
                            onChange={(e) => 
                              setPetShopData({
                                ...petShopData,
                                businessHours: {
                                  ...petShopData.businessHours,
                                  [key]: {
                                    ...petShopData.businessHours[key as keyof typeof petShopData.businessHours],
                                    open: e.target.value
                                  }
                                }
                              })
                            }
                          />
                          <span>às</span>
                          <Input
                            type="time"
                            className="w-24"
                            value={petShopData.businessHours[key as keyof typeof petShopData.businessHours].close}
                            onChange={(e) => 
                              setPetShopData({
                                ...petShopData,
                                businessHours: {
                                  ...petShopData.businessHours,
                                  [key]: {
                                    ...petShopData.businessHours[key as keyof typeof petShopData.businessHours],
                                    close: e.target.value
                                  }
                                }
                              })
                            }
                          />
                        </>
                      )}
                      {petShopData.businessHours[key as keyof typeof petShopData.businessHours].closed && (
                        <span className="text-gray-500">Fechado</span>
                      )}
                    </div>
                  </div>
                ))}
                <Button onClick={handleSaveBusinessHours} className="bg-teal-600 hover:bg-teal-700">
                  Salvar Horários
                </Button>
              </CardContent>
            </Card>

            {/* Sobre a Empresa */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Sobre a Empresa
                </CardTitle>
                <CardDescription>
                  Missão, visão, valores e serviços
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="services">Serviços Oferecidos</Label>
                  <Textarea 
                    id="services" 
                    value={petShopData.services}
                    onChange={(e) => setPetShopData({...petShopData, services: e.target.value})}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="mission">Missão</Label>
                  <Textarea 
                    id="mission" 
                    value={petShopData.mission}
                    onChange={(e) => setPetShopData({...petShopData, mission: e.target.value})}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="vision">Visão</Label>
                  <Textarea 
                    id="vision" 
                    value={petShopData.vision}
                    onChange={(e) => setPetShopData({...petShopData, vision: e.target.value})}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="values">Valores</Label>
                  <Textarea 
                    id="values" 
                    value={petShopData.values}
                    onChange={(e) => setPetShopData({...petShopData, values: e.target.value})}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Perfil do Usuário
              </CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue="Dr. João Silva" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" defaultValue="joao@petshop.com" />
              </div>
              <div>
                <Label htmlFor="role">Função</Label>
                <Input id="role" defaultValue="Veterinário" disabled />
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>
                Configure idioma, região e outras preferências
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Idioma do Sistema</Label>
                <div className="mt-2">
                  <LanguageSelector />
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Input id="timezone" defaultValue="America/Sao_Paulo" />
              </div>
              <div>
                <Label htmlFor="currency">Moeda</Label>
                <Input id="currency" defaultValue="BRL - Real Brasileiro" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure quando receber alertas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Vacinas Vencendo</Label>
                  <p className="text-sm text-gray-500">Alertas de vacinas próximas do vencimento</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Estoque Baixo</Label>
                  <p className="text-sm text-gray-500">Quando produtos estiverem com estoque baixo</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Contas a Receber</Label>
                  <p className="text-sm text-gray-500">Lembretes de pagamentos pendentes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Agendamentos</Label>
                  <p className="text-sm text-gray-500">Confirmações de consultas e serviços</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </CardTitle>
              <CardDescription>
                Configurações de segurança e acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button variant="outline">
                Alterar Senha
              </Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autenticação em Duas Etapas</Label>
                  <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup e Dados */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup e Dados
              </CardTitle>
              <CardDescription>
                Gerencie seus dados e backups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-gray-500">Backup diário dos dados</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Ações de Dados</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Fazer Backup
                  </Button>
                  <Button variant="outline" size="sm">
                    Exportar Dados
                  </Button>
                </div>
              </div>
              <div>
                <Label>Último Backup</Label>
                <p className="text-sm text-gray-500">hoje às 03:00</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de E-mail */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Configurações de E-mail
              </CardTitle>
              <CardDescription>
                Configure o envio de e-mails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="smtpServer">Servidor SMTP</Label>
                <Input id="smtpServer" placeholder="smtp.gmail.com" />
              </div>
              <div>
                <Label htmlFor="smtpPort">Porta</Label>
                <Input id="smtpPort" placeholder="587" />
              </div>
              <div>
                <Label htmlFor="emailUsername">Usuário</Label>
                <Input id="emailUsername" placeholder="seu@email.com" />
              </div>
              <div>
                <Label htmlFor="emailPassword">Senha</Label>
                <Input id="emailPassword" type="password" placeholder="Senha do e-mail" />
              </div>
              <Button variant="outline">
                Testar Configuração
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
