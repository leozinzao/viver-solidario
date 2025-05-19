import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { History, User, LogOut, Moon, Edit, Settings, Shield, Lock, Save, X } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';
import { UserRole } from '@/lib/permissions';

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout, hasPermission, updateUserProfile, updatePassword } = useAuth();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        name: editName,
        email: editEmail,
      });
      
      setIsEditingProfile(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil",
        variant: "destructive"
      });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não conferem",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await updatePassword(currentPassword, newPassword);
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a senha",
        variant: "destructive"
      });
    }
  };

  const getUserRoleBadge = () => {
    if (!user) return null;
    
    switch (user.role) {
      case UserRole.internal:
        return <Badge className="bg-viver-yellow text-black">Acesso Interno</Badge>;
      case UserRole.volunteer:
        return <Badge className="bg-green-500">Voluntário</Badge>;
      case UserRole.donor:
        return <Badge className="bg-blue-500">Doador</Badge>;
      default:
        return <Badge className="bg-gray-500">Visitante</Badge>;
    }
  };

  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Perfil</h1>
      
      {/* Profile Header */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-viver-yellow/20 flex items-center justify-center">
            <User className="w-12 h-12 text-viver-yellow" />
          </div>
          <button 
            className="absolute bottom-0 right-0 bg-viver-yellow rounded-full p-1 border-2 border-background"
            onClick={() => {
              setEditName(user?.name || '');
              setEditEmail(user?.email || '');
              setIsEditingProfile(true);
            }}
          >
            <Edit className="w-4 h-4 text-black" />
          </button>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{user?.name || 'Nome do Usuário'}</h2>
          <p className="text-sm text-muted-foreground">{user?.email || 'usuario@email.com'}</p>
          <div className="mt-1">{getUserRoleBadge()}</div>
        </div>
      </div>
      
      {/* Profile Options */}
      <div className="space-y-3">
        <div className="flutter-card">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
              <History className="w-5 h-5 text-viver-yellow" />
            </div>
            <div>
              <h3 className="font-medium">Histórico de Ações</h3>
              <p className="text-xs text-muted-foreground">Visualize suas atividades recentes</p>
            </div>
          </div>
        </div>
        
        <div 
          className="flutter-card cursor-pointer" 
          onClick={() => {
            setEditName(user?.name || '');
            setEditEmail(user?.email || '');
            setIsEditingProfile(true);
          }}
        >
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
              <Edit className="w-5 h-5 text-viver-yellow" />
            </div>
            <div>
              <h3 className="font-medium">Editar Dados</h3>
              <p className="text-xs text-muted-foreground">Atualize suas informações pessoais</p>
            </div>
          </div>
        </div>
        
        <div 
          className="flutter-card cursor-pointer"
          onClick={() => setIsChangingPassword(true)}
        >
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
              <Lock className="w-5 h-5 text-viver-yellow" />
            </div>
            <div>
              <h3 className="font-medium">Alterar Senha</h3>
              <p className="text-xs text-muted-foreground">Atualize sua senha de acesso</p>
            </div>
          </div>
        </div>
        
        {hasPermission(UserRole.internal) && (
          <div className="flutter-card border-l-4 border-l-viver-yellow">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Shield className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Painel Administrativo</h3>
                <p className="text-xs text-muted-foreground">Acesso às funções administrativas</p>
              </div>
            </div>
          </div>
        )}
        
        {hasPermission([UserRole.internal, UserRole.volunteer]) && (
          <div className="flutter-card border-l-4 border-l-viver-yellow">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Lock className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Área Restrita</h3>
                <p className="text-xs text-muted-foreground">Acesso a documentos e informações restritas</p>
              </div>
            </div>
          </div>
        )}
        
        {hasPermission(UserRole.internal) && (
          <div className="flutter-card">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Settings className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Configurações do Sistema</h3>
                <p className="text-xs text-muted-foreground">Ajustes e parametrizações internas</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flutter-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Moon className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Modo Escuro</h3>
                <p className="text-xs text-muted-foreground">Alternar tema de exibição</p>
              </div>
            </div>
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-viver-yellow"
            />
          </div>
        </div>
        
        <div className="flutter-card cursor-pointer" onClick={logout}>
          <div className="flex items-center text-red-500">
            <div className="mr-3 p-2 bg-red-500/10 rounded-full">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium">Sair</h3>
              <p className="text-xs opacity-70">Encerrar sessão no aplicativo</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">Viver Solidário v1.0.0</p>
      </div>
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Atualize suas informações pessoais abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProfile}>Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Password Dialog */}
      <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Digite sua senha atual e a nova senha para atualizá-la.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-password" className="text-right">
                Senha Atual
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right">
                Nova Senha
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                Confirmar
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
              Cancelar
            </Button>
            <Button onClick={handleChangePassword}>Alterar Senha</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileScreen;
