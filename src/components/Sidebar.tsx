
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Heart, 
  Syringe, 
  Calendar,
  Scissors,
  Package,
  ShoppingCart,
  CreditCard,
  Banknote,
  Wallet,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  UserCog,
  User,
  FolderOpen,
  Archive,
  PlusCircle,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  key: string;
  icon: any;
  label: string;
}

interface ModuleItem {
  key: string;
  label: string;
  icon: any;
  items: MenuItem[];
}

const modules: ModuleItem[] = [
  {
    key: 'cadastros',
    label: 'Cadastros',
    icon: FolderOpen,
    items: [
      { key: 'tutors', icon: Users, label: 'tutors' },
      { key: 'animals', icon: Heart, label: 'animals' },
      { key: 'veterinarians', icon: Stethoscope, label: 'veterinarians' },
    ]
  },
  {
    key: 'servicos',
    label: 'Serviços',
    icon: ClipboardList,
    items: [
      { key: 'appointments', icon: Calendar, label: 'appointments' },
      { key: 'grooming', icon: Scissors, label: 'grooming' },
      { key: 'vaccines', icon: Syringe, label: 'vaccines' },
    ]
  },
  {
    key: 'financeiro',
    label: 'Financeiro',
    icon: Wallet,
    items: [
      { key: 'accounts-payable', icon: CreditCard, label: 'accountsPayable' },
      { key: 'accounts-receivable', icon: Banknote, label: 'accountsReceivable' },
      { key: 'cash-flow', icon: Wallet, label: 'cashFlow' },
      { key: 'banks', icon: Building2, label: 'banks' },
    ]
  },
  {
    key: 'produtos-estoque',
    label: 'Produtos e Estoque',
    icon: Package,
    items: [
      { key: 'inventory', icon: Archive, label: 'inventory' },
      { key: 'purchases', icon: ShoppingCart, label: 'purchases' },
      { key: 'products', icon: Package, label: 'products' },
      { key: 'product-categories', icon: Tag, label: 'Categorias de Produtos' },
      { key: 'service-types', icon: ClipboardList, label: 'serviceTypes' },
    ]
  },
  {
    key: 'sistema',
    label: 'Sistema',
    icon: Settings,
    items: [
      { key: 'settings', icon: Settings, label: 'settings' },
      { key: 'users', icon: UserCog, label: 'Usuários' },
      { key: 'profile', icon: User, label: 'Perfil' },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  collapsed,
  onToggleCollapse,
}) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(['cadastros', 'servicos', 'financeiro', 'produtos-estoque']);

  const toggleModule = (moduleKey: string) => {
    if (collapsed) return;
    
    setExpandedModules(prev => 
      prev.includes(moduleKey) 
        ? prev.filter(key => key !== moduleKey)
        : [...prev, moduleKey]
    );
  };

  const isModuleExpanded = (moduleKey: string) => {
    return expandedModules.includes(moduleKey);
  };

  return (
    <div className={cn(
      "bg-gradient-to-b from-teal-600 to-teal-700 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-teal-500">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-orange-400" />
              <span className="text-xl font-bold">PetShop</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-white hover:bg-teal-500"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-2">
        <button
          onClick={() => onPageChange('dashboard')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
            currentPage === 'dashboard'
              ? "bg-white text-teal-700 shadow-sm"
              : "text-teal-100 hover:bg-teal-500 hover:text-white"
          )}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{t('dashboard')}</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <div className="space-y-1">
          {modules.map((module) => {
            const ModuleIcon = module.icon;
            const isExpanded = isModuleExpanded(module.key);
            
            return (
              <div key={module.key}>
                <button
                  onClick={() => toggleModule(module.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-teal-100 hover:bg-teal-500 hover:text-white",
                    collapsed && "justify-center"
                  )}
                >
                  <ModuleIcon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left font-medium">{module.label}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </>
                  )}
                </button>
                
                {!collapsed && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {module.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = currentPage === item.key;
                      
                      return (
                        <button
                          key={item.key}
                          onClick={() => onPageChange(item.key)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                            isActive
                              ? "bg-white text-teal-700 shadow-sm"
                              : "text-teal-100 hover:bg-teal-500 hover:text-white"
                          )}
                        >
                          <ItemIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{t(item.label as any)}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-teal-500">
        <button
          onClick={() => {/* Handle logout */}}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-teal-100 hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{t('logout')}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
