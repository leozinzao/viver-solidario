
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { UserRole } from '@/lib/permissions';
import { Search, Users, UserCheck } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Buscar usuários da tabela voluntarios
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('voluntarios')
        .select('*')
        .order('nome');

      if (error) {
        throw error;
      }
      return data;
    },
    retry: 1
  });

  // Atualizar role do usuário
  const updateUserRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: UserRole }) => {
      const { data, error } = await supabase
        .from('voluntarios')
        .update({ role: newRole })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "Role atualizado",
        description: `Usuário ${data.nome} agora tem role: ${data.role}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: `Não foi possível atualizar o role: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const filteredUsers = users.filter(user =>
    user.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case UserRole.admin:
        return <Badge className="bg-red-500">Admin</Badge>;
      case UserRole.internal:
        return <Badge className="bg-orange-500">Interno</Badge>;
      case UserRole.volunteer:
        return <Badge className="bg-green-500">Voluntário</Badge>;
      case UserRole.donor:
        return <Badge className="bg-blue-500">Doador</Badge>;
      default:
        return <Badge className="bg-gray-500">Não definido</Badge>;
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUserRole.mutate({ userId, newRole: newRole as UserRole });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-viver-yellow"></div>
            <span className="ml-2">Carregando usuários...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gerenciamento de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role Atual</TableHead>
                  <TableHead>Alterar Role</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.nome || 'Nome não informado'}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </TableCell>
                    
                    <TableCell>
                      {getRoleBadge(user.role || UserRole.donor)}
                    </TableCell>
                    
                    <TableCell>
                      <Select
                        value={user.role || UserRole.donor}
                        onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                        disabled={updateUserRole.isPending}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UserRole.donor}>Doador</SelectItem>
                          <SelectItem value={UserRole.volunteer}>Voluntário</SelectItem>
                          <SelectItem value={UserRole.internal}>Interno</SelectItem>
                          <SelectItem value={UserRole.admin}>Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        disabled={updateUserRole.isPending}
                      >
                        <UserCheck className="h-4 w-4" />
                        Ver Perfil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                Nenhum usuário encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
