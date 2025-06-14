import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';
import { Profile } from '@/types';

const Profiles: React.FC = () => {
  const { toast } = useToast();

  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Administrador',
      description: 'Acesso total ao sistema',
      permissions: {
        all: true
      },
      isActive: true,
      isSystemProfile: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Veterinário',
      description: 'Acesso a animais, consultas e vacinas',
      permissions: {
        animals: ['read', 'write'],
        appointments: ['read', 'write'],
        vaccines: ['read', 'write'],
        tutors: ['read']
      },
      isActive: true,
      isSystemProfile: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Recepcionista',
      description: 'Acesso a agendamentos e cadastros básicos',
      permissions: {
        tutors: ['read', 'write'],
        animals: ['read', 'write'],
        appointments: ['read', 'write'],
        grooming: ['read', 'write'],
        sales: ['read', 'write']
      },
      isActive: true,
      isSystemProfile: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const [profileForm, setProfileForm] = useState({
    name: '',
    description: '',
    permissions: {} as { [key: string]: string[] | boolean },
    isActive: true,
  });

  // Available modules and their permissions - UPDATED
  const availableModules = [
    {
      key: 'tutors',
      name: 'Tutores',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'animals',
      name: 'Animais',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'appointments',
      name: 'Saúde Animal',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'vaccines',
      name: 'Vacinas',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'grooming',
      name: 'Estética',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'products',
      name: 'Produtos',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'purchases',
      name: 'Compras',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'sales',
      name: 'PDV/Vendas',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'financial',
      name: 'Financeiro',
      permissions: ['read', 'write', 'delete']
    },
    {
      key: 'reports',
      name: 'Relatórios',
      permissions: ['read', 'write']
    },
    {
      key: 'system',
      name: 'Sistema',
      permissions: ['read', 'write', 'delete']
    }
  ];

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (profile.description && profile.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSaveProfile = () => {
    if (!profileForm.name) {
      toast({
        title: "Erro",
        description: "O nome do perfil é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    if (editingProfile) {
      setProfiles(profiles.map(p => 
        p.id === editingProfile.id 
          ? {
              ...editingProfile,
              name: profileForm.name,
              description: profileForm.description,
              permissions: profileForm.permissions,
              isActive: profileForm.isActive,
              updatedAt: new Date(),
            }
          : p
      ));
      toast({
        title: "Perfil atualizado",
        description: "O perfil foi atualizado com sucesso.",
      });
    } else {
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: profileForm.name,
        description: profileForm.description,
        permissions: profileForm.permissions,
        isActive: profileForm.isActive,
        isSystemProfile: false,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProfiles([...profiles, newProfile]);
      toast({
        title: "Perfil criado",
        description: "O perfil foi criado com sucesso.",
      });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingProfile(null);
    setProfileForm({
      name: '',
      description: '',
      permissions: {},
      isActive: true,
    });
  };

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile);
    setProfileForm({
      name: profile.name,
      description: profile.description || '',
      permissions: profile.permissions,
      isActive: profile.isActive,
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteProfile = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile?.isSystemProfile) {
      toast({
        title: "Não é possível excluir",
        description: "Perfis do sistema não podem ser excluídos.",
        variant: "destructive",
      });
      return;
    }

    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      setProfiles(profiles.filter(p => p.id !== profileId));
      toast({
        title: "Perfil excluído",
        description: "O perfil foi excluído com sucesso.",
      });
    }
  };

  const handlePermissionChange = (moduleKey: string, permission: string, checked: boolean) => {
    const currentModulePermissions = profileForm.permissions[moduleKey] as string[] || [];
    
    if (checked) {
      if (!currentModulePermissions.includes(permission)) {
        setProfileForm({
          ...profileForm,
          permissions: {
            ...profileForm.permissions,
            [moduleKey]: [...currentModulePermissions, permission]
          }
        });
      }
    } else {
      setProfileForm({
        ...profileForm,
        permissions: {
          ...profileForm.permissions,
          [moduleKey]: currentModulePermissions.filter(p => p !== permission)
        }
      });
    }
  };

  const isPermissionChecked = (moduleKey: string, permission: string): boolean => {
    const modulePermissions = profileForm.permissions[moduleKey];
    if (Array.isArray(modulePermissions)) {
      return modulePermissions.includes(permission);
    }
    return false;
  };

  const getPermissionsSummary = (permissions: { [key: string]: string[] | boolean }): string => {
    if (permissions.all) return 'Acesso Total';
    
    const moduleCount = Object.keys(permissions).length;
    const totalPermissions = Object.values(permissions).reduce((acc, perms) => {
      if (Array.isArray(perms)) {
        return acc + perms.length;
      }
      return acc;
    }, 0);
    
    return `${moduleCount} módulos, ${totalPermissions} permissões`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('profiles')}</h1>
          <p className="text-gray-600">Gerenciar perfis de usuário e permissões</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Perfis</CardTitle>
              <CardDescription>
                {filteredProfiles.length} perfis configurados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('newProfile')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProfile ? t('editProfile') : t('newProfile')}
                  </DialogTitle>
                  <DialogDescription>
                    Configure as permissões do perfil de usuário
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t('profileName')}</Label>
                      <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                        placeholder="Nome do perfil"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={profileForm.isActive}
                        onCheckedChange={(checked) => setProfileForm({...profileForm, isActive: !!checked})}
                      />
                      <Label htmlFor="isActive">Perfil ativo</Label>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">{t('profileDescription')}</Label>
                    <Textarea
                      id="description"
                      value={profileForm.description}
                      onChange={(e) => setProfileForm({...profileForm, description: e.target.value})}
                      placeholder="Descrição do perfil"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-base font-semibold">{t('modulePermissions')}</Label>
                    <div className="mt-4 space-y-6">
                      {availableModules.map((module) => (
                        <div key={module.key} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">{module.name}</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {module.permissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${module.key}-${permission}`}
                                  checked={isPermissionChecked(module.key, permission)}
                                  onCheckedChange={(checked) => 
                                    handlePermissionChange(module.key, permission, !!checked)
                                  }
                                />
                                <Label htmlFor={`${module.key}-${permission}`}>
                                  {permission === 'read' && t('read')}
                                  {permission === 'write' && t('write')}
                                  {permission === 'delete' && t('deletePermission')}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSaveProfile} className="bg-teal-600 hover:bg-teal-700">
                    {t('save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Input
              placeholder="Buscar perfis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Permissões</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.description}</TableCell>
                  <TableCell>{getPermissionsSummary(profile.permissions)}</TableCell>
                  <TableCell>
                    <Badge variant={profile.isActive ? 'default' : 'secondary'}>
                      {profile.isActive ? t('active') : t('inactive')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {profile.isSystemProfile ? (
                      <Badge variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        Sistema
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Users className="w-3 h-3 mr-1" />
                        Personalizado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProfile(profile)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProfile(profile.id)}
                        className="text-red-600"
                        disabled={profile.isSystemProfile}
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

export default Profiles;
