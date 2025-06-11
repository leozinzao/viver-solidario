
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
    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
      {/* Barra de pesquisa principal */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={onToggleFilters}
                className="flex items-center gap-2 text-xs sm:text-sm"
                size="sm"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Filtros</span>
                {hasActiveFilters && (
                  <span className="bg-viver-yellow text-black text-xs px-1.5 py-0.5 rounded-full">
                    {Object.values(filters).filter(v => v !== '').length}
                  </span>
                )}
              </Button>
              
              {onRefresh && (
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
              
              {onExport && (
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="text-xs">Exportar</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros avançados */}
      {showFilters && (
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Filtros</h4>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="text-xs">Limpar</span>
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 block">
                  Status
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="Todos" />
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
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 block">
                  Período
                </label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value) => handleFilterChange('dateRange', value)}
                >
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="Todos" />
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

              <div className="sm:col-span-2 lg:col-span-1">
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 block">
                  Categoria
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="Todas" />
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

              <div className="flex items-end sm:col-span-2 lg:col-span-1">
                <Button variant="default" className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black text-xs sm:text-sm" size="sm">
                  <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
