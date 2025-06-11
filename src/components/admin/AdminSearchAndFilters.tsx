
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Calendar,
  X
} from 'lucide-react';

interface FilterState {
  search: string;
  status: string;
  dateRange: string;
  category: string;
}

interface AdminSearchAndFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onExport?: () => void;
  onRefresh?: () => void;
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

const AdminSearchAndFilters: React.FC<AdminSearchAndFiltersProps> = ({
  onFiltersChange,
  onExport,
  onRefresh,
  showFilters = false,
  onToggleFilters
}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    dateRange: '',
    category: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      status: '',
      dateRange: '',
      category: ''
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-4 mb-6">
      {/* Barra de pesquisa principal */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email, doação, evento..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onToggleFilters}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-1 bg-viver-yellow text-black text-xs px-2 py-1 rounded-full">
                    {Object.values(filters).filter(v => v !== '').length}
                  </span>
                )}
              </Button>
              
              {onRefresh && (
                <Button variant="outline" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              
              {onExport && (
                <Button variant="outline" onClick={onExport}>
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros avançados */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900">Filtros Avançados</h4>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="cadastrada">Cadastrada</SelectItem>
                    <SelectItem value="aceita">Aceita</SelectItem>
                    <SelectItem value="recebida">Recebida</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Período
                </label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value) => handleFilterChange('dateRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os períodos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Esta semana</SelectItem>
                    <SelectItem value="mes">Este mês</SelectItem>
                    <SelectItem value="trimestre">Último trimestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Categoria
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="roupas">Roupas</SelectItem>
                    <SelectItem value="alimentos">Alimentos</SelectItem>
                    <SelectItem value="brinquedos">Brinquedos</SelectItem>
                    <SelectItem value="medicamentos">Medicamentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="default" className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
                  <Search className="h-4 w-4 mr-2" />
                  Aplicar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSearchAndFilters;
