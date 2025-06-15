import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/pages/Dashboard';
import Tutors from '@/components/pages/Tutors';
import Animals from '@/components/pages/Animals';
import Breeds from '@/components/pages/Breeds';
import Species from '@/components/pages/Species';
import Rooms from '@/components/pages/Rooms';
import AnimalHealth from '@/components/pages/AnimalHealth';
import Grooming from '@/components/pages/Grooming';
import Vaccines from '@/components/pages/Vaccines';
import AccountsPayable from '@/components/pages/AccountsPayable';
import AccountsReceivable from '@/components/pages/AccountsReceivable';
import CashFlow from '@/components/pages/CashFlow';
import Banks from '@/components/pages/Banks';
import Inventory from '@/components/pages/Inventory';
import Purchases from '@/components/pages/Purchases';
import Products from '@/components/pages/Products';
import ProductCategories from '@/components/pages/ProductCategories';
import ServiceTypes from '@/components/pages/ServiceTypes';
import Veterinarians from '@/components/pages/Veterinarians';
import Users from '@/components/pages/Users';
import Profiles from '@/components/pages/Profiles';
import VaccineCardLayout from '@/components/pages/VaccineCardLayout';
import Reports from '@/components/pages/Reports';
import Settings from '@/components/pages/Settings';
import PointOfSale from '@/components/pages/PointOfSale';
import Sales from '@/components/pages/Sales';
import ClinicSettings from '@/components/pages/ClinicSettings';
import RoomTypes from '@/components/pages/RoomTypes';
import { Sale, SaleItem } from '@/types/sales';
import type { Animal, Tutor, Breed } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/products';
import { Service } from '@/types/services';

// Interface for Species Data
interface SpeciesData {
  id: string;
  name: string;
  systemName: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// MOCK DATA - In a real app, this would come from an API
const mockBreeds: Breed[] = [
    { id: '1', name: 'Golden Retriever', species: 'dog', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Persa', species: 'cat', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() }
];

const mockTutors: Tutor[] = [
    { id: '1', name: 'João Silva', cpf: '123.456.789-00', phone: '(11) 99999-9999', email: 'joao@email.com', address: { street: 'Rua A', number: '1', neighborhood: 'Bairro', city: 'Cidade', state: 'SP', zipCode: '12345-678' }, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Maria Santos', cpf: '987.654.321-00', phone: '(11) 99999-2222', email: 'maria@email.com', address: { street: 'Rua B', number: '2', neighborhood: 'Bairro', city: 'Cidade', state: 'SP', zipCode: '12345-678' }, isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() }
];

const mockAnimals: Animal[] = [
    { id: '1', name: 'Rex', species: 'dog', breedId: '1', breed: mockBreeds[0], age: 3, sex: 'male', weight: 32.5, tutorId: '1', tutor: mockTutors[0], isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Luna', species: 'cat', breedId: '2', breed: mockBreeds[1], age: 2, sex: 'female', weight: 4.2, tutorId: '1', tutor: mockTutors[0], isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Thor', species: 'dog', breedId: '1', breed: mockBreeds[0], age: 5, sex: 'male', weight: 35, tutorId: '2', tutor: mockTutors[1], isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
];

// Mock data for products and services
const mockProducts: Product[] = [
    { id: 'prod-1', name: 'Ração Premium 15kg', categoryId: 'cat1', quantity: 50, minQuantity: 10, costPrice: 60.00, salePrice: 89.90, supplier: 'Fornecedor A', createdAt: new Date(), updatedAt: new Date() },
    { id: 'prod-2', name: 'Brinquedo de Corda', categoryId: 'cat3', quantity: 100, minQuantity: 20, costPrice: 10.00, salePrice: 25.00, supplier: 'Fornecedor B', createdAt: new Date(), updatedAt: new Date() },
    { id: 'prod-3', name: 'Shampoo Hipoalergênico', categoryId: 'cat5', quantity: 30, minQuantity: 5, costPrice: 25.00, salePrice: 45.00, supplier: 'Fornecedor A', createdAt: new Date(), updatedAt: new Date() },
];

const mockServices: Service[] = [
    { id: 'serv-1', name: 'Consulta Veterinária', price: 120.00 },
    { id: 'serv-2', name: 'Banho e Tosa', price: 75.00 },
    { id: 'serv-3', name: 'Aplicação de Vacina', price: 50.00 },
];

// Mock user data
const mockUser = {
  id: '1',
  name: 'Administrador',
  email: 'admin@petshop.com',
  role: 'admin' as const,
  permissions: { all: true }
};

function App() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [navigationState, setNavigationState] = useState<any>(null);

  const [speciesList, setSpeciesList] = useState<SpeciesData[]>([
    { id: '1', name: 'Cão', systemName: 'dog', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Gato', systemName: 'cat', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Ave', systemName: 'bird', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '4', name: 'Coelho', systemName: 'rabbit', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '5', name: 'Hamster', systemName: 'hamster', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
    { id: '6', name: 'Outro', systemName: 'other', isActive: true, createdBy: 'system', createdAt: new Date(), updatedAt: new Date() },
  ]);

  const [sales, setSales] = useState<Sale[]>([
    {
      id: '1',
      date: new Date(),
      customerName: 'João Silva',
      customerPhone: '(11) 99999-1111',
      animalId: '1',
      animalName: 'Rex',
      items: [
        { id: '1', name: 'Consulta Veterinária', type: 'service', quantity: 1, unitPrice: 120.00, total: 120.00 },
        { id: '2', name: 'Ração Premium 15kg', type: 'product', quantity: 1, unitPrice: 89.90, total: 89.90 },
      ],
      subtotal: 209.90,
      discount: 0,
      total: 209.90,
      paymentMethod: 'Cartão',
      status: 'completed',
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000),
      customerName: 'Maria Santos',
      customerPhone: '(11) 99999-2222',
      items: [
        { id: '3', name: 'Banho e Tosa', type: 'service', quantity: 1, unitPrice: 45.00, total: 45.00 },
      ],
      subtotal: 45.00,
      discount: 5.00,
      total: 40.00,
      paymentMethod: 'Dinheiro',
      status: 'completed',
    },
    {
      id: '3',
      date: new Date(Date.now() - 3600000),
      customerName: 'João Silva',
      customerPhone: '(11) 99999-9999',
      animalId: '1',
      animalName: 'Rex',
      items: [
        { id: 'serv-2', name: 'Banho e Tosa', type: 'service', quantity: 1, unitPrice: 45.00, total: 45.00 },
      ],
      subtotal: 45.00,
      discount: 0,
      total: 45.00,
      paymentMethod: '',
      status: 'pending',
    },
  ]);

  const handleAddSpecies = (species: Pick<SpeciesData, 'name' | 'isActive'>) => {
    const newSpecies: SpeciesData = {
      ...species,
      id: Date.now().toString(),
      systemName: 'other', // User-created species are categorized as 'other' for type-safety
      createdBy: 'current_user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSpeciesList(prev => [...prev, newSpecies]);
    toast({ title: 'Sucesso', description: 'Espécie cadastrada com sucesso!' });
  };

  const handleUpdateSpecies = (species: SpeciesData) => {
    setSpeciesList(prev => prev.map(s => s.id === species.id ? { ...s, ...species, updatedAt: new Date() } : s));
    toast({ title: 'Sucesso', description: 'Espécie atualizada com sucesso!' });
  };
  
  const handleDeleteSpecies = (id: string) => {
    setSpeciesList(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Sucesso', description: 'Espécie excluída com sucesso!' });
  };

  const addOrUpdatePendingSale = (itemToAdd: SaleItem, animal: Animal) => {
    setSales(prevSales => {
        const existingPendingSaleIndex = prevSales.findIndex(
          s => s.animalId === animal.id && s.status === 'pending'
        );

        let newSales = [...prevSales];

        if (existingPendingSaleIndex > -1) {
          const saleToUpdate = { ...newSales[existingPendingSaleIndex] };
          saleToUpdate.items = [...saleToUpdate.items]; 

          const existingItemIndex = saleToUpdate.items.findIndex(i => i.id === itemToAdd.id);
          if (existingItemIndex > -1) {
              saleToUpdate.items[existingItemIndex].quantity += itemToAdd.quantity;
              saleToUpdate.items[existingItemIndex].total = saleToUpdate.items[existingItemIndex].quantity * saleToUpdate.items[existingItemIndex].unitPrice;
          } else {
              saleToUpdate.items.push(itemToAdd);
          }
          
          saleToUpdate.subtotal = saleToUpdate.items.reduce((sum, item) => sum + item.total, 0);
          saleToUpdate.total = saleToUpdate.subtotal - saleToUpdate.discount;
          newSales[existingPendingSaleIndex] = saleToUpdate;
        } else {
          const newSale: Sale = {
            id: String(Date.now()),
            date: new Date(),
            customerName: animal.tutor.name,
            customerPhone: animal.tutor.phone,
            animalId: animal.id,
            animalName: animal.name,
            items: [itemToAdd],
            subtotal: itemToAdd.total,
            discount: 0,
            total: itemToAdd.total,
            paymentMethod: '',
            status: 'pending',
          };
          newSales.unshift(newSale);
        }
        return newSales;
    });
    toast({ title: 'Item enviado para o PDV', description: `${itemToAdd.name} foi adicionado à lista de vendas pendentes.` });
    setCurrentPage('point-of-sale');
  };

  const handlePageChange = (page: string, state?: any) => {
    if (page === 'point-of-sale' && state?.draftSaleItems) {
      const itemToAdd = state.draftSaleItems[0] as SaleItem;
      
      let animal: Animal | undefined;

      if (itemToAdd.name.includes(' - ')) {
        const animalName = itemToAdd.name.split(' - ')[1];
        animal = mockAnimals.find(a => a.name === animalName);
      }

      if (animal) {
         addOrUpdatePendingSale(itemToAdd, animal);
      } else {
         toast({ title: 'Animal não identificado', description: 'Não foi possível associar o serviço a um animal.', variant: 'destructive'});
      }
      setNavigationState(null);
    } else {
      setCurrentPage(page);
      setNavigationState(state);
    }
  };

  const handleUpdateSale = (updatedSale: Sale) => {
    setSales(prevSales =>
      prevSales.map(s => (s.id === updatedSale.id ? updatedSale : s))
    );
    toast({ title: 'Venda Finalizada!', description: `Venda #${updatedSale.id.slice(-6)} concluída com sucesso.` });
  };
  
  const handleLogout = () => {
    alert('Logout realizado com sucesso!');
  };

  // Mock permission checker
  const hasPermission = (module: string, action?: string): boolean => {
    if (mockUser.permissions.all) return true;
    
    const permissions = mockUser.permissions as any;
    if (!permissions[module]) return false;
    
    if (!action) return true;
    
    return Array.isArray(permissions[module]) 
      ? permissions[module].includes(action)
      : permissions[module] === true;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tutors':
        return <Tutors />;
      case 'animals':
        return <Animals onNavigate={handlePageChange} />;
      case 'breeds':
        return <Breeds speciesList={speciesList} />;
      case 'species':
        return <Species 
          speciesList={speciesList}
          onAdd={handleAddSpecies}
          onUpdate={handleUpdateSpecies}
          onDelete={handleDeleteSpecies}
        />;
      case 'rooms':
        return <Rooms />;
      case 'animal-health':
        return <AnimalHealth onNavigate={handlePageChange} />;
      case 'grooming':
        return <Grooming onNavigate={handlePageChange} />;
      case 'vaccines':
        return <Vaccines navigationState={navigationState} onNavigate={handlePageChange} />;
      case 'accounts-payable':
        return <AccountsPayable />;
      case 'accounts-receivable':
        return <AccountsReceivable />;
      case 'cash-flow':
        return <CashFlow />;
      case 'banks':
        return <Banks />;
      case 'inventory':
        return <Inventory />;
      case 'purchases':
        return <Purchases />;
      case 'products':
        return <Products />;
      case 'product-categories':
        return <ProductCategories />;
      case 'service-types':
        return <ServiceTypes />;
      case 'veterinarians':
        return <Veterinarians />;
      case 'users':
        return <Users />;
      case 'profiles':
        return <Profiles />;
      case 'vaccine-card-layout':
        return <VaccineCardLayout />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'clinic-settings':
        return <ClinicSettings />;
      case 'room-types':
        return <RoomTypes />;
      case 'point-of-sale':
        return <PointOfSale 
          sales={sales}
          onUpdateSale={handleUpdateSale}
          tutors={mockTutors}
          animals={mockAnimals}
          products={mockProducts}
          services={mockServices}
        />;
      case 'sales':
        return <Sales sales={sales} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        hasPermission={hasPermission}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderPage()}
        </div>
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;
