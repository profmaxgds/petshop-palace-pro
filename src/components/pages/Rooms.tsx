
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { Room } from '@/types';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

const Rooms = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Consultório 1',
      type: 'consultation',
      capacity: 4,
      equipment: ['Mesa de exame', 'Estetoscópio', 'Balança'],
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Sala Cirúrgica 1',
      type: 'surgery',
      capacity: 6,
      equipment: ['Mesa cirúrgica', 'Aparelho de anestesia', 'Monitor cardíaco'],
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Sala de Banho e Tosa 1',
      type: 'grooming',
      capacity: 2,
      equipment: ['Banheira', 'Secador', 'Mesa de tosa'],
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      name: 'Sala de Banho e Tosa 2',
      type: 'grooming',
      capacity: 2,
      equipment: ['Banheira', 'Secador', 'Mesa de tosa'],
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const roomTypes = [
    { id: 'consultation', name: 'Consultório' },
    { id: 'surgery', name: 'Sala Cirúrgica' },
    { id: 'grooming', name: 'Banho e Tosa' },
    { id: 'other', name: 'Outro' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    type: 'consultation' as Room['type'],
    capacity: 1,
    equipment: '',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoom: Room = {
      id: selectedRoom?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      capacity: formData.capacity,
      equipment: formData.equipment ? formData.equipment.split(',').map(item => item.trim()) : [],
      isActive: formData.isActive,
      createdBy: selectedRoom?.createdBy || '1',
      createdAt: selectedRoom?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (selectedRoom) {
      setRooms(rooms.map(room => room.id === selectedRoom.id ? newRoom : room));
      toast({
        title: t('success'),
        description: 'Sala atualizada com sucesso!',
      });
    } else {
      setRooms([...rooms, newRoom]);
      toast({
        title: t('success'),
        description: 'Sala cadastrada com sucesso!',
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'consultation',
      capacity: 1,
      equipment: '',
      isActive: true
    });
    setSelectedRoom(null);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      capacity: room.capacity || 1,
      equipment: room.equipment?.join(', ') || '',
      isActive: room.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta sala?')) {
      setRooms(rooms.filter(room => room.id !== id));
      toast({
        title: t('success'),
        description: 'Sala excluída com sucesso!',
      });
    }
  };

  const getTypeLabel = (typeKey: string) => {
    const type = roomTypes.find(t => t.id === typeKey);
    return type ? type.name : typeKey;
  };

  const getTypeBadgeVariant = (type: string) => {
    const variants = {
      consultation: 'default' as const,
      surgery: 'destructive' as const,
      grooming: 'secondary' as const,
      other: 'outline' as const
    };
    return variants[type as keyof typeof variants] || 'outline' as const;
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || room.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('rooms')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Sala
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedRoom ? 'Editar Sala' : 'Nova Sala'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select value={formData.type} onValueChange={(value: Room['type']) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="capacity">Capacidade</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="equipment">Equipamentos (separados por vírgula)</Label>
                <Textarea
                  id="equipment"
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  placeholder="Ex: Mesa de exame, Estetoscópio, Balança"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Sala ativa</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit">
                  {selectedRoom ? t('save') : t('add')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Salas Cadastradas</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar salas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {roomTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRooms.map((room) => (
              <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{room.name}</h3>
                      <p className="text-sm text-gray-500">
                        Capacidade: {room.capacity} pessoas
                      </p>
                      {room.equipment && room.equipment.length > 0 && (
                        <p className="text-sm text-gray-400">
                          Equipamentos: {room.equipment.join(', ')}
                        </p>
                      )}
                    </div>
                    <Badge variant={getTypeBadgeVariant(room.type)}>
                      {getTypeLabel(room.type)}
                    </Badge>
                    {!room.isActive && (
                      <Badge variant="destructive">Inativa</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(room)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(room.id)}
                    className="text-red-600"
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

export default Rooms;
