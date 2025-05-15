
/**
 * Middleware para capturar erros em rotas assíncronas
 * @param {function} fn - Função de controlador assíncrona
 * @returns {function} Middleware com tratamento de erro
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Middleware para tratamento global de erros
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Erro detectado:', err);
    
    // Formato padrão de erro
    const errorResponse = {
        success: false,
        error: {
            message: err.message || 'Ocorreu um erro no servidor',
            status: err.statusCode || 500
        }
    };

    // Se estamos em ambiente de desenvolvimento, incluir mais detalhes
    if (process.env.NODE_ENV !== 'production') {
        errorResponse.error.stack = err.stack;
    }
    
    res.status(err.statusCode || 500).json(errorResponse);
};

/**
 * Classe para criar erros da API com código de status HTTP
 */
export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
    
    static notFound(message = 'Recurso não encontrado') {
        return new ApiError(message, 404);
    }
    
    static badRequest(message = 'Requisição inválida') {
        return new ApiError(message, 400);
    }
    
    static unauthorized(message = 'Não autorizado') {
        return new ApiError(message, 401);
    }
    
    static forbidden(message = 'Acesso proibido') {
        return new ApiError(message, 403);
    }
    
    static internal(message = 'Erro interno do servidor') {
        return new ApiError(message, 500);
    }
}
