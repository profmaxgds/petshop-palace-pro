
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Tutors from './components/pages/Tutors';
import Animals from './components/pages/Animals';
import Vaccines from './components/pages/Vaccines';
import Appointments from './components/pages/Appointments';
import Grooming from './components/pages/Grooming';
import Veterinarians from './components/pages/Veterinarians';
import ServiceTypes from './components/pages/ServiceTypes';
import Products from './components/pages/Products';
import Inventory from './components/pages/Inventory';
import Purchases from './components/pages/Purchases';
import AccountsPayable from './components/pages/AccountsPayable';
import AccountsReceivable from './components/pages/AccountsReceivable';
import CashFlow from './components/pages/CashFlow';
import Banks from './components/pages/Banks';
import ProductCategories from './components/pages/ProductCategories';
import Users from './components/pages/Users';
import Settings from './components/pages/Settings';
import Breeds from './components/pages/Breeds';
import Rooms from './components/pages/Rooms';
import { getCurrentLanguage } from './lib/i18n';
import { User } from './types';

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState(getCurrentLanguage());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há uma sessão salva
    const savedSession = localStorage.getItem('petshop_session');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        const now = new Date();
        const expiresAt = new Date(sessionData.expiresAt);
        
        if (now < expiresAt) {
          setCurrentUser(sessionData);
          setIsAuthenticated(true);
        } else {
          // Sessão expirada
          localStorage.removeItem('petshop_session');
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        localStorage.removeItem('petshop_session');
      }
    }
    
    // Initialize language on app start
    getCurrentLanguage();
  }, []);

  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('petshop_session');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const handleLanguageChange = () => {
    setLanguage(getCurrentLanguage());
  };

  // Verificar permissões
  const hasPermission = (module: string, action: string = 'read') => {
    if (!currentUser) return false;
    if (currentUser.permissions?.all) return true;
    
    const modulePermissions = currentUser.permissions?.[module];
    if (Array.isArray(modulePermissions)) {
      return modulePermissions.includes(action);
    }
    return false;
  };

  const renderPage = () => {
    // Verificar permissões para cada página
    const pagePermissions: Record<string, { module: string; action?: string }> = {
      'tutors': { module: 'tutors' },
      'animals': { module: 'animals' },
      'breeds': { module: 'animals' },
      'rooms': { module: 'system', action: 'write' },
      'vaccines': { module: 'vaccines' },
      'appointments': { module: 'appointments' },
      'grooming': { module: 'appointments' },
      'veterinarians': { module: 'system', action: 'write' },
      'service-types': { module: 'system', action: 'write' },
      'products': { module: 'products' },
      'inventory': { module: 'products' },
      'purchases': { module: 'purchases' },
      'accounts-payable': { module: 'financial' },
      'accounts-receivable': { module: 'financial' },
      'cash-flow': { module: 'financial' },
      'banks': { module: 'financial' },
      'product-categories': { module: 'products', action: 'write' },
      'users': { module: 'system', action: 'write' },
      'settings': { module: 'system' }
    };

    const pagePermission = pagePermissions[currentPage];
    if (pagePermission && !hasPermission(pagePermission.module, pagePermission.action)) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Acesso Negado</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tutors':
        return <Tutors />;
      case 'animals':
        return <Animals />;
      case 'breeds':
        return <Breeds />;
      case 'rooms':
        return <Rooms />;
      case 'vaccines':
        return <Vaccines />;
      case 'appointments':
        return <Appointments />;
      case 'grooming':
        return <Grooming />;
      case 'veterinarians':
        return <Veterinarians />;
      case 'service-types':
        return <ServiceTypes />;
      case 'products':
        return <Products />;
      case 'inventory':
        return <Inventory />;
      case 'purchases':
        return <Purchases />;
      case 'accounts-payable':
        return <AccountsPayable />;
      case 'accounts-receivable':
        return <AccountsReceivable />;
      case 'cash-flow':
        return <CashFlow />;
      case 'banks':
        return <Banks />;
      case 'product-categories':
        return <ProductCategories />;
      case 'users':
        return <Users />;
      case 'profile':
        return <div className="p-6">Página de Perfil em desenvolvimento...</div>;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Login onLogin={handleLogin} />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 flex w-full">
          <Sidebar
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            hasPermission={hasPermission}
            onLogout={handleLogout}
          />
          
          <div className="flex-1 flex flex-col">
            <Header 
              onLanguageChange={handleLanguageChange}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
            
            <main className="flex-1 p-6 overflow-auto">
              {renderPage()}
            </main>
          </div>
        </div>
        
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
