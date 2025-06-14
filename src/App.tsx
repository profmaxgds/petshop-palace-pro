
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

  const handlePageChange = (page: string, state?: any) => {
    setCurrentPage(page);
    setNavigationState(state);
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
        return <AnimalHealth />;
      case 'grooming':
        return <Grooming />;
      case 'vaccines':
        return <Vaccines navigationState={navigationState} />;
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
        return <PointOfSale />;
      case 'sales':
        return <Sales />;
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
