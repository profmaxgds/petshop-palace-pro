
import React from 'react';
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
  UserMd,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { key: 'dashboard', icon: Home, label: 'dashboard' },
  { key: 'tutors', icon: Users, label: 'tutors' },
  { key: 'animals', icon: Heart, label: 'animals' },
  { key: 'vaccines', icon: Syringe, label: 'vaccines' },
  { key: 'appointments', icon: Calendar, label: 'appointments' },
  { key: 'grooming', icon: Scissors, label: 'grooming' },
  { key: 'inventory', icon: Package, label: 'inventory' },
  { key: 'purchases', icon: ShoppingCart, label: 'purchases' },
  { key: 'accounts-payable', icon: CreditCard, label: 'accountsPayable' },
  { key: 'accounts-receivable', icon: Banknote, label: 'accountsReceivable' },
  { key: 'cash-flow', icon: Wallet, label: 'cashFlow' },
  { key: 'banks', icon: Building2, label: 'banks' },
  { key: 'veterinarians', icon: UserMd, label: 'veterinarians' },
  { key: 'service-types', icon: Wrench, label: 'serviceTypes' },
] as const;

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  collapsed,
  onToggleCollapse,
}) => {
  return (
    <div className={cn(
      "bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-blue-500">
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
            className="text-white hover:bg-blue-500"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            
            return (
              <li key={item.key}>
                <button
                  onClick={() => onPageChange(item.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-white text-blue-700 shadow-sm" 
                      : "text-blue-100 hover:bg-blue-500 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="truncate">{t(item.label as any)}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-blue-500">
        <button
          onClick={() => onPageChange('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-2",
            currentPage === 'settings'
              ? "bg-white text-blue-700 shadow-sm"
              : "text-blue-100 hover:bg-blue-500 hover:text-white"
          )}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{t('settings')}</span>}
        </button>
        
        <button
          onClick={() => {/* Handle logout */}}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-blue-100 hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{t('logout')}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
