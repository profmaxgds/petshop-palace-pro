
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Plus, Edit, Trash2, Shield, UserCog, Key } from 'lucide-react';
import { User, Profile } from '@/types';
import { t } from '@/lib/i18n';

const Users = () => {
  const mockProfiles: Profile[] = [
    {
      id: '1',
      name: 'Administrador Total',
      description: 'Acesso completo ao sistema',
      permissions: { all: true },
      isActive: true,
      isSystemProfile: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Veterinário',
      description: 'Acesso aos módulos veterinários',
      permissions: { 
        animals: ['read', 'write'], 
        appointments: ['read', 'write'], 
        vaccines: ['read', 'write'] 
      },
      isActive: true,
      isSystemProfile: false,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Recepcionista',
      description: 'Acesso limitado ao atendimento',
      permissions: { 
        tutors: ['read', 'write'], 
        animals: ['read'], 
        appointments: ['read', 'write'] 
      },
      isActive: true,
      isSystemProfile: false,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Administrador',
      email: 'admin@petshop.com',
      role: 'admin',
      profileId: '1',
      profile: mockProfiles[0],
      permissions: { all: true },
      isActive: true,
      lastLogin: new Date('2024-01-15T10:00:00'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Dr. João Silva',
      email: 'joao@petshop.com',
      role: 'veterinarian',
      profileId: '2',
      profile: mockProfiles[1],
      permissions: { 
        animals: ['read', 'write'], 
        appointments: ['read', 'write'], 
        vaccines: ['read', 'write'] 
      },
      isActive: true,
      lastLogin: new Date('2024-01-14T14:30:00'),
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: '3',
      name: 'Maria Recepção',
      email: 'maria@petshop.com',
      role: 'receptionist',
      profileId: '3',
      profile: mockProfiles[2],
      permissions: { 
        tutors: ['read', 'write'], 
        animals: ['read'], 
        appointments: ['read', 'write'] 
      },
      isActive: true,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receptionist' as User['role'],
    profileId: '',
    isActive: true
  });

  const [permissions, setPermissions] = useState({
    tutors: [] as string[],
    animals: [] as string[],
    appointments: [] as string[],
    vaccines: [] as string[],
    products: [] as string[],
    purchases: [] as string[],
    financial: [] as string[],
    system: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProfile = mockProfiles.find(p => p.id === formData.profileId);
    
    const newUser: User = {
      id: selectedUser?.id || Date.now().toString(),
      ...formData,
      profile: selectedProfile,
      permissions: formData.role === 'admin' ? { all: true } : (selectedProfile?.permissions || permissions),
      lastLogin: selectedUser?.lastLogin,
      createdAt: selectedUser?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (selectedUser) {
      setUsers(users.map(user => user.id === selectedUser.id ? newUser : user));
    } else {
      setUsers([...users, newUser]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'receptionist',
      profileId: '',
      isActive: true
    });
    setPermissions({
      tutors: [],
      animals: [],
      appointments: [],
      vaccines: [],
      products: [],
      purchases: [],
      financial: [],
      system: []
    });
    setSelectedUser(null);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      profileId: user.profileId || '',
      isActive: user.isActive
    });
    
    if (user.role !== 'admin' && typeof user.permissions === 'object') {
      setPermissions(user.permissions as any);
    }
    
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, isActive: !user.isActive, updatedAt: new Date() }
        : user
    ));
  };

  const handlePermissionsEdit = (user: User) => {
    setSelectedUser(user);
    if (typeof user.permissions === 'object' && !user.permissions.all) {
      setPermissions(user.permissions as any);
    }
    setIsPermissionsDialogOpen(true);
  };

  const handlePermissionChange = (module: string, action: string) => {
    setPermissions(prev => ({
      ...prev,
      [module]: prev[module as keyof typeof prev].includes(action)
        ? prev[module as keyof typeof prev].filter(a => a !== action)
        : [...prev[module as keyof typeof prev], action]
    }));
  };

  const savePermissions = () => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, permissions, updatedAt: new Date() }
          : user
      ));
    }
    setIsPermissionsDialogOpen(false);
    setSelectedUser(null);
  };

  const getRoleBadge = (role: User['role']) => {
    const roleConfig = {
      admin: { label: 'Administrador', variant: 'destructive' as const },
      veterinarian: { label: 'Veterinário', variant: 'default' as const },
      receptionist: { label: 'Recepcionista', variant: 'secondary' as const },
      manager: { label: 'Gerente', variant: 'outline' as const }
    };

    return (
      <Badge variant={roleConfig[role].variant}>
        {roleConfig[role].label}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('users')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">
                  {selectedUser ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!selectedUser}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="role">Função</Label>
                <Select value={formData.role} onValueChange={(value: User['role']) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="veterinarian">Veterinário</SelectItem>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="receptionist">Recepcionista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="profile">Perfil de Acesso</Label>
                <Select value={formData.profileId} onValueChange={(value) => setFormData({ ...formData, profileId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProfiles.filter(p => p.isActive).map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Usuário ativo</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {selectedUser ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Usuários do Sistema</CardTitle>
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.profile && (
                        <p className="text-xs text-blue-600">Perfil: {user.profile.name}</p>
                      )}
                    </div>
                    {getRoleBadge(user.role)}
                    {!user.isActive && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {user.lastLogin && (
                      <span>Último acesso: {user.lastLogin.toLocaleDateString('pt-BR')}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePermissionsEdit(user)}
                    disabled={user.role === 'admin'}
                  >
                    <Shield className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleUserStatus(user.id)}
                    className={user.isActive ? 'text-red-600' : 'text-green-600'}
                  >
                    <UserCog className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600"
                    disabled={user.role === 'admin'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Permissões */}
      <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Permissões - {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {Object.entries({
              tutors: 'Tutores',
              animals: 'Animais',
              appointments: 'Agendamentos',
              vaccines: 'Vacinas',
              products: 'Produtos',
              purchases: 'Compras',
              financial: 'Financeiro',
              system: 'Sistema'
            }).map(([module, label]) => (
              <div key={module} className="space-y-2">
                <h4 className="font-medium">{label}</h4>
                <div className="flex space-x-4">
                  {['read', 'write', 'delete'].map((action) => (
                    <label key={action} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={permissions[module as keyof typeof permissions].includes(action)}
                        onChange={() => handlePermissionChange(module, action)}
                      />
                      <span className="text-sm">
                        {action === 'read' ? 'Ler' : action === 'write' ? 'Escrever' : 'Excluir'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={savePermissions}>
              Salvar Permissões
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
