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
  Tag,
  Building,
  PawPrint,
  FileText,
  BarChart3,
  Shield,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  hasPermission: (module: string, action?: string) => boolean;
  onLogout: () => void;
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
    label: 'entities',
    icon: FolderOpen,
    items: [
      { key: 'tutors', icon: Users, label: 'tutors' },
      { key: 'animals', icon: Heart, label: 'animals' },
      { key: 'breeds', icon: PawPrint, label: 'breeds' },
      { key: 'species', icon: PawPrint, label: 'species' },
      { key: 'veterinarians', icon: Stethoscope, label: 'veterinarians' },
    ]
  },
  {
    key: 'servicos',
    label: 'services',
    icon: ClipboardList,
    items: [
      { key: 'animal-health', icon: Stethoscope, label: 'clinic' },
      { key: 'grooming', icon: Scissors, label: 'grooming' },
      { key: 'vaccines', icon: Syringe, label: 'vaccines' },
    ]
  },
  {
    key: 'vendas',
    label: 'sales',
    icon: ShoppingCart,
    items: [
      { key: 'point-of-sale', icon: ShoppingCart, label: 'PDV' },
      { key: 'sales', icon: ShoppingBag, label: 'Histórico' },
    ]
  },
  {
    key: 'financeiro',
    label: 'financial',
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
    label: 'productsAndStock',
    icon: Package,
    items: [
      { key: 'inventory', icon: Archive, label: 'inventory' },
      { key: 'purchases', icon: ShoppingCart, label: 'purchases' },
      { key: 'products', icon: Package, label: 'products' },
      { key: 'product-categories', icon: Tag, label: 'productCategories' },
      { key: 'service-types', icon: ClipboardList, label: 'serviceTypes' },
    ]
  },
  {
    key: 'sistema',
    label: 'system',
    icon: Settings,
    items: [
      { key: 'users', icon: UserCog, label: 'users' },
      { key: 'profiles', icon: Shield, label: 'profiles' },
      { key: 'rooms', icon: Building, label: 'rooms' },
      { key: 'room-types', icon: Tag, label: 'roomTypes' },
      { key: 'clinic-settings', icon: FileText, label: 'clinicSettings' },
      { key: 'vaccine-card-layout', icon: FileText, label: 'vaccineCardLayout' },
      { key: 'reports', icon: BarChart3, label: 'reports' },
      { key: 'settings', icon: Settings, label: 'settings' },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  collapsed,
  onToggleCollapse,
  hasPermission,
  onLogout,
}) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(['cadastros', 'servicos', 'financeiro', 'produtos-estoque', 'sistema']);

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

  const isModuleVisible = (moduleKey: string) => {
    const modulePermissions: Record<string, string> = {
      'cadastros': 'tutors',
      'servicos': 'appointments',
      'financeiro': 'financial',
      'produtos-estoque': 'products',
      'sistema': 'system',
      'vendas': 'sales'
    };

    return hasPermission(modulePermissions[moduleKey]);
  };

  const isItemVisible = (itemKey: string) => {
    const itemPermissions: Record<string, { module: string; action?: string }> = {
      'tutors': { module: 'tutors' },
      'animals': { module: 'animals' },
      'breeds': { module: 'animals' },
      'species': { module: 'animals' },
      'rooms': { module: 'system', action: 'write' },
      'room-types': { module: 'system', action: 'write' },
      'animal-health': { module: 'appointments' },
      'grooming': { module: 'appointments' },
      'vaccines': { module: 'vaccines' },
      'accounts-payable': { module: 'financial' },
      'accounts-receivable': { module: 'financial' },
      'cash-flow': { module: 'financial' },
      'banks': { module: 'financial' },
      'inventory': { module: 'products' },
      'purchases': { module: 'purchases' },
      'products': { module: 'products' },
      'product-categories': { module: 'products', action: 'write' },
      'service-types': { module: 'system', action: 'write' },
      'veterinarians': { module: 'system', action: 'write' },
      'point-of-sale': { module: 'sales' },
      'sales': { module: 'sales' },
      'users': { module: 'system', action: 'write' },
      'profiles': { module: 'system', action: 'write' },
      'clinic-settings': { module: 'system', action: 'write' },
      'vaccine-card-layout': { module: 'system', action: 'write' },
      'reports': { module: 'system' },
      'settings': { module: 'system' }
    };

    const permission = itemPermissions[itemKey];
    if (!permission) return true;
    
    return hasPermission(permission.module, permission.action);
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
          {modules
            .filter(module => isModuleVisible(module.key))
            .map((module) => {
              const ModuleIcon = module.icon;
              const isExpanded = isModuleExpanded(module.key);
              const visibleItems = module.items.filter(item => isItemVisible(item.key));
              
              if (visibleItems.length === 0) return null;
              
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
                        <span className="flex-1 text-left font-medium">{t(module.label)}</span>
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
                      {visibleItems.map((item) => {
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
          onClick={onLogout}
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
