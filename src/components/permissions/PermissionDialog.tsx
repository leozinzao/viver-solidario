
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { ShieldAlert } from "lucide-react";

interface PermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PermissionDialog: React.FC<PermissionDialogProps> = ({ open, onOpenChange }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-red-500" />
          <AlertDialogTitle>Acesso Negado</AlertDialogTitle>
        </div>
        <AlertDialogDescription>
          Você não possui permissão para acessar esta área do aplicativo.
          Entre em contato com um administrador se você acredita que deveria ter acesso.
        </AlertDialogDescription>
        <div className="flex justify-end">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Entendido
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PermissionDialog;
