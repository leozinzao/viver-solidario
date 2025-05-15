
import bcrypt from "bcrypt";
import * as userService from "../services/userService.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { ApiError } from "../utils/errorMiddleware.js";

export const getProfile = async(req, res, next) => {
    try {
        const userId = req.user.sub;
        const user = await userService.findUserById(userId);
        
        if (!user) {
            throw ApiError.notFound("Usuário não encontrado");
        }
        
        // Retorna apenas campos seguros
        return ApiResponse.success(res, {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role || "donor",
            theme: user.theme || "light"
        });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async(req, res, next) => {
    try {
        const userId = req.user.sub;
        const { nome, email, theme } = req.body;
        
        // Atualiza apenas os campos fornecidos
        const updatedUser = await userService.updateUserProfile(userId, { nome, email, theme });
        
        if (!updatedUser) {
            throw ApiError.notFound("Usuário não encontrado");
        }
        
        return ApiResponse.success(res, {
            id: updatedUser.id,
            nome: updatedUser.nome,
            email: updatedUser.email,
            role: updatedUser.role,
            theme: updatedUser.theme
        });
    } catch (err) {
        next(err);
    }
};

export const updatePassword = async(req, res, next) => {
    try {
        const userId = req.user.sub;
        const { currentPassword, newPassword } = req.body;
        
        // Valida campos obrigatórios
        if (!currentPassword || !newPassword) {
            throw ApiError.badRequest("Senha atual e nova senha são obrigatórias");
        }
        
        // Obtém usuário para verificar senha atual
        const user = await userService.findUserById(userId);
        if (!user) {
            throw ApiError.notFound("Usuário não encontrado");
        }
        
        // Verifica senha atual
        const passwordMatch = await bcrypt.compare(currentPassword, user.senha_hash);
        if (!passwordMatch) {
            throw ApiError.unauthorized("Senha atual incorreta");
        }
        
        // Hasheia nova senha
        const hash = await bcrypt.hash(newPassword, 10);
        
        // Atualiza a senha
        await userService.updateUserPassword(userId, hash);
        
        return ApiResponse.success(res, { message: "Senha atualizada com sucesso" });
    } catch (err) {
        next(err);
    }
};

export const getUserRole = async(req, res, next) => {
    try {
        const userId = req.user.sub;
        const user = await userService.findUserById(userId);
        
        if (!user) {
            throw ApiError.notFound("Usuário não encontrado");
        }
        
        return ApiResponse.success(res, { role: user.role || "donor" });
    } catch (err) {
        next(err);
    }
};
