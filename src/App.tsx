import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/pages/Dashboard';
import Tutors from '@/components/pages/Tutors';
import Animals from '@/components/pages/Animals';
import Breeds from '@/components/pages/Breeds';
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
import { Sale, SaleItem } from '@/types/sales';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Administrador',
  email: 'admin@petshop.com',
  role: 'admin' as const,
  permissions: { all: true }
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [navigationState, setNavigationState] = useState<any>(null);
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
  ]);
  const [draftSaleItems, setDraftSaleItems] = useState<SaleItem[] | null>(null);

  const handlePageChange = (page: string, state?: any) => {
    setCurrentPage(page);
    setNavigationState(state);
    if (state?.draftSaleItems) {
      setDraftSaleItems(state.draftSaleItems);
    }
  };

  const handleClearDraftSaleItems = () => {
    setDraftSaleItems(null);
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
        return <Breeds />;
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
      case 'point-of-sale':
        return <PointOfSale 
          onSaleCompleted={(newSale) => setSales(prevSales => [newSale, ...prevSales])} 
          initialCartItems={draftSaleItems}
          onCartLoaded={handleClearDraftSaleItems}
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
