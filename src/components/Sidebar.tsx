
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Tutores', path: '/tutors' },
    { icon: Heart, label: 'Animais', path: '/animals' },
    { icon: Calendar, label: 'Consultas', path: '/appointments' },
    { icon: Scissors, label: 'Banho e Tosa', path: '/grooming' },
    { icon: Syringe, label: 'Vacinas', path: '/vaccines' },
    { icon: Stethoscope, label: 'Veterinários', path: '/veterinarians' },
    { icon: Package, label: 'Estoque', path: '/inventory' },
    { icon: ShoppingCart, label: 'Compras', path: '/purchases' },
    { icon: CreditCard, label: 'Contas a Pagar', path: '/accounts-payable' },
    { icon: Banknote, label: 'Contas a Receber', path: '/accounts-receivable' },
    { icon: Banknote, label: 'Caixa', path: '/cash-flow' },
    { icon: Settings, label: 'Tipos de Serviços', path: '/services' },
  ];

  return (
    <div className="h-screen w-64 bg-blue-500 text-white flex flex-col">
      <div className="p-6 border-b border-blue-400">
        <h1 className="text-xl font-bold">PetShop Manager</h1>
        <p className="text-blue-100 text-sm">Sistema de Gestão</p>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-400 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
