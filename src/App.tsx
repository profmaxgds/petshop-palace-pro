
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
import Tutors from './components/pages/Tutors';
import Animals from './components/pages/Animals';
import Vaccines from './components/pages/Vaccines';
import Settings from './components/pages/Settings';
import { getCurrentLanguage } from './lib/i18n';

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState(getCurrentLanguage());

  useEffect(() => {
    // Initialize language on app start
    getCurrentLanguage();
  }, []);

  const handleLanguageChange = () => {
    setLanguage(getCurrentLanguage());
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tutors':
        return <Tutors />;
      case 'animals':
        return <Animals />;
      case 'vaccines':
        return <Vaccines />;
      case 'appointments':
        return <div className="p-6">Página de Agendamentos em desenvolvimento...</div>;
      case 'grooming':
        return <div className="p-6">Página de Banho e Tosa em desenvolvimento...</div>;
      case 'inventory':
        return <div className="p-6">Página de Estoque em desenvolvimento...</div>;
      case 'purchases':
        return <div className="p-6">Página de Compras em desenvolvimento...</div>;
      case 'accounts-payable':
        return <div className="p-6">Página de Contas a Pagar em desenvolvimento...</div>;
      case 'accounts-receivable':
        return <div className="p-6">Página de Contas a Receber em desenvolvimento...</div>;
      case 'cash-flow':
        return <div className="p-6">Página de Fluxo de Caixa em desenvolvimento...</div>;
      case 'banks':
        return <div className="p-6">Página de Bancos em desenvolvimento...</div>;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <div className="flex-1 flex flex-col">
            <Header onLanguageChange={handleLanguageChange} />
            
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
