import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, Save, Undo, Palette, Type, Image, Layout, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { t } from '@/lib/i18n';

const VaccineCardLayout: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [layout, setLayout] = useState(() => {
    try {
      const stored = localStorage.getItem('vaccineCardLayout');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading layout:', error);
    }
    
    return {
      title: 'CARTEIRINHA DE VACINAÇÃO',
      subtitle: 'Controle Sanitário Veterinário',
      headerColor: '#0d9488',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial',
      fontSize: '14',
      showLogo: true,
      logoPosition: 'left',
      logoUrl: '',
      showBorder: true,
      borderColor: '#e5e7eb',
      fields: {
        animalName: true,
        tutorName: true,
        species: true,
        breed: true,
        birthDate: true,
        weight: true,
        microchip: false,
        veterinarian: true,
        clinicInfo: true,
      }
    };
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleFieldToggle = (field: string) => {
    setLayout(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: !prev.fields[field as keyof typeof prev.fields]
      }
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 2MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLayout(prev => ({
          ...prev,
          logoUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefault = () => {
    setLayout({
      title: 'CARTEIRINHA DE VACINAÇÃO',
      subtitle: 'Controle Sanitário Veterinário',
      headerColor: '#0d9488',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial',
      fontSize: '14',
      showLogo: true,
      logoPosition: 'left',
      logoUrl: '',
      showBorder: true,
      borderColor: '#e5e7eb',
      fields: {
        animalName: true,
        tutorName: true,
        species: true,
        breed: true,
        birthDate: true,
        weight: true,
        microchip: false,
        veterinarian: true,
        clinicInfo: true,
      }
    });
  };

  const saveLayout = () => {
    try {
      localStorage.setItem('vaccineCardLayout', JSON.stringify(layout));
      toast({
        title: "Layout salvo",
        description: "As configurações do layout foram salvas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  const PreviewCard = () => (
    <div 
      className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg relative"
      style={{ 
        backgroundColor: layout.backgroundColor,
        border: layout.showBorder ? `2px solid ${layout.borderColor}` : 'none',
        fontFamily: layout.fontFamily,
        fontSize: `${layout.fontSize}px`
      }}
    >
      {/* Header */}
      <div 
        className="text-center p-4 rounded-t-lg mb-4 relative"
        style={{ backgroundColor: layout.headerColor, color: 'white' }}
      >
        {layout.showLogo && (
          <div 
            className={`absolute top-4 ${layout.logoPosition === 'left' ? 'left-4' : 'right-4'} w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden`}
          >
            {layout.logoUrl ? (
              <img 
                src={layout.logoUrl} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl" style={{ color: layout.headerColor }}>🐾</span>
            )}
          </div>
        )}
        <div>
          <h1 className="font-bold text-lg">{layout.title}</h1>
          <p className="text-sm opacity-90">{layout.subtitle}</p>
        </div>
      </div>

      {/* Animal Info */}
      <div className="space-y-3 mb-4">
        <h2 className="font-semibold text-lg border-b pb-1">Dados do Animal</h2>
        {layout.fields.animalName && (
          <div className="flex justify-between">
            <span className="font-medium">{t('breed', 'Raça')}:</span>
            <span>Golden Retriever</span>
          </div>
        )}
        {layout.fields.birthDate && (
          <>
            <div className="flex justify-between">
              <span className="font-medium">{t('birthDate', 'Data de Nasc.')}:</span>
              <span>15/06/2022</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('age', 'Idade')}:</span>
              <span>3 anos</span>
            </div>
          </>
        )}
        {layout.fields.weight && (
          <div className="flex justify-between">
            <span className="font-medium">{t('weight', 'Peso')}:</span>
            <span>32,5 kg</span>
          </div>
        )}
        {layout.fields.microchip && (
          <div className="flex justify-between">
            <span className="font-medium">{t('microchip', 'Microchip')}:</span>
            <span>123456789</span>
          </div>
        )}
      </div>

      {/* Vaccines Table */}
      <div className="space-y-3 mb-4">
        <h2 className="font-semibold text-lg border-b pb-1">Histórico de Vacinação</h2>
        <div className="space-y-2">
          <div className="bg-gray-50 p-2 rounded">
            <div className="flex justify-between items-center">
              <span className="font-medium">V8</span>
              <span className="text-sm">15/01/2024</span>
            </div>
            <div className="flex justify-between items-end mt-2">
              <div className="text-xs text-gray-600 flex-grow">
                <div><strong>Lote:</strong> AB123</div>
                <div><strong>Próxima:</strong> 15/01/2025</div>
              </div>
              {layout.fields.veterinarian && (
                <div className="border border-gray-300 p-2 ml-4 flex flex-col justify-end text-center" style={{ width: '150px', minHeight: '70px', flexShrink: 0 }}>
                  <div className="w-full border-b border-gray-700 mb-1"></div>
                  <div className="text-xs text-gray-600">
                    Dr. Carlos Silva<br/>
                    CRMV: CRMV-SP 12345
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="flex justify-between items-center">
              <span className="font-medium">Antirrábica</span>
              <span className="text-sm">20/02/2024</span>
            </div>
            <div className="flex justify-between items-end mt-2">
              <div className="text-xs text-gray-600 flex-grow">
                <div><strong>Lote:</strong> CD456</div>
                <div><strong>Próxima:</strong> 20/02/2025</div>
              </div>
              {layout.fields.veterinarian && (
               <div className="border border-gray-300 p-2 ml-4 flex flex-col justify-end text-center" style={{ width: '150px', minHeight: '70px', flexShrink: 0 }}>
                <div className="w-full border-b border-gray-700 mb-1"></div>
                <div className="text-xs text-gray-600">
                  Dra. Ana Costa<br/>
                  CRMV: CRMV-SP 54321
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {layout.fields.clinicInfo && (
        <div className="text-center text-xs text-gray-600 pt-4 border-t">
          <p>Clínica Veterinária PetShop</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>www.petshop.com.br</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Layout da Carteirinha</h1>
          <p className="text-gray-600">Configure o layout das carteirinhas de vacinação</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Editar' : 'Visualizar'}
          </Button>
          <Button variant="outline" onClick={resetToDefault}>
            <Undo className="w-4 h-4 mr-2" />
            Padrão
          </Button>
          <Button onClick={saveLayout} className="bg-teal-600 hover:bg-teal-700">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        {!previewMode && (
          <div className="space-y-6">
            {/* Header Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Cabeçalho
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título Principal</Label>
                  <Input
                    id="title"
                    value={layout.title}
                    onChange={(e) => setLayout(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={layout.subtitle}
                    onChange={(e) => setLayout(prev => ({ ...prev, subtitle: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="headerColor">Cor do Cabeçalho</Label>
                  <Input
                    id="headerColor"
                    type="color"
                    value={layout.headerColor}
                    onChange={(e) => setLayout(prev => ({ ...prev, headerColor: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Logo Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="w-5 h-5 mr-2" />
                  Logo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showLogo"
                    checked={layout.showLogo}
                    onChange={(e) => setLayout(prev => ({ ...prev, showLogo: e.target.checked }))}
                  />
                  <Label htmlFor="showLogo">Mostrar Logo</Label>
                </div>
                
                {layout.showLogo && (
                  <>
                    <div>
                      <Label htmlFor="logoPosition">Posição do Logo</Label>
                      <Select value={layout.logoPosition} onValueChange={(value: 'left' | 'right') => setLayout(prev => ({ ...prev, logoPosition: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Esquerda</SelectItem>
                          <SelectItem value="right">Direita</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Upload do Logo</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Selecionar Arquivo
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Formatos: PNG, JPG, GIF (máx. 2MB)
                      </p>
                      {layout.logoUrl && (
                        <div className="mt-2">
                          <img 
                            src={layout.logoUrl} 
                            alt="Logo preview" 
                            className="w-16 h-16 object-cover border rounded"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Style Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Estilo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={layout.backgroundColor}
                    onChange={(e) => setLayout(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="fontFamily">Fonte</Label>
                  <Select value={layout.fontFamily} onValueChange={(value) => setLayout(prev => ({ ...prev, fontFamily: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                  <Input
                    id="fontSize"
                    type="number"
                    value={layout.fontSize}
                    onChange={(e) => setLayout(prev => ({ ...prev, fontSize: e.target.value }))}
                    min="10"
                    max="20"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showBorder"
                    checked={layout.showBorder}
                    onChange={(e) => setLayout(prev => ({ ...prev, showBorder: e.target.checked }))}
                  />
                  <Label htmlFor="showBorder">Mostrar Borda</Label>
                </div>
              </CardContent>
            </Card>

            {/* Fields Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="w-5 h-5 mr-2" />
                  Campos
                </CardTitle>
                <CardDescription>Selecione quais campos aparecerão na carteirinha</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries({
                    animalName: t('animalName', 'Nome do Animal'),
                    tutorName: t('tutorName', 'Nome do Tutor'),
                    species: t('species', 'Espécie'),
                    breed: t('breed', 'Raça'),
                    birthDate: t('birthDate', 'Data de Nascimento'),
                    weight: t('weight', 'Peso'),
                    microchip: t('microchip', 'Microchip'),
                    veterinarian: t('veterinarian', 'Veterinário'),
                    clinicInfo: t('clinicInfo', 'Info da Clínica'),
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={layout.fields[key as keyof typeof layout.fields]}
                        onChange={() => handleFieldToggle(key)}
                      />
                      <Label htmlFor={key} className="text-sm">{label}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Preview Panel */}
        <div className={previewMode ? 'col-span-2' : ''}>
          <Card>
            <CardHeader>
              <CardTitle>Preview da Carteirinha</CardTitle>
              <CardDescription>Visualização de como a carteirinha aparecerá</CardDescription>
            </CardHeader>
            <CardContent>
              <PreviewCard />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VaccineCardLayout;
