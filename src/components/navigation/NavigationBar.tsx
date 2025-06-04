
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

const NavigationBar: React.FC<NavigationBarProps> = ({ currentScreen, onNavigate }) => {
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
    console.log('NavigationBar: Navegando para:', id);
    navigateToScreen(id);
    setIsMenuOpen(false);
  };

  // Verificar se a tela atual está em um submenu
  const isSubItemActive = (item: NavItem) => {
    return item.subItems?.some(subItem => subItem.id === currentScreen) || item.id === currentScreen;
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-border z-50">
        <ul className="flex justify-around items-center p-2">
          {navItems.map((item) => (
            item.subItems ? (
              <li key={item.id} className="relative">
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "flex flex-col items-center gap-1",
                        isSubItemActive(item) ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-auto pb-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        {item.subItems.map((subItem) => (
                          <Button
                            key={subItem.id}
                            variant="ghost"
                            className={cn(
                              "justify-start",
                              currentScreen === subItem.id ? "bg-accent" : ""
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
              <li key={item.id}>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-1",
                    currentScreen === item.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </li>
            )
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
