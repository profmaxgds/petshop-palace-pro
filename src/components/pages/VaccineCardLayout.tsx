
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, Download, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VaccineCardField {
  id: string;
  name: string;
  type: 'text' | 'date' | 'image' | 'table' | 'qr-code';
  required: boolean;
  position: { x: number; y: number };
  width: number;
  height: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  backgroundColor?: string;
}

interface VaccineCardLayout {
  id: string;
  name: string;
  description?: string;
  pageSize: 'A4' | 'A5' | 'Letter';
  orientation: 'portrait' | 'landscape';
  fields: VaccineCardField[];
  headerText?: string;
  footerText?: string;
  logo?: string;
  isDefault: boolean;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const VaccineCardLayout: React.FC = () => {
  const { toast } = useToast();

  const [layouts, setLayouts] = useState<VaccineCardLayout[]>([
    {
      id: '1',
      name: 'Layout Padrão',
      description: 'Layout padrão da carteirinha de vacinação',
      pageSize: 'A4',
      orientation: 'portrait',
      fields: [
        {
          id: '1',
          name: 'Nome do Animal',
          type: 'text',
          required: true,
          position: { x: 50, y: 100 },
          width: 200,
          height: 30,
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'left',
          color: '#000000'
        },
        {
          id: '2',
          name: 'Tabela de Vacinas',
          type: 'table',
          required: true,
          position: { x: 50, y: 200 },
          width: 500,
          height: 300,
        }
      ],
      headerText: 'CARTEIRINHA DE VACINAÇÃO',
      footerText: 'Este documento comprova a vacinação do animal.',
      isDefault: true,
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
  const [editingLayout, setEditingLayout] = useState<VaccineCardLayout | null>(null);
  const [editingField, setEditingField] = useState<VaccineCardField | null>(null);
  const [previewLayout, setPreviewLayout] = useState<VaccineCardLayout | null>(null);

  const [layoutFormData, setLayoutFormData] = useState({
    name: '',
    description: '',
    pageSize: 'A4' as 'A4' | 'A5' | 'Letter',
    orientation: 'portrait' as 'portrait' | 'landscape',
    headerText: '',
    footerText: '',
    isActive: true,
  });

  const [fieldFormData, setFieldFormData] = useState({
    name: '',
    type: 'text' as 'text' | 'date' | 'image' | 'table' | 'qr-code',
    required: false,
    x: 0,
    y: 0,
    width: 100,
    height: 30,
    fontSize: 12,
    fontWeight: 'normal' as 'normal' | 'bold',
    textAlign: 'left' as 'left' | 'center' | 'right',
    color: '#000000',
    backgroundColor: '#ffffff',
  });

  const filteredLayouts = layouts.filter(layout =>
    layout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (layout.description && layout.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSaveLayout = () => {
    if (!layoutFormData.name) {
      return;
    }

    if (editingLayout) {
      setLayouts(layouts.map(l => 
        l.id === editingLayout.id 
          ? { 
              ...editingLayout, 
              ...layoutFormData,
              updatedAt: new Date(),
            }
          : l
      ));
      toast({
        title: "Layout atualizado",
        description: "O layout foi atualizado com sucesso.",
      });
    } else {
      const newLayout: VaccineCardLayout = {
        id: Date.now().toString(),
        ...layoutFormData,
        fields: [],
        isDefault: false,
        createdBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setLayouts([...layouts, newLayout]);
      toast({
        title: "Layout criado",
        description: "O layout foi criado com sucesso.",
      });
    }
    handleCloseLayoutDialog();
  };

  const handleCloseLayoutDialog = () => {
    setIsAddDialogOpen(false);
    setEditingLayout(null);
    setLayoutFormData({
      name: '',
      description: '',
      pageSize: 'A4',
      orientation: 'portrait',
      headerText: '',
      footerText: '',
      isActive: true,
    });
  };

  const handleEditLayout = (layout: VaccineCardLayout) => {
    setEditingLayout(layout);
    setLayoutFormData({
      name: layout.name,
      description: layout.description || '',
      pageSize: layout.pageSize,
      orientation: layout.orientation,
      headerText: layout.headerText || '',
      footerText: layout.footerText || '',
      isActive: layout.isActive,
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteLayout = (layoutId: string) => {
    const layout = layouts.find(l => l.id === layoutId);
    if (layout?.isDefault) {
      toast({
        title: "Não é possível excluir",
        description: "O layout padrão não pode ser excluído.",
        variant: "destructive",
      });
      return;
    }

    if (confirm('Tem certeza que deseja excluir este layout?')) {
      setLayouts(layouts.filter(l => l.id !== layoutId));
      toast({
        title: "Layout excluído",
        description: "O layout foi excluído com sucesso.",
      });
    }
  };

  const handlePreview = (layout: VaccineCardLayout) => {
    setPreviewLayout(layout);
  };

  const handleExportLayout = (layout: VaccineCardLayout) => {
    const dataStr = JSON.stringify(layout, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `layout-${layout.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Layout exportado",
      description: "O layout foi exportado com sucesso.",
    });
  };

  const toggleLayoutStatus = (layoutId: string) => {
    setLayouts(layouts.map(l => 
      l.id === layoutId 
        ? { ...l, isActive: !l.isActive, updatedAt: new Date() }
        : l
    ));
  };

  const setAsDefault = (layoutId: string) => {
    setLayouts(layouts.map(l => ({
      ...l,
      isDefault: l.id === layoutId,
      updatedAt: new Date()
    })));
    toast({
      title: "Layout padrão definido",
      description: "O layout foi definido como padrão.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Layout da Carteirinha</h1>
          <p className="text-gray-600">Configure layouts personalizados para carteirinhas de vacinação</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Layouts Disponíveis</CardTitle>
              <CardDescription>
                {filteredLayouts.length} layouts configurados
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Layout
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingLayout ? 'Editar Layout' : 'Novo Layout'}
                  </DialogTitle>
                  <DialogDescription>
                    Configure as propriedades do layout da carteirinha
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Nome do Layout</Label>
                    <Input
                      id="name"
                      value={layoutFormData.name}
                      onChange={(e) => setLayoutFormData({...layoutFormData, name: e.target.value})}
                      placeholder="Nome do layout"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pageSize">Tamanho da Página</Label>
                    <Select
                      value={layoutFormData.pageSize}
                      onValueChange={(value: 'A4' | 'A5' | 'Letter') => setLayoutFormData({...layoutFormData, pageSize: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4">A4</SelectItem>
                        <SelectItem value="A5">A5</SelectItem>
                        <SelectItem value="Letter">Letter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="orientation">Orientação</Label>
                    <Select
                      value={layoutFormData.orientation}
                      onValueChange={(value: 'portrait' | 'landscape') => setLayoutFormData({...layoutFormData, orientation: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Retrato</SelectItem>
                        <SelectItem value="landscape">Paisagem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={layoutFormData.isActive}
                      onCheckedChange={(checked) => setLayoutFormData({...layoutFormData, isActive: !!checked})}
                    />
                    <Label htmlFor="isActive">Layout ativo</Label>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={layoutFormData.description}
                      onChange={(e) => setLayoutFormData({...layoutFormData, description: e.target.value})}
                      placeholder="Descrição do layout"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="headerText">Texto do Cabeçalho</Label>
                    <Input
                      id="headerText"
                      value={layoutFormData.headerText}
                      onChange={(e) => setLayoutFormData({...layoutFormData, headerText: e.target.value})}
                      placeholder="Texto do cabeçalho"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="footerText">Texto do Rodapé</Label>
                    <Input
                      id="footerText"
                      value={layoutFormData.footerText}
                      onChange={(e) => setLayoutFormData({...layoutFormData, footerText: e.target.value})}
                      placeholder="Texto do rodapé"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseLayoutDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveLayout} className="bg-teal-600 hover:bg-teal-700">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Input
              placeholder="Buscar layouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="grid gap-4">
            {filteredLayouts.map((layout) => (
              <Card key={layout.id} className={`border ${layout.isDefault ? 'border-teal-500' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-medium">{layout.name}</h3>
                          <p className="text-sm text-gray-500">{layout.description}</p>
                        </div>
                        {layout.isDefault && (
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                            Padrão
                          </span>
                        )}
                        {!layout.isActive && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                            Inativo
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {layout.pageSize} • {layout.orientation === 'portrait' ? 'Retrato' : 'Paisagem'} • {layout.fields.length} campos
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(layout)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExportLayout(layout)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditLayout(layout)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleLayoutStatus(layout.id)}
                        className={layout.isActive ? 'text-red-600' : 'text-green-600'}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      {!layout.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAsDefault(layout.id)}
                          className="text-teal-600"
                        >
                          Definir Padrão
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteLayout(layout.id)}
                        className="text-red-600"
                        disabled={layout.isDefault}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      {previewLayout && (
        <Dialog open={!!previewLayout} onOpenChange={() => setPreviewLayout(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview: {previewLayout.name}</DialogTitle>
              <DialogDescription>
                Visualização do layout da carteirinha de vacinação
              </DialogDescription>
            </DialogHeader>
            
            <div className="border-2 border-gray-300 bg-white p-8 mx-auto" 
                 style={{
                   width: previewLayout.pageSize === 'A4' ? '210mm' : previewLayout.pageSize === 'A5' ? '148mm' : '8.5in',
                   height: previewLayout.orientation === 'portrait' 
                     ? (previewLayout.pageSize === 'A4' ? '297mm' : previewLayout.pageSize === 'A5' ? '210mm' : '11in')
                     : (previewLayout.pageSize === 'A4' ? '210mm' : previewLayout.pageSize === 'A5' ? '148mm' : '8.5in'),
                   minHeight: '400px',
                   transform: 'scale(0.5)',
                   transformOrigin: 'top center'
                 }}>
              {previewLayout.headerText && (
                <div className="text-center text-xl font-bold mb-6">
                  {previewLayout.headerText}
                </div>
              )}
              
              <div className="space-y-4">
                <div className="border p-4">
                  <h3 className="font-bold">Informações do Animal:</h3>
                  <p>Nome: [Nome do Animal]</p>
                  <p>Espécie: [Espécie]</p>
                  <p>Raça: [Raça]</p>
                  <p>Tutor: [Nome do Tutor]</p>
                </div>
                
                <div className="border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Vacina</th>
                        <th className="border p-2 text-left">Data</th>
                        <th className="border p-2 text-left">Próxima Dose</th>
                        <th className="border p-2 text-left">Veterinário</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">V8</td>
                        <td className="border p-2">15/11/2024</td>
                        <td className="border p-2">15/11/2025</td>
                        <td className="border p-2">Dr. João Silva</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Antirrábica</td>
                        <td className="border p-2">01/12/2024</td>
                        <td className="border p-2">01/12/2025</td>
                        <td className="border p-2">Dra. Maria Santos</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {previewLayout.footerText && (
                <div className="text-center text-sm mt-6 pt-4 border-t">
                  {previewLayout.footerText}
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewLayout(null)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VaccineCardLayout;
