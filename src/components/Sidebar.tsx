
import React from 'react';
import { 
  Users, 
  Heart, 
  Calendar, 
  Scissors, 
  Syringe, 
  Stethoscope, 
  Package, 
  ShoppingCart,
  CreditCard,
  Banknote,
  Settings,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, collapsed, onToggleCollapse }) => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/', key: 'dashboard' },
    { icon: Users, label: 'Tutores', path: '/tutors', key: 'tutors' },
    { icon: Heart, label: 'Animais', path: '/animals', key: 'animals' },
    { icon: Calendar, label: 'Consultas', path: '/appointments', key: 'appointments' },
    { icon: Scissors, label: 'Banho e Tosa', path: '/grooming', key: 'grooming' },
    { icon: Syringe, label: 'Vacinas', path: '/vaccines', key: 'vaccines' },
    { icon: Stethoscope, label: 'Veterinários', path: '/veterinarians', key: 'veterinarians' },
    { icon: Package, label: 'Estoque', path: '/inventory', key: 'inventory' },
    { icon: ShoppingCart, label: 'Compras', path: '/purchases', key: 'purchases' },
    { icon: CreditCard, label: 'Contas a Pagar', path: '/accounts-payable', key: 'accounts-payable' },
    { icon: Banknote, label: 'Contas a Receber', path: '/accounts-receivable', key: 'accounts-receivable' },
    { icon: Banknote, label: 'Caixa', path: '/cash-flow', key: 'cash-flow' },
    { icon: Settings, label: 'Tipos de Serviços', path: '/services', key: 'services' },
  ];

  const handleMenuClick = (key: string) => {
    onPageChange(key);
  };

  return (
    <div className={`h-screen bg-primary text-primary-foreground flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-6 border-b border-primary/20">
        {!collapsed && (
          <>
            <h1 className="text-xl font-bold">PetShop Manager</h1>
            <p className="text-primary-foreground/80 text-sm">Sistema de Gestão</p>
          </>
        )}
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => handleMenuClick(item.key)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  currentPage === item.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
