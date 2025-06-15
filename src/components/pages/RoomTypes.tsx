
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

interface RoomType {
  id: string;
  name: string;
  isActive: boolean;
}

const RoomTypes: React.FC = () => {
  const { toast } = useToast();
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    { id: '1', name: 'Consultório', isActive: true },
    { id: '2', name: 'Sala Cirúrgica', isActive: true },
    { id: '3', name: 'Banho e Tosa', isActive: true },
    { id: '4', name: 'Outro', isActive: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<RoomType | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  const filteredRoomTypes = roomTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) && type.isActive
  );

  const handleSave = () => {
    if (!formData.name) {
        toast({ title: "Erro", description: "O nome é obrigatório.", variant: 'destructive' });
        return;
    }
    if (editingType) {
      setRoomTypes(roomTypes.map(rt => 
        rt.id === editingType.id ? { ...rt, name: formData.name } : rt
      ));
      toast({ title: t('success'), description: "Tipo de sala atualizado com sucesso!" });
    } else {
      const newType: RoomType = {
        id: Date.now().toString(),
        name: formData.name,
        isActive: true,
      };
      setRoomTypes([...roomTypes, newType]);
      toast({ title: t('success'), description: "Tipo de sala cadastrado com sucesso!" });
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingType(null);
    setFormData({ name: '' });
  };

  const handleEdit = (type: RoomType) => {
    setEditingType(type);
    setFormData({ name: type.name });
    setIsDialogOpen(true);
  };

  const handleDelete = (typeId: string) => {
    if (confirm('Tem certeza que deseja excluir este tipo de sala?')) {
        setRoomTypes(roomTypes.map(rt => 
          rt.id === typeId ? { ...rt, isActive: false } : rt
        ));
        toast({ title: t('success'), description: "Tipo de sala excluído com sucesso!" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('roomTypes')}</h1>
          <p className="text-gray-600">Gestão de tipos de salas da clínica</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tipos de Sala</CardTitle>
              <CardDescription>
                {filteredRoomTypes.length} tipos de sala encontrados
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingType(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Tipo de Sala
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingType ? 'Editar Tipo de Sala' : 'Novo Tipo de Sala'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do tipo de sala.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <div>
                    <Label htmlFor="name">Nome do Tipo de Sala</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ name: e.target.value })}
                      placeholder="Ex: Sala de Recuperação"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSave}>
                    {t('save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoomTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell className="font-medium">{type.name}</TableCell>
                    <TableCell>
                      <Badge variant={type.isActive ? "default" : "destructive"}>
                        {type.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(type)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(type.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomTypes;
