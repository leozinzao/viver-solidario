
import * as userService from "../services/userService.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { ApiError } from "../utils/errorMiddleware.js";

// Listar todos os usuários com paginação
export const listUsers = async(req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        
        const users = await userService.findAllVoluntarios(limit, offset);
        const total = await userService.countVoluntarios();
        
        return ApiResponse.success(res, {
            users,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

// Listar usuários por função com paginação
export const listUsersByRole = async(req, res, next) => {
    try {
        const { role } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        
        const users = await userService.findUsersByRole(role, limit, offset);
        const total = await userService.countUsersByRole(role);
        
        return ApiResponse.success(res, {
            users,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

// Obter detalhes de um usuário específico
export const getUserDetails = async(req, res, next) => {
    try {
        const { userId } = req.params;
        
        const user = await userService.findUserById(userId);
        
        if (!user) {
            throw ApiError.notFound("Usuário não encontrado");
        }
        
        // Retornar dados seguros do usuário (sem senha)
        const safeUser = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role,
            theme: user.theme,
            ativo: user.ativo,
            created_at: user.created_at,
            updated_at: user.updated_at
        };
        
        return ApiResponse.success(res, safeUser);
    } catch (err) {
        next(err);
    }
};

// Atualizar a função/papel de um usuário
export const updateUserRole = async(req, res, next) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        
        // Verifica se o papel é válido
        const validRoles = ['admin', 'internal', 'editor', 'volunteer', 'donor', 'visitor'];
        if (!validRoles.includes(role)) {
            throw ApiError.badRequest(`Papel inválido. Papéis válidos: ${validRoles.join(', ')}`);
        }
        
        // Apenas admin pode criar outros admins
        if (role === 'admin' && req.user.role !== 'admin') {
            throw ApiError.forbidden("Apenas administradores podem criar outros administradores");
        }
        
        const updatedUser = await userService.updateUserRole(userId, role);
        
        if (!updatedUser) {
            throw ApiError.notFound("Usuário não encontrado");
        }
        
        return ApiResponse.success(res, {
            message: `Papel do usuário atualizado para ${role}`,
            user: {
                id: updatedUser.id,
                nome: updatedUser.nome,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (err) {
        next(err);
    }
};

// Desativar um usuário
export const deactivateUser = async(req, res, next) => {
    try {
        const { userId } = req.params;
        
        // TODO: Implementar método de desativação no serviço
        // await userService.deactivateUser(userId);
        
        return ApiResponse.success(res, {
            message: "Usuário desativado com sucesso"
        });
    } catch (err) {
        next(err);
    }
};

// Estatísticas de usuários para dashboard administrativo
export const getUserStats = async(req, res, next) => {
    try {
        // TODO: Implementar lógica para estatísticas de usuários
        
        return ApiResponse.success(res, {
            totalUsers: await userService.countVoluntarios(),
            // Outras estatísticas seriam adicionadas aqui
        });
    } catch (err) {
        next(err);
    }
};
