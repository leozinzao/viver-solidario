
// backend/utils/authMiddleware.js
import jwt from "jsonwebtoken";
import { ApiError } from "./errorMiddleware.js";
const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, error: { message: "Autenticação necessária", status: 401 } });
    }

    const token = auth.slice(7);

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({ success: false, error: { message: "Token inválido ou expirado", status: 403 } });
    }
};

/**
 * Middleware para verificar se o usuário possui a(s) role(s) necessária(s)
 * @param {string|string[]} requiredRoles - Role(s) necessária(s) para acessar o recurso
 * @returns {Function} Middleware
 */
export const hasRole = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, error: { message: "Autenticação necessária", status: 401 } });
        }

        const userRole = req.user.role || 'donor';
        
        // Admin tem acesso total
        if (userRole === 'admin') {
            return next();
        }
        
        // Internal tem acesso avançado, mas não total
        if (userRole === 'internal' && requiredRoles !== 'admin') {
            return next();
        }

        // Verificar se o usuário possui alguma das roles necessárias
        if (Array.isArray(requiredRoles)) {
            if (requiredRoles.includes(userRole)) {
                return next();
            }
        } else if (requiredRoles === userRole) {
            return next();
        }

        return res.status(403).json({ 
            success: false, 
            error: { message: "Acesso negado: permissões insuficientes", status: 403 } 
        });
    };
};

/**
 * Middleware para verificar se o usuário é administrador
 */
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, error: { message: "Autenticação necessária", status: 401 } });
    }

    const userRole = req.user.role || 'donor';
    
    if (userRole === 'admin') {
        return next();
    }

    return res.status(403).json({ 
        success: false, 
        error: { message: "Acesso negado: permissões de administrador necessárias", status: 403 } 
    });
};

/**
 * Middleware para verificar se o usuário tem permissões avançadas (admin ou editor)
 */
export const hasAdvancedPermissions = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, error: { message: "Autenticação necessária", status: 401 } });
    }

    const userRole = req.user.role || 'donor';
    
    if (['admin', 'internal', 'editor', 'volunteer'].includes(userRole)) {
        return next();
    }

    return res.status(403).json({ 
        success: false, 
        error: { message: "Acesso negado: permissões insuficientes", status: 403 } 
    });
};

/**
 * Middleware para verificar se o usuário tem permissões de sistema
 */
export const hasSystemPermissions = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, error: { message: "Autenticação necessária", status: 401 } });
    }

    const userRole = req.user.role || 'donor';
    
    if (['admin', 'internal'].includes(userRole)) {
        return next();
    }

    return res.status(403).json({ 
        success: false, 
        error: { message: "Acesso negado: permissões de sistema necessárias", status: 403 } 
    });
};
