
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  CheckSquare, 
  Square, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminBulkActionsProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkAction: (action: string, items: string[]) => Promise<void>;
  availableActions?: Array<{
    value: string;
    label: string;
    icon?: React.ElementType;
    variant?: 'default' | 'destructive' | 'success';
  }>;
}

const AdminBulkActions: React.FC<AdminBulkActionsProps> = ({
  selectedItems,
  totalItems,
  onSelectAll,
  onClearSelection,
  onBulkAction,
  availableActions = [
    { value: 'approve', label: 'Aprovar', icon: Check, variant: 'success' },
    { value: 'reject', label: 'Rejeitar', icon: X, variant: 'destructive' },
    { value: 'delete', label: 'Excluir', icon: Trash2, variant: 'destructive' }
  ]
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const allSelected = selectedItems.length === totalItems && totalItems > 0;
  const someSelected = selectedItems.length > 0 && selectedItems.length < totalItems;

  const handleBulkAction = async () => {
    if (!selectedAction || selectedItems.length === 0) return;

    setIsProcessing(true);
    try {
      await onBulkAction(selectedAction, selectedItems);
      
      const actionLabel = availableActions.find(a => a.value === selectedAction)?.label || selectedAction;
      toast({
        title: "Ação executada",
        description: `${actionLabel} aplicado a ${selectedItems.length} item(s).`,
      });
      
      setSelectedAction('');
      onClearSelection();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível executar a ação em massa.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedItems.length === 0) return null;

  return (
    <Card className="border-viver-yellow bg-viver-yellow/5">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={() => {
                  if (allSelected || someSelected) {
                    onClearSelection();
                  } else {
                    onSelectAll();
                  }
                }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-viver-yellow" />
              <span className="font-medium text-gray-900">
                {selectedItems.length} item(s) selecionado(s)
              </span>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Escolher ação" />
              </SelectTrigger>
              <SelectContent>
                {availableActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <SelectItem key={action.value} value={action.value}>
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        {action.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Button
              onClick={handleBulkAction}
              disabled={!selectedAction || isProcessing}
              variant={
                selectedAction && availableActions.find(a => a.value === selectedAction)?.variant === 'destructive' 
                  ? 'destructive' 
                  : 'default'
              }
              className={
                selectedAction && availableActions.find(a => a.value === selectedAction)?.variant === 'success'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : selectedAction && availableActions.find(a => a.value === selectedAction)?.variant !== 'destructive'
                  ? 'bg-viver-yellow hover:bg-viver-yellow/90 text-black'
                  : ''
              }
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Processando...
                </>
              ) : (
                'Executar'
              )}
            </Button>

            <Button variant="ghost" onClick={onClearSelection}>
              Cancelar
            </Button>
          </div>

          {selectedAction === 'delete' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Ação irreversível</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBulkActions;
