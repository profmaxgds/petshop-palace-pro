import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Ban, Calendar, Syringe, Clock, CheckCircle } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import type { Animal, Veterinarian, Breed, Tutor } from '@/types';
import type { Sale, NewSale, SaleItem } from '@/types/sales';
import { Product } from '@/types/products';
import { addDays, format, isToday } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

// Adicionando a interface Vaccine para corrigir os erros de compilação
interface Vaccine {
  id: string;
  animalId: string;
  animal?: Animal;
  vaccineType: string;
  productId?: string;
  product?: Product;
  batch?: string;
  applicationDate: Date;
  nextDueDate?: Date;
  veterinarianId: string;
  veterinarian?: Veterinarian;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface VaccinesProps {
  navigationState?: any;
  onNavigate: (page: string, state?: any) => void;
}

type VaccineStatus = 'applied' | 'scheduled' | 'canceled';

interface ExtendedVaccine extends Vaccine {
  status: VaccineStatus;
  cancellationReason?: string;
}

const Vaccines: React.FC<VaccinesProps> = ({ navigationState, onNavigate }) => {
  const { toast } = useToast();
  const selectedAnimalId = navigationState?.selectedAnimalId;

  // Mock data
  const mockVeterinarians: Veterinarian[] = [
    {
      id: '1',
      name: 'Dr. João Silva',
      crmv: '12345-SP',
      specialties: ['Clínica Geral', 'Cirurgia'],
      phone: '(11) 99999-9999',
      email: 'joao@veterinaria.com',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Dra. Maria Santos',
      crmv: '67890-SP',
      specialties: ['Dermatologia', 'Oftalmologia'],
      phone: '(11) 88888-8888',
      email: 'maria@veterinaria.com',
      status: 'active',
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockBreeds: Breed[] = [
    {
      id: '1',
      name: 'Golden Retriever',
      species: 'dog',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Persa',
      species: 'cat',
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const mockTutors: Tutor[] = [
    {
      id: '1',
      name: 'João Silva Santos',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999',
      email: 'joao@email.com',
      address: {
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockAnimals: Animal[] = [
    {
      id: '1',
      name: 'Rex',
      species: 'dog',
      breedId: '1',
      breed: mockBreeds[0],
      age: 3,
      sex: 'male',
      weight: 32.5,
      tutorId: '1',
      tutor: mockTutors[0],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Luna',
      species: 'cat',
      breedId: '2',
      breed: mockBreeds[1],
      age: 2,
      sex: 'female',
      weight: 4.2,
      tutorId: '1',
      tutor: mockTutors[0],
      isActive: true,
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockVaccineProducts: Product[] = [
    {
      id: 'prod-vac-v10',
      name: 'Vacina V10 Importada',
      categoryId: 'cat7',
      quantity: 15,
      minQuantity: 5,
      costPrice: 30.00,
      salePrice: 55.00,
      supplier: 'Vet Supply',
      createdAt: new Date(),
      updatedAt: new Date(),
      batch: 'V10-2025-01',
      expirationDate: '2025-12-31',
      vaccineType: 'Polivalente',
      manufacturer: 'Major Vet',
      mapaRegistration: 'MAPA SP 0001-1',
    },
    {
      id: 'prod-vac-ar',
      name: 'Vacina Antirrábica',
      categoryId: 'cat7',
      quantity: 20,
      minQuantity: 10,
      costPrice: 15.00,
      salePrice: 30.00,
      supplier: 'Vet Supply',
      createdAt: new Date(),
      updatedAt: new Date(),
      batch: 'AR-2025-01',
      expirationDate: '2026-01-31',
      vaccineType: 'Antirrábica',
      manufacturer: 'Vet Nacional',
      mapaRegistration: 'MAPA SP 0005-4',
    }
  ];

  const [vaccines, setVaccines] = useState<ExtendedVaccine[]>([
    {
      id: '1',
      animalId: '1',
      animal: mockAnimals[0],
      vaccineType: 'Vacina V10 Importada',
      productId: 'prod-vac-v10',
      product: mockVaccineProducts[0],
      batch: '12345',
      applicationDate: new Date('2024-11-15'),
      nextDueDate: new Date('2025-11-15'),
      veterinarianId: '1',
      veterinarian: mockVeterinarians[0],
      notes: 'Primeira dose da V10',
      createdBy: 'system',
      createdAt: new Date('2024-11-15'),
      status: 'applied',
    },
    {
      id: '2',
      animalId: '2',
      animal: mockAnimals[1],
      vaccineType: 'Vacina Antirrábica',
      productId: 'prod-vac-ar',
      product: mockVaccineProducts[1],
      batch: '67890',
      applicationDate: new Date('2025-07-01'),
      nextDueDate: new Date('2026-07-01'),
      veterinarianId: '2',
      veterinarian: mockVeterinarians[1],
      notes: 'Vacina antirrábica anual',
      createdBy: 'system',
      createdAt: new Date(),
      status: 'scheduled',
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [animalFilter, setAnimalFilter] = useState<string>(selectedAnimalId || 'all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<ExtendedVaccine | null>(null);
  const [formData, setFormData] = useState({
    animalId: selectedAnimalId || '',
    productId: '',
    batch: '',
    applicationDate: new Date().toISOString().split('T')[0],
    veterinarianId: '',
    notes: '',
    numberOfDoses: 1,
    intervalInDays: 30,
    scheduleFutureDoses: false,
  });
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancellingVaccine, setCancellingVaccine] = useState<ExtendedVaccine | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');
  
  // New state for applying a scheduled vaccine
  const [applyingVaccine, setApplyingVaccine] = useState<ExtendedVaccine | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applyFormData, setApplyFormData] = useState({
    productId: '',
    batch: '',
    veterinarianId: '',
    notes: '',
  });

  useEffect(() => {
    if (selectedAnimalId) {
      setAnimalFilter(selectedAnimalId);
      setFormData(prev => ({ ...prev, animalId: selectedAnimalId }));
    }
  }, [selectedAnimalId]);

  const filteredVaccines = vaccines.filter(vaccine => {
    const matchesSearch = vaccine.animal?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccine.vaccineType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccine.veterinarian?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAnimal = animalFilter === 'all' || vaccine.animalId === animalFilter;
    
    return matchesSearch && matchesAnimal;
  });

  const canCancelVaccine = (vaccine: ExtendedVaccine): boolean => {
    if (vaccine.status === 'canceled') {
      return false;
    }
    if (vaccine.status === 'scheduled') {
      return true;
    }
    if (vaccine.status === 'applied') {
      return isToday(vaccine.applicationDate);
    }
    return false;
  };

  const createPendingSaleFromVaccine = (vaccine: ExtendedVaccine) => {
    if (vaccine.status !== 'applied' || !vaccine.product) {
      return;
    }

    const price = vaccine.product.salePrice;
    if (price === undefined) {
      toast({
        title: "Preço não encontrado",
        description: `Não foi possível encontrar um preço para o produto ${vaccine.product.name}.`,
        variant: "destructive",
      });
      return;
    }

    if (!vaccine.animal || !vaccine.animal.tutor) {
      toast({
        title: 'Dados incompletos',
        description: 'Não é possível gerar venda sem dados do animal e tutor.',
        variant: 'destructive',
      });
      return;
    }

    const saleItem: SaleItem = {
      id: vaccine.productId || vaccine.id,
      name: `Vacina ${vaccine.vaccineType} - ${vaccine.animal.name}`,
      type: 'service',
      quantity: 1,
      unitPrice: price,
      total: price,
    };

    const newSale: NewSale = {
      customerName: vaccine.animal.tutor.name,
      customerPhone: vaccine.animal.tutor.phone,
      animalId: vaccine.animal.id,
      animalName: vaccine.animal.name,
      items: [saleItem],
      subtotal: price,
      discount: 0,
      total: price,
      paymentMethod: '',
      status: 'pending',
      notes: `Venda gerada a partir da aplicação da vacina ${vaccine.vaccineType}`,
    };
    
    toast({
      title: "Venda Pendente Criada",
      description: "A venda foi enviada para o PDV e aguarda finalização.",
    });
    
    // Send the new sale to the parent component without navigating away
    onNavigate('vaccines', { newPendingSale: newSale });
  };


  const handleSave = () => {
    if (!formData.animalId || !formData.productId || !formData.applicationDate || !formData.veterinarianId) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }

    const selectedAnimal = mockAnimals.find(a => a.id === formData.animalId);
    const selectedVeterinarian = mockVeterinarians.find(v => v.id === formData.veterinarianId);
    const selectedProduct = mockVaccineProducts.find(p => p.id === formData.productId);

    if (!selectedProduct) {
      toast({ title: "Produto não encontrado", description: "A vacina selecionada não foi encontrada.", variant: "destructive" });
      return;
    }

    if (editingVaccine) {
      setVaccines(vaccines.map(v => 
        v.id === editingVaccine.id 
          ? { 
              ...editingVaccine, 
              animalId: formData.animalId,
              productId: formData.productId,
              product: selectedProduct,
              vaccineType: selectedProduct.name,
              batch: formData.batch,
              applicationDate: new Date(formData.applicationDate + 'T12:00:00Z'),
              veterinarianId: formData.veterinarianId,
              notes: formData.notes,
              animal: selectedAnimal,
              veterinarian: selectedVeterinarian,
            }
          : v
      ));
      toast({
        title: "Vacina atualizada",
        description: "A vacina foi atualizada com sucesso.",
      });
    } else {
      const allNewVaccines: ExtendedVaccine[] = [];
      const firstApplicationDate = new Date(formData.applicationDate + 'T12:00:00Z');

      // Primeira dose (ou única)
      const firstVaccine: ExtendedVaccine = {
        id: Date.now().toString(),
        animalId: formData.animalId,
        productId: formData.productId,
        vaccineType: selectedProduct.name,
        batch: formData.batch || selectedProduct.batch || '',
        applicationDate: firstApplicationDate,
        nextDueDate: addDays(firstApplicationDate, formData.intervalInDays),
        veterinarianId: formData.veterinarianId,
        notes: formData.notes,
        createdBy: 'current-user',
        createdAt: new Date(),
        animal: selectedAnimal,
        veterinarian: selectedVeterinarian,
        product: selectedProduct,
        status: 'applied',
      };
      allNewVaccines.push(firstVaccine);

      // Doses futuras
      if (formData.numberOfDoses > 1 && formData.scheduleFutureDoses) {
        let lastDate = firstApplicationDate;
        for (let i = 1; i < formData.numberOfDoses; i++) {
          const nextDate = addDays(lastDate, formData.intervalInDays);
          const futureVaccine: ExtendedVaccine = {
            ...firstVaccine,
            id: `${Date.now().toString()}-${i}`,
            applicationDate: nextDate,
            nextDueDate: addDays(nextDate, formData.intervalInDays),
            status: 'scheduled',
            notes: `Dose ${i + 1} de ${formData.numberOfDoses}. ${formData.notes}`,
            createdAt: new Date(),
          };
          allNewVaccines.push(futureVaccine);
          lastDate = nextDate;
        }
      }
      
      setVaccines([...vaccines, ...allNewVaccines]);
      toast({
        title: "Vacina(s) registrada(s)",
        description: `${allNewVaccines.length} registro(s) de vacina foram criados com sucesso.`,
      });
      
      createPendingSaleFromVaccine(firstVaccine);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingVaccine(null);
    setFormData({
      animalId: selectedAnimalId || '',
      productId: '',
      batch: '',
      applicationDate: new Date().toISOString().split('T')[0],
      veterinarianId: '',
      notes: '',
      numberOfDoses: 1,
      intervalInDays: 30,
      scheduleFutureDoses: false,
    });
  };

  const handleEdit = (vaccine: ExtendedVaccine) => {
    setEditingVaccine(vaccine);
    setFormData({
      animalId: vaccine.animalId,
      productId: vaccine.productId || '',
      batch: vaccine.batch || '',
      applicationDate: vaccine.applicationDate.toISOString().split('T')[0],
      veterinarianId: vaccine.veterinarianId || '',
      notes: vaccine.notes || '',
      numberOfDoses: 1, // Don't allow changing recurrence on edit for simplicity
      intervalInDays: 30,
      scheduleFutureDoses: false,
    });
    setIsAddDialogOpen(true);
  };
  
  const openCancelDialog = (vaccine: ExtendedVaccine) => {
    if (!canCancelVaccine(vaccine)) {
      toast({
        title: 'Ação não permitida',
        description: 'Só é possível cancelar vacinas agendadas ou que foram aplicadas hoje.',
        variant: 'destructive',
      });
      return;
    }
    setCancellingVaccine(vaccine);
    setCancellationReason('');
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!cancellingVaccine) return;
    if (!cancellationReason) {
      toast({
        title: 'Motivo obrigatório',
        description: 'Por favor, informe o motivo do cancelamento.',
        variant: 'destructive',
      });
      return;
    }

    setVaccines(vaccines.map(v => 
      v.id === cancellingVaccine.id 
        ? { ...v, status: 'canceled', cancellationReason } 
        : v
    ));
    
    toast({
      title: 'Vacina Cancelada',
      description: 'A vacina foi cancelada com sucesso.'
    });

    setIsCancelDialogOpen(false);
    setCancellingVaccine(null);
  };
  
  const handleOpenApplyDialog = (vaccine: ExtendedVaccine) => {
    setApplyingVaccine(vaccine);
    setApplyFormData({
      productId: vaccine.productId || '',
      batch: vaccine.batch || '',
      veterinarianId: '', // Force selection of vet
      notes: vaccine.notes || '',
    });
    setIsApplyDialogOpen(true);
  };

  const handleConfirmApply = () => {
    if (!applyingVaccine || !applyFormData.productId || !applyFormData.veterinarianId) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione a vacina e o veterinário.",
        variant: "destructive",
      });
      return;
    }

    const selectedProduct = mockVaccineProducts.find(p => p.id === applyFormData.productId);
    const selectedVeterinarian = mockVeterinarians.find(v => v.id === applyFormData.veterinarianId);

    if (!selectedProduct) {
      toast({ title: "Produto não encontrado", variant: "destructive" });
      return;
    }
    
    const updatedVaccine: ExtendedVaccine = {
      ...applyingVaccine,
      status: 'applied',
      applicationDate: new Date(), // Set to now as requested
      productId: selectedProduct.id,
      product: selectedProduct,
      vaccineType: selectedProduct.name,
      batch: applyFormData.batch || selectedProduct.batch || '',
      veterinarianId: applyFormData.veterinarianId,
      veterinarian: selectedVeterinarian,
      notes: applyFormData.notes,
      updatedAt: new Date(),
    };

    setVaccines(vaccines.map(v => v.id === updatedVaccine.id ? updatedVaccine : v));

    toast({
      title: 'Vacina Aplicada!',
      description: `A vacina ${updatedVaccine.vaccineType} foi registrada como aplicada.`,
    });
    
    createPendingSaleFromVaccine(updatedVaccine);
    
    setIsApplyDialogOpen(false);
    setApplyingVaccine(null);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('vaccines')}</h1>
          <p className="text-gray-600">Gerencie as vacinas dos animais</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Vacinas</CardTitle>
              <CardDescription>
                {filteredVaccines.length} vacinas registradas
                {selectedAnimalId && (
                  <span className="ml-2 text-teal-600">
                    (Filtrado para: {mockAnimals.find(a => a.id === selectedAnimalId)?.name})
                  </span>
                )}
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) handleCloseDialog(); else setIsAddDialogOpen(true); }}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addVaccine')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVaccine ? t('editVaccine') : t('addVaccine')}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados da vacina
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                  <div>
                    <Label htmlFor="animalId">{t('animal')}</Label>
                    <Select
                      value={formData.animalId}
                      onValueChange={(value) => setFormData({...formData, animalId: value})}
                      disabled={!!editingVaccine}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectAnimal')} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAnimals.map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} - {animal.tutor?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="productId">Vacina (Produto)</Label>
                    <Select
                      value={formData.productId}
                      onValueChange={(value) => {
                        const product = mockVaccineProducts.find(p => p.id === value);
                        setFormData({
                          ...formData, 
                          productId: value,
                          batch: product?.batch || '',
                        });
                      }}
                      disabled={editingVaccine?.status === 'scheduled'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a vacina" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVaccineProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="batch">{t('batch')}</Label>
                    <Input
                      id="batch"
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                      placeholder="Número do lote"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="applicationDate">Data da 1ª Aplicação</Label>
                    <Input
                      id="applicationDate"
                      type="date"
                      value={formData.applicationDate}
                      onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                      disabled={editingVaccine?.status === 'scheduled'}
                    />
                  </div>

                  {!editingVaccine && (
                    <>
                      <div className="md:col-span-2 grid grid-cols-2 gap-4 border-t pt-4">
                        <div>
                          <Label htmlFor="numberOfDoses">Número de Doses</Label>
                          <Input
                            id="numberOfDoses"
                            type="number"
                            min="1"
                            value={formData.numberOfDoses}
                            onChange={(e) => setFormData({...formData, numberOfDoses: parseInt(e.target.value) || 1})}
                          />
                        </div>
                        {formData.numberOfDoses > 1 && (
                          <div>
                            <Label htmlFor="intervalInDays">Intervalo (dias)</Label>
                            <Input
                              id="intervalInDays"
                              type="number"
                              min="1"
                              value={formData.intervalInDays}
                              onChange={(e) => setFormData({...formData, intervalInDays: parseInt(e.target.value) || 30})}
                            />
                          </div>
                        )}
                      </div>
                      {formData.numberOfDoses > 1 && (
                        <div className="md:col-span-2 flex items-center space-x-2">
                          <Switch
                            id="scheduleFutureDoses"
                            checked={formData.scheduleFutureDoses}
                            onCheckedChange={(checked) => setFormData({...formData, scheduleFutureDoses: checked})}
                          />
                          <Label htmlFor="scheduleFutureDoses">Agendar doses futuras automaticamente</Label>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="veterinarianId">{t('veterinarian')}</Label>
                    <Select
                      value={formData.veterinarianId}
                      onValueChange={(value) => setFormData({...formData, veterinarianId: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectVeterinarian')} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVeterinarians.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">{t('notes')}</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Observações sobre a vacina"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
                    {t('save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por animal, vacina ou veterinário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select value={animalFilter} onValueChange={setAnimalFilter}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Todos os animais" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os animais</SelectItem>
                {mockAnimals.map((animal) => (
                  <SelectItem key={animal.id} value={animal.id}>
                    {animal.name} - {animal.tutor?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Vacina</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Veterinário</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVaccines.map((vaccine) => (
                  <TableRow key={vaccine.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vaccine.animal?.name}</div>
                        <div className="text-sm text-gray-500">{vaccine.animal?.tutor?.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Syringe className="w-4 h-4 text-green-600" />
                        <div>
                          <div>{vaccine.vaccineType}</div>
                          <div className="text-xs text-gray-500">Lote: {vaccine.batch}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {vaccine.applicationDate.toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        vaccine.status === 'applied' ? 'default' : 
                        vaccine.status === 'scheduled' ? 'secondary' : 
                        'destructive'
                      } className={
                        vaccine.status === 'applied' ? 'bg-green-100 text-green-800' :
                        vaccine.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''
                      }>
                        <div className="flex items-center gap-1">
                          {vaccine.status === 'applied' && <CheckCircle />}
                          {vaccine.status === 'scheduled' && <Clock />}
                          {vaccine.status === 'canceled' && <Ban />}
                          {
                            vaccine.status === 'applied' ? 'Aplicada' :
                            vaccine.status === 'scheduled' ? 'Agendada' :
                            'Cancelada'
                          }
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{vaccine.veterinarian?.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {vaccine.status === 'scheduled' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenApplyDialog(vaccine)}
                            className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                            title="Aplicar Vacina"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(vaccine)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openCancelDialog(vaccine)}
                          className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                          disabled={!canCancelVaccine(vaccine)}
                          title={canCancelVaccine(vaccine) ? "Cancelar Vacina" : "Apenas vacinas agendadas ou aplicadas hoje podem ser canceladas."}
                        >
                          <Ban className="w-4 h-4" />
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
      
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Agendamento de Vacina</DialogTitle>
            <DialogDescription>
              Você está cancelando a vacina <strong>{cancellingVaccine?.vaccineType}</strong> para <strong>{cancellingVaccine?.animal?.name}</strong>.
              Por favor, informe o motivo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="cancellationReason">Motivo do Cancelamento</Label>
            <Textarea
              id="cancellationReason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Ex: Tutor desmarcou, animal indisposto..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>Voltar</Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>Confirmar Cancelamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Dialog for Applying a Scheduled Vaccine */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aplicar Vacina Agendada</DialogTitle>
            <DialogDescription>
              Confirmar aplicação da vacina <strong>{applyingVaccine?.vaccineType}</strong> em <strong>{applyingVaccine?.animal?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Data da Aplicação</Label>
              <Input value={format(new Date(), 'dd/MM/yyyy')} disabled />
            </div>
            <div>
              <Label htmlFor="apply-productId">Vacina (Produto)</Label>
              <Select
                value={applyFormData.productId}
                onValueChange={(value) => {
                  const product = mockVaccineProducts.find(p => p.id === value);
                  setApplyFormData({
                    ...applyFormData, 
                    productId: value,
                    batch: product?.batch || '',
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a vacina" />
                </SelectTrigger>
                <SelectContent>
                  {mockVaccineProducts.filter(p => p.vaccineType).map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="apply-batch">Lote</Label>
              <Input
                id="apply-batch"
                value={applyFormData.batch}
                onChange={(e) => setApplyFormData({...applyFormData, batch: e.target.value})}
                placeholder="Confirme o número do lote"
              />
            </div>
            <div>
              <Label htmlFor="apply-vet">{t('veterinarian')}</Label>
              <Select
                value={applyFormData.veterinarianId}
                onValueChange={(value) => setApplyFormData({...applyFormData, veterinarianId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectVeterinarian')} />
                </SelectTrigger>
                <SelectContent>
                  {mockVeterinarians.map((vet) => (
                    <SelectItem key={vet.id} value={vet.id}>
                      {vet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="apply-notes">Observações</Label>
              <Textarea
                id="apply-notes"
                value={applyFormData.notes}
                onChange={(e) => setApplyFormData({...applyFormData, notes: e.target.value})}
                placeholder="Observações sobre a aplicação"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleConfirmApply} className="bg-teal-600 hover:bg-teal-700">Confirmar Aplicação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vaccines;
