
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Shield, Settings } from 'lucide-react';
import { Profile } from '@/types';
import { t } from '@/lib/i18n';

const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Administrador',
      description: 'Acesso total ao sistema',
      permissions: { all: ['read', 'write', 'delete'] },
      isActive: true,
      isSystemProfile: true,
      createdBy: 'system',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
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
      createdBy: 'system',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '3',
      name: 'Recepcionista',
      description: 'Acesso a agendamentos e cadastros básicos',
      permissions: { 
        tutors: ['read', 'write'], 
        animals: ['read', 'write'], 
        appointments: ['read', 'write'],
        grooming: ['read', 'write']
      },
      isActive: true,
      isSystemProfile: true,
      createdBy: 'system',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  const [permissions, setPermissions] = useState({
    tutors: [] as string[],
    animals: [] as string[],
    appointments: [] as string[],
    vaccines: [] as string[],
    grooming: [] as string[],
    products: [] as string[],
    purchases: [] as string[],
    financial: [] as string[],
    system: [] as string[]
  });

  const modulesList = [
    { key: 'tutors', label: t('tutors') },
    { key: 'animals', label: t('animals') },
    { key: 'appointments', label: t('appointments') },
    { key: 'vaccines', label: t('vaccines') },
    { key: 'grooming', label: t('grooming') },
    { key: 'products', label: t('products') },
    { key: 'purchases', label: t('purchases') },
    { key: 'financial', label: 'Financeiro' },
    { key: 'system', label: 'Sistema' }
  ];

  const actionsList = [
    { key: 'read', label: t('read') },
    { key: 'write', label: t('write') },
    { key: 'delete', label: t('deletePermission') }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProfile: Profile = {
      id: selectedProfile?.id || Date.now().toString(),
      ...formData,
      permissions,
      isSystemProfile: false,
      createdBy: 'current-user',
      createdAt: selectedProfile?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (selectedProfile) {
      setProfiles(profiles.map(profile => 
        profile.id === selectedProfile.id ? newProfile : profile
      ));
    } else {
      setProfiles([...profiles, newProfile]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      isActive: true
    });
    setPermissions({
      tutors: [],
      animals: [],
      appointments: [],
      vaccines: [],
      grooming: [],
      products: [],
      purchases: [],
      financial: [],
      system: []
    });
    setSelectedProfile(null);
  };

  const handleEdit = (profile: Profile) => {
    setSelectedProfile(profile);
    setFormData({
      name: profile.name,
      description: profile.description || '',
      isActive: profile.isActive
    });
    
    if (typeof profile.permissions === 'object' && !profile.permissions.all) {
      setPermissions(profile.permissions as any);
    }
    
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile?.isSystemProfile) {
      alert('Perfis do sistema não podem ser excluídos');
      return;
    }
    
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      setProfiles(profiles.filter(profile => profile.id !== id));
    }
  };

  const toggleProfileStatus = (id: string) => {
    setProfiles(profiles.map(profile => 
      profile.id === id 
        ? { ...profile, isActive: !profile.isActive, updatedAt: new Date() }
        : profile
    ));
  };

  const handlePermissionChange = (module: string, action: string) => {
    setPermissions(prev => ({
      ...prev,
      [module]: prev[module as keyof typeof prev].includes(action)
        ? prev[module as keyof typeof prev].filter(a => a !== action)
        : [...prev[module as keyof typeof prev], action]
    }));
  };

  const getPermissionBadges = (profilePermissions: Record<string, string[] | boolean>) => {
    if (profilePermissions.all) {
      return <Badge variant="destructive">Acesso Total</Badge>;
    }

    const moduleCount = Object.keys(profilePermissions).length;
    return <Badge variant="secondary">{moduleCount} módulos</Badge>;
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (profile.description && profile.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('profiles')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              {t('newProfile')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProfile ? t('editProfile') : t('newProfile')}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t('profileName')}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={selectedProfile?.isSystemProfile}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                  />
                  <Label htmlFor="isActive">{t('active')}</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">{t('profileDescription')}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('modulePermissions')}</h3>
                <div className="space-y-4">
                  {modulesList.map((module) => (
                    <div key={module.key} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">{module.label}</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {actionsList.map((action) => (
                          <label key={action.key} className="flex items-center space-x-2">
                            <Checkbox
                              checked={permissions[module.key as keyof typeof permissions].includes(action.key)}
                              onCheckedChange={() => handlePermissionChange(module.key, action.key)}
                              disabled={selectedProfile?.isSystemProfile}
                            />
                            <span className="text-sm">{action.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit" disabled={selectedProfile?.isSystemProfile}>
                  {selectedProfile ? t('save') : t('add')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Perfis</CardTitle>
            <Input
              placeholder="Buscar perfis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium">{profile.name}</h3>
                      <p className="text-sm text-gray-500">{profile.description}</p>
                    </div>
                    {getPermissionBadges(profile.permissions)}
                    {profile.isSystemProfile && (
                      <Badge variant="outline">Sistema</Badge>
                    )}
                    {!profile.isActive && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Criado em: {profile.createdAt.toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(profile)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleProfileStatus(profile.id)}
                    className={profile.isActive ? 'text-red-600' : 'text-green-600'}
                    disabled={profile.isSystemProfile}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(profile.id)}
                    className="text-red-600"
                    disabled={profile.isSystemProfile}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profiles;
