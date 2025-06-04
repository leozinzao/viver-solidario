
import React, { useState } from 'react';
import { Home, Calendar, Users, User, Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useNavigation } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: { id: string; label: string; }[];
}

interface NavigationBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentScreen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigateToScreen } = useNavigation();

  const navItems = [
    { 
      id: 'home', 
      label: 'Início', 
      icon: Home 
    },
    { 
      id: 'donations', 
      label: 'Doações', 
      icon: Heart,
      subItems: [
        { id: 'donations', label: 'Como Apoiar' },
        { id: 'doacoes-fisicas', label: 'Doações Físicas' }
      ]
    },
    { 
      id: 'events', 
      label: 'Eventos', 
      icon: Calendar 
    },
    { 
      id: 'volunteer', 
      label: 'Voluntário', 
      icon: Users 
    },
    { 
      id: 'profile', 
      label: 'Perfil', 
      icon: User 
    }
  ];

  const handleNavigation = (id: string) => {
    console.log('🧭 NavigationBar: Navegando para:', id);
    navigateToScreen(id);
    setIsMenuOpen(false);
  };

  const isSubItemActive = (item: NavItem) => {
    return item.subItems?.some(subItem => subItem.id === currentScreen) || item.id === currentScreen;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-sm mx-auto">
      <ul className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => (
          item.subItems ? (
            <li key={item.id} className="flex-1">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "flex flex-col items-center gap-1 w-full h-auto py-2 px-1",
                      isSubItemActive(item) ? "text-viver-yellow" : "text-gray-600"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs leading-tight">{item.label}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto pb-4">
                  <div className="grid gap-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-4">Opções de Doação</h3>
                    </div>
                    <div className="grid gap-2">
                      {item.subItems.map((subItem) => (
                        <Button
                          key={subItem.id}
                          variant="ghost"
                          className={cn(
                            "justify-start h-auto py-3 text-left",
                            currentScreen === subItem.id ? "bg-viver-yellow/10 text-viver-yellow" : ""
                          )}
                          onClick={() => handleNavigation(subItem.id)}
                        >
                          {subItem.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </li>
          ) : (
            <li key={item.id} className="flex-1">
              <Button
                variant="ghost"
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 w-full h-auto py-2 px-1",
                  currentScreen === item.id ? "text-viver-yellow" : "text-gray-600"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs leading-tight">{item.label}</span>
              </Button>
            </li>
          )
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
