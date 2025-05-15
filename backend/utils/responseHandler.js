
/**
 * Classe para padronizar respostas da API
 */
export class ApiResponse {
    /**
     * Retorna uma resposta de sucesso
     * @param {object} res - Objeto de resposta do Express
     * @param {object|array} data - Dados a serem retornados
     * @param {number} status - Código HTTP (default: 200)
     */
    static success(res, data = {}, status = 200) {
        return res.status(status).json({
            success: true,
            data
        });
    }

    /**
     * Retorna uma resposta de erro
     * @param {object} res - Objeto de resposta do Express
     * @param {string} message - Mensagem de erro
     * @param {number} status - Código HTTP (default: 500)
     * @param {string} code - Código interno de erro (opcional)
     */
    static error(res, message = 'Ocorreu um erro no servidor', status = 500, code = null) {
        const errorResponse = {
            success: false,
            error: {
                message,
                status
            }
        };
        
        if (code) {
            errorResponse.error.code = code;
        }
        
        return res.status(status).json(errorResponse);
    }
    
    /**
     * Retorna uma resposta vazia para exclusões bem-sucedidas
     * @param {object} res - Objeto de resposta do Express
     */
    static noContent(res) {
        return res.sendStatus(204);
    }
}
