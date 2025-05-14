
// backend/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as User from "../models/userModel.js";

const jwtSecret = process.env.JWT_SECRET;

export const register = async(req, res) => {
    try {
        const { nome, email, senha, role = "donor" } = req.body;
        if (!nome || !email || !senha) return res.status(400).json({ msg: "Campos obrigatórios" });

        const exists = await User.findByEmail(email);
        if (exists) return res.status(409).json({ msg: "Usuário já existe" });

        const hash = await bcrypt.hash(senha, 10);
        const user = await User.create({ nome, email, hash, role });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};

export const login = async(req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(401).json({ msg: "Credenciais inválidas" });

        const ok = await bcrypt.compare(senha, user.senha_hash);
        if (!ok) return res.status(401).json({ msg: "Credenciais inválidas" });

        // Determine user role based on database or email pattern for now
        let role = user.role || "donor";
        if (email.includes('interno') || email.includes('admin')) {
            role = "internal";
        } else if (email.includes('voluntario')) {
            role = "volunteer";
        }

        const token = jwt.sign({ 
            sub: user.id, 
            role: role 
        }, jwtSecret, { expiresIn: "12h" });

        res.json({ 
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
        console.error(err);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};
