import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userService from "../services/userService.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { ApiError } from "../utils/errorMiddleware.js";

const jwtSecret = process.env.JWT_SECRET;

export const register = async(req, res, next) => {
    try {
        const { nome, email, senha, role = "donor" } = req.body;

        if (!nome || !email || !senha) {
            throw ApiError.badRequest("Campos obrigatórios: nome, email, senha");
        }

        const exists = await userService.findUserByEmail(email);
        if (exists) {
            throw ApiError.conflict("Este email já está cadastrado");
        }

        // Validação de role (somente admin pode criar outros tipos)
        let userRole = 'donor'; // Padrão para novos usuários

        // Se o usuário estiver autenticado e for admin/internal, pode especificar a role
        if (req.user && ['admin', 'internal'].includes(req.user.role)) {
            if (['admin', 'internal', 'editor', 'volunteer', 'donor'].includes(role)) {
                userRole = role;
            }
        }

        const hash = await bcrypt.hash(senha, 10);
        const user = await userService.createUser({ nome, email, hash, role: userRole });

        return ApiResponse.success(res, {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role
        }, 201);
    } catch (err) {
        next(err);
        if (req.user.role !== "admin") return res.status(403).json({ message: "Acesso negado" });
    }
};

export const login = async(req, res, next) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            throw ApiError.badRequest("Email e senha são obrigatórios");
        }

        const user = await userService.findUserByEmail(email);
        if (!user) {
            throw ApiError.unauthorized("Credenciais inválidas");
        }

        const ok = await bcrypt.compare(senha, user.senha_hash);
        if (!ok) {
            throw ApiError.unauthorized("Credenciais inválidas");
        }

        // Determina o papel do usuário com base no banco de dados ou padrão de email
        let role = user.role || "donor";
        if (email.includes('interno') || email.includes('admin')) {
            role = "internal";
        } else if (email.includes('voluntario')) {
            role = "volunteer";
        }

        const token = jwt.sign({
            sub: user.id,
            role: role,
            email: user.email
        }, jwtSecret, { expiresIn: "12h" });

        return ApiResponse.success(res, {
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: role,
                theme: user.theme || 'light'
            }
        });
    } catch (err) {
        next(err);
    }
};

// Nova função para verificar o token atual
export const verifyCurrentToken = async(req, res, next) => {
    try {
        // Token já foi verificado no middleware verifyToken
        const userId = req.user.sub;
        const user = await userService.findUserById(userId);

        if (!user) {
            throw ApiError.unauthorized("Usuário não encontrado");
        }

        return ApiResponse.success(res, {
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: user.role || "donor",
                theme: user.theme || 'light'
            }
        });
    } catch (err) {
        next(err);
    }
};