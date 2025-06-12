
import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LanguageSelector from './LanguageSelector';
import { User as UserType } from '@/types';
import { t } from '@/lib/i18n';

interface HeaderProps {
  onLanguageChange?: () => void;
  currentUser: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange, currentUser, onLogout }) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return t('admin');
      case 'veterinarian':
        return t('veterinarian');
      case 'receptionist':
        return t('receptionist');
      default:
        return role;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Sistema PetShop
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSelector onLanguageChange={onLanguageChange} />
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
              3
            </Badge>
          </Button>
          
          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{currentUser.name}</div>
                    <div className="text-xs text-gray-500">{getRoleLabel(currentUser.role)}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  {t('userProfile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
