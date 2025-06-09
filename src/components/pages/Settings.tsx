
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Globe, Bell, Shield, Database, Mail } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';
import { t } from '@/lib/i18n';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('settings')}</h1>
        <p className="text-gray-600">Configure as preferências do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Perfil do Usuário */}
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

        {/* Configurações de Idioma */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Idioma e Região
            </CardTitle>
            <CardDescription>
              Configure o idioma da interface
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

        {/* Notificações */}
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

        {/* Segurança */}
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

        {/* Backup e Dados */}
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

        {/* Configurações de E-mail */}
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
      </div>
    </div>
  );
};

export default Settings;
