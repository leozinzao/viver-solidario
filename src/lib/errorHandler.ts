
import { useToast } from '@/hooks/use-toast';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ErrorHandler {
  // Manipular erros de API de forma padronizada
  static handleApiError(error: any): ApiError {
    console.error('API Error:', error);

    // Se é um erro estruturado
    if (error?.error?.message) {
      return {
        message: error.error.message,
        status: error.error.status,
        code: error.error.code
      };
    }

    // Se é um erro simples
    if (error?.message) {
      return {
        message: error.message,
        status: error.status || 500
      };
    }

    // Se é um erro de rede
    if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
      return {
        message: 'Erro de conexão. Verifique sua internet.',
        status: 0
      };
    }

    // Erro genérico
    return {
      message: 'Ocorreu um erro inesperado',
      status: 500
    };
  }

  // Validar resposta de API
  static validateApiResponse(response: any): boolean {
    if (!response) {
      throw new Error('Resposta vazia da API');
    }

    if (response.error) {
      throw new Error(response.error.message || 'Erro na API');
    }

    return true;
  }
}

// Hook para usar o ErrorHandler
export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = (error: any, customMessage?: string) => {
    const apiError = ErrorHandler.handleApiError(error);
    
    toast({
      title: "Erro",
      description: customMessage || apiError.message,
      variant: "destructive"
    });
  };

  const showSuccess = (message: string, description?: string) => {
    toast({
      title: message,
      description,
      variant: "default"
    });
  };

  return {
    handleError,
    showSuccess,
    validateResponse: ErrorHandler.validateApiResponse
  };
};
