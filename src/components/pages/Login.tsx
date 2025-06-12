
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Heart, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { toast } = useToast();

  // Usuários de exemplo para demonstração
  const mockUsers = [
    {
      id: '1',
      name: 'Administrador',
      email: 'admin@petshop.com',
      password: 'admin123',
      role: 'admin',
      permissions: { all: true }
    },
    {
      id: '2',
      name: 'Dr. João Silva',
      email: 'joao@petshop.com',
      password: 'vet123',
      role: 'veterinarian',
      permissions: { 
        animals: ['read', 'write'], 
        appointments: ['read', 'write'], 
        vaccines: ['read', 'write'] 
      }
    },
    {
      id: '3',
      name: 'Maria Recepção',
      email: 'maria@petshop.com',
      password: 'recep123',
      role: 'receptionist',
      permissions: { 
        tutors: ['read', 'write'], 
        animals: ['read'], 
        appointments: ['read', 'write'] 
      }
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verificar credenciais
      const user = mockUsers.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Simular criação de sessão
        const sessionData = {
          ...user,
          sessionToken: `token_${user.id}_${Date.now()}`,
          loginTime: new Date(),
          expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 horas
        };

        // Salvar no localStorage
        localStorage.setItem('petshop_session', JSON.stringify(sessionData));

        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${user.name}!`,
        });

        onLogin(sessionData);
      } else {
        toast({
          title: "Erro no login",
          description: "E-mail ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fillDemoCredentials = (userType: 'admin' | 'vet' | 'receptionist') => {
    const credentials = {
      admin: { email: 'admin@petshop.com', password: 'admin123' },
      vet: { email: 'joao@petshop.com', password: 'vet123' },
      receptionist: { email: 'maria@petshop.com', password: 'recep123' }
    };

    setFormData(credentials[userType]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-teal-600 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">PetShop System</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestão Veterinária</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700" 
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-center text-gray-600">Credenciais de demonstração:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('admin')}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('vet')}
                  className="text-xs"
                >
                  Veterinário
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('receptionist')}
                  className="text-xs"
                >
                  Recepção
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>© 2024 PetShop System. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
